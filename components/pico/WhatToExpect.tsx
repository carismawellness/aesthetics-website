import { A, Serif } from "./_shared";

const COLUMNS = [
  {
    label: "before",
    image: "pico-whatToExpect-before.png",
    alt: "Floral tattoo on shoulder before Pico laser removal treatment",
    points: [
      "Before your treatment, avoid direct sun exposure, tanning, or self-tanning products on the tattooed area for at least a few days.",
      "Keep the area clean and well-hydrated. Do not apply harsh exfoliants, acids, or active skincare over the tattoo before your session",
      "Share your medical history, skin sensitivity, and any medications with your specialist so your treatment can be planned safely.",
    ],
  },
  {
    label: "at session",
    image: "pico-whatToExpect-at-session.png",
    alt: "Specialist performing Pico laser tattoo removal on a client's back during a session",
    points: [
      "Your specialist will begin by assessing the tattoo's size, colour, depth, and location to customize your Pico laser settings.",
      "During the session, ultra-short Pico laser pulses target the tattoo pigment, helping break ink particles into smaller fragments.",
      "You may feel a quick snapping sensation on the skin. Cooling and comfort measures may be used throughout the treatment.",
    ],
  },
  {
    label: "after",
    image: "pico-whatToExpect-after.png",
    alt: "Treated skin on the back after Pico laser tattoo removal",
    points: [
      "Mild redness, warmth, swelling, or temporary whitening of the treated area can be normal after Pico laser tattoo removal.",
      "Keep the area clean, protected, and moisturized as advised. Avoid picking, scratching, or rubbing the treated skin.",
      "Protect the area from sun exposure and follow your aftercare plan to support healing and achieve the best possible fading results.",
    ],
  },
];

export default function WhatToExpect() {
  return (
    <section style={{ padding: "50px 0" }}>
      <div className="container">
        <Serif style={{ textTransform: "uppercase" }}>
          what to expect during your pico laser tattoo removal treatment?
        </Serif>

        <div className="wte-grid grid gap-8" style={{ marginTop: "36px" }}>
          {COLUMNS.map((col) => (
            <div key={col.label}>
              <p
                className="font-display text-center"
                style={{
                  fontSize: "14px",
                  color: "var(--gold-deep)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                {col.label}
              </p>

              <img
                src={`${A}/${col.image}`}
                alt={col.alt}
                className="rounded-xl"
                style={{
                  width: "100%",
                  aspectRatio: "5 / 4",
                  objectFit: "cover",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                }}
              />

              <div className="space-y-3" style={{ marginTop: "16px" }}>
                {col.points.map((point) => (
                  <div
                    key={point}
                    style={{
                      background: "rgba(255,255,255,0.6)",
                      borderLeft: "3px solid var(--teal)",
                      borderRadius: "6px",
                      padding: "14px 16px",
                    }}
                  >
                    <p style={{ fontSize: "13px", color: "var(--label)", lineHeight: 1.65 }}>{point}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* eslint-disable-next-line */}
      <style>{`
        @media (min-width: 768px) {
          .wte-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
      `}</style>
    </section>
  );
}
