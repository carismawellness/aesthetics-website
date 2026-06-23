import Link from "next/link";
import Reveal from "@/components/Reveal";

/*
  GuaranteeBand — a standout risk-reversal / guarantee band for the Carisma
  Aesthetics treatment template. Server component (no client state). This is the
  aesthetics analog of slimming's MedicalGuaranteeSection: a guarantee badge, a
  big Trajan title, reassuring paragraphs, an optional row of three "proof
  pillars", and a prominent CTA. Restyled to the aesthetics teal/gold/beige
  palette as a single large rounded gradient card on a teal-tinted ground.

  Deliberately does NOT use <SectionHeader> — it carries its own oversized title
  treatment. Generous padding and a soft teal gradient with a gold-accented
  badge make it feel premium and reassuring. Hover lift on the CTA is handled by
  the global .btn rules (reduced-motion safe); the pillar dividers are static.
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
  kicker = "Our promise",
  title,
  paragraphs,
  cta = "Book Free Consultation",
  points,
}: Props) {
  return (
    <section style={{ padding: "clamp(72px,9vh,112px) 0", background: "var(--teal-100)" }}>
      <div className="container">
        <Reveal>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "clamp(20px, 3vw, 32px)",
              border: "1px solid rgba(var(--teal-deep-rgb), 0.18)",
              background:
                "linear-gradient(155deg, var(--white) 0%, var(--beige) 46%, var(--teal-100) 100%)",
              padding: "clamp(40px, 6vw, 80px) clamp(24px, 4vw, 72px)",
              textAlign: "center",
              boxShadow: "0 26px 70px rgba(var(--teal-deep-rgb), 0.16)",
            }}
          >
            {/* Soft decorative glow — purely aesthetic, never interactive */}
            <span
              aria-hidden
              style={{
                position: "absolute",
                top: "-26%",
                right: "-12%",
                width: "min(46%, 420px)",
                aspectRatio: "1",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(var(--teal-rgb), 0.30) 0%, rgba(var(--teal-rgb), 0) 70%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", maxWidth: 760, marginInline: "auto" }}>
              {/* Guarantee badge — gold-accented shield on a light pill */}
              {kicker && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 9,
                    border: "1px solid rgba(var(--teal-deep-rgb), 0.30)",
                    borderRadius: 999,
                    padding: "8px 18px",
                    marginBottom: 28,
                    background: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--gold-deep)"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span
                    className="font-display"
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.22em",
                      color: "var(--teal-text)",
                      textTransform: "uppercase",
                    }}
                  >
                    {kicker}
                  </span>
                </span>
              )}

              {/* Oversized Trajan title */}
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(30px, 5.4vw, 56px)",
                  color: "var(--gold)",
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  lineHeight: 1.12,
                  margin: 0,
                  textWrap: "balance",
                }}
              >
                {title}
              </h2>

              <div
                aria-hidden
                style={{
                  width: 64,
                  height: 1,
                  background: "var(--teal-deep)",
                  margin: "22px auto 0",
                }}
              />

              {paragraphs.map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: "clamp(15.5px, 1.7vw, 17px)",
                    lineHeight: 1.7,
                    color: "var(--ink-soft)",
                    maxWidth: 600,
                    marginInline: "auto",
                    marginTop: i === 0 ? 22 : 14,
                    textWrap: "pretty",
                  }}
                >
                  {para}
                </p>
              ))}

              {cta && (
                <div style={{ marginTop: 34 }}>
                  <Link
                    href="/consultation"
                    className="btn btn-teal"
                    style={{ borderRadius: 999, padding: "15px 30px" }}
                  >
                    {cta}
                  </Link>
                </div>
              )}
            </div>

            {/* Proof pillars — optional row of 3 */}
            {points && points.length > 0 && (
              <>
                <style>{`
                  .guarantee-pillars {
                    position: relative;
                    display: grid;
                    grid-template-columns: repeat(${Math.min(points.length, 3)}, minmax(0, 1fr));
                    gap: 2px;
                    max-width: 880px;
                    margin: clamp(36px, 5vw, 56px) auto 0;
                    border-top: 1px solid rgba(var(--teal-deep-rgb), 0.18);
                  }
                  .guarantee-pillars > div {
                    padding: clamp(24px, 3vw, 34px) clamp(14px, 2vw, 24px) 0;
                    text-align: center;
                  }
                  .guarantee-pillars > div + div {
                    border-left: 1px solid rgba(var(--teal-deep-rgb), 0.14);
                  }
                  @media (max-width: 680px) {
                    .guarantee-pillars {
                      grid-template-columns: 1fr;
                      max-width: 360px;
                      gap: 0;
                    }
                    .guarantee-pillars > div + div {
                      border-left: none;
                      border-top: 1px solid rgba(var(--teal-deep-rgb), 0.14);
                    }
                  }
                `}</style>
                <div className="guarantee-pillars">
                  {points.map((p, i) => (
                    <div key={`${p.label}-${i}`}>
                      {p.value && (
                        <span
                          className="font-serif"
                          style={{
                            display: "block",
                            fontSize: "clamp(28px, 3.6vw, 40px)",
                            color: "var(--gold)",
                            letterSpacing: "0.02em",
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
                          letterSpacing: "0.18em",
                          color: "var(--teal-text)",
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
                            fontSize: 13,
                            lineHeight: 1.6,
                            color: "var(--ink-soft)",
                            marginTop: 10,
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
