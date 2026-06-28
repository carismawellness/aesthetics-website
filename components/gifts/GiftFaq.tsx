import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
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
          <SectionHeading
            id="gift-faq-heading"
            eyebrow="Good to Know"
            title="Gifting questions, answered"
            subtitle="Everything you need to give a Carisma Aesthetics gift with complete confidence — delivery, validity, and how it's redeemed."
            subtitleMaxWidth={560}
          />
        </Reveal>

        <Reveal delay={90} style={{ marginTop: "44px" }}>
          <FaqAccordion items={giftFaqs} uppercase={false} />
        </Reveal>
      </div>
    </section>
  );
}
