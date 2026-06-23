"use client";

import { useEffect, useRef, useState } from "react";
import type { StickyCtaProps } from "@/lib/packages/preview-types";

/*
  Sticky bottom-of-viewport conversion bar for the V2 package preview.

  - Hidden until the user scrolls ~600px past the top (past the hero), then
    fades + slides in. A passive, rAF-throttled scroll listener drives a single
    boolean — no sentinel element required, so the bar is fully self-contained
    and drops into any page.
  - Liquid Gloss pill (`.lg lg--pill lg--strong`): frosted translucent surface,
    blur+saturate, hairline border, inset top gloss + strong shadow.
  - Mobile-first: the price label + claim button stack the value where most
    traffic is. On wide desktop the bar narrows and centres (a full sticky bar
    across a 1440px viewport reads as clutter), but it never fully hides — the
    claim CTA stays reachable.
  - A11y / quality: 44px+ tap target on the link, white text on --teal-deep
    (>=4.5:1 AA), `env(safe-area-inset-bottom)` padding for notched phones,
    z-index 60, reduced-motion disables the enter transition, the fixed bar is
    `pointer-events:none` while hidden so it never blocks taps and causes no
    layout shift (it's removed from flow), and nothing overflows horizontally.
*/
export default function StickyCta({ freshaHref, priceLabel, ctaLabel, secondaryHref, secondaryLabel }: StickyCtaProps) {
  const hasSecondary = Boolean(secondaryHref && secondaryLabel);
  const [shown, setShown] = useState(false);
  // Respect reduced-motion for the enter animation only (visibility still works).
  const [animate, setAnimate] = useState(true);
  const tickingRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotion = () => setAnimate(!mq.matches);
    applyMotion();
    mq.addEventListener("change", applyMotion);

    const REVEAL_AT = 600;
    const evaluate = () => {
      tickingRef.current = false;
      setShown(window.scrollY > REVEAL_AT);
    };
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(evaluate);
    };

    // Set initial state (e.g. when the page loads already scrolled / restored).
    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", applyMotion);
    };
  }, []);

  return (
    <div
      role="region"
      aria-label="Quick booking"
      aria-hidden={!shown}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 60,
        display: "flex",
        justifyContent: "center",
        // Safe-area inset for notched phones; small base gap above the edge.
        padding: "0 12px calc(12px + env(safe-area-inset-bottom, 0px))",
        // Hidden -> never intercepts taps -> no accidental blocking, no layout shift.
        pointerEvents: shown ? "auto" : "none",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(120%)",
        transition: animate ? "opacity 280ms ease, transform 320ms cubic-bezier(0.22,1,0.36,1)" : "none",
      }}
    >
      <style>{`
        @media (max-width: 600px) {
          .sticky-cta-has-2 .sticky-cta-label { display: none; }
        }
      `}</style>
      <div
        className={`lg lg--pill lg--strong${hasSecondary ? " sticky-cta-has-2" : ""}`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          width: "100%",
          maxWidth: hasSecondary ? "620px" : "560px", // a touch wider to fit two CTAs
          padding: "8px 8px 8px 18px",
          minHeight: 60,
        }}
      >
        <span
          className="font-display sticky-cta-label"
          style={{
            flex: "1 1 auto",
            minWidth: 0, // allow text to shrink/ellipsis instead of forcing overflow
            fontSize: "12px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--ink)",
            lineHeight: 1.3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {priceLabel}
        </span>
        {/* Secondary CTA — outline pill. Internal "/consultation" stays in-tab so
            the site-wide consultation popup intercepts it. */}
        {hasSecondary && (
          <a
            href={secondaryHref}
            aria-label={secondaryLabel}
            className="font-display"
            style={{
              flex: "0 0 auto",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 44,
              padding: "12px 16px",
              borderRadius: "999px",
              background: "transparent",
              color: "var(--teal-deep)",
              border: "1px solid rgba(var(--teal-deep-rgb), 0.5)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            {secondaryLabel}
          </a>
        )}
        {/* Primary claim CTA: white-on-teal-deep (>=4.5:1 AA), 44px+ target.
            External (Fresha) links open in a new tab and bypass the popup;
            internal links stay in-tab for the consultation modal. */}
        <a
          href={freshaHref}
          {...(/^https?:\/\//.test(freshaHref) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          aria-label={ctaLabel}
          className="font-display cta-glow-teal"
          style={{
            flex: "0 0 auto",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 44,
            padding: "12px 20px",
            borderRadius: "999px",
            background: "linear-gradient(155deg, #639090 0%, #4f7373 45%, #365858 100%)",
            color: "#fff",
            fontSize: "12px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textDecoration: "none",
            whiteSpace: "nowrap",
            boxShadow: "0 0 22px rgba(79,115,115,0.45), 0 8px 24px rgba(79,115,115,0.5)",
          }}
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}
