import AmbientField from "@/components/fx/AmbientField";
import type { HowItWorksProps } from "@/lib/packages/preview-types";

/*
  "How it works" numbered step timeline for the V2 package preview.

  Server component (no hooks). Renders the heading + steps as an elegant grid of
  raised cards (`.card-raised`): a big teal-deep numeral, an uppercase font-display
  title, and a one-line description. The section is an `.ambient-host` with one
  soft AmbientField (localized pulsing blob + faint dots) layered behind — a
  tasteful flourish, not a busy background.

  Responsive: 4 across on desktop, 2-up on tablet, stacked on mobile (CSS grid
  with auto-fit + minmax, so it adapts to any step count). All text colours meet
  AA on the white card / pale section ground.
*/
export default function HowItWorks({ heading, steps }: HowItWorksProps) {
  return (
    <section
      aria-label={heading}
      className="ambient-host"
      style={{
        background: "linear-gradient(180deg, var(--white) 0%, var(--cream) 100%)",
        padding: "clamp(48px,7vh,84px) 0",
      }}
    >
      {/* Decorative ambient flourish (aria-hidden inside the component). */}
      <AmbientField blob="top-right" tone="teal" soft dots />

      <div className="container">
        <h2
          className="font-serif text-center"
          style={{
            fontSize: "clamp(22px,3vw,32px)",
            color: "var(--gold)",
            letterSpacing: "0.05em",
            lineHeight: 1.25,
          }}
        >
          {heading}
        </h2>

        <ol
          style={{
            listStyle: "none",
            margin: "clamp(32px,4vw,52px) 0 0",
            padding: 0,
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          }}
        >
          {steps.map((step) => (
            <li
              key={step.n}
              className="card-raised"
              style={{
                position: "relative",
                padding: "26px 24px 28px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Big numeral — decorative; the title carries the meaning. */}
              <span
                className="font-display"
                aria-hidden="true"
                style={{
                  fontSize: "clamp(40px,5vw,56px)",
                  lineHeight: 1,
                  fontWeight: 700,
                  color: "var(--teal-deep)",
                  opacity: 0.9,
                }}
              >
                {String(step.n).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                style={{
                  display: "block",
                  width: "34px",
                  height: "2px",
                  background: "var(--teal-200)",
                  margin: "14px 0 16px",
                }}
              />
              <h3
                className="font-display"
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--teal-text)",
                  lineHeight: 1.35,
                  margin: 0,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--label)",
                  lineHeight: 1.6,
                  marginTop: "10px",
                  marginBottom: 0,
                }}
              >
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
