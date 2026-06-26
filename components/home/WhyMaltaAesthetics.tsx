import Link from "next/link";
import type { ReactNode } from "react";
import LazyMap from "@/components/home/LazyMap";

/**
 * "The Carisma Difference / Malta's #1 Voted Medical Aesthetics Clinic" —
 * a faithful recreation of Carisma Slimming's package-page DifferencePanel
 * (components/PackagePage.tsx): eyebrow → 110px rule → BIG Trajan headline,
 * then a two-column items-stretch layout on the warm→teal gradient card with a
 * centred motif watermark. LEFT = two circle-tick checklists + a single CTA
 * pinned to the bottom; RIGHT = the Carisma Aesthetics Google map + the
 * complimentary on-site parking pill.
 *
 * Re-skinned to the Aesthetics teal palette (no green, no cream, no brown
 * button fills). The CTA uses the shared `.btn .btn-teal` gradient so it reads
 * identically to every other primary CTA on the site.
 */

const BODY =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const WIDE = '"Novecento Wide", sans-serif';
const SERIF = '"Trajan Pro", Georgia, serif';

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

const checklistItem: React.CSSProperties = {
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
  color: "#3a3a3a",
  fontFamily: BODY,
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 1.6,
};

const colHeading: React.CSSProperties = {
  color: "#4f7373",
  fontFamily: WIDE,
  fontSize: 15,
  fontWeight: 400,
  letterSpacing: "1px",
  textTransform: "uppercase",
  margin: "0 0 18px",
};

function DiffCheck() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, marginTop: 2 }}
    >
      <circle cx="9" cy="9" r="9" fill="#f7fafa" />
      <path
        d="M5 9.5L7.5 12L13 6.5"
        stroke="#4f7373"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WhyMaltaAesthetics() {
  return (
    <section
      aria-labelledby="why-malta-aesthetics-heading"
      style={{ paddingTop: 60, paddingBottom: "clamp(28px,4vw,56px)", backgroundColor: "transparent" }}
    >
      <div
        className="mx-auto px-4 sm:px-6 lg:px-8"
        style={{ maxWidth: 1120 }}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(192deg, #F6F9F9 44.74%, rgba(150, 178, 178, 0.4) 100%)",
            borderRadius: 16,
            padding: "clamp(28px, 4vw, 40px) clamp(22px, 4vw, 40px) clamp(34px, 4vw, 48px)",
          }}
        >
          {/* decorative motif watermark, centred top — mirrors Slimming's WELL_BG */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/motif.svg"
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "50%",
              top: 12,
              transform: "translateX(-50%)",
              width: 560,
              maxWidth: "90%",
              opacity: 0.22,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Eyebrow */}
            <p
              className="text-center"
              aria-hidden="true"
              style={{
                color: "#406060",
                fontFamily: WIDE,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              the carisma difference
            </p>
            <div
              aria-hidden="true"
              style={{
                width: 110,
                height: 1,
                backgroundColor: "#96b2b2",
                margin: "10px auto 16px",
              }}
            />
            <h2
              id="why-malta-aesthetics-heading"
              className="text-center"
              style={{
                color: "#27484a",
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(24px, 3.4vw, 38px)",
                lineHeight: 1.2,
                letterSpacing: "1px",
                margin: "0 auto",
                maxWidth: 760,
              }}
            >
              Why Choose Carisma Aesthetics — Medically Qualified Team
            </h2>

            <div
              className="grid grid-cols-1 lg:grid-cols-2"
              style={{ gap: 48, marginTop: 40, alignItems: "stretch" }}
            >
              {/* LEFT — commitment + difference checklists + single CTA */}
              <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
                <div>
                  <h3 style={colHeading}>Our Doctor-Led Aesthetics Commitment</h3>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    {commitmentItems.map((item, idx) => (
                      <li key={idx} style={checklistItem}>
                        <DiffCheck />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 style={colHeading}>What Makes Our Aesthetics Clinic Different</h3>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    {differenceItems.map((item, idx) => (
                      <li key={idx} style={checklistItem}>
                        <DiffCheck />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* CTA → consultation popup — shared teal gradient pill */}
                <div style={{ marginTop: "auto" }}>
                  <Link
                    href="/consultation"
                    className="btn btn-teal"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 999,
                      fontFamily: WIDE,
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      minHeight: 48,
                      padding: "0 32px",
                      textDecoration: "none",
                    }}
                    aria-label="Book your free consultation"
                  >
                    Book Your Free Consultation
                  </Link>
                </div>
              </div>

              {/* RIGHT — Google map panel + parking pill */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <LazyMap
                  title="Carisma Aesthetics clinic location — St George's Bay, St Julian's, Malta"
                  ariaLabel="Google Maps showing Carisma Aesthetics at St George's Bay, St Julian's, Malta"
                  src="https://maps.google.com/maps?q=Carisma%20Aesthetics%2C%20St%20George%27s%20Bay%2C%20St%20Julian%27s%20STJ%203310%2C%20Malta&z=15&output=embed"
                />
                {/* Parking pill */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#fbfdfd",
                    borderRadius: 999,
                    padding: "8px 16px",
                    marginTop: 16,
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
                      fontFamily: WIDE,
                      fontSize: 12,
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
