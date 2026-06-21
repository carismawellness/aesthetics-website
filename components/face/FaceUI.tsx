import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import type { FaceTreatment, InfoStat, Area, Step, BeforeAfter, Faq } from "@/lib/face-treatments";

/*
  Shared, reusable UI for the Face Treatments section (listing + detail).
  Presentational server components built on the project design tokens. Spacing,
  typography and image ratios follow the design spec. Sections render only when
  their data is present, so each treatment record stays independently editable.
*/

const BOOK = "/consultation";

// ---------- primitives ----------
export function Eyebrow({ children, tone = "gold", center }: { children: React.ReactNode; tone?: "gold" | "label" | "onDark"; center?: boolean }) {
  // onDark: light cream tint for use over the dark hero overlay (AA-safe vs the worst-case flattened overlay bg).
  const color = tone === "gold" ? "var(--gold)" : tone === "onDark" ? "var(--teal-100)" : "var(--label)";
  return (
    <p
      className="font-display"
      style={{ fontSize: "clamp(11px,1.1vw,12px)", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color, textAlign: center ? "center" : "left", marginBottom: "12px" }}
    >
      {children}
    </p>
  );
}

export function SectionHeading({ eyebrow, title, center = true, light = false, max }: { eyebrow?: string; title: string; center?: boolean; light?: boolean; max?: number }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", maxWidth: max ? `${max}px` : undefined, marginInline: center && max ? "auto" : undefined }}>
      {eyebrow && <Eyebrow center={center}>{eyebrow}</Eyebrow>}
      <h2 className="font-display" style={{ fontSize: "clamp(26px,3.2vw,35px)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.25, color: light ? "var(--cream)" : "var(--ink)" }}>
        {title}
      </h2>
    </div>
  );
}

export function TealButton({ href, children, small = false }: { href: string; children: React.ReactNode; small?: boolean }) {
  return (
    <Link href={href} className="btn btn-teal font-display" style={{ borderRadius: "var(--radius-pill)", padding: small ? "9px 20px" : "14px 30px", fontSize: small ? "11px" : "12px", letterSpacing: "0.14em", display: "inline-block" }}>
      {children}
    </Link>
  );
}

// ---------- cards ----------
export function TreatmentCard({ t, variant = "card" }: { t: { slug: string; name: string; tagline?: string; cardImage: string }; variant?: "card" | "explore" }) {
  return (
    <Link href={`/face-treatments/${t.slug}`} className="group block card" style={{ borderRadius: "var(--radius-card)", overflow: "hidden" }}>
      <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 4", overflow: "hidden" }}>
        <Image src={t.cardImage} alt={t.name} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" style={{ objectFit: "cover" }} className="transition-transform duration-500 group-hover:scale-[1.05]" />
        {/* Subtle gradient overlay at bottom for text legibility */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 55%, rgba(12,11,11,0.25) 100%)", pointerEvents: "none" }} />
      </div>
      <div style={{ padding: "20px 20px 22px", borderTop: "1px solid var(--line)" }}>
        <h3 className="font-display" style={{ fontSize: "clamp(13px,1.2vw,15px)", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink)", marginBottom: variant === "card" && t.tagline ? "8px" : "0" }}>{t.name}</h3>
        {variant === "card" && t.tagline && <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6, marginBottom: "14px" }}>{t.tagline}</p>}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span className="font-display" style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--teal)" }}>Explore</span>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="var(--teal)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </div>
      </div>
    </Link>
  );
}

