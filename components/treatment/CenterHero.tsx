import HeroMotif from "@/components/motion/HeroMotif";

/* ──────────────────────────────────────────────────────────────────────────
   CenterHero — a CENTER-ALIGNED above-the-fold variant for Carisma Aesthetics
   treatment pages, built as an isolated alternative to the live left-text /
   right-photo <PageHero>. Everything sits on a single vertical axis:

     small badge / eyebrow
       → Trajan sentence-case H1  (the page's single <h1>)
         → optional one-line subtitle
           → body paragraph (constrained measure, centred)
             → prices as a centred chip row (sits on top of the CTAs)
               → two CTAs side-by-side (primary teal-glow + secondary outline)
                 → rating proof line (star reviews)
                   → TREATMENT INFO metric strip (directly under the reviews)
                     → centred hero photo in the brand arch, constellation behind

   Tokens & conventions match PageHero exactly: two-tone teal-blue headline,
   Novecento eyebrows, Roboto body, the arch radius + floating proof language,
   `.hero-fit` nav clearance, `.btn .btn-teal` primary CTA, `.hero-outline`
   secondary CTA. Reduced-motion safe (HeroMotif paints one static frame),
   44px tap targets, stays a server component (HeroMotif is the only client
   child). Allowed to grow / scroll on shorter viewports so the whole
   composition stays visible.
   ────────────────────────────────────────────────────────────────────────── */

const ARCH_RADIUS = "220px 220px 18px 18px";
const SERIF = '"Trajan Pro", Georgia, serif';
const WIDE = '"Novecento Wide", sans-serif';
const BODY = "Roboto, sans-serif";

// Two-tone teal-blue headline split (identical to PageHero): deep base line +
// lighter "em" line, both AA (>=4.5:1) on the pale hero ground.
const TEAL_DEEP = "#27484a";
const TEAL_LIGHT = "#4f7373";

// Metric strip colours — mirror TreatmentPage's InfoCard:
// text uses taupe (#756758, AA on the pale ground); icon strokes use teal-deep
// (#3f6363, >=3:1 graphical-object bar, WCAG 1.4.11).
const INFO_COLOR = "#756758";
const INFO_ICON = "#3f6363";

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

/* MetricIcon — the same icon set TreatmentPage uses for the TREATMENT INFO
   card, so the centred metric strip reads as the established treatment-info
   language. Stroke = teal-deep; decorative (aria-hidden). */
