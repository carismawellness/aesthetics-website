"use client";

/**
 * Direction 4 — "Infinite Draggable Canvas"
 * ------------------------------------------
 * All 12 treatments rendered as textured planes floating on a 2D plane in 3D
 * space (raw three.js — NO fiber/drei). Drag with momentum/inertia to roam; the
 * grid wraps INFINITELY (toroidal) so panning never dead-ends. Raycast hover
 * scales/sharpens the focused tile and recedes/dims the rest (cheap shader
 * desaturate, not blur). Click a tile → router.push(href). A crisp DOM caption
 * overlay tracks the hovered tile.
 *
 * Heavy WebGL is fully gated: prefers-reduced-motion, coarse-pointer, ≤768px and
 * Save-Data all fall back to a polished native scroll-snap carousel of the real
 * photo cards. WebGL mounts only after first paint + idle, pauses when offscreen,
 * and tears down completely on unmount (no orphan canvas, no leaks).
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as THREE from "three";
import { SERVICES, type ServiceItem } from "@/components/preview/treatments/data";

/* ------------------------------------------------------------------ */
/* Grid geometry constants                                            */
/* ------------------------------------------------------------------ */
const COLS = 4;
const ROWS = 3; // 4 × 3 = 12 tiles
const TILE_W = 2.05; // world units
const TILE_H = 2.55;
const GAP_X = 0.85;
const GAP_Y = 0.75;
const CELL_W = TILE_W + GAP_X;
const CELL_H = TILE_H + GAP_Y;
const GRID_W = COLS * CELL_W; // toroidal wrap period (x)
const GRID_H = ROWS * CELL_H; // toroidal wrap period (y)

// Deterministic organic scatter per index (no Math.random so SSR/CSR agree and
// the layout is stable across remounts).
function scatter(i: number): { ox: number; oy: number; rot: number } {
  const a = Math.sin(i * 12.9898) * 43758.5453;
  const b = Math.sin(i * 78.233) * 12543.987;
  const c = Math.sin(i * 39.425) * 9123.11;
  const f = (n: number) => n - Math.floor(n); // fract
  return {
    ox: (f(a) - 0.5) * 0.42,
    oy: (f(b) - 0.5) * 0.42,
    rot: (f(c) - 0.5) * 0.07,
  };
}

