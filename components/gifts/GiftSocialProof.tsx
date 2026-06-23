import Reveal from "@/components/Reveal";
import {
  REVIEW_SUMMARY,
  CURATED_REVIEWS,
  GOOGLE_PROFILE_URL,
} from "@/lib/reviews";

const GOLD = "var(--gold)";
const TEAL_TEXT = "var(--teal-text)";

// Compact star row. Stars use --gold (AA on white); accessible label conveys rating.
function Stars({ rating, label }: { rating: number; label: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      style={{ color: GOLD, letterSpacing: "0.12em", fontSize: "15px", lineHeight: 1 }}
    >
      <span aria-hidden="true">
        {"★".repeat(Math.round(rating))}
        {"☆".repeat(Math.max(0, 5 - Math.round(rating)))}
      </span>
    </span>
  );
}

// Gifting-framed social proof: aggregate score + 3 real reviews → builds trust
// before pushing the visitor back up to the occasion grid.
export default function GiftSocialProof() {
  const reviews = CURATED_REVIEWS.slice(0, 3);
  const totalLabel = `${REVIEW_SUMMARY.total}${REVIEW_SUMMARY.plus ? "+" : ""}`;

  return (
    <section
      aria-labelledby="gift-social-proof-heading"
      style={{ padding: "70px 0 90px", background: "var(--beige)" }}
    >
      <div className="container">
        {/* Aggregate + intro */}
        <Reveal>
          <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
            <p
              className="font-display"
              style={{
                fontSize: "clamp(12px,1.6vw,14px)",
                color: TEAL_TEXT,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Loved by Women Across Malta
            </p>

            <h2
              id="gift-social-proof-heading"
              className="font-serif"
              style={{
                fontSize: "clamp(26px,3.4vw,38px)",
                color: GOLD,
                lineHeight: 1.18,
                margin: "14px 0 0",
              }}
            >
              A gift they'll thank you for
            </h2>

            {/* Headline aggregate score */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <span
                className="font-serif"
                style={{ fontSize: "34px", color: GOLD, lineHeight: 1, fontWeight: 400 }}
              >
                {REVIEW_SUMMARY.rating.toFixed(1)}
              </span>
              <Stars
                rating={REVIEW_SUMMARY.rating}
                label={`${REVIEW_SUMMARY.rating} out of 5 stars`}
              />
              <span style={{ fontSize: "14px", color: "var(--muted)" }}>
                from {totalLabel} reviews
              </span>
            </div>

            <p
              style={{
                fontSize: "15px",
                color: "var(--label)",
                lineHeight: 1.75,
                maxWidth: "560px",
                margin: "16px auto 0",
              }}
            >
              Every voucher unlocks the same care our clients rave about — so the
              moment they redeem it feels every bit as thoughtful as the gesture.
            </p>
          </div>
        </Reveal>

        {/* Review cards */}
        <ul
          role="list"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-auto"
          style={{ maxWidth: "1040px", marginTop: "44px", padding: 0 }}
        >
          {reviews.map((r, i) => (
            <li key={r.name}>
              <Reveal delay={(i % 4) * 70}>
                <figure
                  className="card"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    padding: "26px 24px",
                    margin: 0,
                    background: "#fff",
                  }}
                >
                  <Stars rating={r.rating} label={`${r.rating} out of 5 stars`} />

                  <blockquote
                    style={{
                      margin: "16px 0 0",
                      fontSize: "15px",
                      color: "var(--ink)",
                      lineHeight: 1.7,
                      flexGrow: 1,
                    }}
                  >
                    {r.text}
                  </blockquote>

                  <figcaption
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginTop: "22px",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="font-display"
                      style={{
                        flex: "0 0 auto",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "var(--cream)",
                        color: TEAL_TEXT,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "15px",
                        fontWeight: 600,
                      }}
                    >
                      {r.initial}
                    </span>
                    <span style={{ display: "flex", flexDirection: "column" }}>
                      <span
                        style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)" }}
                      >
                        {r.name}
                      </span>
                      <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                        {r.when}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Read more on Google */}
        <Reveal delay={70}>
          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F7373] focus-visible:ring-offset-2"
              style={{
                display: "inline-block",
                fontSize: "12px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: TEAL_TEXT,
                borderBottom: "1px solid var(--line)",
                paddingBottom: "3px",
              }}
            >
              Read more on Google →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
