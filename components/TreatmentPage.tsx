import Link from "next/link";
import type { Treatment } from "@/lib/treatments";
import Reveal from "@/components/Reveal";
import ConsultationForm from "@/components/ConsultationForm";
import BeforeAfterCarousel from "@/components/BeforeAfterCarousel";
import CompositeSlideshow from "@/components/CompositeSlideshow";

const ANNOUNCE = "⭐ Highest rated clinic in Malta ⭐ · Medically qualified doctors · #1 voted med-aesthetics clinic in malta";


function CheckIcon({ ok }: { ok: boolean }) {
  return (
    <svg className="shrink-0" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "1px" }}>
      {ok ? <path d="M5 12.5l4.5 4.5L19 7" /> : <path d="M7 7l10 10M17 7L7 17" />}
    </svg>
  );
}

// small icon by metric keyword for the info card
function MetricIcon({ metric }: { metric: string }) {
  const m = metric.toLowerCase();
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "var(--teal)", strokeWidth: 1.6 } as const;
  if (m.includes("time") || m.includes("duration")) return (<svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
  if (m.includes("downtime") || m.includes("recovery")) return (<svg {...common}><path d="M3 12h4l2 5 4-10 2 5h6" /></svg>);
  if (m.includes("last") || m.includes("results last")) return (<svg {...common}><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>);
  if (m.includes("visible")) return (<svg {...common}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>);
  if (m.includes("anaesth") || m.includes("anesth")) return (<svg {...common}><path d="M18 2l4 4-9 9-4 1 1-4z" /><path d="M14 6l4 4" /></svg>);
  return (<svg {...common}><circle cx="12" cy="12" r="9" /></svg>);
}

function InfoCard({ info }: { info: NonNullable<Treatment["info"]> }) {
  return (
    <div className="rounded-xl bg-white" style={{ border: "1px solid var(--line)", padding: "20px 24px", boxShadow: "0 14px 40px rgba(0,0,0,0.05)" }}>
      <div className="font-display" style={{ fontSize: "12px", color: "var(--teal)", letterSpacing: "0.14em", marginBottom: "14px" }}>TREATMENT INFO</div>
      {info.map((it, i) => (
        <div key={it.metric} className="flex items-center justify-between gap-4" style={{ padding: "10px 0", borderTop: i === 0 ? "none" : "1px solid var(--line)" }}>
          <span className="flex items-center gap-3">
            <MetricIcon metric={it.metric} />
            <span className="font-display" style={{ fontSize: "11px", color: "var(--ink-soft)", letterSpacing: "0.1em" }}>{it.metric}</span>
          </span>
          <span style={{ fontSize: "13px", color: "var(--label)", textAlign: "right" }}>{it.detail}</span>
        </div>
      ))}
    </div>
  );
}

