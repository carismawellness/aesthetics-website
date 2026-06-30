import Link from "next/link";
import FaqAccordion from "../FaqAccordion";
import SectionHeading from "@/components/SectionHeading";
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
 * champagne #fbfdfd the header/CTA sit over:
 *   gold #706552 on champagne #fbfdfd = 4.87 · teal-text #406060 = 5.84
 *   label #695c4e on champagne = 5.52         · teal-deep #3f6363 rule (UI) ✓
 *   accordion teal-text #406060 / brown #706552 on white card = 8.0 / 5.72
 *   white on .btn-teal #4f7373 = 5.21
 */

const TEAL_TEXT = "var(--teal-text)"; // #406060 — body / intro text
const LABEL = "var(--label)"; // #695c4e — muted supporting text

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
        <SectionHeading
          eyebrow="Glow Club Questions"
          title="Frequently asked questions"
          subtitle="Everything you need to feel certain before you join — how the savings work, what your discounts cover, and the freedom you keep every step of the way."
          id="membership-faq-heading"
        />

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
              color: "#7a6e52",
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
              color: "#7a6e52",
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
