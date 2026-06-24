import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/treatment/SectionHeader";

/**
 * PlanSummary — the "starter pack" offer-stack, ported from the Carisma Slimming
 * treatment-page design language (PackagePage.tsx → the Dual / Starter Pack
 * section) and recoloured to the Aesthetics green→teal palette.
 *
 * Layout (mirrors slimming verbatim — outer card containing two inner white
 * panels, radius 16 / pad 22 / two equal columns / gap 22):
 *   LEFT  — three benefit blocks: rounded-square outline icon (54×54, teal-deep
 *           stroke) + uppercase Novecento title + 1–2 line description.
 *   RIGHT — bulleted inclusions ("label (€value)"), then a soft teal-filled inner
 *           box ("TOTAL VALUE: €X  TODAY: €Y ONLY"), a full-width pill CTA, and a
 *           Google ★★★★★ "Over N Reviews" line.
 * A serif <SectionHeader> heading sits above the card.
 *
 * Tokens: Aesthetics only — headings --gold, eyebrow/accents --teal-text /
 * --teal-deep, body --ink-soft / --muted, icon strokes --teal-deep, hairlines
 * --line, grounds --teal-100 / white, CTA .btn .btn-teal, stars --gold-deep.
 */

/* ---------- icon set — small stroked SVGs keyed by benefit.icon (teal-deep).
   Decorative → aria-hidden. Defaults to "sparkle" when unkeyed/unknown. ------ */
type IconKey = "target" | "chart" | "value" | "shield" | "clock" | "sparkle";

function BenefitIcon({ name = "sparkle" }: { name?: IconKey }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--teal-deep)",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="0.6" fill="var(--teal-deep)" stroke="none" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M4 19V5" />
          <path d="M4 19h16" />
          <path d="M8 16v-4" />
          <path d="M12.5 16V8" />
          <path d="M17 16v-6" />
        </svg>
      );
    case "value":
      return (
        <svg {...common}>
          <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2A2 2 0 0 1 2.8 12V5a2 2 0 0 1 2-2h7a2 2 0 0 1 1.4.6l7.4 7.4a2 2 0 0 1 0 2.8Z" />
          <circle cx="7.5" cy="7.5" r="1.2" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5c0 4.4 3 7.5 7 9 4-1.5 7-4.6 7-9V6l-7-3Z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 1.8" />
        </svg>
      );
    case "sparkle":
    default:
      return (
        <svg {...common}>
          <path d="M12 3.5c.4 3.2 1.8 4.6 5 5-3.2.4-4.6 1.8-5 5-.4-3.2-1.8-4.6-5-5 3.2-.4 4.6-1.8 5-5Z" />
          <path d="M18.5 14.5c.2 1.4.8 2 2.2 2.2-1.4.2-2 .8-2.2 2.2-.2-1.4-.8-2-2.2-2.2 1.4-.2 2-.8 2.2-2.2Z" />
        </svg>
      );
  }
}

/* Google "G" wordmark (4-colour). Decorative → aria-hidden. */
function GoogleMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden style={{ flexShrink: 0 }}>
      <path
        fill="#4285F4"
        d="M45.1 24.5c0-1.6-.1-2.8-.4-4H24v7.3h12.1c-.2 1.9-1.6 4.8-4.6 6.7l-.04.3 6.7 5.2.5.1c4.3-3.9 6.8-9.7 6.8-15.6Z"
      />
      <path
        fill="#34A853"
        d="M24 46c6.1 0 11.2-2 14.9-5.5l-7.1-5.5c-1.9 1.3-4.5 2.3-7.8 2.3-5.9 0-11-4-12.8-9.5l-.3.02-6.9 5.4-.1.3C7.6 41 15.2 46 24 46Z"
      />
      <path
        fill="#FBBC05"
        d="M11.2 27.8c-.5-1.4-.8-3-.8-4.8s.3-3.4.7-4.8l-.01-.3-7-5.4-.2.1A22 22 0 0 0 2 23c0 3.5.8 6.9 2.3 9.9l6.9-5.1Z"
      />
      <path
        fill="#EB4335"
        d="M24 9.4c4.2 0 7 1.8 8.6 3.3l6.3-6.1C35.2 3 30.1 1 24 1 15.2 1 7.6 6 4.3 13.1l6.9 5.4C13 13 18.1 9.4 24 9.4Z"
      />
    </svg>
  );
}

/* Five solid gold stars + the review-count label. Rating is meaningful →
   labelled; the star glyphs themselves are decorative. */
function GoogleReviews({ reviews }: { reviews: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
      <GoogleMark size={17} />
      <span
        role="img"
        aria-label="Rated 5 out of 5 stars"
        style={{ color: "var(--gold-deep)", fontSize: 16, letterSpacing: 2, lineHeight: 1 }}
      >
        {"★".repeat(5)}
      </span>
      <span style={{ color: "var(--muted)", fontSize: 13.5, lineHeight: 1.4 }}>{reviews}</span>
    </div>
  );
}

/* Plain round bullet — decorative. */
function Dot() {
  return (
    <span aria-hidden style={{ color: "var(--teal-deep)", fontSize: 16, lineHeight: 1.2, flexShrink: 0, marginTop: 1 }}>
      &bull;
    </span>
  );
}

export type PlanSummaryProps = {
  kicker?: string;
  title: string;
  benefits: { icon?: IconKey; title: string; credential?: string; desc: string }[];
  included: { label: string; value?: string }[];
  totalValue?: string;
  price?: string;
  priceLabel?: string;
  cta: { text: string; href: string; external?: boolean };
  reviews?: string;
};

