"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";

/*
  Snatch Your Jawline — bespoke sales-funnel package page.
  One-to-one recreation of https://www.carismaaesthetics.com/snatch-your-jawline
  Content quoted verbatim from the live Wix page; assets under /assets/packages/jawline.
  Reuses global Header/Footer (app/layout.tsx) and design tokens (globals.css).
*/

const A = "/assets/packages/jawline";

function Chevron() {
  return (
    <svg width="9" height="12" viewBox="0 0 9 12" fill="none" style={{ marginLeft: "4px" }} aria-hidden>
      <path d="M2 1l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CtaButton({ children = "CLAIM MY SPOT NOW" }: { children?: string }) {
  return (
    <Link href="/consultation" className="btn btn-teal" style={{ padding: "15px 34px", borderRadius: "3px" }}>
      {children}
      <Chevron />
    </Link>
  );
}

/* small teal bullet dot list item */
function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3" style={{ padding: "5px 0" }}>
      <span style={{ color: "var(--teal)", fontSize: "11px", lineHeight: 1.9 }}>●</span>
      <span style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.6 }}>{children}</span>
    </li>
  );
}

const TESTIMONIALS = [
  {
    img: `${A}/testi-1.png`,
    quote:
      "Finally found my jawline again! I've always had a rounder face, no matter how much I worked out. This treatment honestly changed that. I feel more confident in photos, and the best part is it still looks super natural.",
    name: "Rachelle A.",
  },
  {
    img: `${A}/testi-2.png`,
    quote:
      "Visible results without surgery! I always thought I needed something drastic to deal with my double chin, but this treatment proved me wrong. It was quick, comfortable, and the contour is so much better already. Even my husband noticed!",
    name: "Nadia G.",
  },
  {
    img: `${A}/testi-3.png`,
    quote:
      "Exactly what I needed. I'd been avoiding photos because of the loose skin under my jaw. The treatment didn't just reduce the fullness — it actually redefined the shape. So happy I did this",
    name: "Carmen B.",
  },
  {
    img: `${A}/testi-4.png`,
    quote:
      "I was always self-conscious about my double chin, especially in photos. Decided to try the fat dissolving treatment and honestly — I wish I did it sooner. The whole process was smooth, barely any downtime, and after a few weeks, I noticed a clear difference. Jawline looks more defined and the area under my chin is much tighter. Highly recommend it to any guy thinking about it.",
    name: "Daniel A.",
  },
];

const PRESS = [
  { src: `${A}/press-lovin.jpg`, alt: "Lovin Malta" },
  { src: `${A}/press-maltadaily.jpg`, alt: "Malta Daily" },
  { src: `${A}/press-bay.jpg`, alt: "89.7 Bay" },
  { src: `${A}/press-times.png`, alt: "Times of Malta" },
  { src: `${A}/press-mttoday.png`, alt: "Malta Today" },
];

const BENEFITS = [
  { icon: `${A}/icon-instant.png`, title: "Instant Definition", desc: "Notice a visibly sharper, tighter jawline right after your first session." },
  { icon: `${A}/icon-fatdissolve.png`, title: "Fat-Dissolving Power", desc: "Advanced injections gently melt stubborn chin fat for a refined contour." },
  { icon: `${A}/icon-skintighten.png`, title: "Skin Tightening Effect", desc: "Our laser & LED combo lifts and firms the skin — no surgery, no scars." },
  { icon: `${A}/icon-safe.png`, title: "Safe & Certified", desc: "Conducted by certified experts with medical-grade, clinically proven technology." },
];

const REDEFINED_POINTS = [
  "Visible Contour Boost – Sculpted, youthful jawline after the first session",
  "Smooth & Tight Skin – Reduces sagging and restores firmness",
  "No Surgery, No Downtime – Gentle, safe, and effective",
  "Luxury Meets Science – Advanced technology performed by certified professionals",
];

