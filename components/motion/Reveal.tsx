'use client';

/**
 * Scroll-reveal wrapper (GSAP + ScrollTrigger). Luxury fade-rise on enter.
 *
 * - Content is ALWAYS in the DOM and visible for no-JS users. It is pre-hidden
 *   only when `html.js` is set (see globals.css) so there's no flash and no CLS
 *   (animates opacity/transform only).
 * - `stagger` reveals direct children one-by-one (cards, list items).
 * - Fully disabled under prefers-reduced-motion (CSS shows the final state).
 * - Do NOT wrap the LCP hero headline in this — keep above-the-fold instant.
 */
import { useRef, useEffect, type ElementType, type ReactNode, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Reveal direct children in sequence instead of the wrapper as one block. */
  stagger?: boolean;
  /** Start delay (s). */
  delay?: number;
  /** Travel distance (px). */
  y?: number;
};

export default function Reveal({
  children,
  as: Tag = 'div',
  className,
  style,
  stagger = false,
  delay = 0,
  y = 24,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const targets = stagger ? gsap.utils.toArray<HTMLElement>(el.children) : el;
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay,
        stagger: stagger ? 0.12 : 0,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger, delay]);

  const dataAttr = stagger ? { 'data-reveal-group': '' } : { 'data-reveal': '' };
  return (
    <Tag ref={ref} className={className} style={{ ['--reveal-y' as string]: `${y}px`, ...style }} {...dataAttr}>
      {children}
    </Tag>
  );
}
