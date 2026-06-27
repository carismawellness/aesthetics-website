"use client";

/**
 * Direction 1 — "Liquid Glass Gallery"
 * ------------------------------------------------------------------
 * A horizontal gallery of the 12 treatment photos rendered as textured
 * image planes in a WebGL scene (full-bleed, ~70vh canvas). The DOM
 * renders the eyebrow + title + subcopy above the canvas (crisp text),
 * and an HTML caption overlay (label + blurb + "Explore →") for the
 * currently-centred treatment that crossfades as the active plane changes.
 *
 * Desktop interactive scene (three.js + custom shader):
 *  - ~12 rounded-corner photo planes on a gently curved "glass shelf".
 *  - Wheel + pointer-drag scroll the row horizontally with inertia
 *    (lerp toward target offset; momentum on release). No ScrollTrigger.
 *  - Centred plane is largest & sharpest; edge planes scale down, push
 *    back in z and vignette/fade.
 *  - Custom shader: refractive/liquid displacement strongest at the
 *    cursor and on the centred plane, faint chromatic aberration toward
 *    edges, a soft specular sheen sweep, plus a floor reflection.
 *
 * Mandatory fallback (reduced-motion OR coarse-pointer OR width<768 OR
 * Save-Data): a clean CSS scroll-snap horizontal carousel — no WebGL,
 * no rAF loop.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import { HOME_SERVICES } from "@/lib/site";

/* ---------- copy (from the shared spec) ---------- */
const EYEBROW = "Doctor-Led Treatments";
const TITLE = "Our Medical Aesthetic Treatments";
const SUBCOPY =
  "A complete menu of advanced, medically supervised treatments — each tailored to refresh, restore and let you glow with confidence.";

/* ---------- shaders ---------- */
const VERT = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uFocus;      // 0..1 how centred this plane is
  uniform vec2  uPointer;    // -1..1 pointer in this plane's local space
  uniform float uPointerAmt; // 0..1 pointer proximity / hover energy
  varying vec2  vUv;
  varying float vWave;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Subtle liquid bow toward the viewer at the centre + cursor.
    vec2 c = uv - 0.5;
    float d = length(c);
    float ripple =
      sin(d * 16.0 - uTime * 1.6) * 0.012 * uFocus +
      sin((uv.x + uv.y) * 9.0 + uTime * 0.9) * 0.006 * uFocus;

    // Pointer-driven local lift — a soft bulge under the cursor.
    float pd = distance(uv, uPointer * 0.5 + 0.5);
    float bulge = exp(-pd * pd * 9.0) * 0.05 * uPointerAmt;

    float z = ripple + bulge;
    vWave = z;
    pos.z += z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uTex;
  uniform float uTime;
  uniform float uFocus;      // 0..1 centredness
  uniform float uEdge;       // 0..1 distance from centre of row (for vignette/aberration)
  uniform float uAspect;     // plane aspect (w/h)
  uniform float uImgAspect;  // texture aspect (w/h)
  uniform float uRadius;     // corner radius in uv-ish units
  uniform vec2  uPointer;    // -1..1 local pointer
  uniform float uPointerAmt; // hover energy
  uniform vec3  uTint;       // teal sheen tint
  varying vec2  vUv;
  varying float vWave;

  // Signed-distance to a rounded rectangle (centered box of half-size b, radius r).
  float sdRoundRect(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  // cover-fit the texture so photos never distort.
  vec2 coverUv(vec2 uv, float planeA, float imgA) {
    vec2 s = vec2(1.0);
    if (imgA > planeA) s.x = planeA / imgA;
    else s.y = imgA / planeA;
    return (uv - 0.5) * s + 0.5;
  }

  void main() {
    // ----- rounded-rect alpha mask -----
    vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
    vec2 b = vec2(0.5 * uAspect, 0.5);
    float dist = sdRoundRect(p, b, uRadius);
    float aa = fwidth(dist) * 1.25;
    float mask = 1.0 - smoothstep(-aa, aa, dist);
    if (mask <= 0.001) discard;

    // ----- refractive displacement (strongest at cursor + centre) -----
    vec2 toPtr = vUv - (uPointer * 0.5 + 0.5);
    float pd = length(toPtr);
    float lens = exp(-pd * pd * 7.0) * uPointerAmt;
    vec2 disp =
      normalize(toPtr + 1e-5) * lens * 0.018 +
      vec2(sin(vUv.y * 12.0 + uTime * 0.7),
           cos(vUv.x * 12.0 - uTime * 0.6)) * 0.0035 * uFocus;

    vec2 baseUv = coverUv(vUv, uAspect, uImgAspect);

    // ----- chromatic aberration, scaled by edge distance + lens -----
    float ca = (0.0016 + uEdge * 0.004 + lens * 0.01);
    vec2 dir = normalize(vUv - 0.5 + 1e-5);
    float r = texture2D(uTex, baseUv + disp + dir * ca).r;
    float g = texture2D(uTex, baseUv + disp).g;
    float bl = texture2D(uTex, baseUv + disp - dir * ca).b;
    vec3 col = vec3(r, g, bl);

    // ----- soft specular sheen sweep (glass) -----
    float sweep = sin((vUv.x - vUv.y) * 3.2 - uTime * 0.45);
    float sheen = smoothstep(0.86, 1.0, sweep) * (0.10 + 0.22 * uFocus);
    col += sheen * mix(vec3(1.0), uTint, 0.35);

    // gentle highlight from the geometric wave (liquid catches light).
    col += clamp(vWave * 14.0, -0.05, 0.12) * mix(vec3(1.0), uTint, 0.5);

    // ----- vignette + desaturate toward the edges of the row -----
    float vig = 1.0 - smoothstep(0.35, 0.52, length((vUv - 0.5) * vec2(uAspect, 1.0)));
    float fade = mix(0.62, 1.0, uFocus);            // edge planes dim a touch
    col *= mix(0.82, 1.06, vig) * fade;

    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(lum), col, mix(0.72, 1.0, uFocus)); // edges slightly desaturated

    // teal glass rim near the rounded border.
    float rim = smoothstep(-aa * 6.0, -aa, dist) * (1.0 - smoothstep(0.0, aa, dist));
    col = mix(col, uTint, rim * 0.5 * (0.4 + 0.6 * uFocus));

    gl_FragColor = vec4(col, mask);
  }
