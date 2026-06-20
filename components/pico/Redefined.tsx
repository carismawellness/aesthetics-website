import { A, Cta } from "./_shared";

// "Your skin — redefined." section for the Pico laser tattoo removal page.
// Live layout: a single centered two-column row on the warm marble background.
// LEFT column = portrait tattoo photo; RIGHT column (stacked, left-aligned) =
// gold small-caps heading, teal intro paragraph, a 4-item bullet list, and a
// left-aligned teal pill CTA directly beneath the list.

const BULLETS: { label: string; desc: string }[] = [
  { label: "Precise Ink Fading", desc: "Targets tattoo pigment beneath the skin using ultra-short Pico pulses." },
  { label: "Gentler Technology", desc: "Helps break ink particles without relying on intense heat." },
  { label: "Personalised Plan", desc: "Treatment is tailored to your tattoo size, ink colour, depth, and skin type." },
  { label: "Safe, Expert Care", desc: "Performed by trained aesthetic specialists with clear aftercare guidance." },
];

export default function Redefined() {
  return (
    <section style={{ padding: "70px 24px", background: "#ffffff" }}>
      <div
        className="grid items-center"
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          gridTemplateColumns: "minmax(0, 421px) 1fr",
          gap: "48px",
        }}
      >
        {/* LEFT: portrait tattoo photo */}
        <img
          src={`${A}/pico-redefined-main.png`}
          alt="pico laser tattoo removal"
          width={421}
          height={408}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "14px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
          }}
        />

        {/* RIGHT: heading + intro + bullets + CTA (all left-aligned) */}
        <div>
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(22px,3vw,30px)",
              color: "#98afb2",
              letterSpacing: "0.06em",
              fontWeight: 400,
              lineHeight: 1.3,
              textTransform: "uppercase",
            }}
          >
            Your Skin — Redefined.
          </h2>

          <p style={{ color: "var(--teal)", fontSize: "14px", lineHeight: 1.7, marginTop: "14px" }}>
            See how advanced Pico Laser treatment helps fade unwanted tattoo ink with precision, care, and a personalised plan designed around your skin.
          </p>

          <ul className="space-y-5" style={{ marginTop: "26px", listStyle: "none" }}>
            {BULLETS.map((b) => (
              <li key={b.label} className="flex" style={{ gap: "10px" }}>
                <span style={{ color: "var(--teal)", fontSize: "9px", lineHeight: 2, flexShrink: 0 }}>●</span>
                <span style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--label)" }}>
                  <span style={{ color: "var(--gold-deep)", fontWeight: 600 }}>{b.label}</span> — {b.desc}
                </span>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "30px" }}>
            <Cta label="Get 70% Off Pico Laser" />
          </div>
        </div>
      </div>
    </section>
  );
}
