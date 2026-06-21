import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { faceTreatments, FACE_LISTING } from "@/lib/face-treatments";
import { TreatmentCard, CtaBanner, Eyebrow, SectionHeading } from "@/components/face/FaceUI";
import Reveal from "@/components/Reveal";
import BookingButtons from "@/components/BookingButtons";

export const metadata: Metadata = {
  title: "Face Treatments | Carisma Aesthetics Malta",
  description: FACE_LISTING.subhead,
  // P1 SEO: canonical prevents duplicate-content issues
  alternates: {
    canonical: "https://www.carismaaesthetics.com/face-treatments",
  },
};

export default function FaceTreatmentsPage() {
  return (
    // P1: <main> landmark is already present — good. Added skip link target id.
    <main id="main-content">
      {/* Listing hero — split layout: text left, image right (matches live site treatment page pattern) */}
      {/* P1: aria-labelledby ties the section to the H1 */}
      <section aria-labelledby="face-listing-title" style={{ background: "var(--cream)", overflow: "hidden" }}>
        <div className="container" style={{ paddingTop: "0", paddingBottom: "0" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: "420px", alignItems: "stretch" }}>
            {/* Left: copy */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "80px", paddingBottom: "80px", paddingRight: "clamp(0px,4vw,60px)" }}>
              <Eyebrow>{FACE_LISTING.eyebrow}</Eyebrow>
              {/* P6: single H1 per page; id matches aria-labelledby on section */}
              <h1 id="face-listing-title" className="font-display" style={{ fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.2, color: "var(--ink)", marginBottom: "0" }}>
                {FACE_LISTING.title}
              </h1>
              {/* P4: decorative teal divider — aria-hidden so AT skips it */}
              <div aria-hidden="true" style={{ width: "200px", height: "1.5px", background: "var(--teal)", margin: "18px 0" }} />
              <p style={{ fontSize: "clamp(14px,1vw,15px)", color: "var(--ink-soft)", lineHeight: 1.85, maxWidth: "520px" }}>{FACE_LISTING.subhead}</p>
              <div style={{ marginTop: "28px" }}>
                <BookingButtons consultLabel="Free Consultation" align="left" />
              </div>
            </div>
            {/* Right: hero image mosaic — decorative, alt text is descriptive of treatment shown */}
            <div className="hidden lg:grid" aria-hidden="true" style={{ gridTemplateColumns: "1fr 1fr", gap: "4px", position: "relative" }}>
              {/* P3: all images use next/image with fill + sized parent (aspectRatio on wrapper) — already correct */}
              {/* P1: because the entire mosaic is aria-hidden (decorative collage), alt="" is appropriate here */}
              <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden" }}>
                <Image src="/assets/treatments/dermal-fillers-malta-hero.png" alt="" fill sizes="25vw" style={{ objectFit: "cover" }} />
              </div>
              <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden" }}>
                <Image src="/assets/treatments/lip-fillers-malta-hero.png" alt="" fill sizes="25vw" style={{ objectFit: "cover" }} />
              </div>
              <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden" }}>
                <Image src="/assets/treatments/microneedling-malta-hero.png" alt="" fill sizes="25vw" style={{ objectFit: "cover" }} />
              </div>
              <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden" }}>
                <Image src="/assets/treatments/chemical-peels-malta-hero.png" alt="" fill sizes="25vw" style={{ objectFit: "cover" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

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
