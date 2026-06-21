"use client";

import { useState, useId } from "react";
import Link from "next/link";

// FAQ section for the Pico laser tattoo removal page.
// Self-contained: borderless search input + 10-row accordion (first row open by
// default with a share-icon row), faint-teal hairline dividers, and a centered
// teal pill CTA with a short vertical connector line descending below it.

type QA = { q: string; a: string };

const FAQS: QA[] = [
  {
    q: "What is Pico laser tattoo removal?",
    a: "Pico laser tattoo removal is an advanced laser treatment that uses ultra-short pulses of energy to break tattoo ink into tiny particles. These particles are then gradually cleared by the body's natural healing process. Picosecond lasers are designed to target ink with very short pulse durations, which may help improve fading compared with older laser methods.",
  },
  {
    q: "How does Pico laser remove tattoo ink?",
    a: "The laser sends quick bursts of energy into the skin, targeting the tattoo pigment without cutting the skin. The ink breaks into smaller fragments, and your body slowly removes them over time.",
  },
  {
    q: "How many sessions will I need?",
    a: "The number of sessions depends on the tattoo's size, colour, age, depth, ink type, and your skin's response. Most tattoos need multiple sessions, with gradual fading after each visit. A consultation is the best way to estimate your treatment plan.",
  },
  {
    q: "Does Pico laser tattoo removal hurt?",
    a: "You may feel a snapping or stinging sensation, similar to a rubber band against the skin. Many clinics use cooling or numbing options to make the treatment more comfortable.",
  },
  {
    q: "Can Pico laser remove all tattoo colours?",
    a: "Pico laser can treat many ink colours, but some shades fade faster than others. Black and darker inks usually respond well, while lighter colours such as yellow, white, and some pastel tones may need more sessions or may be harder to remove completely.",
  },
  {
    q: "Will the tattoo disappear completely?",
    a: "Many tattoos can fade significantly, and some may clear almost completely. However, results vary depending on the tattoo and the skin. In some cases, a light shadow or trace of pigment may remain.",
  },
  {
    q: "Is there any downtime after treatment?",
    a: "There is usually minimal downtime, but the treated area may look red, swollen, sensitive, or slightly blistered for a short time. These reactions are part of the healing process, but proper aftercare is important.",
  },
  {
    q: "What aftercare should I follow?",
    a: "Keep the area clean, avoid picking or scratching, protect it from sun exposure, and follow the aftercare instructions given by your practitioner. Sun exposure and poor aftercare can increase the risk of pigmentation changes or scarring.",
  },
  {
    q: "Can Pico laser cause scarring?",
    a: "Scarring is possible with any tattoo removal treatment, but the risk is lower when the procedure is performed correctly by a trained professional and proper aftercare is followed. The FDA notes possible risks include scarring, infection, redness, soreness, and changes in skin colour.",
  },
  {
    q: "Who is not suitable for Pico laser tattoo removal?",
    a: "Pico laser may not be suitable for everyone. People who are pregnant, breastfeeding, have active skin infections, poor wound healing, or certain medical conditions may need to avoid treatment or get medical advice first. A professional consultation is required before starting.",
  },
];

