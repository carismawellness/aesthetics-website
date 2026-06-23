import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/treatment/SectionHeader";

/**
 * SuitabilityCards — "Is this right for you?" suitability section.
 *
 * Deliberately restrained, mirroring the Carisma Slimming eligibility design
 * (app/glp1/page.tsx → "Who is GLP-1 weight loss right for?"): NO filled cards,
 * NO heavy shaded boxes. Just two airy columns of plain ✓/✗ rows on white,
 * separated by a single hairline, with a centred SectionHeader above. Whitespace
 * and a thin rule carry the structure — not background fills.
 *
 * Aesthetics tokens only: heading --gold (via SectionHeader), column labels
 * --teal-text / --label, body --ink-soft, ✓ --teal-deep, ✗ muted (--label),
 * hairlines --line. Reduced-motion safe (Reveal + SectionHeader both no-op
 * under prefers-reduced-motion). Stacks to one column on mobile.
 */

// Quiet sage tick — --teal-deep (#4f7373 ≥ 3:1 graphical-object bar, WCAG 1.4.11).
// The ✓ glyph itself is the non-colour cue for "suitable".
function SuitTick() {
  return (
    <svg
      className="shrink-0"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--teal-deep)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ marginTop: 3 }}
      role="img"
      aria-label="Suitable"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// Soft, muted cross — --label (#695c4e taupe) so it recedes rather than alarms.
// The ✗ glyph is the non-colour cue for "may not be ideal".
function NotIdealMark() {
  return (
    <svg
      className="shrink-0"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--label)"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ marginTop: 4, opacity: 0.75 }}
      role="img"
      aria-label="May not be ideal"
    >
      <path d="M7 7l10 10M17 7 7 17" />
    </svg>
  );
}

export default function SuitabilityCards({
  kicker,
  title = "Is this right for you?",
  sub,
  suitableFor,
  notIdeal,
  personas,
}: {
  kicker?: string;
  title?: string;
  sub?: string;
  suitableFor: string[];
  notIdeal: string[];
  /** richer "designed for" personas (title + desc) — when present they replace
   *  the plain suitableFor bullets on the left column. */
  personas?: { title: string; desc: string }[];
}) {
  const colLabel: React.CSSProperties = {
    fontSize: 12,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontWeight: 600,
    margin: 0,
  };
  const itemText: React.CSSProperties = {
    fontSize: 14.5,
    lineHeight: 1.6,
    color: "var(--ink-soft)",
    textWrap: "pretty",
  };

  return (
    <section
      aria-labelledby="suitability-heading"
      style={{ padding: "clamp(72px,9vh,112px) 0", background: "#fff" }}
    >
      <div className="container">
        <SectionHeader id="suitability-heading" kicker={kicker} title={title} sub={sub} />

        <Reveal>
          {/* Two airy columns, no fills. A single hairline divides them on
              desktop; on mobile it becomes the divider between the stacked
              halves. max-width keeps the measure tight and the section calm. */}
          <div
            className="suit-grid"
            style={{
              maxWidth: 860,
              marginInline: "auto",
              marginTop: "clamp(40px,5vw,56px)",
            }}
          >
            {/* Suitable for you — or, when personas are supplied, the human
                "Designed for" list (each a named persona + a line of context). */}
            <div className="suit-col">
              <p className="font-display" style={{ ...colLabel, color: "var(--teal-text)" }}>
                {personas && personas.length > 0 ? "Designed for" : "Suitable for you"}
              </p>
              <ul style={{ listStyle: "none", margin: "24px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 22 }}>
                {personas && personas.length > 0
                  ? personas.map((p) => (
                      <li key={p.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <SuitTick />
                        <span>
                          <span style={{ display: "block", fontSize: 15, fontWeight: 600, color: "var(--gold)", marginBottom: 3 }}>
                            {p.title}
                          </span>
                          <span style={itemText}>{p.desc}</span>
                        </span>
                      </li>
                    ))
                  : suitableFor.map((s) => (
                      <li key={s} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <SuitTick />
                        <span style={itemText}>{s}</span>
                      </li>
                    ))}
              </ul>
            </div>

            {/* May not be ideal if */}
            <div className="suit-col suit-col--second">
              <p className="font-display" style={{ ...colLabel, color: "var(--label)" }}>
                May not be ideal if
              </p>
              <ul style={{ listStyle: "none", margin: "24px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 20 }}>
                {notIdeal.map((s) => (
                  <li key={s} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <NotIdealMark />
                    <span style={{ ...itemText, color: "var(--muted)" }}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Restraint = whitespace + one hairline. The divider is a thin --line:
          a vertical rule between the two columns on desktop, a top border on
          the second column once they stack on mobile. No card fills, no shadows. */}
      <style>{`
        .suit-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        .suit-col--second {
          border-top: 1px solid var(--line);
          padding-top: 40px;
        }
        @media (min-width: 768px) {
          .suit-grid {
            grid-template-columns: 1fr 1fr;
            column-gap: clamp(48px, 6vw, 80px);
            row-gap: 0;
          }
          .suit-col--second {
            border-top: 0;
            padding-top: 0;
            border-left: 1px solid var(--line);
            padding-left: clamp(48px, 6vw, 80px);
          }
        }
      `}</style>
    </section>
  );
}
