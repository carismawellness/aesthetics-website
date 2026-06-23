import Reveal from "@/components/Reveal";

// "Why a Carisma gift" value strip — placed directly under the hero.
// Four benefit pillars that build trust/desire and gently push toward the
// occasion grid (#pick-occasion). Server component, no client JS.

type Pillar = {
  label: string;
  line: string;
  icon: React.ReactNode;
};

// Inline stroke icons — stroke=currentColor, coloured via --teal-deep on the wrapper.
const iconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const PILLARS: Pillar[] = [
  {
    label: "Delivered Instantly",
    line: "Sent to their inbox by email the moment you order — no waiting, no postage.",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    label: "Valid 12 Months",
    line: "A full year to book — plenty of time to choose the perfect moment to glow.",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    label: "Any Treatment, Any Clinic",
    line: "Redeemable across every Carisma Aesthetics clinic in Malta, on any treatment.",
    icon: (
      <svg {...iconProps}>
        <path d="M12 21s-7-4.6-9.3-9A5.2 5.2 0 0 1 12 6.3 5.2 5.2 0 0 1 21.3 12C19 16.4 12 21 12 21Z" />
      </svg>
    ),
  },
  {
    label: "Beautifully Personal",
    line: "Add a heartfelt message — gifted with care and presented to feel a little luxurious.",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="8" width="18" height="13" rx="1.5" />
        <path d="M3 12h18" />
        <path d="M12 8V21" />
        <path d="M12 8S10.5 4 8 4a2.4 2.4 0 0 0 0 4.8C10 8.8 12 8 12 8Z" />
        <path d="M12 8s1.5-4 4-4a2.4 2.4 0 0 1 0 4.8C14 8.8 12 8 12 8Z" />
      </svg>
    ),
  },
];

export default function WhyGiftStrip() {
  return (
    <section aria-labelledby="why-gift-heading" style={{ padding: "8px 0 56px" }}>
      <div className="container">
        <Reveal>
          <h2
            id="why-gift-heading"
            className="font-display text-center"
            style={{
              fontSize: "clamp(13px,1.8vw,15px)",
              color: "var(--teal-text)",
              letterSpacing: "0.16em",
              fontWeight: 600,
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            Why a Carisma Gift
          </h2>
        </Reveal>
        <Reveal delay={70}>
          <p
            className="font-serif text-center"
            style={{
              fontSize: "clamp(18px,2.4vw,24px)",
              color: "var(--gold)",
              lineHeight: 1.3,
              maxWidth: "620px",
              margin: "0 auto 40px",
            }}
          >
            The effortless way to give a glow they will remember.
          </p>
        </Reveal>

        <ul
          role="list"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mx-auto"
          style={{ maxWidth: "1120px", padding: 0, margin: 0 }}
        >
          {PILLARS.map((p, i) => (
            <li key={p.label} className="h-full">
              <Reveal delay={(i % 4) * 70} className="h-full">
                <div
                  className="card"
                  style={{
                    height: "100%",
                    padding: "26px 22px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {/* Icon medallion — decorative cream/teal ground, AA icon stroke */}
                  <span
                    aria-hidden="true"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "52px",
                      height: "52px",
                      borderRadius: "999px",
                      background: "var(--cream)",
                      color: "var(--teal-deep)",
                      marginBottom: "16px",
                    }}
                  >
                    {p.icon}
                  </span>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "13px",
                      color: "var(--gold)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      marginBottom: "8px",
                    }}
                  >
                    {p.label}
                  </h3>
                  <p
                    style={{
                      fontSize: "13.5px",
                      color: "var(--muted)",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {p.line}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Gentle nudge toward the occasion grid (primary on-page action) */}
        <Reveal delay={140}>
          <div className="text-center" style={{ marginTop: "36px" }}>
            <a
              href="#pick-occasion"
              className="btn-teal font-display"
              style={{ letterSpacing: "0.1em" }}
            >
              Pick an Occasion
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
