import Image from "next/image";
import PageHero from "@/components/PageHero";
import { A, GoogleRating } from "./_shared";

const INCLUDED = [
  "Targets pigment (tattoo ink, melanin)",
  "Uses ultra-short picosecond pulses",
  "Works by using pressure instead of heat",
  "Breaks ink for natural body clearance",
];

const TRUST = [
  "MALTA'S LEADING WELLNESS CHAIN",
  "30+ YEARS OF EXPERTISE",
  "MEDICALLY QUALIFIED",
];

export default function Hero() {
  return (
    <>
      <PageHero
        headline={[
          { text: "Pico Laser Tattoo Removal" },
          { text: "in Malta", em: true },
        ]}
        sub="Advanced laser technology to safely fade unwanted tattoos with precision, comfort, and clinically guided care."
        bullets={INCLUDED.map((text) => ({ text }))}
        primaryCta={{ text: "Book Now & Save 70%", href: "/consultation" }}
        media={{
          type: "image",
          src: `${A}/pico-hero-collage-arm.png`,
          alt: "Pico laser tattoo removal in Malta",
        }}
        proof={{
          rating: "4.9",
          reviews: "200+",
          statValue: "30+",
          statLabel: "years in wellness",
          awardText: "#1 Voted Clinic\nMalta Healthcare Awards",
        }}
      />

      {/* Offer + trust strip — moved out of the hero, sits directly below it */}
      <section aria-label="Offer details" style={{ padding: "clamp(28px, 4vw, 48px) 0" }}>
        <div className="container">
          <div
            style={{
              maxWidth: "640px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <p
              className="font-display"
              style={{
                color: "var(--gold)",
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "0.02em",
              }}
            >
              Total Value: €335 – Today: €99 Only
            </p>

            <p
              style={{
                color: "var(--gold)",
                fontSize: "11px",
                lineHeight: 1.6,
                marginTop: "10px",
              }}
            >
              Due to high demand, packages are offered based on availability and
              may not always be guaranteed. Please inquire for current options.
            </p>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <GoogleRating />
            </div>
          </div>

          {/* Trust strip */}
          <div
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4"
            style={{ marginTop: "32px" }}
            aria-label="Trust credentials"
          >
            {TRUST.map((label) => (
              <div key={label} className="flex items-center gap-2">
                <Image
                  src={`${A}/laser-ic-check.png`}
                  alt=""
                  aria-hidden="true"
                  width={22}
                  height={22}
                />
                <span
                  className="font-display"
                  style={{
                    fontSize: "12px",
                    color: "var(--label)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
