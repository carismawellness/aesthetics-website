import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import BookingButtons from "@/components/BookingButtons";
import Reveal from "@/components/Reveal";
import AmbientField from "@/components/fx/AmbientField";
import Motif from "@/components/fx/Motif";
import StickyCta from "@/components/packages/preview/StickyCta";
import HowItWorks from "@/components/packages/preview/HowItWorks";
import ResultsGuarantee from "@/components/packages/preview/ResultsGuarantee";
import type { PackageData } from "@/lib/packages";
import type { PreviewContent } from "@/lib/packages/preview-types";

/*
  V2 package template (PREVIEW). World-class CRO spine, modeled on the Carisma
  Slimming homepage: Hero → Offer → How it works → Results+Guarantee → proof → FAQ → close.
  Self-contained so it can be reviewed in isolation and later replace PackageFunnel.
  Server component; only StickyCta is client. Layers polish via effects.css primitives.
*/

const TEAL_DEEP = "var(--teal-deep)";

function GoogleRating() {
  return (
    <div className="flex items-center flex-wrap gap-x-2 gap-y-1" style={{ fontSize: "13px", color: "var(--label)" }}>
      <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" /><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" /></svg>
      <span style={{ fontWeight: 600 }}>4.9</span>
      <span aria-label="4.9 out of 5 stars" role="img" style={{ color: TEAL_DEEP, letterSpacing: "1px" }}>★★★★★</span>
      <span className="font-display" style={{ color: TEAL_DEEP, fontSize: "11px", letterSpacing: "0.1em" }}>FROM 500+ REVIEWS</span>
    </div>
  );
}

