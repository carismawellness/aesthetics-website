import Link from "next/link";
import VideoPlayer from "@/components/VideoPlayer";
import HeroBackdrop from "@/components/motion/HeroBackdrop";

/* ──────────────────────────────────────────────────────────────────────────
   PageHero — the shared above-the-fold hero for EVERY Carisma Aesthetics page.

   Adapted from the Carisma Slimming design language onto the aesthetics palette:
   • Two-column: copy left, ARCH media container right.
   • Frosted floating proof cards over the arch that gently drift (.float-a/-b,
     reduced-motion safe), so it stays a server component.
   • Fits one viewport (.hero-fit → 100svh, reserves the fixed nav via --nav-clear).
   • Video media uses the shared <VideoPlayer> (no autoplay → poster + play button,
     plays at full volume, sound toggle) and keeps the arch shape on play.
   Tokens come from globals.css (locked WCAG-AA aesthetics palette).
   ────────────────────────────────────────────────────────────────────────── */

const ARCH_RADIUS = "220px 220px 18px 18px";

export type HeroBullet = { label?: string; text: string };
export type HeroMedia = {
  type: "video" | "image";
  src: string;
  poster?: string;
  alt?: string;
  fit?: "cover" | "contain";
  /** arch aspect-ratio (defaults: portrait video 4/5, image 4/5). */
  aspect?: string;
  /** arch background behind the media. */
  bg?: string;
};
export type HeroProof = {
  rating?: string;
  reviews?: string;
  statValue?: string;
  statLabel?: string;
  awardSrc?: string;
  awardText?: string;
};
export type PageHeroProps = {
  /** glass badge pill, top-left (e.g. "#1 voted med-aesthetics clinic"). */
  badge?: string;
  eyebrow?: string;
  /** Headline lines; {em:true} colours the line teal. */
  headline: { text: string; em?: boolean }[];
  sub?: string;
  bullets?: HeroBullet[];
  primaryCta: { text: string; href: string; external?: boolean };
  secondaryCta?: { text: string; href: string; external?: boolean };
  media: HeroMedia;
  proof?: HeroProof;
  background?: string;
  compactHeadline?: boolean;
  /** render the lazy WebGL bokeh backdrop (home only by default). */
  motif?: boolean;
};

const SERIF = '"Trajan Pro", Georgia, serif';
const WIDE = '"Novecento Wide", sans-serif';

