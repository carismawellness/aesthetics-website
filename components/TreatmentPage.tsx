import Link from "next/link";
import Image from "next/image";
import type { Treatment } from "@/lib/treatments";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import BeforeAfterCarousel from "@/components/BeforeAfterCarousel";
import CompositeSlideshow from "@/components/CompositeSlideshow";
import VideoPlayer from "@/components/VideoPlayer";
import SuitabilityCards from "@/components/treatment/SuitabilityCards";
import RecommendedCards from "@/components/treatment/RecommendedCards";
import TreatmentFaq from "@/components/treatment/TreatmentFaq";

// Fallback hero image when a treatment defines neither image nor video.
const HERO_FALLBACK_IMAGE = "/assets/hero-bg.png";

// Split the treatment title into at most two headline lines for PageHero, with
// the last line rendered teal (em). Keeps the primary keyword + "Malta" intact.
function splitHeadline(title: string): { text: string; em?: boolean }[] {
  const words = title.trim().split(/\s+/);
  if (words.length <= 1) return [{ text: title, em: true }];
  // Break near the middle so neither line is a lone word where avoidable.
  const breakAt = Math.ceil(words.length / 2);
  const first = words.slice(0, breakAt).join(" ");
  const second = words.slice(breakAt).join(" ");
  return [{ text: first }, { text: second, em: true }];
}

// First sentence of a paragraph (used as the hero sub when there's no subtitle).
function firstSentence(text: string): string {
  const m = text.match(/^(.*?[.!?])(\s|$)/);
  return (m ? m[1] : text).trim();
}

// P1 — accessible colors: text uses taupe (#756758, 5.0:1 on card bg);
// icon strokes use teal-deep (#3f6363, 6.1:1) so graphical objects clear 3:1 (WCAG 1.4.11).
const INFO_COLOR = "#756758";
const INFO_ICON = "#3f6363";

