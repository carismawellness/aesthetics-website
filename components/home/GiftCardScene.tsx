'use client';

/**
 * GiftCardScene — the "alive" centrepiece of the home-page gift-card section.
 *
 * Raw three.js (no @react-three/fiber — it isn't installed). A small set of the
 * real occasion gift-card renderings are textured onto rounded planes and fanned
 * in a gentle arc in 3D space. GSAP drives the entrance timeline (cards sweep
 * out from a stacked deck and fade in when the section scrolls into view) plus
 * the idle float loop; the pointer subtly tilts the whole fan for parallax.
 *
 * SSR / performance safeguards (this component is dynamically imported with
 * `{ ssr: false }` from GiftCardsSummary — a WebGL canvas must never be SSR'd):
 *   • devicePixelRatio capped at 2
 *   • ResizeObserver keeps the renderer + camera in sync with the container
 *   • IntersectionObserver pauses the RAF loop when the scene is offscreen
 *   • visibilitychange pauses the loop when the tab is hidden
 *   • geometries, materials, textures and the renderer are disposed on unmount
 *   • prefers-reduced-motion → static fanned layout, no autoplay loop, no GSAP
 *
 * Palette: Aesthetics teal only — no green / cream-beige / brown fills.
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

/** The nicest occasion renderings to fan out, centre-most last (drawn on top). */
const CARDS = [
  '/assets/gift/wedding.png',
  '/assets/gift/anniversary.png',
  '/assets/gift/mothers-day.png',
  '/assets/gift/thank-you.png',
  '/assets/gift/just-for-you.png',
  '/assets/gift/birthday.png',
];

/** Card plane geometry (matches ~1032×906 art → ~1.14 aspect). */
const CARD_W = 2.5;
const CARD_H = CARD_W * (906 / 1032);

/** Build a RoundedBox-ish flat plane via a rounded-rectangle shape geometry. */
function roundedPlane(w: number, h: number, r: number) {
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
  const geo = new THREE.ShapeGeometry(shape, 24);
  // Normalise UVs so the texture maps cleanly across the rounded shape bbox.
  geo.computeBoundingBox();
  const bb = geo.boundingBox!;
  const sizeX = bb.max.x - bb.min.x;
  const sizeY = bb.max.y - bb.min.y;
  const pos = geo.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = (pos.getX(i) - bb.min.x) / sizeX;
    uv[i * 2 + 1] = (pos.getY(i) - bb.min.y) / sizeY;
  }
  geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  return geo;
}

