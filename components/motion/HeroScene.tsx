'use client';

/**
 * The ONE WebGL moment: a slow field of soft, blurred brand-colour bokeh that
 * drifts behind the homepage hero. Deliberately lightweight and tasteful.
 *
 * Loaded ONLY via React.lazy from HeroBackdrop (so three.js sits in its own
 * lazy chunk, never the main bundle) and only when: in view, desktop, pointer
 * fine, and prefers-reduced-motion is off. Pauses when the tab is hidden,
 * caps DPR, shares one texture, and fully disposes on unmount.
 */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let raf = 0;
    let running = true;
    const width = () => mount.clientWidth || 1;
    const height = () => mount.clientHeight || 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width(), height());
    renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width() / height(), 0.1, 100);
    camera.position.z = 14;

    // Soft radial sprite (shared by every bokeh particle).
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 128;
    const c2d = canvas.getContext('2d')!;
    const grad = c2d.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.45, 'rgba(255,255,255,0.45)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    c2d.fillStyle = grad;
    c2d.fillRect(0, 0, 128, 128);
    const texture = new THREE.CanvasTexture(canvas);

    // Brand palette: sage-teal, mist, light-teal, mid-sage tint (no warm beige).
    const palette = [0x96b2b2, 0xdeebeb, 0xc5d6d6, 0xb7cccc];
    const COUNT = 14;
    const sprites: { sp: THREE.Sprite; speed: number; phase: number }[] = [];
    for (let i = 0; i < COUNT; i++) {
      const material = new THREE.SpriteMaterial({
        map: texture,
        color: palette[i % palette.length],
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
      });
      const sp = new THREE.Sprite(material);
      sp.position.set((Math.random() - 0.5) * 22, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 6);
      const s = 2 + Math.random() * 4;
      sp.scale.set(s, s, 1);
      scene.add(sp);
      sprites.push({ sp, speed: 0.08 + Math.random() * 0.12, phase: Math.random() * Math.PI * 2 });
    }

    const onResize = () => {
      renderer.setSize(width(), height());
      camera.aspect = width() / height();
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    const t0 = performance.now();
    const loop = () => {
      if (!running) return;
      const t = (performance.now() - t0) / 1000;
      for (const { sp, speed, phase } of sprites) {
        sp.position.y += Math.sin(t * speed + phase) * 0.002;
        sp.position.x += Math.cos(t * speed * 0.7 + phase) * 0.0015;
      }
      scene.rotation.z = Math.sin(t * 0.05) * 0.04;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) loop();
      else cancelAnimationFrame(raf);
    };
    document.addEventListener('visibilitychange', onVisibility);
    loop();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      sprites.forEach(({ sp }) => (sp.material as THREE.SpriteMaterial).dispose());
      texture.dispose();
      renderer.dispose();
      renderer.domElement.parentNode?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} aria-hidden style={{ position: 'absolute', inset: 0 }} />;
}