export default function TreatmentPage({ t }: { t: Treatment }) {
  const hasImage = Boolean(t.hero.image);
  return (
    <>
      {/* Hero — 2-column (content left, media + info card right) matching live */}
      <section style={{ background: "url('/assets/hero-bg.png') center / 100% 100% no-repeat", padding: "44px 0 64px" }}>
        <div className="container">
          <p className="font-display text-center" style={{ fontSize: "11px", color: "var(--gold-deep)", letterSpacing: "0.16em", marginBottom: "26px" }}>
            {ANNOUNCE}
          </p>

          <div style={t.hero.bgImage ? { borderRadius: "26px", backgroundImage: `linear-gradient(rgba(255,255,255,0.62), rgba(255,255,255,0.72)), url('${t.hero.bgImage}')`, backgroundSize: "cover", backgroundPosition: "center", padding: "clamp(24px,3.5vw,48px)" } : undefined}>
          <div className={hasImage ? "grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-start" : ""}>
            {/* Left: content */}
            <Reveal>
              <h1 className="font-serif" style={{ fontSize: "clamp(28px,4.4vw,46px)", color: "var(--gold)", letterSpacing: "0.04em", textAlign: hasImage ? "left" : "center" }}>
                {t.hero.title}
              </h1>
              {t.hero.benefits && t.hero.benefits.length > 0 && (
                <ul className="space-y-3" style={{ marginTop: "20px", maxWidth: hasImage ? "100%" : "560px", marginInline: hasImage ? undefined : "auto", textAlign: "left" }}>
                  {t.hero.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="shrink-0 inline-flex items-center justify-center" style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#e3eded", color: "var(--teal)", marginTop: "1px" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
                      </span>
                      <span style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.5 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {t.hero.subtitle && (
                <p style={{ fontSize: "15px", color: "var(--label)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "22px", lineHeight: 1.5, textAlign: hasImage ? "left" : "center", maxWidth: hasImage ? undefined : "720px", marginInline: hasImage ? undefined : "auto" }}>
                  {t.hero.subtitle}
                </p>
              )}
              {t.hero.body && (
                <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.8, marginTop: "18px", textAlign: hasImage ? "justify" : "center", maxWidth: hasImage ? undefined : "760px", marginInline: hasImage ? undefined : "auto" }}>
                  {t.hero.body}
                </p>
              )}
              {t.hero.location && (
                <p className="font-display" style={{ fontSize: "12px", color: "var(--teal)", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: "14px", textAlign: hasImage ? "left" : "center" }}>
                  {t.hero.location}
                </p>
              )}
              {t.hero.prices && t.hero.prices.length > 0 && (
                <ul style={{ marginTop: "26px", maxWidth: hasImage ? "100%" : "560px", marginInline: hasImage ? undefined : "auto" }}>
                  {t.hero.prices.map((p) => {
                    const m = p.price.match(/^(.*?)\s*(€\S+)\s*$/);
                    const prefix = m ? m[1] : p.price;
                    const amount = m ? m[2] : "";
                    return (
                      <li key={p.label} className="flex items-baseline gap-2" style={{ padding: "5px 0" }}>
                        <span style={{ color: "var(--teal)", fontSize: "11px", lineHeight: 1.7 }}>●</span>
                        <span style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.5 }}>
                          {p.label} {prefix}{" "}
                          {amount && <u style={{ color: "var(--teal)", textUnderlineOffset: "2px", fontWeight: 500 }}>{amount}</u>}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
              <div style={{ marginTop: "30px", textAlign: hasImage ? "left" : "center" }}>
                <Link href="/consultation" className="btn btn-teal">{t.hero.cta ?? "BOOK YOUR CONSULTATION"}</Link>
              </div>
              {t.hero.note && (
                <p style={{ marginTop: "16px", fontSize: "12px", color: "var(--muted)", lineHeight: 1.6, textAlign: hasImage ? "left" : "center", maxWidth: hasImage ? undefined : "620px", marginInline: hasImage ? undefined : "auto" }}>
                  {t.hero.note}
                </p>
              )}
              {t.hero.heroForm && (
                <div style={{ marginTop: "22px" }}>
                  <ConsultationForm stacked submitLabel="Submit" />
                </div>
              )}
              {t.pending && (
                <p style={{ marginTop: "24px", fontSize: "12px", color: "var(--muted)", fontStyle: "italic", textAlign: hasImage ? "left" : "center" }}>
                  Detailed treatment information for this page is being finalised.
                </p>
              )}
            </Reveal>

            {/* Right: media + info card */}
            {hasImage && (
              <Reveal delay={120}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.hero.image} alt={t.hero.title} className="w-full rounded-xl" style={{ display: "block", boxShadow: "0 20px 50px rgba(0,0,0,0.10)", ...(t.hero.imageRatio ? { aspectRatio: t.hero.imageRatio, objectFit: "cover" } : {}) }} />
                {t.hero.productTabs && t.hero.productTabs.length > 0 && (
                  <div className="flex gap-3" style={{ marginTop: "14px" }}>
                    {t.hero.productTabs.map((tab) => (
                      <span key={tab} className="font-display" style={{ flex: 1, textAlign: "center", padding: "11px 14px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "12px", letterSpacing: "0.1em", color: "var(--ink)", background: "var(--white)" }}>{tab}</span>
                    ))}
                  </div>
                )}
                {t.info && <div style={{ marginTop: "18px", maxWidth: "100%", position: "relative" }}><InfoCard info={t.info} /></div>}

                {/* Trust block + scroll cue under the treatment info */}
                <div style={{ marginTop: "26px" }}>
                  {/* Google rating */}
                  <div className="flex items-center flex-wrap gap-x-2 gap-y-1" style={{ fontSize: "13px", color: "var(--label)" }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" /><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" /></svg>
                    <span style={{ fontWeight: 600 }}>4.9</span>
                    <span className="flex" style={{ color: "var(--teal)" }}>
                      {[0, 1, 2, 3, 4].map((i) => (
                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                      ))}
                    </span>
                    <span className="font-display" style={{ color: "var(--teal)", fontSize: "11px", letterSpacing: "0.1em" }}>TOP-RATED CLINIC IN MALTA</span>
                  </div>

                  {/* Check items */}
                  <ul className="space-y-3" style={{ marginTop: "20px" }}>
                    {["Malta's leading wellness chain", "30+ years of expertise", "Medically qualified"].map((label) => (
                      <li key={label} className="flex items-center gap-3">
                        <span className="shrink-0 inline-flex items-center justify-center" style={{ width: "26px", height: "26px", border: "1.5px solid var(--teal)", borderRadius: "5px", color: "var(--teal)" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 6" /></svg>
                        </span>
                        <span className="font-display" style={{ fontSize: "12.5px", color: "var(--label)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Scroll down cue */}
                  <div className="text-center" style={{ marginTop: "30px" }}>
                    <p className="font-display" style={{ fontSize: "14px", color: "var(--label)", letterSpacing: "0.12em", lineHeight: 1.5 }}>Scroll down to learn more</p>
                    <div className="flex justify-center" style={{ width: "32px", height: "50px", border: "1.5px solid var(--teal)", borderRadius: "16px", margin: "16px auto 0", paddingTop: "9px" }}>
                      <svg className="animate-bounce" width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2"><path d="M12 4v12M6 12l6 6 6-6" /></svg>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
          </div>

          {/* info bar fallback when no hero image */}
          {!hasImage && t.info && (
            <div className="rounded-lg bg-white mx-auto" style={{ border: "1px solid var(--line)", padding: "22px 20px", marginTop: "32px", maxWidth: "900px", boxShadow: "0 14px 40px rgba(0,0,0,0.05)" }}>
              <div className="grid gap-6 text-center" style={{ gridTemplateColumns: `repeat(${Math.min(t.info.length, 5)}, minmax(0,1fr))` }}>
                {t.info.map((it) => (
                  <div key={it.metric}>
                    <div className="font-display" style={{ fontSize: "11px", color: "var(--teal)", letterSpacing: "0.14em", marginBottom: "8px" }}>{it.metric}</div>
                    <div style={{ fontSize: "14px", color: "var(--ink)" }}>{it.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Education — "what is all the hype?" + technology diagram + suitability chart */}
      {t.education && (
        <section style={{ padding: "80px 0", backgroundColor: "var(--cream)" }}>
          <div className="container">
            <h2 className="font-serif text-center" style={{ fontSize: "clamp(24px,3.4vw,38px)", color: "var(--gold)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{t.education.title}</h2>
            {t.education.subtitle && (
              <p className="font-display text-center" style={{ fontSize: "14px", color: "var(--label)", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: "12px" }}>{t.education.subtitle}</p>
            )}
            <div className="mx-auto" style={{ marginTop: "26px", maxWidth: "820px" }}>
              {t.education.paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.85, marginTop: i === 0 ? 0 : "16px", textAlign: "center" }}>{p}</p>
              ))}
            </div>
            {t.education.image && (
              <figure className="mx-auto text-center" style={{ marginTop: "48px", maxWidth: "760px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.education.image} alt={t.education.imageCaption ?? "Laser technology diagram"} className="w-full" style={{ display: "block", borderRadius: "14px" }} />
                {t.education.imageCaption && (
                  <figcaption style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6, marginTop: "14px" }}>{t.education.imageCaption}</figcaption>
                )}
              </figure>
            )}
            {t.education.chart && (
              <figure className="mx-auto text-center" style={{ marginTop: "44px", maxWidth: "520px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.education.chart} alt={t.education.chartCaption ?? "Skin tone and hair colour suitability chart"} className="w-full" style={{ display: "block", borderRadius: "14px" }} />
                {t.education.chartCaption && (
                  <figcaption style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6, marginTop: "14px" }}>{t.education.chartCaption}</figcaption>
                )}
              </figure>
            )}
          </div>
        </section>
      )}

      {/* Guarantee — "never shave again. guaranteed." + before/after slideshow */}
      {t.guarantee && (
        <section style={{ padding: "80px 0" }}>
          <div className="container">
            <h2 className="font-serif text-center" style={{ fontSize: "clamp(24px,3.4vw,38px)", color: "var(--gold)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{t.guarantee.title}</h2>
            <div className="mx-auto" style={{ marginTop: "24px", maxWidth: "780px" }}>
              {t.guarantee.paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.85, marginTop: i === 0 ? 0 : "16px", textAlign: "center" }}>{p}</p>
              ))}
            </div>
            {t.guarantee.cta && (
              <div className="text-center" style={{ marginTop: "30px" }}>
                <Link href="/consultation" className="btn btn-teal">{t.guarantee.cta}</Link>
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

      {/* Before / after — real photo pair (matches live carousel) */}
      {(t.beforeAfter || t.beforeAfterTitle) && (
        <section style={{ padding: "70px 0", backgroundColor: "var(--cream)" }}>
          {t.beforeAfter && t.beforeAfter.length > 0 ? (
            <BeforeAfterCarousel pairs={t.beforeAfter} title={t.beforeAfterTitle} />
          ) : (
            <div className="container text-center">
              {t.beforeAfterTitle && <h2 className="font-display" style={{ fontSize: "clamp(20px,3vw,30px)", color: "var(--label)", marginBottom: "36px" }}>{t.beforeAfterTitle}</h2>}
              <div className="grid gap-4 sm:grid-cols-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="rounded-lg flex items-center justify-center" style={{ aspectRatio: "4/3", backgroundColor: "var(--white)", border: "1px solid var(--line)", color: "var(--muted)", fontSize: "13px" }}>Before / After {n}</div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Precision areas */}
      {t.precision && (
        <section style={{ padding: "80px 0" }}>
          <div className="container">
            <h2 className="font-display text-center" style={{ fontSize: "clamp(20px,3vw,30px)", color: "var(--label)" }}>{t.precision.title}</h2>
            {t.precision.intro && (
              <p className="text-center mx-auto" style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.8, marginTop: "16px", maxWidth: "760px" }}>{t.precision.intro}</p>
            )}
            {t.precision.areas && t.precision.areas.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ marginTop: "44px" }}>
                {t.precision.areas.map((a, i) => (
                  <Reveal key={a.name} delay={(i % 4) * 70} className="text-center" style={{ background: "linear-gradient(150deg, #ffffff 0%, #eef4f5 55%, #dde8ea 100%)", padding: "32px 24px", borderRadius: "10px 40px 10px 40px", border: "1px solid var(--line)", boxShadow: "0 12px 30px rgba(0,0,0,0.05)" }}>
                    {a.icon && (
                      <div className="flex justify-center" style={{ marginBottom: "16px" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={a.icon} alt={a.zone ?? a.name} style={{ height: "70px", width: "auto" }} />
                      </div>
                    )}
                    {a.zone && <div className="font-display" style={{ fontSize: "11px", color: "var(--teal)", letterSpacing: "0.16em", marginBottom: "10px" }}>{a.zone}</div>}
                    <h3 className="font-display" style={{ fontSize: "15px", color: "var(--gold-deep)", letterSpacing: "0.05em", marginBottom: a.desc ? "12px" : "0" }}>{a.name}</h3>
                    {a.desc && <p style={{ fontSize: "13.5px", color: "var(--ink-soft)", lineHeight: 1.7 }}>{a.desc}</p>}
                  </Reveal>
                ))}
              </div>
            )}
            {t.precision.additional && (
              <div className="mx-auto" style={{ marginTop: "44px", maxWidth: "760px", borderLeft: "3px solid var(--teal)", paddingLeft: "22px" }}>
                <h3 className="font-display" style={{ fontSize: "14px", color: "var(--gold)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px" }}>
                  {t.precision.additionalTitle ?? "Additional Treatment Areas"}
                </h3>
                {t.precision.additionalIntro && (
                  <p style={{ fontSize: "15px", color: "var(--ink-soft)", lineHeight: 1.7, marginBottom: "12px" }}>{t.precision.additionalIntro}</p>
                )}
                <p className="font-display" style={{ fontSize: "13px", color: "var(--label)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{t.precision.additional}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Suitability */}
      {t.suitability && (
        <section style={{ padding: "80px 0", backgroundColor: "var(--cream)" }}>
          <div className="container">
            <h2 className="font-serif text-center" style={{ fontSize: "clamp(24px,3.4vw,38px)", color: "var(--gold)", letterSpacing: "0.04em" }}>{t.suitability.title}</h2>
            {t.suitability.intro && (
              <p className="text-center mx-auto" style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.8, marginTop: "18px", maxWidth: "880px" }}>{t.suitability.intro}</p>
            )}
            <Reveal
              className="mx-auto"
              style={{ marginTop: "48px", maxWidth: "1040px", border: "1px solid var(--line)", borderRadius: "32px 90px 32px 90px", background: "linear-gradient(170deg,#ffffff 0%, #f1f6f7 60%, #e3ecee 100%)", overflow: "hidden" }}
            >
              <div className="grid md:grid-cols-2">
                <div style={{ padding: "clamp(32px,3.5vw,48px)", borderRight: "1px solid var(--line)" }}>
                  <h3 className="font-display" style={{ fontSize: "14px", color: "var(--label)", marginBottom: "26px", letterSpacing: "0.12em", textTransform: "uppercase" }}>Suitable for you if</h3>
                  <ul className="space-y-6">
                    {(t.suitability.suitableFor ?? []).map((s) => (
                      <li key={s} className="flex items-start gap-4"><CheckIcon ok /><span style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.55 }}>{s}</span></li>
                    ))}
                  </ul>
                </div>
                <div style={{ padding: "clamp(32px,3.5vw,48px)" }}>
                  <h3 className="font-display" style={{ fontSize: "14px", color: "var(--label)", marginBottom: "26px", letterSpacing: "0.12em", textTransform: "uppercase" }}>May not be ideal if</h3>
                  <ul className="space-y-6">
                    {(t.suitability.notIdeal ?? []).map((s) => (
                      <li key={s} className="flex items-start gap-4"><CheckIcon ok={false} /><span style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.55 }}>{s}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Treatment experience — dashed timeline + STEP number + photo card */}
      {t.experience && (
        <section style={{ padding: "80px 0" }}>
          <div className="container">
            <h2 className="font-serif text-center" style={{ fontSize: "clamp(24px,3.4vw,38px)", color: "var(--gold)", letterSpacing: "0.06em", marginBottom: "56px" }}>{t.experience.title}</h2>
            <div className="relative mx-auto" style={{ maxWidth: "760px" }}>
              {/* continuous dashed timeline */}
              <span aria-hidden style={{ position: "absolute", left: "22px", top: "46px", bottom: "46px", borderLeft: "1px dashed #c2d3d3", zIndex: 0 }} />
              {t.experience.steps.map((s, i) => (
                <Reveal key={s.title || i} delay={i * 80} className="relative grid items-center" style={{ gridTemplateColumns: "44px 84px minmax(0, 440px)", columnGap: "22px", marginBottom: i === t.experience!.steps.length - 1 ? 0 : "40px" }}>
                  {/* timeline node */}
                  <div className="flex justify-center" style={{ position: "relative", zIndex: 1 }}>
                    <span style={{ width: "18px", height: "18px", borderRadius: "50%", background: "var(--teal)", boxShadow: "0 0 0 5px #dde8e8" }} />
                  </div>
                  {/* STEP + number */}
                  <div className="text-center">
                    <div className="font-serif" style={{ fontSize: "17px", color: "var(--gold)", letterSpacing: "0.14em" }}>STEP</div>
                    <div className="font-serif" style={{ fontSize: "clamp(30px,4vw,46px)", color: "var(--gold)", opacity: 0.5, lineHeight: 1.1 }}>{i + 1}</div>
                  </div>
                  {/* photo card */}
                  <div style={{ borderRadius: "20px 56px 20px 56px", background: "linear-gradient(180deg,#ffffff 0%, #e7eff0 100%)", padding: "10px", boxShadow: "0 16px 38px rgba(0,0,0,0.07)" }}>
                    {s.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.image} alt={s.title} style={{ display: "block", width: "100%", aspectRatio: "9 / 4", objectFit: "cover", borderRadius: "20px 56px 20px 56px" }} />
                    )}
                    <div style={{ padding: "16px clamp(14px,2vw,22px) 14px" }}>
                      {s.title && <h3 className="font-display text-center" style={{ fontSize: "15px", color: "var(--label)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: s.desc ? "12px" : "0" }}>{s.title}</h3>}
                      {s.desc && <p style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.7 }}>{s.desc}</p>}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Preparation & Aftercare — before / during / after cards */}
      {t.prepAftercare && (
        <section style={{ padding: "80px 0" }}>
          <div className="container">
            {t.prepAftercare.kicker && (
              <p className="font-display text-center" style={{ fontSize: "11px", color: "var(--teal)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "14px" }}>{t.prepAftercare.kicker}</p>
            )}
            <h2 className="font-serif text-center" style={{ fontSize: "clamp(24px,3.4vw,38px)", color: "var(--gold)", letterSpacing: "0.04em" }}>{t.prepAftercare.title}</h2>
            {t.prepAftercare.intro && (
              <p className="text-center mx-auto" style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.8, marginTop: "18px", maxWidth: "760px" }}>{t.prepAftercare.intro}</p>
            )}
            <div className="grid gap-6 md:grid-cols-3" style={{ marginTop: "48px" }}>
              {t.prepAftercare.cards.map((c, i) => (
                <Reveal key={c.label} delay={(i % 3) * 90} style={{ borderRadius: "20px 56px 20px 56px", background: "linear-gradient(170deg,#ffffff 0%, #f1f6f7 60%, #e3ecee 100%)", border: "1px solid var(--line)", boxShadow: "0 12px 30px rgba(0,0,0,0.05)", padding: "clamp(26px,3vw,34px)" }}>
                  <div className="flex items-center gap-3" style={{ marginBottom: "16px" }}>
                    {c.icon && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.icon} alt={c.label} style={{ height: "40px", width: "auto" }} />
                    )}
                    <span className="font-display" style={{ fontSize: "14px", color: "var(--label)", letterSpacing: "0.14em", textTransform: "uppercase" }}>{c.label}</span>
                  </div>
                  <p style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.65, marginBottom: "18px" }}>{c.lead}</p>
                  <ul className="space-y-4">
                    {c.points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <span style={{ color: "var(--teal)", fontSize: "12px", lineHeight: 1.7 }}>●</span>
                        <span style={{ fontSize: "13.5px", color: "var(--label)", lineHeight: 1.55 }}>{p}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Real patients — autoplay video reels */}
      {t.patientVideos && (
        <section style={{ padding: "80px 0" }}>
          <div className="container">
            <h2 className="font-serif text-center" style={{ fontSize: "clamp(24px,3.4vw,38px)", color: "var(--gold)", letterSpacing: "0.04em" }}>{t.patientVideos.title}</h2>
            {t.patientVideos.intro && (
              <p className="text-center mx-auto" style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.8, marginTop: "18px", maxWidth: "820px" }}>{t.patientVideos.intro}</p>
            )}
            <div className="grid gap-6 md:grid-cols-3 mx-auto" style={{ marginTop: "44px", maxWidth: "1040px" }}>
              {t.patientVideos.videos.map((src, i) => (
                <Reveal key={src} delay={(i % 3) * 90} style={{ borderRadius: "28px 64px 28px 64px", overflow: "hidden", boxShadow: "0 16px 38px rgba(0,0,0,0.10)" }}>
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <video
                    src={src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full"
                    style={{ display: "block", aspectRatio: "4 / 5", objectFit: "cover" }}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trusted clinic — AS SEEN ON + image cluster + trust points */}
      {t.trusted && (
        <section style={{ padding: "70px 0 84px" }}>
          <div className="container">
            <h2 className="font-serif text-center" style={{ fontSize: "clamp(24px,3.4vw,38px)", color: "var(--gold)", letterSpacing: "0.04em" }}>{t.trusted.title}</h2>
            {t.trusted.subtitle && (
              <p className="font-display text-center" style={{ fontSize: "14px", color: "var(--label)", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: "12px" }}>{t.trusted.subtitle}</p>
            )}
            {t.trusted.asSeenOn && t.trusted.asSeenOn.length > 0 && (
              <div className="text-center" style={{ marginTop: "28px" }}>
                <p className="font-display" style={{ fontSize: "11px", color: "var(--gold-deep)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "14px" }}>As seen on</p>
                <div className="flex flex-wrap items-center justify-center" style={{ gap: "26px" }}>
                  {t.trusted.asSeenOn.map((logo) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={logo} src={logo} alt="" style={{ height: "26px", width: "auto", objectFit: "contain" }} />
                  ))}
                </div>
              </div>
            )}

            <Reveal className="mx-auto" style={{ marginTop: "40px", maxWidth: "1100px", borderRadius: "32px", background: "linear-gradient(135deg,#eef4f5 0%, #ffffff 45%, #e6eef0 100%)", border: "1px solid var(--line)", padding: "clamp(28px,4vw,52px)" }}>
              <div className="grid gap-10 lg:grid-cols-2 items-center">
                {/* image cluster — flower of 4 leaf-corner photos */}
                <div className="grid grid-cols-2" style={{ gap: "10px", maxWidth: "470px" }}>
                  {t.trusted.images.slice(0, 4).map((src, i) => {
                    const radii = ["64px 16px 16px 16px", "16px 64px 16px 16px", "16px 16px 16px 64px", "16px 16px 64px 16px"];
                    return (
                      <div key={src} className="overflow-hidden" style={{ borderRadius: radii[i] }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="" style={{ display: "block", width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }} />
                      </div>
                    );
                  })}
                </div>
                {/* trust points */}
                <ul className="space-y-6">
                  {t.trusted.points.map((p) => (
                    <li key={p.title} className="flex items-start gap-4">
                      <span className="shrink-0 inline-flex items-center justify-center" style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#e3eded", color: "var(--teal)", marginTop: "2px" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
                      </span>
                      <div>
                        <h3 className="font-display" style={{ fontSize: "15px", color: "var(--gold)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "4px" }}>{p.title}</h3>
                        <p style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.6 }}>{p.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* The Carisma Difference — commitment + why + map */}
      {t.difference && (
        <section style={{ padding: "10px 0 84px" }}>
          <div className="container">
            <div className="mx-auto" style={{ maxWidth: "1120px", borderRadius: "36px", background: "linear-gradient(160deg,#eef4f5 0%, #ffffff 50%, #e6eef0 100%)", border: "1px solid var(--line)", padding: "clamp(32px,4vw,60px)" }}>
              {t.difference.kicker && (
                <div className="text-center">
                  <p className="font-display" style={{ fontSize: "11px", color: "var(--teal)", letterSpacing: "0.18em", textTransform: "uppercase" }}>{t.difference.kicker}</p>
                  <div className="mx-auto" style={{ width: "80px", height: "1px", background: "var(--teal)", margin: "10px auto 0" }} />
                </div>
              )}
              <h2 className="font-serif text-center" style={{ fontSize: "clamp(24px,3.4vw,38px)", color: "#8fa3a0", letterSpacing: "0.04em", marginTop: "20px" }}>{t.difference.title}</h2>

              <div className="grid gap-12 lg:grid-cols-2 items-stretch" style={{ marginTop: "44px" }}>
                {/* left: commitment + why */}
                <div>
                  <h3 className="font-display" style={{ fontSize: "13px", color: "var(--label)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "18px" }}>{t.difference.commitmentTitle}</h3>
                  <ul className="space-y-3">
                    {t.difference.commitment.map((it) => (
                      <li key={it} className="flex items-start gap-3"><span style={{ color: "var(--label)", fontSize: "12px", lineHeight: 1.7 }}>•</span><span style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.6 }}>{it}</span></li>
                    ))}
                  </ul>
                  <h3 className="font-display" style={{ fontSize: "13px", color: "var(--label)", letterSpacing: "0.12em", textTransform: "uppercase", margin: "34px 0 18px" }}>{t.difference.whyTitle}</h3>
                  <ul className="space-y-3">
                    {t.difference.why.map((it) => (
                      <li key={it} className="flex items-start gap-3"><span style={{ color: "var(--label)", fontSize: "12px", lineHeight: 1.7 }}>•</span><span style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.6 }}>{it}</span></li>
                    ))}
                  </ul>
                </div>
                {/* right: map */}
                <div style={{ borderRadius: "44px 16px 44px 16px", overflow: "hidden", boxShadow: "0 16px 38px rgba(0,0,0,0.10)", minHeight: "380px" }}>
                  <iframe
                    title="Carisma Aesthetics location"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(t.difference.mapQuery)}&z=14&output=embed`}
                    loading="lazy"
                    style={{ border: 0, width: "100%", height: "100%", minHeight: "380px", display: "block" }}
                  />
                </div>
              </div>

              {/* bottom: CTA + parking */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6" style={{ marginTop: "48px" }}>
                <Link href="/consultation" className="btn btn-teal" style={{ minWidth: "300px", textAlign: "center" }}>Book Your Free Consultation</Link>
                <div className="flex items-center gap-3">
                  <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden><path fill="none" stroke="var(--teal)" strokeWidth="1.4" d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" /><text x="12" y="13.5" textAnchor="middle" fontSize="9" fill="var(--teal)" fontWeight="700">P</text></svg>
                  <span className="font-display" style={{ fontSize: "13px", color: "var(--label)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Complimentary On-Site Parking</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Booking form — teal banner + consultation form */}
      {t.bookingForm && (
        <section style={{ padding: "30px 0 84px" }}>
          <div className="container">
            <div className="mx-auto" style={{ maxWidth: "1120px" }}>
              <div style={{ background: "linear-gradient(180deg,#c0d2d2 0%, #9fb9b9 100%)", borderRadius: "18px 56px 18px 18px", padding: "clamp(26px,3vw,40px) 32px", textAlign: "center", position: "relative", zIndex: 1, boxShadow: "0 14px 30px rgba(0,0,0,0.08)" }}>
                <h2 style={{ fontSize: "clamp(20px,3vw,33px)", color: "#fff", letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 400 }}>{t.bookingForm.title}</h2>
              </div>
              <div className="mx-auto" style={{ marginTop: "12px", position: "relative" }}>
                <ConsultationForm stacked submitLabel="Submit" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pricing grid — per-area pricing cards (rendered after the process timeline) */}
      {t.pricingGrid && (
        <section style={{ padding: "80px 0", backgroundColor: "var(--cream)" }}>
          <div className="container">
            <h2 className="font-serif text-center" style={{ fontSize: "clamp(24px,3.4vw,38px)", color: "var(--gold)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{t.pricingGrid.title}</h2>
            {t.pricingGrid.intro && (
              <p className="text-center mx-auto" style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.8, marginTop: "16px", maxWidth: "760px" }}>{t.pricingGrid.intro}</p>
            )}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ marginTop: "44px" }}>
              {t.pricingGrid.items.map((it, i) => (
                <Reveal key={it.name} delay={(i % 3) * 70} className="text-center" style={{ background: "linear-gradient(150deg, #ffffff 0%, #eef4f5 55%, #dde8ea 100%)", padding: "32px 26px", borderRadius: "10px 40px 10px 40px", border: "1px solid var(--line)", boxShadow: "0 12px 30px rgba(0,0,0,0.05)" }}>
                  <h3 className="font-display" style={{ fontSize: "16px", color: "var(--gold-deep)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>{it.name}</h3>
                  <div className="font-display" style={{ fontSize: "13px", color: "var(--teal)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>{it.price}</div>
                  <p style={{ fontSize: "13.5px", color: "var(--ink-soft)", lineHeight: 1.7 }}>{it.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Membership tiers — Bronze / Silver / Gold cards */}
      {t.membership && (
        <section style={{ padding: "80px 0" }}>
          <div className="container">
            <h2 className="font-serif text-center" style={{ fontSize: "clamp(24px,3.4vw,38px)", color: "var(--gold)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{t.membership.title}</h2>
            {t.membership.intro && (
              <p className="text-center mx-auto" style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.8, marginTop: "18px", maxWidth: "880px" }}>{t.membership.intro}</p>
            )}
            <div className="grid gap-8 md:grid-cols-3 mx-auto" style={{ marginTop: "48px", maxWidth: "1040px" }}>
              {t.membership.tiers.map((tier, i) => (
                <Reveal key={tier.name} delay={(i % 3) * 90} className="text-center" style={{ background: "linear-gradient(170deg,#ffffff 0%, #f1f6f7 60%, #e3ecee 100%)", border: "1px solid var(--line)", borderRadius: "20px 56px 20px 56px", boxShadow: "0 12px 30px rgba(0,0,0,0.05)", padding: "clamp(24px,3vw,32px)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={tier.image} alt={tier.name} className="mx-auto" style={{ display: "block", width: "100%", maxWidth: "280px", borderRadius: "14px", boxShadow: "0 10px 26px rgba(0,0,0,0.12)" }} />
                  <h3 className="font-display" style={{ fontSize: "16px", color: "var(--gold-deep)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "22px" }}>{tier.name}</h3>
                  <div className="flex items-center justify-center gap-2" style={{ marginTop: "14px" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M5 12.5l4.5 4.5L19 7" /></svg>
                    <span style={{ fontSize: "14px", color: "var(--label)" }}>{tier.sessions}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2" style={{ marginTop: "12px" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.7"><circle cx="12" cy="12" r="9" /><path d="M15 9a3.5 3.5 0 0 0-3-1.6c-1.9 0-3 1.3-3 2.6s1.1 2.6 3 2.6 3 1.3 3 2.6-1.1 2.6-3 2.6A3.5 3.5 0 0 1 9 15M12 6v12" /></svg>
                    <span className="font-display" style={{ fontSize: "18px", color: "var(--teal)", letterSpacing: "0.06em" }}>{tier.price}</span>
                  </div>
                  <div style={{ marginTop: "22px" }}>
                    <Link href="/consultation" className="btn btn-teal" style={{ fontSize: "12px" }}>book your session</Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recommended with — cross-sell cards */}
      {t.recommended && (
        <section style={{ padding: "20px 0 84px" }}>
          <div className="container">
            <h2 className="font-serif text-center" style={{ fontSize: "clamp(24px,3.4vw,38px)", color: "var(--gold)", letterSpacing: "0.04em", marginBottom: "48px" }}>{t.recommended.title}</h2>
            <div className="grid gap-8 sm:grid-cols-2 mx-auto" style={{ maxWidth: "920px" }}>
              {t.recommended.items.map((it, i) => (
                <Reveal key={it.href} delay={(i % 2) * 90}>
                  <div className="overflow-hidden" style={{ borderRadius: "24px 24px 60px 24px", boxShadow: "0 14px 34px rgba(0,0,0,0.10)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.image} alt={it.label} style={{ display: "block", width: "100%", aspectRatio: "3 / 2", objectFit: "cover" }} />
                  </div>
                  <h3 className="font-display" style={{ fontSize: "14px", color: "var(--label)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "18px 4px 14px" }}>{it.label}</h3>
                  <Link href={it.href} className="block text-center font-display" style={{ background: "linear-gradient(180deg,#a9c2c2 0%, #8fb0b0 100%)", color: "#fff", padding: "15px", fontSize: "13px", letterSpacing: "0.16em", textTransform: "uppercase", borderRadius: "8px" }}>Explore</Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ accordion */}
      {t.faq && t.faq.length > 0 && (
        <section style={{ padding: "70px 0 90px", backgroundColor: "var(--cream)" }}>
          <div className="container">
            <h2 className="font-serif text-center" style={{ fontSize: "clamp(24px,3.4vw,38px)", color: "var(--gold)", letterSpacing: "0.04em", marginBottom: "44px" }}>Frequently Asked Questions</h2>
            <div className="mx-auto" style={{ maxWidth: "820px" }}>
              {t.faq.map((f) => (
                <details key={f.q} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "12px", marginBottom: "12px", padding: "0 22px" }}>
                  <summary className="flex items-center justify-between gap-4" style={{ cursor: "pointer", padding: "18px 0", fontSize: "15px", fontWeight: 500, color: "var(--gold-deep)", letterSpacing: "0.01em" }}>
                    <span>{f.q}</span>
                    <span className="faq-plus shrink-0" style={{ color: "var(--teal)", fontSize: "22px", lineHeight: 1 }}>+</span>
                  </summary>
                  <p style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.8, padding: "0 0 20px" }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