// ---------- detail sections ----------
export function FaceHero({ t }: { t: FaceTreatment }) {
  return (
    <section style={{ position: "relative", minHeight: "min(78vh, 680px)", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
      <Image src={t.heroImage} alt={t.name} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
      {/* Overlay strengthened to 0.62 at the text band so white/cream copy stays AA even over a bright underlying image (worst case ~#686868). */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(12,11,11,0.25) 0%, rgba(12,11,11,0.62) 100%)" }} />
      <div className="container" style={{ position: "relative", paddingTop: "120px", paddingBottom: "56px" }}>
        <div style={{ maxWidth: "640px" }}>
          <Eyebrow tone="onDark">{t.eyebrow}</Eyebrow>
          <h1 className="font-display" style={{ fontSize: "clamp(30px,4.2vw,44px)", fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase", lineHeight: 1.2, color: "#fff" }}>{t.name}</h1>
          <p style={{ fontSize: "clamp(14px,1vw,16px)", color: "#ffffff", lineHeight: 1.7, margin: "18px 0 26px", maxWidth: "560px" }}>{t.heroSubhead}</p>
          <TealButton href={BOOK}>Free Consultation</TealButton>
        </div>
      </div>
    </section>
  );
}

export function TreatmentInfoBar({ stats }: { stats: InfoStat[] }) {
  return (
    <section style={{ background: "var(--teal-100)", borderBottom: "1px solid var(--line)" }}>
      <div className="container" style={{ paddingTop: "28px", paddingBottom: "28px" }}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5" style={{ gap: "20px" }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p className="font-display" style={{ fontSize: "clamp(10px,1vw,12px)", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--label)", marginBottom: "6px" }}>{s.label}</p>
              <p style={{ fontSize: "clamp(15px,1.6vw,18px)", fontWeight: 500, color: "var(--ink)" }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BeforeAfter({ name, pairs }: { name: string; pairs: BeforeAfter[] }) {
  const p = pairs[0];
  return (
    <Section>
      <SectionHeading eyebrow="Results" title={`${name} — before & after`} />
      <Reveal className="mx-auto" style={{ marginTop: "44px", maxWidth: "720px" }}>
        <div className="grid grid-cols-2" style={{ gap: "20px" }}>
          {([["Before", p.before], ["After", p.after]] as const).map(([label, src]) => (
            <div key={label}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 5", borderRadius: "var(--radius-card)", overflow: "hidden", border: "1px solid var(--line)" }}>
                <Image src={src} alt={`${name} ${label}`} fill sizes="(max-width:640px) 50vw, 360px" style={{ objectFit: "cover" }} />
                <span className="font-display" style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(255,255,255,0.92)", color: "var(--ink)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 10px", borderRadius: "var(--radius-pill)" }}>{label}</span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

export function AreaGrid({ areas }: { areas: Area[] }) {
  return (
    <Section tone="cream">
      <SectionHeading eyebrow="Where it helps" title="Precision areas of refinement" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "24px", marginTop: "44px" }}>
        {areas.map((a, i) => (
          <Reveal key={a.label} delay={(i % 4) * 70} className="card" style={{ borderRadius: "var(--radius-card)", padding: "26px 22px" }}>
            <span className="font-display" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "50%", border: "1px solid var(--teal)", color: "var(--teal)", fontSize: "14px", marginBottom: "14px" }}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className="font-display" style={{ fontSize: "clamp(14px,1.4vw,16px)", fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase", color: "var(--ink)", marginBottom: "8px" }}>{a.label}</h3>
            <p style={{ fontSize: "13.5px", color: "var(--muted)", lineHeight: 1.6 }}>{a.blurb}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function SuitabilityCompare({ ideal, notIdeal }: { ideal: string[]; notIdeal: string[] }) {
  return (
    <Section>
      <SectionHeading eyebrow="Honest guidance" title="Is this right for you?" />
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "24px", marginTop: "44px", maxWidth: "960px", marginInline: "auto" }}>
        <div style={{ background: "var(--teal-100)", border: "1px solid var(--teal)", borderRadius: "var(--radius-card)", padding: "30px 28px" }}>
          <h3 className="font-display" style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)", marginBottom: "18px" }}>Suitable for you if</h3>
          <ul style={{ display: "grid", gap: "12px" }}>
            {ideal.map((s) => (
              <li key={s} className="flex items-start" style={{ gap: "12px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}><path d="M5 12.5l4.5 4.5L19 7" /></svg>
                <span style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.55 }}>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ background: "var(--white)", border: "1px solid var(--line)", borderRadius: "var(--radius-card)", padding: "30px 28px" }}>
          <h3 className="font-display" style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--label)", marginBottom: "18px" }}>May not be ideal if</h3>
          <ul style={{ display: "grid", gap: "12px" }}>
            {notIdeal.map((s) => (
              <li key={s} className="flex items-start" style={{ gap: "12px" }}>
                {/* X icon (vs. the ✓ icon above) is the non-color cue distinguishing "not ideal"; stroke darkened to var(--label) for 3:1 UI contrast. */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--label)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}><path d="M6 6l12 12M18 6L6 18" /></svg>
                <span style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.55 }}>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export function ExperienceSteps({ steps }: { steps: Step[] }) {
  return (
    <Section tone="cream">
      <SectionHeading eyebrow="What to expect" title="Your treatment experience" />
      <div style={{ marginTop: "44px", maxWidth: "860px", marginInline: "auto", display: "grid", gap: "20px" }}>
        {steps.map((s) => (
          <Reveal key={s.n} className="flex items-start card" style={{ gap: "22px", borderRadius: "var(--radius-card)", padding: "24px 26px" }}>
            <span className="font-display" style={{ flexShrink: 0, fontSize: "22px", fontWeight: 600, color: "var(--teal)", lineHeight: 1 }}>{String(s.n).padStart(2, "0")}</span>
            <div>
              <h3 className="font-display" style={{ fontSize: "clamp(15px,1.6vw,18px)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)", marginBottom: "8px" }}>{s.label}</h3>
              <p style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.7 }}>{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function PrepAftercare({ prep }: { prep: { before: string; during: string; after: string } }) {
  const cols: [string, string][] = [["Before", prep.before], ["During", prep.during], ["After", prep.after]];
  return (
    <Section>
      <SectionHeading eyebrow="Preparation & aftercare" title="Looking after your result" />
      <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "24px", marginTop: "44px" }}>
        {cols.map(([label, text]) => (
          <div key={label} style={{ background: "var(--cream)", borderRadius: "var(--radius-card)", padding: "28px 24px" }}>
            <h3 className="font-display" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--teal-deep)", marginBottom: "12px" }}>{label}</h3>
            <p style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.7 }}>{text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function TrustStrip({ logos, benefits }: { logos: string[]; benefits: string[] }) {
  return (
    <Section tone="cream">
      <SectionHeading eyebrow="As featured in" title="Malta's trusted clinic for facial aesthetics" max={760} />
      <div className="flex flex-wrap items-center justify-center" style={{ gap: "30px", marginTop: "28px" }}>
        {logos.map((src) => (
          <Image key={src} src={src} alt="" width={120} height={36} style={{ height: "30px", width: "auto", objectFit: "contain", opacity: 0.8 }} />
        ))}
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "12px 32px", marginTop: "40px", maxWidth: "820px", marginInline: "auto" }}>
        {benefits.map((b) => (
          <li key={b} className="flex items-start" style={{ gap: "12px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "3px" }}><path d="M5 12.5l4.5 4.5L19 7" /></svg>
            <span style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.5 }}>{b}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function CarismaDifference({ commitments }: { commitments: string[] }) {
  return (
    <section style={{ background: "var(--beige)" }}>
      <div className="container" style={{ paddingTop: "96px", paddingBottom: "96px" }}>
        <h2 className="font-display" style={{ textAlign: "center", fontSize: "clamp(34px,4.6vw,48px)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink)", lineHeight: 1.2, marginBottom: "44px" }}>The Carisma difference</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "18px 36px", maxWidth: "920px", marginInline: "auto" }}>
          {commitments.map((c) => (
            <li key={c} className="flex items-start" style={{ gap: "14px" }}>
              <span style={{ flexShrink: 0, width: "8px", height: "8px", borderRadius: "50%", background: "var(--gold)", marginTop: "8px" }} />
              <span style={{ fontSize: "15px", color: "var(--ink-soft)", lineHeight: 1.6 }}>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CtaBanner({ heading, sub, buttonLabel = "Book a Consultation", href = BOOK }: { heading: string; sub?: string; buttonLabel?: string; href?: string }) {
  return (
    <section style={{ background: "var(--beige)" }}>
      <div className="container" style={{ paddingTop: "80px", paddingBottom: "80px", textAlign: "center" }}>
        <h2 className="font-display" style={{ fontSize: "clamp(24px,3vw,34px)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink)", lineHeight: 1.25, maxWidth: "760px", marginInline: "auto" }}>{heading}</h2>
        {sub && <p style={{ fontSize: "15px", color: "var(--ink-soft)", lineHeight: 1.7, maxWidth: "620px", margin: "16px auto 0" }}>{sub}</p>}
        <div style={{ marginTop: "28px" }}><TealButton href={href}>{buttonLabel}</TealButton></div>
      </div>
    </section>
  );
}

export function RecommendedGrid({ items }: { items: { slug: string; name: string; cardImage: string }[] }) {
  if (items.length === 0) return null;
  return (
    <Section>
      <SectionHeading eyebrow="Explore further" title="Recommended treatments" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "28px", marginTop: "44px" }}>
        {items.map((t, i) => (
          <Reveal key={t.slug} delay={(i % 3) * 80}>
            <TreatmentCard t={t} variant="explore" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <Section tone="cream">
      <div className="mx-auto" style={{ maxWidth: "820px" }}>
        <SectionHeading eyebrow="Good to know" title="Frequently asked questions" />
        <div style={{ marginTop: "40px" }}>
          <FaqAccordion items={faqs} />
        </div>
      </div>
    </Section>
  );
}

// ---------- layout helper ----------
export function Section({ children, tone = "white" }: { children: React.ReactNode; tone?: "white" | "cream" }) {
  return (
    <section style={{ background: tone === "cream" ? "var(--cream)" : "var(--white)" }}>
      <div className="container" style={{ paddingTop: "96px", paddingBottom: "96px" }}>{children}</div>
    </section>
  );
}
