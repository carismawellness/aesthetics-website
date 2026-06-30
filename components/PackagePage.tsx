import Link from "next/link";
import Image from "next/image";
import type { Treatment } from "@/lib/treatments";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import BeforeAfterCarousel from "@/components/BeforeAfterCarousel";
import VideoPlayer from "@/components/VideoPlayer";
import SectionHeader from "@/components/treatment/SectionHeader";
import SuitabilityCards from "@/components/treatment/SuitabilityCards";
import RecommendedCards from "@/components/treatment/RecommendedCards";
import TreatmentFaq from "@/components/treatment/TreatmentFaq";
import PlanSummary from "@/components/treatment/PlanSummary";
import TopClinic from "@/components/treatment/TopClinic";
import ProblemReframe from "@/components/treatment/ProblemReframe";
import GuaranteeBand from "@/components/treatment/GuaranteeBand";
import OfferStack from "@/components/packages/OfferStack";
import DualPack from "@/components/packages/DualPack";
import ClosingCta from "@/components/packages/ClosingCta";

// Fallback hero image when a treatment defines neither image nor video.
const HERO_FALLBACK_IMAGE = "/assets/hero-bg.png";

// Default Carisma Aesthetics Fresha booking page (all services). The primary
// booking CTA opens this in a new tab and bypasses the consultation popup; a
// treatment can override it with hero.bookHref to deep-link its own service.
const AESTHETICS_FRESHA_BOOK =
  "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2800348&share=true&pId=2708191";

// Split the treatment title into at most two headline lines for PageHero, with
// the last line rendered teal (em). Keeps the primary keyword + "Malta" intact.
// Strips the SEO pipe (e.g., "Title | SEO suffix" → "Title") before splitting.
function splitHeadline(title: string): { text: string; em?: boolean }[] {
  // Remove pipe and everything after it (SEO suffix for metadata only)
  const cleanTitle = title.split(" | ")[0].trim();
  const words = cleanTitle.split(/\s+/);
  if (words.length <= 1) return [{ text: cleanTitle, em: true }];
  // Break near the middle so neither line is a lone word where avoidable.
  const breakAt = Math.ceil(words.length / 2);
  const first = words.slice(0, breakAt).join(" ");
  const second = words.slice(breakAt).join(" ");
  return [{ text: first }, { text: second, em: true }];
}

// P1 — accessible colors for light teal InfoStrip background (#eef3f3):
// - Text uses dark teal (#0d1b1d, 7.2:1 on #eef3f3, AAA for normal text)
// - Icon strokes use teal-deep (#245052, 4.2:1, AAA for UI components)
const INFO_COLOR = "#7a6e52";
const INFO_ICON = "#245052";

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

// Compact price anchor block for the hero's left column — shows the offer
// price (now / was / save badge) plus included items inline, replacing the
// full-width OfferStack card that used to sit below the hero.
function PackageOfferInline({ offer }: { offer: NonNullable<Treatment["offer"]> }) {
  return (
    <div
      style={{
        padding: "16px 20px",
        borderRadius: "var(--radius-card)",
        background: "linear-gradient(135deg, rgba(238,243,243,0.65) 0%, rgba(255,255,255,0.85) 100%)",
        border: "1px solid rgba(150,178,178,0.22)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      {/* Price row */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap", marginBottom: offer.included?.length ? "12px" : 0 }}>
        <span
          className="font-serif"
          style={{ fontSize: "clamp(26px,3.5vw,34px)", color: "var(--teal-deep)", letterSpacing: "0.02em", lineHeight: 1 }}
        >
          {offer.priceNow}
        </span>
        {offer.priceWas && (
          <span style={{ fontSize: "17px", color: "var(--muted)", textDecoration: "line-through", lineHeight: 1 }}>
            {offer.priceWas}
          </span>
        )}
        {offer.saveLabel && (
          <span
            className="font-display"
            style={{
              background: "var(--teal-deep)",
              color: "#fff",
              fontSize: "9.5px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "3px 10px",
              borderRadius: "9999px",
            }}
          >
            {offer.saveLabel}
          </span>
        )}
      </div>
      {/* Included list */}
      {offer.included && offer.included.length > 0 && (
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "5px" }}>
          {offer.included.map((item) => (
            <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "7px" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: "2px" }}>
                <circle cx="7" cy="7" r="6.5" stroke="var(--teal-deep)" strokeWidth="1"/>
                <path d="M4 7l2 2 4-4" stroke="var(--teal-deep)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontSize: "12.5px", color: "var(--label)", lineHeight: 1.5 }}>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {offer.guaranteeChip && (
        <p style={{ fontSize: "11px", color: "var(--muted)", marginTop: "10px", letterSpacing: "0.04em" }}>
          {offer.guaranteeChip}
        </p>
      )}
    </div>
  );
}

