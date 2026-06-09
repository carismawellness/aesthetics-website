import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Condition | Carisma Aesthetics",
};

const SECTIONS = [
  { h: "Services", p: "We offer Botox, Dermal Fillers, Lip Fillers, Collagen Stimulator, Fat Dissolving, Mesotherapy, PRP, Thread Lift, Microneedling, Chemical Peel, and MFU services." },
  { h: "Medical Consultation", p: "Patients must undergo a medical consultation prior to receiving any med-aesthetic service." },
  { h: "Treatment Risks and Benefits", p: "Patients must understand the risks and benefits of the med-aesthetic services before consenting to treatment." },
  { h: "Payment", p: "Payment for med-aesthetic services is due at the time of service. We accept cash and major credit cards." },
  { h: "Cancellation and Refunds", p: "Patients must provide at least 24 hours' notice to cancel or reschedule an appointment." },
  { h: "Medical Emergencies", p: "In the event of a medical emergency, patients should seek immediate medical attention by calling the local emergency services." },
  { h: "Patient Conduct", p: "Patients must conduct themselves in a respectful and professional manner during their visit." },
];

export default function TermsConditions() {
  return (
    <section style={{ padding: "70px 0" }}>
      <div className="container" style={{ maxWidth: "820px" }}>
        <h1 className="font-display" style={{ fontSize: "clamp(26px,4vw,38px)", color: "var(--ink)", marginBottom: "32px" }}>terms &amp; condition</h1>
        {SECTIONS.map((s) => (
          <div key={s.h} style={{ marginBottom: "30px" }}>
            <h2 className="font-display" style={{ fontSize: "16px", color: "var(--ink)", letterSpacing: "0.08em", marginBottom: "12px" }}>{s.h}</h2>
            <p style={{ fontSize: "15.5px", color: "var(--muted)", lineHeight: 1.8 }}>{s.p}</p>
          </div>
        ))}
        <p style={{ fontSize: "13px", color: "var(--muted)", fontStyle: "italic", marginTop: "20px" }}>
          {/* QA flag */}Additional sections — Confidentiality, Liability, Termination of Services, Governing Law, Updates, and GDPR Compliance — to be added verbatim from the live site.
        </p>
      </div>
    </section>
  );
}