function MetricIcon({ metric }: { metric: string }) {
  const m = metric.toLowerCase();
  const common = {
    width: 28,
    height: 28,
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

function InfoCard({ info }: { info: NonNullable<Treatment["info"]> }) {
  return (
    // P10 — pricing/info section aria-label for screen readers
    <div
      aria-label="Treatment info"
      className="rounded-2xl"
      style={{
        background: "rgba(150,178,178,0.12)",
        border: "1px solid rgba(150,178,178,0.35)",
        padding: "22px 26px",
      }}
    >
      <div
        className="font-display"
        style={{ fontSize: "12px", color: INFO_COLOR, letterSpacing: "0.14em", marginBottom: "18px" }}
      >
        TREATMENT INFO
      </div>
      {info.map((it, i) => (
        <div
          key={it.metric}
          className="flex items-center justify-between gap-4"
          style={{ padding: "11px 0", borderTop: i === 0 ? "none" : `1px solid rgba(150,178,178,0.25)` }}
        >
          <span className="flex items-center gap-3">
            <MetricIcon metric={it.metric} />
            <span
              className="font-display"
              style={{ fontSize: "11px", color: INFO_COLOR, letterSpacing: "0.1em" }}
            >
              {it.metric}
            </span>
          </span>
          <span style={{ fontSize: "13px", color: INFO_COLOR, textAlign: "right" }}>{it.detail}</span>
        </div>
      ))}
    </div>
  );
}

export default function TreatmentPage({ t }: { t: Treatment }) {
  const hasImage = Boolean(t.hero.image);
  const hasMedia = hasImage || Boolean(t.hero.heroVideo);

  // Lift the price list into the hero's left column so it reads above the fold
  // (PageHero already renders `bullets`). Benefit bullets first, then one bullet
  // per price — label = treatment, text = price — keeping the keyword + Malta H1.
  const benefitBullets =
    t.hero.benefits && t.hero.benefits.length > 0
      ? t.hero.benefits.map((b) => ({ text: b }))
      : [];
  const priceBullets =
    t.hero.prices && t.hero.prices.length > 0
      ? t.hero.prices.map((p) => ({ label: p.label, text: p.price }))
      : [];
  const heroBullets = [...benefitBullets, ...priceBullets];

  return (
    // P1 — <main> landmark wrapping all page content
    <main>
      {/* ── Hero — shared <PageHero> (one <h1>, primary keyword + Malta) ── */}
      <PageHero
        badge="#1 Voted Med-Aesthetics Clinic"
        headline={splitHeadline(t.hero.title)}
        compactHeadline={t.hero.title.length > 22}
        sub={t.hero.subtitle ?? (t.hero.body ? firstSentence(t.hero.body) : undefined)}
        bullets={heroBullets.length > 0 ? heroBullets : undefined}
        primaryCta={{ text: t.hero.cta ?? "Book Your Consultation", href: "/consultation" }}
        secondaryCta={{ text: "View Treatments", href: "/face-treatments" }}
        media={
          t.hero.heroVideo
            ? {
                type: "video",
                src: t.hero.heroVideo,
                poster: t.hero.image,
                alt: `${t.hero.title} treatment video`,
              }
            : t.hero.image
              ? {
                  type: "image",
                  src: t.hero.image,
                  alt: `${t.hero.title} — Carisma Aesthetics Malta`,
                  aspect: t.hero.imageRatio,
                }
              : {
                  type: "image",
                  src: HERO_FALLBACK_IMAGE,
                  alt: `${t.hero.title} — Carisma Aesthetics Malta`,
                }
        }
        proof={{
          rating: "4.9",
          reviews: "200+",
          statValue: "30+",
          statLabel: "years in wellness",
          awardText: "#1 Voted Clinic\nMalta Healthcare Awards",
        }}
      />

      {/* ── Hero detail strip — sits tight under the hero (minimal top padding so
             it reads above the fold): supporting copy on the left, the TREATMENT
             INFO card on the right. Prices now live in the hero bullets; the
             product tabs, brand logos, and duplicate Google-rating block have
             been removed. ── */}
      {(t.hero.location ||
        t.hero.body ||
        t.hero.note ||
        (t.info && hasMedia) ||
        t.pending) && (
        <section
          aria-label="Treatment overview"
          style={{ padding: "clamp(20px,3vh,36px) 0 clamp(40px,5vh,64px)" }}
        >
          <div className="container">
            <div className="mx-auto" style={{ maxWidth: "1100px" }}>
              <div className="grid gap-8 md:grid-cols-2 items-start">
                {/* Left: supporting copy */}
                <Reveal>
                  {t.hero.location && (
                    <p
                      className="font-display"
                      style={{
                        fontSize: "12px",
                        // P1 — teal-text #406060 = 5.76:1 — passes AA
                        color: "var(--teal-text)",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        marginBottom: "12px",
                      }}
                    >
                      {t.hero.location}
                    </p>
                  )}

                  {t.hero.body && (
                    // P6 — max-width prose for comfortable line length
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--label)",
                        lineHeight: 1.625,
                        marginBottom: "16px",
                        maxWidth: "72ch",
                      }}
                    >
                      {t.hero.body}
                    </p>
                  )}

                  {t.hero.note && (
                    <p
                      style={{
                        marginTop: "16px",
                        fontSize: "12px",
                        // P1 — ink-soft is 12:1 — passes AA
                        color: "var(--ink-soft)",
                        lineHeight: 1.6,
                      }}
                    >
                      {t.hero.note}
                    </p>
                  )}

                  {t.pending && (
                    <p
                      style={{
                        marginTop: "24px",
                        fontSize: "12px",
                        color: "var(--ink-soft)",
                        fontStyle: "italic",
                      }}
                    >
                      Detailed treatment information for this page is being finalised.
                    </p>
                  )}
                </Reveal>

                {/* Right: treatment-info card */}
                {t.info && hasMedia && (
                  <Reveal delay={120}>
                    <InfoCard info={t.info} />
                  </Reveal>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Before / After carousel — moved up to sit immediately under the
             above-the-fold (hero + info strip), before everything else. Shows
             all before/after pairs. ── */}
      {(t.beforeAfter || t.beforeAfterTitle) && (
        <section aria-label="Before and after results" style={{ padding: "70px 0" }}>
          {t.beforeAfter && t.beforeAfter.length > 0 ? (
            <BeforeAfterCarousel pairs={t.beforeAfter} title={t.beforeAfterTitle} />
          ) : (
            <div className="container text-center">
              {t.beforeAfterTitle && (
                <h2
                  className="font-display"
                  style={{
                    fontSize: "clamp(20px,3vw,30px)",
                    color: "var(--label)",
                    marginBottom: "36px",
                    lineHeight: 1.25,
                  }}
                >
                  {t.beforeAfterTitle}
                </h2>
              )}
              <div className="grid gap-4 sm:grid-cols-3">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="flex items-center justify-center"
                    style={{
                      aspectRatio: "4/3",
                      backgroundColor: "var(--white)",
                      border: "1px solid var(--line)",
                      borderRadius: "var(--radius-card)",
                      color: "var(--muted)",
                      fontSize: "13px",
                    }}
                  >
                    Before / After {n}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── Treatment info — horizontal info-bar fallback when there is no media
             (the card form now lives in the hero overview strip above) ── */}
      {t.info && !hasMedia && (
        <section aria-label="Treatment information" style={{ padding: "clamp(28px,4vh,48px) 0" }}>
          <div className="container">
            <div className="card mx-auto" style={{ padding: "22px 20px", maxWidth: "900px" }}>
              <div
                className="grid gap-6 text-center"
                style={{ gridTemplateColumns: `repeat(${Math.min(t.info.length, 5)}, minmax(0,1fr))` }}
              >
                {t.info.map((it) => (
                  <div key={it.metric}>
                    <div
                      className="font-display"
                      // P1 — teal-text #406060 = 6.86:1 on white .card — passes AA
                      style={{ fontSize: "11px", color: "var(--teal-text)", letterSpacing: "0.14em", marginBottom: "8px" }}
                    >
                      {it.metric}
                    </div>
                    <div style={{ fontSize: "14px", color: "var(--ink)" }}>{it.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Education ── */}
      {t.education && (
        <section
          aria-labelledby="education-heading"
          style={{ padding: "80px 0", backgroundColor: "var(--cream)" }}
        >
          <div className="container">
            <h2
              id="education-heading"
              className="font-serif text-center"
              style={{
                fontSize: "clamp(24px,3.4vw,38px)",
                color: "var(--gold)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                lineHeight: 1.25,
              }}
            >
              {t.education.title}
            </h2>
            {t.education.subtitle && (
              <p
                className="font-display text-center"
                style={{
                  fontSize: "14px",
                  color: "var(--label)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginTop: "12px",
                }}
              >
                {t.education.subtitle}
              </p>
            )}
            <div className="mx-auto" style={{ marginTop: "26px", maxWidth: "820px" }}>
              {t.education.paragraphs.map((p, i) => (
                // P6 — body text line height leading-relaxed (1.625)
                <p
                  key={i}
                  style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.625, marginTop: i === 0 ? 0 : "16px", textAlign: "center" }}
                >
                  {p}
                </p>
              ))}
            </div>
            {t.education.image && (
              <figure className="mx-auto text-center" style={{ marginTop: "48px", maxWidth: "760px" }}>
                {/* P3 — next/image for education diagram */}
                <div className="relative w-full" style={{ borderRadius: "14px", overflow: "hidden" }}>
                  <Image
                    src={t.education.image}
                    // P1 — meaningful alt for educational image
                    alt={t.education.imageCaption ?? "Laser technology diagram"}
                    width={760}
                    height={500}
                    style={{ display: "block", width: "100%", height: "auto" }}
                    sizes="(max-width: 768px) 100vw, 760px"
                  />
                </div>
                {t.education.imageCaption && (
                  <figcaption
                    style={{ fontSize: "13px", color: "var(--label)", lineHeight: 1.6, marginTop: "14px" }}
                  >
                    {t.education.imageCaption}
                  </figcaption>
                )}
              </figure>
            )}
            {t.education.chart && (
              <figure className="mx-auto text-center" style={{ marginTop: "44px", maxWidth: "520px" }}>
                {/* P3 — next/image for suitability chart */}
                <div className="relative w-full" style={{ borderRadius: "14px", overflow: "hidden" }}>
                  <Image
                    src={t.education.chart}
                    alt={t.education.chartCaption ?? "Skin tone and hair colour suitability chart"}
                    width={520}
                    height={400}
                    style={{ display: "block", width: "100%", height: "auto" }}
                    sizes="(max-width: 640px) 100vw, 520px"
                  />
                </div>
                {t.education.chartCaption && (
                  <figcaption
                    style={{ fontSize: "13px", color: "var(--label)", lineHeight: 1.6, marginTop: "14px" }}
                  >
                    {t.education.chartCaption}
                  </figcaption>
                )}
              </figure>
            )}
          </div>
        </section>
      )}

      {/* ── Guarantee ── */}
      {t.guarantee && (
        <section aria-labelledby="guarantee-heading" style={{ padding: "80px 0" }}>
          <div className="container">
            <h2
              id="guarantee-heading"
              className="font-serif text-center"
              style={{
                fontSize: "clamp(24px,3.4vw,38px)",
                color: "var(--gold)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                lineHeight: 1.25,
              }}
            >
              {t.guarantee.title}
            </h2>
            <div className="mx-auto" style={{ marginTop: "24px", maxWidth: "780px" }}>
              {t.guarantee.paragraphs.map((p, i) => (
                <p
                  key={i}
                  style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.625, marginTop: i === 0 ? 0 : "16px", textAlign: "center" }}
                >
                  {p}
                </p>
              ))}
            </div>
            {t.guarantee.cta && (
              <div className="text-center" style={{ marginTop: "30px" }}>
                {/* P2 — min-h-[44px] for CTA tap target */}
                <Link
                  href="/consultation"
                  className="btn btn-teal"
                  style={{ display: "inline-flex", alignItems: "center", minHeight: "44px" }}
                >
                  {t.guarantee.cta}
                </Link>
              </div>
            )}
            {t.guarantee.beforeAfter && t.guarantee.beforeAfter.length > 0 && (
              <div style={{ marginTop: "52px" }}>
                <CompositeSlideshow images={t.guarantee.beforeAfter} title={t.guarantee.beforeAfterTitle} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Precision areas ── */}
      {t.precision && (
        <section aria-labelledby="precision-heading" style={{ padding: "80px 0" }}>
          <div className="container">
            <h2
              id="precision-heading"
              className="font-display text-center"
              style={{ fontSize: "clamp(20px,3vw,30px)", color: "var(--label)", lineHeight: 1.25 }}
            >
              {t.precision.title}
            </h2>
            {t.precision.intro && (
              <p
                className="text-center mx-auto"
                style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.625, marginTop: "16px", maxWidth: "760px" }}
              >
                {t.precision.intro}
              </p>
            )}
            {t.precision.areas && t.precision.areas.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ marginTop: "44px" }}>
                {t.precision.areas.map((a, i) => (
                  <Reveal
                    key={a.name}
                    delay={(i % 4) * 70}
                    className="text-center"
                    style={{
                      background: "linear-gradient(150deg, #ffffff 0%, #eef4f5 55%, #e9f1f2 100%)",
                      padding: "32px 24px",
                      borderRadius: "10px 40px 10px 40px",
                      border: "1px solid var(--line)",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.05)",
                    }}
                  >
                    {a.icon && (
                      <div className="flex justify-center" style={{ marginBottom: "16px" }}>
                        {/* P3 — next/image for area icons */}
                        <Image
                          src={a.icon}
                          alt={a.zone ?? a.name}
                          width={70}
                          height={70}
                          style={{ height: "70px", width: "auto" }}
                        />
                      </div>
                    )}
                    {a.zone && (
                      <div
                        className="font-display"
                        style={{
                          fontSize: "11px",
                          color: "var(--teal-deep)",
                          letterSpacing: "0.16em",
                          marginBottom: "10px",
                        }}
                      >
                        {a.zone}
                      </div>
                    )}
                    <h3
                      className="font-display"
                      style={{
                        fontSize: "15px",
                        color: "var(--label)",
                        letterSpacing: "0.05em",
                        marginBottom: a.desc ? "12px" : "0",
                      }}
                    >
                      {a.name}
                    </h3>
                    {a.desc && (
                      <p style={{ fontSize: "13.5px", color: "var(--label)", lineHeight: 1.625 }}>{a.desc}</p>
                    )}
                  </Reveal>
                ))}
              </div>
            )}
            {t.precision.additional && (
              <div
                className="mx-auto"
                style={{
                  marginTop: "44px",
                  maxWidth: "760px",
                  borderLeftWidth: "4px",
                  borderLeftStyle: "solid",
                  borderLeftColor: "var(--gold)",
                  paddingLeft: "22px",
                }}
              >
                <h3
                  className="font-display"
                  style={{
                    fontSize: "13px",
                    color: "var(--label)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  {t.precision.additionalTitle ?? "Additional Treatment Areas"}
                </h3>
                {t.precision.additionalIntro && (
                  <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.625, marginBottom: "12px" }}>
                    {t.precision.additionalIntro}
                  </p>
                )}
                <p
                  className="font-display"
                  style={{ fontSize: "13px", color: "var(--label)", letterSpacing: "0.06em", textTransform: "uppercase" }}
                >
                  {t.precision.additional}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Suitability — subtle two-column ✓/✗ design (SuitabilityCards) ── */}
      {t.suitability && (
        <SuitabilityCards
          kicker="Is this treatment for you?"
          title={t.suitability.title}
          sub={t.suitability.intro}
          suitableFor={t.suitability.suitableFor ?? []}
          notIdeal={t.suitability.notIdeal ?? []}
        />
      )}

      {/* ── Treatment experience — dashed timeline ── */}
      {t.experience && (
        <section aria-labelledby="experience-heading" style={{ padding: "80px 0" }}>
          <div className="container">
            <h2
              id="experience-heading"
              className="font-serif text-center"
              style={{
                fontSize: "clamp(24px,3.4vw,38px)",
                color: "var(--gold)",
                letterSpacing: "0.06em",
                marginBottom: "56px",
                lineHeight: 1.25,
              }}
            >
              {t.experience.title}
            </h2>

            {/* Mobile layout */}
            <div className="md:hidden" style={{ maxWidth: "480px", margin: "0 auto" }}>
              {t.experience.steps.map((s, i) => (
                <Reveal
                  key={s.title || i}
                  delay={i * 80}
                  style={{ marginBottom: i === t.experience!.steps.length - 1 ? 0 : "32px" }}
                >
                  <div className="flex items-center gap-3" style={{ marginBottom: "14px" }}>
                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        background: "var(--teal)",
                        boxShadow: "0 0 0 5px #dde8e8",
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    />
                    <span
                      className="font-serif"
                      style={{ fontSize: "15px", color: "var(--gold)", letterSpacing: "0.14em" }}
                    >
                      STEP <span style={{ fontSize: "clamp(24px,6vw,34px)", lineHeight: 1 }}>{i + 1}</span>
                    </span>
                  </div>
                  <div
                    style={{
                      borderRadius: "20px 56px 20px 56px",
                      background: "linear-gradient(180deg,#ffffff 0%, #e7eff0 100%)",
                      padding: "10px",
                      boxShadow: "0 16px 38px rgba(0,0,0,0.07)",
                    }}
                  >
                    {s.image && (
                      // P3 — next/image for step images
                      <div
                        className="relative w-full overflow-hidden"
                        style={{ aspectRatio: "9 / 4", borderRadius: "20px 56px 20px 56px" }}
                      >
                        <Image
                          src={s.image}
                          alt={s.title || `Step ${i + 1}`}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 640px) 100vw, 480px"
                        />
                      </div>
                    )}
                    <div style={{ padding: "16px clamp(14px,2vw,22px) 14px" }}>
                      {s.title && (
                        <h3
                          className="font-display text-center"
                          style={{
                            fontSize: "15px",
                            color: "var(--label)",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            marginBottom: s.desc ? "12px" : "0",
                          }}
                        >
                          {s.title}
                        </h3>
                      )}
                      {s.desc && (
                        <p style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.625 }}>{s.desc}</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Desktop layout */}
            <div className="relative mx-auto hidden md:block" style={{ maxWidth: "760px" }}>
              {/* continuous dashed timeline */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "22px",
                  top: "46px",
                  bottom: "46px",
                  borderLeft: "1px dashed #7a9a9a",
                  zIndex: 0,
                }}
              />
              {t.experience.steps.map((s, i) => (
                <Reveal
                  key={s.title || i}
                  delay={i * 80}
                  className="relative grid items-center"
                  style={{
                    gridTemplateColumns: "44px 84px minmax(0, 440px)",
                    columnGap: "22px",
                    marginBottom: i === t.experience!.steps.length - 1 ? 0 : "40px",
                  }}
                >
                  {/* timeline node */}
                  <div className="flex justify-center" style={{ position: "relative", zIndex: 1 }}>
                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        background: "var(--teal)",
                        boxShadow: "0 0 0 5px #dde8e8",
                      }}
                      aria-hidden="true"
                    />
                  </div>
                  {/* STEP + number */}
                  <div className="text-center">
                    <div className="font-serif" style={{ fontSize: "17px", color: "var(--gold)", letterSpacing: "0.14em" }}>
                      STEP
                    </div>
                    <div
                      className="font-serif"
                      style={{ fontSize: "clamp(30px,4vw,46px)", color: "var(--gold)", lineHeight: 1.1 }}
                    >
                      {i + 1}
                    </div>
                  </div>
                  {/* photo card */}
                  <div
                    style={{
                      borderRadius: "20px 56px 20px 56px",
                      background: "linear-gradient(180deg,#ffffff 0%, #e7eff0 100%)",
                      padding: "10px",
                      boxShadow: "0 16px 38px rgba(0,0,0,0.07)",
                    }}
                  >
                    {s.image && (
                      // P3 — next/image for desktop step images
                      <div
                        className="relative w-full overflow-hidden"
                        style={{ aspectRatio: "9 / 4", borderRadius: "20px 56px 20px 56px" }}
                      >
                        <Image
                          src={s.image}
                          alt={s.title || `Step ${i + 1}`}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="440px"
                        />
                      </div>
                    )}
                    <div style={{ padding: "16px clamp(14px,2vw,22px) 14px" }}>
                      {s.title && (
                        <h3
                          className="font-display text-center"
                          style={{
                            fontSize: "15px",
                            color: "var(--label)",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            marginBottom: s.desc ? "12px" : "0",
                          }}
                        >
                          {s.title}
                        </h3>
                      )}
                      {s.desc && (
                        <p style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.625 }}>{s.desc}</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Trusted clinic — moved directly after the treatment-experience
             section, ahead of the CTA band, patient videos, and Carisma
             Difference (per the new section order). ── */}
      {t.trusted && (
        <section aria-labelledby="trusted-heading" style={{ padding: "70px 0 84px" }}>
          <div className="container">
            <h2
              id="trusted-heading"
              className="font-serif text-center"
              style={{
                fontSize: "clamp(24px,3.4vw,38px)",
                color: "var(--gold)",
                letterSpacing: "0.04em",
                lineHeight: 1.25,
              }}
            >
              {t.trusted.title}
            </h2>
            {t.trusted.subtitle && (
              <p
                className="font-display text-center"
                style={{
                  fontSize: "14px",
                  color: "var(--label)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginTop: "12px",
                }}
              >
                {t.trusted.subtitle}
              </p>
            )}
            {t.trusted.asSeenOn && t.trusted.asSeenOn.length > 0 && (
              <div className="text-center" style={{ marginTop: "28px" }}>
                <p
                  className="font-display"
                  style={{
                    fontSize: "11px",
                    color: "var(--gold)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    marginBottom: "14px",
                  }}
                >
                  As seen on
                </p>
                <div className="flex flex-wrap items-center justify-center" style={{ gap: "26px" }}>
                  {t.trusted.asSeenOn.map((logo) => (
                    // P3 — next/image for media logos; purely decorative so alt=""
                    <Image
                      key={logo}
                      src={logo}
                      alt=""
                      width={80}
                      height={26}
                      style={{ height: "26px", width: "auto", objectFit: "contain" }}
                    />
                  ))}
                </div>
              </div>
            )}

            <Reveal
              className="mx-auto"
              style={{
                marginTop: "40px",
                maxWidth: "1100px",
                borderRadius: "32px",
                background: "linear-gradient(135deg,#eef4f5 0%, #ffffff 45%, #e6eef0 100%)",
                border: "1px solid var(--line)",
                padding: "clamp(28px,4vw,52px)",
              }}
            >
              <div className="grid gap-10 lg:grid-cols-2 items-center">
                {/* image cluster */}
                {t.trusted.images.length === 1 ? (
                  <div className="relative overflow-hidden" style={{ borderRadius: "32px", maxWidth: "470px" }}>
                    <Image
                      src={t.trusted.images[0]}
                      // P1 — descriptive alt for clinic image
                      alt="Carisma Aesthetics clinic"
                      width={470}
                      height={360}
                      style={{ display: "block", width: "100%", height: "auto" }}
                      sizes="(max-width: 1024px) 100vw, 470px"
                    />
                  </div>
                ) : (
                  <div
                    className="mx-auto"
                    style={{ maxWidth: "460px", width: "100%", padding: "14px", background: "var(--teal-200)", borderRadius: "40px" }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                      {t.trusted.images.slice(0, 4).map((src, i) => {
                        const R = "46%";
                        const radii = [`${R} 0 0 0`, `0 ${R} 0 0`, `0 0 0 ${R}`, `0 0 ${R} 0`];
                        return (
                          <div key={src} style={{ overflow: "hidden", borderRadius: radii[i], position: "relative", aspectRatio: "1 / 1" }}>
                            {/* P3 — next/image for clover cluster; decorative collage */}
                            <Image
                              src={src}
                              alt={i === 0 ? "Carisma Aesthetics clinic photo collage" : ""}
                              fill
                              style={{ objectFit: "cover" }}
                              sizes="(max-width: 640px) 50vw, 230px"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {/* trust points */}
                <ul className="space-y-6">
                  {t.trusted.points.map((p) => (
                    <li key={p.title} className="flex items-start gap-4">
                      <span
                        className="shrink-0 inline-flex items-center justify-center"
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "50%",
                          background: "#e3eded",
                          color: "var(--teal)",
                          marginTop: "2px",
                        }}
                        aria-hidden="true"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12.5l4.5 4.5L19 7" />
                        </svg>
                      </span>
                      <div>
                        <h3
                          className="font-display"
                          style={{
                            fontSize: "15px",
                            color: "var(--gold)",
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                            marginBottom: "4px",
                          }}
                        >
                          {p.title}
                        </h3>
                        <p style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.625 }}>{p.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Real patients — autoplay video reels ── */}
      {t.patientVideos && (
        <section aria-labelledby="videos-heading" style={{ padding: "80px 0" }}>
          <div className="container">
            <h2
              id="videos-heading"
              className="font-serif text-center"
              style={{
                fontSize: "clamp(24px,3.4vw,38px)",
                color: "var(--gold)",
                letterSpacing: "0.04em",
                lineHeight: 1.25,
              }}
            >
              {t.patientVideos.title}
            </h2>
            {t.patientVideos.intro && (
              <p
                className="text-center mx-auto"
                style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.625, marginTop: "18px", maxWidth: "820px" }}
              >
                {t.patientVideos.intro}
              </p>
            )}
            {t.patientVideos.videos.length === 1 ? (
              <div style={{ marginTop: "44px", maxWidth: "340px", marginInline: "auto" }}>
                <div style={{ borderRadius: "28px 64px 28px 64px", overflow: "hidden", boxShadow: "0 16px 38px rgba(0,0,0,0.10)" }}>
                  <VideoPlayer className="w-full" ratio="4 / 5" radius="28px 64px 28px 64px" src={t.patientVideos.videos[0]} label="Patient treatment video" />
                </div>
              </div>
            ) : (
              <div
                style={{
                  marginTop: "44px",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 320px))",
                  justifyContent: "center",
                  gap: "24px",
                }}
              >
                {t.patientVideos.videos.map((src, i) => (
                  <Reveal
                    key={src}
                    delay={(i % 3) * 90}
                    style={{ borderRadius: "28px 64px 28px 64px", overflow: "hidden", boxShadow: "0 16px 38px rgba(0,0,0,0.10)" }}
                  >
                    <VideoPlayer className="w-full" ratio="4 / 5" radius="28px 64px 28px 64px" src={src} label={`Patient treatment video ${i + 1}`} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── The Carisma Difference ── */}
      {t.difference && (
        <section aria-labelledby="difference-heading" style={{ padding: "10px 0 84px" }}>
          <div className="container">
            <div
              className="mx-auto"
              style={{
                maxWidth: "1120px",
                borderRadius: "36px",
                background: "linear-gradient(160deg,#eef4f5 0%, #ffffff 50%, #e6eef0 100%)",
                border: "1px solid var(--line)",
                padding: "clamp(32px,4vw,60px)",
              }}
            >
              {t.difference.kicker && (
                <div className="text-center">
                  <p
                    className="font-display"
                    // P1 — teal-text #406060 = 5.83:1 on worst gradient stop — passes AA
                    style={{ fontSize: "11px", color: "var(--teal-text)", letterSpacing: "0.18em", textTransform: "uppercase" }}
                  >
                    {t.difference.kicker}
                  </p>
                  <div
                    className="mx-auto"
                    style={{ width: "80px", height: "1px", background: "var(--teal)", margin: "10px auto 0" }}
                    aria-hidden="true"
                  />
                </div>
              )}
              <h2
                id="difference-heading"
                className="font-serif text-center"
                style={{
                  fontSize: "clamp(24px,3.4vw,38px)",
                  color: "var(--gold)",
                  letterSpacing: "0.04em",
                  marginTop: "20px",
                  lineHeight: 1.25,
                }}
              >
                {t.difference.title}
              </h2>

              <div className="grid gap-12 lg:grid-cols-2 items-stretch" style={{ marginTop: "44px" }}>
                {/* left: commitment + why */}
                <div>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "13px",
                      color: "var(--label)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: "18px",
                    }}
                  >
                    {t.difference.commitmentTitle}
                  </h3>
                  <ul className="space-y-3">
                    {t.difference.commitment.map((it) => (
                      <li key={it} className="flex items-start gap-3">
                        <span aria-hidden="true" style={{ color: "var(--label)", fontSize: "12px", lineHeight: 1.7 }}>
                          •
                        </span>
                        <span style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.625 }}>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "13px",
                      color: "var(--label)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      margin: "34px 0 18px",
                    }}
                  >
                    {t.difference.whyTitle}
                  </h3>
                  <ul className="space-y-3">
                    {t.difference.why.map((it) => (
                      <li key={it} className="flex items-start gap-3">
                        <span aria-hidden="true" style={{ color: "var(--label)", fontSize: "12px", lineHeight: 1.7 }}>
                          •
                        </span>
                        <span style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.625 }}>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* right: map */}
                <div
                  style={{
                    borderRadius: "44px 16px 44px 16px",
                    overflow: "hidden",
                    boxShadow: "0 16px 38px rgba(0,0,0,0.10)",
                    minHeight: "380px",
                  }}
                >
                  <iframe
                    title="Carisma Aesthetics location map"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(t.difference.mapQuery)}&z=14&output=embed`}
                    loading="lazy"
                    style={{ border: 0, width: "100%", height: "100%", minHeight: "380px", display: "block" }}
                  />
                </div>
              </div>

              {/* bottom: CTA + parking */}
              <div
                className="flex flex-col sm:flex-row items-center justify-between gap-6"
                style={{ marginTop: "48px" }}
              >
                {/* P2 — min-h-[44px] for CTA, P10 — primary CTA most prominent */}
                <Link
                  href="/consultation"
                  className="btn btn-teal"
                  style={{ minWidth: "300px", textAlign: "center", display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "44px" }}
                >
                  Book Your Free Consultation
                </Link>
                <div className="flex items-center gap-3">
                  <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="none"
                      stroke="var(--teal)"
                      strokeWidth="1.4"
                      d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"
                    />
                    <text x="12" y="13.5" textAnchor="middle" fontSize="9" fill="var(--teal)" fontWeight="700">
                      P
                    </text>
                  </svg>
                  <span
                    className="font-display"
                    style={{ fontSize: "13px", color: "var(--label)", letterSpacing: "0.08em", textTransform: "uppercase" }}
                  >
                    Complimentary On-Site Parking
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Preparation & Aftercare ── */}
      {t.prepAftercare && (
        <section aria-labelledby="prep-heading" style={{ padding: "80px 0" }}>
          <div className="container">
            {t.prepAftercare.kicker && (
              <p
                className="font-display text-center"
                style={{
                  fontSize: "11px",
                  // P1 — #96B2B2 (teal) on white FAILS; teal-text #406060 = 5.76:1 passes AA
                  color: "var(--teal-text)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: "14px",
                }}
              >
                {t.prepAftercare.kicker}
              </p>
            )}
            <h2
              id="prep-heading"
              className="font-serif text-center"
              style={{
                fontSize: "clamp(24px,3.4vw,38px)",
                color: "var(--gold)",
                letterSpacing: "0.04em",
                lineHeight: 1.25,
              }}
            >
              {t.prepAftercare.title}
            </h2>
            {t.prepAftercare.intro && (
              <p
                className="text-center mx-auto"
                style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.625, marginTop: "18px", maxWidth: "760px" }}
              >
                {t.prepAftercare.intro}
              </p>
            )}
            <div className="grid gap-6 md:grid-cols-3" style={{ marginTop: "48px" }}>
              {t.prepAftercare.cards.map((c, i) => (
                <Reveal
                  key={c.label}
                  delay={(i % 3) * 90}
                  style={{
                    borderRadius: "20px 56px 20px 56px",
                    background: "linear-gradient(170deg,#ffffff 0%, #f1f6f7 60%, #e3ecee 100%)",
                    border: "1px solid var(--line)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.05)",
                    padding: "clamp(26px,3vw,34px)",
                  }}
                >
                  <div className="flex items-center gap-3" style={{ marginBottom: "16px" }}>
                    {c.icon && (
                      // P3 — next/image for card icons
                      <Image
                        src={c.icon}
                        alt={c.label}
                        width={40}
                        height={40}
                        style={{ height: "40px", width: "auto" }}
                      />
                    )}
                    <span
                      className="font-display"
                      style={{ fontSize: "14px", color: "var(--label)", letterSpacing: "0.14em", textTransform: "uppercase" }}
                    >
                      {c.label}
                    </span>
                  </div>
                  <p style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.625, marginBottom: "18px" }}>
                    {c.lead}
                  </p>
                  <ul className="space-y-4">
                    {c.points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <span
                          // P1 — decorative bullet, aria-hidden
                          aria-hidden="true"
                          style={{ color: "var(--teal-text)", fontSize: "12px", lineHeight: 1.7 }}
                        >
                          ●
                        </span>
                        <span style={{ fontSize: "13.5px", color: "var(--label)", lineHeight: 1.55 }}>{p}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
            {t.experience!.cta && (
              <div className="text-center" style={{ marginTop: "48px" }}>
                {/* P2 — min-h-[44px] for CTA tap target */}
                <Link
                  href="/consultation"
                  className="btn btn-teal"
                  style={{ display: "inline-flex", alignItems: "center", minHeight: "44px" }}
                >
                  {t.experience!.cta}
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Pricing grid ── */}
      {t.pricingGrid && (
        <section
          aria-labelledby="pricing-heading"
          aria-label="Treatment pricing"
          style={{ padding: "80px 0", backgroundColor: "var(--cream)" }}
        >
          <div className="container">
            <h2
              id="pricing-heading"
              className="font-serif text-center"
              style={{
                fontSize: "clamp(24px,3.4vw,38px)",
                color: "var(--gold)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                lineHeight: 1.25,
              }}
            >
              {t.pricingGrid.title}
            </h2>
            {t.pricingGrid.intro && (
              <p
                className="text-center mx-auto"
                style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.625, marginTop: "16px", maxWidth: "760px" }}
              >
                {t.pricingGrid.intro}
              </p>
            )}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ marginTop: "44px" }}>
              {t.pricingGrid.items.map((it, i) => (
                <Reveal
                  key={it.name}
                  delay={(i % 3) * 70}
                  className="text-center"
                  style={{
                    background: "linear-gradient(150deg, #ffffff 0%, #eef4f5 55%, #e9f1f2 100%)",
                    padding: "32px 26px",
                    borderRadius: "10px 40px 10px 40px",
                    border: "1px solid var(--line)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.05)",
                  }}
                >
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "16px",
                      color: "var(--gold)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    {it.name}
                  </h3>
                  <div
                    className="font-display"
                    style={{
                      fontSize: "13px",
                      // P1 — teal-deep #4f7373 = 4.26:1 on worst gradient stop — passes 3:1 for non-text, marginal for text
                      // using teal-text #406060 = 5.72:1 for text
                      color: "var(--teal-text)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: "16px",
                    }}
                  >
                    {it.price}
                  </div>
                  <p style={{ fontSize: "13.5px", color: "var(--ink-soft)", lineHeight: 1.625 }}>{it.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Membership tiers ── */}
      {t.membership && (
        <section aria-labelledby="membership-heading" style={{ padding: "80px 0" }}>
          <div className="container">
            <h2
              id="membership-heading"
              className="font-serif text-center"
              style={{
                fontSize: "clamp(24px,3.4vw,38px)",
                color: "var(--gold)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                lineHeight: 1.25,
              }}
            >
              {t.membership.title}
            </h2>
            {t.membership.intro && (
              <p
                className="text-center mx-auto"
                style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.625, marginTop: "18px", maxWidth: "880px" }}
              >
                {t.membership.intro}
              </p>
            )}
            <div className="grid gap-8 md:grid-cols-3 mx-auto" style={{ marginTop: "48px", maxWidth: "1040px" }}>
              {t.membership.tiers.map((tier, i) => (
                <Reveal
                  key={tier.name}
                  delay={(i % 3) * 90}
                  className="text-center"
                  style={{
                    background: "linear-gradient(170deg,#ffffff 0%, #f1f6f7 60%, #e3ecee 100%)",
                    border: "1px solid var(--line)",
                    borderRadius: "20px 56px 20px 56px",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.05)",
                    padding: "clamp(24px,3vw,32px)",
                  }}
                >
                  {/* P3 — next/image for membership tier images */}
                  <Image
                    src={tier.image}
                    alt={tier.name}
                    width={280}
                    height={200}
                    className="mx-auto"
                    style={{
                      display: "block",
                      width: "100%",
                      maxWidth: "280px",
                      height: "auto",
                      borderRadius: "14px",
                      boxShadow: "0 10px 26px rgba(0,0,0,0.12)",
                    }}
                  />
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "16px",
                      color: "var(--gold)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginTop: "22px",
                    }}
                  >
                    {tier.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2" style={{ marginTop: "14px" }}>
                    {/* P1 — teal-deep #4f7373 stroke = 4.26:1 clears the 3:1 graphical-object bar */}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--teal-deep)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M5 12.5l4.5 4.5L19 7" />
                    </svg>
                    <span style={{ fontSize: "14px", color: "var(--label)" }}>{tier.sessions}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2" style={{ marginTop: "12px" }}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--teal-deep)"
                      strokeWidth="1.7"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M15 9a3.5 3.5 0 0 0-3-1.6c-1.9 0-3 1.3-3 2.6s1.1 2.6 3 2.6 3 1.3 3 2.6-1.1 2.6-3 2.6A3.5 3.5 0 0 1 9 15M12 6v12" />
                    </svg>
                    {/* P1 — teal-text #406060 = 5.72:1 on worst gradient stop — passes AA at 18px */}
                    <span
                      className="font-display"
                      style={{ fontSize: "18px", color: "var(--teal-text)", letterSpacing: "0.06em" }}
                    >
                      {tier.price}
                    </span>
                  </div>
                  <div style={{ marginTop: "22px" }}>
                    {/* P2 — min-h-[44px] for CTA tap target */}
                    <Link
                      href="/consultation"
                      className="btn btn-teal"
                      style={{ fontSize: "12px", display: "inline-flex", alignItems: "center", minHeight: "44px" }}
                    >
                      book your session
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Recommended with — cross-sell cards (RecommendedCards) ── */}
      {t.recommended && (
        <RecommendedCards title={t.recommended.title} items={t.recommended.items} />
      )}

      {/* ── FAQ accordion — searchable (TreatmentFaq). Emit FAQPage JSON-LD on
             the page itself, not here, to avoid a duplicate FAQPage block. ── */}
      {t.faq?.length ? (
        <TreatmentFaq kicker={t.faqKicker} title={t.faqTitle} items={t.faq} />
      ) : null}
    </main>
  );
}
