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
          <div className="relative" style={{ backgroundColor: "var(--beige)", padding: "52px clamp(28px,5vw,60px)", overflow: "hidden" }}>
            {/* faint wave across the band */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/wave-gold.png" alt="" aria-hidden style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: "auto", opacity: 0.45, pointerEvents: "none" }} />
            <h2
              className="relative font-display"
              style={{ zIndex: 1, fontSize: "clamp(28px,4vw,44px)", color: "var(--gold)", textTransform: "uppercase", fontWeight: 300, letterSpacing: "0.04em", lineHeight: 1.15 }}
            >
              Book Your<br />Consultation
            </h2>
          </div>
        </Reveal>

        {/* Grey-teal form panel — narrower, centered, overlapping up into the beige */}
        <Reveal delay={120} className="relative mx-auto" style={{ maxWidth: "780px", marginTop: "-28px", zIndex: 1 }}>
          <div style={{ background: "#e6eded", borderRadius: "24px", padding: "clamp(28px,4vw,40px)", boxShadow: "0 18px 45px rgba(0,0,0,0.06)" }}>
            <ConsultationForm stacked submitLabel="Submit" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
