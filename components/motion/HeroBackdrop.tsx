'use client';

/**
 * Always-on, LCP-safe backdrop for the homepage hero.
 *
 * Renders a pure-CSS brand bokeh gradient immediately (no JS, no CLS, paints
 * with the hero). The heavy three.js scene (HeroScene) is lazy-loaded ON TOP
 * only when it earns its weight:
 *   - desktop (not small screen), fine pointer (not touch)
 *   - prefers-reduced-motion is OFF
 *   - the hero has scrolled into view
 *   - the browser is idle (requestIdleCallback)
 * On mobile / reduced-motion the static gradient is all that ships.
 */
import { useEffect, useRef, useState, Suspense, lazy } from 'react';

const HeroScene = lazy(() => import('./HeroScene'));

export default function HeroBackdrop({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.matchMedia('(max-width: 820px)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduce || small || coarse) return;

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const idle =
          window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
        idle(() => setMount(true));
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={className}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}
    >
      <div className="hero-bokeh-fallback" style={{ position: 'absolute', inset: 0 }} />
      {mount && (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      )}
    </div>
  );
}
