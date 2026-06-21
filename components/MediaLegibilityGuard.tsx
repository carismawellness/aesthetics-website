"use client";

import { useEffect } from "react";

/**
 * MediaLegibilityGuard — guarantees text is always readable over media.
 *
 * Scans for video / canvas / large background images and, for any text that
 * visually sits ON TOP of one WITHOUT its own opaque backing, applies an
 * adaptive text-shadow halo (dark text → light halo, light text → dark halo).
 * This keeps copy legible through every frame of a playing video, regardless of
 * how bright or busy a given frame is.
 *
 * Safe by design:
 *  - client-only (after hydration); never changes layout (shadow only);
 *  - skips text that already sits on an opaque surface (cards, panels, scrims);
 *  - re-runs on resize and shortly after load (videos autoplay / fonts settle).
 *
 * Today the site places text beside media (no overlay), so this is mostly a
 * standing guarantee for current edge cases and any future full-bleed media.
 */
const TEXT_SEL =
  "h1,h2,h3,h4,h5,h6,p,li,a,blockquote,figcaption,span,strong,em";

function alphaOf(bg: string): number {
  if (!bg || bg === "transparent") return 0;
  const m = bg.match(/rgba?\(([^)]+)\)/);
  if (!m) return 1;
  const parts = m[1].split(",").map((s) => parseFloat(s));
  return parts.length === 4 ? parts[3] : 1;
}

function luminance(color: string): number {
  const m = color.match(/\d+(\.\d+)?/g);
  if (!m) return 0;
  const [r, g, b] = m.map(Number);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function overlaps(a: DOMRect, b: DOMRect): boolean {
  return !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
}

export default function MediaLegibilityGuard() {
  useEffect(() => {
    function hasOpaqueBacking(el: Element): boolean {
      let node: Element | null = el;
      while (node && node !== document.body) {
        if (alphaOf(getComputedStyle(node).backgroundColor) >= 0.6) return true;
        node = node.parentElement;
      }
      return false;
    }

    function run() {
      const media = [...document.querySelectorAll<HTMLElement>("video, canvas, img")].filter((m) => {
        const r = m.getBoundingClientRect();
        // ignore small inline imagery (icons, logos, badges)
        return r.width > 160 && r.height > 160;
      });
      if (!media.length) return;
      const mediaRects = media.map((m) => m.getBoundingClientRect());

      document.querySelectorAll<HTMLElement>(TEXT_SEL).forEach((el) => {
        if (el.dataset.legible === "1") return;
        if (el.querySelector(TEXT_SEL)) return; // leaf-level text only
        const txt = el.textContent?.trim();
        if (!txt) return;
        const r = el.getBoundingClientRect();
        if (r.width < 2 || r.height < 2) return;
        if (!mediaRects.some((mr) => overlaps(r, mr))) return; // not over media
        if (hasOpaqueBacking(el)) return; // already on a solid surface → legible

        const lum = luminance(getComputedStyle(el).color);
        el.style.textShadow =
          lum < 0.5
            ? "0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.65)"
            : "0 1px 2px rgba(0,0,0,0.6), 0 0 8px rgba(0,0,0,0.5)";
        el.dataset.legible = "1";
      });
    }

    run();
    const raf = requestAnimationFrame(run);
    const settle = window.setTimeout(run, 1200); // videos autoplay / fonts settle
    let t: number | undefined;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(run, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
