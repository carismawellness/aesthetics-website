"use client";

import { useEffect, useState } from "react";

/*
  Mobile-only sticky claim bar for the Snatch Your Jawline funnel.
  Hidden until the hero scrolls out of view, then pinned to the bottom on small
  screens. Tapping it smooth-scrolls to the closing lead form (#claim).
  Hidden on lg+ (the hero/closing forms are always reachable on desktop) and
  respects prefers-reduced-motion via the browser's native scroll behaviour.
*/

export default function StickyCta({ priceNow = "€149" }: { priceNow?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Reveal once the visitor scrolls roughly past the hero (deterministic on
    // both real and programmatic scroll). Hide again near the very bottom so the
    // bar never overlaps the closing form / footer.
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom =
        window.innerHeight + y >= document.documentElement.scrollHeight - 240;
      setShow(y > 620 && !nearBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="lg:hidden"
      aria-hidden={!show}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        transform: show ? "translateY(0)" : "translateY(120%)",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
        padding: "10px 14px calc(10px + env(safe-area-inset-bottom))",
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(8px)",
        borderTop: "1px solid var(--line)",
        boxShadow: "0 -8px 24px rgba(0,0,0,0.08)",
      }}
    >
      <a
        href="#claim"
        className="btn btn-teal flex items-center justify-center"
        style={{ width: "100%", padding: "15px 20px", tabIndex: show ? 0 : -1 } as React.CSSProperties}
        tabIndex={show ? 0 : -1}
      >
        Claim my spot — {priceNow}
        <span style={{ marginLeft: "8px", fontSize: "10px", opacity: 0.85, letterSpacing: "0.08em" }}>WAS €400</span>
      </a>
    </div>
  );
}
