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
};

export default function FaceTreatmentsPage() {
  return (
    <main>
      {/* Listing hero — split layout: text left, image right (matches live site treatment page pattern) */}
      <section style={{ background: "var(--cream)", overflow: "hidden" }}>
        <div className="container" style={{ paddingTop: "0", paddingBottom: "0" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: "420px", alignItems: "stretch" }}>
            {/* Left: copy */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "80px", paddingBottom: "80px", paddingRight: "clamp(0px,4vw,60px)" }}>
              <Eyebrow>{FACE_LISTING.eyebrow}</Eyebrow>
              <h1 className="font-display" style={{ fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.2, color: "var(--ink)", marginBottom: "0" }}>
                {FACE_LISTING.title}
              </h1>
              {/* Teal divider — site-wide decorative separator */}
              <div style={{ width: "200px", height: "1.5px", background: "var(--teal)", margin: "18px 0" }} />
              <p style={{ fontSize: "clamp(14px,1vw,15px)", color: "var(--ink-soft)", lineHeight: 1.85, maxWidth: "520px" }}>{FACE_LISTING.subhead}</p>
              <div style={{ marginTop: "28px" }}>
                <BookingButtons consultLabel="Free Consultation" align="left" />
              </div>
            </div>
            {/* Right: hero image mosaic */}
            <div className="hidden lg:grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "4px", position: "relative" }}>
              <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden" }}>
                <Image src="/assets/treatments/dermal-fillers-malta-hero.png" alt="Dermal Fillers" fill sizes="25vw" style={{ objectFit: "cover" }} />
              </div>
              <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden" }}>
                <Image src="/assets/treatments/lip-fillers-malta-hero.png" alt="Lip Fillers" fill sizes="25vw" style={{ objectFit: "cover" }} />
              </div>
              <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden" }}>
                <Image src="/assets/treatments/microneedling-malta-hero.png" alt="Microneedling" fill sizes="25vw" style={{ objectFit: "cover" }} />
              </div>
              <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden" }}>
                <Image src="/assets/treatments/chemical-peels-malta-hero.png" alt="Chemical Peels" fill sizes="25vw" style={{ objectFit: "cover" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment grid */}
      <section style={{ background: "var(--white)" }}>
        <div className="container" style={{ paddingTop: "72px", paddingBottom: "80px" }}>
          <SectionHeading title={FACE_LISTING.gridHeading} />
          {/* Teal underline accent */}
          <div style={{ width: "48px", height: "2px", background: "var(--teal)", margin: "14px auto 0" }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "24px", marginTop: "48px" }}>
            {faceTreatments.map((t, i) => (
              <Reveal key={t.slug} delay={(i % 3) * 80}>
                <TreatmentCard t={t} variant="card" />
              </Reveal>
            ))}
          </div>
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
