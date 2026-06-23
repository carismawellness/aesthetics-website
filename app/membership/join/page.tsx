import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import JoinForm from "@/components/membership/JoinForm";

/*
  Glow Club — join flow.

  Replaces the broken /sign-up 404. A focused, single-column conversion page:
  concise hero (one <h1>), a recap of the headline member benefits as proof,
  and the lead-capture <JoinForm/>. Conversion page → noindex, follow.

  Brand: Carisma Aesthetics — "Glow with Confidence", persona Sarah. Cool
  sage-teal + taupe-gold palette only. Every text/UI pair WCAG 2.2 AA.
*/

export const metadata: Metadata = {
  title: "Join the Glow Club | Carisma Aesthetics Malta",
  description:
    "Join the Glow Club at Carisma Aesthetics Malta. Save towards your favourite treatments and unlock 10% off all aesthetics & spa services, 15% off skincare, priority booking and a yearly complimentary consultation.",
  alternates: { canonical: "https://www.carismaaesthetics.com/membership/join" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Join the Glow Club | Carisma Aesthetics Malta",
    description:
      "Members save 10% on all aesthetics & spa services, 15% on skincare, plus priority booking and a yearly complimentary consultation.",
    url: "https://www.carismaaesthetics.com/membership/join",
    images: [
      {
        url: "/og-aesthetics.jpg",
        width: 1200,
        height: 630,
        alt: "Join the Glow Club at Carisma Aesthetics Malta",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/og-aesthetics.jpg"] },
};

/* Headline benefits — extracted faithfully from the membership offer. */
const BENEFITS = [
  { big: "10% off", label: "all aesthetics & spa services" },
  { big: "15% off", label: "all skincare products" },
  { big: "Priority", label: "booking & scheduling" },
  { big: "1× / year", label: "complimentary consultation" },
];

const TRUST = [
  "#1 Voted Med-Aesthetics Clinic",
  "4.9 ★ from 500+ reviews",
  "30+ years in wellness",
];

const FORM_ID = "glow-club-join-heading";

export default function JoinPage() {
  return (
    <main id="main-content">
      <section style={{ background: "var(--cream)", padding: "64px 0 24px" }}>
        <div className="container">
          <Reveal>
            <p
              className="font-display text-center"
              style={{
                fontSize: "11px",
                color: "var(--teal-text)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              Glow Club membership
            </p>
            <h1
              className="font-serif text-center"
              style={{
                fontSize: "clamp(26px,4vw,42px)",
                color: "var(--gold)",
                letterSpacing: "0.05em",
                fontWeight: 400,
                lineHeight: 1.2,
                maxWidth: "760px",
                margin: "0 auto",
              }}
            >
              Join the Glow Club in Malta
            </h1>
            <p
              className="text-center"
              style={{
                fontSize: "16px",
                color: "var(--ink-soft)",
                lineHeight: 1.7,
                maxWidth: "560px",
                margin: "18px auto 0",
              }}
            >
              Save towards your favourite Carisma Aesthetics treatments month by
              month, then spend your Glow balance with exclusive member
              discounts. Tell us a little about you and we’ll set up your
              membership.
            </p>

            {/* Trust bar */}
            <ul
              className="flex flex-wrap items-center justify-center"
              style={{
                gap: "10px 22px",
                listStyle: "none",
                padding: 0,
                margin: "22px auto 0",
                maxWidth: "640px",
              }}
            >
              {TRUST.map((t) => (
                <li
                  key={t}
                  className="font-display"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--teal-text)",
                  }}
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby={FORM_ID}
        style={{ background: "var(--white)", padding: "8px 0 72px" }}
      >
        <div className="container">
          <div
            className="grid gap-12 lg:grid-cols-2 items-start mx-auto"
            style={{ maxWidth: "1000px", marginTop: "40px" }}
          >
            {/* Benefits recap (proof) */}
            <Reveal>
              <div>
                <h2
                  id={FORM_ID}
                  className="font-serif"
                  style={{
                    fontSize: "clamp(20px,2.6vw,28px)",
                    color: "var(--gold)",
                    letterSpacing: "0.05em",
                    fontWeight: 400,
                    lineHeight: 1.3,
                    marginBottom: "10px",
                  }}
                >
                  What members enjoy
                </h2>
                <p
                  style={{
                    fontSize: "14.5px",
                    color: "var(--ink-soft)",
                    lineHeight: 1.7,
                    marginBottom: "28px",
                  }}
                >
                  No monthly fee — you choose your own monthly contribution from
                  €20 to €200, and it’s always yours to spend on the treatments
                  you love.
                </p>

                <ul
                  style={{
                    display: "grid",
                    gap: "16px",
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {BENEFITS.map((b) => (
                    <li
                      key={b.label}
                      style={{ display: "flex", gap: "14px", alignItems: "baseline" }}
                    >
                      <span
                        className="font-display"
                        aria-hidden="true"
                        style={{
                          flexShrink: 0,
                          minWidth: "86px",
                          fontSize: "13px",
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          color: "var(--teal-text)",
                          fontWeight: 600,
                        }}
                      >
                        {b.big}
                      </span>
                      <span
                        style={{
                          fontSize: "14.5px",
                          color: "var(--ink-soft)",
                          lineHeight: 1.55,
                        }}
                      >
                        {b.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <p
                  style={{
                    fontSize: "12.5px",
                    color: "var(--label)",
                    lineHeight: 1.65,
                    marginTop: "28px",
                  }}
                >
                  Your first month is non-refundable but is credited towards your
                  second procedure with us. Cancel any time after your first
                  month.
                </p>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={80}>
              <JoinForm />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
