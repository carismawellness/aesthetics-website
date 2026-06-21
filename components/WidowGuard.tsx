"use client";

import { useEffect } from "react";

/**
 * WidowGuard — eliminates "hanging lines" (typographic widows) site-wide.
 *
 * For every heading, title and paragraph it binds the last two words with a
 * non-breaking space so a wrap can never drop a single lone word onto its own
 * line. CSS `text-wrap: balance/pretty` (in globals.css) does most of the work;
 * this is the cross-browser guarantee for the cases CSS can't reach.
 *
 * Safe by design:
 *  - runs only on the client after hydration (no SSR mismatch);
 *  - binds only the LAST text node, so inline emphasis/markup is preserved;
 *  - reverts the binding if it would overflow a narrow container (e.g. cards),
 *    so it never breaks a layout to avoid a widow;
 *  - idempotent and re-runs (debounced) on resize.
 */
const SELECTOR =
  "main h1, main h2, main h3, main h4, main h5, main h6, main p, main li, main figcaption, main blockquote, main .font-serif, main .font-display, footer h1, footer h2, footer h3, footer p";

const NBSP = " ";

export default function WidowGuard() {
  useEffect(() => {
    const original = new WeakMap<Text, string>();

    function lastTextNode(el: Element): Text | null {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let last: Text | null = null;
      let n: Node | null;
      while ((n = walker.nextNode())) {
        if ((n.textContent ?? "").trim()) last = n as Text;
      }
      return last;
    }

    function isMultiLine(el: HTMLElement): boolean {
      const cs = getComputedStyle(el);
      if (cs.whiteSpace === "nowrap" || cs.whiteSpace === "pre") return false;
      let lh = parseFloat(cs.lineHeight);
      if (Number.isNaN(lh)) lh = parseFloat(cs.fontSize) * 1.3;
      return el.getBoundingClientRect().height > lh * 1.6;
    }

    function process(el: HTMLElement) {
      const tn = lastTextNode(el);
      if (!tn || !tn.textContent) return;

      // Restore any prior binding first so resize re-runs are clean.
      const saved = original.get(tn);
      if (saved !== undefined) tn.textContent = saved;

      const text = tn.textContent;
      const m = /\s+(\S+)\s*$/.exec(text);
      if (!m) return; // no inter-word space before the final word
      const lastWord = m[1];
      if (lastWord.length > 15) return; // very long word: binding risks overflow

      if (!isMultiLine(el)) return; // single line — nothing can hang

      const wordStart = text.lastIndexOf(lastWord);
      let i = wordStart - 1;
      while (i >= 0 && /\s/.test(text[i])) i--;
      const spaceStart = i + 1;
      if (spaceStart >= wordStart) return;

      const bound = text.slice(0, spaceStart) + NBSP + text.slice(wordStart);
      original.set(tn, text);
      tn.textContent = bound;

      // Overflow guard: if binding the last two words pushes past the box, undo.
      if (el.scrollWidth > el.clientWidth + 1) {
        tn.textContent = text;
      }
    }

    function run() {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (el.querySelector(SELECTOR)) return; // only leaf-level matched blocks
        try {
          process(el);
        } catch {
          /* ignore */
        }
      });
    }

    // Run after paint, and once more after fonts settle (metrics can shift).
    run();
    const raf = requestAnimationFrame(run);
    if (typeof document !== "undefined" && "fonts" in document) {
      (document as Document & { fonts: FontFaceSet }).fonts.ready.then(run).catch(() => {});
    }

    let t: number | undefined;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(run, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
