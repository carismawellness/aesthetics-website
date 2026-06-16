"use client";

import { useEffect, useRef } from "react";
import { useLazyWebGL } from "./useLazyWebGL";

/*
  Subtle flowing fluid behind the hero — evokes "sculpting / contour" without
  pulling focus from the copy. Brand sage-teal tints with a faint warm-gold
  vein. Lazy, DPR-capped, pauses when the tab is hidden or it scrolls away, and
  is simply absent under reduced-motion / no-WebGL (the hero's CSS gradient
  remains the visible background). pointer-events: none.
*/

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uRes;

// cheap value-noise fbm
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
  vec2 u=f*f*(3.-2.*f);
  return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
}
float fbm(vec2 p){
  float v=0., a=0.5;
  for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.02; a*=0.5; }
  return v;
}
void main(){
  vec2 uv = vUv;
  float t = uTime*0.04;
  vec2 q = vec2(fbm(uv*2.2 + t), fbm(uv*2.2 - t + 4.0));
  float n = fbm(uv*3.0 + q*1.4 + vec2(0.0, t*0.6));

  vec3 teal   = vec3(0.588,0.698,0.698); // --teal
  vec3 mist   = vec3(0.933,0.953,0.953); // --teal-100
  vec3 gold    = vec3(0.722,0.620,0.380); // gold-deep
  vec3 col = mix(mist, teal, smoothstep(0.25,0.85,n));
  col = mix(col, gold, smoothstep(0.72,0.95,n)*0.18); // faint gold vein
  // vignette toward edges so center stays clean for text
  float vig = smoothstep(1.15, 0.2, length(uv-0.5));
  gl_FragColor = vec4(col, 0.55*vig);
}
`;

const VERT = `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }
`;

export default function HeroShader() {
  const hostRef = useRef<HTMLDivElement>(null);
  const { active, visibleRef } = useLazyWebGL(hostRef, { rootMargin: "0px" });

  useEffect(() => {
    if (!active || !hostRef.current) return;
    const host = hostRef.current;
    let raf = 0;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      const scene = new THREE.Scene();
      const camera = new THREE.Camera();
      const uniforms = {
        uTime: { value: 0 },
        uRes: { value: new THREE.Vector2(1, 1) },
      };
      const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms, transparent: true });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
      scene.add(mesh);
      host.appendChild(renderer.domElement);
      Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });

      const resize = () => {
        const w = host.clientWidth || 1;
        const h = host.clientHeight || 1;
        renderer.setSize(w, h, false);
        uniforms.uRes.value.set(w, h);
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host);

      const start = performance.now();
      const loop = () => {
        raf = requestAnimationFrame(loop);
        if (document.hidden || !visibleRef.current) return;
        uniforms.uTime.value = (performance.now() - start) / 1000;
        renderer.render(scene, camera);
      };
      loop();

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        mesh.geometry.dispose();
        mat.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => { disposed = true; cleanup(); };
  }, [active, visibleRef]);

  return <div ref={hostRef} aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}
