import SectionHeader from "@/components/treatment/SectionHeader";
import Reveal from "@/components/Reveal";

/**
 * ProblemReframe — the EMOTIONAL "problem reframe" section for the Carisma
 * Aesthetics treatment template. Server component (no client state).
 *
 * Purpose & tone (mirrors the Carisma Slimming voice — see BrandBlock's
 * "discipline rarely holds…" panel): make the reader feel *understood* before
 * pointing — gently — at the solution. NEVER fear-based. For wrinkle relaxing
 * the truth isn't "do you have wrinkles?", it's "you look more tired, tense or
 * stressed than you feel — and the fix keeps your natural movement, so you
 * still look like you, just more rested."
 *
 * Sits right after the before/after results. Layout (data-driven — all copy via
 * props):
 *   • <SectionHeader> carries the empathetic Trajan headline (`title`) + a soft
 *     teal kicker, on a tight centred measure.
 *   • `body[]` → 1–2 calm supporting paragraphs (constrained measure, --ink-soft),
 *     the lead paragraph framed inside a soft bordered "quiet panel" like the
 *     Slimming guide block, so the empathy reads as a held, human moment.
 *   • `points[]` (optional) → a row/grid of soft reframe cards: a small --teal-text
 *     title + a 1-line --ink-soft desc. Gentle, elegant — NOT alarming.
 *
 * Set apart from neighbouring white sections with a faint warm-ivory ground
 * (--teal-100, remapped to ivory in the 2026 palette) so the moment feels like
 * a calm exhale rather than another block. Aesthetics tokens ONLY (teal/gold —
 * no green/brown). Reduced-motion safe (Reveal + SectionHeader both no-op under
 * prefers-reduced-motion). Section labelled by its heading; decorative marks are
 * aria-hidden. Cards stack on mobile.
 */

type ReframePoint = { title: string; desc: string };

type Props = {
  kicker?: string;
  /** The emotional headline (Trajan via SectionHeader). Required. */
  title: string;
  /** 1–2 calm supporting paragraphs. The first is framed in the quiet panel. */
  body?: string[];
  /** Optional soft reframe cards (small teal title + 1-line desc). */
  points?: ReframePoint[];
};

export default function ProblemReframe({
  kicker = "We hear this every day",
  title,
  body = [],
  points = [],
}: Props) {
  const headingId = "problem-reframe-heading";
  const [lead, ...rest] = body;

  return (
    <section
      aria-labelledby={headingId}
      style={{
        // Compact emotional beat. Soft teal ground that fades to white at BOTH
        // edges so it never creates a hard seam against neighbouring sections.
        padding: "clamp(40px,5vw,64px) 0",
        background:
          "linear-gradient(180deg, #ffffff 0%, var(--teal-100) 50%, #ffffff 100%)",
      }}
    >
      <div className="container">
        {/* Shrink the SectionHeader's H2 a notch for this compact beat (the shared
            SectionHeader has a fixed size; scope the override to this heading). */}
        <style>{`#${headingId} { font-size: clamp(21px,2.7vw,30px) !important; }`}</style>
        <SectionHeader id={headingId} kicker={kicker} title={title} />

        {/* ── Calm supporting paragraphs ───────────────────────────────────
            The lead is held inside a soft bordered "quiet panel" (echoing the
            Slimming guide block); any following paragraphs are plain centred
            copy. Tight measure keeps the empathy intimate. */}
        {body.length > 0 && (
          <Reveal>
            <div
              style={{
                maxWidth: 580,
                marginInline: "auto",
                marginTop: "clamp(20px,2.6vw,30px)",
                textAlign: "center",
              }}
            >
              {lead && (
                <div
                  style={{
                    position: "relative",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--radius-card)",
                    background: "rgba(255,255,255,0.66)",
                    padding: "clamp(18px,2.4vw,26px)",
                    boxShadow: "0 10px 26px rgba(var(--teal-deep-rgb), 0.06)",
                  }}
                >
                  {/* Decorative opening quote mark — soft teal, purely emotional
                      punctuation (aria-hidden, doesn't enter the reading order). */}
                  <span
                    aria-hidden
                    className="font-serif"
                    style={{
                      position: "absolute",
                      top: -11,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "var(--teal-100)",
                      padding: "0 12px",
                      fontSize: 26,
                      lineHeight: 1,
                      color: "var(--teal-200)",
                      userSelect: "none",
                    }}
                  >
                    &rdquo;
                  </span>
                  <p
                    style={{
                      fontSize: "clamp(15px,1.4vw,16.5px)",
                      lineHeight: 1.65,
                      color: "var(--ink-soft)",
                      margin: 0,
                      textWrap: "pretty",
                    }}
                  >
                    {lead}
                  </p>
                </div>
              )}

              {rest.map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 15.5,
                    lineHeight: 1.7,
                    color: "var(--muted)",
                    maxWidth: 580,
                    marginInline: "auto",
                    marginTop: "clamp(20px,2.4vw,26px)",
                    marginBottom: 0,
                    textWrap: "pretty",
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        )}

        {/* ── Soft reframe cards (optional) ────────────────────────────────
            A gentle grid that quietly turns the worry into a reassurance:
            small teal title + a single calming line. White cards, hairline
            border, soft teal shadow — elegant, never alarming. Stacks on
            mobile, auto-fits 1→3 across. */}
        {points.length > 0 && (
          <Reveal>
            <style>{`
              .reframe-points {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: clamp(16px, 2vw, 24px);
                max-width: 920px;
                margin: clamp(40px, 5vw, 56px) auto 0;
                align-items: stretch;
              }
              @media (max-width: 560px) {
                .reframe-points { grid-template-columns: 1fr; }
              }
            `}</style>
            <ul className="reframe-points" style={{ listStyle: "none", padding: 0 }}>
              {points.map((p, i) => (
                <li
                  key={`${p.title}-${i}`}
                  style={{
                    background: "var(--white)",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--radius-card)",
                    boxShadow: "0 10px 28px rgba(var(--teal-deep-rgb), 0.07)",
                    padding: "clamp(22px,2.6vw,30px)",
                    textAlign: "center",
                  }}
                >
                  {/* Small soft sage rule above each title — quiet visual anchor. */}
                  <span
                    aria-hidden
                    style={{
                      display: "block",
                      width: 28,
                      height: 1,
                      background: "var(--teal-deep)",
                      margin: "0 auto 16px",
                    }}
                  />
                  <h3
                    className="font-display"
                    style={{
                      fontSize: 13,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--teal-text)",
                      fontWeight: 600,
                      lineHeight: 1.4,
                      margin: "0 0 10px",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14.5,
                      lineHeight: 1.6,
                      color: "var(--ink-soft)",
                      margin: 0,
                      textWrap: "pretty",
                    }}
                  >
                    {p.desc}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