function ShareIcons() {
  // opacity removed: 0.65 dropped the social-share icons to 2.70:1 (UI graphic fail).
  // Full --label #756758 = 5.47:1, passes 1.4.11 (>=3:1).
  const ic = { color: "var(--label)" } as const;
  return (
    <div
      className="flex items-center"
      style={{ gap: "20px", padding: "4px 4px 6px" }}
      aria-label="Share this answer"
    >
      <a
        href="https://www.facebook.com/sharer/sharer.php?u=https://carismaaesthetics.com/pico-laser-tattoo-removal"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook (opens in new tab)"
        className="share-icon-btn"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" style={ic} aria-hidden="true">
          <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.43-4.94 8.43-9.94z" />
        </svg>
      </a>
      <a
        href="https://twitter.com/intent/tweet?url=https://carismaaesthetics.com/pico-laser-tattoo-removal"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X / Twitter (opens in new tab)"
        className="share-icon-btn"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={ic} aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.65l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.16 17.52h1.833L7.084 4.126H5.117l11.967 15.644z" />
        </svg>
      </a>
      <a
        href="https://www.linkedin.com/shareArticle?url=https://carismaaesthetics.com/pico-laser-tattoo-removal"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn (opens in new tab)"
        className="share-icon-btn"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={ic} aria-hidden="true">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
        </svg>
      </a>
      <button
        type="button"
        aria-label="Copy link to this answer"
        className="share-icon-btn"
        onClick={() => {
          if (typeof navigator !== "undefined") {
            navigator.clipboard.writeText(
              "https://carismaaesthetics.com/pico-laser-tattoo-removal"
            );
          }
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={ic}
          aria-hidden="true"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </button>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const [query, setQuery] = useState("");
  const baseId = useId();

  const filtered = query.trim()
    ? FAQS.filter(
        (f) =>
          f.q.toLowerCase().includes(query.toLowerCase()) ||
          f.a.toLowerCase().includes(query.toLowerCase())
      )
    : FAQS;

  return (
    <section
      aria-labelledby="faq-heading"
      style={{ background: "#ffffff", padding: "50px 0" }}
    >
      <div className="container">
        <div className="mx-auto" style={{ maxWidth: "1080px" }}>
          {/* Header row: heading left, search input right */}
          <div
            className="faq-head"
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "18px",
            }}
          >
            <h2
              id="faq-heading"
              className="font-serif"
              style={{
                fontSize: "clamp(22px,3vw,30px)",
                color: "#406060",
                letterSpacing: "0.06em",
                fontWeight: 400,
                textTransform: "uppercase",
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              Frequently Asked Questions
            </h2>
            <div style={{ position: "relative", width: "280px", maxWidth: "100%" }}>
              <label htmlFor="faq-search" className="sr-only">
                Search frequently asked questions
              </label>
              <input
                id="faq-search"
                type="search"
                className="form-field"
                placeholder="Search questions…"
                aria-label="Search frequently asked questions"
                aria-controls="faq-list"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(null);
                }}
                style={{ fontSize: "13px", padding: "10px 34px 10px 14px" }}
              />
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--gold-deep)",
                  pointerEvents: "none",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
              </span>
            </div>
          </div>

          {/* Accordion list */}
          <div
            id="faq-list"
            role="list"
            aria-live="polite"
            aria-label="Frequently asked questions"
          >
            {filtered.length === 0 && (
              <p
                style={{
                  textAlign: "center",
                  color: "var(--label)",
                  fontSize: "14px",
                  padding: "32px 0",
                }}
              >
                No questions match your search. Try a different term.
              </p>
            )}
            {filtered.map((it, i) => {
              const isOpen = open === i;
              const btnId = `${baseId}-btn-${i}`;
              const panelId = `${baseId}-panel-${i}`;
              return (
                <div
                  key={it.q}
                  role="listitem"
                  style={{ borderBottom: "1px solid rgba(99,145,171,0.32)" }}
                >
                  <button
                    id={btnId}
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="faq-row flex items-center justify-between w-full text-left"
                    style={{
                      minHeight: "48px",
                      padding: "20px 12px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      gap: "20px",
                      borderRadius: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "16px",
                        color: "var(--label)",
                        lineHeight: 1.4,
                        letterSpacing: "0.01em",
                      }}
                    >
                      {it.q}
                    </span>
                    <span
                      aria-hidden="true"
                      style={{
                        color: "var(--gold-deep)",
                        transition: "transform 0.3s",
                        transform: isOpen ? "rotate(180deg)" : "none",
                        flexShrink: 0,
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
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    style={{
                      display: "grid",
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transition: "grid-template-rows 0.3s ease",
                    }}
                  >
                    <div style={{ overflow: "hidden" }}>
                      <p
                        style={{
                          fontSize: "14.5px",
                          color: "var(--label)",
                          lineHeight: 1.8,
                          padding: "0 4px 14px",
                        }}
                      >
                        {it.a}
                      </p>
                      <ShareIcons />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA pill + descending connector line */}
          <div className="flex flex-col items-center" style={{ marginTop: "36px" }}>
            <Link
              href="/consultation"
              className="btn btn-teal"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "48px",
                fontSize: "13px",
                padding: "14px 56px",
                letterSpacing: "0.1em",
              }}
            >
              CLAIM MY SPOT NOW{" "}
              <span aria-hidden="true" style={{ marginLeft: "4px" }}>›</span>
            </Link>
            <span
              aria-hidden="true"
              style={{
                width: "1px",
                height: "40px",
                background: "var(--line)",
                marginTop: "0",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .faq-row {
          transition: background-color 0.2s ease, box-shadow 0.2s ease;
        }
        .faq-row:hover {
          background-color: rgba(99, 145, 171, 0.06);
        }
        .faq-row:focus-visible {
          outline: 2px solid transparent;
          outline-offset: 2px;
          box-shadow: 0 0 0 3px var(--teal-deep);
        }
        .share-icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 44px;
          min-height: 44px;
          border-radius: 8px;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: background-color 0.2s ease;
          padding: 4px;
        }
        .share-icon-btn:hover {
          background-color: rgba(99,145,171,0.1);
        }
        .share-icon-btn:focus-visible {
          outline: 2px solid var(--teal-deep);
          outline-offset: 2px;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        @media (max-width: 640px) {
          .faq-head { align-items: stretch; }
          .faq-head > div { width: 100%; }
        }
      `}</style>
    </section>
  );
}
