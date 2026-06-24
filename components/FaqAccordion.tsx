"use client";

import { useState } from "react";

export type Faq = { q: string; a: string };

// Brand-family AA colors (mirrors slimming's FAQAccordion, retinted teal):
//   TEAL_TEXT #406060 = deep teal for question text/chevron — passes AA (>=4.5) on
//   white and on the section's light-teal-mist surrounding gradient.
//   BROWN #706552 = warm taupe body copy — passes AA on the same grounds.
// Clean accordion rows on a TRANSPARENT background so they blend into the page
// gradient — no solid turquoise/teal block, no cards, no filled buttons.
const TEAL_TEXT = "#406060";
const BROWN = "#3a3a3a";
const DIVIDER = "#e4ddd2"; // tasteful thin hairline (warm, low-contrast)

// Inline styles always win over CSS @media rules, so we gate transitions in JS.
function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function FaqAccordion({
  items,
  uppercase = true,
}: {
  items: Faq[];
  uppercase?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const reduced = prefersReducedMotion();

  return (
    // Transparent wrapper — inherits whatever the section background is, so the
    // rows sit directly on the page gradient (no opaque block of their own).
    <div className="mx-auto" style={{ maxWidth: "1080px", background: "transparent" }}>
      {items.map((it, i) => {
        const isOpen = open === i;
        // P1 — unique IDs linking button to content panel (aria pattern)
        const panelId = `faq-panel-${i}`;
        const triggerId = `faq-trigger-${i}`;

        return (
          <div key={it.q} style={{ borderBottom: `1px solid ${DIVIDER}` }}>
            <button
              type="button"
              id={triggerId}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex items-center justify-between w-full text-left"
              style={{
                // P2 — minimum 44px tap target height
                padding: "22px 4px",
                minHeight: "44px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                gap: "20px",
                // P2 — transition on interactive element
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.72";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
              // P1 — aria-expanded for the accordion pattern
              aria-expanded={isOpen}
              // P1 — links button to the controlled content panel
              aria-controls={panelId}
            >
              <span
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "15px",
                  fontWeight: 400,
                  // P1 — teal-text #406060 = AA on white / light-teal mist
                  color: TEAL_TEXT,
                  letterSpacing: "0.5px",
                  // P6 — adequate line height for readability
                  lineHeight: 1.4,
                  textTransform: uppercase ? "uppercase" : "none",
                }}
              >
                {it.q}
              </span>
              {/* Slimming-style chevron control that rotates 180° on open */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={TEAL_TEXT}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{
                  flexShrink: 0,
                  // P7 — gate transition in JS; inline styles override @media CSS rules
                  transition: reduced ? "none" : "transform 0.3s ease",
                  transform: isOpen ? "rotate(180deg)" : "none",
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* P1 — role="region" with aria-labelledby linking to the trigger */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              style={{
                // P7 — CSS grid row animation: smooth open/close at any height
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: reduced ? "none" : "grid-template-rows 0.3s ease",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                {/* P6 — brown body copy, comfortable line height + measure */}
                <p
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "14.5px",
                    color: BROWN,
                    lineHeight: 1.75,
                    padding: "0 4px 24px",
                    whiteSpace: "pre-line",
                    maxWidth: "72ch",
                  }}
                >
                  {it.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
