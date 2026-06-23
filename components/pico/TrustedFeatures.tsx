import Image from "next/image";
import { A, Serif } from "./_shared";

// "trustedFeatures" section of the Pico laser tattoo removal page.
// Malta's trusted clinic heading + sub-paragraph, a centered row of 5 press
// logos, and a 4-up petal-corner feature card grid. Mirrors the live layout.

const FEATURES = [
  {
    icon: "pico-trustedFeatures-feat1.png",
    label: "PRECISE INK TARGETING",
    desc: "Pico pulses target tattoo pigment with focused precision.",
  },
  {
    icon: "pico-trustedFeatures-feat2.png",
    label: "GENTLER FADING",
    desc: "Designed to break ink particles without relying on intense heat.",
  },
  {
    icon: "pico-trustedFeatures-feat3.png",
    label: "CUSTOM REMOVAL PLAN",
    desc: "Tailored to your tattoo, skin type, ink depth, and fading goals.",
  },
  {
    icon: "pico-trustedFeatures-feat4.png",
    label: "EXPERT AFTERCARE",
    desc: "Professional guidance before and after treatment for safer results.",
  },
];

const PRESS = [
  { src: "/assets/press/lovin-malta.jpeg", alt: "Lovin Malta" },
  { src: "/assets/press/malta-daily.png", alt: "Malta Daily" },
  { src: "/assets/press/bay.jpeg", alt: "Bay FM Malta" },
  { src: "/assets/press/times-of-malta.png", alt: "Times of Malta" },
  { src: "/assets/press/malta-today.jpg", alt: "Malta Today" },
];

export default function TrustedFeatures() {
  return (
    <section
      aria-labelledby="trusted-heading"
      style={{ padding: "50px 0", background: "#ffffff" }}
    >
      <div className="container text-center">
        <Serif id="trusted-heading">
          malta&apos;s trusted clinic for safe, precise tattoo removal
        </Serif>
        <p
          className="mx-auto"
          style={{
            maxWidth: "740px",
            fontSize: "14px",
            color: "var(--label)",
            lineHeight: 1.7,
            marginTop: "16px",
          }}
        >
          Advanced Pico laser technology, personalised treatment plans, and medically
          guided care for unwanted ink.
        </p>

        {/* press / media logos */}
        <div
          className="flex flex-wrap items-center justify-center"
          style={{ gap: "30px", marginTop: "30px" }}
          aria-label="Featured in media"
        >
          {PRESS.map((logo) => (
            <div
              key={logo.src}
              style={{ position: "relative", height: "30px", minWidth: "80px" }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                sizes="120px"
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>

        {/* 4-up feature card grid */}
        <div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          style={{ marginTop: "44px" }}
          role="list"
          aria-label="Key treatment features"
        >
          {FEATURES.map((f) => (
            <div
              key={f.label}
              className="card text-center trusted-feat-card"
              role="listitem"
              style={{
                background: "rgba(255,255,255,0.5)",
                borderRadius: "16px 40px 16px 40px",
                padding: "28px 22px",
              }}
            >
              <div
                className="flex justify-center"
                style={{ marginBottom: "14px", height: "52px", alignItems: "center" }}
              >
                <Image
                  src={`${A}/${f.icon}`}
                  alt=""
                  aria-hidden="true"
                  width={48}
                  height={48}
                  style={{ objectFit: "contain", maxHeight: "48px", width: "auto" }}
                />
              </div>
              <h3
                className="font-display"
                style={{
                  fontSize: "13px",
                  color: "#406060",
                  letterSpacing: "0.06em",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                }}
              >
                {f.label}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--label)", lineHeight: 1.65 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .trusted-feat-card {
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        @media (prefers-reduced-motion: no-preference) {
          .trusted-feat-card:hover {
            box-shadow: 0 8px 24px rgba(64,96,96,0.12);
            transform: translateY(-2px);
          }
        }
      `}</style>
    </section>
  );
}
