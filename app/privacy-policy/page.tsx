import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Carisma Aesthetics",
};

const SECTIONS = [
  {
    h: "Information Collection and Use",
    p: "We may collect personal data such as name, contact information, and medical history from patients for the purpose of providing med-aesthetic services. We may also collect data such as photographs and video footage for treatment monitoring and documentation.",
  },
  {
    h: "Third-Party Disclosure",
    p: "We do not share personal data with third-party vendors or partners, except as required by law or with the patient's explicit consent.",
  },
  {
    h: "User Choices",
    p: "Patients have the option to opt-out of marketing communications or delete their personal data at any time by contacting us through our website.",
  },
];

export default function PrivacyPolicy() {
  return (
    <section style={{ padding: "70px 0" }}>
      <div className="container" style={{ maxWidth: "820px" }}>
        <h1 className="font-display" style={{ fontSize: "clamp(26px,4vw,38px)", color: "var(--ink)", marginBottom: "24px" }}>privacy policy</h1>
        <p style={{ fontSize: "16px", color: "var(--ink-soft)", lineHeight: 1.8, marginBottom: "36px" }}>
          This privacy policy outlines how we collect, use, and protect personal data that patients provide us in relation to med-aesthetic services.
        </p>
        {SECTIONS.map((s) => (
          <div key={s.h} style={{ marginBottom: "30px" }}>
            <h2 className="font-display" style={{ fontSize: "16px", color: "var(--ink)", letterSpacing: "0.08em", marginBottom: "12px" }}>{s.h}</h2>
            <p style={{ fontSize: "15.5px", color: "var(--muted)", lineHeight: 1.8 }}>{s.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