export default function PlanSummary({
  kicker,
  title,
  benefits,
  included,
  totalValue,
  price,
  priceLabel = "ONLY",
  cta,
  reviews,
}: PlanSummaryProps) {
  // Show the price box whenever a price is supplied. With a totalValue it reads
  // as a "TOTAL VALUE → TODAY" offer; with price alone it shows a clean price.
  const showPrice = Boolean(price);

  return (
    <section
      aria-labelledby="plan-summary-heading"
      style={{ padding: "clamp(72px, 9vh, 112px) 0" }}
    >
      <div style={{ maxWidth: 1040, marginInline: "auto", paddingInline: 24 }}>
        <SectionHeader kicker={kicker} title={title} id="plan-summary-heading" />

        <Reveal>
          {/* OUTER CARD — soft teal-tinted ground holding two inner white panels.
              Radius / padding / two-equal-column grid / gap mirror the slimming
              starter-pack section exactly. Self-contained scoped style stacks the
              two columns to one under 720px (matching the treatment-page
              convention in ClarityGrid / SuitabilityCards). */}
          <style>{`
            .plan-summary-grid {
              margin-top: 40px;
              background: linear-gradient(150deg, var(--teal-100) 0%, #fbfdfd 100%);
              border-radius: var(--radius-card);
              padding: 22px;
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 22px;
              align-items: stretch;
            }
            @media (max-width: 720px) {
              .plan-summary-grid { grid-template-columns: 1fr; }
            }
          `}</style>
          <div className="plan-summary-grid">
            {/* LEFT — three benefit blocks: rounded-square outline icon + title + desc */}
            <div
              style={{
                background: "var(--white)",
                borderRadius: "var(--radius-card)",
                padding: "34px 30px",
                display: "flex",
                flexDirection: "column",
                gap: 26,
                justifyContent: "space-around",
              }}
            >
              {benefits.map((b) => (
                <div key={b.title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span
                    aria-hidden
                    style={{
                      flexShrink: 0,
                      width: 54,
                      height: 54,
                      border: "1px solid var(--line)",
                      borderRadius: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BenefitIcon name={b.icon} />
                  </span>
                  <div>
                    <h3
                      className="font-display"
                      style={{
                        color: "var(--teal-text)",
                        fontSize: 13,
                        letterSpacing: "0.12em",
                        margin: "4px 0 2px",
                        lineHeight: 1.3,
                      }}
                    >
                      {b.title}
                    </h3>
                    {b.credential && (
                      <p
                        style={{
                          color: "var(--gold-deep)",
                          fontSize: 11.5,
                          letterSpacing: "0.08em",
                          margin: "2px 0 6px",
                          lineHeight: 1.3,
                          fontWeight: 600,
                        }}
                      >
                        {b.credential}
                      </p>
                    )}
                    <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.55, margin: 0 }}>
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT — inclusions list → soft price box → CTA → Google reviews */}
            <div
              style={{
                background: "var(--white)",
                borderRadius: "var(--radius-card)",
                padding: 30,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ul
                aria-label="What's included"
                style={{ listStyle: "none", padding: 0, margin: "0 0 22px", display: "flex", flexDirection: "column", gap: 12 }}
              >
                {included.map((it) => (
                  <li
                    key={it.label}
                    style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "var(--ink-soft)", fontSize: 14.5, lineHeight: 1.55 }}
                  >
                    <Dot />
                    <span>
                      {it.label}
                      {it.value && <span style={{ color: "var(--muted)" }}> ({it.value})</span>}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Soft-filled inner box — pushed to the bottom so the panel balances
                  the (often taller) benefits column. Teal-tinted ground. */}
              <div
                style={{
                  marginTop: "auto",
                  background: "linear-gradient(150deg, var(--teal-100) 0%, #fbfdfd 100%)",
                  borderRadius: "var(--radius-card)",
                  padding: "18px 20px",
                }}
              >
                {showPrice && (
                  <p
                    className="font-display"
                    style={{
                      color: "var(--teal-text)",
                      fontSize: 14,
                      letterSpacing: "0.06em",
                      margin: "0 0 14px",
                      lineHeight: 1.5,
                    }}
                  >
                    {totalValue ? (
                      <>
                        TOTAL VALUE: {totalValue}&nbsp;&nbsp;TODAY:{" "}
                        <span style={{ color: "var(--gold)", fontSize: 18 }}>
                          {price} {priceLabel}
                        </span>
                      </>
                    ) : (
                      <span style={{ color: "var(--gold)", fontSize: 18 }}>
                        {price}{" "}
                        <span style={{ color: "var(--teal-text)", fontSize: 14 }}>{priceLabel}</span>
                      </span>
                    )}
                  </p>
                )}

                {/* Full-width pill CTA. External → new tab with rel guard; internal
                    (e.g. /consultation) gets NO target so the site popup intercepts. */}
                {cta.external ? (
                  <a
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-teal"
                    style={{ width: "100%", padding: "15px 30px", borderRadius: "var(--radius-pill)", minHeight: 44 }}
                  >
                    {cta.text}
                  </a>
                ) : (
                  <a
                    href={cta.href}
                    className="btn btn-teal"
                    style={{ width: "100%", padding: "15px 30px", borderRadius: "var(--radius-pill)", minHeight: 44 }}
                  >
                    {cta.text}
                  </a>
                )}

                {reviews && (
                  <div style={{ marginTop: 16 }}>
                    <GoogleReviews reviews={reviews} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
