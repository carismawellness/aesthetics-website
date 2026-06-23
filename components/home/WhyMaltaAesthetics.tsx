import Link from "next/link";
import type { ReactNode } from "react";

/**
 * "Why Malta Chooses Carisma Aesthetics" — home-page section.
 *
 * Mirrors Carisma Slimming's "Why Malta Chooses Carisma Slimming" home section
 * (eyebrow → divider → heading → two checklist columns + Google map panel +
 * CTA + complimentary parking pill) with the same proportions, re-skinned to
 * the Aesthetics teal/blue palette and populated with doctor-led medical
 * aesthetics commitments.
 *
 * Palette (all WCAG AA on their grounds):
 *   - #4f7373 (teal-deep)  — checklist fills, CTA fill (carries white text), parking text
 *   - #406060 (teal-text)  — body / list text, heading
 *   - #96b2b2 (teal)       — decorative gradient / divider
 *   - #deebeb (teal-100)   — soft section accents / parking pill ground
 * Headings: Trajan Pro (heading) + Novecento Wide (eyebrow / labels / CTA).
 * Body: system font stack, normal weight (no bold body).
 */

const commitmentItems: ReactNode[] = [
  "Natural-looking results that enhance your features — never overdone, never frozen",
  "Treatment plans built around your face, your skin and your goals — not a one-size-fits-all menu",
  "Honest advice on what you actually need: if a treatment is not right for you, we will tell you",
  <>
    Medical-grade injectables, skin and laser treatments delivered by{" "}
    <Link
      href="/face-treatments"
      className="underline decoration-dotted underline-offset-2"
    >
      qualified doctors and aesthetic professionals
    </Link>
  </>,
];

const differenceItems: ReactNode[] = [
  "Created by the team behind Malta's leading spa and medical aesthetics centres",
  "Doctor-led medical aesthetics, not a beauty salon — your safety and results come first",
  <>
    A central, easy-to-reach clinic with{" "}
    <Link
      href="/face-treatments"
      className="underline decoration-dotted underline-offset-2"
    >
      a full range of face and skin treatments
    </Link>{" "}
    under one roof
  </>,
  "Personal, unhurried consultations with a clear plan and transparent pricing before anything begins",
];

export default function WhyMaltaAesthetics() {
  return (
    <section
      className="py-14"
      aria-labelledby="why-malta-aesthetics-heading"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative"
          style={{
            background:
              "linear-gradient(160deg, #f4f8f8 0%, #edf4f4 55%, #e6f0f0 100%)",
            borderRadius: "16px",
            padding: "clamp(26px, 3vw, 38px)",
            overflow: "hidden",
          }}
        >
          {/* Faint rose-motif glow — decorative, mirrors Slimming's glow-orb technique */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -100,
              right: -80,
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "rgba(192, 140, 140, 0.13)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: -80,
              left: -60,
              width: 240,
              height: 240,
              borderRadius: "50%",
              background: "rgba(150, 178, 178, 0.18)",
              filter: "blur(50px)",
              pointerEvents: "none",
            }}
          />
          <div className="relative" style={{ zIndex: 1 }}>
            {/* Eyebrow */}
            <p
              className="text-center mb-2"
              aria-hidden="true"
              style={{
                color: "#406060",
                fontFamily: '"Novecento Wide", sans-serif',
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              the carisma difference
            </p>
            <div
              className="mx-auto mb-4"
              aria-hidden="true"
              style={{ width: "110px", height: "1px", backgroundColor: "#96b2b2" }}
            />
            <h2
              id="why-malta-aesthetics-heading"
              className="text-center mb-8"
              style={{
                color: "#406060",
                fontFamily: '"Trajan Pro", Georgia, serif',
                fontWeight: 400,
                fontSize: "clamp(17px, 2vw, 22px)",
                lineHeight: "1.45",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              why malta chooses carisma aesthetics
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Left — commitment checklists + CTA */}
              <div className="space-y-8">
                <div>
                  <h3
                    className="mb-6"
                    style={{
                      color: "#000000",
                      fontFamily: '"Novecento Wide", sans-serif',
                      fontSize: "15px",
                      fontWeight: 400,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    Our Doctor-Led Aesthetics Commitment
                  </h3>
                  <ul className="space-y-4">
                    {commitmentItems.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3"
                        style={{
                          color: "#406060",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: 1.6,
                        }}
                      >
                        <svg
                          aria-hidden="true"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ flexShrink: 0, marginTop: "2px" }}
                        >
                          <circle cx="9" cy="9" r="9" fill="#deebeb" />
                          <path
                            d="M5 9.5L7.5 12L13 6.5"
                            stroke="#4f7373"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3
                    className="mb-6"
                    style={{
                      color: "#000000",
                      fontFamily: '"Novecento Wide", sans-serif',
                      fontSize: "15px",
                      fontWeight: 400,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    What Makes Our Aesthetics Clinic Different
                  </h3>
                  <ul className="space-y-4">
                    {differenceItems.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3"
                        style={{
                          color: "#406060",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: 1.6,
                        }}
                      >
                        <svg
                          aria-hidden="true"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ flexShrink: 0, marginTop: "2px" }}
                        >
                          <circle cx="9" cy="9" r="9" fill="#deebeb" />
                          <path
                            d="M5 9.5L7.5 12L13 6.5"
                            stroke="#4f7373"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* CTA → consultation popup */}
                <div>
                  <Link
                    href="/consultation"
                    className="inline-flex items-center justify-center text-white transition-all duration-200 ease-in-out hover:brightness-110 active:scale-95"
                    style={{
                      backgroundColor: "#4f7373",
                      borderRadius: "999px",
                      fontFamily: '"Novecento Wide", sans-serif',
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      minHeight: "46px",
                      padding: "0 30px",
                      boxShadow: "0 6px 18px -4px rgba(79,115,115,0.55), 0 2px 6px -2px rgba(79,115,115,0.30)",
                    }}
                    aria-label="Book your free consultation"
                  >
                    Book Your Free Consultation
                  </Link>
                </div>
              </div>

              {/* Right — Google map panel + parking pill */}
              <div className="flex flex-col">
                <iframe
                  title="Carisma Aesthetics clinic location — Grand Hotel Excelsior, Floriana, Malta"
                  aria-label="Google Maps showing Carisma Aesthetics at Grand Hotel Excelsior, Floriana, Malta"
                  src="https://maps.google.com/maps?q=Grand%20Hotel%20Excelsior%2C%20Great%20Siege%20Road%2C%20Floriana%20FRN%201810%2C%20Malta&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    borderRadius: "20px",
                    display: "block",
                    flex: 1,
                    minHeight: "320px",
                    filter: "saturate(0.85) contrast(1.02)",
                    boxShadow: "0 2px 16px -4px rgba(64,96,96,0.18)",
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                {/* Parking pill */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#deebeb",
                    borderRadius: "999px",
                    padding: "8px 16px",
                    marginTop: "16px",
                    alignSelf: "flex-start",
                  }}
                >
                  <svg
                    aria-hidden="true"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="1" y="1" width="16" height="16" rx="4" fill="#96b2b2" />
                    <text
                      x="9"
                      y="13"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="10"
                      fontWeight="700"
                      fontFamily="sans-serif"
                    >
                      P
                    </text>
                  </svg>
                  <span
                    style={{
                      color: "#406060",
                      fontFamily: '"Novecento Wide", sans-serif',
                      fontSize: "12px",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    Complimentary on-site parking
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
