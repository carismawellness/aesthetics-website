import Link from "next/link";
import Reveal from "@/components/Reveal";
import CompositeSlideshow from "@/components/CompositeSlideshow";
import FaqAccordion, { type Faq } from "@/components/FaqAccordion";

const IMG = "/assets/treatments";

/* ---------- shared atoms ---------- */
function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-center" style={{ fontSize: "18px", color: "var(--gold-deep)", letterSpacing: "0.02em" }}>{children}</p>
  );
}
function SerifHeading({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h2 className="font-serif text-center" style={{ fontSize: "clamp(24px,3.2vw,32px)", color: "var(--gold-deep)", letterSpacing: "0.06em", fontWeight: 400, lineHeight: 1.25, ...style }}>{children}</h2>
  );
}
function BookButton({ label = "book your session" }: { label?: string }) {
  return <Link href="/consultation" className="btn btn-gold" style={{ fontSize: "13px", padding: "15px 34px", letterSpacing: "0.12em" }}>{label}</Link>;
}
function Check({ size = 26 }: { size?: number }) {
  return (
    <span className="shrink-0 inline-flex items-center justify-center" style={{ width: size, height: size, borderRadius: "50%", border: "1.5px solid var(--gold-deep)", color: "var(--gold-deep)" }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
    </span>
  );
}
function Cross({ size = 26 }: { size?: number }) {
  return (
    <span className="shrink-0 inline-flex items-center justify-center" style={{ width: size, height: size, borderRadius: "50%", border: "1.5px solid #c9bfa6", color: "#b3a98f" }}>
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
    </span>
  );
}

/* ---------- data ---------- */
const BENEFITS: { text: React.ReactNode }[] = [
  { text: <>Permanently reduce <b style={{ color: "var(--gold-deep)", fontWeight: 600 }}>10-15%</b> of hair per treatment</> },
  { text: <>Painless sessions with patented <b style={{ color: "var(--gold-deep)", fontWeight: 600 }}>ICE Plus™ Cooling</b></> },
  { text: <>No more waxing, shaving, or ingrowns</> },
  { text: <>Safe for all skin types - even tanned</> },
];

const STEPS = [
  { n: 1, icon: "laser-step1.png", title: "Free Consultation", desc: "We begin with a one-on-one consultation to understand your skin type, hair type, and goals. You'll receive a free patch test to experience the Alma Soprano Platinum system firsthand and confirm your skin's compatibility. Takes 15–20 minutes. No obligation to continue." },
  { n: 2, icon: "laser-step2.png", title: "Custom Treatment Plan", desc: "Based on your hair growth patterns and skin tone, we create a tailored plan designed to maximize results in the fewest sessions possible. We'll walk you through the timeline, pre- and post-care, and answer any questions. Most plans span 6–8 sessions spaced a few weeks apart." },
  { n: 3, icon: "laser-step3.png", title: "Virtually Painless Laser Sessions", desc: "Using triple-wavelength technology and ICE Plus™ cooling, each session is designed to be comfortable and efficient. Treatments take as little as 15–30 minutes, with no downtime—you can return to your day immediately. Our system cools the skin to as low as –4°C to keep treatments truly pain-free." },
  { n: 4, icon: "laser-step4.png", title: "Ongoing Monitoring & Adjustments", desc: "We check in throughout your treatment course to monitor progress and adjust settings for optimal results. Our goal is not just smooth skin—but results that last. Most clients report visible reduction after just 2–3 sessions." },
];

const PRICES = [
  { icon: "laser-ic-arms.png", name: "arms", price: "from 35 EUR", desc: "Say goodbye to daily shaving and irritation. Our laser hair removal solutions ensure smooth skin from shoulder to fingertip, helping you maintain a well-groomed appearance with minimal effort.", tags: ["underarms", "Arms & hands"] },
  { icon: "laser-ic-bikini.png", name: "bikini", price: "from 39 EUR", desc: "Prepare for beach season all year round with our expert bikini laser treatments. We offer a variety of options, from a standard bikini line to a full Brazilian, ensuring optimal comfort and confidence.", tags: ["bikini line", "BRAZILIAN"] },
  { icon: "laser-ic-legs.png", name: "legs", price: "from 109 EUR", desc: "Enjoy effortlessly smooth legs with our professional laser hair removal services. Whether you prefer full or half-leg treatments, we provide long-lasting results, eliminating the need for frequent shaving.", tags: ["legs"] },
  { icon: "laser-ic-face.png", name: "face", price: "from 25 EUR", desc: "Achieve a flawless, hair-free complexion with our professional laser hair removal services. We target unwanted facial hair, from eyebrows to the chin, ensuring smooth and long-lasting results.", tags: ["Full Face", "chin"] },
  { icon: "laser-ic-body.png", name: "body", price: "FROM 49 EUR", desc: "Experience the confidence of a smooth, hair-free torso. Our advanced laser treatments effectively remove unwanted hair from various areas of the body, providing a sleek and polished look.", tags: ["shoulders", "back", "chest"] },
  { icon: "laser-ic-men.png", name: "men's", price: "from 25 EUR", desc: "Enhance your grooming routine with our customized laser hair removal solutions for men. We target common areas such as the back, shoulders, chest, and abs, ensuring a refined and polished appearance.", tags: ["multiple areas"] },
];

const TIERS = [
  { image: "laser-member-bronze.png", name: "bronze membership", sessions: "6 Sessions | 15 min each", price: "139 EUR", tags: ["upper lip", "nose"] },
  { image: "laser-member-silver.png", name: "silver membership", sessions: "6 Sessions | 30 min each", price: "245 EUR", tags: [] as string[] },
  { image: "laser-member-gold.png", name: "gold membership", sessions: "6 Sessions | 60 min each", price: "399 EUR", tags: [] as string[] },
];

const SUITABLE = [
  "All skin tones (Fitzpatrick I–VI, including tanned skin)",
  "All hair types (fine to coarse, light to dark—except very light blonde/white)",
  "Both men and women",
  "face and body areas (legs, bikini, underarms, back, chest, face, etc.)",
  "Clients looking for a pain-free, long-term solution to hair removal",
  "Those wanting to eliminate razor burn, stubble, and waxing",
];
const NOT_SUITABLE = [
  "Very light blonde, grey, red, or white hair (these lack melanin, which laser targets)",
  "Pregnant women (precautionary—no safety studies confirm or deny risks)",
  "People with active skin infections or open wounds in the treatment area",
  "Clients on photosensitizing medications (like Accutane or certain antibiotics)",
  "Individuals with recent sunburns or intense sun exposure in treatment areas",
  "Those with epilepsy or severe light sensitivity disorders",
  "People with certain hormonal conditions (like PCOS) may need more sessions or maintenance",
];

const WHY = [
  "Team of highly trained and Medically qualified practitioners",
  "Central and discrete location",
  "Flexible scheduling and booking",
  "Personalised treatment plans",
  "Advanced treatments with cutting edge technology",
];

const WAVELENGTHS = [
  { nm: "755nm", name: "Alexandrite", lead: "ideal of range of", desc: "Suitable for the widest hair types and colors" },
  { nm: "810nm", name: "Diode", lead: "safe for darker", desc: "Cut off skin treatment time to half" },
  { nm: "1064nm", name: "Nd:YAG", lead: "perfect for different", desc: "Most suitable for darker skin types" },
];

const CELEBS = [
  { image: "laser-celeb-victoria.png", name: "VICTORIA BECKHAM" },
  { image: "laser-celeb-kim.png", name: "KIM KARDASHIAN" },
  { image: "laser-celeb-coleen.png", name: "COLEEN ROONEY" },
];

const SUMMARY = [
  { icon: "laser-sum1.png", text: <><b style={{ color: "var(--gold-deep)", fontWeight: 600 }}>the most advanced</b> laser hair removal technology in malta</> },
  { icon: "laser-sum2.png", text: <><b style={{ color: "var(--gold-deep)", fontWeight: 600 }}>100% pain-free</b>, clinically proven & effective for all skin tones & hair types</> },
  { icon: "laser-sum3.png", text: <><b style={{ color: "var(--gold-deep)", fontWeight: 600 }}>Faster</b>, more effective results—permanent hair reduction in fewer sessions</> },
  { icon: "laser-sum4.png", text: <><b style={{ color: "var(--gold-deep)", fontWeight: 600 }}>No downtime</b>, no redness, no hassle—just smooth, touchable skin</> },
];

const FAQS: Faq[] = [
  { q: "What's a laser hair removal treatment like?", a: "A laser hair removal session can take anywhere from a few minutes to an hour, depending on the size and number of areas being treated, such as the legs, underarms, face, chest, or bikini area. Before your treatment begins, your clinician will review essential medical information with you and guide you through the necessary preparations, including removing deodorant, covering tattoos, and cleansing the skin of any makeup, sunscreen, or lotion. You'll also be provided with protective eyewear for safety." },
  { q: "Does Laser Hair Removal Hurt?", a: "With Alma's advanced Super Hair Removal (SHR) technology, discomfort is minimal compared to traditional laser treatments. While conventional lasers use intense, painful pulses that shock the skin, SHR gradually heats the hair follicles for a virtually painless experience. This method effectively prevents regrowth while protecting the surrounding tissue, reducing the risk of irritation or injury.\n\nFor added comfort, our patented ICE Plus™ cooling system maintains a soothing treatment experience by lowering the contact temperature to as low as -4°C." },
  { q: "Is laser hair removal permanent?", a: "Laser hair removal offers a permanent reduction of up to 80% after completing a series of six to eight treatments. This advanced technology effectively targets hair on various areas, including the legs, chest, underarms, bikini line, face, and more." },
  { q: "Which lasers do you use?", a: "Our advanced triple-wavelength laser technology delivers faster, more effective hair removal by targeting hair at multiple depths simultaneously. This means fewer sessions and better results, regardless of your skin tone or hair type.\n\nOur system combines three powerful wavelengths:\n\nAlexandrite (755nm) – Ideal for fine, lighter hair and lighter skin tones\nDiode (810nm) – Versatile and effective for a wide range of skin types\nNd:YAG (1064nm) – Best for deeper hair follicles and darker skin tones\n\nBy utilizing all three wavelengths at once, we ensure comprehensive hair removal with maximum efficiency—so you can achieve smooth, long-lasting results in less time." },
  { q: "Are There Any Side Effects?", a: "Laser hair removal is a safe and well-tolerated treatment, though some mild side effects may occur. The most common reactions include redness, slight swelling, itching, or temporary laser bumps, but these typically subside within a day or two when following proper aftercare.\n\nYour Carisma Aesthetics clinician will provide detailed aftercare instructions during your appointment to ensure a smooth recovery and optimal results. If you have any concerns, our team is always here to guide you through the process." },
  { q: "How does laser hair removal work?", a: "Laser hair removal utilizes precise light pulses to target and eliminate actively growing hair follicles in areas such as the legs, underarms, face, bikini line, and more. The treatment works by focusing on the melanin (pigment) within the hair follicle, which absorbs the laser energy. This energy then travels down to effectively disrupt the hair root and its surrounding structures, preventing future growth while ensuring smooth, long-lasting results." },
  { q: "How do I prepare a laser hair removal treatment?", a: "Please refrain from waxing or tweezing for at least six weeks prior to your laser hair removal treatment. Additionally, avoid sun exposure and spray tans for two weeks before your appointment." },
  { q: "How many treatments will i need?", a: "The number of sessions required depends on the density of your hair and the area being treated. Since laser hair removal targets only hair follicles in the active growth phase, multiple sessions are necessary, whether you're treating your legs, underarms, face, back, bikini area, or other areas. On average, we recommend six to eight treatments, spaced six to eight weeks apart (with slight variations for the face)." },
  { q: "Who can't get laser hair removal?", a: "The great news: Our lasers are effective for all skin types and can treat most hair and skin combinations on areas like the legs, underarms, face, back, bikini area, and more. The only exception: Since our lasers target hair pigment, we are unable to treat light blonde, red, grey, or white body hair." },
  { q: "Why laser hair removal at Carisma?", a: "At Carisma, we are Malta's leading wellness chain with over 30 years of experience. Our team of medically qualified practitioners ensures you receive the highest standard of care. We offer a central and discreet location for your convenience and create personalised treatment plans tailored to your specific needs." },
];

const SECTION = { padding: "70px 0" } as const;

export default function LaserHairRemovalPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section style={{ background: "url('/assets/hero-bg.png') center / cover no-repeat", padding: "40px 0 60px" }}>
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* LEFT */}
            <Reveal>
              <p className="font-display" style={{ fontSize: "12px", color: "var(--gold-deep)", letterSpacing: "0.12em" }}>World-renowned Alma Soprano for the first time in Malta</p>
              <h1 className="font-serif" style={{ fontSize: "clamp(32px,4.6vw,50px)", color: "var(--gold-deep)", letterSpacing: "0.04em", marginTop: "10px", textTransform: "uppercase" }}>Laser Hair Removal</h1>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 600, lineHeight: 1.5, marginTop: "16px", color: "var(--label)" }}>
                Permanently Smooth, Hair-Free Skin with our Virtually <span style={{ color: "var(--gold-deep)" }}>Painfree SHR® guarantee</span>:
              </p>
              <ul className="space-y-3" style={{ marginTop: "22px" }}>
                {BENEFITS.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${IMG}/laser-ic-check.png`} alt="" style={{ width: "20px", height: "20px", marginTop: "2px", flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "15px", color: "var(--label)", lineHeight: 1.5 }}>{b.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* RIGHT — video + image collage + captions */}
            <Reveal delay={120}>
              <div className="overflow-hidden rounded-xl" style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.14)" }}>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video src={`${IMG}/laser-hero-video.mp4`} autoPlay muted loop playsInline className="w-full" style={{ display: "block", aspectRatio: "16 / 10", objectFit: "cover" }} />
              </div>
              <div className="grid grid-cols-2 gap-4" style={{ marginTop: "16px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${IMG}/laser-hero.png`} alt="Alma Soprano Platinum laser hair removal machine" className="w-full rounded-xl" style={{ display: "block", objectFit: "cover", aspectRatio: "1 / 1", boxShadow: "0 14px 34px rgba(0,0,0,0.12)" }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${IMG}/laser-hero-photo2.png`} alt="Laser hair removal results" className="w-full rounded-xl" style={{ display: "block", objectFit: "cover", aspectRatio: "1 / 1", boxShadow: "0 14px 34px rgba(0,0,0,0.12)" }} />
              </div>
              <p className="font-display text-center" style={{ fontSize: "12px", color: "var(--gold-deep)", letterSpacing: "0.1em", marginTop: "18px", lineHeight: 1.5 }}>Experience the triple wavelength laser hair removal difference</p>
              <div className="text-center" style={{ marginTop: "20px" }}>
                <p className="font-display" style={{ fontSize: "12px", color: "var(--gold-deep)", letterSpacing: "0.1em" }}>intercontinental hotel &nbsp;|&nbsp; st. julian's</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "11px", color: "var(--gold-deep)", lineHeight: 1.6, marginTop: "12px", maxWidth: "420px", marginInline: "auto" }}>Minors may undergo this procedure only with the presence of a parent or legal guardian during the session.</p>
                <div className="flex items-center justify-center gap-2" style={{ marginTop: "16px" }}>
                  <span className="flex" style={{ color: "var(--gold-deep)" }}>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    ))}
                  </span>
                  <span className="font-display" style={{ fontSize: "12px", color: "var(--gold-deep)", letterSpacing: "0.08em" }}>3,000+ 5 star reviews</span>
                </div>
                {/* scroll down cue */}
                <div className="flex flex-col items-center" style={{ marginTop: "28px" }}>
                  <span className="font-display" style={{ fontSize: "11px", color: "var(--gold-deep)", letterSpacing: "0.14em" }}>scroll down</span>
                  <span className="flex items-start justify-center" style={{ width: "26px", height: "42px", border: "1.5px solid var(--gold-deep)", borderRadius: "14px", marginTop: "10px", paddingTop: "7px" }}>
                    <svg className="animate-bounce" width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold-deep)" strokeWidth="2"><path d="M12 4v12M6 12l6 6 6-6" /></svg>
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ TRUST BAR ============ */}
      <section style={{ backgroundColor: "var(--white)", padding: "26px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-center">
            {["malta's leading wellness chain", "medically qualified practitioners", "30+ years of excellence"].map((t) => (
              <span key={t} className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${IMG}/laser-ic-check.png`} alt="" style={{ width: "22px", height: "22px" }} />
                <span className="font-display" style={{ fontSize: "12px", color: "var(--gold-deep)", letterSpacing: "0.1em" }}>{t}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MARBLE BODY ============ */}
      <div style={{ background: `url('${IMG}/laser-marble.jpg') top center / cover`, backgroundAttachment: "local" }}>
        {/* ---- EDUCATION ---- */}
        <section style={SECTION}>
          <div className="container text-center">
            <Kicker>laser hair removal In Malta</Kicker>
            <SerifHeading style={{ marginTop: "10px" }}>what is all the hype?</SerifHeading>
            <div className="mx-auto" style={{ maxWidth: "880px", marginTop: "24px" }}>
              {["Laser hair removal is a popular alternative to waxing and shaving. This is largely due to the fact that laser hair removal provides permanent results and is less expensive than maintaining a waxing and shaving routine for a lifetime.",
                "Additionally, there's no recovery time needed after a treatment—so no more doing the waxing-waddle or battling razor burn.",
                "Our treatments are safe, and all of our procedures are performed by Authorized Alma Practitioners. We use CE & FDA-cleared lasers that are tailored to your specific skin type & hair color."].map((p, i) => (
                <p key={i} style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.85, marginTop: i ? "16px" : 0 }}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ---- GUARANTEE ---- */}
        <section style={SECTION}>
          <div className="container">
            <SerifHeading>never shave again. guaranteed.</SerifHeading>
            <div className="grid gap-12 lg:grid-cols-2 items-center" style={{ marginTop: "44px" }}>
              <CompositeSlideshow images={[`${IMG}/laser-ba1.png`, `${IMG}/laser-ba2.png`, `${IMG}/laser-ba3.png`, `${IMG}/laser-ba4.png`]} />
              <div>
                <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.85 }}>We're so confident in our technology that we guarantee visible hair reduction after <b style={{ color: "var(--label)", fontWeight: 600 }}>just 3 sessions</b> — or your <b style={{ color: "var(--label)", fontWeight: 600 }}>next one is free</b>.</p>
                <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.85, marginTop: "16px" }}>And when we say it's <b style={{ color: "var(--label)", fontWeight: 600 }}>virtually painless</b>, we mean it. Our patented <b style={{ color: "var(--label)", fontWeight: 600 }}>SHR® and ICE Plus™ technology</b> make this one of the most comfortable laser experiences available today.</p>
                <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.85, marginTop: "16px" }}>Book your <b style={{ color: "var(--label)", fontWeight: 600 }}>free consultation</b> today and feel the difference for yourself.</p>
                <div style={{ marginTop: "28px" }}><BookButton /></div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- PROCESS ---- */}
        <section style={SECTION}>
          <div className="container text-center">
            <Kicker>our process</Kicker>
            <SerifHeading style={{ marginTop: "10px" }}>a seamless journey to silky, hair free skin</SerifHeading>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4" style={{ marginTop: "50px" }}>
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={(i % 4) * 80} className="text-center flex flex-col items-center">
                  <div style={{ height: "84px", display: "flex", alignItems: "center" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${IMG}/${s.icon}`} alt={s.title} style={{ maxHeight: "80px", width: "auto" }} />
                  </div>
                  <div className="font-serif" style={{ fontSize: "20px", color: "var(--gold-deep)", letterSpacing: "0.1em", margin: "14px 0 6px", textTransform: "uppercase" }}>step {s.n}</div>
                  <h3 className="font-display" style={{ fontSize: "13px", color: "var(--gold-deep)", letterSpacing: "0.06em", marginBottom: "12px" }}>{s.title}</h3>
                  <p style={{ fontSize: "13.5px", color: "var(--label)", lineHeight: 1.7 }}>{s.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- PRICING ---- */}
        <section style={SECTION}>
          <div className="container">
            <Kicker>Laser Hair removal pricing</Kicker>
            <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 mx-auto" style={{ maxWidth: "960px", marginTop: "44px" }}>
              {PRICES.map((p, i) => (
                <Reveal key={p.name} delay={(i % 2) * 70} className="flex items-start gap-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${IMG}/${p.icon}`} alt={p.name} style={{ width: "82px", height: "auto", flexShrink: 0 }} />
                  <div>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-serif" style={{ fontSize: "18px", color: "var(--gold-deep)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{p.name}</span>
                      {(() => {
                        const m = p.price.match(/^(from|FROM)\s+(.*)$/);
                        const qual = m ? m[1] : "";
                        const amount = m ? m[2] : p.price;
                        return (
                          <span className="font-display" style={{ color: "var(--gold-deep)", letterSpacing: "0.04em" }}>
                            <span style={{ fontSize: "13px" }}>| {qual} </span>
                            <span style={{ fontSize: "18px" }}>{amount}</span>
                          </span>
                        );
                      })()}
                    </div>
                    <p style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.7, marginTop: "10px" }}>{p.desc}</p>
                    <div className="flex flex-wrap gap-2" style={{ marginTop: "14px" }}>
                      {p.tags.map((t) => (
                        <span key={t} className="font-display" style={{ fontSize: "11px", color: "var(--white)", background: "var(--gold)", letterSpacing: "0.06em", padding: "6px 14px", borderRadius: "999px" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- MEMBERSHIP ---- */}
        <section style={SECTION}>
          <div className="container text-center">
            <Kicker>Laser Hair removal pricing</Kicker>
            <p className="mx-auto" style={{ maxWidth: "900px", fontSize: "14px", color: "var(--label)", lineHeight: 1.8, marginTop: "20px" }}>Choose from three tailored membership tiers — Bronze, Silver, or Gold — based on your treatment duration and coverage needs. Each option offers six sessions at exclusive pricing, making it easier than ever to commit to smooth, hair-free skin on your terms.</p>
            <div className="grid gap-8 md:grid-cols-3 mx-auto" style={{ maxWidth: "1000px", marginTop: "44px" }}>
              {TIERS.map((t, i) => (
                <Reveal key={t.name} delay={(i % 3) * 90} className="text-center" style={{ background: "rgba(255,255,255,0.5)", border: "1px solid var(--line)", borderRadius: "16px", padding: "26px 24px 30px", boxShadow: "0 12px 30px rgba(0,0,0,0.05)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${IMG}/${t.image}`} alt={t.name} className="mx-auto" style={{ display: "block", width: "100%", maxWidth: "260px", borderRadius: "10px", boxShadow: "0 8px 22px rgba(0,0,0,0.12)" }} />
                  <h3 className="font-serif" style={{ fontSize: "20px", color: "var(--gold-deep)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "22px" }}>{t.name}</h3>
                  <div className="flex items-center justify-center gap-2" style={{ marginTop: "14px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${IMG}/laser-ic-check.png`} alt="" style={{ width: "20px", height: "20px" }} />
                    <span style={{ fontSize: "14px", color: "var(--label)" }}>{t.sessions}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2" style={{ marginTop: "12px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${IMG}/laser-ic-euro.png`} alt="" style={{ width: "20px", height: "20px" }} />
                    <span className="font-serif" style={{ fontSize: "20px", color: "var(--gold-deep)" }}>{t.price}</span>
                  </div>
                  {t.tags.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2" style={{ marginTop: "16px" }}>
                      {t.tags.map((tag) => (
                        <span key={tag} className="font-display" style={{ fontSize: "11px", color: "var(--white)", background: "var(--gold)", letterSpacing: "0.06em", padding: "6px 14px", borderRadius: "999px" }}>{tag}</span>
                      ))}
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
            <div className="mx-auto" style={{ maxWidth: "820px", marginTop: "48px", background: "rgba(255,255,255,0.55)", border: "1px solid var(--line)", borderRadius: "16px", padding: "clamp(26px,3vw,38px)" }}>
              <p className="font-display" style={{ fontSize: "15px", color: "var(--gold-deep)", letterSpacing: "0.02em", lineHeight: 1.7 }}>
                <span style={{ fontWeight: 700 }}>We stand by our promise</span>: See visible results in <span style={{ fontWeight: 700 }}>3 sessions</span> or your <span style={{ fontWeight: 700 }}>next one is free.</span>
              </p>
              <p style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.7, marginTop: "12px" }}>Book your <span style={{ color: "var(--gold-deep)", fontWeight: 600 }}>private consultation</span> today and discover the effortless elegance of lasting smooth skin.</p>
              <div style={{ marginTop: "24px" }}><BookButton /></div>
            </div>
          </div>
        </section>

        {/* ---- SUITABILITY ---- */}
        <section style={SECTION}>
          <div className="container">
            <div className="text-center">
              <Kicker>Laser hair removal selection criteria</Kicker>
              <SerifHeading style={{ marginTop: "10px" }}>selective by intention. successful by design.</SerifHeading>
              <div className="mx-auto" style={{ maxWidth: "880px", marginTop: "22px" }}>
                {["We only take on clients where we know we can deliver exceptional, lasting results.",
                  "After a thorough consultation and patch test, if we don't believe our treatment fits your skin, hair type, or expectations, we'll be honest—and part ways without wasting your time or money.",
                  "This commitment to integrity and results is why our client satisfaction rate remains among the highest in the industry."].map((p, i) => (
                  <p key={i} style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.8, marginTop: i ? "14px" : 0 }}>{p}</p>
                ))}
              </div>
            </div>
            <div className="grid gap-12 md:grid-cols-2 mx-auto" style={{ maxWidth: "1000px", marginTop: "48px" }}>
              <div>
                <h3 className="font-serif" style={{ fontSize: "18px", color: "var(--gold-deep)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "22px" }}>suitable for:</h3>
                <ul className="space-y-4">
                  {SUITABLE.map((s) => (
                    <li key={s} className="flex items-start gap-3"><Check size={24} /><span style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.55 }}>{s}</span></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-serif" style={{ fontSize: "18px", color: "var(--gold-deep)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "22px" }}>not suitable for:</h3>
                <ul className="space-y-4">
                  {NOT_SUITABLE.map((s) => (
                    <li key={s} className="flex items-start gap-3"><Cross size={24} /><span style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.55 }}>{s}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---- TECH CHART ---- */}
        <section style={SECTION}>
          <div className="container text-center">
            <SerifHeading>super hair removal technology</SerifHeading>
            <div className="mx-auto" style={{ maxWidth: "860px", marginTop: "22px" }}>
              <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.8 }}>Our advanced laser technology utilizes <b style={{ fontWeight: 600 }}>Super Hair Removal (SHR) technology</b>, making it <b style={{ fontWeight: 600 }}>suitable for all skin tones</b> and capable of effectively treating <b style={{ fontWeight: 600 }}>most hair types</b>.</p>
              <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.8, marginTop: "16px" }}>Designed to provide safe, efficient, and comfortable hair removal, our system ensures optimal results for a diverse range of patients, regardless of their skin type or hair texture.</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/laser-suitability-chart.png`} alt="Skin tone and hair colour suitability chart for laser hair removal" className="mx-auto" style={{ display: "block", width: "100%", maxWidth: "480px", marginTop: "40px" }} />
            <div style={{ marginTop: "36px" }}><BookButton /></div>
          </div>
        </section>

        {/* ---- WHY CHOOSE ---- */}
        <section style={SECTION}>
          <div className="container">
            <SerifHeading>#1 award winning chain in malta</SerifHeading>
            <div className="grid gap-12 lg:grid-cols-2 items-center mx-auto" style={{ maxWidth: "1040px", marginTop: "40px" }}>
              <Reveal style={{ background: "rgba(255,255,255,0.55)", border: "1px solid var(--line)", borderRadius: "16px", padding: "clamp(28px,3.5vw,42px)", boxShadow: "0 12px 30px rgba(0,0,0,0.05)" }}>
                <h3 className="font-display" style={{ fontSize: "20px", color: "var(--label)", letterSpacing: "0.04em", marginBottom: "22px" }}>why choose carisma?</h3>
                <ul className="space-y-4">
                  {WHY.map((w) => (
                    <li key={w} className="flex items-start gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`${IMG}/laser-ic-check.png`} alt="" style={{ width: "20px", height: "20px", marginTop: "2px", flexShrink: 0 }} />
                      <span className="font-display" style={{ fontSize: "14px", color: "var(--gold-deep)", letterSpacing: "0.02em", lineHeight: 1.5 }}>{w}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={120}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${IMG}/laser-hero-photo2.png`} alt="Laser hair removal at Carisma Aesthetics Malta" className="w-full rounded-xl" style={{ display: "block", objectFit: "cover", aspectRatio: "4 / 3", boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }} />
              </Reveal>
            </div>
            <p className="font-display text-center" style={{ fontSize: "18px", color: "var(--gold-deep)", letterSpacing: "0.02em", marginTop: "40px" }}>slots reserved on first come first serve basis</p>
          </div>
        </section>

        {/* ---- CTA BAND ---- */}
        <section style={{ padding: "30px 0 70px" }}>
          <div className="container text-center">
            <SerifHeading style={{ letterSpacing: "0.1em" }}>begin your path to pain-free,<br />long-lasting hair removal</SerifHeading>
            <p className="font-display" style={{ fontSize: "14px", color: "var(--gold-deep)", letterSpacing: "0.02em", marginTop: "20px", lineHeight: 1.7 }}>
              Be Part of Malta's <span style={{ fontWeight: 700 }}>Smoothest Success Stories</span><br />Discover Why Clients Across the Globe Choose <span style={{ fontWeight: 700 }}>Alma Soprano</span>
            </p>
            <div style={{ marginTop: "26px" }}><BookButton /></div>
          </div>
        </section>

        {/* ---- ALMA SOPRANO TECHNOLOGY ---- */}
        <section style={SECTION}>
          <div className="container text-center">
            <Kicker>OUR TECHNOLOGY</Kicker>
            <SerifHeading style={{ marginTop: "10px" }}>ALMA SOPRANO</SerifHeading>
            <p className="mx-auto" style={{ maxWidth: "900px", fontSize: "15px", color: "var(--label)", lineHeight: 1.85, marginTop: "22px" }}>
              Not all laser hair removal is created equal. Carisma has Malta's first and only internationally acclaimed <span style={{ color: "var(--gold-deep)", fontWeight: 600 }}>Alma Soprano</span> laser regarded as the <span style={{ color: "var(--gold-deep)", fontWeight: 600 }}>gold standard in laser hair removal technology today</span>—best for comfort, clinical reliability, and seamless triple-wavelength delivery.
            </p>

            {/* effective */}
            <h3 className="font-serif" style={{ fontSize: "25px", color: "var(--gold-deep)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "48px" }}>effective</h3>
            <p className="mx-auto" style={{ maxWidth: "860px", fontSize: "15px", color: "var(--label)", lineHeight: 1.85, marginTop: "16px" }}>
              Tired of laser treatments that take forever to see results? Our <span style={{ color: "var(--gold-deep)", fontWeight: 600 }}>triple-wavelength laser</span> simultaneously targets hair at multiple depths, delivering superior results in fewer sessions—no matter your skin tone or hair type.
            </p>

            {/* wavelengths */}
            <div className="grid gap-6 md:grid-cols-3 items-start mx-auto" style={{ maxWidth: "980px", marginTop: "40px" }}>
              {WAVELENGTHS.map((w, i) => (
                <div key={w.nm} className="relative text-center">
                  <p className="font-display" style={{ fontSize: "13px", color: "var(--gold-deep)", letterSpacing: "0.06em" }}>-wavelength-</p>
                  <div className="font-serif" style={{ fontSize: "clamp(30px,3.6vw,40px)", color: "var(--gold-deep)", letterSpacing: "0.02em", lineHeight: 1.1 }}>{w.nm}</div>
                  <p className="font-display" style={{ fontSize: "13px", color: "var(--gold-deep)", letterSpacing: "0.04em", marginTop: "6px" }}>{w.lead}</p>
                  <div className="font-serif" style={{ fontSize: "18px", color: "var(--gold-deep)", letterSpacing: "0.06em", marginTop: "8px" }}>{w.name}</div>
                  <p style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.6, marginTop: "10px" }}>{w.desc}</p>
                  {i < WAVELENGTHS.length - 1 && (
                    <span aria-hidden className="hidden md:block font-serif" style={{ position: "absolute", right: "-18px", top: "26px", fontSize: "28px", color: "var(--gold-deep)" }}>+</span>
                  )}
                </div>
              ))}
            </div>

            {/* comparison diagram */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/laser-comparison.png`} alt="Candela vs Alma Soprano vs Diode laser comparison" className="mx-auto" style={{ display: "block", width: "100%", maxWidth: "940px", marginTop: "44px" }} />
            <div className="grid gap-6 md:grid-cols-3 mx-auto" style={{ maxWidth: "940px", marginTop: "20px" }}>
              <p style={{ fontSize: "13.5px", color: "var(--label)", lineHeight: 1.6 }}><span style={{ color: "var(--gold-deep)", fontWeight: 600 }}>Candela</span> hair removal lasers utilise only the <span style={{ color: "var(--gold-deep)", fontWeight: 600 }}>Alex and ND:Yag</span> wavelengths</p>
              <p style={{ fontSize: "13.5px", color: "var(--label)", lineHeight: 1.6 }}>With its exclusive <span style={{ color: "var(--gold-deep)", fontWeight: 600 }}>3D technology</span>, <span style={{ color: "var(--gold-deep)", fontWeight: 600 }}>Soprano</span> unites all <span style={{ color: "var(--gold-deep)", fontWeight: 600 }}>three most efficient</span> wavelengths in one device</p>
              <p style={{ fontSize: "13.5px", color: "var(--label)", lineHeight: 1.6 }}>Traditional <span style={{ color: "var(--gold-deep)", fontWeight: 600 }}>Diode</span> lasers have a tendancy to <span style={{ color: "var(--gold-deep)", fontWeight: 600 }}>miss finer or darker hairs</span></p>
            </div>

            {/* painfree */}
            <h3 className="font-serif" style={{ fontSize: "25px", color: "var(--gold-deep)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "56px" }}>painfree</h3>
            <div className="grid gap-10 lg:grid-cols-2 items-center mx-auto" style={{ maxWidth: "1000px", marginTop: "24px", textAlign: "left" }}>
              <div>
                <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.85 }}>Our lasers' SHR technology is the only clinically proven laser hair removal method that is virtually painless.</p>
                <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.85, marginTop: "14px" }}>Traditional lasers shock the skin with painful pulses—our <span style={{ color: "var(--gold-deep)", fontWeight: 600 }}>Super Hair Removal (SHR) technology</span> gradually heats the hair follicles for a virtually painless experience. This prevents regrowth and avoids injury to the surrounding tissue often seen with single pulse lasers.</p>
                <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.85, marginTop: "14px" }}><span style={{ color: "var(--gold-deep)", fontWeight: 600 }}>The patented ICE Plus™ cooling system</span> keeps skin comfortable throughout treatment. This cooling technology can bring the contact temparature as low as -4°C making this is the most comfortable laser available in the market.</p>
              </div>
              <div className="mx-auto overflow-hidden rounded-xl" style={{ width: "100%", maxWidth: "440px", boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }}>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video src={`${IMG}/laser-painfree-video.mp4`} autoPlay muted loop playsInline className="w-full" style={{ display: "block", aspectRatio: "4 / 3", objectFit: "cover" }} />
              </div>
            </div>

            {/* safe */}
            <h3 className="font-serif" style={{ fontSize: "25px", color: "var(--gold-deep)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "56px" }}>safe</h3>
            <div className="mx-auto" style={{ maxWidth: "900px", marginTop: "20px" }}>
              <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.85 }}>Alma Soprano is the go-to laser for top-tier dermatologists and luxury aesthetic clinics, trusted in over 80 countries and chosen by celebrities like <span style={{ color: "var(--gold-deep)", fontWeight: 600 }}>Kim Kardashian</span>, <span style={{ color: "var(--gold-deep)", fontWeight: 600 }}>Victoria Beckham</span>, and <span style={{ color: "var(--gold-deep)", fontWeight: 600 }}>Coleen Rooney</span>.</p>
              <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.85, marginTop: "14px" }}>This safety profile is backed by FDA and CE approvals, our laser is a medical-grade device offering unmatched safety especially important in warmer climates like Malta, where skin is more prone to sensitivity and post-treatment irritation.</p>
            </div>

            {/* celebrity polaroids */}
            <div className="grid gap-6 sm:grid-cols-3 mx-auto" style={{ maxWidth: "820px", marginTop: "44px" }}>
              {CELEBS.map((c, i) => (
                <Reveal key={c.name} delay={(i % 3) * 90} className="text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${IMG}/${c.image}`} alt={c.name} className="w-full" style={{ display: "block", borderRadius: "6px", boxShadow: "0 12px 30px rgba(0,0,0,0.12)" }} />
                  <p className="font-display" style={{ fontSize: "13px", color: "var(--gold-deep)", letterSpacing: "0.08em", marginTop: "14px" }}>{c.name}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <section style={SECTION}>
          <div className="container">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mx-auto" style={{ maxWidth: "1080px", marginBottom: "36px" }}>
              <h2 className="font-serif" style={{ fontSize: "clamp(24px,3.2vw,32px)", color: "var(--gold-deep)", letterSpacing: "0.06em", fontWeight: 400 }}>Frequently asked questions</h2>
              <span className="relative" style={{ width: "260px", maxWidth: "100%" }}>
                <input type="search" aria-label="Search FAQs" placeholder="Looking for something?" style={{ width: "100%", padding: "10px 38px 10px 16px", border: "none", borderBottom: "1px solid var(--line)", background: "transparent", fontSize: "13px", color: "var(--label)" }} />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-deep)" strokeWidth="1.6" style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
              </span>
            </div>
            <FaqAccordion items={FAQS} uppercase={false} />
          </div>
        </section>

        {/* ---- IN SUMMARY ---- */}
        <section style={{ padding: "70px 0 90px" }}>
          <div className="container text-center">
            <Kicker>in summary</Kicker>
            <SerifHeading style={{ marginTop: "10px" }}>your journey to smooth, redefined by carisma</SerifHeading>
            <p className="mx-auto" style={{ maxWidth: "900px", fontSize: "15px", color: "var(--label)", lineHeight: 1.85, marginTop: "22px" }}>Imagine the results you'd get if you removed hair every day for years—our team has performed thousands of treatments using the world's most advanced technology, refining every detail to deliver a laser hair removal experience that's truly unmatched.</p>
            <div className="grid gap-x-16 gap-y-10 sm:grid-cols-2 mx-auto" style={{ maxWidth: "880px", marginTop: "48px", textAlign: "left" }}>
              {SUMMARY.map((s, i) => (
                <Reveal key={i} delay={(i % 2) * 80} className="flex items-center gap-5">
                  <span className="font-serif" style={{ fontSize: "46px", color: "var(--gold-deep)", opacity: 0.5, lineHeight: 1 }}>{i + 1}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${IMG}/${s.icon}`} alt="" style={{ height: "60px", width: "auto", flexShrink: 0 }} />
                  <span className="font-display" style={{ fontSize: "15px", color: "var(--gold-deep)", letterSpacing: "0.02em", lineHeight: 1.45 }}>{s.text}</span>
                </Reveal>
              ))}
            </div>
            <div style={{ marginTop: "52px" }}>
              <SerifHeading style={{ marginBottom: "26px" }}>start your smooth skin journey today</SerifHeading>
              <BookButton />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
