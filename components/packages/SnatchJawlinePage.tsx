import Link from "next/link";
import Reveal from "@/components/Reveal";
import LeadForm from "@/components/packages/LeadForm";
import StickyCta from "@/components/packages/StickyCta";
import { HeroVideo, TestimonialCard } from "@/components/packages/JawlineClient";
import { JAWLINE as D, FRESHA_BOOK } from "@/lib/jawline-funnel";

/*
  Dedicated, conversion-restructured funnel for /snatch-your-jawline.
  Built as a SERVER component (only the video toggle, lead form, sticky bar and
  read-more testimonials are client) so most of the page ships as static HTML —
  better LCP and crawlable content + JSON-LD for rich results.
  Isolated from the shared PackageFunnel so the 3 sibling package pages are
  untouched. Content/copy lives in lib/jawline-funnel.ts.
*/

function multiline(text: string) {
  return text.split("|").map((p, i, arr) => (
    <span key={i}>
      {p}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

function SerifHeading({ text, align = "center", size = "clamp(22px,3vw,32px)", style }: { text: string; align?: "center" | "left"; size?: string; style?: React.CSSProperties }) {
  return (
    <h2 className="font-serif" style={{ fontSize: size, color: "var(--gold)", letterSpacing: "0.05em", lineHeight: 1.25, textAlign: align, ...style }}>
      {multiline(text)}
    </h2>
  );
}

function StatIcon({ metric }: { metric: string }) {
  const m = metric.toLowerCase();
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "var(--teal)", strokeWidth: 1.5 } as const;
  if (m.includes("procedure") || m.includes("time")) return (<svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
  if (m.includes("downtime")) return (<svg {...common}><circle cx="12" cy="12" r="9" /><path d="M9 12h6M12 9v6" /></svg>);
  if (m.includes("last")) return (<svg {...common}><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>);
  if (m.includes("visible")) return (<svg {...common}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>);
  return (<svg {...common}><path d="M18 2l4 4-9 9-4 1 1-4z" /><path d="M14 6l4 4" /></svg>);
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3" style={{ padding: "5px 0" }}>
      <span className="shrink-0 inline-flex items-center justify-center" style={{ width: "20px", height: "20px", borderRadius: "50%", background: "var(--teal-100)", marginTop: "2px" }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--teal-deep)" strokeWidth="3" aria-hidden><path d="M5 12l5 5L20 6" /></svg>
      </span>
      <span style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.6 }}>{children}</span>
    </li>
  );
}

function JsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Snatch Your Jawline — Non-Surgical Jawline Contouring",
        serviceType: "Non-surgical jawline contouring & fat dissolving",
        areaServed: { "@type": "Place", name: "Malta" },
        provider: {
          "@type": "MedicalBusiness",
          name: "Carisma Aesthetics",
          address: { "@type": "PostalAddress", addressLocality: "St Julian's", addressCountry: "MT" },
          aggregateRating: { "@type": "AggregateRating", ratingValue: D.seo.rating.value, reviewCount: D.seo.rating.count },
        },
        offers: {
          "@type": "Offer",
          price: D.hero.priceNow.replace(/[^\d.]/g, ""),
          priceCurrency: "EUR",
          url: D.seo.canonical,
          availability: "https://schema.org/LimitedAvailability",
          description: `Snatch Your Jawline package — value ${D.hero.totalValue}, today ${D.hero.priceNow}.`,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: D.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export default function SnatchJawlinePage() {
  const h = D.hero;
  return (
    <>
      <JsonLd />

      {/* ===== HERO ===== */}
      <section style={{ background: "linear-gradient(180deg,#eef3f3 0%, #ffffff 100%)", padding: "30px 0 52px" }}>
        <div className="container">
          <div style={{ borderRadius: "28px", background: "linear-gradient(160deg,#e8f0f0 0%, #f6fafa 45%, #eef4f4 100%)", border: "1px solid var(--line)", padding: "clamp(22px,3.2vw,44px)", boxShadow: "0 20px 60px rgba(0,0,0,0.06)" }}>
            <div className="grid gap-10 lg:grid-cols-2 items-start">
              {/* Left: copy + value stack */}
              <Reveal>
                <p className="font-display" style={{ fontSize: "10.5px", color: "var(--teal-deep)", letterSpacing: "0.16em", marginBottom: "14px" }}>{h.eyebrow}</p>
                <h1 className="font-serif" style={{ fontSize: "clamp(30px,4vw,44px)", color: "var(--teal-deep)", textTransform: "uppercase", lineHeight: 1.12, letterSpacing: "0.02em" }}>
                  {h.title}
                </h1>
                <p style={{ fontSize: "15.5px", color: "var(--label)", lineHeight: 1.6, marginTop: "16px" }}>{h.subhead}</p>

                {/* value stack */}
                <div style={{ marginTop: "24px", background: "var(--white)", border: "1px solid var(--line)", borderRadius: "14px", padding: "20px 22px" }}>
                  <p className="font-display" style={{ fontSize: "11px", color: "var(--gold)", letterSpacing: "0.12em", marginBottom: "12px" }}>{h.includedTitle}</p>
                  <ul style={{ display: "grid", gap: "7px" }}>
                    {h.included.map((it) => (
                      <li key={it.label} className="flex items-center justify-between gap-3" style={{ fontSize: "13.5px", color: "var(--ink-soft)" }}>
                        <span className="flex items-center gap-2">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="3" aria-hidden><path d="M5 12l5 5L20 6" /></svg>
                          {it.label}
                        </span>
                        {it.value && <span style={{ color: "var(--muted)", fontSize: "12.5px" }}>{it.value}</span>}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-baseline gap-3" style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--line)" }}>
                    <span style={{ fontSize: "14px", color: "var(--muted)", textDecoration: "line-through" }}>{h.totalValue}</span>
                    <span className="font-serif" style={{ fontSize: "30px", color: "var(--teal-deep)", letterSpacing: "0.02em" }}>{h.priceNow}</span>
                    <span className="font-display" style={{ fontSize: "10.5px", color: "#fff", background: "var(--gold-deep)", padding: "4px 9px", borderRadius: "20px", letterSpacing: "0.08em" }}>SAVE {h.save}</span>
                  </div>
                </div>

                <p style={{ fontSize: "12.5px", color: "var(--label)", lineHeight: 1.5, marginTop: "14px", fontStyle: "italic" }}>{h.urgency}</p>

                {/* trust */}
                <div className="flex items-center flex-wrap gap-x-2 gap-y-1" style={{ marginTop: "20px", fontSize: "13px", color: "var(--label)" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" /><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" /></svg>
                  <span style={{ fontWeight: 600 }}>4.9</span>
                  <span className="flex" style={{ color: "var(--gold-deep)" }}>{[0, 1, 2, 3, 4].map((i) => (<svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>))}</span>
                  <span className="font-display" style={{ color: "var(--teal-deep)", fontSize: "11px", letterSpacing: "0.1em" }}>TOP-RATED CLINIC IN MALTA</span>
                </div>
                <ul className="flex flex-wrap gap-x-6 gap-y-3" style={{ marginTop: "16px" }}>
                  {h.trustBadges.map((label) => (
                    <li key={label} className="flex items-center gap-2">
                      <span className="shrink-0 inline-flex items-center justify-center" style={{ width: "22px", height: "22px", border: "1.5px solid var(--teal)", borderRadius: "5px", color: "var(--teal)" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 6" /></svg>
                      </span>
                      <span className="font-display" style={{ fontSize: "11px", color: "var(--label)", letterSpacing: "0.06em" }}>{label}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Right: video + lead form */}
              <Reveal delay={120}>
                <HeroVideo poster={h.poster} src={h.video} ratio={h.posterRatio} />
                <div style={{ marginTop: "18px" }}>
                  <LeadForm variant="hero" bookHref={FRESHA_BOOK} bookLabel={h.bookDirect} ctaLabel={h.cta} />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRESS ===== */}
      <section style={{ padding: "8px 0 0" }}>
        <div className="container">
          <p className="text-center font-display" style={{ fontSize: "10.5px", color: "var(--muted)", letterSpacing: "0.14em", marginBottom: "18px" }}>AS SEEN IN</p>
          <div className="flex flex-wrap items-center justify-center" style={{ gap: "28px" }}>
            {D.press.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p.alt} src={p.src} alt={p.alt} loading="lazy" decoding="async" style={{ height: "40px", width: "auto", objectFit: "contain", opacity: 0.85 }} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROBLEM / EMOTIONAL ===== */}
      <section style={{ padding: "64px 0" }}>
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <SerifHeading text={D.emotional.heading} align="left" size="clamp(20px,2.6vw,28px)" />
              <div style={{ marginTop: "22px", fontSize: "15px", color: "var(--label)", lineHeight: 1.8 }}>
                {D.emotional.paras.map((p, i) => (<p key={i} style={{ marginTop: i === 0 ? 0 : "16px" }}>{p}</p>))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={D.emotional.image} alt="Defined, sculpted jawline after Carisma Aesthetics treatment" loading="lazy" decoding="async" className="w-full" style={{ display: "block", borderRadius: "12px", aspectRatio: "1 / 1", objectFit: "cover", boxShadow: "0 18px 44px rgba(0,0,0,0.10)" }} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== WHY IT WORKS ===== */}
      <section style={{ background: "var(--beige)", padding: "64px 0" }}>
        <div className="container">
          <SerifHeading text={D.benefits.heading} size="clamp(20px,2.8vw,30px)" />
          <p className="text-center" style={{ fontSize: "14px", color: "var(--label)", marginTop: "12px", maxWidth: "560px", marginInline: "auto", lineHeight: 1.6 }}>{D.benefits.subtitle}</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" style={{ marginTop: "40px" }}>
            {D.benefits.items.map((b, i) => (
              <Reveal key={b.title} delay={(i % 4) * 70} className="text-center" style={{ background: "var(--white)", border: "1px solid var(--line)", borderRadius: "12px", padding: "28px 22px" }}>
                <div className="flex justify-center" style={{ marginBottom: "14px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.icon} alt="" loading="lazy" decoding="async" style={{ height: "48px", width: "auto" }} />
                </div>
                <h3 className="font-display" style={{ fontSize: "13px", color: "var(--label)", letterSpacing: "0.08em", marginBottom: "10px" }}>{b.title}</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>{b.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROOF: REDEFINED + STATS ===== */}
      <section style={{ padding: "64px 0" }}>
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={D.redefined.image} alt="Before and after jawline definition at Carisma Aesthetics Malta" loading="lazy" decoding="async" className="w-full" style={{ display: "block", borderRadius: "12px", aspectRatio: "1 / 1", objectFit: "cover", boxShadow: "0 18px 44px rgba(0,0,0,0.10)" }} />
            </Reveal>
            <Reveal delay={120}>
              <SerifHeading text={D.redefined.heading} align="left" size="clamp(20px,2.6vw,28px)" />
              <p style={{ marginTop: "14px", fontSize: "14.5px", color: "var(--teal-deep)", lineHeight: 1.6 }}>{D.redefined.subtitle}</p>
              <ul style={{ marginTop: "16px" }}>{D.redefined.bullets.map((b) => <Bullet key={b}>{b}</Bullet>)}</ul>

              <div style={{ marginTop: "24px", background: "var(--white)", border: "1px solid var(--line)", borderRadius: "12px", padding: "8px 20px" }}>
                {D.redefined.stats.map((s, i) => (
                  <div key={s.metric} className="flex items-center gap-4" style={{ padding: "13px 0", borderTop: i === 0 ? "none" : "1px solid var(--line)" }}>
                    <span className="shrink-0 inline-flex items-center justify-center" style={{ width: "38px", height: "38px", borderRadius: "50%", border: "1px solid var(--teal-200)" }}><StatIcon metric={s.metric} /></span>
                    <span style={{ flex: "1", fontSize: "13.5px", color: "var(--ink-soft)", fontWeight: 600 }}>{s.metric}</span>
                    <span style={{ fontSize: "13.5px", color: "var(--muted)", textAlign: "right" }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section style={{ background: "var(--beige)", padding: "60px 0" }}>
        <div className="container">
          <SerifHeading text={D.testimonialsHeading} size="clamp(20px,2.6vw,28px)" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 items-start" style={{ marginTop: "40px" }}>
            {D.testimonials.map((t, i) => (
              <Reveal key={t.name} delay={(i % 4) * 70}><TestimonialCard t={t} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CREATED FOR ===== */}
      <section style={{ padding: "64px 0" }}>
        <div className="container">
          <SerifHeading text={D.createdFor.heading} size="clamp(20px,2.8vw,30px)" />
          <div className="grid gap-12 lg:grid-cols-2 items-center" style={{ marginTop: "40px" }}>
            <Reveal>
              <ul>{D.createdFor.reasons.map((r) => <Bullet key={r}>{r}</Bullet>)}</ul>
              <div style={{ marginTop: "26px" }}>
                <a href="#claim" className="btn btn-teal" style={{ padding: "14px 32px" }}>{D.hero.cta}</a>
              </div>
            </Reveal>
            <Reveal delay={120}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={D.createdFor.image} alt="Confident woman after non-surgical jawline treatment in Malta" loading="lazy" decoding="async" className="w-full" style={{ display: "block", borderRadius: "12px", aspectRatio: "1 / 1", objectFit: "cover", boxShadow: "0 18px 44px rgba(0,0,0,0.10)" }} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== WHAT TO EXPECT ===== */}
      <section style={{ background: "var(--beige)", padding: "60px 0" }}>
        <div className="container">
          <SerifHeading text={D.expect.heading} size="clamp(18px,2.4vw,26px)" style={{ textTransform: "none" }} />
          <div className="grid gap-6 md:grid-cols-3" style={{ marginTop: "44px" }}>
            {D.expect.cols.map((col, i) => (
              <Reveal key={col.label} delay={(i % 3) * 80}>
                <p className="font-display text-center" style={{ fontSize: "13px", color: "var(--teal-deep)", letterSpacing: "0.14em", marginBottom: "16px" }}>{col.label}</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={col.img} alt={`Jawline treatment — ${col.label}`} loading="lazy" decoding="async" className="w-full" style={{ display: "block", borderRadius: "10px", aspectRatio: "278 / 221", objectFit: "cover", marginBottom: "16px" }} />
                <div className="space-y-3">
                  {col.points.map((pt) => (<p key={pt} style={{ background: "var(--white)", borderRadius: "8px", padding: "14px 16px", fontSize: "13px", color: "var(--label)", lineHeight: 1.6 }}>{pt}</p>))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OFFER RECAP ===== */}
      <section style={{ padding: "64px 0" }}>
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <SerifHeading text={D.offer.heading} align="left" size="clamp(20px,2.6vw,28px)" />
              <div style={{ marginTop: "22px", fontSize: "15px", color: "var(--label)", lineHeight: 1.8 }}>
                {D.offer.paras.map((p, i) => (<p key={i} style={{ marginTop: i === 0 ? 0 : "16px" }}>{p}</p>))}
              </div>
              <div className="flex items-baseline gap-3" style={{ marginTop: "22px" }}>
                <span style={{ fontSize: "16px", color: "var(--muted)", textDecoration: "line-through" }}>{D.hero.totalValue}</span>
                <span className="font-serif" style={{ fontSize: "34px", color: "var(--teal-deep)" }}>{D.hero.priceNow}</span>
                <span className="font-display" style={{ fontSize: "10.5px", color: "#fff", background: "var(--gold-deep)", padding: "4px 9px", borderRadius: "20px", letterSpacing: "0.08em" }}>SAVE {D.hero.save}</span>
              </div>
              <div style={{ marginTop: "22px" }}><a href="#claim" className="btn btn-teal" style={{ padding: "15px 36px" }}>{D.hero.cta}</a></div>
            </Reveal>
            <Reveal delay={120}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={D.offer.image} alt="Skin-tightening laser at Carisma Aesthetics" loading="lazy" decoding="async" className="w-full" style={{ display: "block", borderRadius: "12px", aspectRatio: D.offer.imageRatio, objectFit: "cover", boxShadow: "0 18px 44px rgba(0,0,0,0.12)" }} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== FAQ (native details, FAQPage schema above) ===== */}
      <section style={{ background: "var(--beige)", padding: "64px 0" }}>
        <div className="container">
          <div className="mx-auto" style={{ maxWidth: "820px" }}>
            <h2 className="font-display text-center" style={{ fontSize: "clamp(17px,2.2vw,22px)", color: "var(--gold)", letterSpacing: "0.12em", marginBottom: "30px" }}>FREQUENTLY ASKED QUESTIONS</h2>
            {D.faq.map((f) => (
              <details key={f.q} style={{ borderBottom: "1px solid var(--line)" }}>
                <summary className="flex items-center justify-between" style={{ padding: "20px 0", cursor: "pointer", gap: "20px", listStyle: "none" }}>
                  <span style={{ fontSize: "16px", color: "var(--gold)" }}>{f.q}</span>
                  <span className="faq-plus shrink-0" aria-hidden style={{ color: "var(--gold)", fontSize: "22px", lineHeight: 1 }}>+</span>
                </summary>
                <p style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.8, padding: "0 0 20px" }}>{f.a}</p>
              </details>
            ))}
            <div className="text-center" style={{ marginTop: "40px" }}><a href="#claim" className="btn btn-teal" style={{ padding: "14px 34px" }}>{D.hero.cta}</a></div>
          </div>
        </div>
      </section>

      {/* ===== WHY CARISMA / AWARD ===== */}
      <section style={{ padding: "64px 0" }}>
        <div className="container">
          <h2 className="font-display text-center" style={{ fontSize: "clamp(20px,2.8vw,30px)", color: "var(--label)", letterSpacing: "0.04em", lineHeight: 1.3 }}>
            <strong style={{ color: "var(--ink-soft)" }}>#1 AWARD WINNING</strong> CHAIN IN MALTA WITH<br /><strong style={{ color: "var(--ink-soft)" }}>30+ YEARS</strong> IN WELLNESS
          </h2>
          <Reveal className="mx-auto" style={{ marginTop: "40px", maxWidth: "640px", background: "var(--white)", border: "1px solid var(--gold)", outline: "1px solid var(--gold)", outlineOffset: "8px", borderRadius: "4px", padding: "clamp(30px,4vw,48px)" }}>
            <h3 className="font-display text-center" style={{ fontSize: "clamp(17px,2.2vw,22px)", color: "var(--gold)", letterSpacing: "0.08em" }}>WHY CARISMA AESTHETICS ?</h3>
            <div className="mx-auto" style={{ width: "120px", height: "1px", background: "var(--gold)", margin: "14px auto 26px" }} />
            <ul className="space-y-5">
              {D.whyCarisma.map((p) => (<li key={p} className="flex items-start gap-3"><span style={{ color: "var(--label)", fontSize: "12px", lineHeight: 1.8 }}>•</span><span className="font-display" style={{ fontSize: "12px", color: "var(--label)", letterSpacing: "0.06em", lineHeight: 1.6 }}>{p}</span></li>))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ===== CLAIM (closing lead form) ===== */}
      <section id="claim" style={{ background: "linear-gradient(180deg,#ffffff 0%, #eef3f3 100%)", padding: "70px 0", scrollMarginTop: "80px" }}>
        <div className="container">
          <div className="mx-auto text-center" style={{ maxWidth: "640px" }}>
            <SerifHeading text="GET YOUR JAWLINE BACK. SHARPER. DEFINED. YOU." size="clamp(22px,3vw,32px)" />
            <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.7, marginTop: "16px" }}>
              Leave your details and our team will confirm your <strong>€149</strong> spot (value €400) — a fast, gentle treatment with visible results in one session.
            </p>
          </div>
          <div className="mx-auto" style={{ maxWidth: "440px", marginTop: "30px" }}>
            <LeadForm variant="closing" bookHref={FRESHA_BOOK} bookLabel={D.hero.bookDirect} ctaLabel={D.hero.cta} />
          </div>
        </div>
      </section>

      {/* ===== RECOMMENDED ===== */}
      <section style={{ padding: "64px 0" }}>
        <div className="container">
          <h2 className="font-display text-center" style={{ fontSize: "clamp(16px,2.2vw,22px)", color: "var(--gold)", letterSpacing: "0.12em" }}>{D.recommended.heading}</h2>
          <div className={`grid gap-6 ${D.recommended.cards.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"} mx-auto`} style={{ marginTop: "40px", maxWidth: D.recommended.cards.length === 2 ? "620px" : "920px" }}>
            {D.recommended.cards.map((r, i) => (
              <Reveal key={r.label} delay={(i % 3) * 80}>
                <Link href={r.href} className="block" style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid var(--line)", background: "var(--white)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.img} alt={r.label} loading="lazy" decoding="async" style={{ display: "block", width: "100%", aspectRatio: "286 / 335", objectFit: "cover" }} />
                  <div style={{ background: "var(--beige)", padding: "14px 16px" }}>
                    <span className="font-display" style={{ fontSize: "12px", color: "var(--label)", letterSpacing: "0.08em" }}>{r.label}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REAL REVIEWS (heading above footer DoctorsSection) ===== */}
      <section style={{ padding: "30px 0 0" }}>
        <div className="container text-center">
          <h2 className="font-serif" style={{ fontSize: "clamp(20px,2.6vw,28px)", color: "var(--teal)", letterSpacing: "0.06em", display: "inline-block", borderBottom: "1px solid var(--teal-200)", paddingBottom: "14px" }}>REAL PEOPLE, REAL REVIEWS</h2>
        </div>
      </section>

      <StickyCta priceNow={D.hero.priceNow} />
    </>
  );
}
