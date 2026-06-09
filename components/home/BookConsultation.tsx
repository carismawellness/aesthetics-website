import ConsultationForm from "@/components/ConsultationForm";
import Reveal from "@/components/Reveal";

export default function BookConsultation() {
  return (
    <section style={{ backgroundColor: "var(--beige)", padding: "20px 0 80px" }}>
      <div className="container">
        <Reveal className="grid gap-10 lg:grid-cols-2 items-center">
          {/* Heading + decorative wave (left) */}
          <div>
            <h2 className="font-display" style={{ fontSize: "clamp(28px,4.4vw,44px)", color: "var(--ink)", letterSpacing: "0.06em", lineHeight: 1.2 }}>
              Book Your<br />Consultation
            </h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/wave-gold.png" alt="" aria-hidden style={{ width: "260px", maxWidth: "80%", height: "auto", marginTop: "24px" }} />
            <p style={{ marginTop: "20px", color: "var(--ink-soft)", fontSize: "15px", lineHeight: 1.8, maxWidth: "420px" }}>
              Every consultation begins with listening to your story, then shaping a conservative, personalised plan with one of our medically qualified doctors.
            </p>
          </div>

          {/* Form (right) */}
          <div className="bg-white rounded-lg" style={{ padding: "clamp(24px,4vw,40px)", boxShadow: "0 20px 50px rgba(0,0,0,0.06)" }}>
            <ConsultationForm submitLabel="book your Consultation" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
