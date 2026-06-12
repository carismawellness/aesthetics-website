import Link from "next/link";
import Reveal from "@/components/Reveal";
import FaqAccordion, { type Faq } from "@/components/FaqAccordion";
import ConsultationForm from "@/components/ConsultationForm";

const A = "/assets/treatments";

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="font-display text-center" style={{ fontSize: "18px", color: "var(--gold-deep)", letterSpacing: "0.02em" }}>{children}</p>;
}
function Serif({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <h2 className="font-serif text-center" style={{ fontSize: "clamp(22px,3vw,30px)", color: "var(--gold-deep)", letterSpacing: "0.06em", fontWeight: 400, lineHeight: 1.3, ...style }}>{children}</h2>;
}
function Cta({ label }: { label: string }) {
  return <Link href="/consultation" className="btn btn-teal" style={{ fontSize: "13px", padding: "15px 32px", letterSpacing: "0.1em" }}>{label} <span aria-hidden style={{ marginLeft: "4px" }}>›</span></Link>;
}
function GoogleRating() {
  return (
    <div className="flex items-center gap-2" style={{ marginTop: "20px" }}>
      <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" /><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" /></svg>
      <span style={{ fontWeight: 600, fontSize: "13px", color: "var(--label)" }}>4.9</span>
      <span className="flex" style={{ color: "var(--teal)" }}>{[0, 1, 2, 3, 4].map((i) => (<svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>))}</span>
      <span className="font-display" style={{ fontSize: "11px", color: "var(--teal)", letterSpacing: "0.08em" }}>TOP-RATED CLINIC IN MALTA</span>
    </div>
  );
}
function Dot() { return <span style={{ color: "var(--teal)", fontSize: "11px", lineHeight: 1.8, flexShrink: 0 }}>●</span>; }

const INCLUDED = [
  "Personal tattoo and skin assessment before treatment",
  "Advanced Pico laser technology for precise ink targeting",
  "Ultra-short laser pulses designed to break down tattoo pigment",
  "A personalised treatment plan based on your tattoo and skin type",
  "Aftercare guidance to support safe healing and better results",
];

const REVIEWS = [
  { name: "Morina G.", text: "I wanted to fade an old tattoo before getting it covered, and the team made me feel completely comfortable from the first consultation. They explained how the Pico Laser works, what results I could realistically expect, and how many sessions may be needed. The treatment felt professional, precise, and much more reassuring than I expected. I could see the tattoo gradually fading after each visit, and the aftercare guidance made the whole process feel safe and well-managed." },
  { name: "Daniela A.", text: "I was nervous about laser tattoo removal, but the Pico Laser treatment felt much more manageable than I expected. The team checked my skin carefully, explained the process clearly, and made sure I understood what would happen during and after the treatment. I really appreciated that they didn’t overpromise instant results and instead gave me a proper treatment plan. It felt calm, professional, and tailored to my skin." },
  { name: "Claire V.", text: "My tattoo had been bothering me for years, but I didn’t want anything rushed or aggressive. Carisma gave me a proper plan based on my skin, tattoo size, and ink depth, which made me feel confident from the beginning. The fading has been gradual, but I can clearly see the difference after each session. What I liked most was how honest and careful the team was throughout the process." },
  { name: "Rachel B.", text: "I had a small tattoo I wanted removed for work reasons, and I wanted the process to be handled safely. The consultation was honest, clear, and very reassuring. They explained that tattoo removal takes time and depends on the ink, skin type, and how the tattoo responds. The treatment itself was precise, and I felt comfortable knowing I was being looked after by a medically qualified team." },
];

const FEATURES = [
  { icon: "pico-feat1.png", label: "PRECISE INK TARGETING", desc: "Pico pulses target tattoo pigment with focused precision." },
  { icon: "pico-feat2.png", label: "GENTLER FADING", desc: "Designed to break ink particles without relying on intense heat." },
  { icon: "pico-feat3.png", label: "CUSTOM REMOVAL PLAN", desc: "Tailored to your tattoo, skin type, ink depth, and fading goals." },
  { icon: "pico-feat4.png", label: "EXPERT AFTERCARE", desc: "Professional guidance before and after treatment for safer results." },
];

const BECAUSE = [
  "Because your tattoo no longer reflects who you are today.",
  "Because you want a careful, professional approach — not harsh or rushed treatment.",
  "Because Pico laser technology helps target pigment with focused precision.",
  "Because every tattoo is different, and your treatment plan should be too.",
  "Because you deserve honest guidance, realistic expectations, and expert aftercare from start to finish.",
];

const COMMITMENT = [
  ["Safe Tattoo Fading", "A careful approach designed to gradually fade unwanted ink."],
  ["Pico Laser Precision", "Targets tattoo pigment with ultra-short laser pulses."],
  ["Personalised Treatment Plans", "Every plan is based on your tattoo size, ink colour, depth, and skin type."],
  ["Honest Expectations", "We explain the process clearly, including the number of sessions you may need."],
  ["Professional Aftercare", "Guidance before and after each session to support safe skin recovery."],
];
const WHY_TRUST = [
  "Trusted by clients looking for safer, professional tattoo removal in Malta.",
  "Performed by qualified aesthetic specialists using advanced laser technology.",
  "Suitable for fading tattoos before cover-ups or removing unwanted ink over time.",
  "A calm, medically guided experience from consultation to aftercare.",
];

const FADE = [
  "Targets tattoo pigment with ultra-short Pico laser pulses",
  "Helps break ink into tiny particles for natural clearance",
  "Suitable for fading tattoos before cover-ups or gradual removal",
  "Personalised plan based on tattoo size, ink colour, depth, and skin type",
  "Medically guided treatment with clear aftercare support",
  "Trusted aesthetic specialists in Malta",
];

const REDEFINED = [
  ["Precise Ink Fading", "Targets tattoo pigment beneath the skin using ultra-short Pico pulses."],
  ["Gentler Technology", "Helps break ink particles without relying on intense heat."],
  ["Personalised Plan", "Treatment is tailored to your tattoo size, ink colour, depth, and skin type."],
  ["Safe, Expert Care", "Performed by trained aesthetic specialists with clear aftercare guidance."],
];

const PRICES = [
  { size: "xs", price: "€ 79", icon: "pico-pr-xs.png" },
  { size: "small", price: "€ 99", icon: "pico-pr-small.png" },
  { size: "medium", price: "€ 149", icon: "pico-pr-medium.png" },
  { size: "large", price: "€ 199", icon: "pico-pr-large.png" },
  { size: "xl", price: "from € 249", icon: "pico-pr-xl.png" },
];

const EXPECT = [
  { image: "pico-before.png", label: "before", points: ["Before your treatment, avoid direct sun exposure, tanning, or self-tanning products on the tattooed area for at least a few days.", "Keep the area clean and well-hydrated. Do not apply harsh exfoliants, acids, or active skincare over the tattoo before your session", "Share your medical history, skin sensitivity, and any medications with your specialist so your treatment can be planned safely."] },
  { image: "pico-during.png", label: "at session", points: ["Your specialist will begin by assessing the tattoo’s size, colour, depth, and location to customize your Pico laser settings.", "During the session, ultra-short Pico laser pulses target the tattoo pigment, helping break ink particles into smaller fragments.", "You may feel a quick snapping sensation on the skin. Cooling and comfort measures may be used throughout the treatment."] },
  { image: "pico-after.png", label: "after", points: ["Mild redness, warmth, swelling, or temporary whitening of the treated area can be normal after Pico laser tattoo removal.", "Keep the area clean, protected, and moisturized as advised. Avoid picking, scratching, or rubbing the treated skin.", "Protect the area from sun exposure and follow your aftercare plan to support healing and achieve the best possible fading results."] },
];

const WHY_CARISMA = ["Team of highly trained and Medically qualified practitioners", "Central and discrete location", "Flexible scheduling and booking", "Personalised treatment plans", "Advanced treatments with cutting edge technology"];

const FAQS: Faq[] = [
  { q: "What is Pico laser tattoo removal?", a: "Pico laser tattoo removal is an advanced laser treatment that uses ultra-short pulses of energy to break tattoo ink into tiny particles. These particles are then gradually cleared by the body’s natural healing process. Picosecond lasers are designed to target ink with very short pulse durations, which may help improve fading compared with older laser methods." },
  { q: "How does Pico laser remove tattoo ink?", a: "The laser sends quick bursts of energy into the skin, targeting the tattoo pigment without cutting the skin. The ink breaks into smaller fragments, and your body slowly removes them over time." },
  { q: "How many sessions will I need?", a: "The number of sessions depends on the tattoo’s size, colour, age, depth, ink type, and your skin’s response. Most tattoos need multiple sessions, with gradual fading after each visit. A consultation is the best way to estimate your treatment plan." },
  { q: "Does Pico laser tattoo removal hurt?", a: "You may feel a snapping or stinging sensation, similar to a rubber band against the skin. Many clinics use cooling or numbing options to make the treatment more comfortable." },
  { q: "Can Pico laser remove all tattoo colours?", a: "Pico laser can treat many ink colours, but some shades fade faster than others. Black and darker inks usually respond well, while lighter colours such as yellow, white, and some pastel tones may need more sessions or may be harder to remove completely." },
  { q: "Will the tattoo disappear completely?", a: "Many tattoos can fade significantly, and some may clear almost completely. However, results vary depending on the tattoo and the skin. In some cases, a light shadow or trace of pigment may remain." },
  { q: "Is there any downtime after treatment?", a: "There is usually minimal downtime, but the treated area may look red, swollen, sensitive, or slightly blistered for a short time. These reactions are part of the healing process, but proper aftercare is important." },
  { q: "What aftercare should I follow?", a: "Keep the area clean, avoid picking or scratching, protect it from sun exposure, and follow the aftercare instructions given by your practitioner. Sun exposure and poor aftercare can increase the risk of pigmentation changes or scarring." },
  { q: "Can Pico laser cause scarring?", a: "Scarring is possible with any tattoo removal treatment, but the risk is lower when the procedure is performed correctly by a trained professional and proper aftercare is followed. The FDA notes possible risks include scarring, infection, redness, soreness, and changes in skin colour." },
  { q: "Who is not suitable for Pico laser tattoo removal?", a: "Pico laser may not be suitable for everyone. People who are pregnant, breastfeeding, have active skin infections, poor wound healing, or certain medical conditions may need to avoid treatment or get medical advice first. A professional consultation is required before starting." },
];

export default function PicoLaserPage() {
  return (
    <>
      {/* HERO — sage gradient panel, content left, collage + consultation form right (matches live) */}
      <section style={{ background: "url('/assets/hero-bg.png') center / cover no-repeat", padding: "40px 0 56px" }}>
        <div className="container">
          <div style={{ borderRadius: "26px", background: "linear-gradient(135deg,#d2e0db 0%, #e7efe9 48%, #cddcd5 100%)", padding: "clamp(26px,3.4vw,48px)" }}>
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.25fr] items-start">
              {/* Left: copy */}
              <Reveal>
                <h1 className="font-serif" style={{ fontSize: "clamp(28px,3.6vw,42px)", color: "var(--gold-deep)", letterSpacing: "0.05em", textTransform: "uppercase", lineHeight: 1.15 }}>pico laser tattoo removal</h1>
                <p style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.7, marginTop: "16px" }}>Advanced laser technology to safely fade unwanted tattoos with precision, comfort, and clinically guided care.</p>
                <p className="font-display" style={{ fontSize: "14px", color: "var(--gold-deep)", letterSpacing: "0.04em", margin: "22px 0 12px" }}>What’s Included:</p>
                <ul className="space-y-2.5">
                  {INCLUDED.map((it) => (<li key={it} className="flex items-start gap-3"><Dot /><span style={{ fontSize: "13.5px", color: "var(--label)", lineHeight: 1.55 }}>{it}</span></li>))}
                </ul>
                <p className="font-display" style={{ fontSize: "16px", color: "var(--gold-deep)", letterSpacing: "0.04em", marginTop: "22px" }}>Total Value: €335 – <span style={{ color: "var(--teal)" }}>Today: €99 Only</span></p>
                <p style={{ fontSize: "11px", color: "var(--muted)", lineHeight: 1.6, marginTop: "8px" }}>Due to high demand, packages are offered based on availability and may not always be guaranteed. Please inquire for current options.</p>
                <div style={{ marginTop: "22px" }}><Cta label="Book Now & Save 50%" /></div>
                <GoogleRating />
              </Reveal>

              {/* Right: image collage + consultation form (matches live) */}
              <Reveal delay={120}>
                <div className="grid gap-5 lg:grid-cols-[0.82fr_1fr] items-start">
                  {/* layered collage */}
                  <div className="relative" style={{ aspectRatio: "1 / 1.18", minHeight: "300px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${A}/pico-collage-arm.png`} alt="Pico laser tattoo removal in progress" style={{ position: "absolute", top: 0, left: 0, width: "74%", borderRadius: "8px", filter: "drop-shadow(0 16px 34px rgba(0,0,0,0.14))" }} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${A}/pico-collage-neck.png`} alt="Tattoo before removal" style={{ position: "absolute", top: "20%", right: 0, width: "52%", borderRadius: "8px", filter: "drop-shadow(0 16px 34px rgba(0,0,0,0.16))" }} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${A}/pico-collage-ba.png`} alt="Tattoo fading before and after" style={{ position: "absolute", bottom: 0, left: 0, width: "62%", borderRadius: "8px", filter: "drop-shadow(0 14px 30px rgba(0,0,0,0.16))" }} />
                  </div>
                  {/* consultation form card */}
                  <div className="bg-white" style={{ borderRadius: "14px", overflow: "hidden", boxShadow: "0 22px 50px rgba(0,0,0,0.16)" }}>
                    <ConsultationForm height={760} />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-center" style={{ marginTop: "40px" }}>
            {["MALTA'S LEADING WELLNESS CHAIN", "30+ YEARS OF EXPERTISE", "MEDICALLY QUALIFIED"].map((t) => (
              <span key={t} className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${A}/laser-ic-check.png`} alt="" style={{ width: "22px", height: "22px" }} />
                <span className="font-display" style={{ fontSize: "12px", color: "var(--gold-deep)", letterSpacing: "0.1em" }}>{t}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <div style={{ background: `url('${A}/laser-marble.jpg') top center / cover` }}>
        {/* REVIEWS */}
        <section style={{ padding: "70px 0" }}>
          <div className="container">
            <Serif>precision tattoo removal in malta</Serif>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mx-auto" style={{ maxWidth: "1160px", marginTop: "40px" }}>
              {REVIEWS.map((r, i) => (
                <Reveal key={r.name} delay={(i % 4) * 70} className="overflow-hidden flex flex-col" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid var(--line)", borderRadius: "16px", boxShadow: "0 12px 30px rgba(0,0,0,0.05)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${A}/pico-rev${i + 1}.png`} alt="Tattoo removal result" className="w-full" style={{ display: "block", aspectRatio: "16 / 9", objectFit: "cover" }} />
                  <div style={{ padding: "20px 22px 24px" }}>
                    <p style={{ fontSize: "13px", color: "var(--label)", lineHeight: 1.7, display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{r.text}</p>
                    <p className="font-display" style={{ fontSize: "12px", color: "var(--teal)", letterSpacing: "0.04em", marginTop: "10px" }}>Read more</p>
                    <p className="font-display" style={{ fontSize: "13px", color: "var(--gold-deep)", letterSpacing: "0.04em", marginTop: "14px" }}>- {r.name}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* DO YOU HAVE A TATTOO */}
        <section style={{ padding: "60px 0" }}>
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <p className="font-display" style={{ fontSize: "18px", color: "var(--gold-deep)", letterSpacing: "0.02em" }}>so your skin feels like yours again- confidently.</p>
                <h2 className="font-serif" style={{ fontSize: "clamp(22px,3vw,30px)", color: "var(--gold-deep)", letterSpacing: "0.06em", fontWeight: 400, lineHeight: 1.3, marginTop: "8px" }}>Do you have a tattoo you no longer want to carry?</h2>
                {["Whether it no longer reflects who you are, has faded over time, or you want to lighten it for a cover-up, unwanted ink can feel frustrating. You’re not alone — and safe, gradual tattoo fading is possible with the right technology and care.",
                  "With our advanced Pico Laser Tattoo Removal treatment, ultra-short laser pulses target unwanted tattoo pigment beneath the skin, helping break the ink into tiny particles so your body can naturally clear them over time.",
                  "Every tattoo is different. Your treatment plan is personalised based on your tattoo size, colour, depth, age, skin type, and removal goals to support safer fading and better-looking results.",
                  "Your skin has a new story to tell. Let’s help you begin it with confidence."].map((p, i) => (
                  <p key={i} style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.8, marginTop: i === 0 ? "20px" : "14px" }}>{p}</p>
                ))}
                <div style={{ marginTop: "26px" }}><Cta label="Grab This Limited Offer 50% Off" /></div>
              </div>
              <Reveal delay={120}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${A}/pico-hero2.png`} alt="Tattoo fading over multiple Pico laser sessions" className="w-full rounded-xl" style={{ display: "block", objectFit: "cover", boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* TRUSTED + features */}
        <section style={{ padding: "50px 0" }}>
          <div className="container text-center">
            <Serif>malta’s trusted clinic for safe, precise tattoo removal</Serif>
            <p className="mx-auto" style={{ maxWidth: "740px", fontSize: "14px", color: "var(--label)", lineHeight: 1.7, marginTop: "16px" }}>Advanced Pico laser technology, personalised treatment plans, and medically guided care for unwanted ink.</p>
            <div className="flex flex-wrap items-center justify-center" style={{ gap: "30px", marginTop: "30px" }}>
              {["/assets/press/lovin-malta.jpeg", "/assets/press/malta-daily.png", "/assets/press/bay.jpeg", "/assets/press/times-of-malta.png", "/assets/press/malta-today.jpg"].map((l) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={l} src={l} alt="" style={{ height: "30px", width: "auto", objectFit: "contain" }} />
              ))}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ marginTop: "44px" }}>
              {FEATURES.map((f, i) => (
                <Reveal key={f.label} delay={(i % 4) * 70} className="text-center" style={{ background: "rgba(255,255,255,0.5)", border: "1px solid var(--line)", borderRadius: "16px 40px 16px 40px", padding: "28px 22px", boxShadow: "0 12px 30px rgba(0,0,0,0.05)" }}>
                  <div className="flex justify-center" style={{ marginBottom: "14px", height: "52px", alignItems: "center" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${A}/${f.icon}`} alt={f.label} style={{ maxHeight: "48px", width: "auto" }} />
                  </div>
                  <h3 className="font-display" style={{ fontSize: "13px", color: "var(--gold-deep)", letterSpacing: "0.06em", marginBottom: "10px" }}>{f.label}</h3>
                  <p style={{ fontSize: "13px", color: "var(--label)", lineHeight: 1.65 }}>{f.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* BECAUSE */}
        <section style={{ padding: "60px 0" }}>
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <ul>
                  {BECAUSE.map((b) => (<li key={b} className="flex items-start gap-3" style={{ marginBottom: "14px" }}><Dot /><span style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.6 }}>{b}</span></li>))}
                </ul>
                <h2 className="font-serif" style={{ fontSize: "clamp(22px,3vw,30px)", color: "var(--gold-deep)", letterSpacing: "0.06em", fontWeight: 400, lineHeight: 1.3, marginTop: "22px" }}>safe, confident tattoo removal starts here.</h2>
                <div style={{ marginTop: "24px" }}><Cta label="ClaimTatto Removal Over 50% Off" /></div>
              </div>
              <Reveal delay={120}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${A}/pico-fade.png`} alt="Client considering tattoo removal" className="w-full rounded-xl" style={{ display: "block", objectFit: "cover", aspectRatio: "1 / 1", boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* COMMITMENT + WHY TRUST */}
        <section style={{ padding: "40px 0 60px" }}>
          <div className="container">
            <Serif>35+ years helping malta feel confident.</Serif>
            <div className="grid gap-12 lg:grid-cols-2 mx-auto" style={{ maxWidth: "1000px", marginTop: "40px" }}>
              <div>
                <h3 className="font-display" style={{ fontSize: "14px", color: "var(--gold-deep)", letterSpacing: "0.08em", marginBottom: "18px" }}>OUR COMMITMENT</h3>
                <ul className="space-y-4">
                  {COMMITMENT.map(([t, d]) => (<li key={t} className="flex items-start gap-3"><Dot /><span style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.6 }}><b style={{ color: "var(--gold-deep)", fontWeight: 600 }}>{t}</b> — {d}</span></li>))}
                </ul>
              </div>
              <div>
                <h3 className="font-display" style={{ fontSize: "14px", color: "var(--gold-deep)", letterSpacing: "0.08em", marginBottom: "18px" }}>WHY MALTA TRUSTS OUR PICO LASER TREATMENT</h3>
                <ul className="space-y-4">
                  {WHY_TRUST.map((w) => (<li key={w} className="flex items-start gap-3"><Dot /><span style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.6 }}>{w}</span></li>))}
                </ul>
              </div>
            </div>
            <div className="text-center" style={{ marginTop: "36px" }}><Cta label="Get My First Tatto removal Session" /></div>
          </div>
        </section>

        {/* SECURE CONSULTATION */}
        <section style={{ padding: "30px 0 60px" }}>
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <Serif style={{ textAlign: "left" }}>SECURE YOUR PICO LASER TATTOO REMOVAL CONSULTATION TODAY</Serif>
                {["Our professional tattoo removal consultation is available for a limited time — once appointments are filled, the next available slots may be later.",
                  "Whether you want to fade an old tattoo, prepare for a cover-up, or remove unwanted ink over time, our Pico Laser treatment is designed to target tattoo pigment with focused precision.",
                  "During your consultation, we assess your tattoo size, ink colour, depth, skin type, and goals before creating a personalised treatment plan.",
                  "No rushed promises — just safe guidance, realistic expectations, and expert care from start to finish."].map((p, i) => (
                  <p key={i} style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.8, marginTop: i ? "12px" : "18px" }}>{p}</p>
                ))}
                <div style={{ marginTop: "26px" }}><Cta label="book your tatto removal now" /></div>
              </div>
              <Reveal delay={120}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${A}/pico-secure.png`} alt="Pico laser tattoo removal consultation" className="w-full rounded-xl" style={{ display: "block", objectFit: "cover", aspectRatio: "1 / 1", boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* FADE UNWANTED INK */}
        <section style={{ padding: "50px 0" }}>
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="font-serif" style={{ fontSize: "clamp(22px,3vw,30px)", color: "var(--gold-deep)", letterSpacing: "0.06em", fontWeight: 400, lineHeight: 1.3 }}>FADE UNWANTED INK. FEEL MORE LIKE YOU.</h2>
                <p style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.7, marginTop: "16px" }}>Advanced Pico Laser tattoo removal designed for safer fading, precise targeting, and personalised results.</p>
                <ul className="space-y-3" style={{ marginTop: "24px" }}>
                  {FADE.map((f) => (<li key={f} className="flex items-start gap-3"><Dot /><span style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.6 }}>{f}</span></li>))}
                </ul>
                <div style={{ marginTop: "28px" }}><Cta label="Claim 50% Off Tattoo Removal" /></div>
              </div>
              <Reveal delay={120}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${A}/pico-fadeink.png`} alt="Tattoo before Pico laser removal" className="w-full rounded-xl" style={{ display: "block", objectFit: "cover", aspectRatio: "4 / 5", boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* YOUR SKIN REDEFINED */}
        <section style={{ padding: "50px 0" }}>
          <div className="container">
            <Serif>YOUR SKIN — REDEFINED.</Serif>
            <p className="mx-auto text-center" style={{ maxWidth: "820px", fontSize: "14px", color: "var(--label)", lineHeight: 1.7, marginTop: "16px" }}>See how advanced Pico Laser treatment helps fade unwanted tattoo ink with precision, care, and a personalised plan designed around your skin.</p>
            <div className="grid gap-10 lg:grid-cols-2 items-center mx-auto" style={{ maxWidth: "1000px", marginTop: "36px" }}>
              <Reveal>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${A}/pico-redefined.png`} alt="Pico laser tattoo removal results" className="w-full rounded-xl" style={{ display: "block", objectFit: "cover", aspectRatio: "1 / 1", boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }} />
              </Reveal>
              <ul className="space-y-5">
                {REDEFINED.map(([t, d]) => (<li key={t} className="flex items-start gap-3"><Dot /><span style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.6 }}><b style={{ color: "var(--gold-deep)", fontWeight: 600 }}>{t}</b> — {d}</span></li>))}
              </ul>
            </div>
            <div className="text-center" style={{ marginTop: "32px" }}><Cta label="Get 50% Off Pico Laser" /></div>
          </div>
        </section>

        {/* PRICING */}
        <section style={{ padding: "60px 0" }}>
          <div className="container text-center">
            <Serif>pico laser tatto removal pricing</Serif>
            <p className="mx-auto" style={{ maxWidth: "760px", fontSize: "14px", color: "var(--label)", lineHeight: 1.7, marginTop: "16px" }}>Choose the package that best fits your needs and goals. Every option is crafted to deliver exceptional results and a premium experience.</p>
            <div className="flex flex-wrap justify-center mx-auto" style={{ gap: "22px", marginTop: "40px", maxWidth: "710px" }}>
              {PRICES.map((p, i) => (
                <Reveal key={p.size} delay={(i % 5) * 60} className="text-center relative" style={{ width: "200px", background: "linear-gradient(160deg,#b6ac95 0%, #a89e86 100%)", borderRadius: "14px", padding: "44px 18px 26px", marginTop: "26px", boxShadow: "0 12px 30px rgba(0,0,0,0.10)" }}>
                  <span className="inline-flex items-center justify-center" style={{ position: "absolute", top: "-26px", left: "50%", transform: "translateX(-50%)", width: "56px", height: "56px", borderRadius: "12px", backgroundColor: "#8e836b" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${A}/${p.icon}`} alt="" style={{ width: "30px", height: "30px" }} />
                  </span>
                  <div className="font-serif" style={{ fontSize: "20px", color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase" }}>{p.size}</div>
                  <div style={{ width: "60px", height: "1px", background: "rgba(255,255,255,0.6)", margin: "12px auto" }} />
                  <div className="font-serif" style={{ fontSize: "24px", color: "#fff", letterSpacing: "0.02em" }}>{p.price}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT TO EXPECT */}
        <section style={{ padding: "50px 0" }}>
          <div className="container">
            <Serif>what to expect during your pico laser tattoo removal treatment?</Serif>
            <div className="grid gap-8 md:grid-cols-3" style={{ marginTop: "44px" }}>
              {EXPECT.map((e, i) => (
                <Reveal key={e.label} delay={(i % 3) * 80} className="flex flex-col">
                  <h3 className="font-display text-center" style={{ fontSize: "14px", color: "var(--gold-deep)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>{e.label}</h3>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${A}/${e.image}`} alt={e.label} className="w-full rounded-xl" style={{ display: "block", aspectRatio: "5 / 4", objectFit: "cover", boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }} />
                  <div className="space-y-3" style={{ marginTop: "16px" }}>
                    {e.points.map((p) => (
                      <div key={p} style={{ background: "rgba(255,255,255,0.6)", borderLeft: "3px solid var(--teal)", borderRadius: "6px", padding: "14px 16px" }}>
                        <span style={{ fontSize: "13px", color: "var(--label)", lineHeight: 1.65 }}>{p}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "50px 0" }}>
          <div className="container">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mx-auto" style={{ maxWidth: "1080px", marginBottom: "36px" }}>
              <h2 className="font-serif" style={{ fontSize: "clamp(22px,3vw,30px)", color: "var(--gold-deep)", letterSpacing: "0.06em", fontWeight: 400 }}>Frequently asked questions</h2>
              <span className="relative" style={{ width: "260px", maxWidth: "100%" }}>
                <input type="search" aria-label="Search FAQs" placeholder="Looking for something?" style={{ width: "100%", padding: "10px 38px 10px 16px", border: "none", borderBottom: "1px solid var(--line)", background: "transparent", fontSize: "13px", color: "var(--label)" }} />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-deep)" strokeWidth="1.6" style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
              </span>
            </div>
            <FaqAccordion items={FAQS} uppercase={false} />
            <div className="text-center" style={{ marginTop: "36px" }}><Cta label="CLAIM MY SPOT NOW" /></div>
          </div>
        </section>

        {/* WHY CARISMA — gold double-frame card (matches live) */}
        <section style={{ padding: "50px 0 96px" }}>
          <div className="container">
            <Reveal>
              <p className="font-display text-center mx-auto" style={{ fontSize: "clamp(19px,2.6vw,30px)", letterSpacing: "0.08em", lineHeight: 1.55, maxWidth: "780px", marginBottom: "52px", color: "var(--gold-deep)", fontWeight: 400 }}>
                <span style={{ fontWeight: 700 }}>#1 award winning</span> chain in Malta with
                <br />
                <span style={{ fontWeight: 700 }}>30+ years</span> in wellness
              </p>
            </Reveal>
            <Reveal delay={120} className="relative mx-auto" style={{ maxWidth: "640px" }}>
              <span aria-hidden style={{ position: "absolute", inset: 0, transform: "translate(16px, 16px)", border: "1px solid var(--gold-deep)", zIndex: 0 }} />
              <div className="relative bg-white" style={{ border: "1px solid var(--gold-deep)", padding: "clamp(36px,5vw,56px)", zIndex: 1, overflow: "hidden" }}>
                <h2 className="font-display text-center" style={{ fontSize: "clamp(20px,3vw,30px)", color: "var(--gold-deep)", letterSpacing: "0.1em", fontWeight: 400 }}>why carisma aesthetics ?</h2>
                <div className="mx-auto" style={{ width: "120px", height: "1px", background: "var(--gold-deep)", margin: "18px auto 34px" }} />
                <ul className="space-y-5">
                  {WHY_CARISMA.map((w) => (
                    <li key={w} className="flex items-start gap-3">
                      <span style={{ color: "var(--gold-deep)", fontSize: "14px", lineHeight: 1.6 }}>●</span>
                      <span className="font-display" style={{ fontSize: "14px", fontWeight: 400, color: "var(--gold-deep)", letterSpacing: "0.06em", lineHeight: 1.5 }}>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <span aria-hidden style={{ position: "absolute", left: "50%", bottom: "-9px", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: "9px solid var(--gold-deep)", zIndex: 2 }} />
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
