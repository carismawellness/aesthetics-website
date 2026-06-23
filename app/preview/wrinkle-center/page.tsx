import type { Metadata } from "next";
import CenterHero from "@/components/treatment/CenterHero";
import BeforeAfterCarousel from "@/components/BeforeAfterCarousel";
import SuitabilityCards from "@/components/treatment/SuitabilityCards";
import RecommendedCards from "@/components/treatment/RecommendedCards";
import TreatmentFaq from "@/components/treatment/TreatmentFaq";
import t from "@/lib/treatments/wrinkle-relaxing-malta";

// Default Carisma Aesthetics Fresha booking page (all services). The primary
// hero CTA opens this in a new tab; the secondary CTA opens the site-wide
// ConsultationModal via the internal /consultation route.
const AESTHETICS_FRESHA_BOOK =
  "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2800348&share=true&pId=2708191";

// Internal preview of the CENTER-ALIGNED hero variant — NOT indexed, not linked
// anywhere. Lets the owner compare the centred hero against the live left-right
// <PageHero>, with the real downstream sections beneath it for scroll/flow.
export const metadata: Metadata = {
  title: "Preview — Center Hero",
  robots: { index: false, follow: false },
};

export default function WrinkleCenterHeroPreview() {
  return (
    <main>
      {/* Center-aligned above-the-fold — the page's single <h1> is the title. */}
      <CenterHero
        badge="#1 Voted Med-Aesthetics Clinic"
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        body={t.hero.body}
        prices={t.hero.prices}
        info={t.info}
        image={t.hero.image}
        ctaPrimary={{
          text: t.hero.cta ?? "Book Your Appointment",
          href: t.hero.bookHref ?? AESTHETICS_FRESHA_BOOK,
        }}
        ctaSecondary={{ text: "Free Consultation", href: "/consultation" }}
      />

      {/* Downstream shared sections, fed from the SAME wrinkle data, so the
          owner can judge scroll/flow below the fold. Each is skipped when its
          data is absent. */}
      {t.beforeAfter && t.beforeAfter.length > 0 && (
        <section aria-label="Before and after results" style={{ padding: "70px 0" }}>
          <BeforeAfterCarousel pairs={t.beforeAfter} title={t.beforeAfterTitle} />
        </section>
      )}

      {t.suitability && (
        <SuitabilityCards
          kicker="Is this treatment for you?"
          title={t.suitability.title}
          sub={t.suitability.intro}
          suitableFor={t.suitability.suitableFor ?? []}
          notIdeal={t.suitability.notIdeal ?? []}
        />
      )}

      {t.recommended && (
        <RecommendedCards title={t.recommended.title} items={t.recommended.items} />
      )}

      {t.faq?.length ? (
        <TreatmentFaq kicker={t.faqKicker} title={t.faqTitle} items={t.faq} />
      ) : null}
    </main>
  );
}
