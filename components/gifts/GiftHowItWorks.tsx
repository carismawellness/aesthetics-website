import Reveal from "@/components/Reveal";

/**
 * GiftHowItWorks — a clean 3-step explainer for the Gifts page that also
 * covers redemption. Funnels the visitor toward the occasion grid
 * (#pick-occasion). Server component — no client JS.
 */

const STEPS = [
  {
    n: "01",
    title: "Pick the Occasion",
    body: "Choose the card that fits the moment — birthday, thank you, Mother's Day and more. One tap takes you to the next page.",
  },
  {
    n: "02",
    title: "Personalise It",
    body: "On the next page, choose the amount and add a heartfelt message — make it feel like it came straight from you.",
  },
  {
    n: "03",
    title: "Delivered Instantly",
    body: "Your e-voucher arrives by email within moments, beautifully presented and ready to gift — no shipping, no waiting.",
  },
];

export default function GiftHowItWorks() {
  return (
    <section
      aria-labelledby="gift-how-heading"
      style={{ padding: "clamp(56px, 8vw, 96px) 0" }}
    >
      <div className="container">
        {/* ── Heading ── */}
        <Reveal>
          <div className="text-center" style={{ maxWidth: "640px", margin: "0 auto" }}>
            <span
              className="font-display"
              style={{
                display: "inline-block",
                fontSize: "12px",
                color: "var(--teal-text)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              Gifting Made Effortless
            </span>
            <h2
              id="gift-how-heading"
              className="font-serif"
              style={{
                fontSize: "clamp(26px, 4vw, 38px)",
                color: "var(--gold)",
                letterSpacing: "0.04em",
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              How It Works
            </h2>
            <p
              style={{
                marginTop: "16px",
                fontSize: "16px",
                color: "var(--muted)",
                lineHeight: 1.7,
              }}
            >
              A thoughtful, luxurious gift in three simple steps — done in under a minute.
            </p>
          </div>
        </Reveal>

        {/* ── Step cards / timeline ── */}
        <ol
          role="list"
          className="grid gap-6 sm:gap-7 md:grid-cols-3 mx-auto"
          style={{
            listStyle: "none",
            maxWidth: "1040px",
            marginTop: "clamp(40px, 6vw, 64px)",
            padding: 0,
          }}
        >
          {STEPS.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={(i % 4) * 70}>
                <div
                  className="card"
                  style={{
                    height: "100%",
                    padding: "32px 28px",
                    textAlign: "center",
                  }}
                >
                  {/* Big brand numeral */}
                  <span
                    className="font-serif"
                    aria-hidden="true"
                    style={{
                      display: "block",
                      fontSize: "clamp(40px, 6vw, 56px)",
                      lineHeight: 1,
                      color: "var(--gold)",
                      fontWeight: 400,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {s.n}
                  </span>

                  {/* Decorative divider */}
                  <span
                    aria-hidden="true"
                    style={{
                      display: "block",
                      width: "44px",
                      height: "1px",
                      background: "var(--teal)",
                      opacity: 0.55,
                      margin: "18px auto",
                    }}
                  />

                  <h3
                    className="font-display"
                    style={{
                      fontSize: "14px",
                      color: "var(--gold)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      marginTop: "12px",
                      fontSize: "15px",
                      color: "var(--muted)",
                      lineHeight: 1.7,
                    }}
                  >
                    {s.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* ── Redemption reassurance ── */}
        <Reveal delay={70}>
          <div
            className="mx-auto"
            style={{
              marginTop: "clamp(40px, 6vw, 56px)",
              maxWidth: "760px",
              background: "var(--cream)",
              borderRadius: "var(--radius-card)",
              padding: "28px 28px",
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            {/* Gift / redeem inline SVG */}
            <span
              aria-hidden="true"
              style={{
                flexShrink: 0,
                width: "40px",
                height: "40px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.7)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--teal-text)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 12v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8" />
                <path d="M2 7h20v5H2z" />
                <path d="M12 21V7" />
                <path d="M12 7S10.5 3 7.5 3 4 5.5 4 5.5 5 7 7.5 7 12 7 12 7z" />
                <path d="M12 7s1.5-4 4.5-4S20 5.5 20 5.5 19 7 16.5 7 12 7 12 7z" />
              </svg>
            </span>
            <p
              style={{
                fontSize: "15px",
                color: "var(--label)",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              <strong style={{ color: "var(--gold)", fontWeight: 600 }}>
                Redeeming is just as easy.
              </strong>{" "}
              The recipient books any treatment at any Carisma Aesthetics clinic in
              Malta and presents the voucher — valid for a full 12 months from purchase.
            </p>
          </div>
        </Reveal>

        {/* ── Inline anchor CTA back to the occasion grid ── */}
        <Reveal delay={140}>
          <p className="text-center" style={{ marginTop: "clamp(28px, 4vw, 40px)" }}>
            <a
              href="#pick-occasion"
              className="font-display link-underline"
              style={{
                display: "inline-block",
                fontSize: "13px",
                color: "var(--teal-text)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Pick an occasion &rarr;
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
