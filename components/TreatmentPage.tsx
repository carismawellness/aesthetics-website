import Link from "next/link";
import type { Treatment } from "@/lib/treatments";
import Reveal from "@/components/Reveal";
import ConsultationForm from "@/components/ConsultationForm";
import BeforeAfterCarousel from "@/components/BeforeAfterCarousel";

const ANNOUNCE = "⭐ Highest rated clinic in Malta ⭐ · Medically qualified doctors · #1 voted med-aesthetics clinic in malta";

function PrecisionIcon({ name }: { name?: string }) {
  const p = { width: 46, height: 46, viewBox: "0 0 48 48", fill: "none", stroke: "var(--teal)", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "forehead":
      return (<svg {...p}><path d="M15 31c0-9 4-15 9-15s9 6 9 15c0 5-3 8-9 8s-9-3-9-8z" /><line x1="20" y1="21" x2="28" y2="21" /><line x1="19" y1="25" x2="29" y2="25" /><line x1="20" y1="29" x2="28" y2="29" /></svg>);
    case "brow":
      return (<svg {...p}><path d="M11 29q5-4 10 0" /><path d="M25 29q5-4 10 0" /><line x1="29" y1="13" x2="37" y2="21" /><line x1="34" y1="11" x2="39" y2="16" /><line x1="31" y1="18" x2="33" y2="20" /></svg>);
    case "eyes":
      return (<svg {...p}><path d="M11 24c4-6 13-6 17 0c-4 6-13 6-17 0z" /><circle cx="19.5" cy="24" r="3" /><line x1="31" y1="20" x2="38" y2="18" /><line x1="32" y1="24" x2="39" y2="24" /><line x1="31" y1="28" x2="38" y2="30" /></svg>);
    case "neck":
      return (<svg {...p}><path d="M17 12q7 9 14 0" /><path d="M19 14v8q5 4 10 0v-8" /><line x1="22" y1="29" x2="22" y2="37" /><line x1="26" y1="29" x2="26" y2="37" /></svg>);
    default:
      return null;
  }
}

