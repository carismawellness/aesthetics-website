"use client";

/**
 * Direction 5 — "Cinematic Coverflow"
 * ─────────────────────────────────────────────────────────────────────────────
 * Apple-keynote-meets-luxury depth carousel of the 12 treatment photos, built in
 * RAW three.js (no R3F). The centred plane faces the camera large and crisp; its
 * neighbours rotateY toward the centre, recede in Z, shrink, fade and slightly
 * desaturate (cheap fake depth-of-field). A mirrored, gradient-faded reflection
 * sits under the active card for the classic coverflow sheen. GSAP tweens a single
 * scalar `progress` (the fractional active index) with refined easing and SNAPS to
 * the nearest card. A crisp DOM caption (name / blurb / Explore →) cross-fades on
 * change, driven by React state synced to the active index, plus an "03 / 12"
 * position indicator.
 *
 * Navigation: wheel/scroll, horizontal drag + swipe, ←/→ arrow keys, and on-screen
 * prev/next buttons — every path snaps to the nearest card.
 *
 * Performance / a11y: reduced-motion OR coarse-pointer OR ≤768px OR Save-Data →
 * NO WebGL, NO rAF; a clean scroll-snap DOM carousel with prev/next is rendered
 * instead. The WebGL scene mounts only after first paint + idle, pauses its rAF
 * when scrolled out of view (IntersectionObserver), and fully tears down on unmount
 * (cancel rAF, dispose geometries/materials/textures, renderer.dispose() + lose
 * context, remove canvas + listeners) so the direction switcher leaves no orphans.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import gsap from "gsap";
import { SERVICES } from "@/components/preview/treatments/data";

/* ── Section copy ─────────────────────────────────────────────────────────── */
const EYEBROW = "Doctor-Led Treatments";
const TITLE = "Our Medical Aesthetic Treatments";
const SUBCOPY =
  "A complete menu of advanced, medically supervised treatments, each tailored to refresh, restore and let you glow with confidence.";

const COUNT = SERVICES.length; // 12

/* ── Geometry: a rounded-rectangle plane with normalised UVs ──────────────────
   Mirrors the repo's GiftCardScene approach so the texture maps cleanly across
   the rounded shape's bbox (soft corners without a mask texture). */
function roundedPlaneGeometry(w: number, h: number, r: number): THREE.ShapeGeometry {
  const x = -w / 2;
  const y = -h / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  const geo = new THREE.ShapeGeometry(shape, 18);
  geo.computeBoundingBox();
  const bb = geo.boundingBox;
  if (bb) {
    const sx = bb.max.x - bb.min.x || 1;
    const sy = bb.max.y - bb.min.y || 1;
    const pos = geo.attributes.position;
    const uv = new Float32Array(pos.count * 2);
    for (let i = 0; i < pos.count; i++) {
      uv[i * 2] = (pos.getX(i) - bb.min.x) / sx;
      uv[i * 2 + 1] = (pos.getY(i) - bb.min.y) / sy;
    }
    geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  }
  return geo;
}

