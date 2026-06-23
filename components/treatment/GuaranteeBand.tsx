import Link from "next/link";
import Reveal from "@/components/Reveal";

/*
  GuaranteeBand — a compact, restrained risk-reversal / guarantee band for the
  Carisma Aesthetics treatment template. Static server component (no client
  state, no hooks, no event handlers).

  Structure, kept deliberately tight: a gold Trajan title as the focal point, a
  short constrained summary beneath, a single responsive row of three "figure"
  cards (3 → 1) carrying the key proof numbers, then a small CTA pill. Modest
  section padding — no towering block. Aesthetics teal/gold/beige tokens only;
  accessible and reduced-motion safe (the only motion is the global Reveal /
  .btn behaviour, both of which respect prefers-reduced-motion).
*/

type Point = { value?: string; label: string; sub?: string };

type Props = {
  kicker?: string;
  title: string;
  paragraphs: string[];
  cta?: string;
  points?: Point[];
};

export default function GuaranteeBand({
  title,
  paragraphs,
  cta = "Book Free Consultation",
  points,
}: Props) {
  const summary = paragraphs[0];

  return (
    <section style={{ padding: "clamp(48px,6vh,72px) 0", background: "linear-gradient(180deg, #ffffff 0%, #f4f8f8 100%)" }}>
      <div className="container">
        <Reveal>
          <div style={{ maxWidth: 920, marginInline: "auto", textAlign: "center" }}>
            {/* Focal Trajan title — the visual anchor */}
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(26px, 3.8vw, 40px)",
                color: "var(--gold)",
                letterSpacing: "0.03em",
                fontWeight: 400,
                lineHeight: 1.14,
                margin: 0,
                textWrap: "balance",
              }}
            >
              {title}
            </h2>

            {/* Tight summary on a constrained measure */}
            {summary && (
              <p
                style={{
                  fontSize: "clamp(15px, 1.6vw, 16.5px)",
                  lineHeight: 1.65,
                  color: "var(--ink-soft)",
                  maxWidth: 560,
                  marginInline: "auto",
                  marginTop: 16,
                  textWrap: "pretty",
                }}
              >
                {summary}
              </p>
            )}

            {/* Three figure cards — single responsive row (3 → 1) */}
            {points && points.length > 0 && (
              <>
                <style>{`
                  .guarantee-figures {
                    display: grid;
                    grid-template-columns: repeat(${Math.min(points.length, 3)}, minmax(0, 1fr));
                    gap: clamp(12px, 1.6vw, 18px);
                    margin: clamp(28px, 3.4vw, 40px) auto 0;
                  }
                  .guarantee-figures > div {
                    border: 1px solid rgba(var(--teal-deep-rgb), 0.16);
                    border-radius: 16px;
                    background: rgba(255, 255, 255, 0.66);
                    padding: clamp(20px, 2.4vw, 28px) clamp(14px, 1.8vw, 22px);
                    text-align: center;
                  }
                  @media (max-width: 680px) {
                    .guarantee-figures {
                      grid-template-columns: 1fr;
                      max-width: 360px;
                    }
                  }
                `}</style>
                <div className="guarantee-figures">
                  {points.map((p, i) => (
                    <div key={`${p.label}-${i}`}>
                      {p.value && (
                        <span
                          className="font-serif"
                          style={{
                            display: "block",
                            fontSize: "clamp(24px, 3vw, 34px)",
                            color: "var(--teal-deep)",
                            letterSpacing: "0.01em",
                            lineHeight: 1.05,
                            marginBottom: 10,
                          }}
                        >
                          {p.value}
                        </span>
                      )}
                      <p
                        className="font-display"
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          letterSpacing: "0.16em",
                          color: "var(--gold-deep)",
                          textTransform: "uppercase",
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {p.label}
                      </p>
                      {p.sub && (
                        <p
                          style={{
                            fontSize: 12.5,
                            lineHeight: 1.55,
                            color: "var(--ink-soft)",
                            marginTop: 8,
                            textWrap: "pretty",
                          }}
                        >
                          {p.sub}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Small CTA pill below */}
            {cta && (
              <div style={{ marginTop: "clamp(26px, 3vw, 36px)" }}>
                <Link
                  href="/consultation"
                  className="btn btn-teal"
                  style={{ borderRadius: 999, padding: "12px 26px" }}
                >
                  {cta}
                </Link>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
