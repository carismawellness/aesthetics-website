import Link from "next/link";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import type { ProtocolData } from "@/lib/protocols";

const ASSET = "/assets/treatments";

// WCAG 2.2 AA: brand colors darkened to pass >=4.5:1 normal-text contrast over the
// light hero/marble image backgrounds (worst-case darkest regions #c2d3d3 / #d5d4e5)
// and translucent white cards (flattened worst-case #eaeaf2). Hues kept in the
// Carisma cool-taupe-gold + sage-teal family (darkened toward the same hue).
const AA_GOLD = "#5f5128"; // was var(--gold-deep) #9c8344 (failed: 2.36-3.66:1)
const AA_TEAL = "#3a5757"; // was var(--teal) #527979 (failed as text: 3.1-4.16:1)
const AA_LABEL = "#5c5246"; // was var(--label) #756758 (failed: 3.53:1 on hero)
const AA_MUTED = "#555555"; // was var(--muted) #717171 (failed: 3.15:1 on hero)

function Kicker({ children, color = AA_GOLD }: { children: React.ReactNode; color?: string }) {
  return <p className="font-display text-center" style={{ fontSize: "18px", color, letterSpacing: "0.02em" }}>{children}</p>;
}
function Serif({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <h2 className="font-serif text-center" style={{ fontSize: "clamp(22px,3vw,30px)", color: AA_GOLD, letterSpacing: "0.06em", fontWeight: 400, lineHeight: 1.3, ...style }}>{children}</h2>;
}
function Cta({ label }: { label: string }) {
  return <Link href="/consultation" className="btn btn-teal" style={{ fontSize: "13px", padding: "15px 36px", letterSpacing: "0.12em" }}>{label}</Link>;
}
function TealDot() {
  // Graphical list marker (1.4.11): AA_TEAL gives >=5:1 vs every page background.
  return <span aria-hidden style={{ color: AA_TEAL, fontSize: "11px", lineHeight: 1.8, flexShrink: 0 }}>●</span>;
}

function PackageList({ items, totalValue, today }: { items: { label: string; price: string }[]; totalValue: string; today: string }) {
  return (
    <>
      <ul className="space-y-2.5" style={{ marginTop: "8px" }}>
        {items.map((it) => (
          <li key={it.label} className="flex items-start gap-3">
            <TealDot />
            <span style={{ fontSize: "14px", color: AA_LABEL, lineHeight: 1.5 }}>{it.label} {it.price && <span style={{ color: AA_TEAL }}>({it.price})</span>}</span>
          </li>
        ))}
      </ul>
      <p className="font-display" style={{ fontSize: "16px", color: AA_GOLD, letterSpacing: "0.04em", marginTop: "22px" }}>
        {totalValue} <span style={{ color: AA_TEAL }}>{today}</span>
      </p>
    </>
  );
}

export default function ProtocolPage({ d }: { d: ProtocolData }) {
  return (
    <>
      {/* ===== HERO ===== */}
      <PageHero
        badge={d.hero.kicker}
        headline={[{ text: d.hero.title }, { text: "in Malta", em: true }]}
        sub={d.hero.intro}
        primaryCta={{ text: d.hero.cta, href: "/consultation" }}
        media={{ type: "video", src: d.hero.video, alt: `${d.hero.title} in Malta` }}
        proof={{
          rating: "4.9",
          reviews: "200+",
          statValue: "30+",
          statLabel: "years in wellness",
          awardText: "#1 Voted Clinic\nMalta Healthcare Awards",
        }}
      />

      {/* ===== OFFER / PACKAGE (was in hero) ===== */}
      <section style={{ background: "url('/assets/hero-bg.png') center / cover no-repeat", padding: "48px 0 56px" }}>
        <div className="container">
          <div className="mx-auto text-center" style={{ maxWidth: "680px", background: "rgba(255,255,255,0.6)", border: "1px solid var(--line)", borderRadius: "16px", padding: "clamp(28px,3vw,40px)" }}>
            <Reveal>
              <p className="font-display" style={{ fontSize: "15px", color: AA_GOLD, letterSpacing: "0.04em" }}>{d.hero.tagline}</p>
              <div className="mx-auto text-left" style={{ maxWidth: "460px" }}>
                <PackageList items={d.hero.items} totalValue={d.hero.totalValue} today={d.hero.today} />
                <p style={{ fontSize: "13px", color: AA_MUTED, marginTop: "6px" }}>{d.hero.individualNote}</p>
              </div>
              <div style={{ marginTop: "24px" }}><Cta label={d.hero.cta} /></div>
              {d.hero.finePrint.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                  {d.hero.finePrint.map((f, i) => (<p key={i} style={{ fontSize: "11px", color: AA_MUTED, lineHeight: 1.6 }}>{f}</p>))}
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== MARBLE BODY ===== */}
      <div style={{ background: `url('${ASSET}/laser-marble.jpg') top center / cover` }}>
        {/* SECRET */}
        <section style={{ padding: "70px 0" }}>
          <div className="container">
            <Serif>{d.secret.heading}</Serif>
            <p className="font-display text-center" style={{ fontSize: "13px", color: AA_LABEL, letterSpacing: "0.06em", marginTop: "12px", textTransform: "uppercase" }}>{d.secret.sub}</p>
            <div className="grid gap-12 lg:grid-cols-2 items-center" style={{ marginTop: "40px" }}>
              <Reveal>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.secret.image} alt={d.secret.heading} className="w-full rounded-xl" style={{ display: "block", objectFit: "cover", aspectRatio: "4 / 3", boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }} />
              </Reveal>
              <div>
                {d.secret.paragraphs[0] && <p style={{ fontSize: "14.5px", color: AA_LABEL, lineHeight: 1.8 }}>{d.secret.paragraphs[0]}</p>}
                <ul className="space-y-3" style={{ marginTop: "18px" }}>
                  {d.secret.bullets.map((b) => (<li key={b} className="flex items-start gap-3"><TealDot /><span style={{ fontSize: "14px", color: AA_LABEL, lineHeight: 1.6 }}>{b}</span></li>))}
                </ul>
                {d.secret.paragraphs.slice(1).map((p, i) => (<p key={i} style={{ fontSize: "14.5px", color: AA_LABEL, lineHeight: 1.8, marginTop: "16px" }}>{p}</p>))}
                <div style={{ marginTop: "26px" }}><Cta label={d.secret.cta} /></div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUSTED + features */}
        <section style={{ padding: "50px 0 70px" }}>
          <div className="container text-center">
            <Serif>{d.trusted.heading}<br />{d.trusted.headingSub}</Serif>
            {d.trusted.pressLogos && d.trusted.pressLogos.length > 0 && (
              <div className="flex flex-wrap items-center justify-center" style={{ gap: "30px", marginTop: "30px" }}>
                {d.trusted.pressLogos.map((l) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={l} src={l} alt="" style={{ height: "30px", width: "auto", objectFit: "contain" }} />
                ))}
              </div>
            )}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ marginTop: "44px" }}>
              {d.trusted.features.map((f, i) => (
                <Reveal key={f.label} delay={(i % 4) * 70} className="text-center" style={{ background: "rgba(255,255,255,0.5)", border: "1px solid var(--line)", borderRadius: "16px 40px 16px 40px", padding: "28px 22px", boxShadow: "0 12px 30px rgba(0,0,0,0.05)" }}>
                  {f.icon && (
                    <div className="flex justify-center" style={{ marginBottom: "14px", height: "56px", alignItems: "center" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={f.icon} alt={f.label} style={{ maxHeight: "52px", width: "auto" }} />
                    </div>
                  )}
                  <h3 className="font-display" style={{ fontSize: "13px", color: AA_GOLD, letterSpacing: "0.06em", marginBottom: "10px" }}>{f.label}</h3>
                  <p style={{ fontSize: "13px", color: AA_LABEL, lineHeight: 1.65 }}>{f.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ELIGIBILITY */}
        <section style={{ padding: "70px 0" }}>
          <div className="container">
            <Kicker>{d.eligibility.kicker}</Kicker>
            <Serif style={{ marginTop: "8px" }}>{d.eligibility.heading}</Serif>
            <div className="grid gap-12 lg:grid-cols-2 items-center" style={{ marginTop: "40px" }}>
              <Reveal>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.eligibility.image} alt={d.eligibility.heading} className="w-full rounded-xl" style={{ display: "block", objectFit: "cover", aspectRatio: "1 / 1", boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }} />
              </Reveal>
              <div>
                <p className="font-display" style={{ fontSize: "15px", color: AA_GOLD, letterSpacing: "0.04em", marginBottom: "20px" }}>{d.eligibility.areasIntro}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {d.eligibility.areas.map((a) => (
                    <span key={a} className="font-display" style={{ fontSize: "12px", color: AA_LABEL, letterSpacing: "0.04em", background: "rgba(255,255,255,0.6)", border: "1px solid var(--line)", borderRadius: "8px", padding: "13px 16px", textAlign: "center" }}>{a}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MODALITY */}
        {d.modality && (
          <section style={{ padding: "60px 0" }}>
            <div className="container">
              <Kicker>{d.modality.kicker}</Kicker>
              <Serif style={{ marginTop: "8px" }}>{d.modality.heading}</Serif>
              <Reveal className="mx-auto" style={{ maxWidth: "1080px", marginTop: "40px", background: "rgba(255,255,255,0.55)", border: "1px solid var(--line)", borderRadius: "22px", padding: "clamp(24px,3vw,40px)", boxShadow: "0 14px 34px rgba(0,0,0,0.06)" }}>
                <div className="grid gap-10 lg:grid-cols-2 items-start">
                  <div>
                    <div className="flex items-center justify-between flex-wrap gap-2" style={{ marginBottom: "18px" }}>
                      <h3 className="font-serif" style={{ fontSize: "20px", color: AA_GOLD, letterSpacing: "0.06em" }}>{d.modality.name}</h3>
                      <span className="font-display" style={{ fontSize: "11px", color: "var(--white)", background: "var(--teal-deep)", letterSpacing: "0.06em", padding: "6px 14px", borderRadius: "999px" }}>{d.modality.tag}</span>
                    </div>
                    {d.modality.baImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={d.modality.baImage} alt={d.modality.name} className="w-full rounded-lg" style={{ display: "block", marginBottom: "18px" }} />
                    )}
                    <p style={{ fontSize: "14px", color: AA_LABEL, lineHeight: 1.75 }}>{d.modality.intro}</p>
                  </div>
                  <div>
                    <ul className="space-y-3">
                      {d.modality.bullets.map((b) => (<li key={b} className="flex items-start gap-3"><TealDot /><span style={{ fontSize: "13.5px", color: AA_LABEL, lineHeight: 1.65 }}>{b}</span></li>))}
                    </ul>
                    {d.modality.sideImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={d.modality.sideImage} alt="" className="mx-auto" style={{ display: "block", width: "150px", marginTop: "24px" }} />
                    )}
                    <p className="font-display text-center" style={{ fontSize: "12px", color: AA_TEAL, letterSpacing: "0.08em", marginTop: "16px" }}>{d.modality.tagSub}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* DIFFERENCE 1 — we are not another diet clinic */}
        <section style={{ padding: "60px 0" }}>
          <div className="container text-center">
            <Kicker>{d.difference1.kicker}</Kicker>
            <Serif style={{ marginTop: "8px" }}>{d.difference1.heading}</Serif>
            <p className="mx-auto" style={{ maxWidth: "820px", fontSize: "14.5px", color: AA_LABEL, lineHeight: 1.8, marginTop: "20px" }}>{d.difference1.intro}</p>
            <ul className="mx-auto grid gap-3 sm:grid-cols-2 text-left" style={{ maxWidth: "880px", marginTop: "30px" }}>
              {d.difference1.bullets.map((b) => (<li key={b} className="flex items-start gap-3"><TealDot /><span style={{ fontSize: "14px", color: AA_LABEL, lineHeight: 1.6 }}>{b}</span></li>))}
            </ul>
          </div>
        </section>

        {/* STARTER PACK recap */}
        <section style={{ padding: "60px 0" }}>
          <div className="container">
            <Serif>{d.starterPack.heading}</Serif>
            <div className="grid gap-6 md:grid-cols-3" style={{ marginTop: "40px" }}>
              {d.starterPack.cols.map((c, i) => (
                <Reveal key={c.title} delay={(i % 3) * 80} className="text-center" style={{ background: "rgba(255,255,255,0.55)", border: "1px solid var(--line)", borderRadius: "16px", padding: "28px 24px", boxShadow: "0 12px 30px rgba(0,0,0,0.05)" }}>
                  <h3 className="font-display" style={{ fontSize: "13px", color: AA_GOLD, letterSpacing: "0.06em", marginBottom: "12px" }}>{c.title}</h3>
                  <p style={{ fontSize: "13.5px", color: AA_LABEL, lineHeight: 1.7 }}>{c.desc}</p>
                </Reveal>
              ))}
            </div>
            <div className="mx-auto text-center" style={{ maxWidth: "640px", marginTop: "40px", background: "rgba(255,255,255,0.6)", border: "1px solid var(--line)", borderRadius: "16px", padding: "clamp(26px,3vw,36px)" }}>
              <ul className="space-y-2.5 text-left mx-auto" style={{ maxWidth: "440px" }}>
                {d.starterPack.items.map((it) => (<li key={it.label} className="flex items-start gap-3"><TealDot /><span style={{ fontSize: "14px", color: AA_LABEL, lineHeight: 1.5 }}>{it.label} {it.price && <span style={{ color: AA_TEAL }}>({it.price})</span>}</span></li>))}
              </ul>
              <p className="font-display" style={{ fontSize: "16px", color: AA_GOLD, letterSpacing: "0.04em", marginTop: "22px" }}>{d.starterPack.totalValue} <span style={{ color: AA_TEAL }}>{d.starterPack.today}</span></p>
              <div style={{ marginTop: "22px" }}><Cta label={d.starterPack.cta} /></div>
              {d.starterPack.finePrint.map((f, i) => (<p key={i} style={{ fontSize: "11px", color: AA_MUTED, lineHeight: 1.6, marginTop: i ? "2px" : "16px" }}>{f}</p>))}
            </div>
          </div>
        </section>

        {/* DIFFERENCE 2 — commitment + why + map */}
        <section style={{ padding: "30px 0 70px" }}>
          <div className="container">
            <div className="mx-auto" style={{ maxWidth: "1120px", borderRadius: "32px", background: "rgba(255,255,255,0.5)", border: "1px solid var(--line)", padding: "clamp(30px,4vw,56px)" }}>
              <div className="text-center">
                <Kicker>{d.difference2.kicker}</Kicker>
                <Serif style={{ marginTop: "10px" }}>{d.difference2.heading}</Serif>
              </div>
              <div className="grid gap-12 lg:grid-cols-2 items-stretch" style={{ marginTop: "40px" }}>
                <div>
                  <h3 className="font-display" style={{ fontSize: "13px", color: AA_LABEL, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>{d.difference2.commitmentTitle}</h3>
                  <ul className="space-y-3">
                    {d.difference2.commitment.map((c) => (<li key={c} className="flex items-start gap-3"><TealDot /><span style={{ fontSize: "14px", color: AA_LABEL, lineHeight: 1.6 }}>{c}</span></li>))}
                  </ul>
                  <h3 className="font-display" style={{ fontSize: "13px", color: AA_LABEL, letterSpacing: "0.1em", textTransform: "uppercase", margin: "30px 0 16px" }}>{d.difference2.whyTitle}</h3>
                  <ul className="space-y-3">
                    {d.difference2.why.map((c) => (<li key={c} className="flex items-start gap-3"><TealDot /><span style={{ fontSize: "14px", color: AA_LABEL, lineHeight: 1.6 }}>{c}</span></li>))}
                  </ul>
                </div>
                <div style={{ borderRadius: "32px 12px 32px 12px", overflow: "hidden", boxShadow: "0 16px 38px rgba(0,0,0,0.10)", minHeight: "360px" }}>
                  <iframe title="Carisma Aesthetics location" src="https://maps.google.com/maps?q=Carisma%20Aesthetics%20Malta&z=14&output=embed" loading="lazy" style={{ border: 0, width: "100%", height: "100%", minHeight: "360px", display: "block" }} />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6" style={{ marginTop: "40px" }}>
                <Cta label={d.difference2.cta} />
                <div className="flex items-center gap-3">
                  <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden><path fill="none" stroke={AA_TEAL} strokeWidth="1.4" d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" /><text x="12" y="13.5" textAnchor="middle" fontSize="9" fill={AA_TEAL} fontWeight="700">P</text></svg>
                  <span className="font-display" style={{ fontSize: "12px", color: AA_LABEL, letterSpacing: "0.08em", textTransform: "uppercase" }}>{d.difference2.parking}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "60px 0" }}>
          <div className="container">
            <h2 className="font-serif text-center" style={{ fontSize: "clamp(22px,3vw,30px)", color: AA_GOLD, letterSpacing: "0.06em", fontWeight: 400, marginBottom: "40px" }}>Frequently asked questions</h2>
            <FaqAccordion items={d.faq} />
          </div>
        </section>

        {/* RESEARCH */}
        <section style={{ padding: "40px 0 90px" }}>
          <div className="container text-center">
            <Kicker>{d.research.heading}</Kicker>
            <Serif style={{ marginTop: "8px" }}>{d.research.sub}</Serif>
            <div className="grid gap-8 md:grid-cols-3 mx-auto" style={{ maxWidth: "1080px", marginTop: "44px" }}>
              {d.research.cards.map((c, i) => (
                <Reveal key={c.title} delay={(i % 3) * 80} className="text-left flex flex-col" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid var(--line)", borderRadius: "16px", overflow: "hidden", boxShadow: "0 12px 30px rgba(0,0,0,0.05)" }}>
                  {c.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.image} alt={c.title} className="w-full" style={{ display: "block", aspectRatio: "2 / 1", objectFit: "cover" }} />
                  )}
                  <div style={{ padding: "24px" }}>
                    <h3 className="font-display" style={{ fontSize: "13px", color: AA_GOLD, letterSpacing: "0.04em", marginBottom: "14px", lineHeight: 1.4 }}>{c.title}</h3>
                    <p className="font-display" style={{ fontSize: "10px", color: AA_TEAL, letterSpacing: "0.1em", marginBottom: "6px" }}>WHAT IT DOES</p>
                    <p style={{ fontSize: "13px", color: AA_LABEL, lineHeight: 1.65, marginBottom: "14px" }}>{c.whatItDoes}</p>
                    <p className="font-display" style={{ fontSize: "10px", color: AA_TEAL, letterSpacing: "0.1em", marginBottom: "6px" }}>KEY RESULTS</p>
                    <ul className="space-y-2">
                      {c.keyResults.map((k, j) => (<li key={j} className="flex items-start gap-2"><TealDot /><span style={{ fontSize: "12.5px", color: AA_LABEL, lineHeight: 1.6 }}>{k}</span></li>))}
                    </ul>
                    <p className="font-display" style={{ fontSize: "11px", color: AA_GOLD, letterSpacing: "0.06em", marginTop: "16px", textTransform: "uppercase" }}>{c.evidence}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div style={{ marginTop: "44px" }}><Cta label={d.research.cta} /></div>
          </div>
        </section>
      </div>
    </>
  );
}