function MetricIcon({ metric }: { metric: string }) {
  const m = metric.toLowerCase();
  const common = {
    width: 30,
    height: 30,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: INFO_ICON,
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
        <text x="8" y="15" fontSize="6" fill={INFO_ICON} stroke="none">
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
  image,
  ctaPrimary,
  ctaSecondary,
}: CenterHeroProps) {
  const sectionBg = "radial-gradient(120% 90% at 50% 8%, #eef3f3 0%, #f6f4ef 45%, #ffffff 100%)";
  const archBg = "linear-gradient(160deg, var(--teal-100) 0%, var(--gray-100) 55%, var(--beige) 100%)";

  return (
    <section
      className="hero-fit center-hero"
      style={{
        position: "relative",
        overflow: "hidden",
        paddingInline: "clamp(16px,4vw,40px)",
        background: sectionBg,
        // Center-aligned axis: stack everything and centre on the cross-axis.
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      {/* Animated constellation — same lattice as PageHero, deeper teal so it
          reads over the pale teal-mist bed. Reduced-motion → one static frame. */}
      <HeroMotif color="116, 156, 156" />
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 540,
          height: 540,
          borderRadius: "50%",
          background: "rgba(150,178,178,0.26)",
          filter: "blur(96px)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 980,
          marginInline: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* badge / eyebrow */}
        {badge && (
          <span className="hero-pill" style={{ marginBottom: "clamp(14px,2vh,20px)" }}>
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

        {/* H1 — the page's single <h1>, Trajan sentence case carrying the deep
            teal; balanced so it never orphans a lone word. */}
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(30px,4.6vw,52px)",
            lineHeight: 1.08,
            color: TEAL_DEEP,
            margin: 0,
            maxWidth: 820,
            textWrap: "balance",
          }}
        >
          {title}
        </h1>

        {/* optional one-line subtitle */}
        {subtitle && (
          <p
            style={{
              fontFamily: BODY,
              fontSize: "clamp(15px,1.4vw,18px)",
              fontWeight: 400,
              lineHeight: 1.5,
              color: TEAL_LIGHT,
              maxWidth: 620,
              margin: "clamp(12px,1.8vh,18px) auto 0",
              textWrap: "pretty",
            }}
          >
            {subtitle}
          </p>
        )}

        {/* body paragraph — constrained ~640px measure, centred */}
        {body && (
          <p
            style={{
              fontFamily: BODY,
              fontSize: "clamp(14px,1.05vw,15.5px)",
              fontWeight: 400,
              lineHeight: 1.65,
              color: "var(--muted)",
              maxWidth: 640,
              margin: "clamp(14px,2vh,20px) auto 0",
              textWrap: "pretty",
            }}
          >
            {body}
          </p>
        )}

        {/* prices — centred chip row, brought up to sit on top of the CTAs */}
        {prices && prices.length > 0 && (
          <div
            aria-label="Treatment pricing"
            style={{
              marginTop: "clamp(16px,2.2vh,24px)",
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              justifyContent: "center",
              maxWidth: 820,
            }}
          >
            {prices.map((p) => (
              <span
                key={p.label}
                style={{
                  display: "inline-flex",
                  alignItems: "baseline",
                  gap: 8,
                  padding: "9px 16px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.72)",
                  border: "1px solid rgba(79,115,115,0.22)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                }}
              >
                <span style={{ fontFamily: BODY, fontSize: 12.5, color: "var(--muted)", lineHeight: 1.2 }}>
                  {p.label}
                </span>
                <span
                  className="font-display"
                  style={{ fontSize: 12, color: TEAL_DEEP, letterSpacing: "0.04em", lineHeight: 1.2 }}
                >
                  {p.price}
                </span>
              </span>
            ))}
          </div>
        )}

        {/* two CTAs side-by-side — primary teal-glow + secondary outline.
            Primary → Fresha (new tab); secondary → /consultation (internal,
            opens the site-wide ConsultationModal). 44px tap targets. */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            justifyContent: "center",
            alignItems: "center",
            margin: "clamp(16px,2.4vh,24px) 0 0",
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
          <a
            href={ctaSecondary.href}
            className="hero-outline"
            style={{ minHeight: 44 }}
          >
            {ctaSecondary.text}
          </a>
        </div>

        {/* rating proof line — centred, mirrors PageHero */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "clamp(14px,2vh,18px)",
          }}
        >
          <Stars size={14} />
          <span style={{ fontFamily: BODY, fontSize: 13, color: "var(--muted)" }}>
            <strong style={{ color: TEAL_DEEP, fontWeight: 600 }}>4.9</strong> · 200+ verified client reviews
          </span>
        </div>

        {/* TREATMENT INFO — centred metric strip, sits directly under the star
            reviews and before the photo. The 5 metrics in one row (icon →
            metric → detail), wrapping gracefully on mobile. */}
        {info && info.length > 0 && (
          <div
            aria-label="Treatment info"
            style={{
              marginTop: "clamp(20px,2.8vh,30px)",
              width: "100%",
              maxWidth: 860,
              marginInline: "auto",
              padding: "20px clamp(14px,2.4vw,26px)",
              borderRadius: "var(--radius-card)",
              background: "rgba(150,178,178,0.12)",
              border: "1px solid rgba(150,178,178,0.35)",
            }}
          >
            <div
              className="font-display"
              style={{ fontSize: 11, color: INFO_COLOR, letterSpacing: "0.14em", marginBottom: 16 }}
            >
              Treatment Info
            </div>
            <div className="center-hero__metrics">
              {info.map((it) => (
                <div
                  key={it.metric}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    textAlign: "center",
                    minWidth: 0,
                  }}
                >
                  <MetricIcon metric={it.metric} />
                  <span
                    className="font-display"
                    style={{ fontSize: 10.5, color: INFO_COLOR, letterSpacing: "0.1em", lineHeight: 1.3 }}
                  >
                    {it.metric}
                  </span>
                  <span style={{ fontFamily: BODY, fontSize: 13, color: INFO_COLOR, lineHeight: 1.3 }}>
                    {it.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* centred hero photo in the brand arch — constellation drifts behind it.
            Floating proof pills are spread on a diagonal (award upper-right,
            doctor-led mid-left) so they never stack on top of each other. */}
        {image && (
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              marginTop: "clamp(24px,3.4vh,40px)",
            }}
          >
            <div
              style={{
                position: "relative",
                height: "min(38vh, 360px)",
                aspectRatio: "4 / 5",
                maxWidth: "100%",
                borderRadius: ARCH_RADIUS,
                overflow: "hidden",
                background: archBg,
                boxShadow: "0 24px 60px rgba(28,30,30,0.16)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={`${title} — Carisma Aesthetics Malta`}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            {/* doctor-led pill — mid-left of the arch, pushed out & down */}
            <div
              className="hero-glass float-b"
              style={{
                position: "absolute",
                left: "clamp(-24px,-3vw,-8px)",
                top: "44%",
                borderRadius: 999,
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                gap: 7,
                zIndex: 3,
                animationDelay: "-2.8s",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "rgba(150,178,178,0.22)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke={TEAL_LIGHT} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ fontFamily: WIDE, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: TEAL_DEEP }}>
                Doctor-led
              </span>
            </div>

            {/* award / #1 voted — upper-right of the arch, pushed out & up */}
            <div
              className="hero-glass float-b"
              style={{
                position: "absolute",
                right: "clamp(-24px,-3vw,-8px)",
                top: "-4%",
                borderRadius: 16,
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                maxWidth: 200,
                zIndex: 3,
              }}
            >
              <Stars size={11} />
              <span
                style={{
                  fontFamily: WIDE,
                  fontSize: 9.5,
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
        )}
      </div>

      <style>{`
        /* Center hero overrides .hero-fit's vertical centering so the taller
           centred stack flows from the top (under the fixed nav) and is allowed
           to scroll on shorter viewports instead of clipping. */
        .center-hero.hero-fit {
          align-items: center;
          justify-content: flex-start;
          min-height: 100svh;
        }
        @media (max-height: 900px) {
          .center-hero.hero-fit { min-height: auto; }
        }
        /* Metric strip: 5 across on desktop, wraps gracefully to 2/3 on mobile. */
        .center-hero__metrics {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: clamp(12px, 2vw, 24px);
          align-items: start;
        }
        @media (max-width: 640px) {
          .center-hero__metrics {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            row-gap: 22px;
          }
        }
      `}</style>
    </section>
  );
}