const STATS = [
  { metric: "Procedure time", value: "20-30 minutes" },
  { metric: "Downtime", value: "7-14 days of swelling" },
  { metric: "Results last for", value: "Permanent" },
  { metric: "Results visible in", value: "2 weeks or more" },
  { metric: "Anaesthetic", value: "None" },
];

const EXPECT = [
  {
    label: "before",
    img: `${A}/wte-before.png`,
    points: [
      "Share your concerns and objectives with our expert practitioners and answer any questions.",
      "Discuss any medical conditions, allergies, and medications with your provider.",
      "Avoid alcohol, blood thinners, and aspirin for 24 hours prior to the procedure.",
    ],
  },
  {
    label: "at session",
    img: `${A}/wte-session.png`,
    points: [
      "Our expert practitioner will mark the injection areas and use a fine needle to inject the solution into the targeted areas.",
      "Communicate any discomfort or concerns to the practitioner during the procedure.",
      "Relax and remain still during the procedure to ensure accuracy and safety.",
    ],
  },
  {
    label: "after",
    img: `${A}/wte-after.jpg`,
    points: [
      "Avoid rubbing or massaging the injection areas for at least 24 hours.",
      "Refrain from exercise, alcohol, and saunas for at least 24 hours.",
      "Results may take 2-4 weeks to appear",
    ],
  },
];

const FAQS = [
  {
    q: "What can I expect during a Fat Dissolving treatment?",
    a: "During a Fat dissolving treatment, a qualified practitioner will administer a series of small injections under in the treated area, such as under chin, stomach and thighs. The number of injections and the amount of product used will depend on your specific needs and desired results. The procedure typically takes about 20-30 minutes to complete, and most patients require multiple treatment sessions spaced several weeks apart for optimal results.",
  },
  {
    q: "Is Fat Dissolving painful?",
    a: "Some discomfort may be experienced during the injections, but it's generally well-tolerated. To minimize pain, your practitioner may apply a topical numbing cream or use a local anesthetic before the injections. Some patients may also experience a mild burning sensation during the treatment, which usually subsides shortly after the procedure.",
  },
  {
    q: "What is the recovery time for Fat Dissolving treatments?",
    a: "After a Fat Dissolving treatment, you may experience some swelling, bruising, or redness in the treated area. These side effects are typically mild and subside within a few days to a week. Most people can return to their normal activities immediately after treatment, but it's essential to follow your practitioner's post-treatment care instructions to ensure proper healing and optimal results.",
  },
  {
    q: "How long does it take to see the results of Fat Dissolving?",
    a: "Results from Fat Dissolving treatments typically become noticeable within two to four weeks after your initial treatment session. It's important to remember that multiple sessions may be needed to achieve your desired results, and the number of sessions will depend on the amount of fat being treated and your individual response to the treatment.",
  },
  {
    q: "How long do the results of Fat Dissolving?",
    a: "The great thing about our Fat Dissolving is that the results are long-lasting. Once the fat cells under the treated areas are destroyed, they cannot store or accumulate fat again. As long as you maintain a stable weight, your treatments results should be permanent.",
  },
  {
    q: "Are there any side effects or risks associated with Fat Dissolving?",
    a: "As with any cosmetic treatment, there can be side effects and risks associated with Fat Dissolving. Common side effects include swelling, bruising, redness, and discomfort at the injection site. In rare cases, more serious complications may occur, such as nerve injury that can cause an uneven smile or facial muscle weakness (when applied on under chin fat). It's essential to consult with a qualified practitioner to minimise risks and ensure proper treatment.",
  },
  {
    q: "Who is a suitable candidate for Fat Dissolving treatment?",
    a: "Fat dissolving is ideal for individuals with minimal to moderate localizes fat who want to improve the appearance without surgery. It is not suitable for those with severe localized fat or individuals with loose, sagging skin in the treatment area. A thorough consultation with a qualified practitioner is necessary to determine if it's the right treatment for you.",
  },
  {
    q: "What parts of the body you can treat with Fat Dissolving?",
    a: "Some of the areas we can treat with fat dissolving are: Double chin, Back fat, Arm fat (bingo wing area), stomach fat and six-pack definition, Flanks and waist, Inner and outer thighs, under the buttocks, fat above knees and other areas that have minimal to moderate localized fat.",
  },
];

