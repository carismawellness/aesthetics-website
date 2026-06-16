"use client";

import { useEffect, useRef } from "react";
import { useLazyWebGL } from "./useLazyWebGL";

/*
  Results-section accent: a slowly undulating wireframe "contour field" — a nod
  to facial mapping / sculpting. Brand sage-teal lines on a transparent ground,
  so it layers over the section background. Lazy + paused off-screen + DPR
  capped; absent under reduced-motion / no-WebGL (nothing else needs it).
  pointer-events: none.
*/

export default function ContourField() {
  const hostRef = useRef<HTMLDivElement>(null);
  const { active, visibleRef } = useLazyWebGL(hostRef, { rootMargin: "200px" });

  useEffect(() => {
    if (!active || !hostRef.current) return;
    const host = hostRef.current;
    let raf = 0;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.set(0, 2.1, 3.4);
      camera.lookAt(0, 0, 0);

      const geo = new THREE.PlaneGeometry(7, 7, 70, 70);
      const mat = new THREE.MeshBasicMaterial({ color: 0x7a9e9e, wireframe: true, transparent: true, opacity: 0.5 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2.2;
      scene.add(mesh);

      const base = (geo.attributes.position.array as Float32Array).slice();
      const pos = geo.attributes.position;

      host.appendChild(renderer.domElement);
      Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });

      const resize = () => {
        const w = host.clientWidth || 1, h = host.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host);

      const start = performance.now();
      const loop = () => {
        raf = requestAnimationFrame(loop);
        if (document.hidden || !visibleRef.current) return;
        const t = (performance.now() - start) / 1000;
        for (let i = 0; i < pos.count; i++) {
          const x = base[i * 3];
          const y = base[i * 3 + 1];
          const z = Math.sin(x * 0.9 + t * 0.8) * 0.28 + Math.cos(y * 1.1 - t * 0.6) * 0.28;
          pos.setZ(i, z);
        }
        pos.needsUpdate = true;
        mesh.rotation.z = Math.sin(t * 0.1) * 0.06;
        renderer.render(scene, camera);
      };
      loop();

      cleanup = () => {
        cancelAnimationFrame(raf); ro.disconnect();
        geo.dispose(); mat.dispose(); renderer.dispose(); renderer.domElement.remove();
      };
    })();

    return () => { disposed = true; cleanup(); };
  }, [active, visibleRef]);

  return <div ref={hostRef} aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.85 }} />;
}
