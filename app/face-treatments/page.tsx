import type { Metadata } from "next";
import { faceTreatments, FACE_LISTING } from "@/lib/face-treatments";
import { TreatmentCard, CtaBanner, SectionHeading } from "@/components/face/FaceUI";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Face Treatments | Carisma Aesthetics Malta",
  description: "Expert face treatments in Malta — Botox, dermal fillers, microneedling & chemical peels. Free consultation with medically qualified aesthetic practitioners.",
  // P1 SEO: canonical prevents duplicate-content issues
  alternates: {
    canonical: "https://www.carismaaesthetics.com/face-treatments",
  },
  openGraph: {
    title: "Face Treatments Malta | Carisma Aesthetics",
    description: "Expert face treatments in Malta — Botox, dermal fillers, microneedling & chemical peels. Free consultation with medically qualified aesthetic practitioners.",
    url: "https://www.carismaaesthetics.com/face-treatments",
    type: "website",
  },
};

export default function FaceTreatmentsPage() {
  return (
    // P1: <main> landmark is already present — good. Added skip link target id.
    <main id="main-content">
      {/* Listing hero — shared PageHero (one <h1>, primary keyword + "Malta") */}
      <PageHero
        badge="#1 Voted Med-Aesthetics Clinic"
        eyebrow={FACE_LISTING.eyebrow}
        headline={[
          { text: "Considered facial aesthetics" },
          { text: "in Malta", em: true },
        ]}
        sub={FACE_LISTING.subhead}
        primaryCta={{ text: "Book Free Consultation", href: "/consultation" }}
        media={{
          type: "image",
          src: "/assets/treatments/dermal-fillers-malta-hero.png",
          alt: "Face treatments at Carisma Aesthetics",
        }}
        proof={{
          rating: "4.9",
          reviews: "500+",
          statValue: "30+",
          statLabel: "years in wellness",
          awardText: "#1 Voted Clinic\nMalta Healthcare Awards",
        }}
      />

      {/* Treatment grid */}
      {/* P1: aria-labelledby ties section to its visible heading */}
      <section aria-labelledby="treatments-grid-heading" style={{ background: "var(--white)" }}>
        <div className="container" style={{ paddingTop: "72px", paddingBottom: "80px" }}>
          {/* P6: id prop on SectionHeading for aria-labelledby wiring */}
          <SectionHeading title={FACE_LISTING.gridHeading} id="treatments-grid-heading" />
          {/* P4: decorative underline accent — aria-hidden */}
          <div aria-hidden="true" style={{ width: "48px", height: "2px", background: "var(--teal)", margin: "14px auto 0" }} />
          {/* P10: each TreatmentCard is a full block-link with descriptive aria-label (set inside TreatmentCard) */}
          {/* P5: responsive grid cols: 1 → 2 → 3 */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "24px", marginTop: "48px", listStyle: "none", padding: 0 }}>
            {faceTreatments.map((t, i) => (
              // P1: <li> with <article>-equivalent semantics via the Link inside TreatmentCard
              <li key={t.slug}>
                <Reveal delay={(i % 3) * 80}>
                  <TreatmentCard t={t} variant="card" />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner
        heading="Not sure where to begin?"
        sub="Every plan starts with an honest, no-pressure consultation. We will assess your skin and goals and recommend only what will genuinely help."
        buttonLabel="Book a Consultation"
      />
    </main>
  );
}