`;

/* ---------- types ---------- */
type Tile = {
  mesh: THREE.Mesh;
  mat: THREE.ShaderMaterial;
  reflection: THREE.Mesh;
  reflMat: THREE.ShaderMaterial;
  index: number;
};

export default function Direction1LiquidGlass() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  // Decide fallback vs WebGL once, after mount (so SSR renders the fallback shell).
  const [useGL, setUseGL] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  /* -------------------- capability gate --------------------
   * Capabilities (matchMedia, Save-Data, viewport) can only be read on the
   * client after mount, and the spec wants SSR to ship the lightweight
   * fallback shell first, then upgrade capable clients to WebGL. This is a
   * genuine "read once from an external system" effect, so the synchronous
   * setState is intentional (it runs at most once and only flips when the
   * client is actually WebGL-eligible). */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqCoarse = window.matchMedia("(pointer: coarse)");
    type NavConn = Navigator & { connection?: { saveData?: boolean } };
    const saveData = (navigator as NavConn).connection?.saveData === true;
    const small = window.innerWidth < 768;

    const ok = !mqReduce.matches && !mqCoarse.matches && !small && !saveData;
    // Only escalate to the heavy path; never downgrade an already-mounted scene.
    if (ok) setUseGL(true);
  }, []);

  /* -------------------- WebGL scene -------------------- */
  useEffect(() => {
    if (!useGL) return;
    const host = canvasHostRef.current;
    const wrap = wrapRef.current;
    if (!host || !wrap) return;

    // ---- guarded handles so cleanup is total even if mount is aborted ----
    let renderer: THREE.WebGLRenderer | null = null;
    let raf = 0;
    let idleId = 0;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let mounted = true;
    let running = false;
    let started = false;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const tiles: Tile[] = [];
    const textures: THREE.Texture[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const tintColor = new THREE.Color("#96b2b2");

    // ---- motion state ----
    const PLANE_W = 2.35;
    const PLANE_H = 1.55;
    const GAP = 0.55;
    const STEP = PLANE_W + GAP;
    const COUNT = HOME_SERVICES.length;
    const maxOffset = (COUNT - 1) * STEP;

    let target = 0; // desired scroll offset (world units)
    let current = 0; // eased scroll offset
    let velocity = 0; // for momentum on release
    const pointer = new THREE.Vector2(0, 0); // -1..1 in canvas
    const pointerSmooth = new THREE.Vector2(0, 0);
    let pointerInside = 0; // eased 0..1
    let pointerActive = false;
    let dragging = false;
    let dragStartX = 0;
    let dragStartTarget = 0;
    let lastDragX = 0;
    let lastActive = -1;
    const clock = new THREE.Clock();

    // ---- helpers ----
    const sizeOf = () => {
      const r = host.getBoundingClientRect();
      return { w: Math.max(1, r.width), h: Math.max(1, r.height) };
    };

    const clampN = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

    const buildGeometry = (w: number, h: number) => {
      const g = new THREE.PlaneGeometry(w, h, 40, 28);
      geometries.push(g);
      return g;
    };

    const makeMaterial = (
      tex: THREE.Texture,
      imgAspect: number,
      isReflection: boolean
    ): THREE.ShaderMaterial => {
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uTex: { value: tex },
          uTime: { value: 0 },
          uFocus: { value: 0 },
          uEdge: { value: 0 },
          uAspect: { value: PLANE_W / PLANE_H },
          uImgAspect: { value: imgAspect },
          uRadius: { value: 0.14 },
          uPointer: { value: new THREE.Vector2(0, 0) },
          uPointerAmt: { value: 0 },
          uTint: { value: tintColor },
        },
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
      });
      if (isReflection) mat.opacity = 0.4;
      return mat;
    };

    const loader = new THREE.TextureLoader();

    // ---- interaction handlers (declared before start() uses them) ----
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      target = clampN(target + delta * 0.0042, 0, maxOffset);
      velocity = 0;
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      dragStartX = e.clientX;
      lastDragX = e.clientX;
      dragStartTarget = target;
      velocity = 0;
      if (renderer) renderer.domElement.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (renderer) {
        const r = renderer.domElement.getBoundingClientRect();
        pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        pointer.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
        pointerActive =
          e.clientX >= r.left &&
          e.clientX <= r.right &&
          e.clientY >= r.top &&
          e.clientY <= r.bottom;

        if (dragging) {
          const widthPx = renderer.domElement.clientWidth || 1;
          const dxWorld = ((e.clientX - dragStartX) / widthPx) * STEP * 5.0;
          target = clampN(dragStartTarget - dxWorld, 0, maxOffset);
          velocity = -(e.clientX - lastDragX) * 0.0009 * STEP * 5.0;
          lastDragX = e.clientX;
        }
      }
    };

    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      if (renderer) renderer.domElement.style.cursor = "grab";
    };

    const onPointerLeave = () => {
      pointerActive = false;
    };

    const onResize = () => {
      if (!renderer) return;
      const { w, h } = sizeOf();
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    // ---- viewport gating ----
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting && started && !running) {
          running = true;
          clock.getDelta(); // reset delta so first frame isn't a huge jump
          raf = requestAnimationFrame(loop);
        } else if (!e.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );

    // ---- main loop ----
    const loop = () => {
      if (!running || !renderer) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      // momentum + easing
      if (!dragging) {
        target = clampN(target + velocity, 0, maxOffset);
        velocity *= 0.92;
        if (Math.abs(velocity) < 0.00002) velocity = 0;
      }
      current += (target - current) * Math.min(1, dt * 7.5);

      // pointer easing
      pointerSmooth.lerp(pointer, Math.min(1, dt * 8));
      pointerInside += ((pointerActive ? 1 : 0) - pointerInside) * Math.min(1, dt * 6);

      // nearest-to-centre index → drives the DOM caption
      const centreF = current / STEP;
      const nearest = clampN(Math.round(centreF), 0, COUNT - 1);
      if (nearest !== lastActive) {
        lastActive = nearest;
        setActiveIndex(nearest);
      }

      const canvas = renderer.domElement;
      const canvasAspect = (canvas.clientWidth || 1) / (canvas.clientHeight || 1);

      for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        const rel = i * STEP - current; // signed world distance from centre
        const norm = rel / STEP; // in "card units"
        const absN = Math.abs(norm);

        const focus = Math.max(0, 1 - Math.min(absN, 1.6) / 1.6);
        const focusEase = focus * focus * (3 - 2 * focus); // smoothstep

        // position on a gently curved shelf — edges push back in z, tilt in.
        const x = rel;
        const z = -Math.min(absN, 4) * 0.85 - (1 - focusEase) * 0.25;
        const y = -Math.min(absN, 4) * 0.04;
        const rotY = -norm * 0.16;
        const scale = 0.82 + focusEase * 0.26;

        const m = tile.mesh;
        m.position.set(x, y, z);
        m.rotation.y = rotY;
        m.rotation.z = norm * 0.012;
        m.scale.setScalar(scale);
        m.renderOrder = Math.round(focusEase * 100);

        // local pointer relative to this plane (only meaningful for focused tiles)
        const localPx = clampN(pointerSmooth.x * canvasAspect * 0.42 - x * 0.42, -1, 1);
        const localPy = clampN(pointerSmooth.y, -1, 1);
        const ptrAmt = focusEase * pointerInside;

        tile.mat.uniforms.uTime.value = t;
        tile.mat.uniforms.uFocus.value = focusEase;
        tile.mat.uniforms.uEdge.value = Math.min(absN / 1.8, 1);
        (tile.mat.uniforms.uPointer.value as THREE.Vector2).set(localPx, localPy);
        tile.mat.uniforms.uPointerAmt.value = ptrAmt;

        // reflection sits below, fades fast with distance.
        const refl = tile.reflection;
        refl.position.set(x, y - PLANE_H * scale - 0.08, z);
        refl.rotation.y = rotY;
        refl.rotation.z = -norm * 0.012;
        refl.scale.set(scale, -scale, scale);
        refl.renderOrder = -1;
        tile.reflMat.uniforms.uTime.value = t;
        tile.reflMat.uniforms.uFocus.value = focusEase;
        tile.reflMat.uniforms.uEdge.value = Math.min(absN / 1.8, 1);
        tile.reflMat.uniforms.uPointerAmt.value = 0;
        tile.reflMat.opacity = 0.32 * focusEase;
        refl.visible = focusEase > 0.04;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };

    // ---- build + boot the scene ----
    const start = () => {
      if (!mounted || started) return;
      started = true;

      const { w, h } = sizeOf();
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
      } catch {
        // WebGL unavailable → fall back to the DOM carousel.
        setUseGL(false);
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h, false);
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);
      const canvas = renderer.domElement;
      canvas.style.display = "block";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.cursor = "grab";
      canvas.style.touchAction = "pan-y";

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      const geo = buildGeometry(PLANE_W, PLANE_H);

      HOME_SERVICES.forEach((s, i) => {
        const tex = loader.load(s.photo, (loaded) => {
          loaded.colorSpace = THREE.SRGBColorSpace;
          const img = loaded.image as { width?: number; height?: number } | undefined;
          if (img && img.width && img.height) {
            const a = img.width / img.height;
            mat.uniforms.uImgAspect.value = a;
            reflMat.uniforms.uImgAspect.value = a;
          }
          loaded.minFilter = THREE.LinearMipmapLinearFilter;
          loaded.magFilter = THREE.LinearFilter;
          loaded.anisotropy = renderer ? renderer.capabilities.getMaxAnisotropy() : 1;
          loaded.needsUpdate = true;
        });
        tex.colorSpace = THREE.SRGBColorSpace;
        textures.push(tex);

        const mat = makeMaterial(tex, PLANE_W / PLANE_H, false);
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);

        // floor reflection — same plane mirrored below, faded.
        const reflMat = makeMaterial(tex, PLANE_W / PLANE_H, true);
        const reflection = new THREE.Mesh(geo, reflMat);
        reflection.scale.y = -1;
        scene.add(reflection);

        tiles.push({ mesh, mat, reflection, reflMat, index: i });
      });

      // listeners
      canvas.addEventListener("wheel", onWheel, { passive: false });
      canvas.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      canvas.addEventListener("pointerleave", onPointerLeave);

      io.observe(wrap);
      window.addEventListener("resize", onResize);
      onResize();
    };

    // ---- deferred mount: after first paint + idle ----
    type IdleWin = Window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const w = window as IdleWin;
    if (typeof w.requestIdleCallback === "function") {
      idleId = w.requestIdleCallback(() => {
        if (mounted) start();
      });
    } else {
      idleTimer = setTimeout(() => {
        if (mounted) start();
      }, 200);
    }

    // ---- cleanup ----
    return () => {
      mounted = false;
      running = false;
      if (raf) cancelAnimationFrame(raf);
      const win = window as IdleWin;
      if (idleId && typeof win.cancelIdleCallback === "function") win.cancelIdleCallback(idleId);
      if (idleTimer) clearTimeout(idleTimer);

      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);

      if (renderer) {
        const canvas = renderer.domElement;
        canvas.removeEventListener("wheel", onWheel);
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointerleave", onPointerLeave);
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
        renderer.dispose();
        renderer.forceContextLoss();
        renderer = null;
      }

      tiles.forEach((tile) => {
        scene.remove(tile.mesh);
        scene.remove(tile.reflection);
        tile.mat.dispose();
        tile.reflMat.dispose();
      });
      geometries.forEach((g) => g.dispose());
      textures.forEach((tx) => tx.dispose());
      tiles.length = 0;
    };
  }, [useGL]);

  const active = HOME_SERVICES[Math.min(activeIndex, HOME_SERVICES.length - 1)];

  return (
    <section
      id="d1-section"
      aria-labelledby="d1-heading"
      style={{ position: "relative", padding: "clamp(40px,6vw,72px) 0 clamp(48px,7vw,96px)" }}
    >
      <style>{d1Css}</style>

      {/* ---- crisp DOM header ---- */}
      <div className="d1-head container">
        <span className="d1-eyebrow font-serif">{EYEBROW}</span>
        <h2 id="d1-heading" className="d1-title font-serif">
          {TITLE}
        </h2>
        <p className="d1-sub">{SUBCOPY}</p>
      </div>

      {/* ---- stage ---- */}
      <div ref={wrapRef} className="d1-stage">
        {useGL ? (
          <>
            <div ref={canvasHostRef} className="d1-canvas-host" aria-hidden="true" />

            {/* HTML caption overlay — crossfades on active change */}
            <div ref={captionRef} className="d1-caption" aria-live="polite">
              <div key={activeIndex} className="d1-caption-inner">
                <span className="d1-caption-index font-display">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(HOME_SERVICES.length).padStart(2, "0")}
                </span>
                <h3 className="d1-caption-label font-serif">{active.label}</h3>
                <p className="d1-caption-blurb">{active.blurb}</p>
                <a className="d1-caption-link font-display" href={active.href}>
                  Explore <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <p className="d1-hint font-display" aria-hidden="true">
              Drag · scroll to explore
            </p>
          </>
        ) : (
          /* -------- polished CSS scroll-snap fallback (no WebGL / no rAF) -------- */
          <div className="d1-fallback" role="list" aria-label="Treatments">
            {HOME_SERVICES.map((s) => (
              <a key={s.href} role="listitem" className="d1-fcard" href={s.href}>
                <span className="d1-fimg">
                  <Image
                    src={s.photo}
                    alt={s.label}
                    fill
                    sizes="(max-width: 768px) 78vw, 320px"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="d1-fsheen" aria-hidden="true" />
                </span>
                <span className="d1-fbody">
                  <span className="d1-flabel font-serif">{s.label}</span>
                  <span className="d1-fblurb">{s.blurb}</span>
                  <span className="d1-flink font-display">
                    Explore <span aria-hidden="true">→</span>
                  </span>
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------- scoped CSS (prefixed d1-) -------------------- */
const d1Css = `
#d1-section { --d1-line: var(--line, #8a8a8a); }

