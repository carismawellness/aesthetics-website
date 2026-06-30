"use client";

import { useEffect, useRef, useState } from "react";

/*
  Mobile-only floating consultation CTA for Carisma Aesthetics.

  Motion ported from the Carisma Slimming StickyCta, restyled to the Aesthetics
  teal palette: hidden until the user scrolls past the hero, then it fades +
  slides up into view (reduced-motion safe; pointer-events disabled while hidden
  so it never blocks taps or shifts layout).

  Functionality: a single resized pill that links IN-TAB to /consultation, so the
  site-wide ConsultationModal popup intercepts the click and opens the form
  (same behaviour as the hero "Book Free Consultation" button) — no new tab, no
  external Fresha redirect.
*/

const WIDE = '"Novecento Wide", sans-serif';

export default function MobileStickyConsultCTA() {
  const [shown, setShown] = useState(false);
  const [animate, setAnimate] = useState(true);
  const ticking = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotion = () => setAnimate(!mq.matches);
    applyMotion();
    mq.addEventListener("change", applyMotion);

    // Reveal once scrolled ~past the hero so it never competes with the hero CTA.
    const evaluate = () => {
      ticking.current = false;
      setShown(window.scrollY > window.innerHeight * 0.7);
    };
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(evaluate);
    };
    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", applyMotion);
    };
  }, []);

  return (
    <div
      className="lg:hidden"
      role="region"
      aria-label="Quick booking"
      aria-hidden={!shown}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 40,
        display: "flex",
        justifyContent: "center",
        padding: "0 16px calc(14px + env(safe-area-inset-bottom, 0px))",
        pointerEvents: shown ? "auto" : "none",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(120%)",
        transition: animate
          ? "opacity 280ms ease, transform 320ms cubic-bezier(0.22,1,0.36,1)"
          : "none",
      }}
    >
      {/* Frosted-glass shell around the pill */}
      <div
        style={{
          display: "inline-flex",
          padding: "5px",
          borderRadius: "999px",
          background: "rgba(255,255,255,0.70)",
          backdropFilter: "blur(24px) saturate(200%)",
          WebkitBackdropFilter: "blur(24px) saturate(200%)",
          border: "1px solid rgba(255,255,255,0.45)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.75) inset, 0 -1px 0 rgba(0,0,0,0.04) inset",
        }}
      >
        <a
          href="/consultation"
          aria-label="Book Your Free Consultation"
          className="cta-glow-teal"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 40,
            padding: "10px 22px",
            borderRadius: "999px",
            background:
              "linear-gradient(155deg, #3a6a73 0%, var(--teal-deep) 45%, #1a3d42 100%)",
            color: "#e2c97a",
            fontFamily: WIDE,
            fontWeight: 700,
            fontSize: "11px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            textDecoration: "none",
            whiteSpace: "nowrap",
            boxShadow:
              "0 6px 24px rgba(36,80,82,0.38), 0 1px 0 rgba(255,255,255,0.15) inset",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          Book Your Free Consultation
        </a>
      </div>
    </div>
  );
}