/** Soft radial contact-shadow texture drawn on a 2D canvas. */
function makeShadowTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(36,80,82,0.26)");
    g.addColorStop(0.55, "rgba(36,80,82,0.10)");
    g.addColorStop(1, "rgba(36,80,82,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Vertical alpha-gradient texture used to fade out the reflection plane. */
function makeReflectionFadeTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 4;
  c.height = 128;
  const ctx = c.getContext("2d");
  if (ctx) {
    // Top of the reflection (nearest the card) is most opaque; fades to nothing.
    const g = ctx.createLinearGradient(0, 0, 0, 128);
    g.addColorStop(0, "rgba(255,255,255,0.40)");
    g.addColorStop(0.5, "rgba(255,255,255,0.12)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 4, 128);
  }
  const tex = new THREE.CanvasTexture(c);
  return tex;
}

/* ── Reusable per-card record ─────────────────────────────────────────────── */
type Card = {
  group: THREE.Group;
  mesh: THREE.Mesh<THREE.ShapeGeometry, THREE.MeshBasicMaterial>;
  reflection: THREE.Mesh<THREE.ShapeGeometry, THREE.MeshBasicMaterial>;
  material: THREE.MeshBasicMaterial;
  reflMaterial: THREE.MeshBasicMaterial;
  texture: THREE.Texture | null;
};

export default function Direction5CinematicCoverflow() {
  /* ── Capability gate (decided after mount, before any WebGL spins up) ───── */
  const [useFallback, setUseFallback] = useState<boolean>(true);
  const [decided, setDecided] = useState<boolean>(false);
  // Computed once, after mount, inside a ref-stable callback so the gate effect
  // below has no extra deps and the WebGL effect re-runs only on the real flips.
  const decideCapability = useCallback((): boolean => {
    const mm = (q: string) =>
      typeof window.matchMedia === "function" && window.matchMedia(q).matches;
    const reduce = mm("(prefers-reduced-motion: reduce)");
    const coarse = mm("(pointer: coarse)");
    const small = window.innerWidth < 768;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const saveData = Boolean(nav.connection?.saveData);
    return reduce || coarse || small || saveData;
  }, []);

  // active index drives the crisp DOM caption + position indicator (and is the
  // single source of truth shared between the WebGL path and the fallback path).
  const [active, setActive] = useState<number>(0);
  const [captionVisible, setCaptionVisible] = useState<boolean>(true);

  const mountRef = useRef<HTMLDivElement>(null);
  const sceneHostRef = useRef<HTMLDivElement>(null);

  // The fractional carousel position GSAP tweens. Ref (not state) so the rAF loop
  // reads it without re-rendering React every frame.
  const progressRef = useRef<number>(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const activeRef = useRef<number>(0);

  const service = SERVICES[active];

  /* Decide capability after mount (window is available here). Wrapped in rAF so
     the setState lands after first paint, not synchronously inside the effect. */
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setUseFallback(decideCapability());
      setDecided(true);
    });
    return () => cancelAnimationFrame(id);
  }, [decideCapability]);

  /* Cross-fade the caption whenever the active index changes. */
  const setActiveWithFade = useCallback((next: number) => {
    setActive((prev) => {
      if (prev === next) return prev;
      setCaptionVisible(false);
      window.setTimeout(() => setCaptionVisible(true), 180);
      return next;
    });
  }, []);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  /* ─────────────────────────────────────────────────────────────────────────
     WEBGL PATH — mounted only on the capable, decided, non-fallback branch.
     ──────────────────────────────────────────────────────────────────────── */
  const goToRef = useRef<((index: number, immediate?: boolean) => void) | null>(null);

  useEffect(() => {
    if (!decided || useFallback) return;
    const host = sceneHostRef.current;
    if (!host) return;

    let disposed = false;
    let mounted = false;
    let raf = 0;
    let inView = true;
    let needsRender = true;

    // Mutable scene handles captured by the idle-mount closure so cleanup can
    // reach them even if teardown runs before/after mount completes.
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let geometry: THREE.ShapeGeometry | null = null;
    let shadowTex: THREE.CanvasTexture | null = null;
    let reflFadeTex: THREE.CanvasTexture | null = null;
    let shadowMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | null = null;
    let shadowGeo: THREE.PlaneGeometry | null = null;
    let shadowMat: THREE.MeshBasicMaterial | null = null;
    const cards: Card[] = [];
    const loader = new THREE.TextureLoader();

    // Layout constants for the arc/stack.
    const CARD_W = 2.05;
    const CARD_H = 2.62;
    const STEP_X = 1.28; // lateral spacing between neighbours
    const STEP_Z = 0.9; // each step recedes in depth
    const SIDE_ROT = 0.62; // radians the neighbours rotate toward centre
    const MAX_VISIBLE = 4; // cards drawn either side of centre

    const width = () => host.clientWidth || 1;
    const height = () => host.clientHeight || 1;

    /* ── Per-frame placement of every card from the fractional `progress` ──── */
    const layout = () => {
      const p = progressRef.current;
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const d = i - p; // signed distance from centre, fractional
        const ad = Math.abs(d);
        const g = card.group;

        if (ad > MAX_VISIBLE + 0.5) {
          g.visible = false;
          continue;
        }
        g.visible = true;

        const sign = d === 0 ? 0 : d > 0 ? 1 : -1;
        const clamped = Math.min(ad, MAX_VISIBLE);

        // X fans out, Z recedes, slight Y dip for stacked depth.
        g.position.x = sign * (STEP_X * Math.min(ad, MAX_VISIBLE) + (1 - Math.min(ad, 1)) * 0.0);
        g.position.z = -clamped * STEP_Z;
        g.position.y = -clamped * 0.02;

        // Rotate neighbours toward the centre; centre card faces camera.
        const rot = -sign * SIDE_ROT * Math.min(ad, 1.4);
        g.rotation.y = rot;

        // Scale + opacity falloff (centre crisp & large, sides recede/fade).
        const focus = Math.max(0, 1 - ad); // 1 at centre → 0 by one step away
        const scale = 1 - Math.min(ad, MAX_VISIBLE) * 0.085;
        g.scale.setScalar(scale);

        const op = Math.max(0.18, 1 - clamped * 0.26);
        card.material.opacity = op;
        // Fake DOF / desaturation: dim the off-centre tint toward a cool grey.
        const tint = 0.72 + 0.28 * focus;
        card.material.color.setRGB(tint, tint, tint);

        // Reflection only meaningful directly under the (near-)active card.
        const reflOp = Math.max(0, 0.34 * (focus * focus));
        card.reflMaterial.opacity = reflOp;
        card.reflection.visible = reflOp > 0.012;

        // Render order: closer to centre draws on top.
        g.renderOrder = Math.round(100 - ad * 10);
      }
      needsRender = true;
    };

    /* ── Resolve the active index from progress + sync the DOM caption ─────── */
    const syncActive = () => {
      const idx = Math.round(progressRef.current);
      const clamped = Math.max(0, Math.min(COUNT - 1, idx));
      if (clamped !== activeRef.current) setActiveWithFade(clamped);
    };

    /* ── Navigation: tween progress to a target index, snap, then settle ───── */
    const goTo = (indexRaw: number, immediate = false) => {
      const index = Math.max(0, Math.min(COUNT - 1, indexRaw));
      tweenRef.current?.kill();
      if (immediate) {
        progressRef.current = index;
        layout();
        syncActive();
        return;
      }
      tweenRef.current = gsap.to(progressRef, {
        current: index,
        duration: 0.78,
        ease: "expo.out",
        onUpdate: () => {
          layout();
        },
        onComplete: () => {
          progressRef.current = index;
          layout();
          syncActive();
        },
      });
      // Update caption as soon as we commit to a target (feels responsive).
      syncActiveTo(index);
    };
    const syncActiveTo = (index: number) => {
      const clamped = Math.max(0, Math.min(COUNT - 1, index));
      if (clamped !== activeRef.current) setActiveWithFade(clamped);
    };
    goToRef.current = goTo;

    /* ── rAF loop (only renders when something changed + in view) ──────────── */
    const renderLoop = () => {
      if (disposed) return;
      raf = requestAnimationFrame(renderLoop);
      if (!inView || !renderer || !scene || !camera) return;
      if (needsRender) {
        renderer.render(scene, camera);
        needsRender = false;
      }
    };

    /* ── Event handlers (declared here so cleanup can detach them) ─────────── */
    let wheelAccum = 0;
    let wheelLock = false;
    const onWheel = (e: WheelEvent) => {
      // Only hijack mostly-horizontal-ish intent OR deliberate vertical wheel on
      // the canvas; let the page keep scrolling otherwise feels trapping. We use
      // the dominant delta and step one card at a time with a small debounce.
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 2) return;
      e.preventDefault();
      wheelAccum += delta;
      if (wheelLock) return;
      if (Math.abs(wheelAccum) > 40) {
        const dir = wheelAccum > 0 ? 1 : -1;
        wheelAccum = 0;
        wheelLock = true;
        window.setTimeout(() => (wheelLock = false), 260);
        goTo(Math.round(progressRef.current) + dir);
      }
    };

    let dragging = false;
    let dragStartX = 0;
    let dragStartProgress = 0;
    const pxPerCard = () => Math.max(120, width() / 5);
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      dragStartX = e.clientX;
      dragStartProgress = progressRef.current;
      tweenRef.current?.kill();
      host.setPointerCapture?.(e.pointerId);
      host.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - dragStartX;
      const next = dragStartProgress - dx / pxPerCard();
      progressRef.current = Math.max(-0.4, Math.min(COUNT - 1 + 0.4, next));
      layout();
    };
    const endDrag = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      host.style.cursor = "grab";
      host.releasePointerCapture?.(e.pointerId);
      goTo(Math.round(progressRef.current)); // snap to nearest
    };

    // Arrow keys nudge the carousel, but only while the section is on screen so
    // we don't hijack ← → for the rest of the page.
    const onKey = (e: KeyboardEvent) => {
      if (!inView) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(Math.round(progressRef.current) + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(Math.round(progressRef.current) - 1);
      }
    };

    const onResize = () => {
      if (!renderer || !camera) return;
      renderer.setSize(width(), height(), false);
      camera.aspect = width() / height();
      camera.updateProjectionMatrix();
      needsRender = true;
    };

    let io: IntersectionObserver | null = null;
    let ro: ResizeObserver | null = null;

    /* ── Build the scene (deferred to idle so it never blocks first paint) ── */
    const build = () => {
      if (disposed || mounted) return;
      mounted = true;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width(), height(), false);
      renderer.domElement.style.cssText =
        "position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:pan-y;";
      host.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(34, width() / height(), 0.1, 100);
      camera.position.set(0, 0.08, 6.4);
      camera.lookAt(0, 0, 0);

      geometry = roundedPlaneGeometry(CARD_W, CARD_H, 0.16);
      reflFadeTex = makeReflectionFadeTexture();

      // Soft contact shadow under the centre of the stack.
      shadowTex = makeShadowTexture();
      shadowGeo = new THREE.PlaneGeometry(5.4, 2.0);
      shadowMat = new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        depthWrite: false,
        opacity: 0.9,
      });
      shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
      shadowMesh.position.set(0, -CARD_H / 2 - 0.34, 0.2);
      shadowMesh.rotation.x = -Math.PI / 2.2;
      shadowMesh.renderOrder = -10;
      scene.add(shadowMesh);

      for (let i = 0; i < COUNT; i++) {
        const group = new THREE.Group();

        const material = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(geometry, material) as Card["mesh"];

        // Reflection: same geometry mirrored under the card, faded by a gradient
        // applied as an alphaMap on a white material for the premium sheen.
        const reflMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          depthWrite: false,
          opacity: 0,
          alphaMap: reflFadeTex ?? undefined,
          side: THREE.DoubleSide,
        });
        const reflection = new THREE.Mesh(geometry, reflMaterial) as Card["reflection"];
        reflection.scale.y = -1; // mirror vertically
        reflection.position.y = -CARD_H - 0.06;
        reflection.visible = false;

        group.add(mesh);
        group.add(reflection);
        scene.add(group);

        const card: Card = { group, mesh, reflection, material, reflMaterial, texture: null };
        cards.push(card);

        // Load the real treatment photo; cover-fit via UV repeat/offset once known.
        const url = SERVICES[i].photo;
        loader.load(
          url,
          (tex) => {
            if (disposed) {
              tex.dispose();
              return;
            }
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.anisotropy = renderer ? renderer.capabilities.getMaxAnisotropy() : 1;
            tex.center.set(0.5, 0.5);
            // Cover-fit: scale the UVs so the image fills the card aspect.
            const img = tex.image as { width?: number; height?: number } | undefined;
            const iw = img?.width ?? 1;
            const ih = img?.height ?? 1;
            const cardAspect = CARD_W / CARD_H;
            const imgAspect = iw / ih;
            if (imgAspect > cardAspect) {
              tex.repeat.set(cardAspect / imgAspect, 1);
            } else {
              tex.repeat.set(1, imgAspect / cardAspect);
            }
            tex.offset.set((1 - tex.repeat.x) / 2, (1 - tex.repeat.y) / 2);
            material.map = tex;
            reflMaterial.map = tex;
            material.needsUpdate = true;
            reflMaterial.needsUpdate = true;
            card.texture = tex;
            needsRender = true;
          },
          undefined,
          () => {
            /* On a failed photo load, leave the soft white card — never crash. */
          }
        );
      }

      // Initial placement.
      progressRef.current = activeRef.current;
      layout();
      needsRender = true;

      // Listeners.
      host.addEventListener("wheel", onWheel, { passive: false });
      host.addEventListener("pointerdown", onPointerDown);
      host.addEventListener("pointermove", onPointerMove);
      host.addEventListener("pointerup", endDrag);
      host.addEventListener("pointercancel", endDrag);
      host.style.cursor = "grab";
      window.addEventListener("resize", onResize);
      window.addEventListener("keydown", onKey);

      ro = new ResizeObserver(onResize);
      ro.observe(host);

      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            inView = entry.isIntersecting;
            if (inView) needsRender = true;
          }
        },
        { threshold: 0.05 }
      );
      io.observe(host);

      renderLoop();
    };

    // Mount after first paint + idle.
    const ric =
      window.requestIdleCallback ??
      ((cb: IdleRequestCallback) =>
        window.setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 0 } as IdleDeadline), 200));
    const idleHandle = ric(() => build());

    /* ── Full teardown ─────────────────────────────────────────────────────── */
    return () => {
      disposed = true;
      if (window.cancelIdleCallback && typeof idleHandle === "number") {
        window.cancelIdleCallback(idleHandle);
      } else {
        window.clearTimeout(idleHandle as unknown as number);
      }
      cancelAnimationFrame(raf);
      tweenRef.current?.kill();
      tweenRef.current = null;
      goToRef.current = null;

      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
      host.removeEventListener("wheel", onWheel);
      host.removeEventListener("pointerdown", onPointerDown);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerup", endDrag);
      host.removeEventListener("pointercancel", endDrag);
      io?.disconnect();
      ro?.disconnect();

      for (const card of cards) {
        card.texture?.dispose();
        card.material.dispose();
        card.reflMaterial.dispose();
        scene?.remove(card.group);
      }
      cards.length = 0;
      if (shadowMesh) scene?.remove(shadowMesh);
      shadowGeo?.dispose();
      shadowMat?.dispose();
      shadowTex?.dispose();
      reflFadeTex?.dispose();
      geometry?.dispose();

      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        const el = renderer.domElement;
        el.parentNode?.removeChild(el);
      }
      renderer = null;
      scene = null;
      camera = null;
    };
  }, [decided, useFallback, setActiveWithFade]);

  /* ── Public navigation used by the on-screen buttons (WebGL path) ────────── */
  const step = useCallback((dir: number) => {
    const go = goToRef.current;
    if (go) {
      go(Math.round(progressRef.current) + dir);
    } else {
      // Fallback path doesn't use goToRef — handled by the fallback scroller.
      setActiveWithFade(Math.max(0, Math.min(COUNT - 1, activeRef.current + dir)));
    }
  }, [setActiveWithFade]);

  /* ── Fallback path: native scroll-snap carousel refs ─────────────────────── */
  const trackRef = useRef<HTMLDivElement>(null);
  const fallbackStep = useCallback((dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(COUNT - 1, activeRef.current + dir));
    const child = track.children[next] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, []);

  // On the fallback path, derive the active card from scroll position.
  useEffect(() => {
    if (!decided || !useFallback) return;
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        for (let i = 0; i < track.children.length; i++) {
          const el = track.children[i] as HTMLElement;
          const elCenter = el.offsetLeft + el.offsetWidth / 2;
          const dist = Math.abs(elCenter - center);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        }
        if (best !== activeRef.current) setActiveWithFade(best);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, [decided, useFallback, setActiveWithFade]);

  const pos = useMemo(() => String(active + 1).padStart(2, "0"), [active]);
  const total = useMemo(() => String(COUNT).padStart(2, "0"), []);

  return (
    <section id="d5" aria-labelledby="d5-heading" className="d5-section" ref={mountRef}>
      <style>{D5_CSS}</style>

      <div className="container">
        <div className="d5-head">
          <span className="font-display d5-eyebrow">{EYEBROW}</span>
          <h2 id="d5-heading" className="font-serif d5-title">
            {TITLE}
          </h2>
          <p className="d5-sub">{SUBCOPY}</p>
        </div>
      </div>

      {/* Until we've decided, render nothing heavy — a tiny placeholder keeps
          layout stable and avoids a flash of the wrong path. */}
      {!decided && <div className="d5-stage d5-stage--placeholder" aria-hidden />}

      {decided && useFallback && (
        /* ── DOM FALLBACK: polished scroll-snap carousel (mobile / reduced) ── */
        <div className="container">
          <div
            className="d5-fb-track"
            ref={trackRef}
            role="group"
            aria-roledescription="carousel"
            aria-label="Treatments"
          >
            {SERVICES.map((s, i) => (
              <article className="d5-fb-card" key={s.href} aria-roledescription="slide" aria-label={`${i + 1} of ${COUNT}: ${s.label}`}>
                <div className="d5-fb-media">
                  <Image
                    src={s.photo}
                    alt={s.label}
                    fill
                    sizes="(max-width: 768px) 80vw, 360px"
                    style={{ objectFit: "cover" }}
                    loading={i < 2 ? "eager" : "lazy"}
                  />
                </div>
                <div className="d5-fb-body">
                  <h3 className="font-serif d5-fb-name">{s.label}</h3>
                  <p className="d5-fb-blurb">{s.blurb}</p>
                  <a href={s.href} className="font-display d5-explore">
                    Explore <span aria-hidden>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="d5-fb-controls">
            <button type="button" className="d5-nav" aria-label="Previous treatment" onClick={() => fallbackStep(-1)}>
              <span aria-hidden>←</span>
            </button>
            <span className="font-display d5-counter" aria-live="polite">
              {pos} <span className="d5-counter-sep">/</span> {total}
            </span>
            <button type="button" className="d5-nav" aria-label="Next treatment" onClick={() => fallbackStep(1)}>
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      )}

      {decided && !useFallback && (
        /* ── WEBGL PATH: the cinematic coverflow stage + crisp DOM caption ── */
        <div className="container">
          <div className="d5-stage">
            <div className="d5-canvas-host" ref={sceneHostRef} aria-hidden />

            {/* Crisp DOM caption, cross-fading on active change. */}
            <div className={`d5-caption ${captionVisible ? "is-in" : "is-out"}`} aria-live="polite">
              <h3 className="font-serif d5-cap-name" key={`${active}-name`}>
                {service.label}
              </h3>
              <p className="d5-cap-blurb" key={`${active}-blurb`}>
                {service.blurb}
              </p>
              <a href={service.href} className="font-display d5-explore">
                Explore <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          {/* Controls + position indicator. */}
          <div className="d5-controls">
            <button type="button" className="d5-nav" aria-label="Previous treatment" onClick={() => step(-1)}>
              <span aria-hidden>←</span>
            </button>
            <span className="font-display d5-counter" aria-live="polite">
              {pos} <span className="d5-counter-sep">/</span> {total}
            </span>
            <button type="button" className="d5-nav" aria-label="Next treatment" onClick={() => step(1)}>
              <span aria-hidden>→</span>
            </button>
          </div>

          <p className="d5-hint">Scroll, drag or use ← → to explore</p>
        </div>
      )}
    </section>
  );
}

/* ── Scoped styles (all `.d5-` prefixed) ──────────────────────────────────── */
const D5_CSS = `
.d5-section {
  position: relative;
  background: linear-gradient(180deg, var(--white, #fff) 0%, #fbfdfd 60%, var(--teal-100, #f7fafa) 100%);
  padding: clamp(28px, 4vw, 56px) 0 clamp(40px, 5vw, 72px);
  overflow: hidden;
}
.d5-head { text-align: center; max-width: 680px; margin: 0 auto clamp(18px, 3vw, 34px); }
.d5-eyebrow {
  display: inline-block;
  font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--teal-deep, #245052); font-weight: 600; margin-bottom: 12px;
}
.d5-title {
  color: var(--teal-deep, #245052);
  font-size: clamp(26px, 3.6vw, 44px); font-weight: 400; letter-spacing: 0.03em;
  line-height: 1.12; margin: 0 0 14px;
}
.d5-sub { color: var(--ink-soft, #3a3a3a); font-size: 15px; line-height: 1.65; margin: 0 auto; max-width: 600px; }

/* ── WebGL stage ─────────────────────────────────────────────────────────── */
.d5-stage {
  position: relative;
  width: 100%;
  height: clamp(360px, 46vw, 540px);
  margin: 0 auto;
}
.d5-stage--placeholder {
  background: radial-gradient(120% 90% at 50% 30%, rgba(150,178,178,0.10), transparent 70%);
  border-radius: var(--radius-card, 16px);
}
.d5-canvas-host {
  position: absolute; inset: 0;
  touch-action: pan-y;
}

/* Caption overlaid at the base of the stage, centred under the active card. */
.d5-caption {
  position: absolute;
  left: 50%; bottom: clamp(4px, 1.4vw, 16px);
  transform: translateX(-50%);
  width: min(440px, 86%);
  text-align: center;
  pointer-events: none;
  transition: opacity 0.34s cubic-bezier(.16,1,.3,1), transform 0.34s cubic-bezier(.16,1,.3,1);
}
.d5-caption.is-in { opacity: 1; transform: translate(-50%, 0); }
.d5-caption.is-out { opacity: 0; transform: translate(-50%, 8px); }
.d5-caption a { pointer-events: auto; }
.d5-cap-name { color: var(--teal-deep, #245052); font-size: clamp(20px, 2.4vw, 28px); font-weight: 400; letter-spacing: 0.03em; margin: 0 0 8px; }
.d5-cap-blurb { color: var(--ink-soft, #3a3a3a); font-size: 14px; line-height: 1.6; margin: 0 auto 14px; max-width: 380px; }

.d5-explore {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 600;
  color: var(--teal-deep, #245052); text-decoration: none;
  border: 1px solid var(--brand-teal, #96b2b2);
  border-radius: var(--radius-pill, 999px);
  padding: 9px 18px;
  background: rgba(255,255,255,0.7);
  transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
}
.d5-explore:hover { background: var(--teal-deep, #245052); color: #fff; border-color: var(--teal-deep, #245052); transform: translateY(-1px); }
.d5-explore span { transition: transform 0.3s cubic-bezier(.16,1,.3,1); }
.d5-explore:hover span { transform: translateX(4px); }

/* ── Controls ─────────────────────────────────────────────────────────────── */
.d5-controls, .d5-fb-controls {
  display: flex; align-items: center; justify-content: center; gap: 22px;
  margin-top: clamp(14px, 2vw, 26px);
}
.d5-nav {
  width: 46px; height: 46px; border-radius: var(--radius-pill, 999px);
  border: 1px solid var(--brand-teal, #96b2b2); background: rgba(255,255,255,0.85);
  color: var(--teal-deep, #245052); font-size: 18px; line-height: 1;
  display: inline-flex; align-items: center; justify-content: center; cursor: pointer;
  transition: background 0.28s ease, color 0.28s ease, border-color 0.28s ease, transform 0.28s ease, box-shadow 0.28s ease;
}
.d5-nav:hover { background: var(--teal-deep, #245052); color: #fff; border-color: var(--teal-deep, #245052); transform: translateY(-2px); box-shadow: 0 10px 24px rgba(36,80,82,0.18); }
.d5-nav:focus-visible { outline: 2px solid var(--teal-deep, #245052); outline-offset: 3px; }
.d5-counter {
  font-size: 13px; letter-spacing: 0.18em; color: var(--teal-deep, #245052); font-weight: 600;
  min-width: 78px; text-align: center; font-variant-numeric: tabular-nums;
}
.d5-counter-sep { color: var(--brand-taupe, #9b8d83); margin: 0 4px; }
.d5-hint {
  text-align: center; margin-top: 12px; font-size: 11px; letter-spacing: 0.06em;
  color: var(--brand-taupe, #9b8d83);
}

/* ── DOM fallback carousel ──────────────────────────────────────────────────── */
.d5-fb-track {
  display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch; padding: 8px 4px 18px;
  scrollbar-width: none;
}
.d5-fb-track::-webkit-scrollbar { display: none; }
.d5-fb-card {
  flex: 0 0 78%; max-width: 340px; scroll-snap-align: center;
  background: #fff; border: 1px solid rgba(150,178,178,0.4);
  border-radius: var(--radius-card, 16px); overflow: hidden;
  box-shadow: 0 14px 36px rgba(36,80,82,0.08);
}
@media (min-width: 520px) { .d5-fb-card { flex-basis: 46%; } }
.d5-fb-media { position: relative; width: 100%; aspect-ratio: 4 / 5; background: var(--teal-100, #f7fafa); }
.d5-fb-body { padding: 16px 18px 20px; }
.d5-fb-name { color: var(--teal-deep, #245052); font-size: 20px; font-weight: 400; letter-spacing: 0.03em; margin: 0 0 8px; }
.d5-fb-blurb { color: var(--ink-soft, #3a3a3a); font-size: 13.5px; line-height: 1.6; margin: 0 0 14px; }

@media (prefers-reduced-motion: reduce) {
  .d5-caption, .d5-explore, .d5-explore span, .d5-nav, .d5-fb-track { transition: none !important; scroll-behavior: auto !important; }
}
`;
