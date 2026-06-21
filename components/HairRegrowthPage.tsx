"use client";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import VideoPlayer from "@/components/VideoPlayer";
import hairRegrowth from "@/lib/treatments/hair-regrowth";
import { useState, useEffect } from "react";

/*
  Dedicated landing page for /hair-regrowth.
  Live page: https://www.carismaaesthetics.com/hair-regrowth

  Design: Dark charcoal throughout — entire page uses DARK bg.
  Gold headings (#c9a96a), warm taupe body text (rgb(176,166,143)).
  Buttons: gold gradient.
  FAQ: accordion (client component).
*/

const A = "/assets/treatments";
const t = hairRegrowth;

// Gold shades
const GOLD = "#c9a96a";
const GOLD_MID = "#b89a52";
const DARK = "#14120e"; // page background — matches live dark charcoal
const TAUPE = "rgb(176,166,143)"; // live body text color
const INK = "#1a1712"; // dark text for buttons / hero
const CHARCOAL = "#1c1a17"; // hero bg fallback

function GoldBtn({
  children,
  href = "/consultation",
  style,
  fullWidth,
}: {
  children: React.ReactNode;
  href?: string;
  style?: React.CSSProperties;
  fullWidth?: boolean;
}) {
  return (
    <Link
      href={href}
      className="font-display inline-flex items-center justify-center hrg-btn"
      style={{
        background: `linear-gradient(180deg, #e2c97a 0%, ${GOLD} 50%, ${GOLD_MID} 100%)`,
        color: INK,
        fontSize: "11px",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        fontWeight: 600,
        padding: "14px 36px",
        borderRadius: "999px",
        width: fullWidth ? "100%" : undefined,
        textAlign: "center",
        cursor: "pointer",
        transition: "transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease",
        ...style,
      }}
    >
      {children}
    </Link>
  );
}

function GoldLine() {
  return (
    <div
      style={{
        width: "60px",
        height: "1px",
        background: GOLD,
        margin: "0 auto 14px",
      }}
    />
  );
}

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-display text-center"
      style={{
        fontSize: "12px",
        color: GOLD,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        marginBottom: "10px",
      }}
    >
      {children}
    </p>
  );
}

function SectionHeading({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <h2
      className="font-serif text-center"
      style={{
        fontSize: "clamp(20px,2.8vw,34px)",
        color: GOLD,
        letterSpacing: "0.08em",
        fontWeight: 400,
        lineHeight: 1.3,
        textTransform: "uppercase",
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

function GoldCheck() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={GOLD}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, marginTop: "2px" }}
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={GOLD}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, marginTop: "2px" }}
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9l6 6M15 9l-6 6" />
    </svg>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(201,169,106,0.25)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 text-left"
        style={{
          padding: "18px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <span
          className="font-display"
          style={{
            fontSize: "11px",
            color: GOLD,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            lineHeight: 1.5,
          }}
        >
          {q}
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke={GOLD}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <p
          style={{
            fontSize: "13px",
            color: TAUPE,
            lineHeight: 1.8,
            padding: "0 0 20px",
          }}
        >
          {a}
        </p>
      )}
    </div>
  );
}

// Parse package description into lead + guarantee + bullets
function parsePackage(name: string, desc: string) {
  const hasGuarantee = desc.includes("Backed by the Carisma");
  const incIdx = desc.indexOf("Includes:");
  if (incIdx === -1) {
    return {
      lead: desc.replace(/✅[^.]+\.\s*/g, "").trim(),
      hasGuarantee,
      bullets: [] as string[],
    };
  }
  const before = desc.slice(0, incIdx).replace(/✅[^.]+\.\s*/g, "").trim();
  // Extract a clean lead sentence (first sentence)
  const sentEnd = before.indexOf(". ");
  const lead = sentEnd > -1 ? before.slice(0, sentEnd + 1).trim() : before;

  const rest = desc.slice(incIdx + "Includes:".length).trim();
  const bullets = rest
    .split(/\.\s+(?=[A-Z0-9])/)
    .map((s) =>
      s
        .trim()
        .replace(/[.)]+$/, "")
        .trim()
    )
    .filter((s) => s.length > 2);

  return { lead, hasGuarantee, bullets };
}

