'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/*
  StickyTreatmentCTA — a persistent, full-width CTA bar pinned to the BOTTOM of
  the viewport for the Carisma Aesthetics treatment template. Client component
  (scroll listener + prefers-reduced-motion).

  Behaviour (ported from the Carisma Slimming MobileStickyCTA, restyled to the
  aesthetics design tokens):
  - Appears only AFTER the user scrolls past the hero (window.scrollY > 600),
    then slides up into place. Under prefers-reduced-motion it simply
    fades/appears with no transform.
  - Full-width frosted, teal-tinted bar: a short value line on the left
    (subLabel — hidden on very small screens) + the shared `.btn .btn-teal`
    pill on the right.
  - Shown on ALL widths (mobile-first, but it reads fine on desktop too). The
    inner row is capped to the page container so it never stretches edge-to-edge
    on large screens.
  - z-index 40 — above page content, deliberately BELOW modals/overlays and the
    Zoho chat bubble (which sits bottom-RIGHT). The bar is full-width across the
    bottom and the inner row reserves right-side clearance so the pill never
    sits directly under the chat bubble.
  - iOS safe-area aware: bottom padding adds env(safe-area-inset-bottom) so the
    bar clears the home indicator.
  - The bar background uses pointer-events:none while the interactive pill keeps
    pointer-events:auto, so the frosted strip never blocks clicks on content
    that shows through its translucent edges.
*/

type Props = {
  label?: string;
  href?: string;
  subLabel?: string;
};

const SHOW_AFTER_PX = 600; // reveal once the hero is scrolled past

export default function StickyTreatmentCTA({
  label = 'Book Free Consultation',
  href = '/consultation',
  subLabel = 'Ready to glow with confidence?',
}: Props) {
  const [shown, setShown] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Track prefers-reduced-motion (reactively).
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Reveal after scrolling past the hero.
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > SHOW_AFTER_PX);
    onScroll(); // sync on mount (e.g. restored scroll position)
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Slide-up only when motion is allowed; otherwise just toggle visibility.
  const hiddenTransform = reduceMotion ? 'none' : 'translateY(110%)';

  return (
    <div
      role="region"
      aria-label="Book a consultation"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 40,
        // Frosted ivory strip.
        background: 'rgba(222, 235, 235, 0.86)', // ivory @ ~86%
        backdropFilter: 'saturate(140%) blur(12px)',
        WebkitBackdropFilter: 'saturate(140%) blur(12px)',
        borderTop: '1px solid var(--line)',
        boxShadow: '0 -8px 28px rgba(var(--teal-deep-rgb), 0.14)',
        padding: '12px 0',
        paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
        pointerEvents: 'none', // strip itself is click-through; pill re-enables
        transform: shown ? 'translateY(0)' : hiddenTransform,
        opacity: shown ? 1 : 0,
        visibility: shown ? 'visible' : 'hidden',
        transition: reduceMotion
          ? 'opacity 200ms ease, visibility 200ms ease'
          : 'transform 320ms ease, opacity 320ms ease, visibility 320ms ease',
      }}
    >
      <div
        className="container sticky-cta__row"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          // Reserve clearance on the right so the pill clears the bottom-right
          // Zoho chat bubble (~64px wide + margin).
          paddingRight: 'clamp(12px, 4vw, 76px)',
        }}
      >
        <span
          className="font-display sticky-cta__label"
          style={{
            pointerEvents: 'auto',
            fontSize: 13,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--teal-text)',
            fontWeight: 600,
            lineHeight: 1.4,
          }}
        >
          {subLabel}
        </span>

        <Link
          href={href}
          className="btn btn-teal sticky-cta__btn"
          style={{
            pointerEvents: 'auto',
            borderRadius: 999,
            padding: '15px 30px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {label}
        </Link>
      </div>

      {/* Hide the left value line on very small screens so the pill keeps room. */}
      <style>{`
        @media (max-width: 480px) {
          .sticky-cta__label { display: none; }
          .sticky-cta__row { justify-content: center; }
          .sticky-cta__btn { width: 100%; text-align: center; }
        }
      `}</style>
    </div>
  );
}
