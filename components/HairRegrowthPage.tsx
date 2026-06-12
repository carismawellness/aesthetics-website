import Link from "next/link";
import Reveal from "@/components/Reveal";
import hairRegrowth from "@/lib/treatments/hair-regrowth";

/*
  Dedicated DARK landing page for /hair-regrowth — the live page is a bespoke
  chalkboard/charcoal + gold design unlike the shared cream/teal TreatmentPage.
  All copy is read verbatim from lib/treatments/hair-regrowth.ts so the data
  module stays the single source of truth. The global Header/Footer (light)
  wrap this via the layout, matching live (footer doctors/award are light).
*/

const A = "/assets/treatments";
const t = hairRegrowth;

// rich warm gold used across this page (distinct from the site's cool taupe --gold)
const GOLD = "#c9a96a";
const GOLD_SOFT = "#d8be86";
const INK = "#181513";
const INK_2 = "#211d19";
const PAPER = "#efe9df";

function GoldBtn({ children, href = "/consultation", style }: { children: React.ReactNode; href?: string; style?: React.CSSProperties }) {
  return (
    <Link
      href={href}
      className="font-display inline-flex items-center justify-center"
      style={{
        background: "linear-gradient(180deg,#e7cf96 0%, #c9a96a 52%, #b8965a 100%)",
        color: INK,
        fontSize: "12px",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        fontWeight: 600,
        padding: "15px 34px",
        borderRadius: "2px",
        boxShadow: "0 8px 22px rgba(0,0,0,0.35)",
        ...style,
      }}
    >
      {children}
    </Link>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center" style={{ marginBottom: "14px" }}>
      <span style={{ display: "block", width: "70px", height: "1px", background: GOLD, opacity: 0.7, marginBottom: "16px" }} />
      <p className="font-display text-center" style={{ fontSize: "13px", color: GOLD, letterSpacing: "0.2em", textTransform: "uppercase" }}>{children}</p>
    </div>
  );
}

function Heading({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h2 className="font-serif text-center" style={{ fontSize: "clamp(24px,3.2vw,38px)", color: GOLD_SOFT, letterSpacing: "0.1em", fontWeight: 400, lineHeight: 1.3, textTransform: "uppercase", ...style }}>
      {children}
    </h2>
  );
}

function GoldCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "3px" }} aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

// Split a verbatim package description into a lead line + inclusion bullets.
function parsePackage(desc: string) {
  const idx = desc.indexOf("Includes:");
  if (idx === -1) return { intro: desc, includesLabel: "", bullets: [] as string[] };
  const before = desc.slice(0, idx).trim();
  // strip the green guarantee line (rendered separately) from the lead
  const beforeClean = before.replace(/✅[^.]*\.\s*/g, "").trim();
  // the plan label is the trailing few words before "Includes:" (e.g. "3-month plan")
  const labelMatch = beforeClean.match(/([A-Za-z0-9-]+(?:\s+[A-Za-z0-9-]+){0,2})$/);
  const includesLabel = (labelMatch ? labelMatch[1].trim() : "") + " Includes:";
  const intro = labelMatch ? beforeClean.slice(0, beforeClean.length - labelMatch[1].length).trim() : beforeClean;
  const rest = desc.slice(idx + "Includes:".length).trim();
  // split into readable bullets on ". " before a capital/digit (keeps "Day 20:" intact)
  const bullets = rest
    .split(/[.)]\s+(?=[A-Z0-9])/)
    .map((s) => s.trim().replace(/[.)]+$/, "").trim())
    .filter((s) => s.length > 1);
  return { intro, includesLabel, bullets };
}

