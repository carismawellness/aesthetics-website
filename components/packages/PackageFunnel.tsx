"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { PackageData } from "@/lib/packages";

/*
  Shared sales-funnel template for all package pages. One-to-one recreations of the
  live Wix package pages; content lives in lib/packages.ts. Sections render only when
  their data is present, so the minimal Exosome page and the full Jawline / Hydrafacial
  / Facelift pages all come from this single component. Reuses global Header/Footer
  (the footer already renders the shared DoctorsSection + "#1 Voted" closing) and tokens.
*/

const PRESS = [
  { src: "/assets/packages/jawline/press-lovin.jpg", alt: "Lovin Malta" },
  { src: "/assets/packages/jawline/press-maltadaily.jpg", alt: "Malta Daily" },
  { src: "/assets/packages/jawline/press-bay.jpg", alt: "89.7 Bay" },
  { src: "/assets/packages/jawline/press-times.png", alt: "Times of Malta" },
  { src: "/assets/packages/jawline/press-mttoday.png", alt: "Malta Today" },
];

const WHY_CARISMA = [
  "Team of highly trained and Medically qualified practitioners",
  "Central and discrete location",
  "Flexible scheduling and booking",
  "Personalised treatment plans",
  "Advanced treatments with cutting edge technology",
];

function Chevron() {
  return (
    <svg width="9" height="12" viewBox="0 0 9 12" fill="none" style={{ marginLeft: "4px" }} aria-hidden>
      <path d="M2 1l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CtaButton({ children }: { children: string }) {
  return (
    <Link href="/consultation" className="btn btn-teal" style={{ padding: "15px 34px", borderRadius: "3px" }}>
      {children}
      <Chevron />
    </Link>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3" style={{ padding: "5px 0" }}>
      <span style={{ color: "var(--teal)", fontSize: "11px", lineHeight: 1.9 }}>●</span>
      <span style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.6 }}>{children}</span>
    </li>
  );
}

/* split "Line one|Line two" into two <br>-separated lines */
function multiline(text: string) {
  const parts = text.split("|");
  return parts.map((p, i) => (
    <span key={i}>
      {p}
      {i < parts.length - 1 && <br />}
    </span>
  ));
}

