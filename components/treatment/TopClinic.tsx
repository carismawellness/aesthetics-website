"use client"; // logos use inline onMouseEnter/onMouseLeave hover handlers, which
// require a Client Component (server components can't pass event handlers).

import Reveal from "@/components/Reveal";

/**
 * TopClinic — "authority / top-clinic" trust band for Carisma Aesthetics.
 *
 * Mirrors the Carisma Slimming "Malta's trusted clinic" band:
 *   centered Trajan heading → small centered "as seen in" press-names line →
 *   centered row of grayscale press LOGOS → responsive row of benefit CARDS.
 *
 * Each card is a thin rounded-rectangle outline panel with a centered stroked
 * icon, an uppercase title, and a short description. The LAST card is visually
 * highlighted with a slightly stronger teal border.
 *
 * Aesthetics tokens only (teal/gold). Reduced-motion safe (handled by Reveal +
 * CSS-token transitions that collapse under prefers-reduced-motion). Decorative
 * icons/logos are aria-hidden.
 */

type IconKey = "target" | "sparkle" | "shield" | "check" | "gem" | "clock";

export type TopClinicCard = {
  icon?: IconKey;
  title: string;
  desc: string;
};

export type TopClinicProps = {
  /** Big centered Trajan heading, e.g. "Malta's Top Clinic for Botox". */
  title: string;
  /** Small centered "as seen in" press-names line, e.g. "Times of Malta · Lovin Malta · Bay". */
  pressText?: string;
  /** Optional press-logo image URLs, rendered grayscale + centered. */
  logos?: string[];
  /** Benefit cards; the LAST card is visually highlighted. */
  cards: TopClinicCard[];
};

/* Stroked-SVG icon set — 24×24 viewBox, currentColor stroke, ~30px rendered.
   Keyed by card.icon; falls back to a sensible default per index downstream. */
function CardIcon({ icon }: { icon?: IconKey }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
  };
  switch (icon) {
    case "sparkle":
      return (
        <svg {...common}>
          <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
          <path d="M19 15l.7 1.9L21.6 18l-1.9.7L19 21l-.7-2.3L16.4 18l1.9-1.1L19 15z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12.5l2.5 2.5L16 9" />
        </svg>
      );
    case "gem":
      return (
        <svg {...common}>
          <path d="M6 3h12l3 6-9 12L3 9l3-6z" />
          <path d="M3 9h18M9 3L6 9l6 12 6-12-3-6" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      );
    case "target":
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.4" />
        </svg>
      );
  }
}

/* Per-index default icons so cards always render a sensible glyph
   even when `icon` is omitted. */
const DEFAULT_ICONS: IconKey[] = ["target", "sparkle", "shield", "gem"];

export default function TopClinic({ title, pressText, logos, cards }: TopClinicProps) {
  return (
    <section
      aria-labelledby="top-clinic-heading"
      style={{ padding: "clamp(72px, 9vh, 112px) 0" }}
    >
      <div className="container">
        <Reveal>
          {/* Centered serif (Trajan) heading */}
          <h2
            id="top-clinic-heading"
            className="font-serif text-center"
            style={{
              fontSize: "clamp(26px, 3.6vw, 40px)",
              color: "var(--gold)",
              letterSpacing: "0.04em",
              fontWeight: 400,
              lineHeight: 1.2,
              margin: 0,
              textTransform: "uppercase",
              textWrap: "balance",
            }}
          >
            {title}
          </h2>

          {/* Small centered "as seen in" press-names line */}
          {pressText && (
            <p
              className="text-center"
              style={{
                fontSize: 12.5,
                color: "var(--muted)",
                letterSpacing: "0.06em",
                lineHeight: 1.6,
                maxWidth: 640,
                marginInline: "auto",
                marginTop: 16,
                textWrap: "balance",
              }}
            >
              {pressText}
            </p>
          )}
        </Reveal>

        {/* Centered row of grayscale press logos */}
        {logos && logos.length > 0 && (
          <Reveal>
            <div
              className="flex flex-wrap items-center justify-center"
              style={{ gap: 30, marginTop: pressText ? 24 : 28 }}
            >
              {logos.map((logo) => (
                // Press logos are purely decorative (text equivalent lives in
                // pressText); keep them out of the a11y tree. Grayscale by default,
                // gentle hover-to-color via inline event handlers (no JS state).
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={logo}
                  src={logo}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="top-clinic-logo"
                  style={{
                    height: 40,
                    width: "auto",
                    objectFit: "contain",
                    filter: "grayscale(1)",
                    opacity: 0.62,
                    transition: "opacity 200ms ease, filter 200ms ease",
                  }}
                />
              ))}
            </div>
          </Reveal>
        )}

        {/* Responsive benefit cards: 4 across desktop → 2 → 1 */}
        {cards.length > 0 && (
          <Reveal style={{ display: "block", marginTop: 48 }}>
            <ul
              className="top-clinic-cards"
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: 20,
              }}
            >
              {cards.map((card, i) => {
                const highlighted = i === cards.length - 1;
                return (
                  <li
                    key={card.title}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      background: "#ffffff",
                      border: highlighted
                        ? "1.5px solid var(--teal-deep)"
                        : "1px solid var(--line)",
                      borderRadius: "var(--radius-card)",
                      padding: "30px 22px 32px",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--teal-deep)",
                        marginBottom: 16,
                      }}
                    >
                      <CardIcon icon={card.icon ?? DEFAULT_ICONS[i % DEFAULT_ICONS.length]} />
                    </span>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: 14,
                        color: highlighted ? "var(--teal-text)" : "var(--gold)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        lineHeight: 1.35,
                        margin: "0 0 10px",
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: "var(--ink-soft)",
                        lineHeight: 1.6,
                        margin: 0,
                        textWrap: "pretty",
                      }}
                    >
                      {card.desc}
                    </p>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        )}
      </div>

      {/* Responsive grid breakpoints (4 → 2 → 1) scoped to this section. */}
      <style>{`
        @media (max-width: 900px) {
          .top-clinic-cards { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 520px) {
          .top-clinic-cards { grid-template-columns: 1fr !important; }
        }
        .top-clinic-logo:hover { filter: grayscale(0) !important; opacity: 1 !important; }
        @media (prefers-reduced-motion: reduce) {
          .top-clinic-logo { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
