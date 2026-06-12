import type { Metadata } from "next";
import { faceTreatments, FACE_LISTING } from "@/lib/face-treatments";
import { TreatmentCard, CtaBanner, Eyebrow, SectionHeading } from "@/components/face/FaceUI";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Face Treatments | Carisma Aesthetics Malta",
  description: FACE_LISTING.subhead,
};

export default function FaceTreatmentsPage() {
  return (
    <main>
      {/* Listing hero / intro */}
      <section style={{ background: "var(--cream)" }}>
        <div className="container" style={{ paddingTop: "120px", paddingBottom: "72px", textAlign: "center" }}>
          <div style={{ maxWidth: "780px", marginInline: "auto" }}>
            <Eyebrow center>{FACE_LISTING.eyebrow}</Eyebrow>
            <h1 className="font-display" style={{ fontSize: "clamp(30px,4.2vw,44px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.2, color: "var(--ink)" }}>
              {FACE_LISTING.title}
            </h1>
            <p style={{ fontSize: "clamp(14px,1vw,16px)", color: "var(--ink-soft)", lineHeight: 1.8, marginTop: "20px" }}>{FACE_LISTING.subhead}</p>
          </div>
        </div>
      </section>

      {/* Treatment grid */}
      <section style={{ background: "var(--white)" }}>
        <div className="container" style={{ paddingTop: "96px", paddingBottom: "96px" }}>
          <SectionHeading title={FACE_LISTING.gridHeading} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "28px", marginTop: "44px" }}>
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