/* bold the given substrings inside a paragraph (verbatim hero subtitle emphasis) */
function withBold(text: string, bold?: string[]) {
  if (!bold || bold.length === 0) return text;
  let nodes: (string | React.ReactNode)[] = [text];
  bold.forEach((b, bi) => {
    const next: (string | React.ReactNode)[] = [];
    nodes.forEach((node) => {
      if (typeof node !== "string") return next.push(node);
      const idx = node.indexOf(b);
      if (idx === -1) return next.push(node);
      next.push(node.slice(0, idx));
      next.push(<strong key={`${bi}-${idx}`} style={{ color: "var(--teal-deep)", fontWeight: 600 }}>{b}</strong>);
      next.push(node.slice(idx + b.length));
    });
    nodes = next;
  });
  return nodes;
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

export default function PackageFunnel({ data }: { data: PackageData }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [tab, setTab] = useState(data.redefined?.tabs ? data.redefined.tabs.length - 1 : 0);
  const h = data.hero;

  return (
    <>
      {/* ===== HERO ===== */}
      <section style={{ background: "linear-gradient(180deg,#eef3f3 0%, #ffffff 100%)", padding: "34px 0 56px" }}>
        <div className="container">
          <div style={{ borderRadius: "26px", background: "linear-gradient(160deg,#e8f0f0 0%, #f6fafa 45%, #eef4f4 100%)", border: "1px solid var(--line)", padding: "clamp(26px,3.5vw,48px)", boxShadow: "0 20px 60px rgba(0,0,0,0.05)" }}>
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <Reveal>
                <h1 className="font-serif" style={{ fontSize: "clamp(30px,4.6vw,50px)", color: "var(--gold)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {h.title}
                </h1>
                {h.lead && <p style={{ fontSize: "16px", color: "var(--teal-deep)", lineHeight: 1.5, marginTop: "16px", fontWeight: 600 }}>{h.lead}</p>}
                <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.6, marginTop: h.lead ? "12px" : "18px" }}>
                  {withBold(h.subtitle, h.subtitleBold)}
                </p>
                {h.bodyParas?.map((p, i) => (
                  <p key={i} style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.6, marginTop: "12px" }}>{p}</p>
                ))}

                <p style={{ fontSize: "15px", color: "var(--ink-soft)", fontWeight: 600, marginTop: "24px", marginBottom: "10px" }}>{h.includedTitle}</p>
                <ul>
                  {h.included.map((it) => <Bullet key={it}>{it}</Bullet>)}
                </ul>
                <p style={{ fontSize: "15px", color: "var(--ink-soft)", fontWeight: 600, marginTop: "16px" }}>{h.total}</p>
                {h.note && <p style={{ fontSize: "14px", color: "var(--teal-deep)", marginTop: "8px", fontWeight: 600 }}>{h.note}</p>}
                {h.footnotes?.map((f) => (
                  <p key={f} style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.5, marginTop: "6px" }}>{f}</p>
                ))}
                {h.disclaimer && <p style={{ fontSize: "12.5px", color: "var(--muted)", lineHeight: 1.6, marginTop: "16px", fontStyle: "italic" }}>{h.disclaimer}</p>}

                <div style={{ marginTop: "26px" }}><CtaButton>{h.cta}</CtaButton></div>

                <div className="flex items-center flex-wrap gap-x-2 gap-y-1" style={{ marginTop: "24px", fontSize: "13px", color: "var(--label)" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" /><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" /></svg>
                  <span style={{ fontWeight: 600 }}>4.9</span>
                  <span className="flex" style={{ color: "var(--teal)" }}>
                    {[0, 1, 2, 3, 4].map((i) => (<svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>))}
                  </span>
                  <span className="font-display" style={{ color: "var(--teal)", fontSize: "11px", letterSpacing: "0.1em" }}>TOP-RATED CLINIC IN MALTA</span>
                </div>

                <ul className="flex flex-wrap gap-x-7 gap-y-3" style={{ marginTop: "20px" }}>
                  {["Malta's leading wellness chain", "30+ years of expertise", "Medically qualified"].map((label) => (
                    <li key={label} className="flex items-center gap-2">
                      <span className="shrink-0 inline-flex items-center justify-center" style={{ width: "22px", height: "22px", border: "1.5px solid var(--teal)", borderRadius: "5px", color: "var(--teal)" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 6" /></svg>
                      </span>
                      <span className="font-display" style={{ fontSize: "11px", color: "var(--label)", letterSpacing: "0.06em" }}>{label}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={120}>
                <div style={{ borderRadius: "18px", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.14)" }}>
                  <video poster={h.poster} autoPlay muted loop playsInline className="w-full" style={{ display: "block", aspectRatio: h.posterRatio ?? "317 / 394", objectFit: "cover" }}>
                    {h.video && <source src={h.video} type="video/mp4" />}
                  </video>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section style={{ background: "var(--beige)", padding: "60px 0" }}>
        <div className="container">
          <SerifHeading text={data.testimonialsHeading} size={data.testimonialsHeadingTwoLine ? "clamp(19px,2.4vw,26px)" : "clamp(18px,2.4vw,26px)"} style={data.testimonialsHeadingTwoLine ? undefined : { textTransform: "none" }} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" style={{ marginTop: "40px" }}>
            {data.testimonials.map((t, i) => (
              <Reveal key={t.name} delay={(i % 4) * 70} style={{ background: "var(--white)", border: "1px solid var(--line)", borderRadius: "8px", overflow: "hidden", boxShadow: "0 10px 26px rgba(0,0,0,0.05)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.img} alt="" style={{ display: "block", width: "100%", aspectRatio: "4 / 3", objectFit: "cover" }} />
                <div style={{ padding: "18px 18px 20px" }}>
                  <p style={{ fontSize: "12.5px", color: "var(--label)", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{t.quote}</p>
                  <p style={{ fontSize: "12px", color: "var(--teal)", marginTop: "10px" }}>Read more</p>
                  <p style={{ fontSize: "13px", color: "var(--ink-soft)", marginTop: "12px", fontWeight: 600 }}>- {t.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EMOTIONAL (SO YOUR ...) ===== */}
      {data.emotional && (
        <section style={{ padding: "72px 0" }}>
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <Reveal>
                <SerifHeading text={data.emotional.heading} align="left" size="clamp(20px,2.6vw,28px)" />
                <div style={{ marginTop: "22px", fontSize: "15px", color: "var(--label)", lineHeight: 1.8 }}>
                  {data.emotional.paras.map((p, i) => (<p key={i} style={{ marginTop: i === 0 ? 0 : "16px" }}>{p}</p>))}
                </div>
              </Reveal>
              <Reveal delay={120}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.emotional.image} alt="" className="w-full" style={{ display: "block", borderRadius: "10px", aspectRatio: "1 / 1", objectFit: "cover", boxShadow: "0 18px 44px rgba(0,0,0,0.10)" }} />
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ===== TRUSTED (press + benefits) ===== */}
      {data.trusted && (
        <section style={{ padding: data.emotional ? "20px 0 80px" : "60px 0 80px" }}>
          <div className="container">
            <SerifHeading text={data.trusted.heading} size="clamp(20px,2.8vw,30px)" />
            <p className="text-center" style={{ fontSize: "13px", color: "var(--muted)", letterSpacing: "0.04em", marginTop: "14px" }}>{data.trusted.subtitle}</p>
            <div className="flex flex-wrap items-center justify-center" style={{ gap: "28px", marginTop: "26px" }}>
              {PRESS.map((p) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={p.alt} src={p.src} alt={p.alt} style={{ height: "44px", width: "auto", objectFit: "contain" }} />
              ))}
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" style={{ marginTop: "48px" }}>
              {data.trusted.benefits.map((b, i) => (
                <Reveal key={b.title} delay={(i % 4) * 70} className="text-center" style={{ background: "var(--white)", border: "1px solid var(--line)", borderRadius: "8px", padding: "28px 22px" }}>
                  <div className="flex justify-center" style={{ marginBottom: "14px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.icon} alt="" style={{ height: "48px", width: "auto" }} />
                  </div>
                  <h3 className="font-display" style={{ fontSize: "13px", color: "var(--label)", letterSpacing: "0.08em", marginBottom: "10px" }}>{b.title}</h3>
                  <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>{b.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CREATED FOR WOMEN ===== */}
      {data.createdFor && (
        <section style={{ padding: "20px 0 40px" }}>
          <div className="container">
            <SerifHeading text={data.createdFor.heading} size="clamp(20px,2.8vw,30px)" />
            <div className="grid gap-12 lg:grid-cols-2 items-center" style={{ marginTop: "44px" }}>
              <Reveal>
                <ul>{data.createdFor.reasons.map((r) => <Bullet key={r}>{r}</Bullet>)}</ul>
              </Reveal>
              <Reveal delay={120}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.createdFor.image} alt="" className="w-full" style={{ display: "block", borderRadius: "10px", aspectRatio: "1 / 1", objectFit: "cover", boxShadow: "0 18px 44px rgba(0,0,0,0.10)" }} />
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ===== YEARS DIVIDER ===== */}
      {data.yearsDivider && (
        <section style={{ padding: "30px 0 10px" }}>
          <div className="container"><SerifHeading text={data.yearsDivider} size="clamp(18px,2.4vw,26px)" /></div>
        </section>
      )}

      {/* ===== COMMITMENT / WHY ===== */}
      {data.commitment && (
        <section style={{ padding: "30px 0 70px" }}>
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 mx-auto" style={{ maxWidth: "960px" }}>
              <Reveal>
                <h3 className="font-display" style={{ fontSize: "13px", color: "var(--teal)", letterSpacing: "0.14em", marginBottom: "18px" }}>OUR COMMITMENT</h3>
                <ul className="space-y-3">
                  {data.commitment.items.map((t) => (<li key={t} className="flex items-start gap-3"><span style={{ color: "var(--teal)", fontSize: "11px", lineHeight: 1.9 }}>●</span><span style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.6 }}>{t}</span></li>))}
                </ul>
              </Reveal>
              <Reveal delay={120}>
                <h3 className="font-display" style={{ fontSize: "13px", color: "var(--teal)", letterSpacing: "0.14em", marginBottom: "18px" }}>{data.commitment.whyTitle}</h3>
                <ul className="space-y-3">
                  {data.commitment.why.map((t) => (<li key={t} className="flex items-start gap-3"><span style={{ color: "var(--teal)", fontSize: "11px", lineHeight: 1.9 }}>●</span><span style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.6 }}>{t}</span></li>))}
                </ul>
              </Reveal>
            </div>
            {data.commitment.cta && <div className="text-center" style={{ marginTop: "44px" }}><CtaButton>{data.commitment.cta}</CtaButton></div>}
          </div>
        </section>
      )}

      {/* ===== OFFER ===== */}
      {data.offer && (
        <section style={{ background: "var(--beige)", padding: "64px 0" }}>
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <Reveal>
                <SerifHeading text={data.offer.heading} align="left" size="clamp(20px,2.6vw,28px)" />
                <div style={{ marginTop: "22px", fontSize: "15px", color: "var(--label)", lineHeight: 1.8 }}>
                  {data.offer.paras.map((p, i) => (<p key={i} style={{ marginTop: i === 0 ? 0 : "16px" }}>{p}</p>))}
                </div>
              </Reveal>
              <Reveal delay={120}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.offer.image} alt="" className="w-full" style={{ display: "block", borderRadius: "10px", aspectRatio: data.offer.imageRatio ?? "489 / 549", objectFit: "cover", boxShadow: "0 18px 44px rgba(0,0,0,0.12)" }} />
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ===== GET ... BACK ===== */}
      {data.getBack && (
        <section style={{ padding: "72px 0" }}>
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <Reveal>
                <SerifHeading text={data.getBack.heading} align="left" size="clamp(20px,2.6vw,28px)" />
                <p style={{ marginTop: "18px", fontSize: "15px", color: "var(--label)", lineHeight: 1.7 }}>{data.getBack.subtitle}</p>
                <ul style={{ marginTop: "20px" }}>{data.getBack.bullets.map((b) => <Bullet key={b}>{b}</Bullet>)}</ul>
              </Reveal>
              <Reveal delay={120}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.getBack.image} alt="" className="w-full" style={{ display: "block", borderRadius: "10px", aspectRatio: "1 / 1", objectFit: "cover", boxShadow: "0 18px 44px rgba(0,0,0,0.10)" }} />
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ===== REDEFINED (+ optional tabs + stats) ===== */}
      {data.redefined && (
        <section style={{ padding: "20px 0 80px" }}>
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <Reveal>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.redefined.image} alt="" className="w-full" style={{ display: "block", borderRadius: "10px", aspectRatio: "1 / 1", objectFit: "cover", boxShadow: "0 18px 44px rgba(0,0,0,0.10)" }} />
              </Reveal>
              <Reveal delay={120}>
                <SerifHeading text={data.redefined.heading} align="left" size="clamp(20px,2.6vw,28px)" />
                <p style={{ marginTop: "16px", fontSize: "14.5px", color: "var(--teal-deep)", lineHeight: 1.6 }}>{data.redefined.subtitle}</p>
                <ul style={{ marginTop: "18px" }}>
                  {data.redefined.bullets.map((p) => (<li key={p} className="flex items-start gap-3" style={{ padding: "4px 0" }}><span style={{ color: "var(--muted)", fontSize: "12px", lineHeight: 1.8 }}>•</span><span style={{ fontSize: "13.5px", color: "var(--muted)", lineHeight: 1.6 }}>{p}</span></li>))}
                </ul>
              </Reveal>
            </div>

            {(data.redefined.tabs || data.redefined.stats) && (
              <div className="mx-auto" style={{ maxWidth: "760px", marginTop: "56px" }}>
                {data.redefined.tabs && (
                  <div className="flex" style={{ gap: "30px", borderBottom: "1px solid var(--line)" }}>
                    {data.redefined.tabs.map((label, i) => (
                      <button key={label} onClick={() => setTab(i)} className="font-serif" style={{ fontSize: "clamp(18px,2.4vw,24px)", letterSpacing: "0.04em", color: tab === i ? "var(--ink)" : "var(--teal)", paddingBottom: "8px", borderBottom: tab === i ? "2px solid var(--ink)" : "2px solid transparent", background: "none", cursor: "pointer" }}>{label}</button>
                    ))}
                  </div>
                )}
                {data.redefined.stats && (
                  <div style={{ marginTop: "28px" }}>
                    {data.redefined.stats.map((s, i) => (
                      <div key={s.metric} className="flex items-center gap-4" style={{ padding: "14px 0", borderTop: i === 0 ? "none" : "1px solid var(--line)" }}>
                        <span className="shrink-0 inline-flex items-center justify-center" style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid var(--teal-200)" }}><StatIcon metric={s.metric} /></span>
                        <span style={{ flex: "0 0 200px", fontSize: "14px", color: "var(--ink-soft)", fontWeight: 600 }}>{s.metric}</span>
                        <span style={{ fontSize: "14px", color: "var(--muted)" }}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== WHAT TO EXPECT ===== */}
      {data.expect && (
        <section style={{ padding: "20px 0 80px" }}>
          <div className="container">
            <SerifHeading text={data.expect.heading} size="clamp(18px,2.4vw,26px)" style={{ textTransform: "none" }} />
            <div className="grid gap-6 md:grid-cols-3" style={{ marginTop: "44px" }}>
              {data.expect.cols.map((col, i) => (
                <Reveal key={col.label} delay={(i % 3) * 80}>
                  <p className="font-display text-center" style={{ fontSize: "13px", color: "var(--teal)", letterSpacing: "0.14em", marginBottom: "16px" }}>{col.label}</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={col.img} alt={col.label} className="w-full" style={{ display: "block", borderRadius: "8px", aspectRatio: "278 / 221", objectFit: "cover", marginBottom: "16px" }} />
                  <div className="space-y-3">
                    {col.points.map((pt) => (<p key={pt} style={{ background: "var(--cream)", borderRadius: "6px", padding: "14px 16px", fontSize: "13px", color: "var(--label)", lineHeight: 1.6 }}>{pt}</p>))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== FAQ ===== */}
      <section style={{ padding: "20px 0 70px" }}>
        <div className="container">
          <div className="mx-auto" style={{ maxWidth: "820px" }}>
            <div className="flex flex-wrap items-center justify-between gap-4" style={{ marginBottom: "30px" }}>
              <h2 className="font-display" style={{ fontSize: "clamp(17px,2.2vw,22px)", color: "var(--gold)", letterSpacing: "0.12em" }}>FREQUENTLY ASKED QUESTIONS</h2>
              <div className="flex items-center gap-2" style={{ borderBottom: "1px solid var(--line)", paddingBottom: "6px", minWidth: "220px" }}>
                <input placeholder="Looking for something?" style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: "14px", color: "var(--muted)" }} />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
              </div>
            </div>
            {data.faq.map((f, i) => (
              <div key={f.q} style={{ borderBottom: "1px solid var(--line)" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="flex items-center justify-between w-full text-left" style={{ padding: "22px 0", background: "none", cursor: "pointer", gap: "20px" }}>
                  <span style={{ fontSize: "16px", color: "var(--gold)" }}>{f.q}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" style={{ flexShrink: 0, transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.25s" }}><path d="M6 9l6 6 6-6" /></svg>
                </button>
                {openFaq === i && f.a && (<p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.8, padding: "0 0 24px" }}>{f.a}</p>)}
              </div>
            ))}
            <div className="text-center" style={{ marginTop: "44px" }}><CtaButton>{h.cta}</CtaButton></div>
          </div>
        </div>
      </section>

      {/* ===== AWARD WINNING / WHY CARISMA ===== */}
      <section style={{ background: "var(--beige)", padding: "64px 0" }}>
        <div className="container">
          <h2 className="font-display text-center" style={{ fontSize: "clamp(20px,2.8vw,30px)", color: "var(--label)", letterSpacing: "0.04em", lineHeight: 1.3 }}>
            <strong style={{ color: "var(--ink-soft)" }}>#1 AWARD WINNING</strong> CHAIN IN MALTA WITH<br /><strong style={{ color: "var(--ink-soft)" }}>30+ YEARS</strong> IN WELLNESS
          </h2>
          <Reveal className="mx-auto" style={{ marginTop: "44px", maxWidth: "640px", background: "var(--white)", border: "1px solid var(--gold)", outline: "1px solid var(--gold)", outlineOffset: "8px", borderRadius: "4px", padding: "clamp(30px,4vw,48px)" }}>
            <h3 className="font-display text-center" style={{ fontSize: "clamp(17px,2.2vw,22px)", color: "var(--gold)", letterSpacing: "0.08em" }}>WHY CARISMA AESTHETICS ?</h3>
            <div className="mx-auto" style={{ width: "120px", height: "1px", background: "var(--gold)", margin: "14px auto 26px" }} />
            <ul className="space-y-5">
              {WHY_CARISMA.map((p) => (<li key={p} className="flex items-start gap-3"><span style={{ color: "var(--label)", fontSize: "12px", lineHeight: 1.8 }}>•</span><span className="font-display" style={{ fontSize: "12px", color: "var(--label)", letterSpacing: "0.06em", lineHeight: 1.6 }}>{p}</span></li>))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ===== RECOMMENDED ===== */}
      <section style={{ padding: "70px 0" }}>
        <div className="container">
          <h2 className="font-display text-center" style={{ fontSize: "clamp(16px,2.2vw,22px)", color: "var(--gold)", letterSpacing: "0.12em" }}>{data.recommended.heading}</h2>
          <div className={`grid gap-6 ${data.recommended.cards.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"} mx-auto`} style={{ marginTop: "40px", maxWidth: data.recommended.cards.length === 2 ? "620px" : "920px" }}>
            {data.recommended.cards.map((r, i) => (
              <Reveal key={r.label} delay={(i % 3) * 80}>
                <Link href={r.href} className="block" style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid var(--line)", background: "var(--white)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.img} alt={r.label} style={{ display: "block", width: "100%", aspectRatio: "286 / 335", objectFit: "cover" }} />
                  <div style={{ background: "var(--beige)", padding: "14px 16px" }}>
                    <span className="font-display" style={{ fontSize: "12px", color: "var(--label)", letterSpacing: "0.08em" }}>{r.label}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REAL PEOPLE, REAL REVIEWS (heading sits above the global Footer's DoctorsSection) ===== */}
      <section style={{ padding: "30px 0 0" }}>
        <div className="container text-center">
          <h2 className="font-serif" style={{ fontSize: "clamp(20px,2.6vw,28px)", color: "var(--teal)", letterSpacing: "0.06em", display: "inline-block", borderBottom: "1px solid var(--teal-200)", paddingBottom: "14px" }}>REAL PEOPLE, REAL REVIEWS</h2>
        </div>
      </section>
    </>
  );
}
