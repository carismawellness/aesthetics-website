import Link from "next/link";
import { A, Dot, GoogleRating } from "./_shared";

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

// WCAG AA corrected: prior #98afb2 (2.31:1) and #96b2b2 (2.26:1) failed AA.
const TEAL = "#527979";   // --teal heading text, 4.81:1 on light bg (was #98afb2)

export default function Hero() {
  return (
    <section
      style={{
        padding: "40px 0",
      }}
    >
      <div className="container">
        {/* Blue-grey gradient panel (no green) */}
        <div
          className="hero-panel"
          style={{
            backgroundImage: "url(/assets/bg-gradient.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "26px",
            padding: "clamp(28px, 3.6vw, 56px)",
          }}
        >
          <div className="hero-grid grid gap-10 items-start">
            {/* LEFT: copy stack */}
            <div className="hero-copy">
              <h1
                className="font-serif"
                style={{
                  fontSize: "clamp(20px, 2vw, 28px)",
                  color: TEAL,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  lineHeight: 1.12,
                  margin: 0,
                }}
              >
                pico laser tattoo removal
              </h1>

              <p
                style={{
                  color: "var(--gold)",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: 1.7,
                  marginTop: "16px",
                  maxWidth: "440px",
                }}
              >
                Advanced laser technology to safely fade unwanted tattoos with
                precision, comfort, and clinically guided care.
              </p>

              <p
                className="font-display"
                style={{
                  color: "var(--gold)",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  marginTop: "22px",
                  marginBottom: "10px",
                }}
              >
                What&apos;s Included:
              </p>

              <ul className="space-y-2">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Dot />
                    <span
                      style={{
                        color: "var(--gold)",
                        fontSize: "13.5px",
                        lineHeight: 1.55,
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <p
                className="font-display"
                style={{
                  color: "var(--gold)",
                  fontSize: "15px",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  marginTop: "22px",
                }}
              >
                Total Value: €335 – Today: €99 Only
              </p>

              <p
                style={{
                  color: "var(--gold)",
                  fontSize: "11px",
                  lineHeight: 1.6,
                  marginTop: "12px",
                  maxWidth: "440px",
                }}
              >
                Due to high demand, packages are offered based on availability and
                may not always be guaranteed. Please inquire for current options.
              </p>

              {/* full-width muted sage CTA — shared .btn .btn-teal pill (glow + hover scale) */}
              <Link
                href="/consultation"
                className="btn btn-teal font-display"
                style={{
                  marginTop: "24px",
                  width: "100%",
                  maxWidth: "470px",
                  color: "#fff",
                  fontSize: "14px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "16px 24px",
                }}
              >
                Book Now &amp; Save 70% <span aria-hidden style={{ marginLeft: "8px" }}>›</span>
              </Link>

              <GoogleRating />
            </div>

            {/* RIGHT: image collage only (no form) — tiles carry sage backings + rose marks */}
            <div className="hero-collage" style={{ position: "relative", aspectRatio: "1 / 1.08" }}>
              {/* arm being lasered — top-left */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${A}/pico-hero-collage-arm.png`}
                alt="Pico laser tattoo removal in progress on an arm"
                style={{ position: "absolute", top: 0, left: 0, width: "62%", borderRadius: "14px", filter: "drop-shadow(0 14px 30px rgba(0,0,0,0.14))" }}
              />
              {/* neck tattoo portrait — right, taller, overlapping */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${A}/pico-hero-collage-tile1.png`}
                alt="Geometric neck tattoo before removal"
                style={{ position: "absolute", top: "20%", right: 0, width: "47%", borderRadius: "14px", filter: "drop-shadow(0 16px 34px rgba(0,0,0,0.16))" }}
              />
              {/* before / after composite — bottom-left */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${A}/pico-hero-collage-ba.png`}
                alt="Tattoo fading before and after"
                style={{ position: "absolute", bottom: 0, left: "2%", width: "45%", borderRadius: "14px", filter: "drop-shadow(0 14px 30px rgba(0,0,0,0.16))" }}
              />
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4"
          style={{ marginTop: "40px" }}
        >
          {TRUST.map((label) => (
            <div key={label} className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${A}/laser-ic-check.png`}
                alt=""
                aria-hidden
                style={{ width: "22px", height: "22px" }}
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

      {/* eslint-disable-next-line */}
      <style>{`
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1.12fr 0.88fr; }
        }
      `}</style>
    </section>
  );
}
