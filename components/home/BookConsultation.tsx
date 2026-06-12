import ConsultationForm from "@/components/ConsultationForm";
import Reveal from "@/components/Reveal";

export default function BookConsultation() {
  return (
    // White section: a CONTAINED beige heading block, with the grey form
    // panel narrower + centered below, overlapping the beige's bottom edge.
    <section style={{ backgroundColor: "var(--white)", padding: "48px 0 80px" }}>
      <div className="container">
        {/* Beige heading block (contained, not full-width) */}
        <Reveal className="mx-auto" style={{ maxWidth: "960px" }}>
          <div className="relative" style={{ backgroundColor: "var(--beige)", padding: "48px clamp(28px,5vw,56px) 96px", overflow: "hidden" }}>
            {/* live wave graphic across the band */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/treatments/home-book-wave.png" alt="" aria-hidden style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: "auto", pointerEvents: "none" }} />
            <h2
              className="relative font-display"
              style={{ zIndex: 1, fontSize: "clamp(28px,3.6vw,40px)", color: "var(--gold)", textTransform: "uppercase", fontWeight: 300, letterSpacing: "0.04em", lineHeight: 1.4 }}
            >
              book your<br />Consultation
            </h2>
          </div>
        </Reveal>

        {/* GHL form — full width, no background panel */}
        <Reveal delay={120} className="relative mx-auto" style={{ maxWidth: "1120px", marginTop: "-12px", zIndex: 1 }}>
          <ConsultationForm stacked submitLabel="Submit" />
        </Reveal>
      </div>
    </section>
  );
}