export default function HairRegrowthPage() {
  const pkg = t.pricingGrid!;
  const collage = t.trusted!;
  const whyTitle = collage.points[0]?.title ?? "";
  const whyBullets = collage.points.slice(1).filter((p) => p.title);
  const whyNote = collage.points.find((p) => !p.title && p.desc)?.desc ?? "";
  const dr = t.experience!.steps[0];
  // separate Dr Giovanni's pull-quote (the “…” sentence) from his bio
  const quoteMatch = dr.desc.match(/“([^”]+)”\s*—\s*([^.]+)\.?\s*$/);
  const drBio = quoteMatch ? dr.desc.slice(0, dr.desc.indexOf("“")).trim() : dr.desc;
  const drQuote = quoteMatch ? quoteMatch[1] : "";
  const drQuoteBy = quoteMatch ? quoteMatch[2] : "";

  return (
    <div style={{ background: INK, color: PAPER }}>
      {/* ---- HERO ---- */}
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(15,13,11,0.78), rgba(15,13,11,0.86)), url('${t.hero.bgImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "clamp(48px,6vw,90px) 0",
        }}
      >
        <div className="container">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              {t.hero.subtitle && (
                <p className="font-display" style={{ fontSize: "13px", color: GOLD, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>{t.hero.subtitle}</p>
              )}
              <h1 className="font-serif" style={{ fontSize: "clamp(30px,4vw,52px)", color: "#fff", letterSpacing: "0.02em", lineHeight: 1.15, textTransform: "uppercase" }}>{t.hero.title}</h1>
              <p style={{ fontSize: "15px", color: "#d8d2c9", lineHeight: 1.8, marginTop: "22px", maxWidth: "560px" }}>{t.hero.body}</p>
              <ul className="space-y-3" style={{ marginTop: "26px" }}>
                {(t.hero.benefits ?? []).map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <GoldCheck />
                    <span style={{ fontSize: "14px", color: "#e7e2d8", lineHeight: 1.55 }}>{b}</span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "32px" }}>
                <GoldBtn>{t.hero.cta}</GoldBtn>
              </div>
              <div className="flex items-center gap-3" style={{ marginTop: "20px" }}>
                <span className="flex" style={{ color: GOLD }}>{[0, 1, 2, 3, 4].map((i) => (<svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>))}</span>
                <span style={{ fontSize: "12px", color: "#cfc8bd", letterSpacing: "0.06em" }}>{t.hero.note}</span>
              </div>
            </Reveal>

            <Reveal delay={120} className="mx-auto" style={{ width: "100%", maxWidth: "330px" }}>
              <div style={{ borderRadius: "18px", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.5)", border: `1px solid rgba(201,169,106,0.35)` }}>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video src={`${A}/vid-hair-regrowth.mp4`} autoPlay muted loop playsInline style={{ display: "block", width: "100%", aspectRatio: "9 / 16", objectFit: "cover" }} />
              </div>
              <p className="text-center" style={{ fontSize: "12px", color: "#bdb6ab", lineHeight: 1.6, marginTop: "16px" }}>Developed by Malta&rsquo;s leading hair-loss clinic with 20+ years experience</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- BEFORE & AFTERS ---- */}
      <section style={{ background: INK_2, padding: "clamp(56px,6vw,90px) 0" }}>
        <div className="container">
          <Kicker>{t.education!.subtitle}</Kicker>
          <Heading>{t.education!.title}</Heading>
          {t.education!.paragraphs.map((p) => (
            <p key={p} className="text-center mx-auto" style={{ fontSize: "15px", color: "#d2ccc2", lineHeight: 1.85, marginTop: "26px", maxWidth: "820px" }}>{p}</p>
          ))}
          <div className="text-center" style={{ marginTop: "36px" }}>
            <GoldBtn>CHECK IF YOU QUALIFY</GoldBtn>
          </div>
        </div>
      </section>

      {/* ---- ELIGIBILITY ---- */}
      <section style={{ background: INK, padding: "clamp(56px,6vw,90px) 0" }}>
        <div className="container">
          <Kicker>eligibility criteria</Kicker>
          <Heading>{t.suitability!.title}</Heading>
          <p className="text-center mx-auto" style={{ fontSize: "15px", color: "#cfc9bf", lineHeight: 1.85, marginTop: "26px", maxWidth: "860px" }}>{t.suitability!.intro}</p>
          <div className="grid gap-6 md:grid-cols-2 mx-auto" style={{ marginTop: "44px", maxWidth: "940px" }}>
            <div style={{ background: INK_2, border: `1px solid rgba(201,169,106,0.25)`, borderRadius: "14px", padding: "clamp(24px,3vw,34px)" }}>
              <h3 className="font-display" style={{ fontSize: "14px", color: GOLD, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "18px" }}>suitable for:</h3>
              <ul className="space-y-4">
                {t.suitability!.suitableFor!.map((s) => (
                  <li key={s} className="flex items-start gap-3"><GoldCheck /><span style={{ fontSize: "14px", color: "#e2ddd3", lineHeight: 1.55 }}>{s}</span></li>
                ))}
              </ul>
            </div>
            <div style={{ background: INK_2, border: `1px solid rgba(255,255,255,0.08)`, borderRadius: "14px", padding: "clamp(24px,3vw,34px)" }}>
              <h3 className="font-display" style={{ fontSize: "14px", color: "#9b948a", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "18px" }}>not suitable for:</h3>
              <ul className="space-y-4">
                {t.suitability!.notIdeal!.map((s) => (
                  <li key={s} className="flex items-start gap-3"><span style={{ color: "#7c756b", fontSize: "15px", lineHeight: 1.4, flexShrink: 0 }}>—</span><span style={{ fontSize: "14px", color: "#b8b2a8", lineHeight: 1.55 }}>{s}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---- THE SCIENCE ---- */}
      <section style={{ background: INK_2, padding: "clamp(56px,6vw,90px) 0" }}>
        <div className="container">
          <Kicker>The Science Behind the Results</Kicker>
          <Heading>{t.precision!.title}</Heading>
          <p className="text-center mx-auto" style={{ fontSize: "15px", color: "#d2ccc2", lineHeight: 1.85, marginTop: "26px", maxWidth: "880px" }}>{t.precision!.intro}</p>
        </div>
      </section>

      {/* ---- EXPERT CARE (Dr Giovanni) ---- */}
      <section style={{ background: INK, padding: "clamp(56px,6vw,90px) 0" }}>
        <div className="container">
          <Kicker>expert care</Kicker>
          <Heading>{t.experience!.title}</Heading>
          <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] mx-auto" style={{ marginTop: "44px", maxWidth: "980px" }}>
            <Reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={dr.image} alt={dr.title} style={{ display: "block", width: "100%", borderRadius: "16px", border: `1px solid rgba(201,169,106,0.3)` }} />
            </Reveal>
            <Reveal delay={100}>
              <h3 className="font-serif" style={{ fontSize: "clamp(22px,2.6vw,30px)", color: GOLD_SOFT, letterSpacing: "0.04em" }}>{dr.title}</h3>
              <p style={{ fontSize: "15px", color: "#d2ccc2", lineHeight: 1.85, marginTop: "18px" }}>{drBio}</p>
              {drQuote && (
                <blockquote style={{ borderLeft: `2px solid ${GOLD}`, paddingLeft: "20px", marginTop: "24px" }}>
                  <p className="font-serif" style={{ fontSize: "17px", color: "#e7e2d8", fontStyle: "italic", lineHeight: 1.6 }}>&ldquo;{drQuote}&rdquo;</p>
                  {drQuoteBy && <cite style={{ display: "block", fontSize: "13px", color: GOLD, marginTop: "10px", fontStyle: "normal" }}>— {drQuoteBy}</cite>}
                </blockquote>
              )}
              <div style={{ marginTop: "28px" }}><GoldBtn>MEET DR GIOVANNI</GoldBtn></div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- GUARANTEE ---- */}
      <section style={{ background: INK_2, padding: "clamp(56px,6vw,90px) 0" }}>
        <div className="container">
          <Kicker>Our guarantee</Kicker>
          <Heading>{t.guarantee!.title}</Heading>
          <div className="mx-auto" style={{ maxWidth: "860px", marginTop: "30px" }}>
            {t.guarantee!.paragraphs.map((p, i) => {
              const isBullet = i >= 4 && i <= 7;
              if (isBullet) {
                return (
                  <div key={p} className="flex items-start gap-3" style={{ marginTop: "10px", paddingLeft: "8px" }}>
                    <GoldCheck /><span style={{ fontSize: "14px", color: "#cfc9bf", lineHeight: 1.6 }}>{p}</span>
                  </div>
                );
              }
              const lead = i === 0;
              return (
                <p key={p} style={{ fontSize: lead ? "17px" : "14.5px", color: lead ? GOLD_SOFT : "#cfc9bf", lineHeight: 1.85, marginTop: i === 0 ? 0 : "18px", textAlign: lead ? "center" : "left", fontFamily: lead ? "var(--font-serif, serif)" : undefined }}>{p}</p>
              );
            })}
          </div>
          <div className="text-center" style={{ marginTop: "36px" }}><GoldBtn>{t.guarantee!.cta}</GoldBtn></div>
        </div>
      </section>

      {/* ---- PACKAGES ---- */}
      <section style={{ background: INK, padding: "clamp(56px,6vw,90px) 0" }}>
        <div className="container">
          <Kicker>{pkg.intro}</Kicker>
          <Heading>{pkg.title}</Heading>
          <div className="grid gap-6 lg:grid-cols-3" style={{ marginTop: "48px" }}>
            {pkg.items.map((item, i) => {
              const { intro, includesLabel, bullets } = parsePackage(item.desc);
              const featured = i === 1;
              return (
                <Reveal key={item.name} delay={i * 90} style={{ display: "flex", flexDirection: "column", background: INK_2, border: featured ? `1.5px solid ${GOLD}` : `1px solid rgba(201,169,106,0.22)`, borderRadius: "16px", overflow: "hidden", boxShadow: featured ? "0 18px 44px rgba(0,0,0,0.5)" : "0 12px 30px rgba(0,0,0,0.35)" }}>
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <video src={`${A}/vid-hair-regrowth-${i + 3}.mp4`} autoPlay muted loop playsInline style={{ display: "block", width: "100%", aspectRatio: "16 / 10", objectFit: "cover" }} />
                  <div style={{ padding: "clamp(22px,2.4vw,30px)", display: "flex", flexDirection: "column", flex: 1 }}>
                    <h3 className="font-display" style={{ fontSize: "20px", color: GOLD_SOFT, letterSpacing: "0.06em", textTransform: "uppercase" }}>{item.name}</h3>
                    <p className="font-display" style={{ fontSize: "15px", color: "#fff", letterSpacing: "0.04em", marginTop: "8px" }}>{item.price}</p>
                    {intro && <p style={{ fontSize: "13.5px", color: "#c4beb4", lineHeight: 1.7, marginTop: "14px" }}>{intro}</p>}
                    {featured || i === 2 ? (
                      <p style={{ fontSize: "13px", color: "#7fc08a", lineHeight: 1.6, marginTop: "12px" }}>✅ Backed by the Carisma Measurable Results Guarantee.</p>
                    ) : null}
                    {includesLabel && <p className="font-display" style={{ fontSize: "12px", color: GOLD, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "18px", marginBottom: "10px" }}>{includesLabel}</p>}
                    <ul className="space-y-2.5" style={{ flex: 1 }}>
                      {bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5"><span style={{ color: GOLD, fontSize: "10px", lineHeight: 1.9, flexShrink: 0 }}>●</span><span style={{ fontSize: "12.5px", color: "#b8b2a8", lineHeight: 1.55 }}>{b}</span></li>
                      ))}
                    </ul>
                    <div style={{ marginTop: "24px" }}><GoldBtn style={{ width: "100%" }}>GET STARTED</GoldBtn></div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- WE DON'T JUST TREAT HAIR LOSS (collage + why card) ---- */}
      <section style={{ background: INK_2, padding: "clamp(56px,6vw,90px) 0" }}>
        <div className="container">
          <Kicker>we don&rsquo;t just treat hair loss</Kicker>
          <Heading style={{ maxWidth: "880px", margin: "0 auto" }}>{collage.title}</Heading>
          {collage.subtitle && <p className="text-center" style={{ fontSize: "15px", color: GOLD, letterSpacing: "0.04em", marginTop: "14px" }}>{collage.subtitle}</p>}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto" style={{ marginTop: "44px", maxWidth: "1000px" }}>
            {collage.images.map((src) => (
              <div key={src} className="overflow-hidden" style={{ borderRadius: "12px", border: `1px solid rgba(201,169,106,0.25)` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" style={{ display: "block", width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }} />
              </div>
            ))}
          </div>

          <div className="mx-auto" style={{ marginTop: "48px", maxWidth: "900px", background: INK, border: `1px solid rgba(201,169,106,0.25)`, borderRadius: "18px", padding: "clamp(30px,4vw,48px)" }}>
            <h3 className="font-serif text-center" style={{ fontSize: "clamp(20px,2.4vw,28px)", color: GOLD_SOFT, letterSpacing: "0.04em", lineHeight: 1.35 }}>{whyTitle}</h3>
            <ul className="space-y-4" style={{ marginTop: "28px" }}>
              {whyBullets.map((p) => (
                <li key={p.title} className="flex items-start gap-3"><GoldCheck /><span style={{ fontSize: "14.5px", color: "#d2ccc2", lineHeight: 1.6 }}>{p.title}</span></li>
              ))}
            </ul>
            {whyNote && <p className="text-center" style={{ fontSize: "13px", color: "#a39c91", lineHeight: 1.7, marginTop: "28px", fontStyle: "italic" }}>{whyNote}</p>}
            <div className="text-center" style={{ marginTop: "28px" }}><GoldBtn>Book Your Consultation</GoldBtn></div>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section style={{ background: INK, padding: "clamp(56px,6vw,90px) 0" }}>
        <div className="container">
          <Kicker>{t.faqKicker}</Kicker>
          <Heading>{t.faqTitle}</Heading>
          <div className="mx-auto" style={{ maxWidth: "820px", marginTop: "44px" }}>
            {t.faq!.map((f) => (
              <details key={f.q} style={{ background: INK_2, border: `1px solid rgba(201,169,106,0.22)`, borderRadius: "12px", marginBottom: "12px", padding: "0 22px" }}>
                <summary className="flex items-center justify-between gap-4" style={{ cursor: "pointer", padding: "18px 0", fontSize: "15px", fontWeight: 500, color: GOLD_SOFT, letterSpacing: "0.01em", listStyle: "none" }}>
                  <span>{f.q}</span>
                  <span style={{ color: GOLD, fontSize: "22px", lineHeight: 1, flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ fontSize: "14px", color: "#c4beb4", lineHeight: 1.75, padding: "0 0 20px" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
