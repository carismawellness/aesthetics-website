import Link from "next/link";
import VideoPlayer from "@/components/VideoPlayer";
import HeroAutoplayVideo from "@/components/HeroAutoplayVideo";
import HeroMotif from "@/components/motion/HeroMotif";

/* ──────────────────────────────────────────────────────────────────────────
   PageHero — the shared above-the-fold hero for EVERY Carisma Aesthetics page.

   Adapted from the Carisma Slimming design language onto the aesthetics palette:
   • Two-column: copy left, ARCH media container right.
   • Frosted floating proof cards over the arch that gently drift (.float-a/-b,
     reduced-motion safe), so it stays a server component.
   • Fits one viewport (.hero-fit → 100svh, reserves the fixed nav via --nav-clear).
   • Video media uses the shared <VideoPlayer> (no autoplay → poster + play button,
     plays at full volume, sound toggle) and keeps the arch shape on play.
   • theme="dark" renders the same structure in the gold-on-charcoal colourway for
     the dark-stone pages (e.g. hair regrowth).
   ────────────────────────────────────────────────────────────────────────── */

const ARCH_RADIUS = "220px 220px 18px 18px";
const SERIF = '"Trajan Pro", Georgia, serif';
const WIDE = '"Novecento Wide", sans-serif';
const BODY = "Roboto, sans-serif";

/* Two-tone teal-blue headline split (mirrors Slimming's dark-green→light-green
   treatment, in the Aesthetics "blue" / teal family — no brown, no green).
   • TEAL_DEEP  — deep teal-blue, AA (>=4.5:1) on the pale hero ground; base line.
   • TEAL_LIGHT — darker teal-blue for the emphasised line, still AA+ on white (WCAG AA). */
const TEAL_DEEP = "#245052"; // deep teal-blue (WCAG AA 5.1:1) — primary headline line / accents
const TEAL_LIGHT = "#1d3f43"; // darker teal-blue (WCAG AA 5.5:1) — emphasised ("em") headline line

