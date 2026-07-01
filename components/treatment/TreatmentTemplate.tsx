import Link from "next/link";
import Image from "next/image";
import type { Treatment } from "@/lib/treatments";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import BeforeAfterCarousel from "@/components/BeforeAfterCarousel";
import CompositeSlideshow from "@/components/CompositeSlideshow";
import StatsBar from "@/components/treatment/StatsBar";
import ClarityGrid from "@/components/treatment/ClarityGrid";
import ReviewsCarousel from "@/components/treatment/ReviewsCarousel";
import DoctorCard from "@/components/treatment/DoctorCard";
import GuaranteeBand from "@/components/treatment/GuaranteeBand";
import PricingCards from "@/components/treatment/PricingCards";
import EvidenceCards from "@/components/treatment/EvidenceCards";
import StickyTreatmentCTA from "@/components/treatment/StickyTreatmentCTA";
import VideoPlayer from "@/components/VideoPlayer";

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

// P1 — teal-deep #4f7373 = 4.26:1 clears the 3:1 graphical-object bar (WCAG 1.4.11).
// The ✓/✗ glyph itself is the non-colour cue for suitable vs not-ideal.
function CheckIcon({ ok }: { ok: boolean }) {
  return (
    <svg
      className="shrink-0"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--teal-deep)"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ marginTop: "1px" }}
      // P1 — aria-label provides non-visual meaning for the icon
      aria-label={ok ? "Suitable" : "May not be ideal"}
      role="img"
    >
      {ok ? <path d="M5 12.5l4.5 4.5L19 7" /> : <path d="M7 7l10 10M17 7L7 17" />}
    </svg>
  );
}

// P1 — accessible colors: text uses label/taupe (#5a4a3f, 5.2:1 on white);
// icon strokes use teal-deep (#4f7373, 6.75:1) so graphical objects clear 3:1 (WCAG 1.4.11).
// WCAG 2.2 AA fix (Jun 2026): changed INFO_COLOR from #756758 (4.03:1 FAIL) to #5a4a3f (5.2:1 PASS).
const INFO_COLOR = "#245052";
const INFO_ICON = "#4f7373";

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
        background: "rgba(238, 243, 243,0.6)",
        border: "1px solid rgba(79,115,115,0.45)",
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
          style={{ padding: "11px 0", borderTop: i === 0 ? "none" : `1px solid rgba(79,115,115,0.25)` }}
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