function CheckIcon({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="shrink-0 inline-flex items-center justify-center rounded-full" style={{ width: "24px", height: "24px", backgroundColor: "var(--teal)" }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
    </span>
  ) : (
    <span className="shrink-0 inline-flex items-center justify-center rounded-full" style={{ width: "24px", height: "24px", border: "1.5px solid #c9c9c9" }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9a9a9a" strokeWidth="3"><path d="M6 6l12 12M18 6L6 18" /></svg>
    </span>
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
          <div className={hasImage ? "grid gap-10 lg:grid-cols-2 items-start" : ""}>
            {/* Left: content */}
            <Reveal>
              <h1 className="font-serif" style={{ fontSize: "clamp(28px,4.4vw,46px)", color: "var(--gold)", letterSpacing: "0.04em", textAlign: hasImage ? "left" : "center" }}>
                {t.hero.title}
              </h1>
              {t.hero.subtitle && (
                <p style={{ fontSize: "15px", color: "var(--label)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "14px", lineHeight: 1.5, textAlign: hasImage ? "left" : "center", maxWidth: hasImage ? undefined : "720px", marginInline: hasImage ? undefined : "auto" }}>
                  {t.hero.subtitle}
                </p>
              )}
              {t.hero.body && (
                <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.8, marginTop: "18px", textAlign: hasImage ? "justify" : "center", maxWidth: hasImage ? undefined : "760px", marginInline: hasImage ? undefined : "auto" }}>
                  {t.hero.body}
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
              {t.hero.heroForm && (
                <div style={{ marginTop: "22px", background: "#e6eded", borderRadius: "18px", padding: "clamp(22px,3vw,32px)" }}>
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
                    {a.icon && <div className="flex justify-center" style={{ marginBottom: "16px" }}><PrecisionIcon name={a.icon} /></div>}
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
            <h2 className="font-display text-center" style={{ fontSize: "clamp(20px,3vw,30px)", color: "var(--label)" }}>{t.suitability.title}</h2>
            {t.suitability.intro && (
              <p className="text-center mx-auto" style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.8, marginTop: "16px", maxWidth: "760px" }}>{t.suitability.intro}</p>
            )}
            <div className="grid gap-10 md:grid-cols-2" style={{ marginTop: "44px" }}>
              {t.suitability.suitableFor && t.suitability.suitableFor.length > 0 && (
                <Reveal className="bg-white rounded-lg" style={{ padding: "32px", border: "1px solid var(--line)" }}>
                  <h3 className="font-display" style={{ fontSize: "14px", color: "var(--ink)", marginBottom: "18px", letterSpacing: "0.1em" }}>Suitable for you if</h3>
                  <ul className="space-y-4">
                    {t.suitability.suitableFor.map((s) => (
                      <li key={s} className="flex items-start gap-3"><CheckIcon ok /><span style={{ fontSize: "15px", color: "var(--ink-soft)" }}>{s}</span></li>
                    ))}
                  </ul>
                </Reveal>
              )}
              {t.suitability.notIdeal && t.suitability.notIdeal.length > 0 && (
                <Reveal delay={120} className="bg-white rounded-lg" style={{ padding: "32px", border: "1px solid var(--line)" }}>
                  <h3 className="font-display" style={{ fontSize: "14px", color: "var(--ink)", marginBottom: "18px", letterSpacing: "0.1em" }}>May not be ideal if</h3>
                  <ul className="space-y-4">
                    {t.suitability.notIdeal.map((s) => (
                      <li key={s} className="flex items-start gap-3"><CheckIcon ok={false} /><span style={{ fontSize: "15px", color: "var(--muted)" }}>{s}</span></li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Treatment experience — timeline with per-step photo (matches live) */}
      {t.experience && (
        <section style={{ padding: "80px 0" }}>
          <div className="container">
            <h2 className="font-display text-center" style={{ fontSize: "clamp(20px,3vw,30px)", color: "var(--label)", marginBottom: "48px" }}>{t.experience.title}</h2>
            <div className="mx-auto" style={{ maxWidth: "920px" }}>
              {t.experience.steps.map((s, i) => (
                <Reveal key={s.title || i} delay={i * 80} className="grid gap-6 md:grid-cols-2 items-center" style={{ marginBottom: i === t.experience!.steps.length - 1 ? 0 : "36px" }}>
                  <div className="flex gap-5">
                    <div className="shrink-0 font-display flex items-center justify-center rounded-full text-white" style={{ width: "44px", height: "44px", backgroundColor: "var(--teal)", fontSize: "16px" }}>{i + 1}</div>
                    <div>
                      {s.title && <h3 className="font-display" style={{ fontSize: "15px", color: "var(--ink)", marginBottom: s.desc ? "6px" : "0" }}>{s.title}</h3>}
                      {s.desc && <p style={{ fontSize: "14.5px", color: "var(--muted)", lineHeight: 1.7 }}>{s.desc}</p>}
                    </div>
                  </div>
                  {s.image && (
                    <div className="overflow-hidden rounded-xl" style={{ border: "1px solid var(--line)" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.image} alt={s.title} className="w-full h-full object-cover" style={{ aspectRatio: "16/9" }} />
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section style={{ padding: "70px 0", textAlign: "center", backgroundColor: "var(--cream)" }}>
        <div className="container">
          <h2 className="font-display" style={{ fontSize: "clamp(20px,3vw,28px)", color: "var(--label)", marginBottom: "10px" }}>Ready to begin?</h2>
          <p style={{ color: "var(--muted)", fontSize: "15px", marginBottom: "28px" }}>Book a free consultation with one of our medically qualified doctors.</p>
          <Link href="/consultation" className="btn btn-teal">free consultation</Link>
        </div>
      </section>
    </>
  );
}