export type HeroBullet = { label?: string; text: string };
export type HeroMedia = {
  type: "video" | "image";
  src: string;
  poster?: string;
  alt?: string;
  fit?: "cover" | "contain";
  aspect?: string;
  bg?: string;
  /** Opt-in: auto-load + autoplay the video immediately (muted, looped,
   *  playsInline) instead of the default poster + click-to-play. Used only by
   *  the home hero. Respects prefers-reduced-motion (keeps the static poster). */
  autoPlay?: boolean;
  /** Opt-in: let the arch media fill its column edge-to-edge (no surrounding
   *  white space). The arch grows to the full media-column width and its height
   *  follows from the column width within a tasteful cap, instead of the default
   *  height-driven box whose width is constrained by `aspect`. The elegant arch
   *  radius is preserved and the image still uses object-fit: cover (no
   *  distortion). Used by the membership hero. Backward-compatible: omit and the
   *  hero is unchanged. */
  fill?: boolean;
  /** Optional object-position for the arch image (e.g. "center top") to control
   *  framing when object-fit: cover crops. Defaults to "center". */
  position?: string;
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
  badge?: string;
  eyebrow?: string;
  headline: { text: string; em?: boolean }[];
  sub?: string;
  /** Optional second body paragraph rendered directly under `sub` (e.g. the full
   *  treatment intro, with `sub` acting as a short one-line lead-in above it).
   *  Backward-compatible: omit it and the hero is unchanged. */
  subSecondary?: string;
  bullets?: HeroBullet[];
  primaryCta: { text: string; href: string; external?: boolean };
  secondaryCta?: { text: string; href: string; external?: boolean };
  media: HeroMedia;
  proof?: HeroProof;
  /** Optional content rendered inside the right column, directly beneath the arch
   *  media (e.g. a treatment-info card) so it reads as part of the hero. Stacks
   *  below the hero copy on mobile. Backward-compatible: omit to leave the hero
   *  right column as media-only. */
  belowMedia?: React.ReactNode;
  /** Optional bespoke media that REPLACES the arch image/video. Rendered inside the
   *  same sized wrapper (transparent — no arch box) so the floating proof cards still
   *  anchor correctly and the custom visual can float/overflow freely (e.g. the gifts
   *  fanned-cards). Backward-compatible: omit to keep the standard arch media. */
  mediaSlot?: React.ReactNode;
  /** Optional content rendered at the BOTTOM of the LEFT column, beneath the
   *  rating/footnote (e.g. a compact treatment-info strip). Keeps the right
   *  column media-only. Backward-compatible: omit and nothing renders. */
  belowContent?: React.ReactNode;
  /** Optional small print under the hero CTAs/rating (e.g. a pricing disclaimer).
   *  Backward-compatible: omit and nothing renders. */
  footnote?: string;
  background?: string;
  compactHeadline?: boolean;
  motif?: boolean;
  theme?: "light" | "dark";
};

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
  subSecondary,
  bullets,
  primaryCta,
  secondaryCta,
  media,
  proof,
  belowMedia,
  mediaSlot,
  belowContent,
  footnote,
  background,
  compactHeadline,
  theme = "light",
}: PageHeroProps) {
  const dark = theme === "dark";
  // Match slimming's restrained hero proportions exactly.
  const headlineSize = compactHeadline ? "clamp(23px,2.7vw,31px)" : "clamp(26px,3vw,35px)";
  const aspect = media.aspect ?? (media.type === "video" ? "406 / 720" : "4 / 5");
  // Fill mode: the arch grows to its column width edge-to-edge (no white space),
  // its height follows from the width via `aspect`, capped so it never towers.
  const fill = media.fill === true;

  // Colourway
  const c = {
    // Two-tone teal-blue headline (Slimming-style split): deep line + lighter "em" line.
    headline: dark ? "#c9a96a" : TEAL_DEEP,
    em: dark ? "#e2c97a" : TEAL_LIGHT,
    // Body copy: neutral grey (AA on white) at normal weight — no brown, no bold.
    body: dark ? "rgb(176,166,143)" : "var(--muted)",
    eyebrow: dark ? "#c9a96a" : TEAL_DEEP,
    bulletLabel: dark ? "#e2c97a" : TEAL_DEEP,
    pillText: dark ? "#c9a96a" : "#0d1b1d", // badge text: dark teal (AAA 10.0:1 on white + semi-transparent white bg)
    proofStrong: dark ? "#c9a96a" : TEAL_DEEP,
    stat: dark ? "#c9a96a" : TEAL_DEEP,
    statLabel: dark ? "rgba(176,166,143,0.85)" : "var(--muted)",
    awardText: dark ? "#e8e0cf" : "var(--ink)",
    check: dark ? "#c9a96a" : TEAL_LIGHT,
    checkBg: dark ? "rgba(201,169,106,0.16)" : "rgba(150,178,178,0.22)",
  };
  const sectionBg = background || (dark
    ? "radial-gradient(120% 90% at 85% 10%, #1c1a17 0%, #14120e 55%, #0e0c09 100%)"
    : "radial-gradient(120% 90% at 85% 10%, #ffffff 0%, #f7fafa 60%, #f7fafa 100%)");
  const archBg = media.bg || (dark ? "#0c0c0c" : "linear-gradient(160deg, var(--teal-100) 0%, var(--gray-100) 55%, var(--beige) 100%)");
  const glassClass = dark ? "hero-glass-dark" : "hero-glass";
  const pillClass = dark ? "hero-pill-dark" : "hero-pill";
  const outlineClass = dark ? "hero-outline-dark" : "hero-outline";
  const primaryClass = dark ? "btn btn-gold" : "btn btn-teal";

  return (
    <section className="hero-fit" style={{ position: "relative", overflow: "hidden", paddingInline: "clamp(16px,4vw,40px)", background: sectionBg }}>
      {/* Animated constellation motif — drifting linked dots (every page).
         Light pages use a deeper teal so the lattice reads clearly over the
         pale teal-mist bed; the dark page uses gold. */}
      <HeroMotif color={dark ? "201, 169, 106" : "116, 156, 156"} />
      <span aria-hidden style={{ position: "absolute", top: "-12%", right: "-8%", width: 460, height: 460, borderRadius: "50%", background: dark ? "rgba(201,169,106,0.16)" : "rgba(238, 243, 243,0.5)", filter: "blur(90px)", zIndex: 0 }} />

      <div className="page-hero-grid" style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1180, margin: "0 auto", display: "grid", gap: "clamp(10px,1.6vw,24px)", alignItems: "center" }}>
        {/* LEFT — message */}
        <div>
          {badge && (
            <div style={{ display: "flex", marginBottom: 18 }}>
              <span className={pillClass}>
                <span style={{ fontFamily: WIDE, fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: c.pillText }}>{badge}</span>
              </span>
            </div>
          )}

          {eyebrow && (
            <p style={{ fontFamily: WIDE, fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: c.eyebrow, margin: "0 0 14px" }}>{eyebrow}</p>
          )}

          <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: headlineSize, lineHeight: 1.1, color: c.headline, margin: "0 0 18px", maxWidth: 640, textWrap: "balance" }}>
            {headline.map((l, i) => (
              <span key={i} style={{ display: "block", color: l.em ? c.em : undefined }}>{l.text}</span>
            ))}
          </h1>

          {sub && (
            <p style={{ fontFamily: BODY, fontSize: "clamp(14px,1.1vw,15.5px)", fontWeight: 400, lineHeight: 1.6, color: c.body, maxWidth: 520, margin: subSecondary ? "0 0 10px" : "0 0 20px", textWrap: "pretty" }}>{sub}</p>
          )}

          {subSecondary && (
            <p style={{ fontFamily: BODY, fontSize: "clamp(13.5px,1.05vw,15px)", fontWeight: 400, lineHeight: 1.6, color: c.body, maxWidth: 540, margin: "0 0 20px", textWrap: "pretty" }}>{subSecondary}</p>
          )}

          {bullets && bullets.length > 0 && (
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 26px", display: "grid", gap: 9, maxWidth: 540 }}>
              {bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span aria-hidden style={{ flexShrink: 0, width: 20, height: 20, borderRadius: "50%", background: c.checkBg, display: "grid", placeItems: "center", marginTop: 1 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke={c.check} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span style={{ fontFamily: BODY, fontSize: 13.5, fontWeight: 400, color: c.body, lineHeight: 1.5 }}>
                    {b.label && <strong style={{ color: c.bulletLabel, fontWeight: 400 }}>{b.label} </strong>}
                    {b.text}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginBottom: 18 }}>
            <CtaLink cta={primaryCta} className={primaryClass} style={{ borderRadius: 999, padding: "14px 28px" }}>{primaryCta.text}</CtaLink>
            {secondaryCta && (
              <CtaLink cta={secondaryCta} className={outlineClass}>{secondaryCta.text}</CtaLink>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <Stars size={14} />
            <span style={{ fontFamily: BODY, fontSize: 13, color: c.body }}>
              <strong style={{ color: c.proofStrong }}>{proof?.rating || "4.9"}</strong> · {proof?.reviews || "500+"} verified client reviews
            </span>
          </div>

          {footnote && (
            <p style={{ fontFamily: BODY, fontSize: 11.5, fontWeight: 400, lineHeight: 1.5, color: c.statLabel, maxWidth: 540, margin: "14px 0 0" }}>{footnote}</p>
          )}

          {/* optional compact strip beneath the rating (e.g. treatment-info) */}
          {belowContent && (
            <div style={{ marginTop: footnote ? 16 : 22 }}>{belowContent}</div>
          )}
        </div>

        {/* RIGHT — arch media + floating proof (+ optional belowMedia card) */}
        <div className="page-hero-media" style={{ position: "relative", justifySelf: "center", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: belowMedia ? "clamp(16px,2.4vh,28px)" : 0 }}>
          {/* arch wrapper — floating proof cards position against THIS, not the column.
             In fill mode the wrapper spans the full column so the arch (width:100%)
             sits flush to its edges and the cards anchor to the arch's true edges. */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", width: fill ? "100%" : undefined }}>
            {mediaSlot ? (
              /* Bespoke media (e.g. gifts fanned-cards): transparent sized wrapper,
                 NO arch box/overflow — lets the custom visual float & overflow freely.
                 Same dimensions as the arch so the floating proof cards still anchor. */
              <div
                className={fill ? undefined : (belowMedia ? "arch-box arch-box--below" : "arch-box")}
                style={{
                  position: "relative",
                  width: fill ? "100%" : undefined,
                  maxHeight: fill ? (belowMedia ? "min(46vh, 440px)" : "min(60vh, 540px)") : undefined,
                  aspectRatio: aspect,
                }}
              >
                {mediaSlot}
              </div>
            ) : (
            <div
              className={fill ? undefined : (belowMedia ? "arch-box arch-box--below" : "arch-box")}
              style={fill
                ? { position: "relative", width: "100%", aspectRatio: aspect, maxHeight: belowMedia ? "min(46vh, 440px)" : "min(60vh, 540px)", borderRadius: ARCH_RADIUS, overflow: "hidden", background: archBg, boxShadow: dark ? "0 24px 60px rgba(0,0,0,0.5)" : "0 24px 60px rgba(28,30,30,0.16)" }
                : { position: "relative", aspectRatio: aspect, borderRadius: ARCH_RADIUS, overflow: "hidden", background: archBg, boxShadow: dark ? "0 24px 60px rgba(0,0,0,0.5)" : "0 24px 60px rgba(28,30,30,0.16)" }}>
              {media.type === "video" ? (
                media.autoPlay ? (
                  <HeroAutoplayVideo radius={ARCH_RADIUS} src={media.src} poster={media.poster} alt={media.alt} objectFit={media.fit || "cover"} />
                ) : (
                  <VideoPlayer fill radius={ARCH_RADIUS} src={media.src} poster={media.poster} label={media.alt} objectFit={media.fit || "cover"} />
                )
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={media.src} alt={media.alt || "Carisma Aesthetics Malta"} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: media.fit || "cover", objectPosition: media.position || "center", display: "block" }} />
              )}
            </div>
            )}

            {/* doctor-led pill — mid-left (dropped below the top-right award card so they never overlap) */}
            <div className={`${glassClass} float-b proof-left`} style={{ position: "absolute", left: "clamp(-18px,-1.8vw,-4px)", top: "38%", borderRadius: 999, padding: "8px 14px", display: "flex", alignItems: "center", gap: 7, zIndex: 3, animationDelay: "-2.8s" }}>
              <span aria-hidden style={{ width: 16, height: 16, borderRadius: "50%", background: c.checkBg, display: "grid", placeItems: "center" }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke={c.check} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <span style={{ fontFamily: WIDE, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: c.proofStrong }}>Doctor-led</span>
            </div>

            {/* stat card — bottom-left */}
            <div className={`${glassClass} float-a proof-left`} style={{ position: "absolute", left: "clamp(-20px,-1.8vw,-2px)", bottom: "9%", borderRadius: 16, padding: "11px 16px", display: "flex", alignItems: "center", gap: 10, zIndex: 3 }}>
              <span style={{ fontFamily: SERIF, fontSize: 28, color: c.stat, lineHeight: 1 }}>{proof?.statValue || "30+"}</span>
              <span style={{ fontFamily: WIDE, fontSize: 9.5, letterSpacing: "0.08em", textTransform: "uppercase", color: c.statLabel, lineHeight: 1.3, maxWidth: 86 }}>{proof?.statLabel || "years in wellness"}</span>
            </div>

            {/* award / #1 voted — top-right */}
            <div className={`${glassClass} float-b proof-right`} style={{ position: "absolute", right: "clamp(-18px,-1.2vw,-2px)", top: "5%", borderRadius: 16, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, maxWidth: 210, zIndex: 3 }}>
              {proof?.awardSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={proof.awardSrc} alt="" aria-hidden style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0 }} />
              ) : (
                <Stars size={11} />
              )}
              <span style={{ fontFamily: WIDE, fontSize: 9.5, letterSpacing: "0.07em", textTransform: "uppercase", color: c.awardText, lineHeight: 1.35, whiteSpace: "pre-line", fontWeight: 600 }}>{proof?.awardText || "#1 Voted Clinic\nMalta Healthcare Awards"}</span>
            </div>
          </div>

          {/* optional card beneath the arch (e.g. treatment-info) — part of the hero */}
          {belowMedia && (
            <div style={{ width: "100%", maxWidth: 420, zIndex: 2 }}>{belowMedia}</div>
          )}
        </div>
      </div>

      <style>{`
        .page-hero-grid { grid-template-columns: 1fr; }
        @media (min-width: 900px) {
          .page-hero-grid { grid-template-columns: 60fr 40fr; }
          .page-hero-media { justify-self: end; }
        }
        .page-hero-grid > * { min-width: 0; }
        .arch-box { width: 100%; }
        @media (min-width: 900px) {
          .arch-box { width: auto; max-width: 100%; height: min(60vh, 540px); }
          .arch-box--below { height: min(46vh, 440px); }
        }
        @media (max-width: 899px) {
          .proof-left { left: 8px !important; }
          .proof-right { right: 8px !important; }
        }
      `}</style>
    </section>
  );
}
