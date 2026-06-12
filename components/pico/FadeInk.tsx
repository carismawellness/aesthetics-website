import { A, Cta, Dot } from "./_shared";

const FADE = [
  "Targets tattoo pigment with ultra-short Pico laser pulses",
  "Helps break ink into tiny particles for natural clearance",
  "Suitable for fading tattoos before cover-ups or gradual removal",
  "Personalised plan based on tattoo size, ink colour, depth, and skin type",
  "Medically guided treatment with clear aftercare support",
  "Trusted aesthetic specialists in Malta",
];

export default function FadeInk() {
  return (
    <section style={{ padding: "50px 0" }}>
      <div className="container">
        <div className="fadeink-grid grid items-center gap-12">
          {/* LEFT: text */}
          <div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(22px,3vw,30px)",
                color: "var(--gold-deep)",
                letterSpacing: "0.06em",
                fontWeight: 400,
                lineHeight: 1.3,
                textTransform: "uppercase",
              }}
            >
              Fade Unwanted Ink. Feel More Like You.
            </h2>

            <p style={{ color: "var(--label)", fontSize: "14px", lineHeight: 1.7, marginTop: "16px" }}>
              Advanced Pico Laser tattoo removal designed for safer fading, precise targeting, and personalised results.
            </p>

            <ul className="space-y-3" style={{ marginTop: "20px" }}>
              {FADE.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Dot />
                  <span style={{ color: "var(--label)", fontSize: "14px", lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "28px" }}>
              <Cta label="Claim 50% Off Tattoo Removal" />
            </div>
          </div>

          {/* RIGHT: photo */}
          <div>
            <img
              src={`${A}/pico-fadeInk-main-photo.png`}
              alt="pico laster tatto.png"
              className="rounded-xl"
              style={{
                width: "100%",
                aspectRatio: "421 / 408",
                objectFit: "cover",
                boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
              }}
            />
          </div>
        </div>
      </div>

      {/* eslint-disable-next-line */}
      <style>{`
        @media (min-width: 1024px) {
          .fadeink-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
      `}</style>
    </section>
  );
}
