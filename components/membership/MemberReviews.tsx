import Link from "next/link";
import Reveal from "@/components/Reveal";

/* ─────────────────────────────────────────────────────────────────────────
   MemberReviews — Glow Club social-proof section
   Self-contained CRO block: aggregate trust bar + real member testimonials.

   Brand: Carisma Aesthetics ("Glow with Confidence"). Cool sage-teal + taupe-gold.
   All copy/testimonials extracted faithfully from components/MembershipPage.tsx
   (REAL PEOPLE REAL REVIEWS, ~lines 229–251).

   Background cleanup: the section is transparent (was #f4f4f2) so the
   membership page glow-field (warm ivory/champagne) shows through; cards stay
   white. The sage avatar chip stays as a small accent (allowed). No teal fill.

   WCAG 2.2 AA — every text/UI pair verified with scripts/contrast.mjs. Header/
   intro now sit on the page field; worst case is champagne #f3ece0:
     • #695c4e (label)        on #ffffff = 6.48:1 ✓   on #f3ece0 = 5.52:1 ✓
     • #406060 (teal-text)    on #ffffff = 6.86:1 ✓   on #f3ece0 = 5.84:1 ✓
     • #706552 (gold)         on #ffffff = 5.72:1 ✓   on #f3ece0 = 4.87:1 ✓
     • #0c0b0b (ink)          on #ffffff = 19.66 ✓     on #f3ece0 = 17+  ✓
     • #ffffff (white)        on #527979 (avatar) = 4.81:1 ✓   on teal CTA = 5.21:1 ✓
     • #9c8344 (gold-deep star, graphic/UI) on #ffffff = 3.66:1 ✓ (>3 UI)
   ───────────────────────────────────────────────────────────────────────── */

const SECTION_BG = "transparent"; // was #f4f4f2 — now transparent so the page glow-field shows through
const TEAL_TEXT = "var(--teal-text)"; // #406060
const SAGE_SOLID = "#527979"; // accessible avatar fill — white text 4.81:1
const STAR = "#9c8344"; // gold-deep — graphic accent, 3.66:1 on white (>3 UI)

const TESTIMONIALS = [
  {
    initials: "SM",
    name: "Sofia M.",
    tier: "Elite Member",
    quote:
      "The Glow Club completely changed how I approach self-care. The savings add up month after month and the priority booking alone is worth every cent.",
  },
  {
    initials: "RT",
    name: "Rachel T.",
    tier: "Platinum Member",
    quote:
      "I love that my balance rolls over and never expires. I saved up for my filler appointment and paid less than I ever had before. Absolutely recommend.",
  },
  {
    initials: "LB",
    name: "Laura B.",
    tier: "Signature Member",
    quote:
      "The referral spa day was an incredible bonus. I recommended two friends and felt like royalty during my complimentary day. Such a thoughtful touch.",
  },
];

function Stars() {
  // 5 gold-deep stars; aria-label carries the rating as a non-colour cue.
  return (
    <div
      className="flex"
      role="img"
      aria-label="Rated 5 out of 5 stars"
      style={{ gap: "3px", margin: "12px 0" }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={STAR}
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
        </svg>
      ))}
    </div>
  );
}

export default function MemberReviews() {
  return (
    <section
      aria-labelledby="member-reviews-heading"
      style={{ background: SECTION_BG, padding: "84px 0" }}
    >
      <div className="container">
        {/* ── eyebrow + heading ── */}
        <Reveal>
          <div className="text-center" style={{ maxWidth: "640px", margin: "0 auto" }}>
            <p
              className="font-display"
              style={{
                fontSize: "12px",
                color: TEAL_TEXT,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                margin: "0 0 14px",
                fontWeight: 700,
              }}
            >
              Loved by our members
            </p>
            <h2
              id="member-reviews-heading"
              className="font-serif"
              style={{
                fontSize: "clamp(26px,4vw,40px)",
                color: "var(--ink)",
                lineHeight: 1.25,
                margin: 0,
              }}
            >
              Real people, real glow
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "var(--label)",
                lineHeight: 1.7,
                margin: "16px auto 0",
                maxWidth: "520px",
              }}
            >
              Hundreds of women in Malta are already glowing for less every month
              with the Glow Club. Here is what membership feels like in their words.
            </p>
          </div>
        </Reveal>

        {/* ── aggregate trust bar (CRO proof signal) ── */}
        <Reveal delay={60}>
          <div
            className="flex flex-wrap items-center justify-center"
            style={{
              gap: "clamp(20px,5vw,56px)",
              margin: "36px auto 8px",
              maxWidth: "760px",
            }}
            aria-label="Membership at a glance"
          >
            {[
              { stat: "4.9", label: "Average member rating" },
              { stat: "10%", label: "Off every service, always" },
              { stat: "15%", label: "Off all skincare products" },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center" style={{ gap: "clamp(20px,5vw,56px)" }}>
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    style={{
                      width: "1px",
                      height: "40px",
                      background: "#d8d4cd",
                    }}
                  />
                )}
                <div className="text-center">
                  <span
                    className="font-serif block"
                    style={{
                      fontSize: "clamp(28px,4vw,38px)",
                      color: "var(--gold)",
                      lineHeight: 1,
                    }}
                  >
                    {item.stat}
                  </span>
                  <span
                    className="font-display block"
                    style={{
                      fontSize: "11px",
                      color: TEAL_TEXT,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginTop: "8px",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── testimonial cards ── */}
        <ul
          className="grid gap-8 md:grid-cols-3 mx-auto"
          style={{
            maxWidth: "1040px",
            marginTop: "48px",
            listStyle: "none",
            padding: 0,
          }}
          aria-label="Member testimonials"
        >
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <li style={{ height: "100%" }}>
                <article
                  className="card review-card"
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    padding: "32px 28px",
                    border: "1px solid #ece9e4",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                  aria-label={`Review by ${t.name}, ${t.tier}`}
                >
                  {/* avatar */}
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "8px",
                      background: SAGE_SOLID,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "4px",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    <span
                      className="font-display"
                      style={{
                        fontSize: "16px",
                        color: "#fff",
                        letterSpacing: "0.08em",
                        fontWeight: 700,
                      }}
                    >
                      {t.initials}
                    </span>
                  </div>

                  <Stars />

                  <blockquote
                    style={{
                      fontSize: "14px",
                      color: "var(--label)",
                      lineHeight: 1.8,
                      fontStyle: "italic",
                      flex: 1,
                      margin: "0 0 20px",
                      padding: 0,
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <footer style={{ marginTop: "auto" }}>
                    <p
                      className="font-display"
                      style={{
                        fontSize: "13px",
                        color: "var(--ink)",
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="font-display"
                      style={{
                        fontSize: "10px",
                        color: TEAL_TEXT,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        marginTop: "3px",
                      }}
                    >
                      {t.tier}
                    </p>
                  </footer>
                </article>
              </li>
            </Reveal>
          ))}
        </ul>

        {/* ── closing CTA ── */}
        <Reveal delay={120}>
          <div className="text-center" style={{ marginTop: "52px" }}>
            <p
              style={{
                fontSize: "15px",
                color: "var(--label)",
                lineHeight: 1.7,
                margin: "0 auto 22px",
                maxWidth: "440px",
              }}
            >
              Your glow story starts the moment you join — discounts, priority
              booking and a complimentary yearly consultation, every year.
            </p>
            <Link
              href="/membership/join"
              className="btn btn-teal"
              aria-label="Join the Glow Club"
            >
              Join the Glow Club
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
