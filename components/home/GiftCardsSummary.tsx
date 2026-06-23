import Reveal from "@/components/Reveal";

/**
 * GiftCardsSummary — home-page summary of Carisma Aesthetics e-gift vouchers.
 *
 * A premium, award-winning teal/blue section that mirrors the Slimming home
 * rhythm and sits as a sibling to the Membership summary (stacked below it).
 * It distils the full /e-giftcards-vouchers page into: a "give the gift of
 * aesthetics" promise, a 3-step "how it works", a row of occasions, and a
 * single clear CTA to the gift cards page.
 *
 * Server component — no client JS. Hover lift comes from the shared `.card`
 * rule; the CTA shine comes from the shared `.btn-teal` (`.btn::after`) rule.
 * Palette: teal/blue only (--teal-deep #4f7373, --teal-text #406060,
 * --teal #96b2b2, --teal-100 #deebeb). Body text is neutral grey, normal
 * weight. No gold / cream-warm / brown, no bold body copy.
 */

const GIFTS_HREF = "/e-giftcards-vouchers";

// Inline stroke icons — stroke=currentColor, coloured by the medallion wrapper.
const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

type Step = { n: string; title: string; body: string; icon: React.ReactNode };

const STEPS: Step[] = [
  {
    n: "01",
    title: "Pick the Occasion",
    body: "Birthday, thank you, Mother's Day, a wedding — choose the card that fits the moment.",
    icon: (
      <svg {...iconProps}>
        <path d="M20 12v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8" />
        <path d="M2 7h20v5H2z" />
        <path d="M12 21V7" />
        <path d="M12 7S10.5 3 7.5 3 4 5.5 4 5.5 5 7 7.5 7 12 7 12 7z" />
        <path d="M12 7s1.5-4 4.5-4S20 5.5 20 5.5 19 7 16.5 7 12 7 12 7z" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Personalise It",
    body: "Choose the amount and add a heartfelt message so it feels like it came straight from you.",
    icon: (
      <svg {...iconProps}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Delivered Instantly",
    body: "Your e-voucher arrives by email within moments — beautifully presented, ready to gift.",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
];

const OCCASIONS = [
  "Birthday",
  "Just For You",
  "Thank You",
  "Mother's Day",
  "Anniversary",
  "Wedding",
  "Valentine's Day",
  "Christmas",
];

export default function GiftCardsSummary() {
  return (
    <section
      aria-labelledby="gift-summary-heading"
      style={{
        /* Cool teal ground to echo the Slimming/Membership rhythm — white → light teal → mist */
        background:
          "linear-gradient(180deg, var(--white) 0%, var(--teal-100) 55%, var(--cream-2) 100%)",
        padding: "clamp(72px, 9vw, 120px) 0",
        scrollMarginTop: "var(--nav-clear)",
      }}
    >
      <div className="container">
        {/* ── Heading block ── */}
        <Reveal>
          <div
            className="text-center mx-auto"
            style={{ maxWidth: "680px" }}
          >
            <span
              className="font-display"
              style={{
                display: "inline-block",
                fontSize: "12px",
                color: "var(--teal-text)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "14px",
              }}
            >
              E-Gift Vouchers
            </span>
            <h2
              id="gift-summary-heading"
              className="font-serif"
              style={{
                fontSize: "clamp(26px, 4vw, 40px)",
                color: "var(--teal-deep)",
                letterSpacing: "0.03em",
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              Give the Gift of Aesthetics
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto"
              style={{
                width: "96px",
                height: "1px",
                background: "var(--teal)",
                opacity: 0.7,
                margin: "20px auto 0",
              }}
            />
            <p
              style={{
                marginTop: "22px",
                fontSize: "16px",
                color: "var(--muted)",
                lineHeight: 1.75,
              }}
            >
              The effortless way to give a glow they will remember. A Carisma
              Aesthetics e-voucher is delivered instantly, valid for a full 12
              months, and redeemable on any treatment at any of our clinics in
              Malta.
            </p>
          </div>
        </Reveal>

        {/* ── 3-step "how it works" ── */}
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
              <Reveal delay={(i % 3) * 80}>
                <div
                  className="card"
                  style={{
                    height: "100%",
                    padding: "34px 28px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {/* Icon medallion — light teal ground, deep-teal stroke (AA) */}
                  <span
                    aria-hidden="true"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "54px",
                      height: "54px",
                      borderRadius: "999px",
                      background: "var(--teal-100)",
                      color: "var(--teal-deep)",
                      marginBottom: "18px",
                    }}
                  >
                    {s.icon}
                  </span>

                  <span
                    className="font-serif"
                    aria-hidden="true"
                    style={{
                      display: "block",
                      fontSize: "13px",
                      color: "var(--teal-text)",
                      letterSpacing: "0.18em",
                      marginBottom: "8px",
                    }}
                  >
                    {s.n}
                  </span>

                  <h3
                    className="font-display"
                    style={{
                      fontSize: "14px",
                      color: "var(--teal-deep)",
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
                      fontSize: "14.5px",
                      color: "var(--muted)",
                      lineHeight: 1.7,
                      margin: "12px 0 0",
                    }}
                  >
                    {s.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* ── Occasions row — a glance at what's inside ── */}
        <Reveal delay={80}>
          <div
            className="mx-auto text-center"
            style={{ maxWidth: "820px", marginTop: "clamp(40px, 6vw, 60px)" }}
          >
            <p
              className="font-display"
              style={{
                fontSize: "12px",
                color: "var(--teal-text)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "18px",
              }}
            >
              A Card for Every Occasion
            </p>
            <ul
              role="list"
              className="flex flex-wrap justify-center"
              style={{ gap: "10px 12px", padding: 0, margin: 0 }}
            >
              {OCCASIONS.map((label) => (
                <li
                  key={label}
                  className="font-display"
                  style={{
                    fontSize: "12.5px",
                    color: "var(--teal-text)",
                    letterSpacing: "0.06em",
                    border: "1px solid rgba(79,115,115,0.28)",
                    borderRadius: "999px",
                    padding: "8px 16px",
                    background: "var(--white)",
                  }}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* ── CTA — shine comes from .btn-teal (.btn::after) ── */}
        <Reveal delay={140}>
          <div className="text-center" style={{ marginTop: "clamp(36px, 5vw, 52px)" }}>
            <a
              href={GIFTS_HREF}
              className="btn-teal font-display"
              style={{ letterSpacing: "0.1em" }}
            >
              Shop Gift Vouchers
            </a>
            <p
              style={{
                marginTop: "16px",
                fontSize: "12.5px",
                color: "var(--label)",
                letterSpacing: "0.04em",
                lineHeight: 1.7,
              }}
            >
              Delivered instantly by email · Valid 12 months · Redeemable at every
              Carisma Aesthetics clinic in Malta
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