// Compact horizontal treatment-info strip — the same metric language as the old
// vertical card, but a single tidy row (icon → metric → detail) shown at the
// bottom of the hero's LEFT column (under the reviews) so the RIGHT column stays
// a clean, full-height hero photo.
function InfoStrip({ info }: { info: NonNullable<Treatment["info"]> }) {
  return (
    <div
      aria-label="Treatment info"
      style={{
        width: "100%",
        maxWidth: 620,
        padding: "15px clamp(14px,1.8vw,22px)",
        borderRadius: "var(--radius-card)",
        background: "rgba(238, 243, 243,0.55)",
        border: "1px solid rgba(150,178,178,0.30)",
      }}
    >
      <div className="treatment-info-strip">
        {info.map((it) => (
          <div key={it.metric} style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
            <MetricIcon metric={it.metric} />
            <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <span
                className="font-display"
                style={{ fontSize: 9.5, color: INFO_COLOR, letterSpacing: "0.08em", lineHeight: 1.25, textTransform: "uppercase" }}
              >
                {it.metric}
              </span>
              <span style={{ fontSize: 13, color: "#7a6e52", lineHeight: 1.3, fontWeight: 500 }}>{it.detail}</span>
            </span>
          </div>
        ))}
      </div>
      <style>{`
        .treatment-info-strip {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: clamp(8px, 1vw, 16px);
          align-items: center;
        }
        @media (max-width: 980px) { .treatment-info-strip { grid-template-columns: repeat(3, minmax(0,1fr)); row-gap: 14px; } }
        @media (max-width: 520px) { .treatment-info-strip { grid-template-columns: repeat(2, minmax(0,1fr)); row-gap: 14px; } }
      `}</style>
    </div>
  );
}

