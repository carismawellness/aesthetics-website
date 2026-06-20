import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Carisma Aesthetics",
  description:
    "Check Privacy Policy of Carisma Aesthetics that outlines how we collect, use, and protect personal data that patients provide us in relation to med-aesthetic services.",
  openGraph: {
    title: "Privacy Policy | Carisma Aesthetics",
    description:
      "Check Privacy Policy of Carisma Aesthetics that outlines how we collect, use, and protect personal data that patients provide us in relation to med-aesthetic services.",
    url: "https://www.carismaaesthetics.com/privacy-policy",
    siteName: "Carisma Aesthetics",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Carisma Aesthetics",
    description:
      "Check Privacy Policy of Carisma Aesthetics that outlines how we collect, use, and protect personal data that patients provide us in relation to med-aesthetic services.",
  },
};

/* Verbatim live copy — carismaaesthetics.com/privacy-policy */
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

const bodyStyle: React.CSSProperties = {
  fontSize: "16px",
  color: "var(--label)",
  lineHeight: 1.5,
  margin: "0 0 20px",
};

export default function PrivacyPolicy() {
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
            privacy policy
          </h1>
        </div>
        <p style={bodyStyle}>
          This privacy policy outlines how we collect, use, and protect personal data that patients provide us in relation to med-aesthetic services.
        </p>
        {SECTIONS.map((s) => (
          <div key={s.h}>
            <h2
              style={{
                fontFamily: '"Roboto Local", Roboto, sans-serif',
                fontSize: "22px",
                fontWeight: 300,
                color: "var(--gold)",
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                lineHeight: 1.35,
                margin: "0 0 16px",
              }}
            >
              {s.h}
            </h2>
            <p style={bodyStyle}>{s.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
