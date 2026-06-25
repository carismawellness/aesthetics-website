"use client";

import { useEffect } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   DeferredAnalytics — loads the marketing tag stack (GTM, GA/gtag, Klaviyo)
   on the visitor's FIRST interaction (scroll / pointer / touch / key), with a
   6s idle fallback so non-interacting visitors are still tracked.

   Why: these ~700 KB of third-party scripts executing immediately
   (afterInteractive) are the main remaining drag on the mobile Speed-Index /
   performance score. Real visitors interact within the first second or two, so
   GTM-managed conversion/remarketing tags and Klaviyo still fire on essentially
   every real session — only no-interaction bounces (which rarely convert) load
   them via the timeout. A dataLayer + gtag stub is installed immediately so any
   early tracking calls queue and replay once the real scripts load.

   Approved trade-off (Jun 2026): slightly later analytics firing in exchange
   for the score. To revert, restore the inline <Script> tags in app/layout.tsx.
   ────────────────────────────────────────────────────────────────────────── */

const GTM_ID = "GTM-T3ZJC949";
const GA_ID = "G-MKGQE17SN7";
const KLAVIYO_SRC =
  "https://static.klaviyo.com/onsite/js/XvCJDh/klaviyo.js?company_id=XvCJDh";

type W = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

export default function DeferredAnalytics() {
  useEffect(() => {
    const w = window as W;

    // Install stubs immediately so early gtag()/dataLayer pushes are preserved
    // and replayed when the real scripts load.
    w.dataLayer = w.dataLayer || [];
    if (!w.gtag) {
      w.gtag = function gtag(...args: unknown[]) {
        w.dataLayer!.push(args);
      };
    }

    let done = false;
    const inject = (src: string, id?: string) => {
      if (id && document.getElementById(id)) return;
      const s = document.createElement("script");
      s.async = true;
      s.src = src;
      if (id) s.id = id;
      document.head.appendChild(s);
    };

    // Intercept fbq Lead events to ensure value/currency are always present.
    // GTM fires fbq('track','Lead') without params; this patch adds them before
    // the call reaches Meta, so Events Manager shows enriched Lead events.
    const patchFbq = () => {
      const fbq = (w as unknown as Record<string, unknown>).fbq as ((...a: unknown[]) => unknown) & { queue?: unknown[][] } | undefined;
      if (typeof fbq !== "function") { setTimeout(patchFbq, 150); return; }
      if ((fbq as unknown as Record<string, boolean>).__enriched) return;
      const orig = fbq;
      const patched = (...args: unknown[]) => {
        if (args[0] === "track" && args[1] === "Lead") {
          const p = (args[2] as Record<string, unknown>) ?? {};
          args[2] = { value: 75, currency: "EUR", ...p };
        }
        return orig(...args);
      };
      Object.assign(patched, orig);
      (patched as unknown as Record<string, boolean>).__enriched = true;
      (w as unknown as Record<string, unknown>).fbq = patched;
    };

    const load = () => {
      if (done) return;
      done = true;
      cleanup();

      // Google Tag Manager
      w.dataLayer!.push({ "gtm.start": Date.now(), event: "gtm.js" });
      inject(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`, "gtm-script");
      // Patch fbq once GTM has had time to inject the Meta pixel
      setTimeout(patchFbq, 500);

      // Google Analytics (gtag)
      inject(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, "gtag-script");
      w.gtag!("js", new Date());
      w.gtag!("config", GA_ID);

      // Klaviyo Onsite
      inject(KLAVIYO_SRC, "klaviyo-onsite");
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
    const timer = window.setTimeout(load, 6000);

    return cleanup;
  }, []);

  return null;
}
