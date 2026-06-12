import { A, Serif } from "./_shared";

// "trustedFeatures" section of the Pico laser tattoo removal page.
// Malta's trusted clinic heading + sub-paragraph, a centered row of 5 press
// logos, and a 4-up petal-corner feature card grid. Mirrors the live layout.

const FEATURES = [
  { icon: "pico-trustedFeatures-feat1.png", label: "PRECISE INK TARGETING", desc: "Pico pulses target tattoo pigment with focused precision." },
  { icon: "pico-trustedFeatures-feat2.png", label: "GENTLER FADING", desc: "Designed to break ink particles without relying on intense heat." },
  { icon: "pico-trustedFeatures-feat3.png", label: "CUSTOM REMOVAL PLAN", desc: "Tailored to your tattoo, skin type, ink depth, and fading goals." },
  { icon: "pico-trustedFeatures-feat4.png", label: "EXPERT AFTERCARE", desc: "Professional guidance before and after treatment for safer results." },
];

const PRESS = [
  "/assets/press/lovin-malta.jpeg",
  "/assets/press/malta-daily.png",
  "/assets/press/bay.jpeg",
  "/assets/press/times-of-malta.png",
  "/assets/press/malta-today.jpg",
];

export default function TrustedFeatures() {
  return (
    <section style={{ padding: "50px 0" }}>
      <div className="container text-center">
        <Serif>malta’s trusted clinic for safe, precise tattoo removal</Serif>
        <p className="mx-auto" style={{ maxWidth: "740px", fontSize: "14px", color: "var(--label)", lineHeight: 1.7, marginTop: "16px" }}>
          Advanced Pico laser technology, personalised treatment plans, and medically guided care for unwanted ink.
        </p>

        {/* press / media logos */}
        <div className="flex flex-wrap items-center justify-center" style={{ gap: "30px", marginTop: "30px" }}>
          {PRESS.map((l) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={l} src={l} alt="" style={{ height: "30px", width: "auto", objectFit: "contain" }} />
          ))}
        </div>

        {/* 4-up feature card grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ marginTop: "44px" }}>
          {FEATURES.map((f) => (
            <div
              key={f.label}
              className="text-center"
              style={{ background: "rgba(255,255,255,0.5)", border: "1px solid var(--line)", borderRadius: "16px 40px 16px 40px", padding: "28px 22px", boxShadow: "0 12px 30px rgba(0,0,0,0.05)" }}
            >
              <div className="flex justify-center" style={{ marginBottom: "14px", height: "52px", alignItems: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${A}/${f.icon}`} alt={f.label} style={{ maxHeight: "48px", width: "auto" }} />
              </div>
              <h3 className="font-display" style={{ fontSize: "13px", color: "#98afb2", letterSpacing: "0.06em", marginBottom: "10px" }}>{f.label}</h3>
              <p style={{ fontSize: "13px", color: "var(--label)", lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
