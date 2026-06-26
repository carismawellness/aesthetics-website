'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function QuizIcon3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const SIZE = 120;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(SIZE, SIZE);
    renderer.setClearColor(0x000000, 0);

    // Teal-palette ambient + point lights
    const ambient = new THREE.AmbientLight('#DEEBEB', 1.1);
    scene.add(ambient);

    const key = new THREE.PointLight('#96B2B2', 3.5, 8);
    key.position.set(2, 2, 3);
    scene.add(key);

    const fill = new THREE.PointLight('#4F7373', 2.0, 8);
    fill.position.set(-2, -1, 2);
    scene.add(fill);

    // TorusKnot — same shape as slimming but teal toned
    const geo = new THREE.TorusKnotGeometry(0.55, 0.18, 200, 24, 2, 3);
    const mat = new THREE.MeshStandardMaterial({
      color: '#96B2B2',
      metalness: 0.25,
      roughness: 0.45,
    });
    const knot = new THREE.Mesh(geo, mat);
    scene.add(knot);

    let raf = 0;
    const animate = (t: number) => {
      raf = requestAnimationFrame(animate);
      const secs = t * 0.001;
      knot.rotation.y = secs * 0.48;
      knot.rotation.x = secs * 0.24;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={120}
      height={120}
      style={{ display: 'block', pointerEvents: 'none' }}
      aria-hidden
    />
  );
}
