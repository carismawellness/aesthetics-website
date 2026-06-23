import { Serif, Cta, Dot } from "./_shared";

// Commitment section — "35+ years…" heading + two text columns + centered CTA.
// Pure text section: inherits the page's shared marble background; no image of its own.

const COMMITMENT: [string, string][] = [
  ["Safe Tattoo Fading", "A careful approach designed to gradually fade unwanted ink."],
  ["Pico Laser Precision", "Targets tattoo pigment with ultra-short laser pulses."],
  ["Personalised Treatment Plans", "Every plan is based on your tattoo size, ink colour, depth, and skin type."],
  ["Honest Expectations", "We explain the process clearly, including the number of sessions you may need."],
  ["Professional Aftercare", "Guidance before and after each session to support safe skin recovery."],
];

const WHY_TRUST = [
  "Trusted by clients looking for safer, professional tattoo removal in Malta.",
  "Performed by qualified aesthetic specialists using advanced laser technology.",
  "Suitable for fading tattoos before cover-ups or removing unwanted ink over time.",
  "A calm, medically guided experience from consultation to aftercare.",
];

export default function Commitment() {
  return (
    <section
      aria-labelledby="commitment-heading"
      style={{ padding: "40px 0 60px", background: "#ffffff" }}
    >
      <div className="container">
        <Serif>How Pico Laser Technology Breaks Down Tattoo Ink</Serif>
        <p id="commitment-heading" className="sr-only">
          Our commitment to safe, expert pico laser tattoo removal
        </p>
        <div
          className="grid gap-12 lg:grid-cols-2 mx-auto"
          style={{ maxWidth: "1000px", marginTop: "40px" }}
        >
          <div>
            <h3
              className="font-display"
              style={{
                fontSize: "14px",
                color: "var(--gold)",
                letterSpacing: "0.08em",
                marginBottom: "18px",
                textTransform: "uppercase",
              }}
            >
              Our Commitment
            </h3>
            <ul className="space-y-4" role="list">
              {COMMITMENT.map(([t, d]) => (
                <li key={t} className="flex items-start gap-3">
                  <Dot />
                  <span style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.6 }}>
                    <b style={{ color: "var(--gold)", fontWeight: 600 }}>{t}</b> &mdash; {d}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3
              className="font-display"
              style={{
                fontSize: "14px",
                color: "var(--gold)",
                letterSpacing: "0.08em",
                marginBottom: "18px",
                textTransform: "uppercase",
              }}
            >
              Why Malta Trusts Our Pico Laser Treatment
            </h3>
            <ul className="space-y-4" role="list">
              {WHY_TRUST.map((w) => (
                <li key={w} className="flex items-start gap-3">
                  <Dot />
                  <span style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.6 }}>
                    {w}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center" style={{ marginTop: "36px" }}>
          <Cta label="Get My First Tattoo Removal Session" />
        </div>
      </div>

      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>
    </section>
  );
}
