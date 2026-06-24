'use client';

/**
 * BrandSwitcherScene — Three.js canvas for the brand switcher panel.
 *
 * Three glass spheres, one per Carisma brand, floating gently in a dark scene.
 * Hover scales + brightens; the active-brand sphere is always slightly elevated.
 * Raw three.js (no @react-three/fiber). Dynamically imported with ssr:false.
 * Disposes renderer + geometries + materials on unmount.
 *
 * Performance: RAF runs only while mounted; IntersectionObserver pauses it when
 * the panel scrolls fully off-screen; prefers-reduced-motion collapses to a
 * static frame.
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type BrandSphereConfig = {
  color: string;
  name: string;
  tagline: string;
  url: string;
  isCurrent: boolean;
};

type Props = {
  brands: BrandSphereConfig[];
  /** index of the sphere being hovered from the card row below */
  externalHovered: number | null;
  onHover: (index: number | null) => void;
  onClick: (index: number) => void;
};

const SPHERE_SPACING = 2.2;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export default function BrandSwitcherScene({ brands, externalHovered, onHover, onClick }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const externalHoveredRef = useRef<number | null>(externalHovered);

  // keep ref in sync without re-running the effect
  useEffect(() => {
    externalHoveredRef.current = externalHovered;
  }, [externalHovered]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = prefersReducedMotion();
    const W = mount.clientWidth || 300;
    const H = mount.clientHeight || 140;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene + Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, W / H, 0.1, 20);
    camera.position.z = 5.5;

    // ── Lights ────────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(4, 6, 6);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xd0e8ff, 0.8);
    fill.position.set(-4, 2, 3);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xfff8f0, 0.6);
    rim.position.set(0, -4, -4);
    scene.add(rim);

    // ── Spheres ───────────────────────────────────────────────────────────────
    const count = brands.length;
    const totalWidth = (count - 1) * SPHERE_SPACING;
    const startX = -totalWidth / 2;

    const geo = new THREE.SphereGeometry(0.72, 64, 64);
    const meshes: THREE.Mesh[] = [];
    const mats: THREE.MeshPhysicalMaterial[] = [];
    const pointLights: THREE.PointLight[] = [];

    brands.forEach((b, i) => {
      const col = new THREE.Color(b.color);
      const mat = new THREE.MeshPhysicalMaterial({
        color: col,
        metalness: 0.08,
        roughness: 0.06,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        reflectivity: 0.9,
        transparent: true,
        opacity: b.isCurrent ? 1.0 : 0.65,
      });
      mats.push(mat);

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.x = startX + i * SPHERE_SPACING;
      mesh.position.y = b.isCurrent ? 0.06 : 0;
      meshes.push(mesh);
      scene.add(mesh);

      // per-sphere coloured point light for glow
      const pl = new THREE.PointLight(b.color, b.isCurrent ? 1.8 : 0.7, 3.5);
      pl.position.set(mesh.position.x, mesh.position.y + 0.6, 1.8);
      pointLights.push(pl);
      scene.add(pl);
    });

    // ── Particles ─────────────────────────────────────────────────────────────
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 9;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 3 - 1;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x96b2b2, size: 0.025, transparent: true, opacity: 0.35 });
    scene.add(new THREE.Points(pGeo, pMat));

    // ── Raycaster + Interaction ───────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-10, -10);
    let hoveredIdx: number | null = null;

    function onMouseMove(e: MouseEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }
    function onMouseClick() {
      if (hoveredIdx !== null) onClick(hoveredIdx);
    }
    function onMouseLeave() {
      mouse.set(-10, -10);
    }

    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onMouseClick);
    renderer.domElement.addEventListener('mouseleave', onMouseLeave);

    // ── Animation loop ────────────────────────────────────────────────────────
    let rafId = 0;
    let running = true;
    const clock = new THREE.Clock();

    function animate() {
      if (!running) return;
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // raycasting
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(meshes);
      const newHovered = hits.length > 0 ? meshes.indexOf(hits[0].object as THREE.Mesh) : null;
      if (newHovered !== hoveredIdx) {
        hoveredIdx = newHovered;
        onHover(hoveredIdx);
        renderer.domElement.style.cursor = hoveredIdx !== null ? 'pointer' : 'default';
      }

      const effectiveHovered = hoveredIdx ?? externalHoveredRef.current;

      meshes.forEach((mesh, i) => {
        const mat = mats[i];
        const isHovered = i === effectiveHovered;
        const isCurrent = brands[i].isCurrent;

        if (!reduced) {
          // float
          mesh.position.y = Math.sin(t * 0.75 + i * 2.1) * 0.09 + (isCurrent ? 0.06 : 0);
          // slow rotation
          mesh.rotation.y += 0.004;
          mesh.rotation.x += 0.0008;
        }

        // smooth scale
        const targetScale = isHovered ? 1.14 : isCurrent ? 1.04 : 1.0;
        mesh.scale.setScalar(mesh.scale.x + (targetScale - mesh.scale.x) * 0.12);

        // smooth opacity
        const targetOpacity = isHovered || isCurrent ? 1.0 : 0.62;
        mat.opacity += (targetOpacity - mat.opacity) * 0.1;

        // smooth point light intensity
        const targetIntensity = isHovered ? 3.0 : isCurrent ? 1.8 : 0.6;
        pointLights[i].intensity += (targetIntensity - pointLights[i].intensity) * 0.1;
      });

      renderer.render(scene, camera);
    }

    if (reduced) {
      renderer.render(scene, camera);
    } else {
      animate();
    }

    // ── IntersectionObserver pause ─────────────────────────────────────────────
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!reduced && !running) { running = true; animate(); }
      } else {
        running = false;
        cancelAnimationFrame(rafId);
      }
    });
    obs.observe(mount);

    // ── Resize ────────────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const nW = mount.clientWidth;
      const nH = mount.clientHeight;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    });
    ro.observe(mount);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      obs.disconnect();
      ro.disconnect();
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('click', onMouseClick);
      renderer.domElement.removeEventListener('mouseleave', onMouseLeave);
      geo.dispose();
      pGeo.dispose();
      pMat.dispose();
      mats.forEach(m => m.dispose());
      pointLights.forEach(pl => scene.remove(pl));
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '140px' }} />;
}