/* ------------------------------------------------------------------ */
/* Shaders — rounded-corner SDF + cover-fit UV + desaturate/dim       */
/* ------------------------------------------------------------------ */
const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTex;
  uniform float uHasTex;     // 1.0 once texture is loaded
  uniform vec2  uTexAspect;  // cover-fit scale factors
  uniform float uRadius;     // corner radius (0..0.5 of min dim)
  uniform float uFocus;      // 0 = receded, 1 = focused
  uniform float uAspect;     // tile width / height (for even radius)
  uniform vec3  uTint;       // brand ground tint for placeholder
  uniform float uShadow;     // soft drop-shadow strength

  // Rounded-box signed distance (centered uv in -0.5..0.5, half-extents h)
  float sdRoundBox(vec2 p, vec2 b, float r){
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  void main() {
    // Cover-fit: scale uv around center so the photo fills without stretching.
    vec2 uv = (vUv - 0.5) * uTexAspect + 0.5;

    vec2 p = vUv - 0.5;
    // Account for non-square tile so corners look uniform.
    vec2 b = vec2(0.5 * uAspect, 0.5);
    float r = uRadius * (uAspect < 1.0 ? uAspect : 1.0);
    float d = sdRoundBox(p * vec2(uAspect, 1.0), b, r);

    float aa = fwidth(d) * 1.25;
    float inside = smoothstep(aa, -aa, d);

    // Soft drop shadow just outside the card edge.
    float shadow = smoothstep(0.10, 0.0, d) * uShadow;

    vec4 tex = texture2D(uTex, clamp(uv, 0.0, 1.0));
    vec3 col = mix(uTint, tex.rgb, uHasTex);

    // Desaturate + dim receded tiles (cheap — avoids real blur).
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    float sat = mix(0.55, 1.0, uFocus);          // recede → toward grayscale
    col = mix(vec3(lum), col, sat);
    float dim = mix(0.74, 1.0, uFocus);          // recede → darker
    col *= dim;
    // Subtle contrast lift on the focused tile.
    col = mix(vec3(0.5), col, mix(0.94, 1.07, uFocus));

    // Premultiplied-ish output: shadow falls outside the card.
    vec3 outCol = col;
    float alpha = inside;

    // Composite shadow underneath transparent area as soft dark teal.
    vec3 shadowCol = vec3(0.10, 0.18, 0.18);
    outCol = mix(shadowCol, outCol, inside);
    alpha = max(alpha, shadow);

    if (alpha < 0.004) discard;
    gl_FragColor = vec4(outCol, alpha);
  }
`;

type TileUniforms = {
  uTex: { value: THREE.Texture };
  uHasTex: { value: number };
  uTexAspect: { value: THREE.Vector2 };
  uRadius: { value: number };
  uFocus: { value: number };
  uAspect: { value: number };
  uTint: { value: THREE.Color };
  uShadow: { value: number };
};

type Tile = {
  group: THREE.Group; // holds positional offset + wrap
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  uniforms: TileUniforms;
  baseX: number; // un-wrapped grid position
  baseY: number;
  rot: number;
  focusTarget: number; // 0/1 lerp target
  zTarget: number;
  scaleTarget: number;
  index: number;
};

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
export default function Direction4DraggableCanvas() {
  const router = useRouter();
  const services = useMemo<ServiceItem[]>(() => SERVICES, []);

  const mountRef = useRef<HTMLDivElement | null>(null);
  const [lite, setLite] = useState<boolean | null>(null); // null = undecided (SSR)
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(true);

  /* ---- Decide WebGL vs lite fallback on the client only ---- */
  useEffect(() => {
    let cancelled = false;
    // Defer out of the effect body (avoids synchronous cascading render) and
    // run only after mount where window/navigator are available.
    const id = window.setTimeout(() => {
      if (cancelled) return;
      const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const small = window.innerWidth < 768;
      const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
      const saveData = Boolean(nav.connection?.saveData);
      setLite(rm || coarse || small || saveData);
    }, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, []);

  /* ---- WebGL scene (only when !lite) ---- */
  useEffect(() => {
    if (lite !== false) return; // wait for decision; skip in lite mode
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.OrthographicCamera | null = null;
    let raf = 0;
    let idleHandle: number | null = null;
    let running = false;

    const tiles: Tile[] = [];
    const textures: THREE.Texture[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.ShaderMaterial[] = [];

    // Pan / momentum state (world units).
    const pan = { x: 0, y: 0 };
    const vel = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0, down: false, moved: false };
    const last = { x: 0, y: 0 };
    const downAt = { x: 0, y: 0, t: 0 };
    let hovered = -1;
    let interacted = false;

    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();

    // Visible world half-extents (set in resize) for tile wrapping.
    const view = { halfW: 6, halfH: 4 };

    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";

    const groundTint = new THREE.Color("#eef4f4");

    /* --- Build scene --- */
    scene = new THREE.Scene();
    scene.background = null;

    camera = new THREE.OrthographicCamera(-6, 6, 4, -4, 0.1, 100);
    camera.position.z = 10;

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.cursor = "grab";
    canvas.style.touchAction = "none";

    // Build the 12 tiles.
    services.forEach((svc, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const sc = scatter(i);
      const baseX = (col - (COLS - 1) / 2) * CELL_W + sc.ox;
      const baseY = ((ROWS - 1) / 2 - row) * CELL_H + sc.oy;

      const geo = new THREE.PlaneGeometry(TILE_W, TILE_H, 1, 1);
      geometries.push(geo);

      const placeholder = new THREE.Texture();
      const uniforms: TileUniforms = {
        uTex: { value: placeholder },
        uHasTex: { value: 0 },
        uTexAspect: { value: new THREE.Vector2(1, 1) },
        uRadius: { value: 0.06 },
        uFocus: { value: 0.35 },
        uAspect: { value: TILE_W / TILE_H },
        uTint: { value: groundTint.clone() },
        uShadow: { value: 0.0 },
      };

      const mat = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: uniforms as unknown as { [k: string]: THREE.IUniform },
        transparent: true,
        depthWrite: false,
      });
      materials.push(mat);

      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.z = sc.rot;
      mesh.userData.index = i;

      const group = new THREE.Group();
      group.add(mesh);
      scene!.add(group);

      const tile: Tile = {
        group,
        mesh,
        uniforms,
        baseX,
        baseY,
        rot: sc.rot,
        focusTarget: 0,
        zTarget: 0,
        scaleTarget: 1,
        index: i,
      };
      tiles.push(tile);

      // Load texture (cover-fit aspect computed on load).
      loader.load(
        svc.photo,
        (tex) => {
          if (disposed) {
            tex.dispose();
            return;
          }
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = renderer ? renderer.capabilities.getMaxAnisotropy() : 1;
          tex.generateMipmaps = true;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          tex.magFilter = THREE.LinearFilter;
          tex.needsUpdate = true;
          textures.push(tex);

          const tileAspect = TILE_W / TILE_H;
          const imgAspect =
            (tex.image as { width: number; height: number }).width /
            (tex.image as { width: number; height: number }).height;
          // Cover-fit: shrink the longer image axis in UV space.
          let sx = 1;
          let sy = 1;
          if (imgAspect > tileAspect) {
            sx = tileAspect / imgAspect; // image wider → crop sides
          } else {
            sy = imgAspect / tileAspect; // image taller → crop top/bottom
          }
          uniforms.uTexAspect.value.set(sx, sy);
          uniforms.uTex.value = tex;
          uniforms.uHasTex.value = 1;
        },
        undefined,
        () => {
          /* missing photo → keep tinted placeholder */
        }
      );
    });

    /* --- Resize --- */
    function resize() {
      if (!renderer || !camera || !mount) return;
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      const aspect = w / h;
      // Frame ~one grid-width of content; scale the ortho frustum to aspect.
      const halfH = 4.2;
      const halfW = halfH * aspect;
      camera.left = -halfW;
      camera.right = halfW;
      camera.top = halfH;
      camera.bottom = -halfH;
      camera.updateProjectionMatrix();
      view.halfW = halfW;
      view.halfH = halfH;
    }
    resize();

    /* --- Pointer / drag handling --- */
    function setNdc(clientX: number, clientY: number) {
      const r = canvas.getBoundingClientRect();
      ndc.x = ((clientX - r.left) / r.width) * 2 - 1;
      ndc.y = -((clientY - r.top) / r.height) * 2 + 1;
      pointer.x = clientX;
      pointer.y = clientY;
    }

    function onPointerDown(e: PointerEvent) {
      pointer.down = true;
      pointer.moved = false;
      last.x = e.clientX;
      last.y = e.clientY;
      downAt.x = e.clientX;
      downAt.y = e.clientY;
      downAt.t = performance.now();
      vel.x = 0;
      vel.y = 0;
      canvas.style.cursor = "grabbing";
      canvas.setPointerCapture(e.pointerId);
    }

    function worldPerPxX() {
      const r = canvas.getBoundingClientRect();
      return (view.halfW * 2) / Math.max(1, r.width);
    }
    function worldPerPxY() {
      const r = canvas.getBoundingClientRect();
      return (view.halfH * 2) / Math.max(1, r.height);
    }

    function onPointerMove(e: PointerEvent) {
      setNdc(e.clientX, e.clientY);
      if (pointer.down) {
        const dx = (e.clientX - last.x) * worldPerPxX();
        const dy = (e.clientY - last.y) * worldPerPxY();
        // Dragging right moves content right (pan follows pointer).
        pan.x += dx;
        pan.y -= dy;
        vel.x = dx;
        vel.y = -dy;
        last.x = e.clientX;
        last.y = e.clientY;
        if (Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) > 4) {
          pointer.moved = true;
          if (!interacted) {
            interacted = true;
            setShowHint(false);
          }
        }
      }
    }

    function endDrag(e: PointerEvent) {
      if (!pointer.down) return;
      pointer.down = false;
      canvas.style.cursor = "grab";
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }

    function onPointerUp(e: PointerEvent) {
      const wasDrag = pointer.moved;
      endDrag(e);
      // Treat as click if pointer barely moved and was quick.
      if (!wasDrag && hovered >= 0) {
        const svc = services[hovered];
        if (svc) router.push(svc.href);
      }
    }

    function onPointerLeave(e: PointerEvent) {
      endDrag(e);
      hovered = -1;
      setActiveIndex(null);
    }

    function onWheel(e: WheelEvent) {
      // Allow trackpad two-finger pan to roam horizontally/vertically.
      e.preventDefault();
      pan.x -= e.deltaX * worldPerPxX();
      pan.y += e.deltaY * worldPerPxY();
      if (!interacted) {
        interacted = true;
        setShowHint(false);
      }
    }

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", endDrag);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    /* --- Wrap a base coordinate into the visible band around pan --- */
    function wrapAround(base: number, panv: number, period: number, half: number) {
      // Position of the tile in panned space, wrapped to the nearest copy that
      // is closest to screen center (creates the infinite/toroidal illusion).
      let p = base + panv;
      const margin = half + Math.max(CELL_W, CELL_H);
      // Bring p into (-margin, margin) by adding/subtracting period.
      p = ((((p + margin) % period) + period) % period) - margin;
      return p;
    }

    /* --- Hover raycast --- */
    function updateHover() {
      if (!camera) return;
      raycaster.setFromCamera(ndc, camera);
      const meshes = tiles.map((t) => t.mesh);
      const hits = raycaster.intersectObjects(meshes, false);
      let newHover = -1;
      if (hits.length > 0 && !pointer.down) {
        const m = hits[0].object as THREE.Mesh;
        newHover = (m.userData.index as number) ?? -1;
      }
      if (newHover !== hovered) {
        hovered = newHover;
        setActiveIndex(hovered >= 0 ? hovered : null);
        canvas.style.cursor = pointer.down
          ? "grabbing"
          : hovered >= 0
            ? "pointer"
            : "grab";
      }
    }

    /* --- Animation loop --- */
    const tmpClock = { last: performance.now() };
    function frame() {
      if (disposed || !renderer || !scene || !camera) return;
      raf = requestAnimationFrame(frame);

      const now = performance.now();
      const dt = Math.min(0.05, (now - tmpClock.last) / 1000);
      tmpClock.last = now;

      // Inertia: apply velocity then decay when not dragging.
      if (!pointer.down) {
        pan.x += vel.x;
        pan.y += vel.y;
        const decay = Math.pow(0.92, dt * 60);
        vel.x *= decay;
        vel.y *= decay;
        if (Math.abs(vel.x) < 1e-4) vel.x = 0;
        if (Math.abs(vel.y) < 1e-4) vel.y = 0;
      }

      updateHover();

      // Position + animate tiles.
      const lerp = 1 - Math.pow(0.001, dt); // smooth ~per-second lerp
      for (const t of tiles) {
        const px = wrapAround(t.baseX, pan.x, GRID_W, view.halfW);
        const py = wrapAround(t.baseY, pan.y, GRID_H, view.halfH);
        t.group.position.x = px;
        t.group.position.y = py;

        const isHover = t.index === hovered;
        t.focusTarget = hovered < 0 ? 0.5 : isHover ? 1 : 0;
        t.zTarget = isHover ? 1.4 : 0;
        t.scaleTarget = isHover ? 1.16 : hovered < 0 ? 1 : 0.93;

        // Lerp focus uniform, z (group) and scale (mesh).
        t.uniforms.uFocus.value += (t.focusTarget - t.uniforms.uFocus.value) * lerp;
        t.uniforms.uShadow.value +=
          ((isHover ? 0.5 : 0.22) - t.uniforms.uShadow.value) * lerp;
        t.group.position.z += (t.zTarget - t.group.position.z) * lerp;
        const s = t.mesh.scale.x + (t.scaleTarget - t.mesh.scale.x) * lerp;
        t.mesh.scale.setScalar(s);
      }

      renderer.render(scene, camera);
    }

    /* --- Visibility-gated start/stop --- */
    function start() {
      if (running || disposed) return;
      running = true;
      tmpClock.last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting) start();
        else stop();
      },
      { threshold: 0.05 }
    );

    let ro: ResizeObserver | null = null;

    /* --- Mount after first paint + idle --- */
    function mountScene() {
      if (disposed || !renderer || !mount) return;
      mount.appendChild(canvas);
      resize();
      ro = new ResizeObserver(() => resize());
      ro.observe(mount);
      io.observe(mount);
      start();
    }

    const ric = (
      window as Window & {
        requestIdleCallback?: (cb: () => void) => number;
      }
    ).requestIdleCallback;
    if (typeof ric === "function") {
      idleHandle = ric(() => mountScene());
    } else {
      idleHandle = window.setTimeout(mountScene, 200);
    }

    /* --- Cleanup --- */
    return () => {
      disposed = true;
      stop();
      const cic = (
        window as Window & { cancelIdleCallback?: (h: number) => void }
      ).cancelIdleCallback;
      if (idleHandle != null) {
        if (typeof cic === "function") cic(idleHandle);
        else clearTimeout(idleHandle);
      }
      io.disconnect();
      if (ro) ro.disconnect();

      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", endDrag);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("wheel", onWheel);

      for (const g of geometries) g.dispose();
      for (const m of materials) m.dispose();
      for (const tex of textures) tex.dispose();
      tiles.forEach((t) => {
        t.uniforms.uTex.value?.dispose?.();
        scene?.remove(t.group);
      });

      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
      }
      if (canvas.parentElement) canvas.parentElement.removeChild(canvas);
      scene = null;
      camera = null;
      renderer = null;
    };
  }, [lite, services, router]);

  const active = activeIndex != null ? services[activeIndex] : null;

  /* ================================================================ */
  /*  Render                                                          */
  /* ================================================================ */
  return (
    <section
      id="treatments-draggable-canvas"
      aria-labelledby="d4-heading"
      className="d4-section"
    >
      <style>{d4Css}</style>

      {/* Header */}
      <header className="d4-head">
        <p className="font-display d4-eyebrow">Doctor-Led Treatments</p>
        <h2 id="d4-heading" className="font-serif d4-title">
          Our Medical Aesthetic Treatments
        </h2>
        <p className="d4-sub">
          A complete menu of advanced, medically supervised treatments — each tailored
          to refresh, restore and let you glow with confidence.
        </p>
      </header>

      {/* ---- WebGL stage (desktop) ---- */}
      {lite === false && (
        <div className="d4-stage">
          <div ref={mountRef} className="d4-canvas-mount" aria-hidden="true" />

          {/* Hint */}
          <div className={`d4-hint ${showHint ? "" : "is-hidden"}`} aria-hidden="true">
            <span className="d4-hint-dot" />
            Drag to explore
          </div>

          {/* Crisp DOM caption overlay (tracks hovered tile) */}
          <div className={`d4-caption ${active ? "is-on" : ""}`} aria-hidden={!active}>
            {active && (
              <>
                <h3 className="font-serif d4-caption-name">{active.label}</h3>
                <p className="d4-caption-blurb">{active.blurb}</p>
                <a
                  className="font-display d4-caption-link"
                  href={active.href}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(active.href);
                  }}
                >
                  Explore <span aria-hidden="true">→</span>
                </a>
              </>
            )}
          </div>
        </div>
      )}

      {/* ---- Lite fallback: native scroll-snap carousel (mobile / reduced motion) ---- */}
      {lite === true && (
        <div className="d4-lite" role="list" aria-label="Medical aesthetic treatments">
          {services.map((s, i) => (
            <a
              key={s.href + i}
              role="listitem"
              className="d4-lite-card"
              href={s.href}
            >
              <span className="d4-lite-media">
                <Image
                  src={s.photo}
                  alt={s.label}
                  fill
                  sizes="(max-width: 768px) 72vw, 320px"
                  className="d4-lite-img"
                  loading="lazy"
                />
              </span>
              <span className="d4-lite-body">
                <span className="font-serif d4-lite-name">{s.label}</span>
                <span className="d4-lite-blurb">{s.blurb}</span>
                <span className="font-display d4-lite-link">
                  Explore <span aria-hidden="true">→</span>
                </span>
              </span>
            </a>
          ))}
        </div>
      )}

      {/* ---- Accessible DOM fallback: always-present link list (visually hidden on
              the WebGL path so the canvas is navigable without it). When lite,
              the carousel above already provides links, so hide this. ---- */}
      <ul className="d4-sr-links">
        {services.map((s, i) => (
          <li key={"sr-" + s.href + i}>
            <a href={s.href}>
              {s.label} — {s.blurb}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Scoped CSS                                                         */
/* ------------------------------------------------------------------ */
const d4Css = `
.d4-section {
  position: relative;
  width: 100%;
  padding: clamp(3.5rem, 7vw, 6rem) 0 clamp(3rem, 5vw, 5rem);
  background:
    radial-gradient(120% 80% at 50% -10%, var(--teal-100, #f7fafa) 0%, #ffffff 55%, #fbfdfd 100%);
  overflow: hidden;
  isolation: isolate;
}

.d4-head {
  max-width: 760px;
  margin: 0 auto clamp(1.75rem, 3vw, 2.75rem);
  padding: 0 1.5rem;
  text-align: center;
}
.d4-eyebrow {
  margin: 0 0 0.85rem;
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--brand-taupe, #9b8d83);
}
.d4-title {
  margin: 0 0 0.9rem;
  font-size: clamp(1.7rem, 3.6vw, 2.6rem);
  line-height: 1.12;
  letter-spacing: 0.01em;
  color: var(--teal-deep, #245052);
  font-weight: 400;
}
.d4-sub {
  margin: 0 auto;
  max-width: 56ch;
  font-size: clamp(0.95rem, 1.3vw, 1.05rem);
  line-height: 1.6;
  color: var(--ink-soft, #3a3a3a);
  opacity: 0.86;
}

/* Stage */
.d4-stage {
  position: relative;
  width: 100%;
  height: clamp(420px, 62vh, 640px);
  margin-top: 0.5rem;
}
.d4-canvas-mount {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* Hint */
.d4-hint {
  position: absolute;
  left: 50%;
  bottom: 1.25rem;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-pill, 999px);
  background: rgba(255, 255, 255, 0.72);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border: 1px solid color-mix(in srgb, var(--brand-teal, #96b2b2) 45%, transparent);
  color: var(--teal-deep, #245052);
  font-size: 0.74rem;
  letter-spacing: 0.04em;
  pointer-events: none;
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.d4-hint.is-hidden {
  opacity: 0;
  transform: translateX(-50%) translateY(8px);
}
.d4-hint-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--brand-teal, #96b2b2);
  box-shadow: 0 0 0 0 color-mix(in srgb, var(--brand-teal, #96b2b2) 60%, transparent);
  animation: d4pulse 2s ease-out infinite;
}
@keyframes d4pulse {
  0%   { box-shadow: 0 0 0 0 color-mix(in srgb, var(--brand-teal, #96b2b2) 55%, transparent); }
  70%  { box-shadow: 0 0 0 9px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}

/* Caption overlay */
.d4-caption {
  position: absolute;
  left: clamp(1rem, 3vw, 2.25rem);
  bottom: clamp(1rem, 3vw, 2.25rem);
  max-width: min(340px, 70vw);
  padding: 1.1rem 1.25rem 1.2rem;
  border-radius: var(--radius-card, 16px);
  background: rgba(255, 255, 255, 0.82);
  -webkit-backdrop-filter: blur(14px) saturate(1.1);
  backdrop-filter: blur(14px) saturate(1.1);
  border: 1px solid color-mix(in srgb, var(--brand-teal, #96b2b2) 40%, transparent);
  box-shadow: 0 18px 50px -22px rgba(36, 80, 82, 0.5);
  opacity: 0;
  transform: translateY(14px) scale(0.985);
  transition: opacity 0.45s cubic-bezier(.16,1,.3,1), transform 0.45s cubic-bezier(.16,1,.3,1);
  pointer-events: none;
}
.d4-caption.is-on {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}
.d4-caption-name {
  margin: 0 0 0.35rem;
  font-size: 1.18rem;
  line-height: 1.15;
  color: var(--teal-deep, #245052);
  font-weight: 400;
}
.d4-caption-blurb {
  margin: 0 0 0.85rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--ink-soft, #3a3a3a);
  opacity: 0.9;
}
.d4-caption-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--white, #fff);
  background: var(--teal-deep, #245052);
  padding: 0.5rem 0.95rem;
  border-radius: var(--radius-pill, 999px);
  text-decoration: none;
  transition: transform 0.3s cubic-bezier(.16,1,.3,1), background 0.3s ease;
}
.d4-caption-link:hover {
  transform: translateY(-2px);
  background: color-mix(in srgb, var(--teal-deep, #245052) 88%, #000);
}
.d4-caption-link span { transition: transform 0.3s ease; }
.d4-caption-link:hover span { transform: translateX(3px); }

/* Lite fallback carousel */
.d4-lite {
  display: flex;
  gap: 1rem;
  padding: 0.5rem clamp(1.25rem, 6vw, 2rem) 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.d4-lite::-webkit-scrollbar { display: none; }
.d4-lite-card {
  scroll-snap-align: center;
  flex: 0 0 auto;
  width: min(72vw, 300px);
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-card, 16px);
  overflow: hidden;
  background: #fff;
  border: 1px solid color-mix(in srgb, var(--brand-teal, #96b2b2) 32%, transparent);
  box-shadow: 0 14px 40px -26px rgba(36, 80, 82, 0.45);
  text-decoration: none;
}
.d4-lite-media {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  background: var(--teal-100, #f7fafa);
}
.d4-lite-img { object-fit: cover; }
.d4-lite-body {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.95rem 1rem 1.1rem;
}
.d4-lite-name {
  font-size: 1.05rem;
  color: var(--teal-deep, #245052);
}
.d4-lite-blurb {
  font-size: 0.85rem;
  line-height: 1.45;
  color: var(--ink-soft, #3a3a3a);
  opacity: 0.86;
}
.d4-lite-link {
  margin-top: 0.25rem;
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--teal-deep, #245052);
}

/* Visually-hidden accessible link list (keeps canvas navigable) */
.d4-sr-links {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

@media (prefers-reduced-motion: reduce) {
  .d4-caption, .d4-caption-link, .d4-hint, .d4-hint-dot { transition: none; animation: none; }
}
`;