.d1-head {
  text-align: center;
  max-width: 760px;
  margin: 0 auto;
}
.d1-eyebrow {
  display: inline-block;
  font-size: clamp(10px, 1.1vw, 12px);
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--brand-taupe, #9b8d83);
  margin-bottom: 14px;
}
.d1-eyebrow::after {
  content: "";
  display: block;
  width: 46px;
  height: 1px;
  margin: 12px auto 0;
  background: var(--brand-teal, #96b2b2);
}
.d1-title {
  font-weight: 400;
  color: var(--teal-deep, #245052);
  font-size: clamp(26px, 4vw, 46px);
  line-height: 1.1;
  letter-spacing: 0.02em;
  margin: 0;
}
.d1-sub {
  color: var(--ink-soft, #3a3a3a);
  font-size: clamp(14px, 1.5vw, 16px);
  line-height: 1.7;
  max-width: 600px;
  margin: 16px auto 0;
}

/* stage */
.d1-stage {
  position: relative;
  width: 100%;
  margin-top: clamp(24px, 3vw, 44px);
}

/* full-bleed canvas host, ~70vh, soft cool ground + teal glow */
.d1-canvas-host {
  position: relative;
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
  height: 70vh;
  min-height: 460px;
  max-height: 760px;
  background:
    radial-gradient(120% 90% at 50% 36%, #ffffff 0%, var(--teal-100, #f7fafa) 46%, #eef4f4 100%);
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 7%, #000 93%, transparent 100%);
  mask-image: linear-gradient(90deg, transparent 0, #000 7%, #000 93%, transparent 100%);
}
.d1-canvas-host::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(60% 50% at 50% 42%, rgba(150,178,178,0.16), transparent 70%);
}

/* caption overlay */
.d1-caption {
  position: absolute;
  left: 50%;
  bottom: clamp(18px, 4vh, 40px);
  transform: translateX(-50%);
  width: min(560px, 86vw);
  text-align: center;
  pointer-events: none;
  z-index: 3;
}
.d1-caption-inner {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 18px 26px;
  border-radius: var(--radius-card, 16px);
  background: rgba(255,255,255,0.72);
  border: 1px solid rgba(150,178,178,0.5);
  box-shadow: 0 18px 50px -28px rgba(36,80,82,0.5);
  backdrop-filter: saturate(1.25) blur(12px);
  -webkit-backdrop-filter: saturate(1.25) blur(12px);
  animation: d1-fade 560ms cubic-bezier(.16,1,.3,1) both;
}
@keyframes d1-fade {
  from { opacity: 0; transform: translateY(10px); filter: blur(4px); }
  to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
}
.d1-caption-index {
  font-size: 10px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--brand-taupe, #9b8d83);
}
.d1-caption-label {
  font-size: clamp(20px, 2.6vw, 30px);
  font-weight: 400;
  color: var(--teal-deep, #245052);
  letter-spacing: 0.03em;
  margin: 2px 0 0;
}
.d1-caption-blurb {
  font-size: 14px;
  line-height: 1.6;
  color: var(--ink-soft, #3a3a3a);
  margin: 0;
  max-width: 460px;
}
.d1-caption-link {
  pointer-events: auto;
  margin-top: 8px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #fff;
  background: var(--teal-deep, #245052);
  border-radius: var(--radius-pill, 999px);
  padding: 9px 20px;
  text-decoration: none;
  transition: transform .4s cubic-bezier(.16,1,.3,1), box-shadow .4s cubic-bezier(.16,1,.3,1), background .3s ease;
}
.d1-caption-link span { transition: transform .35s cubic-bezier(.16,1,.3,1); }
.d1-caption-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 30px -14px rgba(36,80,82,0.7);
}
.d1-caption-link:hover span { transform: translateX(4px); }

.d1-hint {
  position: absolute;
  top: clamp(14px, 3vh, 26px);
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--brand-taupe, #9b8d83);
  opacity: 0.85;
  z-index: 3;
  pointer-events: none;
}

/* -------- fallback carousel -------- */
.d1-fallback {
  display: flex;
  gap: 18px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 8px clamp(16px, 5vw, 48px) 24px;
  scroll-padding-left: clamp(16px, 5vw, 48px);
}
.d1-fallback::-webkit-scrollbar { display: none; }
.d1-fcard {
  scroll-snap-align: start;
  flex: 0 0 auto;
  width: min(78vw, 310px);
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-card, 16px);
  overflow: hidden;
  background: var(--white, #fff);
  border: 1px solid rgba(150,178,178,0.45);
  box-shadow: 0 16px 40px -30px rgba(36,80,82,0.55);
  text-decoration: none;
  transition: transform .5s cubic-bezier(.16,1,.3,1), box-shadow .5s cubic-bezier(.16,1,.3,1), border-color .4s ease;
}
.d1-fcard:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 48px -28px rgba(36,80,82,0.6);
  border-color: var(--brand-teal, #96b2b2);
}
.d1-fimg {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--teal-100, #f7fafa);
}
.d1-fsheen {
  position: absolute;
  inset: 0;
  background: linear-gradient(150deg, rgba(255,255,255,0.28) 0%, transparent 38%);
  pointer-events: none;
}
.d1-fbody {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px 18px 20px;
}
.d1-flabel {
  font-size: 19px;
  font-weight: 400;
  color: var(--teal-deep, #245052);
  letter-spacing: 0.02em;
}
.d1-fblurb {
  font-size: 13px;
  line-height: 1.6;
  color: var(--ink-soft, #3a3a3a);
}
.d1-flink {
  margin-top: 4px;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--link-text, #0d1b1d);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.d1-flink span { transition: transform .35s cubic-bezier(.16,1,.3,1); }
.d1-fcard:hover .d1-flink span { transform: translateX(4px); }

@media (prefers-reduced-motion: reduce) {
  .d1-caption-inner { animation: none; }
  .d1-fcard, .d1-caption-link, .d1-flink span, .d1-caption-link span { transition: none; }
  .d1-fallback { scroll-behavior: auto; }
}
`;
