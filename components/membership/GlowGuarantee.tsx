import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

/**
 * GlowGuarantee — the risk-reversal "Glow Guarantee" block for the Carisma
 * Aesthetics membership (Glow Club) page.
 *
 * Models the Carisma Slimming "Results Guarantee / The Carisma Pact" CRO pattern
 * (eyebrow pill → serif promise headline → reassuring sub-promise → proof
 * pillars → single clear CTA) but in the Aesthetics cool sage-teal + taupe-gold
 * palette and Sarah's warm, confident, empowering voice.
 *
 * Reframes the EXISTING membership flexibility faithfully: the first month is
 * non-refundable, BUT that amount is credited toward your second procedure once
 * you join. No facts or pricing changed — presentation only.
 *
 * Background cleanup: the section is transparent so the membership page
 * glow-field (warm ivory/champagne) shows through; proof cards use a soft
 * translucent white. No teal fills remain — teal stays accent-only (icons,
 * rule, CTA). Server component, no required props.
 *
 * WCAG 2.2 AA verified with scripts/contrast.mjs. Worst case is the page's
 * warm champagne #fbfdfd the section/cards sit over:
 *   gold #706552 on champagne #fbfdfd = 4.87 · teal-text #406060 = 5.84
 *   label #695c4e on champagne = 5.52         · gold on card #fff = 5.72
 *   white on .btn-teal #4f7373 = 5.21
 */

const GOLD = "var(--gold)"; // #706552 — heading / eyebrow text
const TEAL_TEXT = "var(--teal-text)"; // #406060 — body / promise text
const LABEL = "var(--label)"; // #695c4e — muted supporting text
const ICON = "#3f6363"; // teal-deep — icon strokes (UI >=3:1)

type Pillar = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const PILLARS: Pillar[] = [
  {
    title: "Nothing is ever lost",
    desc: "Your first month is non-refundable — but every cent is held for you, credited in full toward your second procedure the moment you join.",
    icon: (
      // Coin / saved-value
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5v9M9.6 9.4h3.6a1.6 1.6 0 0 1 0 3.2H10.8a1.6 1.6 0 0 0 0 3.2h3.6" />
      </>
    ),
  },
  {
    title: "An investment in you",
    desc: "Think of it less as a fee and more as a head start — your contribution becomes Glow credit toward the treatments you already want.",
    icon: (
      // Sparkle / glow
      <>
        <path d="M12 3.5l1.9 4.6L18.5 10l-4.6 1.9L12 16.5l-1.9-4.6L5.5 10l4.6-1.9z" />
        <path d="M18.5 16.5l.7 1.7 1.8.7-1.8.7-.7 1.7-.7-1.7-1.8-.7 1.8-.7z" />
      </>
    ),
  },
  {
    title: "Confidence to begin",
    desc: "Join knowing your decision is protected. We want you to feel certain, cared for, and excited to make the most of your membership.",
    icon: (
      // Shield / protected
      <>
        <path d="M12 3l7 3v5c0 4.6-3.1 7.6-7 9-3.9-1.4-7-4.4-7-9V6z" />
        <path d="M9 12l2 2 4-4.5" />
      </>
    ),
  },
];

export default function GlowGuarantee() {
  return (
    <section
      aria-labelledby="glow-guarantee-heading"
      style={{
        background: "transparent",
        padding: "clamp(56px,9vw,104px) 0",
      }}
    >
      <div className="container">
        {/* ── Heading block ── */}
        <SectionHeading
          eyebrow="Our Promise to You"
          title="The Glow Guarantee"
          subtitle={
            <>
              Join with complete peace of mind. While your{" "}
              <strong style={{ color: GOLD, fontWeight: 600 }}>
                first month is non-refundable
              </strong>
              , we hold that amount as a credit toward your{" "}
              <strong style={{ color: GOLD, fontWeight: 600 }}>
                second procedure
              </strong>{" "}
              once you join the Glow Club — so every cent you invest works toward
              the results you came for.
            </>
          }
          id="glow-guarantee-heading"
        />

        {/* ── Proof pillars ── */}
        <ul
          className="mx-auto"
          style={{
            listStyle: "none",
            margin: "clamp(40px,6vw,64px) auto 0",
            padding: 0,
            maxWidth: "1000px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {PILLARS.map((p) => (
            <li
              key={p.title}
              className="card"
              style={{
                background: "rgba(255,255,255,0.78)",
                backdropFilter: "blur(2px)",
                borderRadius: "var(--radius-card)",
                padding: "32px 28px",
                textAlign: "center",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "52px",
                  height: "52px",
                  borderRadius: "999px",
                  background: "rgba(63,99,99,0.08)",
                  marginBottom: "18px",
                }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={ICON}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  focusable="false"
                >
                  {p.icon}
                </svg>
              </span>
              <h3
                className="font-serif"
                style={{
                  color: GOLD,
                  fontSize: "18px",
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                  lineHeight: 1.3,
                  marginBottom: "10px",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  color: "#7a6e52",
                  fontSize: "14.5px",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {p.desc}
              </p>
            </li>
          ))}
        </ul>

        {/* ── Sarah's reassurance + CTA ── */}
        <div
          className="mx-auto text-center"
          style={{ maxWidth: "640px", marginTop: "clamp(40px,6vw,60px)" }}
        >
          <p
            className="font-serif"
            style={{
              color: "#7a6e52",
              fontSize: "clamp(17px,1.7vw,20px)",
              fontStyle: "italic",
              lineHeight: 1.6,
              margin: "0 0 28px",
            }}
          >
            “Your confidence comes first — so we made sure that joining always
            works in your favour.”
            <span
              style={{
                display: "block",
                marginTop: "12px",
                fontStyle: "normal",
                fontSize: "12px",
                letterSpacing: "0.16em",
                color: LABEL,
              }}
            >
              Beautifully yours, Sarah
            </span>
          </p>

          <Link
            href="/membership/join"
            className="btn btn-teal"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            Join the Glow Club
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
