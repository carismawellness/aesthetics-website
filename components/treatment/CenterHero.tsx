import HeroMotif from "@/components/motion/HeroMotif";

/* ──────────────────────────────────────────────────────────────────────────
   CenterHero — a MAGAZINE-STYLE above-the-fold variant for Carisma Aesthetics
   treatment pages (the isolated /preview/wrinkle-center alternative to the live
   left-text / right-photo <PageHero>).

   Editorial, not centred: a single clean flush-LEFT column (consistent left
   border, tightened rhythm — like a magazine spread), with:
     badge → big Trajan headline → subtitle → body → prices as a vertical bullet
     list → two CTAs → star-review proof line.
   The two social-proof pills are pulled out to the far LEFT and RIGHT page
   margins (filling the side whitespace and framing the column), which makes a
   hero photo redundant — so there is no image.

   Tokens & conventions match PageHero: two-tone teal-blue headline, Novecento
   eyebrows, Roboto body, `.hero-fit` nav clearance, `.btn .btn-teal` primary,
   `.hero-outline` secondary, the floating-proof glass language. Reduced-motion
   safe (HeroMotif paints one static frame), 44px tap targets, server component.
   ────────────────────────────────────────────────────────────────────────── */

const SERIF = '"Trajan Pro", Georgia, serif';
const WIDE = '"Novecento Wide", sans-serif';
const BODY = "Roboto, sans-serif";

// Two-tone teal-blue headline (identical to PageHero), AA on the pale ground.
const TEAL_DEEP = "#27484a";
const TEAL_LIGHT = "#4f7373";

// Metric / proof colours mirror the live InfoCard tokens.
const INFO_COLOR = "#756758";

export type CenterHeroPrice = { label: string; price: string };
export type CenterHeroInfo = { metric: string; detail: string };
export type CenterHeroCta = { text: string; href: string };

export type CenterHeroProps = {
  badge?: string;
  title: string;
  subtitle?: string;
  body?: string;
  prices?: CenterHeroPrice[];
  info?: CenterHeroInfo[];
  image?: string;
  ctaPrimary: CenterHeroCta;
  ctaSecondary: CenterHeroCta;
};

