"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLazyWebGL } from "./useLazyWebGL";

/*
  Draggable before/after reveal for the jawline transformation.
  Purposeful Three.js: a liquid-distortion band ripples along the divider as you
  drag, so the "melt the fat → defined jawline" change feels physical.
  Progressive: an accessible DOM clip-slider (image + range input) is the base
  and works with no WebGL / reduced-motion; when WebGL is available the canvas
  takes over the visual while the same pointer/keyboard controls drive it.
*/

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uBefore;
uniform sampler2D uAfter;
uniform float uProgress;
uniform float uTime;
uniform float uPlaneA;
uniform float uImgA;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
  vec2 u=f*f*(3.-2.*f);
  return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
}
vec2 coverUV(vec2 uv){
  vec2 r = vec2(1.0);
  if(uImgA > uPlaneA) r.x = uPlaneA/uImgA; else r.y = uImgA/uPlaneA;
  return (uv-0.5)*r + 0.5;
}
void main(){
  vec2 cuv = coverUV(vUv);
  float d = vUv.x - uProgress;
  float band = smoothstep(0.10, 0.0, abs(d));
  float n = noise(cuv*7.0 + uTime*0.4);
  vec2 duv = cuv + band * (n-0.5) * vec2(0.07, 0.05);
  vec4 b = texture2D(uBefore, duv);
  vec4 a = texture2D(uAfter, duv);
  float m = smoothstep(uProgress-0.0015, uProgress+0.0015, vUv.x);
  vec3 col = mix(b.rgb, a.rgb, m);
  // soft seam highlight
  col += vec3(0.10) * smoothstep(0.012, 0.0, abs(d));
  gl_FragColor = vec4(col, 1.0);
}
`;
const VERT = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }`;

export default function BeforeAfter3D({
  before,
  after,
  ratio = "3 / 4",
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  before: string;
  after: string;
  ratio?: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0.5);
  const setUProgress = useRef<((v: number) => void) | null>(null);
  const [progress, setProgress] = useState(0.5);
  const [glReady, setGlReady] = useState(false);
  const { active, visibleRef } = useLazyWebGL(hostRef, { rootMargin: "200px", heavy: true });

  const apply = useCallback((v: number) => {
    const c = Math.min(1, Math.max(0, v));
    progressRef.current = c;
    setProgress(c);
    setUProgress.current?.(c);
  }, []);

  const fromClientX = useCallback((clientX: number) => {
    const r = hostRef.current?.getBoundingClientRect();
    if (!r) return;
    apply((clientX - r.left) / r.width);
  }, [apply]);

  useEffect(() => {
    if (!active || !canvasHostRef.current) return;
    const host = canvasHostRef.current;
    let raf = 0;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;
      const loader = new THREE.TextureLoader();
      const load = (src: string) =>
        new Promise<InstanceType<typeof THREE.Texture>>((res, rej) => loader.load(src, res, undefined, rej));
      let texB: Awaited<ReturnType<typeof load>>, texA: Awaited<ReturnType<typeof load>>;
      try {
        [texB, texA] = await Promise.all([load(before), load(after)]);
      } catch {
        return; // keep DOM fallback
      }
      if (disposed) return;
      [texB, texA].forEach((t) => { t.minFilter = THREE.LinearFilter; t.generateMipmaps = false; });
      const imgEl = texA.image as { width?: number; height?: number };
      const imgA = (imgEl.width || 3) / (imgEl.height || 4);

      const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      const scene = new THREE.Scene();
      const camera = new THREE.Camera();
      const uniforms = {
        uBefore: { value: texB }, uAfter: { value: texA },
        uProgress: { value: progressRef.current }, uTime: { value: 0 },
        uPlaneA: { value: 1 }, uImgA: { value: imgA },
      };
      const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
      scene.add(mesh);
      host.appendChild(renderer.domElement);
      Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });
      setUProgress.current = (v: number) => { uniforms.uProgress.value = v; };

      const resize = () => {
        const w = host.clientWidth || 1, h = host.clientHeight || 1;
        renderer.setSize(w, h, false);
        uniforms.uPlaneA.value = w / h;
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host);
      setGlReady(true);

      const start = performance.now();
      const loop = () => {
        raf = requestAnimationFrame(loop);
        if (document.hidden || !visibleRef.current) return;
        uniforms.uTime.value = (performance.now() - start) / 1000;
        renderer.render(scene, camera);
      };
      loop();

      cleanup = () => {
        cancelAnimationFrame(raf); ro.disconnect();
        mesh.geometry.dispose(); mat.dispose(); texA.dispose(); texB.dispose();
        renderer.dispose(); renderer.domElement.remove();
        setUProgress.current = null;
      };
    })();

    return () => { disposed = true; setGlReady(false); cleanup(); };
  }, [active, before, after, visibleRef]);

  // pointer drag on the whole figure
  const onPointerDown = (e: React.PointerEvent) => {
    try { (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId); } catch { /* no active pointer — ignore */ }
    fromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.buttons !== 1) return;
    fromClientX(e.clientX);
  };

  const pct = progress * 100;

  return (
    <figure
      ref={hostRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      style={{ position: "relative", width: "100%", aspectRatio: ratio, borderRadius: "14px", overflow: "hidden", boxShadow: "0 18px 44px rgba(0,0,0,0.14)", cursor: "ew-resize", touchAction: "none", background: "var(--cream)", userSelect: "none" }}
    >
      {/* WebGL layer */}
      <div ref={canvasHostRef} aria-hidden style={{ position: "absolute", inset: 0, opacity: glReady ? 1 : 0, transition: "opacity 0.4s ease" }} />

      {/* DOM fallback (also the visible layer until/unless WebGL is ready) */}
      {!glReady && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={after} alt={`${afterLabel}: defined jawline after treatment`} draggable={false} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={before} alt={`${beforeLabel}: under-chin fullness`} draggable={false} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", clipPath: `inset(0 ${100 - pct}% 0 0)` }} />
        </>
      )}

      {/* divider + handle */}
      <div aria-hidden style={{ position: "absolute", top: 0, bottom: 0, left: `${pct}%`, width: "2px", background: "rgba(255,255,255,0.9)", transform: "translateX(-1px)", boxShadow: "0 0 12px rgba(0,0,0,0.25)" }}>
        <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "42px", height: "42px", borderRadius: "50%", background: "rgba(255,255,255,0.95)", boxShadow: "0 4px 14px rgba(0,0,0,0.22)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--teal-deep)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M9 7l-5 5 5 5" /><path d="M15 7l5 5-5 5" /></svg>
        </span>
      </div>

      <figcaption style={{ position: "absolute", left: "12px", bottom: "12px", padding: "5px 12px", borderRadius: "20px", background: "rgba(20,40,40,0.55)", color: "#fff", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", pointerEvents: "none" }}>{beforeLabel}</figcaption>
      <figcaption style={{ position: "absolute", right: "12px", bottom: "12px", padding: "5px 12px", borderRadius: "20px", background: "rgba(122,158,158,0.75)", color: "#fff", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", pointerEvents: "none" }}>{afterLabel}</figcaption>

      {/* accessible control */}
      <label style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        Before / after reveal
        <input type="range" min={0} max={100} value={Math.round(pct)} onChange={(e) => apply(Number(e.target.value) / 100)} />
      </label>
    </figure>
  );
}
