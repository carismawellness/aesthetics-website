import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import { giftFaqs } from "./giftFaqData";

// Gift-card FAQ section. Server component (no 'use client') — the interactive
// accordion lives inside FaqAccordion, which is its own client island. Copy is
// fed from the shared plain module so the page can reuse it for FAQPage JSON-LD.
export default function GiftFaq() {
  return (
    <section
      aria-labelledby="gift-faq-heading"
      style={{ padding: "20px 0 96px" }}
    >
      <div className="container">
        <Reveal>
          <p
            className="font-display text-center"
            style={{
              fontSize: "clamp(12px,1.6vw,14px)",
              color: "var(--teal-text)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Good to Know
          </p>

          <h2
            id="gift-faq-heading"
            className="font-serif text-center"
            style={{
              fontSize: "clamp(26px,3.4vw,38px)",
              color: "var(--gold)",
              lineHeight: 1.2,
              fontWeight: 400,
            }}
          >
            Frequently Asked Questions About Our Gift Cards
          </h2>

          <p
            className="mx-auto text-center"
            style={{
              maxWidth: "560px",
              marginTop: "16px",
              fontSize: "15px",
              color: "var(--muted)",
              lineHeight: 1.7,
            }}
          >
            Everything you need to give a Carisma Aesthetics gift with complete
            confidence — delivery, validity, and how it's redeemed.
          </p>
        </Reveal>

        <Reveal delay={90} style={{ marginTop: "44px" }}>
          <FaqAccordion items={giftFaqs} uppercase={false} />
        </Reveal>
      </div>
    </section>
  );
}