export default function TreatmentPage({ t }: { t: Treatment }) {
  // Primary booking CTA → direct Fresha (new tab); secondary → consultation popup.
  const bookHref = t.hero.bookHref ?? AESTHETICS_FRESHA_BOOK;

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
      {/* ── Hero — shared <PageHero> (one <h1>, primary keyword + Malta) ──
             The full intro paragraph (t.hero.body) reads directly under the
             headline as the hero's body, with the short subtitle as an optional
             one-line lead-in above it. The TREATMENT INFO card is folded into the
             hero's right column (belowMedia), beneath the arch photo, so the
             above-the-fold reads as one cohesive unit. ── */}
      <PageHero
        badge="#1 Voted Med-Aesthetics Clinic"
        eyebrow={t.hero.location}
        headline={splitHeadline(t.hero.title)}
        compactHeadline={t.hero.title.length > 22}
        sub={t.hero.subtitle}
        subSecondary={t.hero.body}
        bullets={heroBullets.length > 0 ? heroBullets : undefined}
        primaryCta={{ text: t.hero.cta ?? "Book Your Appointment", href: bookHref, external: true }}
        secondaryCta={{ text: "Free Consultation", href: "/consultation" }}
        footnote={
          t.hero.note ??
          (t.pending ? "Detailed treatment information for this page is being finalised." : undefined)
        }
        belowContent={
          t.offer ? <PackageOfferInline offer={t.offer} /> :
          t.info && t.info.length > 0 ? <InfoStrip info={t.info} /> : undefined
        }
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
          reviews: "500+",
          statValue: "30+",
          statLabel: "years in wellness",
          awardText: "#1 Voted Clinic\nMalta Healthcare Awards",
        }}
      />

      {/* ── Before / After carousel — sits immediately under the above-the-fold
             hero (which now carries the body copy + TREATMENT INFO card),
             before everything else. Shows all before/after pairs. ── */}
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

      {/* ── Emotional problem reframe — right after the before/afters ── */}
      {t.problem && (
        <ProblemReframe
          kicker={t.problem.kicker}
          title={t.problem.title}
          body={t.problem.body}
          points={t.problem.points}
        />
      )}

      {/* ── Education ── */}
      {t.education && (
        <section
          aria-labelledby="education-heading"
          style={{ padding: "80px 0", background: "linear-gradient(180deg, #ffffff 0%, var(--cream) 50%, #ffffff 100%)" }}
        >
          <div className="container">
            <SectionHeader id="education-heading" title={t.education.title} sub={t.education.subtitle} />
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
      {/* ── Guarantee — the Natural Confidence Guarantee (GuaranteeBand) ── */}
      {t.guarantee && (
        <GuaranteeBand
          kicker={t.guarantee.kicker}
          title={t.guarantee.title}
          paragraphs={t.guarantee.paragraphs}
          cta={t.guarantee.cta}
          points={t.guarantee.points}
        />
      )}

      {/* ── Precision areas ── */}
      {t.precision && (
        <section aria-labelledby="precision-heading" style={{ padding: "80px 0" }}>
          <div className="container">
            <SectionHeader id="precision-heading" title={t.precision.title} sub={t.precision.intro} />
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
          personas={t.suitability.personas}
        />
      )}

      {/* ── Treatment experience — dashed timeline ── */}
      {t.experience && (
        <section aria-labelledby="experience-heading" style={{ padding: "80px 0" }}>
          <div className="container">
            <div style={{ marginBottom: "56px" }}>
              <SectionHeader id="experience-heading" title={t.experience.title} />
            </div>

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
                        boxShadow: "0 0 0 5px #fbfdfd",
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    />
                    <span
                      className="font-serif"
                      style={{ fontSize: "15px", color: "var(--gold)", letterSpacing: "0.14em" }}
                    >
                      Step <span style={{ fontSize: "clamp(24px,6vw,34px)", lineHeight: 1 }}>{i + 1}</span>
                    </span>
                  </div>
                  <div
                    style={{
                      borderRadius: "20px 56px 20px 56px",
                      background: "linear-gradient(180deg,#ffffff 0%, #fbfdfd 100%)",
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
                        <p style={{ fontSize: "14.5px", color: "#7a6e52", lineHeight: 1.625 }}>{s.desc}</p>
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
                        boxShadow: "0 0 0 5px #fbfdfd",
                      }}
                      aria-hidden="true"
                    />
                  </div>
                  {/* STEP + number */}
                  <div className="text-center">
                    <div className="font-serif" style={{ fontSize: "17px", color: "var(--gold)", letterSpacing: "0.14em" }}>
                      Step
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
                      background: "linear-gradient(180deg,#ffffff 0%, #fbfdfd 100%)",
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
                        <p style={{ fontSize: "14.5px", color: "#7a6e52", lineHeight: 1.625 }}>{s.desc}</p>
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
        <TopClinic
          title={t.trusted.title}
          pressText="As featured in Times of Malta · Lovin Malta · Bay · Malta Daily · Malta Today"
          logos={t.trusted.asSeenOn}
          cards={t.trusted.points.slice(0, 4).map((p) => ({ title: p.title, desc: p.desc }))}
        />
      )}

      {/* ── Real patients — autoplay video reels ── */}
      {t.patientVideos && (
        <section aria-labelledby="videos-heading" style={{ padding: "80px 0" }}>
          <div className="container">
            <SectionHeader id="videos-heading" title={t.patientVideos.title} sub={t.patientVideos.intro} />
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
              <SectionHeader id="difference-heading" kicker={t.difference.kicker} title={t.difference.title} />

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
            <SectionHeader id="prep-heading" kicker={t.prepAftercare.kicker} title={t.prepAftercare.title} sub={t.prepAftercare.intro} />
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

      {/* ── Plan summary / offer stack (after "Your session, step by step") ── */}
      {t.planSummary && (
        <PlanSummary
          {...t.planSummary}
          cta={{ ...t.planSummary.cta, href: bookHref, external: true }}
        />
      )}

      {/* ── Dual / starter pack (body packages only) ── */}
      {t.dualPack && <DualPack dualPack={t.dualPack} />}

      {/* ── Pricing grid ── */}
      {t.pricingGrid && (
        <section
          aria-labelledby="pricing-heading"
          aria-label="Treatment pricing"
          style={{ padding: "80px 0", background: "linear-gradient(180deg, #ffffff 0%, var(--cream) 50%, #ffffff 100%)" }}
        >
          <div className="container">
            <SectionHeader id="pricing-heading" title={t.pricingGrid.title} sub={t.pricingGrid.intro} />
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
            <SectionHeader id="membership-heading" title={t.membership.title} sub={t.membership.intro} />
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

      {/* ── Closing CTA band (package pages only) ── */}
      {t.closing && <ClosingCta closing={t.closing} bookHref={t.hero.bookHref} />}
    </main>
  );
}
