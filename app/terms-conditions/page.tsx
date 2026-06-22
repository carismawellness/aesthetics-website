import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Carisma Aesthetics",
  description:
    "At our med-aesthetic clinic, we are committed to protecting the privacy & security of our patients' personal data. We comply with the General Data Protection Regulation (GDPR) & any applicable data protection laws.",
  alternates: { canonical: "https://www.carismaaesthetics.com/terms-conditions" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Terms & Conditions | Carisma Aesthetics",
    description:
      "At our med-aesthetic clinic, we are committed to protecting the privacy & security of our patients' personal data. We comply with the General Data Protection Regulation (GDPR) & any applicable data protection laws.",
    url: "https://www.carismaaesthetics.com/terms-conditions",
    siteName: "Carisma Aesthetics",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | Carisma Aesthetics",
    description:
      "At our med-aesthetic clinic, we are committed to protecting the privacy & security of our patients' personal data. We comply with the General Data Protection Regulation (GDPR) & any applicable data protection laws.",
  },
};

/* Verbatim live copy — carismaaesthetics.com/terms-conditions */
const TERMS_SECTIONS = [
  {
    h: "Services",
    p: "We offer Botox, Dermal Fillers, Lip Fillers, Collagen Stimulator, Fat Dissolving, Mesotherapy, PRP, Thread Lift, Microneedling, Chemical Peel, and MFU services.",
  },
  {
    h: "Medical Consultation",
    p: "Patients must undergo a medical consultation prior to receiving any med-aesthetic service. The medical consultation may include a review of medical history, physical examination, and/or laboratory tests.",
  },
  {
    h: "Treatment Risks and Benefits",
    p: "Patients must understand the risks and benefits of the med-aesthetic services before consenting to treatment. We will provide information on the potential risks, benefits, and alternatives to the proposed treatment.",
  },
  {
    h: "Payment",
    p: "Payment for med-aesthetic services is due at the time of service. We accept cash and major credit cards.",
  },
  {
    h: "Cancellation and Refunds",
    p: "Patients must provide at least 24 hours' notice to cancel or reschedule an appointment. We may charge a cancellation fee for late cancellations, no-shows or non-emergency appointment changes. Refunds for med-aesthetic services are not provided, except as required by law.",
  },
  {
    h: "Medical Emergencies",
    p: "In the event of a medical emergency, patients should seek immediate medical attention by calling the local emergency services. Our clinic may provide basic first aid or arrange for emergency transportation as necessary.",
  },
  {
    h: "Patient Conduct",
    p: "Patients must conduct themselves in a respectful and professional manner during their visit to our clinic. Any disruptive or inappropriate behavior may result in termination of services and/or legal action.",
  },
  {
    h: "Confidentiality",
    p: "We maintain the confidentiality of all patient information, except as required by law or with the patient's explicit consent.",
  },
  {
    h: "Liability",
    p: "Our clinic is not liable for any injuries, damages, or losses resulting from the med-aesthetic services provided, except as required by law.",
  },
  {
    h: "Termination of Services",
    p: "We reserve the right to refuse or terminate services to any patient for any reason, including but not limited to non-payment, disruptive behavior, or failure to follow clinic policies and procedures.",
  },
  {
    h: "Governing Law",
    p: "These terms and conditions are governed by the laws of Malta. Any disputes arising from these terms and conditions will be resolved in the courts of Malta.",
  },
  {
    h: "Updates",
    p: "We may update these terms and conditions from time to time. Patients will be notified of any changes via our website.",
  },
];

/* GDPR block — separated from the terms list by a horizontal rule on live */
const GDPR_SECTIONS = [
  {
    h: "Personal Data Collected",
    p: "We collect personal data such as name, contact information, and medical history for the purpose of providing med-aesthetic services to our patients. We may also collect data such as photographs and video footage for treatment monitoring and documentation.",
  },
  {
    h: "Data Processing",
    p: "We process personal data only for the purpose of providing med-aesthetic services, complying with legal obligations, and improving our services. We may also process data for research and statistical analysis purposes, but only with the patient's explicit consent.",
  },
  {
    h: "Data Storage and Protection",
    p: "We store personal data securely and only for as long as necessary. We implement appropriate technical and organizational measures to protect personal data from unauthorized access, disclosure, alteration, or destruction.",
  },
  {
    h: "Clients Right",
    p: "Clients have the right to access, correct, or delete their personal data, restrict or object to data processing, and request data portability. Patients also have the right to lodge a complaint with the supervisory authority.",
  },
];

const bodyStyle: React.CSSProperties = {
  fontSize: "16px",
  color: "var(--label)",
  lineHeight: 1.5,
  margin: "0 0 20px",
};

const headingStyle: React.CSSProperties = {
  fontFamily: '"Roboto Local", Roboto, sans-serif',
  fontSize: "22px",
  fontWeight: 300,
  color: "var(--gold)",
  textTransform: "uppercase",
  letterSpacing: "0.02em",
  lineHeight: 1.35,
  margin: "0 0 16px",
};

function Block({ h, p }: { h: string; p: string }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h2 style={headingStyle}>{h}</h2>
      <p style={bodyStyle}>{p}</p>
    </div>
  );
}

export default function TermsConditions() {
  return (
    <section style={{ padding: "56px 0 150px" }}>
      <div className="container" style={{ maxWidth: "960px" }}>
        <div style={{ textAlign: "center", marginBottom: "54px" }}>
          <h1
            className="font-serif"
            style={{
              display: "inline-block",
              fontSize: "clamp(30px,4vw,42px)",
              fontWeight: 400,
              color: "var(--gold)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              lineHeight: 1.2,
              paddingBottom: "14px",
              borderBottom: "1px solid var(--gold)",
            }}
          >
            Terms &amp; Conditions
          </h1>
        </div>

        <p style={bodyStyle}>
          Welcome to our med-aesthetic clinic in Malta. By accessing and using our services, you agree to comply with these terms and conditions.
        </p>

        {TERMS_SECTIONS.map((s) => (
          <Block key={s.h} h={s.h} p={s.p} />
        ))}

        {/* Divider between terms and GDPR compliance block (matches live) */}
        <hr style={{ border: 0, borderTop: "1px solid var(--muted)", margin: "40px 0 44px" }} />

        <p style={bodyStyle}>
          At Carisma Aesthetic clinic in Malta, we are committed to protecting the privacy and security of our patients&apos; personal data. We comply with the General Data Protection Regulation (GDPR) and any applicable data protection laws.
        </p>

        {GDPR_SECTIONS.map((s) => (
          <Block key={s.h} h={s.h} p={s.p} />
        ))}
      </div>
    </section>
  );
}
