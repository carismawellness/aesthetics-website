"use client";

/**
 * Direction 4 — "Infinite Draggable Canvas"
 *
 * DOM renders the eyebrow + title + subcopy above a full-bleed ~80vh WebGL canvas.
 * Inside the canvas, the 12 treatment photos are textured planes arranged in a
 * staggered (brick/offset) 2D field. The field is draggable in x AND y with
 * momentum/inertia and wraps INFINITELY: the tile span is computed and the field
 * offset is wrapped modulo that span, while a 3×3 tiling makes the wrap seamless
 * in every direction.
 *
 * Interaction:
 *  - Pointer drag pans the field; the rendered position lerps toward a target,
 *    and on release the residual pointer velocity drives momentum that decays.
 *  - A raycaster picks the hovered plane: it scales up, sharpens (full color +
 *    brightness), and lifts in z; the others slightly recede, desaturate and
 *    "blur" (faked via reduced opacity + desaturated tint in the fragment shader —
 *    no postprocessing). An HTML caption overlay (label + blurb + Explore →) and a
 *    custom "drag" cursor hint track the pointer.
 *  - Click/tap navigates to the tile href, but only if the pointer barely moved
 *    (drag is thresholded so a pan never fires a navigation).
 *
 * Palette: light teal-tinted ground, soft vignette, rounded plane corners via an
 * SDF rounded-rect mask in the fragment shader. Calm medical-luxury, not a demo.
 *
 * MANDATORY fallback (reduced-motion OR coarse-pointer OR width<768 OR Save-Data):
 * a clean horizontal CSS scroll-snap carousel of the same 12 cards with captions +
 * Explore links — NO WebGL, NO rAF.
 *
 * WebGL is mounted only after first paint + idle (requestIdleCallback → setTimeout
 * fallback) and the rAF loop only runs while the section is near/in the viewport
 * (IntersectionObserver); it pauses offscreen. Full cleanup on unmount.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { HOME_SERVICES } from "@/lib/site";

const EYEBROW = "Doctor-Led Treatments";
const TITLE = "Our Medical Aesthetic Treatments";
const SUBCOPY =
  "A complete menu of advanced, medically supervised treatments — each tailored to refresh, restore and let you glow with confidence.";

// ---- Brand tokens (mirrors the global CSS vars from the spec) ----
const C = {
  tealDeep: "#245052",
  teal: "#96b2b2",
  teal100: "#f7fafa",
  taupe: "#9b8d83",
  inkSoft: "#3a3a3a",
  line: "#8a8a8a",
  white: "#ffffff",
} as const;

// ---- Layout of the field (world units). One "tile" = COLS×ROWS planes. ----
const COLS = 4;
const ROWS = 3; // 4 × 3 = 12 treatments
const PLANE_W = 2.6;
const PLANE_H = 1.9;
const GAP_X = 0.55;
const GAP_Y = 0.55;
const BRICK_OFFSET = (PLANE_W + GAP_X) * 0.5; // half-cell horizontal stagger per row

const CELL_W = PLANE_W + GAP_X;
const CELL_H = PLANE_H + GAP_Y;
const TILE_SPAN_X = COLS * CELL_W;
const TILE_SPAN_Y = ROWS * CELL_H;

const DRAG_CLICK_THRESHOLD = 7; // px of movement above which a release is a drag, not a click

type Cell = {
  /** index into HOME_SERVICES */
  service: number;
  /** base position within a single tile (centered around 0) */
  bx: number;
  by: number;
};

function buildCells(): Cell[] {
  const cells: Cell[] = [];
  let i = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const stagger = (r % 2) * BRICK_OFFSET;
      // Center the tile around origin so wrapping feels symmetric.
      const bx = (c - (COLS - 1) / 2) * CELL_W + stagger - BRICK_OFFSET / 2;
      const by = ((ROWS - 1) / 2 - r) * CELL_H;
      cells.push({ service: i % 12, bx, by });
      i++;
    }
  }
  return cells;
}

// Wrap a value into [-span/2, span/2) — keeps tile copies centred on the field offset.
function wrap(v: number, span: number): number {
  const h = span / 2;
  return ((((v + h) % span) + span) % span) - h;
}

// requestIdleCallback typing (ES2017 lib has no dom type for it).
type IdleHandle = number;
interface IdleWindow {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => IdleHandle;
  cancelIdleCallback?: (h: IdleHandle) => void;
}

