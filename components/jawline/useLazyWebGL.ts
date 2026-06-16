"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/*
  Gates WebGL mounting so Three.js stays purposeful and cheap:
  - never on prefers-reduced-motion,
  - never when WebGL is unsupported,
  - skips heavy scenes on small + low-core devices (opts: allowMobile/heavy),
  - only mounts once the element is near the viewport (IntersectionObserver),
  - reports `visible` separately so scenes can pause their RAF when off-screen.
*/

export function useLazyWebGL(
  ref: RefObject<HTMLElement | null>,
  { rootMargin = "300px", heavy = false }: { rootMargin?: string; heavy?: boolean } = {}
) {
  const [active, setActive] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    try {
      const c = document.createElement("canvas");
      if (!(c.getContext("webgl2") || c.getContext("webgl"))) return;
    } catch {
      return;
    }

    const smallScreen = window.matchMedia("(max-width: 640px)").matches;
    const lowCore = (navigator.hardwareConcurrency || 8) <= 4;
    if (heavy && smallScreen && lowCore) return; // protect weak phones from heavy scenes

    const mountIO = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          mountIO.disconnect();
        }
      },
      { rootMargin }
    );
    mountIO.observe(el);

    const visIO = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting; }, { threshold: 0.01 });
    visIO.observe(el);

    return () => { mountIO.disconnect(); visIO.disconnect(); };
  }, [ref, rootMargin, heavy]);

  return { active, visibleRef };
}