export default function PackageTemplatePreview({ data, content }: { data: PackageData; content: PreviewContent }) {
  const h = data.hero;
  const { hero, offer, guarantee, closing } = content;
  // Headline two-tone split (deep teal-blue → lighter teal-blue):
  // emphasise a trailing "in Malta" if present, otherwise the last word.
  const inMalta = / in Malta$/i.test(hero.h1);
  let headline: { text: string; em?: boolean }[];
  if (inMalta) {
    headline = [{ text: hero.h1.replace(/ in Malta$/i, "") }, { text: "in Malta", em: true }];
  } else {
    const words = hero.h1.trim().split(/\s+/);
    headline = words.length <= 1
      ? [{ text: hero.h1, em: true }]
      : [{ text: words.slice(0, -1).join(" ") }, { text: words[words.length - 1], em: true }];
  }

  return (
    <>
      <StickyCta freshaHref={data.bookHref} priceLabel={`Glow Package · ${offer.priceNow}`} ctaLabel={hero.ctaLabel} />

      {/* ===== HERO ===== */}
      <PageHero
        badge="#1 Voted Med-Aesthetics Clinic"
        headline={headline}
        compactHeadline
        sub={hero.sub}
        bullets={offer.included.map((it) => ({ text: it }))}
        primaryCta={{ text: hero.ctaLabel, href: data.bookHref, external: data.bookHref.startsWith("http") }}
        media={
          h.video
            ? { type: "video", src: h.video, poster: h.poster, alt: h.title, aspect: h.posterRatio?.replace("/", " / ") }
            : { type: "image", src: h.poster, alt: h.title, aspect: h.posterRatio?.replace("/", " / ") }
        }
        proof={{ rating: "4.9", reviews: "500+", statValue: "35+", statLabel: "years in wellness", awardText: "#1 Voted Clinic\nMalta Healthcare Awards" }}
      />

      {/* ===== OFFER / WHAT'S INCLUDED (price anchor on a Liquid Gloss card) ===== */}
      <section aria-label="Package offer" className="ambient-host" style={{ background: "linear-gradient(180deg, #ffffff 0%, var(--cream) 50%, #ffffff 100%)", padding: "clamp(44px,6vh,76px) 0" }}>
        <AmbientField blob="top-right" tone="teal" soft dots />
        <div className="container">
          <Reveal className="lg lg--panel mx-auto" style={{ position: "relative", overflow: "hidden", maxWidth: "760px", padding: "clamp(26px,3.4vw,44px)" }}>
            <Motif mode="watermark" opacity={0.05} />
            <h2 className="sr-only">What's Included in Your Glow Package</h2>
            <p className="font-display" style={{ fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: TEAL_DEEP }}>{hero.eyebrow}</p>
            <div className="flex items-end flex-wrap gap-x-3 gap-y-1" style={{ marginTop: "10px" }}>
              <span className="font-serif" style={{ fontSize: "clamp(34px,6vw,52px)", lineHeight: 1, color: "var(--ink)" }}>{offer.priceNow}</span>
              {offer.priceWas && <span style={{ fontSize: "18px", color: "var(--muted)", textDecoration: "line-through" }}>{offer.priceWas}</span>}
              {offer.saveLabel && (
                <span className="font-display" style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", background: TEAL_DEEP, borderRadius: "var(--radius-pill)", padding: "6px 12px" }}>{offer.saveLabel}</span>
              )}
            </div>
            <p className="font-display" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--label)", marginTop: "8px" }}>{offer.guaranteeChip}</p>

            <p style={{ fontSize: "14px", color: "var(--label)", fontWeight: 700, marginTop: "22px", marginBottom: "8px" }}>{offer.includedTitle}</p>
            <ul aria-label="Package includes" style={{ display: "grid", gap: "8px" }}>
              {offer.included.map((it) => (
                <li key={it} className="flex items-start gap-3" style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.5 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={TEAL_DEEP} strokeWidth="2" aria-hidden="true" style={{ flexShrink: 0, marginTop: "1px" }}><path d="M20 6L9 17l-5-5" /></svg>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
            {h.total && <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "14px" }}>{h.total}</p>}

            <div style={{ marginTop: "22px" }}>
              <BookingButtons freshaHref={data.bookHref} primaryLabel={hero.ctaLabel} consultLabel="Book Free Consultation" />
            </div>
            <p style={{ fontSize: "12px", color: "var(--label)", marginTop: "12px" }}>{hero.urgency}</p>
            <div style={{ marginTop: "14px" }}><GoogleRating /></div>
          </Reveal>
        </div>
      </section>

      {/* ===== HOW IT WORKS (new) ===== */}
      <HowItWorks heading={content.howItWorks.heading} steps={content.howItWorks.steps} />

      {/* ===== TESTIMONIALS (reused content) ===== */}
      <section aria-label="Customer testimonials" style={{ background: "var(--beige)", padding: "64px 0" }}>
        <div className="container">
          <h2 className="font-serif text-center" style={{ fontSize: "clamp(20px,2.6vw,28px)", color: "var(--teal-deep)", letterSpacing: "0.04em", lineHeight: 1.3 }}>
            What Our Clients Say
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 items-start" style={{ marginTop: "40px" }}>
            {data.testimonials.slice(0, 4).map((t, i) => (
              <Reveal key={t.name} delay={(i % 4) * 70} className="card-raised" style={{ overflow: "hidden", background: "#fff" }}>
                <Image src={t.img} alt={`${t.name} — verified review`} width={400} height={300} loading="lazy" sizes="(max-width:640px) 90vw, 25vw" style={{ display: "block", width: "100%", aspectRatio: "4 / 3", objectFit: "cover" }} />
                <div style={{ padding: "16px 18px 20px" }}>
                  <p style={{ fontSize: "12.5px", color: "var(--label)", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical", overflow: "hidden" }}>&ldquo;{t.quote}&rdquo;</p>
                  <p style={{ fontSize: "13px", color: "var(--ink-soft)", marginTop: "12px", fontWeight: 600 }}>— {t.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESULTS + MEDICAL GUARANTEE (new) ===== */}
      <ResultsGuarantee
        eyebrow={guarantee.eyebrow}
        heading={guarantee.heading}
        body={guarantee.body}
        points={guarantee.points}
        medicalLine={guarantee.medicalLine}
        freshaHref={data.bookHref}
        ctaLabel={guarantee.ctaLabel}
      />

      {/* ===== FAQ (native details — accessible, no JS; schema rendered on the page) ===== */}
      <section aria-label="Frequently asked questions" style={{ padding: "64px 0" }}>
        <div className="container">
          <div className="mx-auto" style={{ maxWidth: "820px" }}>
            <h2 className="font-display" style={{ fontSize: "clamp(18px,2.4vw,24px)", color: "var(--teal-deep)", letterSpacing: "0.12em", marginBottom: "26px" }}>Frequently Asked Questions About HydraFacial</h2>
            {data.faq.map((f) => (
              <details key={f.q} style={{ borderBottom: "1px solid var(--line)" }}>
                <summary className="flex items-center justify-between" style={{ listStyle: "none", cursor: "pointer", padding: "20px 0", minHeight: 44, gap: "20px", fontSize: "16px", color: "var(--gold)", lineHeight: 1.4 }}>
                  <span>{f.q}</span>
                  <span aria-hidden="true" style={{ color: "var(--gold)", fontSize: "20px", lineHeight: 1 }}>+</span>
                </summary>
                <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.8, padding: "0 0 20px" }}>{f.a}</p>
              </details>
            ))}
            <div className="text-center" style={{ marginTop: "40px" }}>
              <BookingButtons freshaHref={data.bookHref} primaryLabel={hero.ctaLabel} consultLabel="Book Free Consultation" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CLOSING CTA BAND (Liquid Gloss) ===== */}
      <section aria-label="Book your package" className="ambient-host" style={{ background: "linear-gradient(180deg, #ffffff 0%, var(--teal-100) 50%, #ffffff 100%)", padding: "clamp(56px,8vh,96px) 0" }}>
        <AmbientField blob="center" tone="teal" soft dots={false} />
        <div className="container text-center">
          <Reveal className="lg lg--panel mx-auto" style={{ position: "relative", overflow: "hidden", maxWidth: "680px", padding: "clamp(30px,4vw,52px)" }}>
            <Motif mode="watermark" opacity={0.05} />
            <h2 className="font-serif" style={{ fontSize: "clamp(24px,3.4vw,38px)", color: "var(--ink)", lineHeight: 1.2 }}>{closing.heading}</h2>
            <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.7, marginTop: "14px", maxWidth: "520px", marginInline: "auto" }}>{closing.sub}</p>
            <div style={{ marginTop: "26px", display: "flex", justifyContent: "center" }}>
              <BookingButtons freshaHref={data.bookHref} primaryLabel={closing.ctaLabel} consultLabel="Book Free Consultation" />
            </div>
            <div style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}><GoogleRating /></div>
          </Reveal>
        </div>
      </section>

      {/* ===== RECOMMENDED (reused content) ===== */}
      {data.recommended && (
        <section aria-label={data.recommended.heading} style={{ padding: "64px 0" }}>
          <div className="container">
            <h2 className="font-display text-center" style={{ fontSize: "clamp(17px,2.4vw,24px)", color: "var(--teal-deep)", letterSpacing: "0.12em" }}>{data.recommended.heading}</h2>
            <div className={`grid gap-6 ${data.recommended.cards.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"} mx-auto`} style={{ marginTop: "36px", maxWidth: data.recommended.cards.length === 2 ? "620px" : "920px" }}>
              {data.recommended.cards.map((r, i) => (
                <Reveal key={r.label} delay={(i % 3) * 80}>
                  <Link href={r.href} className="card-raised block" style={{ overflow: "hidden" }} aria-label={r.label}>
                    <Image src={r.img} alt={r.label} width={400} height={468} loading="lazy" sizes="(max-width:640px) 90vw, 30vw" style={{ display: "block", width: "100%", aspectRatio: "286 / 335", objectFit: "cover" }} />
                    <div style={{ background: "var(--beige)", padding: "14px 16px" }}>
                      <span className="font-display" style={{ fontSize: "12px", color: "var(--label)", letterSpacing: "0.08em" }}>{r.label}</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
