"use client";

import { useState } from "react";

export type Faq = { q: string; a: string };

export default function FaqAccordion({ items, uppercase = true }: { items: Faq[]; uppercase?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="mx-auto" style={{ maxWidth: "1080px" }}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} style={{ borderBottom: "1px solid #e4ddd2" }}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex items-center justify-between w-full text-left"
              style={{ padding: "22px 4px", background: "transparent", border: "none", cursor: "pointer", gap: "20px" }}
              aria-expanded={isOpen}
            >
              <span className="font-display" style={{ fontSize: "16px", color: "var(--gold-deep)", letterSpacing: "0.06em", lineHeight: 1.4, textTransform: uppercase ? undefined : "none" }}>
                {it.q}
              </span>
              <span
                aria-hidden
                style={{ color: "var(--gold-deep)", transition: "transform 0.3s", transform: isOpen ? "rotate(180deg)" : "none", flexShrink: 0 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
              </span>
            </button>
            <div
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 0.3s ease",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <p style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.8, padding: "0 4px 24px", whiteSpace: "pre-line" }}>{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
