import Link from "next/link";
import type { Treatment } from "@/lib/treatments";
import Reveal from "@/components/Reveal";

const ANNOUNCE = "⭐ Highest rated clinic in Malta ⭐ · Medically qualified doctors · #1 voted med-aesthetics clinic in malta";

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
      <section style={{ background: "linear-gradient(180deg,#ffffff 0%, var(--cream) 100%)", padding: "44px 0 64px" }}>
        <div className="container">
          <p className="font-display text-center" style={{ fontSize: "11px", color: "var(--gold-deep)", letterSpacing: "0.16em", marginBottom: "26px" }}>
            {ANNOUNCE}
          </p>

          <div className={hasImage ? "grid gap-10 lg:grid-cols-2 items-start" : ""}>
            {/* Left: content */}
            <Reveal>
              <h1 className="font-display" style={{ fontSize: "clamp(28px,4.4vw,46px)", color: "var(--ink)", letterSpacing: "0.06em", textAlign: hasImage ? "left" : "center" }}>
                {t.hero.title}
              </h1>
              {t.hero.subtitle && (
                <p className="font-serif" style={{ fontSize: "19px", color: "var(--ink-soft)", textTransform: "none", marginTop: "14px", fontStyle: "italic", textAlign: hasImage ? "left" : "center", maxWidth: hasImage ? undefined : "720px", marginInline: hasImage ? undefined : "auto" }}>
                  {t.hero.subtitle}
                </p>
              )}
              {t.hero.body && (
                <p style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.8, marginTop: "18px", textAlign: hasImage ? "left" : "center", maxWidth: hasImage ? undefined : "760px", marginInline: hasImage ? undefined : "auto" }}>
                  {t.hero.body}
                </p>
              )}
              {t.hero.prices && t.hero.prices.length > 0 && (
                <div style={{ marginTop: "26px", maxWidth: hasImage ? "100%" : "560px", marginInline: hasImage ? undefined : "auto" }}>
                  {t.hero.prices.map((p) => (
                    <div key={p.label} className="flex items-baseline justify-between" style={{ padding: "12px 0", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                      <span style={{ fontSize: "15px", color: "var(--ink-soft)" }}>{p.label}</span>
                      <span className="font-display" style={{ fontSize: "14px", color: "var(--gold-deep)", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{p.price}</span>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ marginTop: "30px", textAlign: hasImage ? "left" : "center" }}>
                <Link href="/consultation" className="btn btn-teal">{t.hero.cta ?? "BOOK YOUR CONSULTATION"}</Link>
              </div>
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
                <img src={t.hero.image} alt={t.hero.title} className="w-full rounded-xl" style={{ aspectRatio: "4/3", objectFit: "cover", boxShadow: "0 20px 50px rgba(0,0,0,0.10)" }} />
                {t.info && <div style={{ marginTop: "-40px", marginLeft: "auto", maxWidth: "420px", position: "relative" }}><InfoCard info={t.info} /></div>}
              </Reveal>
            )}
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
          <div className="container text-center">
            {t.beforeAfterTitle && <h2 className="font-display" style={{ fontSize: "clamp(20px,3vw,30px)", color: "var(--ink)", marginBottom: "36px" }}>{t.beforeAfterTitle}</h2>}
            {t.beforeAfter && t.beforeAfter.length > 0 ? (
              <Reveal className="mx-auto" style={{ maxWidth: "760px" }}>
                {t.beforeAfter.map((ba, i) => (
                  <div key={i} className="grid grid-cols-2 gap-4">
                    {[["BEFORE", ba.before], ["AFTER", ba.after]].map(([lbl, src]) => (
                      <div key={lbl} className="relative overflow-hidden rounded-xl" style={{ border: "1px solid var(--line)" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={`${t.hero.title} ${lbl}`} className="w-full h-full object-cover" style={{ aspectRatio: "3/4" }} />
                        <span className="font-display" style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(255,255,255,0.9)", color: "var(--ink)", fontSize: "10px", letterSpacing: "0.12em", padding: "5px 10px", borderRadius: "3px" }}>{lbl}</span>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="flex justify-center gap-2" style={{ marginTop: "20px" }}>
                  {[0, 1, 2, 3, 4].map((d) => (<span key={d} style={{ width: "8px", height: "8px", borderRadius: "50%", background: d === 0 ? "var(--teal)" : "var(--line)" }} />))}
                </div>
              </Reveal>
            ) : (
              <div className="grid gap-4 sm:grid-cols-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="rounded-lg flex items-center justify-center" style={{ aspectRatio: "4/3", backgroundColor: "var(--white)", border: "1px solid var(--line)", color: "var(--muted)", fontSize: "13px" }}>Before / After {n}</div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Precision areas */}
      {t.precision && (
        <section style={{ padding: "80px 0" }}>
          <div className="container">
            <h2 className="font-display text-center" style={{ fontSize: "clamp(20px,3vw,30px)", color: "var(--ink)" }}>{t.precision.title}</h2>
            {t.precision.intro && (
              <p className="text-center mx-auto" style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.8, marginTop: "16px", maxWidth: "760px" }}>{t.precision.intro}</p>
            )}
            {t.precision.areas && t.precision.areas.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ marginTop: "44px" }}>
                {t.precision.areas.map((a, i) => (
                  <Reveal key={a.name} delay={(i % 4) * 70} className="bg-white rounded-lg" style={{ padding: "28px", border: "1px solid var(--line)" }}>
                    <h3 className="font-display" style={{ fontSize: "15px", color: "var(--gold-deep)", marginBottom: a.desc ? "12px" : "0" }}>{a.name}</h3>
                    {a.desc && <p style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.7 }}>{a.desc}</p>}
                  </Reveal>
                ))}
              </div>
            )}
            {t.precision.additional && (
              <p className="text-center" style={{ marginTop: "28px", fontSize: "14px", color: "var(--ink-soft)" }}>
                <span className="font-display" style={{ fontSize: "12px", color: "var(--gold-deep)", letterSpacing: "0.12em" }}>Also treated: </span>
                {t.precision.additional}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Suitability */}
      {t.suitability && (
        <section style={{ padding: "80px 0", backgroundColor: "var(--cream)" }}>
          <div className="container">
            <h2 className="font-display text-center" style={{ fontSize: "clamp(20px,3vw,30px)", color: "var(--ink)" }}>{t.suitability.title}</h2>
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
            <h2 className="font-display text-center" style={{ fontSize: "clamp(20px,3vw,30px)", color: "var(--ink)", marginBottom: "48px" }}>{t.experience.title}</h2>
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
          <h2 className="font-display" style={{ fontSize: "clamp(20px,3vw,28px)", color: "var(--ink)", marginBottom: "10px" }}>Ready to begin?</h2>
          <p style={{ color: "var(--muted)", fontSize: "15px", marginBottom: "28px" }}>Book a free consultation with one of our medically qualified doctors.</p>
          <Link href="/consultation" className="btn btn-teal">free consultation</Link>
        </div>
      </section>
    </>
  );
}
