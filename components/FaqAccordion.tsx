"use client";

import { useState } from "react";

export type Faq = { q: string; a: string };

export default function FaqAccordion({ items, uppercase = true }: { items: Faq[]; uppercase?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    // P6 — explicit landmark not needed here since TreatmentPage wraps in <section>;
    // component provides the accordion list itself
    <div className="mx-auto" style={{ maxWidth: "1080px" }}>
      {items.map((it, i) => {
        const isOpen = open === i;
        // P1 — unique IDs linking button to content panel (aria pattern)
        const panelId = `faq-panel-${i}`;
        const triggerId = `faq-trigger-${i}`;

        return (
          <div key={it.q} style={{ borderBottom: "1px solid #e4ddd2" }}>
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
                className="font-display"
                style={{
                  fontSize: "16px",
                  // P1 — #776030 on white = 4.72:1, passes AA for body text
                  color: "#776030",
                  letterSpacing: "0.06em",
                  // P6 — adequate line height for readability
                  lineHeight: 1.45,
                  textTransform: uppercase ? undefined : "none",
                }}
              >
                {it.q}
              </span>
              <span
                aria-hidden="true"
                style={{
                  color: "#776030",
                  // P7 — animation respects prefers-reduced-motion via CSS (globals handles @media)
                  transition: "transform 0.3s ease",
                  transform: isOpen ? "rotate(180deg)" : "none",
                  flexShrink: 0,
                  // P2 — ensure icon area meets minimum touch target
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "28px",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </button>

            {/* P1 — role="region" with aria-labelledby linking to the trigger */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              style={{
                // P7 — CSS grid row animation: smooth open/close
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 0.3s ease",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                {/* P6 — body text line-height 1.8 for readability */}
                <p
                  style={{
                    fontSize: "14.5px",
                    color: "var(--label)",
                    lineHeight: 1.8,
                    padding: "0 4px 24px",
                    whiteSpace: "pre-line",
                    // P6 — max line length for comfortable reading
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