export default function GiftCardScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let running = false;
    let inView = false;
    let started = false;
    let disposed = false;

    const width = () => mount.clientWidth || 1;
    const height = () => mount.clientHeight || 1;

    // ── Renderer (transparent, DPR-capped at 2) ───────────────────────────
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width(), height());
    renderer.domElement.style.cssText =
      'position:absolute;inset:0;width:100%;height:100%;display:block;';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width() / height(), 0.1, 100);
    camera.position.set(0, 0, 9.2);

    // ── Geometry (shared) + soft drop-shadow sprite (shared) ──────────────
    const geometry = roundedPlane(CARD_W, CARD_H, 0.16);

    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = shadowCanvas.height = 128;
    const sctx = shadowCanvas.getContext('2d')!;
    const sgrad = sctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    sgrad.addColorStop(0, 'rgba(64,96,96,0.30)');
    sgrad.addColorStop(0.6, 'rgba(64,96,96,0.12)');
    sgrad.addColorStop(1, 'rgba(64,96,96,0)');
    sctx.fillStyle = sgrad;
    sctx.fillRect(0, 0, 128, 128);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);

    const loader = new THREE.TextureLoader();
    const textures: THREE.Texture[] = [];
    const meshes: THREE.Mesh[] = [];
    const shadows: THREE.Sprite[] = [];
    const groups: THREE.Group[] = [];

    // Parent group that receives the pointer parallax tilt; children are the
    // individual card groups added in the loop below.
    const fan = new THREE.Group();
    scene.add(fan);

    const n = CARDS.length;
    const ARC = 0.46; // radians between adjacent cards
    const RADIUS = 6.2; // arc radius (cards sit on a shallow circle)

    CARDS.forEach((src, i) => {
      const offset = i - (n - 1) / 2; // centred fan, e.g. -2.5 … 2.5
      const angle = offset * ARC;

      const tex = loader.load(src, () => {
        renderApprox(); // re-draw once the texture decodes
      });
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      textures.push(tex);

      const material = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Soft shadow sprite sitting just behind each card.
      const shadow = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: shadowTex,
          transparent: true,
          opacity: 0.55,
          depthWrite: false,
        })
      );
      shadow.scale.set(CARD_W * 1.5, CARD_H * 1.5, 1);
      shadow.position.set(0, -0.25, -0.06);

      // Each card lives in its own group so we can animate it independently
      // while the parent fan handles the shared pointer tilt.
      const g = new THREE.Group();
      g.add(shadow);
      g.add(mesh);

      // Final fanned transform (arc spread + slight downward smile + depth).
      g.userData.target = {
        x: Math.sin(angle) * RADIUS,
        y: -Math.abs(offset) * 0.18,
        z: Math.cos(angle) * RADIUS - RADIUS,
        rotZ: -offset * 0.14,
        rotY: -angle * 0.5,
      };
      g.renderOrder = i; // centre cards drawn last → on top

      meshes.push(mesh);
      shadows.push(shadow);
      groups.push(g);
      fan.add(g);
    });

    // ── Pointer parallax (subtle whole-fan tilt) ──────────────────────────
    const pointer = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.y = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    const onPointerLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };

    // A single render that reflects whatever the current transforms are.
    function renderApprox() {
      if (disposed) return;
      renderer.render(scene, camera);
    }

    // ── Entrance timeline (GSAP) ──────────────────────────────────────────
    function placeFinal() {
      groups.forEach((g) => {
        const t = g.userData.target;
        g.position.set(t.x, t.y, t.z);
        g.rotation.set(0, t.rotY, t.rotZ);
        (g.children[1] as THREE.Mesh).visible = true;
        ((g.children[1] as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = 1;
        ((g.children[0] as THREE.Sprite).material as THREE.SpriteMaterial).opacity = 0.55;
      });
    }

    function startEntrance() {
      if (started) return;
      started = true;
      if (reduceMotion) {
        placeFinal();
        renderApprox();
        return;
      }
      // Stack everything centred + invisible, then fan out.
      groups.forEach((g) => {
        g.position.set(0, 0.4, 0);
        g.rotation.set(0, 0, 0);
        ((g.children[1] as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = 0;
        ((g.children[0] as THREE.Sprite).material as THREE.SpriteMaterial).opacity = 0;
      });
      const tl = gsap.timeline();
      groups.forEach((g, i) => {
        const t = g.userData.target;
        tl.to(
          g.position,
          { x: t.x, y: t.y, z: t.z, duration: 1.1, ease: 'power3.out' },
          i * 0.09
        );
        tl.to(
          g.rotation,
          { y: t.rotY, z: t.rotZ, duration: 1.1, ease: 'power3.out' },
          i * 0.09
        );
        tl.to(
          (g.children[1] as THREE.Mesh).material as THREE.MeshBasicMaterial,
          { opacity: 1, duration: 0.7, ease: 'power2.out' },
          i * 0.09 + 0.1
        );
        tl.to(
          (g.children[0] as THREE.Sprite).material as THREE.SpriteMaterial,
          { opacity: 0.55, duration: 0.7, ease: 'power2.out' },
          i * 0.09 + 0.1
        );
      });
    }

    // ── RAF loop (idle float + parallax) ──────────────────────────────────
    const t0 = performance.now();
    const loop = () => {
      if (!running) return;
      const t = (performance.now() - t0) / 1000;

      // Ease the parallax tilt toward the pointer.
      tilt.x += (pointer.y * 0.12 - tilt.x) * 0.05;
      tilt.y += (pointer.x * 0.2 - tilt.y) * 0.05;
      fan.rotation.x = tilt.x;
      fan.rotation.y = tilt.y;

      // Gentle per-card idle bob, phase-offset along the fan.
      groups.forEach((g, i) => {
        const base = g.userData.target;
        g.position.y = base.y + Math.sin(t * 0.6 + i * 0.7) * 0.07;
        g.rotation.z = base.rotZ + Math.sin(t * 0.5 + i * 0.9) * 0.015;
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };

    const play = () => {
      if (running || reduceMotion) {
        renderApprox();
        return;
      }
      running = true;
      loop();
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // ── Resize (ResizeObserver) ───────────────────────────────────────────
    const onResize = () => {
      renderer.setSize(width(), height());
      camera.aspect = width() / height();
      camera.updateProjectionMatrix();
      renderApprox();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // ── Visibility / in-view gating ───────────────────────────────────────
    const updateRunning = () => {
      if (inView && !document.hidden) play();
      else pause();
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) startEntrance();
        updateRunning();
      },
      { threshold: 0.1 }
    );
    io.observe(mount);

    const onVisibility = () => updateRunning();
    document.addEventListener('visibilitychange', onVisibility);
    if (!reduceMotion) {
      mount.addEventListener('pointermove', onPointerMove);
      mount.addEventListener('pointerleave', onPointerLeave);
    }

    // Initial paint so the canvas isn't blank before scroll-in.
    if (reduceMotion) {
      startEntrance();
    } else {
      placeFinal();
      // hide until entrance fires (entrance resets opacity to 0 then animates)
      groups.forEach((g) => {
        ((g.children[1] as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = 0;
        ((g.children[0] as THREE.Sprite).material as THREE.SpriteMaterial).opacity = 0;
      });
    }
    renderApprox();

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      disposed = true;
      pause();
      // Kill only this scene's tweens (positions, rotations, materials).
      groups.forEach((g) => {
        gsap.killTweensOf(g.position);
        gsap.killTweensOf(g.rotation);
        gsap.killTweensOf((g.children[1] as THREE.Mesh).material as THREE.MeshBasicMaterial);
        gsap.killTweensOf((g.children[0] as THREE.Sprite).material as THREE.SpriteMaterial);
      });
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      mount.removeEventListener('pointermove', onPointerMove);
      mount.removeEventListener('pointerleave', onPointerLeave);
      geometry.dispose();
      shadowTex.dispose();
      meshes.forEach((m) => (m.material as THREE.MeshBasicMaterial).dispose());
      shadows.forEach((s) => (s.material as THREE.SpriteMaterial).dispose());
      textures.forEach((tx) => tx.dispose());
      renderer.dispose();
      renderer.domElement.parentNode?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0 }}
    />
  );
}
