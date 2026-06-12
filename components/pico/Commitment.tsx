import { Serif, Cta, Dot } from "./_shared";

// Commitment section — "35+ years…" heading + two text columns + centered CTA.
// Pure text section: inherits the page's shared marble background; no image of its own.
// (The farhad-ibrahimzade unsplash photo captured in the slice belongs to the NEXT
//  "SECURE YOUR PICO LASER" section, so it is intentionally NOT rendered here.)

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
    <section style={{ padding: "40px 0 60px" }}>
      <div className="container">
        <Serif>35+ years helping malta feel confident.</Serif>
        <div className="grid gap-12 lg:grid-cols-2 mx-auto" style={{ maxWidth: "1000px", marginTop: "40px" }}>
          <div>
            <h3 className="font-display" style={{ fontSize: "14px", color: "var(--gold-deep)", letterSpacing: "0.08em", marginBottom: "18px" }}>OUR COMMITMENT</h3>
            <ul className="space-y-4">
              {COMMITMENT.map(([t, d]) => (
                <li key={t} className="flex items-start gap-3">
                  <Dot />
                  <span style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.6 }}>
                    <b style={{ color: "var(--gold-deep)", fontWeight: 600 }}>{t}</b> — {d}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display" style={{ fontSize: "14px", color: "var(--gold-deep)", letterSpacing: "0.08em", marginBottom: "18px" }}>WHY MALTA TRUSTS OUR PICO LASER TREATMENT</h3>
            <ul className="space-y-4">
              {WHY_TRUST.map((w) => (
                <li key={w} className="flex items-start gap-3">
                  <Dot />
                  <span style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.6 }}>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center" style={{ marginTop: "36px" }}>
          <Cta label="Get My First Tatto removal Session" />
        </div>
      </div>
    </section>
  );
}