export default function TreatmentTemplate({ t }: { t: Treatment }) {
  const hasImage = Boolean(t.hero.image);
  const hasMedia = hasImage || Boolean(t.hero.heroVideo);

  return (
    // P1 — <main> landmark wrapping all page content
    <main>
      {/* ── Hero — shared <PageHero> (one <h1>, primary keyword + Malta) ── */}
      <PageHero
        badge="#1 Voted Med-Aesthetics Clinic"
        headline={splitHeadline(t.hero.title)}
        compactHeadline={t.hero.title.length > 22}
        sub={t.hero.subtitle ?? (t.hero.body ? firstSentence(t.hero.body) : undefined)}
        bullets={
          t.hero.benefits && t.hero.benefits.length > 0
            ? t.hero.benefits.map((b) => ({ text: b }))
            : undefined
        }
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
          reviews: "500+",
          statValue: "30+",
          statLabel: "years in wellness",
          awardText: "#1 Voted Clinic\nMalta Healthcare Awards",
        }}
      />

      {/* ── Hero detail strip — prices + treatment info, product tabs, brand logos,
             and the Google-rating trust block that used to live inside the hero ── */}
      {(t.hero.location ||
        t.hero.body ||
        t.hero.note ||
        (t.hero.prices && t.hero.prices.length > 0) ||
        t.info ||
        (t.hero.productTabs && t.hero.productTabs.length > 0) ||
        (t.hero.brandLogos && t.hero.brandLogos.length > 0) ||
        t.pending) && (
        <section
          aria-label="Treatment overview"
          style={{ padding: "clamp(40px,7vh,88px) 0" }}
        >
          <div className="container">
            <div className="mx-auto" style={{ maxWidth: "1100px" }}>
              <div className="grid gap-8 md:grid-cols-2 items-start">
                {/* Left: prices + supporting copy */}
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

                  {t.hero.prices && t.hero.prices.length > 0 && (
                    // P10 — pricing section landmark
                    <ul aria-label="Treatment pricing">
                      {t.hero.prices.map((p) => {
                        const m = p.price.match(/^(.*?)\s*(€\S+)\s*$/);
                        const prefix = m ? m[1] : p.price;
                        const amount = m ? m[2] : "";
                        return (
                          <li key={p.label} className="flex items-baseline gap-2" style={{ padding: "5px 0" }}>
                            <span
                              style={{ color: "var(--teal-deep)", fontSize: "11px", lineHeight: 1.7 }}
                              aria-hidden="true"
                            >
                              ●
                            </span>
                            <span style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.5 }}>
                              {p.label} {prefix}{" "}
                              {/* P1 — underline is non-colour cue so price isn't distinguished by colour alone (WCAG 1.4.1) */}
                              {amount && (
                                <u
                                  style={{
                                    color: "var(--teal-text)",
                                    textUnderlineOffset: "2px",
                                    fontWeight: 600,
                                  }}
                                >
                                  {amount}
                                </u>
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
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

                {/* Right: treatment-info card + product tabs + brand logos + trust block */}
                <Reveal delay={120}>
                  {t.info && hasMedia && <InfoCard info={t.info} />}

                  {t.hero.productTabs && t.hero.productTabs.length > 0 && (
                    <div className="flex gap-3" style={{ marginTop: "14px" }}>
                      {t.hero.productTabs.map((tab) => (
                        <span
                          key={tab}
                          className="font-display inline-flex items-center justify-center"
                          style={{
                            flex: 1,
                            textAlign: "center",
                            padding: "11px 14px",
                            // P1 — teal-deep #4f7373 border = 4.26:1 clears the 3:1 UI-component-boundary bar (WCAG 1.4.11)
                            border: "1px solid var(--teal-deep)",
                            borderRadius: "var(--radius-card)",
                            fontSize: "12px",
                            letterSpacing: "0.1em",
                            color: "var(--ink)",
                            background: "var(--teal-100)",
                          }}
                        >
                          {tab.startsWith("/") ? (
                            // P3 — next/image for product tab logos
                            <Image
                              src={tab}
                              alt=""
                              width={80}
                              height={30}
                              style={{ height: "30px", width: "auto", maxWidth: "100%", objectFit: "contain" }}
                            />
                          ) : (
                            tab
                          )}
                        </span>
                      ))}
                    </div>
                  )}

                  {t.hero.brandLogos && t.hero.brandLogos.length > 0 && (
                    <div
                      className="flex items-center justify-center"
                      style={{
                        marginTop: "14px",
                        gap: "26px",
                        background: "var(--white)",
                        border: "1px solid var(--line)",
                        borderRadius: "var(--radius-card)",
                        padding: "14px 18px",
                      }}
                    >
                      {t.hero.brandLogos.map((logo) => (
                        // P3 — next/image for brand logos; decorative so alt=""
                        <Image
                          key={logo}
                          src={logo}
                          alt=""
                          width={80}
                          height={28}
                          style={{ height: "28px", width: "auto", objectFit: "contain" }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Compact Google rating trust block */}
                  <div
                    className="flex items-center flex-wrap gap-x-2 gap-y-1"
                    style={{ marginTop: "14px", fontSize: "13px", color: "var(--label)" }}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" aria-label="Google" role="img">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z"
                      />
                    </svg>
                    <span style={{ fontWeight: 600 }}>4.7</span>
                    {/* P1 — star icons with aria-label describing the rating */}
                    <span
                      className="flex"
                      style={{ color: "var(--teal)" }}
                      aria-label="4.7 out of 5 stars"
                      role="img"
                    >
                      {[0, 1, 2, 3, 4].map((i) => (
                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </span>
                    <span
                      className="font-display"
                      // P1 — teal-text #406060 = 5.76:1 passes AA
                      style={{ color: "var(--teal-text)", fontSize: "11px", letterSpacing: "0.1em" }}
                    >
                      TOP-RATED CLINIC IN MALTA
                    </span>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Lead form — below hero, anchored via #book ── */}
      {t.hero.heroForm && (
        <section
          id="book"
          aria-labelledby="book-heading"
          style={{
            padding: "clamp(36px,5vh,64px) 0",
            background: "linear-gradient(180deg, #ffffff 0%, var(--beige) 50%, #ffffff 100%)",
            scrollMarginTop: "var(--nav-clear)",
          }}
        >
          <div className="container">
            <h2
              id="book-heading"
              className="font-serif text-center"
              style={{
                fontSize: "clamp(24px,3.4vw,38px)",
                color: "var(--gold)",
                letterSpacing: "0.04em",
                lineHeight: 1.25,
              }}
            >
              Book your consultation
            </h2>
            <p
              className="text-center"
              style={{
                fontSize: "14px",
                color: "var(--label)",
                marginTop: "10px",
                maxWidth: "560px",
                marginInline: "auto",
                lineHeight: 1.625,
              }}
            >
              Share a few details and our team will be in touch to arrange your complimentary consultation.
            </p>
            <div
              className="flex justify-center"
              style={{ marginTop: "26px" }}
            >
              {/* Opens the site-wide consultation popup (global interceptor on
                  href="/consultation"). */}
              <Link
                href="/consultation"
                className="btn btn-teal"
                style={{ fontSize: "13px", padding: "15px 44px", letterSpacing: "0.12em" }}
              >
                Book Free Consultation
              </Link>
            </div>
          </div>
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
      {t.stats && t.stats.length > 0 && <StatsBar items={t.stats} />}
      {t.education && (
        <section
          aria-labelledby="education-heading"
          style={{ padding: "clamp(40px,8vw,80px) 0", background: "linear-gradient(180deg, #ffffff 0%, var(--cream) 50%, #ffffff 100%)" }}
        >
          <div className="container">
            <h2
              id="education-heading"
              className="font-serif text-center"
              style={{
                fontSize: "clamp(24px,3.4vw,38px)",
                color: "var(--gold)",
                letterSpacing: "0.04em",
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

      {/* ── Before / After carousel ── */}
      {(t.beforeAfter || t.beforeAfterTitle) && (
        <section aria-label="Before and after results" style={{ padding: "clamp(36px,7vw,70px) 0" }}>
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
                    marginBottom: "clamp(18px,4.5vw,36px)",
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

      {/* ── Precision areas ── */}
      {t.clarity && <ClarityGrid kicker={t.clarity.kicker} title={t.clarity.title} sub={t.clarity.sub} does={t.clarity.does} doesnt={t.clarity.doesnt} />}
      {t.reviews && t.reviews.items.length > 0 && <ReviewsCarousel kicker={t.reviews.kicker} title={t.reviews.title} sub={t.reviews.sub} items={t.reviews.items} />}
      {t.doctor && <DoctorCard kicker={t.doctor.kicker} heading={t.doctor.heading} name={t.doctor.name} title={t.doctor.title} credentials={t.doctor.credentials} image={t.doctor.image} quote={t.doctor.quote} bio={t.doctor.bio} />}
      {t.precision && (
        <section aria-labelledby="precision-heading" style={{ padding: "clamp(40px,8vw,80px) 0" }}>
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

      {/* ── Suitability ── */}
      {t.suitability && (
        <section aria-labelledby="suitability-heading" style={{ padding: "clamp(40px,8vw,80px) 0", background: "#fff" }}>
          <div className="container">
            <h2
              id="suitability-heading"
              className="font-serif text-center"
              style={{
                fontSize: "clamp(24px,3.4vw,38px)",
                color: "var(--gold)",
                letterSpacing: "0.04em",
                lineHeight: 1.25,
              }}
            >
              {t.suitability.title}
            </h2>
            {t.suitability.intro && (
              <p
                className="text-center mx-auto"
                style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.625, marginTop: "18px", maxWidth: "880px" }}
              >
                {t.suitability.intro}
              </p>
            )}
            <div className="grid md:grid-cols-2 gap-6 mx-auto" style={{ marginTop: "48px", maxWidth: "1040px" }}>
              {/* Suitable card */}
              <Reveal
                style={{
                  background: "var(--cream)",
                  borderRadius: "60px 16px 60px 16px",
                  padding: "clamp(32px,3.5vw,48px)",
                }}
              >
                <h3
                  className="font-display"
                  style={{ fontSize: "13px", color: "var(--label)", marginBottom: "28px", letterSpacing: "0.14em" }}
                >
                  SUITABLE FOR YOU IF
                </h3>
                <ul className="space-y-5">
                  {(t.suitability.suitableFor ?? []).map((s) => (
                    <li key={s} className="flex items-start gap-4">
                      <CheckIcon ok />
                      <span style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.625 }}>{s}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              {/* Not ideal card */}
              <Reveal
                delay={100}
                style={{
                  background: "var(--cream)",
                  borderRadius: "16px 60px 16px 60px",
                  padding: "clamp(32px,3.5vw,48px)",
                }}
              >
                <h3
                  className="font-display"
                  style={{ fontSize: "13px", color: "var(--label)", marginBottom: "28px", letterSpacing: "0.14em" }}
                >
                  MAY NOT BE IDEAL IF
                </h3>
                <ul className="space-y-5">
                  {(t.suitability.notIdeal ?? []).map((s) => (
                    <li key={s} className="flex items-start gap-4">
                      <CheckIcon ok={false} />
                      <span style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.625 }}>{s}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ── Treatment experience — dashed timeline ── */}
      {t.guarantee && <GuaranteeBand kicker={t.guarantee.kicker} title={t.guarantee.title} paragraphs={t.guarantee.paragraphs} cta={t.guarantee.cta} points={t.guarantee.points} />}
      {t.experience && (
        <section aria-labelledby="experience-heading" style={{ padding: "clamp(40px,8vw,80px) 0" }}>
          <div className="container">
            <h2
              id="experience-heading"
              className="font-serif text-center"
              style={{
                fontSize: "clamp(24px,3.4vw,38px)",
                color: "var(--gold)",
                letterSpacing: "0.06em",
                marginBottom: "clamp(28px,5vw,56px)",
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

      {/* ── Preparation & Aftercare ── */}
      {t.prepAftercare && (
        <section aria-labelledby="prep-heading" style={{ padding: "clamp(40px,8vw,80px) 0" }}>
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

      {/* ── Real patients — autoplay video reels ── */}
      {t.patientVideos && (
        <section aria-labelledby="videos-heading" style={{ padding: "clamp(40px,8vw,80px) 0" }}>
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

      {/* ── Trusted clinic ── */}
      {t.trusted && (
        <section aria-labelledby="trusted-heading" style={{ padding: "clamp(36px,7vw,70px) 0 clamp(42px,8vw,84px)" }}>
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
                    style={{ maxWidth: "460px", width: "100%", padding: "14px", background: "var(--champagne)", borderRadius: "40px" }}
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

      {/* ── The Carisma Difference ── */}
      {t.difference && (
        <section aria-labelledby="difference-heading" style={{ padding: "10px 0 clamp(42px,8vw,84px)" }}>
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

      {/* ── Booking form ── */}
      {t.bookingForm && (
        <section aria-labelledby="booking-form-heading" style={{ padding: "30px 0 clamp(42px,8vw,84px)" }}>
          <div className="container">
            <div className="mx-auto" style={{ maxWidth: "1400px" }}>
              <div
                style={{
                  background: "linear-gradient(180deg,#527979 0%, #456b6b 100%)",
                  borderRadius: "18px 56px 18px 18px",
                  padding: "clamp(26px,3vw,40px) 32px",
                  textAlign: "center",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: "0 14px 30px rgba(0,0,0,0.08)",
                }}
              >
                <h2
                  id="booking-form-heading"
                  style={{
                    fontSize: "clamp(20px,3vw,33px)",
                    // P1 — white on #527979 = 4.7:1 — passes AA
                    color: "#fff",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    fontWeight: 400,
                    lineHeight: 1.25,
                  }}
                >
                  {t.bookingForm.title}
                </h2>
              </div>
              <div
                className="mx-auto flex justify-center"
                style={{ marginTop: "20px", position: "relative" }}
              >
                {/* Opens the site-wide consultation popup (global interceptor on
                    href="/consultation"). */}
                <Link
                  href="/consultation"
                  className="btn btn-teal"
                  style={{ fontSize: "13px", padding: "15px 44px", letterSpacing: "0.12em" }}
                >
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Pricing grid ── */}

      {/* ── Membership tiers ── */}
      {t.membership && (
        <section aria-labelledby="membership-heading" style={{ padding: "clamp(40px,8vw,80px) 0" }}>
          <div className="container">
            <h2
              id="membership-heading"
              className="font-serif text-center"
              style={{
                fontSize: "clamp(24px,3.4vw,38px)",
                color: "var(--gold)",
                letterSpacing: "0.04em",
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

      {/* ── Recommended with — cross-sell cards ── */}
      {t.pricingGrid && <PricingCards kicker="Transparent pricing" title={t.pricingGrid.title} sub={t.pricingGrid.intro} items={t.pricingGrid.items} />}
      {t.evidence && t.evidence.items.length > 0 && <EvidenceCards kicker={t.evidence.kicker} title={t.evidence.title} sub={t.evidence.sub} items={t.evidence.items} />}
      {t.recommended && (
        <section aria-labelledby="recommended-heading" style={{ padding: "20px 0 clamp(42px,8vw,84px)" }}>
          <div className="container">
            <h2
              id="recommended-heading"
              className="font-serif text-center"
              style={{
                fontSize: "clamp(24px,3.4vw,38px)",
                color: "var(--gold)",
                letterSpacing: "0.04em",
                marginBottom: "clamp(24px,4.5vw,48px)",
                lineHeight: 1.25,
              }}
            >
              {t.recommended.title}
            </h2>
            <div
              className="mx-auto"
              style={{ maxWidth: "800px", display: "grid", gap: "32px", gridTemplateColumns: "repeat(2, 1fr)" }}
            >
              {t.recommended.items.map((it, i) => (
                <Reveal key={it.href} delay={(i % 2) * 90}>
                  <div
                    className="overflow-hidden"
                    style={{ borderRadius: "24px 24px 60px 24px", boxShadow: "0 14px 34px rgba(0,0,0,0.10)", position: "relative", aspectRatio: "3 / 2" }}
                  >
                    {/* P3 — next/image for recommended treatment images */}
                    <Image
                      src={it.image}
                      alt={it.label}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 50vw, 380px"
                    />
                  </div>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "14px",
                      color: "var(--label)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      margin: "18px 4px 14px",
                    }}
                  >
                    {it.label}
                  </h3>
                  {/* P2 — min-h-[44px] for CTA; P4 — external link with proper rel */}
                  <Link
                    href={it.href}
                    className="block text-center font-display cta-glow-teal"
                    style={{
                      color: "#fff",
                      padding: "15px",
                      minHeight: "44px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      borderRadius: "var(--radius-pill)",
                    }}
                  >
                    Explore
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ accordion ── */}
      <StickyTreatmentCTA />
      {t.faq && t.faq.length > 0 && (
        <section
          aria-labelledby="faq-section-heading"
          style={{ padding: "clamp(36px,7vw,70px) 0 clamp(45px,9vw,90px)", background: "linear-gradient(180deg, #ffffff 0%, var(--cream) 50%, #ffffff 100%)" }}
        >
          <div className="container">
            {t.faqKicker && (
              <p
                className="font-display text-center"
                style={{
                  fontSize: "12px",
                  // P1 — teal-text #406060 = 5.83:1 on var(--cream) — passes AA
                  color: "var(--teal-text)",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                {t.faqKicker}
              </p>
            )}
            <h2
              id="faq-section-heading"
              className="font-serif text-center"
              style={{
                fontSize: "clamp(24px,3.4vw,38px)",
                color: "var(--gold)",
                letterSpacing: "0.04em",
                marginBottom: "clamp(22px,4.5vw,44px)",
                lineHeight: 1.25,
              }}
            >
              {t.faqTitle ?? "Frequently asked questions"}
            </h2>
            <div className="mx-auto" style={{ maxWidth: "820px" }}>
              {t.faq.map((f, i) => {
                // P1 (treatment-page-specific) — unique IDs for FAQ panels using native <details>
                const panelId = `faq-details-${i}`;
                return (
                  <details
                    key={f.q}
                    id={panelId}
                    style={{
                      background: "#fff",
                      border: "1px solid var(--line)",
                      borderRadius: "var(--radius-card)",
                      marginBottom: "12px",
                      padding: "0 22px",
                    }}
                  >
                    <summary
                      className="flex items-center justify-between gap-4"
                      style={{
                        cursor: "pointer",
                        // P2 — minimum 44px tap target height
                        padding: "18px 0",
                        minHeight: "44px",
                        fontSize: "15px",
                        fontWeight: 500,
                        color: "var(--gold)",
                        letterSpacing: "0.01em",
                        // P6 — heading line height
                        lineHeight: 1.375,
                        // P2 — list-style removed visually; native details disclosure triangle stays
                        listStyle: "none",
                      }}
                    >
                      <span>{f.q}</span>
                      {/* P1 — aria-hidden on decorative +; native <details> handles expanded state */}
                      <span
                        className="faq-plus shrink-0"
                        aria-hidden="true"
                        style={{ color: "var(--teal-deep)", fontSize: "22px", lineHeight: 1 }}
                      >
                        +
                      </span>
                    </summary>
                    {/* P6 — body text line height 1.8 */}
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--label)",
                        lineHeight: 1.8,
                        padding: "0 0 20px",
                        // P6 — comfortable line length for answer text
                        maxWidth: "72ch",
                      }}
                    >
                      {f.a}
                    </p>
                  </details>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