const TESTIMONIALS = [
  {
    image: `${A}/hair-regrowth-ba1.png`,
    name: "THOMAS B.",
    text: "It sounds dramatic, but this treatment gave me my confidence and happiness back. I'd been losing hair for years and tried everything. After 90 days on the full protocol I genuinely couldn't believe the difference in the mirror.",
  },
  {
    image: `${A}/hair-regrowth-ba2.png`,
    name: "NADINE A.",
    text: "I used to check my pillow every morning, terrified of how much hair I'd lost overnight. Now, after three months, the shedding has almost completely stopped and I can see real regrowth at the hairline.",
  },
  {
    image: `${A}/hair-regrowth-ba3.png`,
    name: "SARA C.",
    text: "After the second month, I noticed tiny new hairs around my temples — that moment made me emotional. The density scan confirmed a 24% improvement. I never thought something non-surgical could actually work this well.",
  },
  {
    image: `${A}/hair-regrowth-ba4.png`,
    name: "RACHELLE A.",
    text: "I've tried every shampoo and supplement out there, but nothing worked. This was the first time a clinic actually measured my results with numbers. Seeing the before and after scans side by side was all the proof I needed.",
  },
];

const PREVIEW_LEN = 120;

function ReviewCard({ image, name, text }: (typeof TESTIMONIALS)[0]) {
  const [expanded, setExpanded] = useState(false);
  const truncated = text.length > PREVIEW_LEN && !expanded;
  return (
    <div
      className="review-card"
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
      }}
    >
      {/* Dark-teal focus ring: the page-level light ring (#e8e3da) is invisible
          on this white review card; override to #4f7373 (5.21:1 vs white). */}
      <style>{`.hairreg-readmore-btn:focus-visible{outline:2px solid #4f7373!important;outline-offset:2px;border-radius:2px;}`}</style>
      {/* Combined before/after image */}
      <div style={{ height: "160px", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="before and after" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
      </div>
      {/* Card body */}
      <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <p className="font-display text-center" style={{ fontSize: "13px", color: "#1a1712", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "8px" }}>
          {name}
        </p>
        <div className="flex justify-center gap-1" style={{ marginBottom: "12px" }}>
          {[0,1,2,3,4].map((i) => (
            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#b8690a" aria-hidden>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <p className="text-center" style={{ fontSize: "13px", color: "#4a4540", lineHeight: 1.65, flex: 1 }}>
          {truncated ? text.slice(0, PREVIEW_LEN) + "…" : text}
        </p>
        {text.length > PREVIEW_LEN && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-center hairreg-readmore-btn"
            style={{ marginTop: "10px", background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: "#6b5526", textDecoration: "underline", textUnderlineOffset: "2px" }}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}

function TestimonialsCarousel() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(4);

  useEffect(() => {
    const update = () => setVisible(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 4);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const max = TESTIMONIALS.length - visible;
  const go = (d: number) => setIdx((i) => Math.max(0, Math.min(i + d, max)));

  return (
    <section style={{ background: "transparent", padding: "clamp(60px,7vw,100px) 0" }}>
      <div className="container">
        <div className="relative" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${visible}, minmax(0, 1fr))`,
              gap: "20px",
            }}
          >
            {TESTIMONIALS.slice(idx, idx + visible).map((r) => (
              <ReviewCard key={r.name} {...r} />
            ))}
          </div>

          {/* Prev arrow */}
          {idx > 0 && (
            <button
              type="button"
              aria-label="Previous"
              onClick={() => go(-1)}
              className="hrg-arrow"
              style={{
                position: "absolute",
                top: "50%",
                left: "-22px",
                transform: "translateY(-50%)",
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 2,
                transition: "transform 0.25s ease, background 0.25s ease",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6" /></svg>
            </button>
          )}

          {/* Next arrow */}
          {idx < max && (
            <button
              type="button"
              aria-label="Next"
              onClick={() => go(1)}
              className="hrg-arrow"
              style={{
                position: "absolute",
                top: "50%",
                right: "-22px",
                transform: "translateY(-50%)",
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 2,
                transition: "transform 0.25s ease, background 0.25s ease",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default function HairRegrowthPage() {
  // Apply texture background to entire page including header/footer
  useEffect(() => {
    document.body.classList.add("dark-texture-page");
    return () => { document.body.classList.remove("dark-texture-page"); };
  }, []);

  const pkg = t.pricingGrid!;
  const collage = t.trusted!;
  const dr = t.experience!.steps[0];

  // Split Dr Giovanni bio and quote
  const quoteMatch = dr.desc.match(/"([^"]+)"\s*[–—-]+\s*([^.]+)\.?\s*$/);
  const drBio = quoteMatch
    ? dr.desc.slice(0, dr.desc.indexOf("“")).trim()
    : dr.desc;
  const drQuote = quoteMatch ? quoteMatch[1] : "";
  const drQuoteBy = quoteMatch ? quoteMatch[2].trim() : "";

  // Collage: separate "why" heading, bullets, note
  const whyTitle = collage.points[0]?.title ?? "";
  const whyBullets = collage.points
    .slice(1)
    .filter((p) => p.title && p.title.length > 0);
  const whyNote =
    collage.points.find((p) => !p.title && p.desc)?.desc ?? "";

  // Guarantee paragraphs
  const gParas = t.guarantee!.paragraphs;

  // Parse eligibility intro: first 3 "?" sentences become bullets, rest becomes paragraphs
  const introRaw = t.suitability?.intro ?? "";
  const eligBullets = (introRaw.match(/[^?]+\?/g) ?? []).slice(0, 3).map(s => s.trim());
  const afterQ = introRaw.slice(eligBullets.join("").length + 1).trim();
  const mostIdx = afterQ.indexOf("Most early-stage");
  const eligParas = mostIdx > -1 ? afterQ.slice(0, mostIdx).trim() : afterQ;
  const eligClosing = mostIdx > -1 ? afterQ.slice(mostIdx).trim() : "";

  return (
    <div style={{ background: "transparent", color: TAUPE }}>
      {/* rounded interaction system — pill buttons scale on hover, dark-theme cards
          lift + brighten border, focus rings use a visible gold halo on dark bg */}
      <style>{`
        .hrg-btn:hover,
        .hrg-btn:focus-visible {
          transform: scale(1.04);
          box-shadow: 0 0 26px rgba(201,169,106,0.5), 0 10px 26px rgba(0,0,0,0.45);
          filter: brightness(1.04);
        }
        .hrg-arrow:hover,
        .hrg-arrow:focus-visible {
          transform: translateY(-50%) scale(1.1);
          background: rgba(255,255,255,0.22);
        }
        .hrg-card:hover {
          transform: translateY(-4px);
          border-color: rgba(201,169,106,0.85);
          box-shadow: 0 18px 40px rgba(0,0,0,0.4);
        }
        .hrg-faq-search-wrap:focus-within {
          border-color: ${GOLD};
          box-shadow: 0 0 0 4px rgba(201,169,106,0.3);
        }
        .hrg-faq-search:focus,
        .hrg-faq-search:focus-visible { outline: none; }
        .hrg-faq-search::placeholder { opacity: 1; }
        @media (prefers-reduced-motion: reduce) {
          .hrg-btn:hover, .hrg-btn:focus-visible,
          .hrg-card:hover { transform: none; }
          .hrg-arrow:hover, .hrg-arrow:focus-visible { transform: translateY(-50%); }
        }
      `}</style>
      {/* ───────────────────────────────────────────────────────
          HERO — dark charcoal with background image + portrait video
      ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "transparent",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "var(--nav-clear) 0 clamp(20px,3vh,40px)",
        }}
      >
        <div className="container">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_360px]">
            <Reveal>
              {/* Kicker */}
              <p
                className="font-display"
                style={{
                  fontSize: "11px",
                  color: GOLD,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  marginBottom: "18px",
                }}
              >
                {t.hero.subtitle}
              </p>
              {/* H1 */}
              <h1
                className="font-serif"
                style={{
                  fontSize: "clamp(26px,3.4vw,42px)",
                  color: "#ffffff",
                  letterSpacing: "0.02em",
                  lineHeight: 1.1,
                  textTransform: "uppercase",
                  fontWeight: 400,
                }}
              >
                {t.hero.title}
              </h1>
              {/* Body */}
              <p
                style={{
                  fontSize: "14px",
                  color: "#d4cfc6",
                  lineHeight: 1.6,
                  marginTop: "14px",
                  maxWidth: "560px",
                }}
              >
                {t.hero.body}
              </p>
              {/* Benefit list */}
              <ul className="space-y-2" style={{ marginTop: "16px" }}>
                {(t.hero.benefits ?? []).map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <GoldCheck />
                    <span
                      style={{
                        fontSize: "13.5px",
                        color: "#e0dbd2",
                        lineHeight: 1.6,
                      }}
                    >
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
              {/* CTA */}
              <div style={{ marginTop: "18px" }}>
                <GoldBtn>{t.hero.cta}</GoldBtn>
              </div>
              {/* Stars + note */}
              <div className="flex items-center gap-3" style={{ marginTop: "12px" }}>
                <span className="flex" style={{ color: GOLD }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#c2bbb0",
                    letterSpacing: "0.06em",
                  }}
                >
                  {t.hero.note}
                </span>
              </div>
              {/* Location */}
              {t.hero.location && (
                <p
                  style={{
                    fontSize: "11px",
                    color: "#bdb4a6",
                    letterSpacing: "0.08em",
                    marginTop: "8px",
                  }}
                >
                  📍 {t.hero.location}
                </p>
              )}
            </Reveal>

            {/* Portrait video reel */}
            <Reveal delay={120} className="mx-auto" style={{ width: "100%", maxWidth: "320px" }}>
              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  maxHeight: "clamp(320px,48vh,470px)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.55)",
                  border: `1px solid rgba(201,169,106,0.3)`,
                }}
              >
                <VideoPlayer className="w-full" ratio="9 / 16" radius={16} src={`${A}/vid-hair-regrowth.mp4`} label="Hair regrowth treatment at Carisma Aesthetics" />
              </div>
              <p
                className="text-center"
                style={{
                  fontSize: "11px",
                  color: "#b2aba1",
                  lineHeight: 1.6,
                  marginTop: "14px",
                  letterSpacing: "0.04em",
                }}
              >
                Developed by Malta&rsquo;s leading hair-loss clinic with 20+
                years experience
              </p>
            </Reveal>
          </div>
        </div>
      </section>


      {/* ───────────────────────────────────────────────────────
          BEFORE & AFTERS
      ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "transparent",
          padding: "clamp(60px,7vw,100px) 0",
        }}
      >
        <div className="container" style={{ maxWidth: "860px" }}>
          <GoldLine />
          <SectionKicker>{t.education!.subtitle}</SectionKicker>
          <SectionHeading>{t.education!.title}</SectionHeading>
          {t.education!.paragraphs.map((p) => (
            <p
              key={p}
              className="text-center mx-auto"
              style={{
                fontSize: "14px",
                color: TAUPE,
                lineHeight: 1.9,
                marginTop: "28px",
                maxWidth: "740px",
              }}
            >
              {p}
            </p>
          ))}

          {/* B&A horizontal scroll */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              overflowX: "auto",
              paddingBottom: "12px",
              marginTop: "44px",
              scrollSnapType: "x mandatory",
            }}
          >
            {[
              `${A}/hair-regrowth-ba1.png`,
              `${A}/hair-regrowth-ba2.png`,
              `${A}/hair-regrowth-ba3.png`,
              `${A}/hair-regrowth-ba4.png`,
              `${A}/hair-regrowth-ba5.png`,
            ].map((src, i) => (
              <div
                key={i}
                style={{
                  flex: "0 0 auto",
                  width: "clamp(280px, 45vw, 520px)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  scrollSnapAlign: "start",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Hair regrowth result ${i + 1}`} style={{ display: "block", width: "100%", height: "auto" }} />
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: "36px" }}>
            <GoldBtn>CHECK IF YOU QUALIFY</GoldBtn>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────
          TESTIMONIALS CAROUSEL
      ─────────────────────────────────────────────────────── */}
      <TestimonialsCarousel />

      {/* ───────────────────────────────────────────────────────
          ELIGIBILITY — 2-column cards on white
      ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "transparent",
          padding: "clamp(60px,7vw,100px) 0",
        }}
      >
        <div className="container">
          <GoldLine />
          <SectionKicker>eligibility criteria</SectionKicker>
          <SectionHeading>{t.suitability!.title}</SectionHeading>
          {/* Bullet questions */}
          <ul className="mx-auto" style={{ maxWidth: "820px", marginTop: "28px", listStyle: "none", padding: 0 }}>
            {eligBullets.map(q => (
              <li key={q} className="flex items-start gap-3" style={{ marginBottom: "14px" }}>
                <span style={{ color: GOLD, flexShrink: 0, marginTop: "3px" }}>›</span>
                <span style={{ fontSize: "14px", color: TAUPE, lineHeight: 1.8 }}>{q}</span>
              </li>
            ))}
          </ul>
          {/* Intro paragraphs */}
          {eligParas && (
            <p className="mx-auto" style={{ fontSize: "14px", color: TAUPE, lineHeight: 1.9, maxWidth: "820px", marginTop: "20px" }}>
              {eligParas}
            </p>
          )}

          <div
            className="grid gap-6 md:grid-cols-2 mx-auto"
            style={{ marginTop: "48px", maxWidth: "900px" }}
          >
            {/* Suitable for */}
            <div
              className="hrg-card"
              style={{
                border: `1.5px solid rgba(201,169,106,0.4)`,
                borderRadius: "16px",
                padding: "clamp(24px,3vw,36px)",
                transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
              }}
            >
              <h3
                className="font-display"
                style={{
                  fontSize: "10px",
                  color: GOLD,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "22px",
                }}
              >
                SUITABLE FOR:
              </h3>
              <ul className="space-y-5">
                {t.suitability!.suitableFor!.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <GoldCheck />
                    <span
                      style={{
                        fontSize: "12px",
                        color: TAUPE,
                        lineHeight: 1.6,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not suitable for */}
            <div
              className="hrg-card"
              style={{
                border: `1.5px solid rgba(201,169,106,0.25)`,
                borderRadius: "16px",
                padding: "clamp(24px,3vw,36px)",
                transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
              }}
            >
              <h3
                className="font-display"
                style={{
                  fontSize: "10px",
                  color: GOLD,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "22px",
                }}
              >
                NOT SUITABLE FOR:
              </h3>
              <ul className="space-y-5">
                {t.suitability!.notIdeal!.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <XIcon />
                    <span
                      style={{
                        fontSize: "12px",
                        color: TAUPE,
                        lineHeight: 1.6,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {eligClosing && (
            <p
              className="text-center mx-auto"
              style={{
                fontSize: "13.5px",
                color: TAUPE,
                lineHeight: 1.9,
                maxWidth: "820px",
                marginTop: "32px",
                fontStyle: "italic",
              }}
            >
              {eligClosing}
            </p>
          )}
          <div className="text-center" style={{ marginTop: "40px" }}>
            <GoldBtn>CHECK YOUR ELIGIBILITY</GoldBtn>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────
          THE SCIENCE BEHIND THE RESULTS
      ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "transparent",
          padding: "clamp(60px,7vw,100px) 0",
        }}
      >
        <div className="container" style={{ maxWidth: "960px" }}>
          <GoldLine />
          <SectionKicker>The Science Behind the Results</SectionKicker>
          <SectionHeading>{t.precision!.title}</SectionHeading>
          <p
            className="text-center mx-auto"
            style={{
              fontSize: "14px",
              color: TAUPE,
              lineHeight: 1.9,
              marginTop: "28px",
              maxWidth: "820px",
            }}
          >
            {t.precision!.intro}
          </p>

          {t.precision!.areas && (
            <div
              className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
              style={{ marginTop: "52px" }}
            >
              {t.precision!.areas.map((area) => (
                <div
                  key={area.name}
                  className="hrg-card"
                  style={{
                    border: `1px solid rgba(201,169,106,0.28)`,
                    borderRadius: "16px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                  }}
                >
                  <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={area.icon}
                      alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "clamp(18px,2vw,24px)", flex: 1, display: "flex", flexDirection: "column" }}>
                    <p
                      className="font-display"
                      style={{
                        fontSize: "10px",
                        color: GOLD,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        marginBottom: "7px",
                      }}
                    >
                      {area.zone}
                    </p>
                    <h3
                      className="font-serif"
                      style={{
                        fontSize: "14px",
                        color: GOLD,
                        letterSpacing: "0.04em",
                        lineHeight: 1.35,
                        marginBottom: "10px",
                        fontWeight: 400,
                      }}
                    >
                      {area.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "12px",
                        color: TAUPE,
                        lineHeight: 1.75,
                      }}
                    >
                      {area.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────
          EXPERT CARE — Dr Giovanni
      ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "transparent",
          padding: "clamp(60px,7vw,100px) 0",
        }}
      >
        <div className="container">
          <GoldLine />
          <SectionKicker>expert care</SectionKicker>
          <SectionHeading>{t.experience!.title}</SectionHeading>

          <div
            className="grid items-start gap-10 lg:grid-cols-[340px_1fr] mx-auto"
            style={{ marginTop: "50px", maxWidth: "960px" }}
          >
            <Reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dr.image}
                alt={dr.title}
                style={{
                  display: "block",
                  width: "100%",
                  borderRadius: "8px",
                }}
              />
            </Reveal>
            <Reveal delay={100}>
              <h3
                className="font-display"
                style={{
                  fontSize: "12px",
                  color: GOLD,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: "18px",
                }}
              >
                {dr.title}
              </h3>
              <p
                style={{
                  fontSize: "13.5px",
                  color: TAUPE,
                  lineHeight: 1.9,
                }}
              >
                {drBio}
              </p>
              {drQuote && (
                <blockquote
                  style={{
                    borderLeft: `2px solid ${GOLD}`,
                    paddingLeft: "18px",
                    marginTop: "24px",
                  }}
                >
                  <p
                    className="font-serif"
                    style={{
                      fontSize: "16px",
                      color: "#b8af9c",
                      fontStyle: "italic",
                      lineHeight: 1.65,
                    }}
                  >
                    &ldquo;{drQuote}&rdquo;
                  </p>
                  {drQuoteBy && (
                    <cite
                      style={{
                        display: "block",
                        fontSize: "11px",
                        color: GOLD,
                        marginTop: "10px",
                        fontStyle: "normal",
                        letterSpacing: "0.1em",
                      }}
                    >
                      — {drQuoteBy}
                    </cite>
                  )}
                </blockquote>
              )}
              <div style={{ marginTop: "28px" }}>
                <GoldBtn>MEET DR GIOVANNI</GoldBtn>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────
          OUR GUARANTEE
      ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "transparent",
          padding: "clamp(60px,7vw,100px) 0",
        }}
      >
        <div className="container">
          <GoldLine />
          <SectionKicker>Our guarantee</SectionKicker>
          <SectionHeading>{t.guarantee!.title}</SectionHeading>

          {/* 2-column: gold badge LEFT, guarantee text RIGHT */}
          <div
            className="grid items-start gap-12 lg:grid-cols-[300px_1fr] mx-auto"
            style={{ maxWidth: "960px", marginTop: "48px" }}
          >
            {/* Gold badge card */}
            <div
              className="text-center"
              style={{
                background: `linear-gradient(145deg, #e2c97a 0%, ${GOLD} 50%, ${GOLD_MID} 100%)`,
                borderRadius: "16px",
                padding: "clamp(24px,3vw,36px) clamp(20px,3vw,32px)",
              }}
            >
              <p
                className="font-display"
                style={{
                  fontSize: "12px",
                  color: INK,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                THE ONLY HAIR LOSS<br />TREATMENT CLINIC IN<br />MALTA TO OFFER
              </p>
              <p
                className="font-display"
                style={{
                  fontSize: "17px",
                  color: INK,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                A 100% PERFORMANCE GUARANTEE*
              </p>
            </div>

            {/* Guarantee body text */}
            <div>
              {gParas.slice(0, 3).map((p, i) => (
                <p
                  key={p}
                  style={{
                    fontSize: i === 0 ? "15px" : "13.5px",
                    color: i === 0 ? GOLD : TAUPE,
                    lineHeight: 1.9,
                    marginTop: i === 0 ? 0 : "20px",
                    fontFamily: i === 0 ? "var(--font-serif, serif)" : undefined,
                    letterSpacing: i === 0 ? "0.02em" : undefined,
                  }}
                >
                  {p}
                </p>
              ))}
              <p
                style={{
                  fontSize: "12px",
                  color: GOLD,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-display)",
                  marginTop: "28px",
                  marginBottom: "12px",
                }}
              >
                {gParas[3]}
              </p>
              <ul className="space-y-3">
                {gParas.slice(4, 8).map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <GoldCheck />
                    <span style={{ fontSize: "13px", color: TAUPE, lineHeight: 1.7 }}>
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
              {gParas[8] && (
                <p
                  style={{
                    fontSize: "13px",
                    color: TAUPE,
                    lineHeight: 1.8,
                    marginTop: "20px",
                    fontStyle: "italic",
                  }}
                >
                  {gParas[8]}
                </p>
              )}
            </div>
          </div>

          {/* CTA inside a bordered box */}
          <div
            className="mx-auto"
            style={{
              maxWidth: "820px",
              marginTop: "44px",
              border: `1px solid rgba(201,169,106,0.45)`,
              borderRadius: "16px",
              padding: "clamp(20px,3vw,30px)",
              textAlign: "center",
            }}
          >
            <p
              className="font-display mx-auto"
              style={{
                fontSize: "11px",
                color: GOLD,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                maxWidth: "640px",
                lineHeight: 1.8,
                marginBottom: "20px",
              }}
            >
              Our guaranteed hair loss treatment programs are limited to 12 patients per month at our Malta clinic to ensure individual follow-up and measurable outcomes. Please inquire for the next available start date.
            </p>
            <GoldBtn>{t.guarantee!.cta}</GoldBtn>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────
          OUR PACKAGES — 3 column list
      ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "transparent",
          padding: "clamp(60px,7vw,100px) 0",
        }}
      >
        <div className="container">
          <GoldLine />
          <SectionKicker>{pkg.intro}</SectionKicker>
          <SectionHeading>{pkg.title}</SectionHeading>

          <div
            className="grid gap-6 lg:grid-cols-3"
            style={{ marginTop: "52px" }}
          >
            {pkg.items.map((item, i) => {
              const { lead, hasGuarantee, bullets } = parsePackage(
                item.name,
                item.desc
              );
              return (
                <Reveal
                  key={item.name}
                  delay={i * 80}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div
                    className="hrg-card"
                    style={{
                      border: `1px solid rgba(201,169,106,0.35)`,
                      borderRadius: "16px",
                      padding: "clamp(24px,2.5vw,32px)",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                    }}
                  >
                    <h3
                      className="font-display"
                      style={{
                        fontSize: "13px",
                        color: GOLD,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.name}
                    </h3>
                    {lead && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: TAUPE,
                          lineHeight: 1.7,
                          marginTop: "10px",
                        }}
                      >
                        {lead}
                      </p>
                    )}
                    <p
                      className="font-display"
                      style={{
                        fontSize: "13px",
                        color: GOLD,
                        letterSpacing: "0.06em",
                        marginTop: "12px",
                      }}
                    >
                      {item.price}
                    </p>
                    {hasGuarantee && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#66bd78",
                          lineHeight: 1.5,
                          marginTop: "10px",
                        }}
                      >
                        ✅ Backed by the Carisma Measurable Results Guarantee.
                      </p>
                    )}
                    {bullets.length > 0 && (
                      <ul className="space-y-2" style={{ marginTop: "18px" }}>
                        {bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2">
                            <GoldCheck />
                            <span
                              style={{
                                fontSize: "11.5px",
                                color: TAUPE,
                                lineHeight: 1.6,
                              }}
                            >
                              {b}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div style={{ flex: 1 }} />
                    <div style={{ marginTop: "24px" }}>
                      <GoldBtn fullWidth>GET STARTED</GoldBtn>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────
          COLLAGE — scattered photo grid
      ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "transparent",
          padding: "clamp(60px,7vw,100px) 0",
        }}
      >
        <div className="container">
          {/* Title block */}
          <div className="mx-auto" style={{ maxWidth: "820px" }}>
            <GoldLine />
            <SectionKicker>we don&rsquo;t just treat hair loss</SectionKicker>
            <SectionHeading>{collage.title}</SectionHeading>
            {collage.subtitle && (
              <p
                className="font-serif text-center"
                style={{
                  fontSize: "15px",
                  color: GOLD,
                  letterSpacing: "0.04em",
                  marginTop: "12px",
                  fontStyle: "italic",
                }}
              >
                {collage.subtitle}
              </p>
            )}
          </div>

          {/* Scattered/staggered photo collage */}
          <div
            className="relative mx-auto"
            style={{ marginTop: "48px", maxWidth: "900px" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Row 1: 2 images side by side */}
              <div className="overflow-hidden rounded-lg" style={{ aspectRatio: "4/3" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={collage.images[0]}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="overflow-hidden rounded-lg" style={{ aspectRatio: "4/3", marginTop: "40px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={collage.images[1]}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="overflow-hidden rounded-lg" style={{ aspectRatio: "4/3" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={collage.images[2]}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="overflow-hidden rounded-lg" style={{ aspectRatio: "4/3", marginTop: "-20px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/treatments/hair-regrowth-density-scan.png"
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="overflow-hidden rounded-lg" style={{ aspectRatio: "4/3", marginTop: "20px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={collage.images[3]}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="overflow-hidden rounded-lg" style={{ aspectRatio: "4/3", marginTop: "-10px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/treatments/hair-regrowth-scalp-imaging.png"
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>

          {/* Why Patients Choose card (taupe/grey rounded box) */}
          <div
            className="mx-auto"
            style={{
              marginTop: "52px",
              maxWidth: "820px",
              background: "rgba(176,166,143,0.12)",
              border: `1px solid rgba(201,169,106,0.2)`,
              borderRadius: "16px",
              padding: "clamp(28px,4vw,48px)",
            }}
          >
            <h3
              className="font-serif"
              style={{
                fontSize: "clamp(16px,2vw,22px)",
                color: GOLD,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                lineHeight: 1.35,
                marginBottom: "26px",
              }}
            >
              {whyTitle}
            </h3>
            <ul className="space-y-4">
              {whyBullets.map((p) => (
                <li key={p.title} className="flex items-start gap-3">
                  <GoldCheck />
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#c5beb3",
                      lineHeight: 1.65,
                    }}
                  >
                    {p.title}
                  </span>
                </li>
              ))}
            </ul>
            {whyNote && (
              <p
                style={{
                  fontSize: "12px",
                  color: "#c5beb3",
                  lineHeight: 1.8,
                  marginTop: "24px",
                  fontStyle: "italic",
                }}
              >
                {whyNote}
              </p>
            )}
            <div style={{ marginTop: "28px" }}>
              <GoldBtn>BOOK YOUR CONSULTATION</GoldBtn>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────
          PATIENT VIDEO REELS
      ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "transparent",
          padding: "clamp(60px,7vw,100px) 0",
        }}
      >
        <div className="container">
          <GoldLine />
          <SectionKicker>real patients. real results.</SectionKicker>
          <SectionHeading>hear from our patients</SectionHeading>

          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            style={{ marginTop: "48px" }}
          >
            {[2, 3, 4, 5].map((n) => (
              <Reveal key={n} delay={(n - 2) * 60}>
                <div
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: `1px solid rgba(201,169,106,0.2)`,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                  }}
                >
                  <VideoPlayer className="w-full" ratio="9 / 16" radius={12} src={`${A}/vid-hair-regrowth-${n}.mp4`} label={`Hair regrowth patient video ${n}`} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────
          FAQ
      ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "transparent",
          padding: "clamp(60px,7vw,100px) 0",
        }}
      >
        <div className="container">
          <GoldLine />
          <SectionKicker>{t.faqKicker}</SectionKicker>
          <SectionHeading>{t.faqTitle}</SectionHeading>

          {/* Search bar (cosmetic) */}
          <div
            className="mx-auto"
            style={{ maxWidth: "760px", marginTop: "32px", marginBottom: "8px" }}
          >
            <div
              className="hrg-faq-search-wrap"
              style={{
                display: "flex",
                alignItems: "center",
                border: `1px solid rgba(201,169,106,0.7)`,
                borderRadius: "12px",
                padding: "10px 16px",
                transition: "border-color 0.25s ease, box-shadow 0.25s ease",
              }}
            >
              <input
                type="text"
                placeholder="Looking for something?"
                readOnly
                aria-label="Search FAQs"
                className="hrg-faq-search"
                style={{
                  flex: 1,
                  border: "none",
                  fontSize: "13px",
                  color: TAUPE,
                  background: "transparent",
                  cursor: "default",
                }}
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" aria-hidden>
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
          </div>

          <div className="mx-auto" style={{ maxWidth: "760px" }}>
            {t.faq!.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────
          CLINICAL RESEARCH — "Evidence Based Approach"
          (Live: Wix blog widget — we render just the heading/kicker)
      ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "transparent",
          padding: "clamp(60px,7vw,100px) 0",
        }}
      >
        <div className="container" style={{ maxWidth: "860px" }}>
          <GoldLine />
          <SectionKicker>CLINICAL RESEARCH</SectionKicker>
          <SectionHeading>evidence based approach</SectionHeading>
          <p
            className="text-center mx-auto"
            style={{
              fontSize: "14px",
              color: TAUPE,
              lineHeight: 1.9,
              marginTop: "28px",
              maxWidth: "680px",
            }}
          >
            Our treatments are grounded in peer-reviewed clinical research on
            PRP, exosome therapy, and evidence-based prescription protocols for
            hair loss.
          </p>
        </div>
      </section>
      {/*
        "Real People, Real Reviews" and the Doctors section are rendered
        by the global Footer (components/Footer.tsx) — no need to repeat here.
      */}
    </div>
  );
}
