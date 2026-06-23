'use client';

/**
 * Subtle "magnetic" pull toward the cursor for a key CTA. Luxury micro-interaction.
 *
 * Off under prefers-reduced-motion and on coarse pointers (touch) — so it never
 * costs anything on mobile. Translates only (GPU-cheap); snaps back on leave.
 */
import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';

export default function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const enabled = () =>
    typeof window !== 'undefined' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    !window.matchMedia('(pointer: coarse)').matches;

  const onMove = (e: React.MouseEvent) => {
    if (!enabled() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    gsap.to(ref.current, { x, y, duration: 0.4, ease: 'power3.out' });
  };

  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
  };

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'inline-block', willChange: 'transform' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </span>
  );
}