const WHY_CARISMA = [
  "Team of highly trained and Medically qualified practitioners",
  "Central and discrete location",
  "Flexible scheduling and booking",
  "Personalised treatment plans",
  "Advanced treatments with cutting edge technology",
];

const RECOMMENDED = [
  { label: "dermal FILLERS", img: `${A}/rec-dermal.png`, href: "/dermal-fillers-malta" },
  { label: "thread lift", img: `${A}/rec-thread.png`, href: "/thread-lift-malta" },
  { label: "collagen stimulator", img: `${A}/rec-collagen.png`, href: "/collagen-stimulator-malta" },
];

/* shared section heading (Trajan, gold) */
function SerifHeading({ children, align = "center", size = "clamp(22px,3vw,32px)", style }: { children: React.ReactNode; align?: "center" | "left"; size?: string; style?: React.CSSProperties }) {
  return (
    <h2 className="font-serif" style={{ fontSize: size, color: "var(--gold)", letterSpacing: "0.05em", lineHeight: 1.25, textAlign: align, ...style }}>
      {children}
    </h2>
  );
}

export default function SnatchYourJawline() {
  const [openFaq, setOpenFaq] = useState(0);
  const [tab, setTab] = useState(1); // 0 = AQUALYX, 1 = LEMON BOTTLE

  return (
    <>
      {/* ===== HERO ===== */}
      <section style={{ background: "linear-gradient(180deg,#eef3f3 0%, #ffffff 100%)", padding: "34px 0 56px" }}>
        <div className="container">
          <div
            style={{
              borderRadius: "26px",
              background: "linear-gradient(160deg,#e8f0f0 0%, #f6fafa 45%, #eef4f4 100%)",
              border: "1px solid var(--line)",
              padding: "clamp(26px,3.5vw,48px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
            }}
          >
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              {/* left */}
              <Reveal>
                <h1 className="font-serif" style={{ fontSize: "clamp(30px,4.6vw,50px)", color: "var(--gold)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  snatch your jawline
                </h1>
                <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.6, marginTop: "18px" }}>
                  For those in Malta ready to <strong style={{ color: "var(--teal-deep)", fontWeight: 600 }}>snatch their jawline</strong> — this non-surgical, low-downtime treatment <strong style={{ color: "var(--teal-deep)", fontWeight: 600 }}>melts chin fat, reverses sagging, and restores lasting definition</strong> at every age.
                </p>

                <p style={{ fontSize: "15px", color: "var(--ink-soft)", fontWeight: 600, marginTop: "24px", marginBottom: "10px" }}>What&apos;s Included in the Snatch Your Jawline Package:</p>
                <ul>
                  <Bullet>Fat-Dissolving Injection (€150 value)</Bullet>
                  <Bullet>LED Radiance Therapy (€50 value)</Bullet>
                  <Bullet>Skin Tightening Laser (€100 value)</Bullet>
                  <Bullet>€40 Carisma Aesthetics Credit (€40 value)</Bullet>
                  <Bullet>In-Person Consultation (€60 value)</Bullet>
                </ul>
                <p style={{ fontSize: "15px", color: "var(--ink-soft)", fontWeight: 600, marginTop: "16px" }}>Total Value: €400 – Today: €149 Only.</p>
                <p style={{ fontSize: "12.5px", color: "var(--muted)", lineHeight: 1.6, marginTop: "16px", fontStyle: "italic" }}>
                  Due to high demand, packages are offered based on availability and may not always be guaranteed. Please inquire for current options.
                </p>

                <div style={{ marginTop: "26px" }}>
                  <CtaButton />
                </div>

                {/* google rating */}
                <div className="flex items-center flex-wrap gap-x-2 gap-y-1" style={{ marginTop: "24px", fontSize: "13px", color: "var(--label)" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" /><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" /></svg>
                  <span style={{ fontWeight: 600 }}>4.9</span>
                  <span className="flex" style={{ color: "var(--teal)" }}>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    ))}
                  </span>
                  <span className="font-display" style={{ color: "var(--teal)", fontSize: "11px", letterSpacing: "0.1em" }}>TOP-RATED CLINIC IN MALTA</span>
                </div>

                {/* trust checks */}
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

              {/* right: hero video */}
              <Reveal delay={120}>
                <div style={{ borderRadius: "18px", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.14)" }}>
                  <video
                    poster={`${A}/hero-video-poster.jpg`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full"
                    style={{ display: "block", aspectRatio: "317 / 394", objectFit: "cover" }}
                  >
                    <source src={`${A}/hero-video.mp4`} type="video/mp4" />
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
          <SerifHeading size="clamp(19px,2.4vw,26px)">
            THE SECRET TO VISIBLY MORE BEAUTIFUL SKIN –<br />OUR CUSTOMERS SHOW YOU HOW.
          </SerifHeading>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" style={{ marginTop: "40px" }}>
            {TESTIMONIALS.map((t, i) => (
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

      {/* ===== SO YOUR JAWLINE TURNS HEADS ===== */}
      <section style={{ padding: "72px 0" }}>
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <SerifHeading align="left" size="clamp(20px,2.6vw,28px)">SO YOUR JAWLINE TURNS HEADS —</SerifHeading>
              <div style={{ marginTop: "22px", fontSize: "15px", color: "var(--label)", lineHeight: 1.8 }}>
                <p>Do you ever catch your reflection and wish your jawline looked sharper again?</p>
                <p style={{ marginTop: "16px" }}>You look in the mirror and notice a softer chin line, a little sagging, or stubborn fat that wasn&apos;t there before.</p>
                <p style={{ marginTop: "16px" }}>With our Snatch Your Jawline treatment, you can bring back that definition and confidence — no surgery, no downtime.</p>
                <p style={{ marginTop: "16px" }}>After just one session, you&apos;ll see the difference… and even better, you&apos;ll feel it. Because a sculpted, defined jawline doesn&apos;t just change your profile — it changes how you carry yourself every day.</p>
                <p style={{ marginTop: "16px" }}>Your face is your first impression. Let&apos;s make it unforgettable.</p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${A}/so-jawline.png`} alt="Defined jawline result" className="w-full" style={{ display: "block", borderRadius: "10px", aspectRatio: "1 / 1", objectFit: "cover", boxShadow: "0 18px 44px rgba(0,0,0,0.10)" }} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== MALTA'S TOP CLINIC (press + benefits) ===== */}
      <section style={{ padding: "20px 0 80px" }}>
        <div className="container">
          <SerifHeading size="clamp(20px,2.8vw,30px)">MALTA&apos;S TOP CLINIC FOR NON-SURGICAL<br />JAWLINE CONTOURING</SerifHeading>
          <p className="text-center" style={{ fontSize: "13px", color: "var(--muted)", letterSpacing: "0.04em", marginTop: "14px" }}>Times of Malta, Lovin Malta, Elle, Cosmopolitan</p>
          <div className="flex flex-wrap items-center justify-center" style={{ gap: "28px", marginTop: "26px" }}>
            {PRESS.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p.alt} src={p.src} alt={p.alt} style={{ height: "44px", width: "auto", objectFit: "contain" }} />
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" style={{ marginTop: "48px" }}>
            {BENEFITS.map((b, i) => (
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

      {/* ===== CREATED FOR WOMEN ===== */}
      <section style={{ padding: "20px 0 40px" }}>
        <div className="container">
          <SerifHeading size="clamp(20px,2.8vw,30px)">CREATED FOR WOMEN WHO REFUSE TO COMPROMISE<br />ON THEIR CONFIDENCE.</SerifHeading>
          <div className="grid gap-12 lg:grid-cols-2 items-center" style={{ marginTop: "44px" }}>
            <Reveal>
              <ul>
                <Bullet>Because you want a visibly sculpted, defined jawline that enhances your natural beauty.</Bullet>
                <Bullet>Because you deserve the refined look that only a premium, non-surgical treatment can deliver.</Bullet>
                <Bullet>Because you prefer gentle, effective solutions that respect your skin and your time.</Bullet>
                <Bullet>Because you accept nothing less than treatments performed at the highest aesthetic standards.</Bullet>
              </ul>
            </Reveal>
            <Reveal delay={120}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${A}/created-women.jpg`} alt="Jawline treatment" className="w-full" style={{ display: "block", borderRadius: "10px", aspectRatio: "1 / 1", objectFit: "cover", boxShadow: "0 18px 44px rgba(0,0,0,0.10)" }} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== 35+ YEARS divider ===== */}
      <section style={{ padding: "30px 0 10px" }}>
        <div className="container">
          <SerifHeading size="clamp(18px,2.4vw,26px)">35+ YEARS DELIVERING RESULTS</SerifHeading>
        </div>
      </section>

      {/* ===== COMMITMENT / WHY ===== */}
      <section style={{ padding: "30px 0 70px" }}>
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 mx-auto" style={{ maxWidth: "960px" }}>
            <Reveal>
              <h3 className="font-display" style={{ fontSize: "13px", color: "var(--teal)", letterSpacing: "0.14em", marginBottom: "18px" }}>OUR COMMITMENT</h3>
              <ul className="space-y-3">
                {["Visible Contour Boost – Sculpted, youthful jawline after the first session", "Smooth & Tight Skin – Reduces sagging and restores firmness", "No Surgery, No Downtime – Gentle, safe, and effective", "Luxury Meets Science – Advanced technology performed by certified professionals"].map((t) => (
                  <li key={t} className="flex items-start gap-3"><span style={{ color: "var(--teal)", fontSize: "11px", lineHeight: 1.9 }}>●</span><span style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.6 }}>{t}</span></li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="font-display" style={{ fontSize: "13px", color: "var(--teal)", letterSpacing: "0.14em", marginBottom: "18px" }}>WHY MALTA CHOOSES CRISMA</h3>
              <ul className="space-y-3">
                {["Over 30 years of experience", "Medical-grade technology trusted by medical doctors", "Customized treatments for every skin type", "A legacy of results and client satisfaction"].map((t) => (
                  <li key={t} className="flex items-start gap-3"><span style={{ color: "var(--teal)", fontSize: "11px", lineHeight: 1.9 }}>●</span><span style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.6 }}>{t}</span></li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="text-center" style={{ marginTop: "44px" }}>
            <CtaButton>CLAIM YOUR SPOT NOW</CtaButton>
          </div>
        </div>
      </section>

      {/* ===== SECURE EXCLUSIVE OFFER ===== */}
      <section style={{ background: "var(--beige)", padding: "64px 0" }}>
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <SerifHeading align="left" size="clamp(20px,2.6vw,28px)">SECURE YOUR EXCLUSIVE<br />JAWLINE SCULPTING OFFER NOW</SerifHeading>
              <div style={{ marginTop: "22px", fontSize: "15px", color: "var(--label)", lineHeight: 1.8 }}>
                <p>Our special launch offer is available only for a limited time — after that, the regular price applies.</p>
                <p style={{ marginTop: "16px" }}>Experience the transformative power of our Snatch Your Jawline treatment now just €149 (regularly €400).</p>
                <p style={{ marginTop: "16px" }}>In just 45 minutes, you&apos;ll see and feel a visibly more defined, sculpted jawline that restores confidence and balance to your face.</p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${A}/offer-laser.jpg`} alt="Skin tightening laser" className="w-full" style={{ display: "block", borderRadius: "10px", aspectRatio: "489 / 549", objectFit: "cover", boxShadow: "0 18px 44px rgba(0,0,0,0.12)" }} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== GET YOUR JAWLINE BACK ===== */}
      <section style={{ padding: "72px 0" }}>
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <SerifHeading align="left" size="clamp(20px,2.6vw,28px)">GET YOUR JAWLINE BACK. SHARPER. DEFINED. YOU.</SerifHeading>
              <p style={{ marginTop: "18px", fontSize: "15px", color: "var(--label)", lineHeight: 1.7 }}>A fast, gentle treatment that melts chin fat and tightens skin — no surgery, no downtime.</p>
              <ul style={{ marginTop: "20px" }}>
                <Bullet>Only €149 instead of €400 — exclusive limited-time offer</Bullet>
                <Bullet>45-Minute Treatment — visible results in one session</Bullet>
                <Bullet>Gentle &amp; Safe — non-surgical, medical-grade precision</Bullet>
                <Bullet>Malta&apos;s Luxury Aesthetics Clinic — personal care in a premium environment</Bullet>
              </ul>
            </Reveal>
            <Reveal delay={120}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${A}/get-jawline.jpg`} alt="Refined jawline" className="w-full" style={{ display: "block", borderRadius: "10px", aspectRatio: "1 / 1", objectFit: "cover", boxShadow: "0 18px 44px rgba(0,0,0,0.10)" }} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== YOUR JAWLINE REDEFINED (+ product tabs + stats) ===== */}
      <section style={{ padding: "20px 0 80px" }}>
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${A}/redefined.png`} alt="Jawline profile" className="w-full" style={{ display: "block", borderRadius: "10px", aspectRatio: "1 / 1", objectFit: "cover", boxShadow: "0 18px 44px rgba(0,0,0,0.10)" }} />
            </Reveal>
            <Reveal delay={120}>
              <SerifHeading align="left" size="clamp(20px,2.6vw,28px)">YOUR JAWLINE — REDEFINED.</SerifHeading>
              <p style={{ marginTop: "16px", fontSize: "14.5px", color: "var(--teal-deep)", lineHeight: 1.6 }}>See how our Snatch Your Jawline treatment lifts, tightens, and sculpts for lasting definition.</p>
              <ul style={{ marginTop: "18px" }}>
                {REDEFINED_POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-3" style={{ padding: "4px 0" }}><span style={{ color: "var(--muted)", fontSize: "12px", lineHeight: 1.8 }}>•</span><span style={{ fontSize: "13.5px", color: "var(--muted)", lineHeight: 1.6 }}>{p}</span></li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* product tabs + stats */}
          <div className="mx-auto" style={{ maxWidth: "760px", marginTop: "56px" }}>
            <div className="flex" style={{ gap: "30px", borderBottom: "1px solid var(--line)", paddingBottom: "0" }}>
              {["AQUALYX", "LEMON BOTTLE"].map((label, i) => (
                <button
                  key={label}
                  onClick={() => setTab(i)}
                  className="font-serif"
                  style={{
                    fontSize: "clamp(18px,2.4vw,24px)",
                    letterSpacing: "0.04em",
                    color: tab === i ? "var(--ink)" : "var(--teal)",
                    paddingBottom: "8px",
                    borderBottom: tab === i ? "2px solid var(--ink)" : "2px solid transparent",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <div style={{ marginTop: "28px" }}>
              {STATS.map((s, i) => (
                <div key={s.metric} className="flex items-center gap-4" style={{ padding: "14px 0", borderTop: i === 0 ? "none" : "1px solid var(--line)" }}>
                  <span className="shrink-0 inline-flex items-center justify-center" style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid var(--teal-200)" }}>
                    <StatIcon metric={s.metric} />
                  </span>
                  <span style={{ flex: "0 0 200px", fontSize: "14px", color: "var(--ink-soft)", fontWeight: 600 }}>{s.metric}</span>
                  <span style={{ fontSize: "14px", color: "var(--muted)" }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT TO EXPECT ===== */}
      <section style={{ padding: "20px 0 80px" }}>
        <div className="container">
          <SerifHeading size="clamp(18px,2.4vw,26px)" style={{ textTransform: "none" }}>what to expect during your Fat dissolving treatment?</SerifHeading>
          <div className="grid gap-6 md:grid-cols-3" style={{ marginTop: "44px" }}>
            {EXPECT.map((col, i) => (
              <Reveal key={col.label} delay={(i % 3) * 80}>
                <p className="font-display text-center" style={{ fontSize: "13px", color: "var(--teal)", letterSpacing: "0.14em", marginBottom: "16px" }}>{col.label}</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={col.img} alt={col.label} className="w-full" style={{ display: "block", borderRadius: "8px", aspectRatio: "278 / 221", objectFit: "cover", marginBottom: "16px" }} />
                <div className="space-y-3">
                  {col.points.map((pt) => (
                    <p key={pt} style={{ background: "var(--cream)", borderRadius: "6px", padding: "14px 16px", fontSize: "13px", color: "var(--label)", lineHeight: 1.6 }}>{pt}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
            {FAQS.map((f, i) => (
              <div key={f.q} style={{ borderBottom: "1px solid var(--line)" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="flex items-center justify-between w-full text-left"
                  style={{ padding: "22px 0", background: "none", cursor: "pointer", gap: "20px" }}
                >
                  <span style={{ fontSize: "16px", color: "var(--gold)" }}>{f.q}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" style={{ flexShrink: 0, transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.25s" }}><path d="M6 9l6 6 6-6" /></svg>
                </button>
                {openFaq === i && (
                  <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.8, padding: "0 0 24px" }}>{f.a}</p>
                )}
              </div>
            ))}
            <div className="text-center" style={{ marginTop: "44px" }}>
              <CtaButton />
            </div>
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
              {WHY_CARISMA.map((p) => (
                <li key={p} className="flex items-start gap-3"><span style={{ color: "var(--label)", fontSize: "12px", lineHeight: 1.8 }}>•</span><span className="font-display" style={{ fontSize: "12px", color: "var(--label)", letterSpacing: "0.06em", lineHeight: 1.6 }}>{p}</span></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ===== RECOMMENDED ===== */}
      <section style={{ padding: "70px 0" }}>
        <div className="container">
          <h2 className="font-display text-center" style={{ fontSize: "clamp(16px,2.2vw,22px)", color: "var(--gold)", letterSpacing: "0.12em" }}>recommended with fat dissolving</h2>
          <div className="grid gap-6 sm:grid-cols-3 mx-auto" style={{ marginTop: "40px", maxWidth: "920px" }}>
            {RECOMMENDED.map((r, i) => (
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

      {/* ===== REAL PEOPLE, REAL REVIEWS ===== */}
      {/* Heading sits directly above the global Footer's shared DoctorsSection
          (Giovanni / Francesca / Zaid) + "#1 Voted" closing — matching the live order. */}
      <section style={{ padding: "30px 0 0" }}>
        <div className="container text-center">
          <h2 className="font-serif" style={{ fontSize: "clamp(20px,2.6vw,28px)", color: "var(--teal)", letterSpacing: "0.06em", display: "inline-block", borderBottom: "1px solid var(--teal-200)", paddingBottom: "14px" }}>REAL PEOPLE, REAL REVIEWS</h2>
        </div>
      </section>
    </>
  );
}

/* stat icons (matches the live treatment-info iconography) */
function StatIcon({ metric }: { metric: string }) {
  const m = metric.toLowerCase();
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "var(--teal)", strokeWidth: 1.5 } as const;
  if (m.includes("procedure") || m.includes("time")) return (<svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
  if (m.includes("downtime")) return (<svg {...common}><circle cx="12" cy="12" r="9" /><path d="M9 12h6M12 9v6" /></svg>);
  if (m.includes("last")) return (<svg {...common}><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>);
  if (m.includes("visible")) return (<svg {...common}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>);
  return (<svg {...common}><path d="M18 2l4 4-9 9-4 1 1-4z" /><path d="M14 6l4 4" /></svg>);
}