function Stars({ size = 14 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 1, color: "var(--gold-deep)" }} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function CtaLink({ cta, className, style, children }: { cta: { href: string; external?: boolean }; className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  return cta.external ? (
    <a href={cta.href} target="_blank" rel="noopener noreferrer" className={className} style={style}>{children}</a>
  ) : (
    <Link href={cta.href} className={className} style={style}>{children}</Link>
  );
}

export default function PageHero({
  badge,
  eyebrow,
  headline,
  sub,
  bullets,
  primaryCta,
  secondaryCta,
  media,
  proof,
  background,
  compactHeadline,
  motif,
}: PageHeroProps) {
  const headlineSize = compactHeadline ? "clamp(26px,3vw,40px)" : "clamp(30px,3.6vw,50px)";
  const aspect = media.aspect ?? "4 / 5";

  return (
    <section
      className="hero-fit"
      style={{
        position: "relative",
        overflow: "hidden",
        paddingInline: "clamp(16px,4vw,40px)",
        background: background || "radial-gradient(120% 90% at 85% 10%, var(--teal-100) 0%, #f6f4ef 45%, #ffffff 100%)",
      }}
    >
      {motif && <HeroBackdrop />}
      {/* soft brand glow bed (decorative) */}
      <span aria-hidden style={{ position: "absolute", top: "-12%", right: "-8%", width: 460, height: 460, borderRadius: "50%", background: "rgba(150,178,178,0.28)", filter: "blur(90px)", zIndex: 0 }} />

      <div
        className="page-hero-grid"
        style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1180, margin: "0 auto", display: "grid", gap: "clamp(24px,3vw,48px)", alignItems: "center" }}
      >
        {/* LEFT — message */}
        <div>
          {badge && (
            <div style={{ display: "flex", marginBottom: 18 }}>
              <span className="hero-pill">
                <span style={{ fontFamily: WIDE, fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)" }}>{badge}</span>
              </span>
            </div>
          )}

          {eyebrow && (
            <p style={{ fontFamily: WIDE, fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", margin: "0 0 14px" }}>{eyebrow}</p>
          )}

          <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: headlineSize, lineHeight: 1.1, textTransform: "uppercase", color: "var(--gold)", margin: "0 0 18px", maxWidth: 640, textWrap: "balance" }}>
            {headline.map((l, i) => (
              <span key={i} style={{ display: "block", color: l.em ? "var(--teal-text)" : undefined }}>{l.text}</span>
            ))}
          </h1>

          {sub && (
            <p style={{ fontFamily: "Roboto, sans-serif", fontSize: "clamp(14px,1.1vw,15.5px)", lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: 520, margin: "0 0 20px", textWrap: "pretty" }}>{sub}</p>
          )}

          {bullets && bullets.length > 0 && (
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 26px", display: "grid", gap: 9, maxWidth: 540 }}>
              {bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span aria-hidden style={{ flexShrink: 0, width: 20, height: 20, borderRadius: "50%", background: "rgba(150,178,178,0.22)", display: "grid", placeItems: "center", marginTop: 1 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="var(--teal-text)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span style={{ fontFamily: "Roboto, sans-serif", fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>
                    {b.label && <strong style={{ color: "var(--gold)", fontWeight: 600 }}>{b.label} </strong>}
                    {b.text}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginBottom: 18 }}>
            <CtaLink cta={primaryCta} className="btn btn-teal" style={{ borderRadius: 999, padding: "15px 30px" }}>
              {primaryCta.text}
            </CtaLink>
            {secondaryCta && (
              <CtaLink cta={secondaryCta} className="hero-outline">{secondaryCta.text}</CtaLink>
            )}
          </div>

          {/* review proof under the CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <Stars size={14} />
            <span style={{ fontFamily: "Roboto, sans-serif", fontSize: 13, color: "var(--ink-soft)" }}>
              <strong style={{ color: "var(--teal-text)" }}>{proof?.rating || "4.9"}</strong> · {proof?.reviews || "200+"} verified client reviews
            </span>
          </div>
        </div>

        {/* RIGHT — arch media + floating proof */}
        <div className="page-hero-media" style={{ position: "relative", justifySelf: "center", width: "100%", display: "flex", justifyContent: "center" }}>
          <div
            style={{
              position: "relative",
              height: "min(60vh, 540px)",
              aspectRatio: aspect,
              maxWidth: "100%",
              borderRadius: ARCH_RADIUS,
              overflow: "hidden",
              background: media.bg || "linear-gradient(160deg, var(--teal-100) 0%, var(--gray-100) 55%, var(--beige) 100%)",
              boxShadow: "0 24px 60px rgba(28,30,30,0.16)",
            }}
          >
            {media.type === "video" ? (
              <VideoPlayer fill radius={ARCH_RADIUS} src={media.src} poster={media.poster} label={media.alt} objectFit={media.fit || "cover"} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={media.src} alt={media.alt || "Carisma Aesthetics Malta"} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: media.fit || "cover", display: "block" }} />
            )}
          </div>

          {/* stat card — bottom-left */}
          <div className="hero-glass float-a" style={{ position: "absolute", left: "clamp(-14px,-1vw,0px)", bottom: "12%", borderRadius: 16, padding: "11px 16px", display: "flex", alignItems: "center", gap: 10, zIndex: 3 }}>
            <span style={{ fontFamily: SERIF, fontSize: 28, color: "var(--gold)", lineHeight: 1 }}>{proof?.statValue || "30+"}</span>
            <span style={{ fontFamily: WIDE, fontSize: 9.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", lineHeight: 1.3, maxWidth: 86 }}>{proof?.statLabel || "years in wellness"}</span>
          </div>

          {/* award / #1 voted — top-right */}
          <div className="hero-glass float-b" style={{ position: "absolute", right: "clamp(-12px,-0.5vw,4px)", top: "8%", borderRadius: 16, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, maxWidth: 210, zIndex: 3 }}>
            {proof?.awardSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={proof.awardSrc} alt="" aria-hidden style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0 }} />
            ) : (
              <Stars size={11} />
            )}
            <span style={{ fontFamily: WIDE, fontSize: 9.5, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--ink)", lineHeight: 1.35, whiteSpace: "pre-line", fontWeight: 600 }}>{proof?.awardText || "#1 Voted Clinic\nMalta Healthcare Awards"}</span>
          </div>
        </div>
      </div>

      <style>{`
        .page-hero-grid { grid-template-columns: 1fr; }
        @media (min-width: 900px) {
          .page-hero-grid { grid-template-columns: 60fr 40fr; }
          .page-hero-media { justify-self: end; }
        }
      `}</style>
    </section>
  );
}
