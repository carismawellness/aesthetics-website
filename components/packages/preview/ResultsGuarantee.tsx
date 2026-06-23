import AmbientField from "@/components/fx/AmbientField";
import Motif from "@/components/fx/Motif";
import BookingButtons from "@/components/BookingButtons";
import type { ResultsGuaranteeProps } from "@/lib/packages/preview-types";

/*
  Premium risk-reversal / medical-credibility band for the V2 package preview.

  Server component (no hooks). An `.ambient-host` section (cream -> white gradient)
  with one soft teal AmbientField blob + a faint watermark Motif behind. The
  content sits on a centred Liquid Gloss panel (`.lg lg--panel`): eyebrow
  (font-display teal), serif heading, body, a checklist of `points` with teal
  check icons, the smaller muted `medicalLine`, and a BookingButtons CTA
  (Fresha primary + consult). All text meets AA contrast on the glass surface.
*/
export default function ResultsGuarantee({
  eyebrow,
  heading,
  body,
  points,
  medicalLine,
  freshaHref,
  ctaLabel,
}: ResultsGuaranteeProps) {
  return (
    <section
      aria-label={heading}
      className="ambient-host"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, var(--cream) 50%, #ffffff 100%)",
        padding: "clamp(52px,8vh,96px) 0",
      }}
    >
      {/* Decorative layers (both aria-hidden within their components). */}
      <AmbientField blob="bottom-left" tone="teal" soft dots />
      <Motif mode="watermark" color="var(--teal-deep)" />

      <div className="container">
        <div
          className="lg lg--panel mx-auto"
          style={{
            maxWidth: "680px",
            padding: "clamp(30px,4vw,52px)",
            textAlign: "center",
          }}
        >
          <p
            className="font-display"
            style={{
              fontSize: "12px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--teal-text)",
              margin: 0,
            }}
          >
            {eyebrow}
          </p>

          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(22px,3vw,32px)",
              color: "var(--gold)",
              letterSpacing: "0.04em",
              lineHeight: 1.25,
              marginTop: "12px",
            }}
          >
            {heading}
          </h2>

          <p
            style={{
              fontSize: "15px",
              color: "var(--label)",
              lineHeight: 1.7,
              marginTop: "16px",
            }}
          >
            {body}
          </p>

          <ul
            className="mx-auto"
            style={{
              listStyle: "none",
              margin: "24px 0 0",
              padding: 0,
              maxWidth: "440px",
              textAlign: "left",
              display: "grid",
              gap: "12px",
            }}
          >
            {points.map((point) => (
              <li
                key={point}
                style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}
              >
                {/* Teal check icon — decorative; the text is the content. */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--teal-deep)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ flexShrink: 0, marginTop: "2px" }}
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.55 }}>
                  {point}
                </span>
              </li>
            ))}
          </ul>

          <p
            style={{
              fontSize: "12.5px",
              color: "var(--muted)",
              lineHeight: 1.6,
              marginTop: "22px",
            }}
          >
            {medicalLine}
          </p>

          <div style={{ marginTop: "26px" }}>
            <BookingButtons
              freshaHref={freshaHref}
              primaryLabel={ctaLabel}
              consultLabel="Book Free Consultation"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