function MetricIcon({ metric }: { metric: string }) {
  const m = metric.toLowerCase();
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#3f6363",
    strokeWidth: 1.4,
    "aria-hidden": true as const,
  } as const;
  if (m.includes("time") || m.includes("duration"))
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  if (m.includes("downtime") || m.includes("recovery"))
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4" />
        <text x="8" y="15" fontSize="6" fill="#3f6363" stroke="none">
          24
        </text>
      </svg>
    );
  if (m.includes("last") || m.includes("results last"))
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    );
  if (m.includes("visible"))
    return (
      <svg {...common}>
        <circle cx="12" cy="16" r="5" />
        <path d="M12 3v5M8 5l2.5 2.5M16 5l-2.5 2.5" />
      </svg>
    );
  if (m.includes("anaesth") || m.includes("anesth"))
    return (
      <svg {...common}>
        <path d="M6 18l3-8 3 4 2-3 4 7" />
        <circle cx="18" cy="6" r="2" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function Stars({ size = 14 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 1, color: "var(--gold-deep)" }} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export default function CenterHero({
  badge,
  title,
  subtitle,
  body,
  prices,
  info,
  ctaPrimary,
  ctaSecondary,
}: CenterHeroProps) {
  const sectionBg = "radial-gradient(120% 90% at 50% 8%, #eef3f3 0%, #f6f4ef 45%, #ffffff 100%)";

  return (
    <section
      className="hero-fit mag-hero"
      style={{
        position: "relative",
        overflow: "hidden",
        paddingInline: "clamp(16px,4vw,40px)",
        background: sectionBg,
        flexDirection: "column",
        textAlign: "left",
      }}
    >
      {/* Animated constellation — deeper teal so it reads over the pale bed. */}
      <HeroMotif color="116, 156, 156" />
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "-12%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 620,
          height: 620,
          borderRadius: "50%",
          background: "rgba(150,178,178,0.22)",
          filter: "blur(110px)",
          zIndex: 0,
        }}
      />

      {/* ── Social-proof pills pulled to the page margins (desktop) / inline row
            (mobile). They frame the column and fill the side whitespace. ── */}
      <div className="mag-proof">
        <div className="mag-proof__pill mag-proof__left hero-glass float-b">
          <span
            aria-hidden
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "rgba(150,178,178,0.22)",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke={TEAL_LIGHT} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span style={{ fontFamily: WIDE, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: TEAL_DEEP }}>
            Doctor-led
          </span>
        </div>
        <div className="mag-proof__pill mag-proof__right hero-glass float-b" style={{ animationDelay: "-2.8s" }}>
          <Stars size={12} />
          <span
            style={{
              fontFamily: WIDE,
              fontSize: 10,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: "var(--ink)",
              lineHeight: 1.35,
              whiteSpace: "pre-line",
              fontWeight: 600,
            }}
          >
            {"#1 Voted Clinic\nMalta Healthcare Awards"}
          </span>
        </div>
      </div>

      {/* ── The editorial column — flush left, tight rhythm ── */}
      <div
        className="mag-col"
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 740,
          marginInline: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {badge && (
          <span className="hero-pill" style={{ marginBottom: 18 }}>
            <span
              style={{
                fontFamily: WIDE,
                fontSize: 10.5,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: TEAL_DEEP,
              }}
            >
              {badge}
            </span>
          </span>
        )}

        {/* H1 — the page's single <h1>, big editorial Trajan, flush left. */}
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(34px,5.2vw,60px)",
            lineHeight: 1.04,
            color: TEAL_DEEP,
            margin: 0,
            textWrap: "balance",
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            style={{
              fontFamily: BODY,
              fontSize: "clamp(15px,1.4vw,18px)",
              fontWeight: 400,
              lineHeight: 1.5,
              color: TEAL_LIGHT,
              maxWidth: 600,
              margin: "14px 0 0",
              textWrap: "pretty",
            }}
          >
            {subtitle}
          </p>
        )}

        {body && (
          <p
            style={{
              fontFamily: BODY,
              fontSize: "clamp(14px,1.05vw,15.5px)",
              fontWeight: 400,
              lineHeight: 1.65,
              color: "var(--muted)",
              maxWidth: 600,
              margin: "16px 0 0",
              textWrap: "pretty",
            }}
          >
            {body}
          </p>
        )}

        {/* prices — clean vertical bullet list, flush left */}
        {prices && prices.length > 0 && (
          <ul
            aria-label="Treatment pricing"
            style={{
              listStyle: "none",
              margin: "22px 0 0",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 11,
              width: "100%",
              maxWidth: 560,
            }}
          >
            {prices.map((p) => (
              <li key={p.label} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <span
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: TEAL_LIGHT,
                    transform: "translateY(-2px)",
                  }}
                />
                <span style={{ fontFamily: BODY, fontSize: 15, color: "var(--ink)", lineHeight: 1.4 }}>
                  {p.label}
                  <span className="font-display" style={{ color: TEAL_DEEP, letterSpacing: "0.02em", marginLeft: 8, whiteSpace: "nowrap" }}>
                    {p.price}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* two CTAs — flush left */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            justifyContent: "flex-start",
            alignItems: "center",
            margin: "26px 0 0",
          }}
        >
          <a
            href={ctaPrimary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-teal"
            style={{ borderRadius: 999, padding: "15px 30px", minHeight: 44 }}
          >
            {ctaPrimary.text}
          </a>
          <a href={ctaSecondary.href} className="hero-outline" style={{ minHeight: 44 }}>
            {ctaSecondary.text}
          </a>
        </div>

        {/* rating proof line — flush left */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            justifyContent: "flex-start",
            flexWrap: "wrap",
            marginTop: 18,
          }}
        >
          <Stars size={14} />
          <span style={{ fontFamily: BODY, fontSize: 13, color: "var(--muted)" }}>
            <strong style={{ color: TEAL_DEEP, fontWeight: 600 }}>4.9</strong> · 200+ verified client reviews
          </span>
        </div>

        {/* TREATMENT INFO — a tidy left-aligned metric strip closes the column */}
        {info && info.length > 0 && (
          <div
            aria-label="Treatment info"
            style={{
              marginTop: 26,
              width: "100%",
              padding: "18px clamp(16px,2vw,24px)",
              borderRadius: "var(--radius-card)",
              background: "rgba(150,178,178,0.10)",
              border: "1px solid rgba(150,178,178,0.32)",
            }}
          >
            <div className="mag-metrics">
              {info.map((it) => (
                <div key={it.metric} style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <MetricIcon metric={it.metric} />
                  <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                    <span className="font-display" style={{ fontSize: 10, color: INFO_COLOR, letterSpacing: "0.08em", lineHeight: 1.3 }}>
                      {it.metric}
                    </span>
                    <span style={{ fontFamily: BODY, fontSize: 13.5, color: TEAL_DEEP, lineHeight: 1.3, fontWeight: 500 }}>
                      {it.detail}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        /* Magazine hero: flow from the top under the fixed nav, tightened. */
        .mag-hero.hero-fit {
          align-items: center;
          justify-content: center;
          min-height: 100svh;
        }
        @media (max-height: 860px) {
          .mag-hero.hero-fit { min-height: auto; padding-top: calc(var(--nav-clear) + 28px); padding-bottom: 56px; }
        }
        /* Proof pills: inline centred row on mobile; pinned to the page margins
           (framing the column) from 1024px up. */
        .mag-proof {
          display: flex; flex-wrap: wrap; gap: 12px;
          justify-content: center; margin: 0 auto 22px;
          position: relative; z-index: 1;
        }
        .mag-proof__pill {
          display: inline-flex; align-items: center; gap: 8px;
          border-radius: 999px; padding: 9px 15px; max-width: 230px;
        }
        .mag-proof__right { border-radius: 16px; }
        @media (min-width: 1024px) {
          .mag-proof { display: contents; }
          .mag-proof__left  { position: absolute; left:  clamp(24px, 6vw, 120px); top: 46%; margin: 0; z-index: 2; }
          .mag-proof__right { position: absolute; right: clamp(24px, 6vw, 110px); top: 33%; margin: 0; z-index: 2; }
        }
        /* Metric strip inside the column: 5-across desktop, 2-up mobile. */
        .mag-metrics {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: clamp(12px, 1.6vw, 22px);
          align-items: center;
        }
        @media (max-width: 720px) {
          .mag-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 16px; }
        }
      `}</style>
    </section>
  );
}
