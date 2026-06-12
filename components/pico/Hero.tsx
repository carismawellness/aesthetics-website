import { A, Cta, Dot, GoogleRating } from "./_shared";
import ConsultationForm from "@/components/ConsultationForm";

const INCLUDED = [
  "Personal tattoo and skin assessment before treatment",
  "Advanced Pico laser technology for precise ink targeting",
  "Ultra-short laser pulses designed to break down tattoo pigment",
  "A personalised treatment plan based on your tattoo and skin type",
  "Aftercare guidance to support safe healing and better results",
];

const TRUST = [
  "MALTA'S LEADING WELLNESS CHAIN",
  "30+ YEARS OF EXPERTISE",
  "MEDICALLY QUALIFIED",
];

export default function Hero() {
  return (
    <section
      style={{
        backgroundImage: `url(/assets/hero-bg.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px 0",
      }}
    >
      <div className="container">
        {/* Blue-grey gradient panel (no green tint) — same backdrop as the other treatment heroes */}
        <div
          className="hero-panel"
          style={{
            backgroundImage: "url(/assets/bg-gradient.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "26px",
            padding: "clamp(26px, 3.5vw, 48px)",
          }}
        >
          <div className="hero-grid grid gap-10">
            {/* LEFT: copy stack */}
            <div className="hero-copy">
              <h1
                className="font-serif"
                style={{
                  fontSize: "clamp(26px, 3.4vw, 38px)",
                  color: "var(--gold-deep)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                pico laser tattoo removal
              </h1>

              <p
                style={{
                  color: "var(--label)",
                  fontSize: "14px",
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
                  color: "var(--gold-deep)",
                  fontSize: "15px",
                  letterSpacing: "0.04em",
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
                        color: "var(--label)",
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
                  color: "var(--gold-deep)",
                  fontSize: "15px",
                  letterSpacing: "0.04em",
                  marginTop: "22px",
                }}
              >
                Total Value: €335 –{" "}
                <span style={{ color: "var(--teal)" }}>Today: €99 Only</span>
              </p>

              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "11px",
                  lineHeight: 1.6,
                  marginTop: "10px",
                  maxWidth: "440px",
                }}
              >
                Due to high demand, packages are offered based on availability and
                may not always be guaranteed. Please inquire for current options.
              </p>

              <div style={{ marginTop: "22px" }}>
                <Cta label="Book Now & Save 50%" />
              </div>

              <GoogleRating />
            </div>

            {/* RIGHT: collage + form */}
            <div className="hero-right grid gap-5">
              {/* Collage */}
              <div className="hero-collage" style={{ position: "relative" }}>
                <img
                  src={`${A}/pico-hero-collage-arm.png`}
                  alt="Pico laser tattoo removal in progress on an arm"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    display: "block",
                    filter: "drop-shadow(0 14px 32px rgba(0,0,0,0.15))",
                  }}
                />
                <img
                  src={`${A}/pico-hero-collage-portrait.png`}
                  alt="Tattoo before removal"
                  style={{
                    position: "absolute",
                    top: "8%",
                    right: "-6%",
                    width: "38%",
                    borderRadius: "8px",
                    filter: "drop-shadow(0 14px 30px rgba(0,0,0,0.16))",
                  }}
                />
                <img
                  src={`${A}/pico-hero-collage-tile1.png`}
                  alt="Tattoo fading detail"
                  style={{
                    position: "absolute",
                    bottom: "18%",
                    right: "4%",
                    width: "30%",
                    borderRadius: "8px",
                    filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.15))",
                  }}
                />
                <img
                  src={`${A}/pico-hero-collage-tile2.png`}
                  alt="Tattoo fading detail"
                  style={{
                    position: "absolute",
                    bottom: "2%",
                    left: "4%",
                    width: "26%",
                    borderRadius: "8px",
                    filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.15))",
                  }}
                />
                <img
                  src={`${A}/pico-hero-collage-ba.png`}
                  alt="Tattoo fading before and after"
                  style={{
                    position: "absolute",
                    bottom: "-4%",
                    left: "30%",
                    width: "44%",
                    borderRadius: "8px",
                    filter: "drop-shadow(0 14px 32px rgba(0,0,0,0.16))",
                  }}
                />
              </div>

              {/* Consultation form card */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: "14px",
                  boxShadow: "0 22px 50px rgba(0,0,0,0.16)",
                  overflow: "hidden",
                }}
              >
                <ConsultationForm height={760} />
              </div>
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
                  color: "var(--gold-deep)",
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
          .hero-grid { grid-template-columns: 0.95fr 1.25fr; align-items: start; }
          .hero-right { grid-template-columns: 0.82fr 1fr; align-items: start; }
        }
      `}</style>
    </section>
  );
}