export default function Direction4DraggableCanvas() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const services = useMemo(() => HOME_SERVICES, []);
  const cells = useMemo(buildCells, []);

  // Decide rich vs fallback after mount so SSR markup is the safe fallback.
  const [rich, setRich] = useState<boolean>(false);
  // Caption state (label/blurb/href + visible) is React for the HTML overlay.
  const [hovered, setHovered] = useState<number | null>(null);

  const hoveredRef = useRef<number | null>(null);
  hoveredRef.current = hovered;

  // ---- Capability gate ----
  useEffect(() => {
    if (typeof window === "undefined") return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.innerWidth < 768;
    const saveData = nav.connection?.saveData === true;
    if (!reduce && !coarse && !small && !saveData) setRich(true);
  }, []);

  // ---- WebGL scene (mounted after first paint + idle, only when rich) ----
  useEffect(() => {
    if (!rich) return;
    if (!canvasWrapRef.current) return;
    // Non-null, stable reference captured by all nested closures below.
    const wrapEl: HTMLDivElement = canvasWrapRef.current;

    let disposed = false;
    let idleHandle: IdleHandle | null = null;
    let timeoutHandle: ReturnType<typeof setTimeout> | null = null;

    // Mutable scene handles, captured by cleanup.
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.OrthographicCamera | null = null;
    let rafId = 0;
    let io: IntersectionObserver | null = null;
    let ro: ResizeObserver | null = null;
    let running = false;
    let inView = false;

    const textures: THREE.Texture[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.ShaderMaterial[] = [];
    const meshes: THREE.Mesh[] = [];
    // Per-mesh metadata for raycast → service mapping + per-mesh animated factor.
    const meshService: number[] = [];
    const meshFocus: number[] = []; // 0..1 smoothed focus factor per mesh

    // Field offset + velocity (world units).
    const offset = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };

    // Pointer drag bookkeeping.
    const pointerNDC = new THREE.Vector2(-2, -2); // off-screen by default
    let pointerInside = false;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let downX = 0;
    let downY = 0;
    const raycaster = new THREE.Raycaster();

    // World units per CSS pixel (set from camera frustum + viewport box).
    let worldPerPxX = 0.01;
    let worldPerPxY = 0.01;

    const VERT = /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    // Rounded-rect SDF mask + focus-driven desaturation/dim. No postprocessing.
    const FRAG = /* glsl */ `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTex;
      uniform float uFocus;     // 0 = receded, 1 = focused
      uniform float uAspect;    // plane aspect (w/h) for square corner radius
      uniform vec3  uTint;      // teal-tinted ground bleed for receded planes
      uniform float uHasTex;    // 1 if texture loaded, else 0 (placeholder)

      // Signed distance to a rounded box centred at origin, half-size b, radius r.
      float sdRoundRect(vec2 p, vec2 b, float r) {
        vec2 q = abs(p) - b + r;
        return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
      }

      void main() {
        // Map uv (0..1) to centred coords in aspect-corrected space.
        vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
        vec2 b = vec2(0.5 * uAspect, 0.5);
        float r = 0.075;
        float d = sdRoundRect(p, b, r);
        // Crisp-ish edge with a touch of AA.
        float aa = fwidth(d) * 1.2;
        float mask = 1.0 - smoothstep(-aa, aa, d);
        if (mask <= 0.001) discard;

        vec3 col = uHasTex > 0.5 ? texture2D(uTex, vUv).rgb : uTint;

        // Desaturate + dim receded planes; brighten + saturate focused ones.
        float lum = dot(col, vec3(0.299, 0.587, 0.114));
        float desat = mix(0.55, 1.0, uFocus);            // toward grey when unfocused
        col = mix(vec3(lum), col, desat);
        col = mix(col * 0.86, col * 1.06, uFocus);        // dim → slight lift
        // Cool teal wash on the receded planes (medical-luxury calm).
        col = mix(mix(col, uTint, 0.18), col, uFocus);

        // Subtle inner border glow (sage hairline) near the rounded edge.
        float edge = smoothstep(0.012, 0.0, abs(d));
        col += edge * vec3(0.06, 0.10, 0.10) * (0.4 + 0.6 * uFocus);

        // Soft drop in opacity for receded planes to fake depth-of-field.
        float alpha = mask * mix(0.82, 1.0, uFocus);
        gl_FragColor = vec4(col, alpha);
      }
    `;

    const tintColor = new THREE.Color(C.teal100);

    function makeMaterial(tex: THREE.Texture | null): THREE.ShaderMaterial {
      return new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTex: { value: tex },
          uFocus: { value: 0 },
          uAspect: { value: PLANE_W / PLANE_H },
          uTint: { value: new THREE.Color().copy(tintColor) },
          uHasTex: { value: tex ? 1 : 0 },
        },
      });
    }

    function sizeRenderer() {
      if (!renderer || !camera) return;
      const w = wrapEl.clientWidth || 1;
      const h = wrapEl.clientHeight || 1;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h, false);

      // Fit the field comfortably: pick a vertical world height, derive width from aspect.
      const viewH = TILE_SPAN_Y * 1.15;
      const viewW = viewH * (w / h);
      camera.left = -viewW / 2;
      camera.right = viewW / 2;
      camera.top = viewH / 2;
      camera.bottom = -viewH / 2;
      camera.updateProjectionMatrix();

      worldPerPxX = viewW / w;
      worldPerPxY = viewH / h;
    }

    function buildScene() {
      if (disposed) return;
      const sc = new THREE.Scene();
      scene = sc;
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
      camera.position.z = 10;

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setClearColor(0x000000, 0);
      const canvas = renderer.domElement;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      canvas.style.touchAction = "none";
      wrapEl.appendChild(canvas);

      const geo = new THREE.PlaneGeometry(PLANE_W, PLANE_H, 1, 1);
      geometries.push(geo);

      const loader = new THREE.TextureLoader();
      loader.crossOrigin = "anonymous";

      // Load one texture per service (12), shared across the 3×3 tiling.
      const serviceTex: (THREE.Texture | null)[] = services.map(() => null);
      services.forEach((s, si) => {
        loader.load(
          s.photo,
          (tex) => {
            if (disposed) {
              tex.dispose();
              return;
            }
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.minFilter = THREE.LinearMipmapLinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.generateMipmaps = true;
            const maxAniso = renderer ? renderer.capabilities.getMaxAnisotropy() : 1;
            tex.anisotropy = Math.min(4, maxAniso);
            tex.needsUpdate = true;
            textures.push(tex);
            serviceTex[si] = tex;
            // Wire this texture into every mesh that shows this service.
            meshes.forEach((m, mi) => {
              if (meshService[mi] === si) {
                const mat = m.material as THREE.ShaderMaterial;
                mat.uniforms.uTex.value = tex;
                mat.uniforms.uHasTex.value = 1;
              }
            });
          },
          undefined,
          () => {
            /* missing photo → placeholder tint material stays; non-fatal */
          },
        );
      });

      // Instantiate the 3×3 tiling of the COLS×ROWS field.
      for (let ti = -1; ti <= 1; ti++) {
        for (let tj = -1; tj <= 1; tj++) {
          cells.forEach((cell) => {
            const mat = makeMaterial(serviceTex[cell.service]);
            materials.push(mat);
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(
              cell.bx + ti * TILE_SPAN_X,
              cell.by + tj * TILE_SPAN_Y,
              0,
            );
            mesh.userData.bx = cell.bx;
            mesh.userData.by = cell.by;
            sc.add(mesh);
            meshes.push(mesh);
            meshService.push(cell.service);
            meshFocus.push(0);
          });
        }
      }

      sizeRenderer();
    }

    // ---- Pointer handlers ----
    function clientToNDC(clientX: number, clientY: number) {
      const rect = wrapEl.getBoundingClientRect();
      pointerNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNDC.y = -(((clientY - rect.top) / rect.height) * 2 - 1);
    }

    function onPointerDown(e: PointerEvent) {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      downX = e.clientX;
      downY = e.clientY;
      velocity.x = 0;
      velocity.y = 0;
      pointerInside = true;
      clientToNDC(e.clientX, e.clientY);
      (e.target as Element).setPointerCapture?.(e.pointerId);
      if (cursorRef.current) cursorRef.current.dataset.grabbing = "true";
    }

    function onPointerMove(e: PointerEvent) {
      pointerInside = true;
      clientToNDC(e.clientX, e.clientY);
      // Move the custom cursor hint.
      if (cursorRef.current) {
        const rect = wrapEl.getBoundingClientRect();
        cursorRef.current.style.transform = `translate(${e.clientX - rect.left}px, ${
          e.clientY - rect.top
        }px)`;
      }
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      // Drag direction matches a photo-grab feel: pull content with the pointer.
      target.x += dx * worldPerPxX;
      target.y -= dy * worldPerPxY;
      // Track velocity for momentum on release (world units/frame approx).
      velocity.x = dx * worldPerPxX;
      velocity.y = -dy * worldPerPxY;
    }

    function navigate(href: string) {
      window.location.href = href;
    }

    function onPointerUp(e: PointerEvent) {
      if (!dragging) return;
      dragging = false;
      if (cursorRef.current) cursorRef.current.dataset.grabbing = "false";
      const movedTotal = Math.abs(e.clientX - downX) + Math.abs(e.clientY - downY);
      if (movedTotal < DRAG_CLICK_THRESHOLD) {
        // Treat as a click — raycast and navigate.
        clientToNDC(e.clientX, e.clientY);
        const hit = pickMesh();
        velocity.x = 0;
        velocity.y = 0;
        if (hit !== null) navigate(services[meshService[hit]].href);
      }
      // else: momentum (velocity) carries the field; decays in the loop.
    }

    function onPointerLeave() {
      pointerInside = false;
      pointerNDC.set(-2, -2);
      if (!dragging && hoveredRef.current !== null) setHovered(null);
    }

    function pickMesh(): number | null {
      if (!camera) return null;
      raycaster.setFromCamera(pointerNDC, camera);
      const hits = raycaster.intersectObjects(meshes, false);
      if (hits.length === 0) return null;
      const obj = hits[0].object;
      return meshes.indexOf(obj as THREE.Mesh);
    }

    // ---- Render loop ----
    const dampPos = 0.12; // lerp toward target
    const friction = 0.92; // momentum decay
    const focusLerp = 0.14;

    function frame() {
      if (disposed || !renderer || !scene || !camera) return;

      // Apply momentum to the target when not actively dragging.
      if (!dragging) {
        if (Math.abs(velocity.x) > 1e-4 || Math.abs(velocity.y) > 1e-4) {
          target.x += velocity.x;
          target.y += velocity.y;
          velocity.x *= friction;
          velocity.y *= friction;
        }
      }

      // Smooth offset toward target.
      offset.x += (target.x - offset.x) * dampPos;
      offset.y += (target.y - offset.y) * dampPos;

      // Position every mesh using its tile-relative base + wrapped offset, so the
      // field repeats seamlessly in all directions (infinite wrap).
      for (let i = 0; i < meshes.length; i++) {
        const m = meshes[i];
        const bx = m.userData.bx as number;
        const by = m.userData.by as number;
        m.position.x = wrap(bx + offset.x, TILE_SPAN_X);
        m.position.y = wrap(by + offset.y, TILE_SPAN_Y);
      }

      // Hover pick (only when pointer is inside the canvas).
      let pickedMesh: number | null = null;
      if (pointerInside) pickedMesh = pickMesh();
      const pickedService = pickedMesh !== null ? meshService[pickedMesh] : null;

      // Update caption overlay (React) only on change.
      if (pickedService !== hoveredRef.current) setHovered(pickedService);

      // Animate per-mesh focus: focused service → 1, others recede. When nothing
      // is hovered, everything settles to a calm mid value (cohesive field).
      const anyHover = pickedService !== null;
      for (let i = 0; i < meshes.length; i++) {
        const isFocused = anyHover && meshService[i] === pickedService;
        const goal = anyHover ? (isFocused ? 1 : 0.12) : 0.62;
        meshFocus[i] += (goal - meshFocus[i]) * focusLerp;
        const mat = materials[i];
        mat.uniforms.uFocus.value = meshFocus[i];
        // Lift focused planes toward the camera + scale up subtly.
        const lift = meshFocus[i];
        meshes[i].position.z = lift * 0.6;
        const s = 1 + lift * 0.085;
        meshes[i].scale.set(s, s, 1);
      }

      renderer.render(scene, camera);
      if (running) rafId = requestAnimationFrame(frame);
    }

    function startLoop() {
      if (running || disposed) return;
      running = true;
      rafId = requestAnimationFrame(frame);
    }
    function stopLoop() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    }

    function init() {
      if (disposed) return;
      buildScene();

      const canvas = renderer ? renderer.domElement : null;
      if (canvas) {
        canvas.addEventListener("pointerdown", onPointerDown);
        canvas.addEventListener("pointermove", onPointerMove);
        canvas.addEventListener("pointerup", onPointerUp);
        canvas.addEventListener("pointercancel", onPointerUp);
        canvas.addEventListener("pointerleave", onPointerLeave);
      }

      // Resize handling.
      ro = new ResizeObserver(() => sizeRenderer());
      ro.observe(wrapEl);

      // Only run the loop while the section is near/in viewport.
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            inView = entry.isIntersecting;
            if (inView) startLoop();
            else stopLoop();
          }
        },
        { root: null, rootMargin: "200px 0px", threshold: 0.01 },
      );
      const target0 = sectionRef.current ?? wrapEl;
      io.observe(target0);
    }

    // Mount the heavy scene after first paint + idle.
    const idleWin = window as unknown as IdleWindow;
    if (typeof idleWin.requestIdleCallback === "function") {
      idleHandle = idleWin.requestIdleCallback(() => init(), { timeout: 1500 });
    } else {
      timeoutHandle = setTimeout(() => init(), 200);
    }

    // ---- Cleanup ----
    return () => {
      disposed = true;
      if (idleHandle !== null && typeof idleWin.cancelIdleCallback === "function") {
        idleWin.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle) clearTimeout(timeoutHandle);
      stopLoop();
      if (io) io.disconnect();
      if (ro) ro.disconnect();

      const canvas = renderer ? renderer.domElement : null;
      if (canvas) {
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("pointercancel", onPointerUp);
        canvas.removeEventListener("pointerleave", onPointerLeave);
      }

      meshes.forEach((m) => scene?.remove(m));
      materials.forEach((m) => m.dispose());
      geometries.forEach((g) => g.dispose());
      textures.forEach((t) => t.dispose());

      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        const el = renderer.domElement;
        if (el.parentNode) el.parentNode.removeChild(el);
      }
      renderer = null;
      scene = null;
      camera = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rich]);

  const hoveredService = hovered !== null ? services[hovered] : null;

  return (
    <section
      ref={sectionRef}
      id="d4-section"
      aria-labelledby="d4-heading"
      className="d4-section"
    >
      <style>{d4CSS}</style>

      <div className="d4-head">
        <p className="d4-eyebrow font-serif">{EYEBROW}</p>
        <h2 id="d4-heading" className="d4-title font-serif">
          {TITLE}
        </h2>
        <p className="d4-sub">{SUBCOPY}</p>
      </div>

      {rich ? (
        <div className="d4-stage">
          <div className="d4-canvas-wrap" ref={canvasWrapRef} aria-hidden="true" />

          {/* Custom drag-cursor hint */}
          <div className="d4-cursor" ref={cursorRef} data-grabbing="false">
            <span className="d4-cursor-dot" />
            <span className="d4-cursor-label font-display">Drag</span>
          </div>

          {/* HTML caption overlay for the hovered tile */}
          <div
            ref={captionRef}
            className={`d4-caption ${hoveredService ? "is-on" : ""}`}
            role="status"
            aria-live="polite"
          >
            {hoveredService && (
              <>
                <span className="d4-caption-label font-serif">
                  {hoveredService.label}
                </span>
                <span className="d4-caption-blurb">{hoveredService.blurb}</span>
                <a className="d4-caption-cta font-display" href={hoveredService.href}>
                  Explore <span aria-hidden="true">→</span>
                </a>
              </>
            )}
          </div>

          {/* Accessibility: real links to every treatment, visually hidden but
              available to keyboard + assistive tech (canvas is decorative). */}
          <nav className="d4-sr-links" aria-label="All treatments">
            {services.map((s) => (
              <a key={s.href} href={s.href}>
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      ) : (
        // ---- Fallback: clean horizontal scroll-snap carousel (no WebGL/rAF) ----
        <div className="d4-fallback" role="list" aria-label="Treatments">
          {services.map((s) => (
            <a className="d4-fcard" role="listitem" key={s.href} href={s.href}>
              <span className="d4-fcard-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.photo} alt={s.label} loading="lazy" decoding="async" />
              </span>
              <span className="d4-fcard-body">
                <span className="d4-fcard-label font-serif">{s.label}</span>
                <span className="d4-fcard-blurb">{s.blurb}</span>
                <span className="d4-fcard-cta font-display">
                  Explore <span aria-hidden="true">→</span>
                </span>
              </span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

// ---- Scoped styles (all classes prefixed d4-) ----
const d4CSS = `
.d4-section{
  position: relative;
  width: 100%;
  padding: clamp(3rem, 6vw, 5.5rem) 0 clamp(3.5rem, 7vw, 6rem);
  background:
    radial-gradient(120% 80% at 50% -10%, var(--teal-100, #f7fafa) 0%, var(--white, #fff) 55%),
    var(--white, #fff);
  overflow: hidden;
  isolation: isolate;
}
.d4-head{
  max-width: 56rem;
  margin: 0 auto clamp(1.75rem, 3vw, 2.75rem);
  padding: 0 clamp(1.25rem, 4vw, 2.5rem);
  text-align: center;
}
.d4-eyebrow{
  margin: 0 0 0.85rem;
  font-size: clamp(.7rem, 1.1vw, .8rem);
  letter-spacing: .26em;
  text-transform: uppercase;
  color: var(--brand-taupe, #9b8d83);
  font-weight: 400;
}
.d4-title{
  margin: 0 0 1rem;
  font-size: clamp(1.7rem, 4.2vw, 3rem);
  line-height: 1.08;
  letter-spacing: .012em;
  color: var(--teal-deep, #245052);
  font-weight: 400;
}
.d4-sub{
  margin: 0 auto;
  max-width: 40rem;
  font-size: clamp(.95rem, 1.4vw, 1.05rem);
  line-height: 1.65;
  color: var(--ink-soft, #3a3a3a);
}

/* ---------- Rich WebGL stage ---------- */
.d4-stage{
  position: relative;
  width: 100%;
  height: 80vh;
  min-height: 520px;
  max-height: 880px;
  cursor: none;
}
.d4-canvas-wrap{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  /* soft teal-tinted ground + gentle vignette so planes float on light */
  background:
    radial-gradient(140% 100% at 50% 35%,
      rgba(150,178,178,0.10) 0%,
      rgba(247,250,250,0.55) 45%,
      rgba(255,255,255,0) 78%);
}
/* vignette frame above the canvas to keep it premium + contained */
.d4-stage::after{
  content:"";
  position:absolute; inset:0;
  pointer-events:none;
  box-shadow: inset 0 0 120px 24px rgba(255,255,255,0.92);
  z-index: 3;
}

/* Custom cursor hint */
.d4-cursor{
  position: absolute;
  top: 0; left: 0;
  z-index: 5;
  pointer-events: none;
  display: flex;
  align-items: center;
  gap: .5rem;
  transform: translate(-100px,-100px);
  margin-left: -2px; margin-top: -2px;
  transition: opacity .25s ease;
}
.d4-cursor-dot{
  width: 10px; height: 10px;
  border-radius: 999px;
  background: var(--teal-deep, #245052);
  box-shadow: 0 0 0 6px rgba(36,80,82,0.12), 0 0 16px rgba(150,178,178,0.6);
  transition: transform .2s cubic-bezier(.16,1,.3,1);
}
.d4-cursor[data-grabbing="true"] .d4-cursor-dot{ transform: scale(1.7); }
.d4-cursor-label{
  font-size: .58rem;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: var(--teal-deep, #245052);
  background: rgba(255,255,255,0.82);
  padding: .22rem .5rem;
  border-radius: 999px;
  border: 1px solid var(--brand-teal, #96b2b2);
  backdrop-filter: blur(4px);
  transition: opacity .25s ease;
}
.d4-cursor[data-grabbing="true"] .d4-cursor-label{ opacity: 0; }

/* HTML caption overlay */
.d4-caption{
  position: absolute;
  left: clamp(1rem, 4vw, 3rem);
  bottom: clamp(1rem, 4vw, 2.5rem);
  z-index: 4;
  max-width: min(26rem, 78vw);
  padding: 1.05rem 1.25rem 1.15rem;
  display: flex;
  flex-direction: column;
  gap: .45rem;
  border-radius: var(--radius-card, 16px);
  background: rgba(255,255,255,0.86);
  border: 1px solid rgba(150,178,178,0.55);
  box-shadow: 0 18px 50px -22px rgba(36,80,82,0.4);
  backdrop-filter: blur(10px) saturate(1.05);
  -webkit-backdrop-filter: blur(10px) saturate(1.05);
  opacity: 0;
  transform: translateY(14px) scale(.985);
  pointer-events: none;
  transition: opacity .4s cubic-bezier(.16,1,.3,1),
              transform .5s cubic-bezier(.16,1,.3,1);
}
.d4-caption.is-on{
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}
.d4-caption-label{
  font-size: clamp(1.05rem, 1.8vw, 1.35rem);
  color: var(--teal-deep, #245052);
  letter-spacing: .01em;
}
.d4-caption-blurb{
  font-size: .86rem;
  line-height: 1.5;
  color: var(--ink-soft, #3a3a3a);
}
.d4-caption-cta{
  margin-top: .15rem;
  align-self: flex-start;
  font-size: .62rem;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--white, #fff);
  background: var(--teal-deep, #245052);
  padding: .5rem .9rem;
  border-radius: 999px;
  text-decoration: none;
  transition: transform .3s cubic-bezier(.16,1,.3,1), background .3s ease;
}
.d4-caption-cta:hover{ transform: translateY(-2px); background:#1d4143; }
.d4-caption-cta span{ display:inline-block; transition: transform .3s cubic-bezier(.16,1,.3,1); }
.d4-caption-cta:hover span{ transform: translateX(4px); }

/* Visually-hidden but focusable real links for a11y/SEO */
.d4-sr-links{
  position:absolute; width:1px; height:1px; overflow:hidden;
  clip: rect(0 0 0 0); clip-path: inset(50%);
  white-space: nowrap;
}
.d4-sr-links a:focus{
  position:fixed; top:1rem; left:1rem; z-index:50;
  width:auto; height:auto; clip:auto; clip-path:none;
  background:#fff; color:var(--teal-deep,#245052);
  padding:.5rem .9rem; border-radius:8px;
  box-shadow:0 8px 30px rgba(0,0,0,.18);
}

/* ---------- Fallback carousel ---------- */
.d4-fallback{
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: .5rem clamp(1.25rem, 5vw, 2.5rem) 1.75rem;
  scrollbar-width: thin;
}
.d4-fallback::-webkit-scrollbar{ height: 6px; }
.d4-fallback::-webkit-scrollbar-thumb{
  background: var(--brand-teal, #96b2b2); border-radius: 999px;
}
.d4-fcard{
  scroll-snap-align: start;
  flex: 0 0 78%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-card, 16px);
  overflow: hidden;
  background: var(--white, #fff);
  border: 1px solid rgba(150,178,178,0.45);
  box-shadow: 0 12px 34px -20px rgba(36,80,82,0.35);
  text-decoration: none;
  transition: transform .35s cubic-bezier(.16,1,.3,1),
              box-shadow .35s cubic-bezier(.16,1,.3,1);
}
@media (min-width:480px){ .d4-fcard{ flex-basis: 60%; } }
.d4-fcard:active{ transform: scale(.99); }
.d4-fcard-media{
  position: relative;
  display:block;
  aspect-ratio: 4 / 3;
  background: var(--teal-100, #f7fafa);
  overflow:hidden;
}
.d4-fcard-media img{
  width:100%; height:100%; object-fit: cover; display:block;
}
.d4-fcard-body{
  display:flex; flex-direction:column; gap:.4rem;
  padding: 1rem 1.05rem 1.15rem;
}
.d4-fcard-label{
  font-size: 1.1rem; color: var(--teal-deep, #245052); letter-spacing:.01em;
}
.d4-fcard-blurb{
  font-size:.85rem; line-height:1.5; color: var(--ink-soft, #3a3a3a);
}
.d4-fcard-cta{
  margin-top:.25rem;
  font-size:.6rem; letter-spacing:.2em; text-transform:uppercase;
  color: var(--teal-deep, #245052);
}
.d4-fcard-cta span{ display:inline-block; }

@media (prefers-reduced-motion: reduce){
  .d4-caption, .d4-caption-cta, .d4-caption-cta span,
  .d4-cursor-dot, .d4-fcard{ transition: none !important; }
}
`;
