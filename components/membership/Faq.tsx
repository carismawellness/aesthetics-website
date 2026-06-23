import Link from "next/link";
import FaqAccordion from "../FaqAccordion";
import { MEMBERSHIP_FAQS } from "./faqData";

/**
 * MembershipFaq — the "Frequently asked questions" CRO section for the Carisma
 * Aesthetics membership (Glow Club) page rebuild.
 *
 * Mirrors the Carisma Slimming home FAQ CRO pattern (eyebrow pill → serif
 * heading → reassuring intro → accordion → objection-killing CTA) but in the
 * Aesthetics cool sage-teal + taupe-gold palette and Sarah's warm, confident,
 * empowering voice. The closing block answers the silent objection ("still not
 * sure?") and drives the single primary CTA — Join the Glow Club.
 *
 * Server component, no required props — all content baked in. The accordion
 * itself (FaqAccordion) is the existing "use client" island reused here; the FAQ
 * copy lives in the plain ./faqData module so the page can build matching
 * FAQPage JSON-LD from the SAME array (no schema/visible-content drift).
 *
 * Background cleanup: the section is transparent so the membership page
 * glow-field (warm ivory/champagne) shows through; the accordion sits on a soft
 * translucent white card. No teal fills remain — teal stays accent-only.
 *
 * WCAG 2.2 AA verified with scripts/contrast.mjs. Worst case is the page's warm
 * champagne #f3ece0 the header/CTA sit over:
 *   gold #706552 on champagne #f3ece0 = 4.87 · teal-text #406060 = 5.84
 *   label #695c4e on champagne = 5.52         · teal-deep #3f6363 rule (UI) ✓
 *   accordion teal-text #406060 / brown #706552 on white card = 8.0 / 5.72
 *   white on .btn-teal #4f7373 = 5.21
 */

const GOLD = "var(--gold)"; // #706552 — heading / eyebrow text
const TEAL_TEXT = "var(--teal-text)"; // #406060 — body / intro text
const LABEL = "var(--label)"; // #695c4e — muted supporting text
const ICON = "#3f6363"; // teal-deep — divider rule + icon strokes (UI >=3:1)

export default function MembershipFaq() {
  return (
    <section
      aria-labelledby="membership-faq-heading"
      style={{
        background: "transparent",
        padding: "clamp(56px,9vw,104px) 0",
      }}
    >
      <div className="container">
        {/* ── Heading block ── */}
        <div className="mx-auto text-center" style={{ maxWidth: "720px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 18px",
              borderRadius: "999px",
              border: `1px solid ${GOLD}`,
              background: "rgba(112,101,82,0.06)",
              color: GOLD,
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke={GOLD}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M9.4 9.2a2.6 2.6 0 1 1 3.4 3.1c-.6.3-1 .8-1 1.5v.4" />
              <circle cx="11.8" cy="17.4" r="0.6" fill={GOLD} stroke="none" />
            </svg>
            Glow Club Questions
          </span>

          <h2
            id="membership-faq-heading"
            className="font-serif"
            style={{
              color: GOLD,
              fontSize: "clamp(24px,3.4vw,38px)",
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: "0.04em",
              margin: "22px 0 0",
            }}
          >
            Frequently asked questions
          </h2>

          <div
            aria-hidden="true"
            className="mx-auto"
            style={{
              width: "70px",
              height: "1px",
              background: ICON,
              opacity: 0.5,
              margin: "16px auto 0",
            }}
          />

          <p
            style={{
              color: TEAL_TEXT,
              fontSize: "clamp(16px,1.6vw,18px)",
              lineHeight: 1.7,
              margin: "22px auto 0",
              maxWidth: "560px",
            }}
          >
            Everything you need to feel certain before you join — how the savings
            work, what your discounts cover, and the freedom you keep every step
            of the way.
          </p>
        </div>

        {/* ── Accordion (reuses the existing FaqAccordion client island) ── */}
        <div
          className="card mx-auto"
          style={{
            background: "rgba(255,255,255,0.80)",
            backdropFilter: "blur(2px)",
            borderRadius: "var(--radius-card)",
            padding: "clamp(20px,4vw,40px) clamp(18px,4vw,44px)",
            margin: "clamp(36px,6vw,56px) auto 0",
            maxWidth: "1000px",
          }}
        >
          <FaqAccordion items={MEMBERSHIP_FAQS} uppercase={false} />
        </div>

        {/* ── Objection-killing reassurance + primary CTA ── */}
        <div
          className="mx-auto text-center"
          style={{ maxWidth: "640px", marginTop: "clamp(40px,6vw,60px)" }}
        >
          <p
            className="font-serif"
            style={{
              color: TEAL_TEXT,
              fontSize: "clamp(17px,1.7vw,20px)",
              fontStyle: "italic",
              lineHeight: 1.6,
              margin: "0 0 10px",
            }}
          >
            “Still have a question? You can join today and cancel any time after
            your first month — there is nothing to lose and a beautiful glow to
            gain.”
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

          <p
            style={{
              color: LABEL,
              fontSize: "14px",
              lineHeight: 1.7,
              margin: "0 0 28px",
            }}
          >
            Prefer to talk it through? Email us at{" "}
            <a
              href="mailto:info@carismaaesthetics.com"
              style={{ color: TEAL_TEXT, fontWeight: 600 }}
            >
              info@carismaaesthetics.com
            </a>{" "}
            and we'll happily help.
          </p>

          <Link
            href="/membership/join"
            className="btn btn-teal"
            style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}
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
