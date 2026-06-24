"use client";

import { useEffect } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   DeferredChat — loads the Zoho SalesIQ widget only after the visitor shows
   intent (first scroll / pointer / touch / key), with a generous fallback
   timeout so non-interacting visitors still get chat.

   Why not just strategy="lazyOnload": the SalesIQ widget pulls a ~2.4 MB image
   and paints a large floating element. Even fired on window.load it lands inside
   the mobile Speed-Index / LCP measurement window under Slow-4G throttling and
   drags the score down. Nobody needs live chat in the first seconds, so we hold
   it until interaction — the single biggest transfer leaves the initial load
   entirely, and chat is still there the instant a real visitor engages.
   ────────────────────────────────────────────────────────────────────────── */

const SRC =
  "https://salesiq.zohopublic.eu/widget?wc=siqe6e51d1708cab04770be4f5ea650f0521bf4a11c156999fedb6a0ec11f0d0d48";

export default function DeferredChat() {
  useEffect(() => {
    if (document.getElementById("zsiqscript")) return;
    let done = false;

    const load = () => {
      if (done) return;
      done = true;
      cleanup();
      const s = document.createElement("script");
      s.id = "zsiqscript";
      s.src = SRC;
      s.async = true;
      document.body.appendChild(s);
    };

    const events: (keyof WindowEventMap)[] = [
      "scroll",
      "pointerdown",
      "touchstart",
      "keydown",
      "mousemove",
    ];
    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, load));
      clearTimeout(timer);
    };
    events.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }));
    // Fallback for visitors who never interact (e.g. read-only): load after 12s idle.
    const timer = window.setTimeout(load, 12000);

    return cleanup;
  }, []);

  return null;
}
