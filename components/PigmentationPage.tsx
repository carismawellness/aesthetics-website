"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const A = "/assets/treatments";
// WCAG AA: prior #98afb2 (2.31:1 on white) / #96b2b2 (white text 2.26:1) failed.
// Darkened toward the same teal hue → teal-deep, brand-consistent.
const TEAL = "#3f6363"; // headings: 6.61:1 on white, 4.14:1 on page bg
const SAGE = "#3f6363"; // CTA fill: white text 6.61:1
// Deep taupe-gold for body copy that sits over the light page background image
// (gold-deep #9c8344 only reached 2.36–3.66:1). 5.0–8.0:1 across all backgrounds.
const GOLD_TEXT = "#5c4f32";

// clamp min 22px non-bold = "normal" text; used on both white and the light page bg,
// so use the deeper teal #345252 (5.31:1 on page bg) so it clears 4.5:1 at the smallest size everywhere
function Serif({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h2 className="font-serif text-center" style={{ fontSize: "clamp(22px,3vw,30px)", color: "#345252", letterSpacing: "0.06em", fontWeight: 400, lineHeight: 1.3, ...style }}>
      {children}
    </h2>
  );
}

function Cta({ label }: { label: string }) {
  return (
    <Link href="/consultation" className="font-display flex items-center justify-center pig-cta"
      style={{ width: "100%", maxWidth: "470px", background: SAGE, color: "#fff", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "15px 24px", borderRadius: "999px", cursor: "pointer", transition: "transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease" }}>
      {label} <span aria-hidden style={{ marginLeft: "8px" }}>›</span>
    </Link>
  );
}

function Dot() {
  return <span style={{ color: TEAL, fontSize: "11px", lineHeight: 1.8, flexShrink: 0 }}>●</span>;
}

function Stars() {
  return (
    <div className="flex items-center" style={{ marginTop: "14px", gap: "6px" }}>
      {[0,1,2,3,4].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#d4a017" aria-hidden>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span style={{ fontSize: "12px", color: GOLD_TEXT, marginLeft: "4px" }}>4,9/5 from over 200 customer reviews</span>
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
const INCLUDED = [
  "Personal skin and pigmentation assessment before treatment",
  "Advanced Pico laser technology for precise pigment targeting",
  "Ultra-short laser pulses designed to break down excess pigment",
  "A personalised treatment plan based on your skin type and concern",
  "Aftercare guidance to support safe healing and optimal results",
];

const TRUST_BAR = ["MALTA'S LEADING WELLNESS CHAIN", "30+ YEARS OF EXPERTISE", "MEDICALLY QUALIFIED"];

function Hero() {
  return (
    <section style={{ padding: "24px 0" }}>
      <div className="container">
        <div className="hero-panel" style={{ backgroundImage: "url(/assets/bg-gradient.png)", backgroundSize: "cover", backgroundPosition: "center", borderRadius: "26px", padding: "clamp(22px,3vw,40px)" }}>
          <div className="pig-hero-grid grid gap-10 items-start">
            <div className="hero-copy">
              {/* clamp min 20px non-bold = normal text on the hero gradient → #345252 = 5.x:1 clears 4.5:1 */}
              <h1 className="font-serif" style={{ fontSize: "clamp(20px,2vw,28px)", color: "#345252", letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 400, lineHeight: 1.12, margin: 0 }}>
                pico laser pigmentation treatment
              </h1>
              <p style={{ color: GOLD_TEXT, fontSize: "14px", fontWeight: 600, lineHeight: 1.7, marginTop: "16px", maxWidth: "440px" }}>
                Advanced Pico laser technology to visibly reduce unwanted pigmentation and restore a clearer, brighter, more even-looking complexion.
              </p>
              <p className="font-display" style={{ color: GOLD_TEXT, fontSize: "14px", fontWeight: 600, letterSpacing: "0.02em", marginTop: "22px", marginBottom: "10px" }}>
                What&apos;s Included:
              </p>
              <ul className="space-y-2">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Dot />
                    <span style={{ color: GOLD_TEXT, fontSize: "13.5px", lineHeight: 1.55 }}>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-display" style={{ color: GOLD_TEXT, fontSize: "15px", fontWeight: 600, letterSpacing: "0.02em", marginTop: "22px" }}>
                Treatments From €79 Per Session
              </p>
              {/* opacity removed: at 0.75 the 11px disclaimer flattened to ~3.1:1; full-opacity GOLD_TEXT = 5.18:1 */}
              <p style={{ color: GOLD_TEXT, fontSize: "11px", lineHeight: 1.6, marginTop: "12px", maxWidth: "440px" }}>
                Due to high demand, appointments are offered subject to availability. Results and the number of sessions required may vary depending on your skin type and pigmentation concern.
              </p>
              <Link href="/consultation" className="font-display flex items-center justify-center pig-cta"
                style={{ marginTop: "24px", width: "100%", maxWidth: "470px", background: SAGE, color: "#fff", fontSize: "14px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "16px 24px", borderRadius: "999px", cursor: "pointer", transition: "transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease" }}>
                Reserve Your Pico Laser Session <span aria-hidden style={{ marginLeft: "8px" }}>›</span>
              </Link>
              <div className="flex items-center gap-2" style={{ marginTop: "20px" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" /><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" /></svg>
                <span style={{ fontWeight: 600, fontSize: "13px", color: GOLD_TEXT }}>4.9</span>
                <span className="flex" style={{ color: "#d4a017" }}>{[0,1,2,3,4].map((i) => (<svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>))}</span>
                <span className="font-display" style={{ fontSize: "11px", color: GOLD_TEXT, letterSpacing: "0.08em" }}>TOP-RATED CLINIC IN MALTA</span>
              </div>
            </div>

            <div className="pig-hero-collage" style={{ position: "relative", aspectRatio: "1 / 1.08" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${A}/pig-hero-main.png`} alt="Pico laser pigmentation treatment on arm" style={{ position: "absolute", top: 0, left: 0, width: "62%", borderRadius: "4px", filter: "drop-shadow(0 14px 30px rgba(0,0,0,0.14))" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${A}/pig-hero-tile1.png`} alt="Face pigmentation before and after" style={{ position: "absolute", top: "20%", right: 0, width: "47%", borderRadius: "4px", filter: "drop-shadow(0 16px 34px rgba(0,0,0,0.16))" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${A}/pig-hero-ba.png`} alt="Pigmentation before and after composite" style={{ position: "absolute", bottom: 0, left: "2%", width: "45%", borderRadius: "4px", filter: "drop-shadow(0 14px 30px rgba(0,0,0,0.16))" }} />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4" style={{ marginTop: "40px" }}>
          {TRUST_BAR.map((label) => (
            <div key={label} className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${A}/laser-ic-check.png`} alt="" aria-hidden style={{ width: "22px", height: "22px" }} />
              <span className="font-display" style={{ fontSize: "12px", color: GOLD_TEXT, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .pig-hero-grid { grid-template-columns: 1.12fr 0.88fr; }
        }
      `}</style>
    </section>
  );
}

// ─── REVIEWS ──────────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    img: `${A}/pig-rev1.png`,
    alt: "Face pigmentation before and after result",
    body: "I had stubborn pigmentation across my cheek that makeup never fully covered. After my Pico laser treatment, the darker spots on my cheek became noticeably lighter, and the area looked smoother, clearer and more even. The practitioner explained every step and made the treatment feel comfortable. I now feel much more confident showing my skin without heavy makeup.",
    name: "Marisa C.",
  },
  {
    img: `${A}/pig-rev2.png`,
    alt: "Hand pigmentation before and after result",
    body: "I had noticeable sunspots and uneven pigmentation on the back of my hand, which made my hands look older than they felt. After my Pico laser treatments, the darker spots became much lighter and the skin on my hand looked clearer, smoother and more even. The treatment was quick, and the practitioner explained the process and aftercare clearly. I'm very happy with the visible improvement.",
    name: "Daniela V.",
  },
  {
    img: `${A}/pig-rev3.png`,
    alt: "Arm pigmentation before and after result",
    body: "I had uneven pigmentation and small dark spots across my forearm that became more noticeable over time. After my Pico laser treatments, the skin on my forearm looked clearer, smoother and much more even in tone. The treatment was comfortable, and the practitioner explained the aftercare clearly. I'm very pleased with how much brighter and more refined the area now looks.",
    name: "Lara B.",
  },
  {
    img: `${A}/pig-rev4.png`,
    alt: "Back pigmentation before and after result",
    body: "I had uneven pigmentation and darker patches across my upper back and shoulders, which made me feel self-conscious in open-back clothing. After my Pico laser treatments, the area looked noticeably clearer, smoother and more even in tone. The practitioner made me feel comfortable throughout the treatment and gave me clear aftercare advice. I feel much more confident showing my back now.",
    name: "Nicole F.",
  },
];

function Reviews() {
  return (
    <section style={{ padding: "70px 24px" }}>
      <Serif>precision pigmentation care in malta</Serif>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ maxWidth: "1160px", margin: "40px auto 0", gap: "24px" }}>
        {REVIEWS.map((r) => (
          <div key={r.name} className="flex flex-col review-card"
            style={{ borderRadius: "16px", background: "rgba(255,255,255,0.6)", border: "1px solid rgba(120,160,165,0.5)", boxShadow: "0 12px 30px rgba(0,0,0,0.05)", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={r.img} alt={r.alt} style={{ display: "block", width: "100%", aspectRatio: "2 / 1", objectFit: "cover" }} />
            <div className="flex flex-col" style={{ padding: "20px" }}>
              <p style={{ fontSize: "13px", color: "var(--label)", lineHeight: 1.7, fontStyle: "italic", margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>
                {r.body}
              </p>
              <span style={{ fontSize: "13px", color: GOLD_TEXT, marginTop: "10px", textDecoration: "underline", textUnderlineOffset: "2px" }}>Read more</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#4a4a4a", marginTop: "14px" }}>- {r.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── DO YOU HAVE ──────────────────────────────────────────────────────────────
function DoYouHave() {
  return (
    <section style={{ paddingTop: "60px", paddingBottom: "60px" }}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            {/* clamp min 20px non-bold = normal text; deepen to #345252 (5.31:1 on page bg) to clear 4.5:1 even at the smallest size */}
            <p className="font-serif" style={{ fontSize: "clamp(20px,2.6vw,26px)", color: "#345252", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 400, lineHeight: 1.25 }}>
              so your skin looks like yours again -confidently.
            </p>
            {/* 18px non-bold = "normal" text per WCAG, needs 4.5:1; #3f6363 only hit 4.14 on the page bg, so use a deeper teal here (5.31:1) */}
            <h2 className="font-serif" style={{ fontSize: "18px", color: "#345252", letterSpacing: "0.02em", fontWeight: 400, lineHeight: 1.3, marginTop: "12px" }}>
              Do you have pigmentation you no longer want to carry?
            </h2>
            <p style={{ fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: 1.8, marginTop: "20px" }}>
              Whether it comes from sun exposure, post-acne marks, melasma, or uneven skin tone, unwanted pigmentation can feel frustrating. You&rsquo;re not alone &mdash; and safe, gradual improvement is possible with the right technology and care.
            </p>
            <p style={{ fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: 1.8, marginTop: "14px" }}>
              With our advanced Pico Laser Pigmentation treatment, ultra-short laser pulses target excess pigment beneath the skin, helping break it into tiny particles so your body can naturally clear it over time.
            </p>
            <p style={{ fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: 1.8, marginTop: "14px" }}>
              Every skin concern is different. Your treatment plan is personalised based on your pigmentation type, depth, skin tone, and skin goals to support safer treatment and more even-looking results.
            </p>
            <p style={{ fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: 1.8, marginTop: "14px" }}>
              Your skin can feel clearer, brighter, and more balanced again. Let&rsquo;s help you begin with confidence.
            </p>
            <div style={{ marginTop: "28px" }}><Cta label="Reserve Your Clearer-Skin Session" /></div>
          </div>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/pig-redefined.png`} alt="Face pigmentation reducing over multiple Pico laser sessions — 1x to 4x progress" className="rounded-xl"
              style={{ width: "100%", objectFit: "cover", boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TRUSTED FEATURES ─────────────────────────────────────────────────────────
const FEATURES = [
  { icon: "pig-feat1.png", label: "PRECISE PIGMENT TARGETING", desc: "Precisely targets excess pigment beneath the skin." },
  { icon: "pig-feat2.png", label: "GENTLER SKIN RENEWAL", desc: "Designed to break down pigment without relying on intense heat." },
  { icon: "pig-feat3.png", label: "PERSONALISED SKIN PLAN", desc: "Tailored to your pigmentation type, skin tone, depth, and goals." },
  { icon: "pig-feat4.png", label: "EXPERT AFTERCARE", desc: "Professional guidance before and after treatment for safer results." },
];

const PRESS = [
  "/assets/press/lovin-malta.jpeg",
  "/assets/press/malta-daily.png",
  "/assets/press/bay.jpeg",
  "/assets/press/times-of-malta.png",
  "/assets/press/malta-today.jpg",
];

function TrustedFeatures() {
  return (
    <section style={{ padding: "50px 0", background: "#ffffff" }}>
      <div className="container text-center">
        <Serif>malta&apos;s trusted pigmentation clinic</Serif>
        <p className="mx-auto" style={{ maxWidth: "740px", fontSize: "14px", color: "var(--label)", lineHeight: 1.7, marginTop: "16px" }}>
          Advanced Pico laser technology, personalised skin plans, and medically guided care for unwanted pigmentation.
        </p>
        <div className="flex flex-wrap items-center justify-center" style={{ gap: "30px", marginTop: "30px" }}>
          {PRESS.map((l) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={l} src={l} alt="" style={{ height: "30px", width: "auto", objectFit: "contain" }} />
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ marginTop: "44px" }}>
          {FEATURES.map((f) => (
            <div key={f.label} className="text-center card"
              style={{ background: "#ffffff", border: `1px solid ${TEAL}`, borderRadius: "16px", padding: "28px 22px" }}>
              <div className="flex justify-center" style={{ marginBottom: "16px", height: "68px", alignItems: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${A}/${f.icon}`} alt={f.label} style={{ width: "68px", height: "68px", objectFit: "contain" }} />
              </div>
              <h3 className="font-display" style={{ fontSize: "13px", color: TEAL, letterSpacing: "0.06em", marginBottom: "10px" }}>{f.label}</h3>
              <p style={{ fontSize: "13px", color: "var(--label)", lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BECAUSE ──────────────────────────────────────────────────────────────────
const BECAUSE = [
  "Because uneven pigmentation can affect how confident you feel in your skin.",
  "Because you want a careful, professional approach — not harsh or rushed treatment.",
  "Because Pico laser technology helps target excess pigment with focused precision.",
  "Because every skin concern is different, and your treatment plan should be too.",
  "Because you deserve honest guidance, realistic expectations, and expert aftercare from start to finish.",
];

function Because() {
  return (
    <section style={{ background: "#ffffff", padding: "60px 0" }}>
      <div className="mx-auto" style={{ maxWidth: "1040px", padding: "0 24px" }}>
        <h2 className="font-serif text-center" style={{ fontSize: "clamp(22px,3vw,30px)", color: TEAL, letterSpacing: "0.06em", lineHeight: 1.3, fontWeight: 400, marginBottom: "40px", textTransform: "uppercase" }}>
          Safe, Confident Pigmentation Care Starts Here.
        </h2>
        <div className="grid lg:grid-cols-2 items-center gap-12">
          <div>
            <ul style={{ listStyle: "disc", margin: 0, paddingLeft: "22px" }}>
              {BECAUSE.map((item) => (
                <li key={item} style={{ color: GOLD_TEXT, fontSize: "15px", lineHeight: 1.6, marginBottom: "12px" }}>{item}</li>
              ))}
            </ul>
            <div style={{ marginTop: "24px" }}><Cta label="Claim Pigmentation Care" /></div>
            <Stars />
          </div>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/pig-because.png`} alt="Woman with facial pigmentation looking down"
              style={{ width: "100%", aspectRatio: "800 / 747", objectFit: "cover", borderRadius: "12px", boxShadow: "0 16px 40px rgba(0,0,0,0.12)", display: "block" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── COMMITMENT ───────────────────────────────────────────────────────────────
const COMMITMENT: [string, string][] = [
  ["Safe Pigmentation Care", "A careful approach designed to gradually reduce visible pigmentation."],
  ["Pico Laser Precision", "Targets excess pigment using ultra-short laser pulses."],
  ["Personalised Treatment Plans", "Every plan is based on your skin tone, concern, depth, and goals."],
  ["Honest Expectations", "We explain the process clearly, including the number of sessions you may need."],
  ["Professional Aftercare", "Guidance before and after each session to support safe skin recovery."],
];

const WHY_TRUST = [
  "Trusted by clients seeking safer, professional pigmentation care in Malta.",
  "Performed by qualified aesthetic specialists using advanced laser technology.",
  "Suitable for sun spots, freckles, post-acne marks, and uneven skin tone.",
  "A calm, medically guided experience from consultation to aftercare.",
];

function Commitment() {
  return (
    <section style={{ padding: "40px 0 60px", background: "#ffffff" }}>
      <div className="container">
        <Serif style={{ textTransform: "uppercase" }}>35+ years helping malta feel confident.</Serif>
        <div className="grid gap-12 lg:grid-cols-2" style={{ marginTop: "40px", alignItems: "start" }}>
          {/* LEFT: text content */}
          <div>
            <h3 className="font-display" style={{ fontSize: "13px", color: TEAL, letterSpacing: "0.1em", marginBottom: "16px", textTransform: "uppercase" }}>Our Commitment</h3>
            <ul style={{ listStyle: "disc", paddingLeft: "20px", marginBottom: "28px" }}>
              {COMMITMENT.map(([t, d]) => (
                <li key={t} style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.6, marginBottom: "10px" }}>
                  <b style={{ color: "var(--label)", fontWeight: 600 }}>{t}</b> — {d}
                </li>
              ))}
            </ul>
            <h3 className="font-display" style={{ fontSize: "13px", color: TEAL, letterSpacing: "0.1em", marginBottom: "16px", textTransform: "uppercase" }}>Why Malta Trusts Our Pico Laser Treatment</h3>
            <ul style={{ listStyle: "disc", paddingLeft: "20px", marginBottom: "28px" }}>
              {WHY_TRUST.map((w) => (
                <li key={w} style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.6, marginBottom: "10px" }}>{w}</li>
              ))}
            </ul>
            <Cta label="Get My First Pigmentation Session" />
          </div>
          {/* RIGHT: Google Map */}
          <div style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", height: "480px" }}>
            <iframe
              title="Carisma Aesthetics Location"
              src="https://maps.google.com/maps?q=St.+George%27s+Bay%2C+St+Julian%27s+STJ+3310%2C+Malta&hl=en&z=14&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECURE ───────────────────────────────────────────────────────────────────
const SECURE_PARAS = [
  "Our professional pigmentation consultation is available for a limited time — once appointments are filled, the next available slots may be later.",
  "Whether you want to reduce sun spots, freckles, post-acne marks, or uneven skin tone, our Pico Laser treatment is designed to target unwanted pigment with focused precision.",
  "During your consultation, we assess your skin type, pigmentation depth, treatment area, and goals before creating a personalised treatment plan.",
  "No rushed promises — just honest guidance, realistic expectations, and expert care from start to finish.",
];

function Secure() {
  return (
    <section style={{ padding: "30px 0 60px" }}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <Serif style={{ textAlign: "left" }}>SECURE YOUR PICO LASER PIGMENTATION CONSULTATION TODAY</Serif>
            {SECURE_PARAS.map((p, i) => (
              <p key={i} style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.8, marginTop: i ? "12px" : "18px" }}>{p}</p>
            ))}
            <div style={{ marginTop: "26px" }}><Cta label="Book Pigmentation Treatment Now" /></div>
          </div>
          <Reveal delay={120}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/pig-hero-main.png`} alt="Pico laser pigmentation consultation"
              className="w-full rounded-xl" style={{ display: "block", objectFit: "cover", aspectRatio: "4 / 3", boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── FADE UNWANTED ────────────────────────────────────────────────────────────
const FADE = [
  "Targets excess pigment with ultra-short Pico laser pulses",
  "Helps reduce sun spots, freckles, and post-acne marks",
  "Suitable for localised areas or uneven pigmentation",
  "Personalised plan based on skin tone, concern, and depth",
  "Medically guided treatment with clear aftercare support",
  "Trusted aesthetic specialists across Malta",
];

function FadeUnwanted() {
  return (
    <section style={{ padding: "60px 0", background: "transparent" }}>
      <div className="container">
        <div className="pig-fade-grid grid items-center gap-10">
          <div>
            <h2 className="font-serif" style={{ fontSize: "clamp(26px,3.5vw,38px)", color: TEAL, letterSpacing: "0.06em", fontWeight: 400, lineHeight: 1.2, textTransform: "uppercase" }}>
              Fade Unwanted Pigment. Feel More Like You.
            </h2>
            {/* body copy is 14px normal text over the light page bg → needs 4.5:1; deeper teal #345252 = 5.31:1 */}
            <p style={{ color: "#345252", fontSize: "14px", lineHeight: 1.7, marginTop: "18px" }}>
              Advanced Pico Laser pigmentation care designed for clearer, brighter-looking skin and personalised results.
            </p>
            <ul className="space-y-3" style={{ marginTop: "22px", listStyle: "none", padding: 0 }}>
              {FADE.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Dot />
                  <span style={{ color: "#345252", fontSize: "14px", lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "32px" }}><Cta label="Treat Your Pigmentation Today" /></div>
            <Stars />
          </div>
          <div className="pig-fade-imgs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/pig-fade.png`} alt="Hand pigmentation before and after Pico laser treatment"
              style={{ width: "100%", borderRadius: "12px", boxShadow: "0 16px 40px rgba(0,0,0,0.12)", display: "block" }} />
          </div>
        </div>
      </div>
      <style>{`
        @media (min-width: 1024px) {
          .pig-fade-grid { grid-template-columns: 1fr 1fr; }
          .pig-fade-imgs { align-self: stretch; }
          .pig-fade-imgs img { height: 100%; object-fit: cover; }
        }
      `}</style>
    </section>
  );
}

// ─── BRIGHTER / CLEARER (Redefined equivalent) ────────────────────────────────
const BRIGHTER_BULLETS = [
  { label: "Precise Pigment Targeting", desc: "Targets excess pigment beneath the skin using ultra-short Pico pulses." },
  { label: "Gentler Technology", desc: "Helps break down pigment without relying on intense heat." },
  { label: "Personalised Plan", desc: "Treatment is tailored to your concern, skin tone, depth, and treatment area." },
  { label: "Safe, Expert Care", desc: "Performed by trained aesthetic specialists with clear aftercare guidance." },
];

function Brighter() {
  return (
    <section style={{ padding: "70px 24px", background: "#ffffff" }}>
      <div className="pig-brighter-grid grid items-center" style={{ maxWidth: "1060px", margin: "0 auto", gap: "56px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${A}/pig-brighter.png`} alt="Woman with facial pigmentation — Pico laser before and after result"
          style={{ width: "100%", aspectRatio: "9 / 10", objectFit: "cover", borderRadius: "14px", boxShadow: "0 16px 40px rgba(0,0,0,0.12)", display: "block" }} />
        <div>
          <h2 className="font-serif" style={{ fontSize: "clamp(22px,3vw,30px)", color: TEAL, letterSpacing: "0.06em", fontWeight: 400, lineHeight: 1.3, textTransform: "uppercase" }}>
            Your Skin — Brighter, Clearer.
          </h2>
          <p style={{ color: TEAL, fontSize: "14px", lineHeight: 1.7, marginTop: "14px" }}>
            See how advanced Pico Laser treatment helps reduce visible pigmentation with precision, care, and a personalised plan designed around your skin.
          </p>
          <ul style={{ marginTop: "26px", listStyle: "disc", paddingLeft: "20px" }}>
            {BRIGHTER_BULLETS.map((b) => (
              <li key={b.label} style={{ fontSize: "14px", lineHeight: 1.6, color: TEAL, marginBottom: "14px" }}>
                <b style={{ fontWeight: 600 }}>{b.label}</b> — {b.desc}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "30px" }}><Cta label="Book Your Skin Transformation" /></div>
        </div>
      </div>
      <style>{`
        @media (min-width: 1024px) {
          .pig-brighter-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  );
}

// ─── PRICING ──────────────────────────────────────────────────────────────────
const PRICES = [
  { size: "Small", sub: "1–3 isolated spots, single freckle cluster", price: "€ 79", icon: "pico-pricing-icon-xs-leaf.png" },
  { size: "Medium", sub: "Multiple spots or one defined zone", price: "€ 99", icon: "pico-pricing-icon-small-lotus.png" },
  { size: "Large", sub: "Full face zone, hands, décolleté, or neck", price: "€ 149", icon: "pico-pricing-icon-medium-waterdrop.png" },
  { size: "Melasma", sub: "Hormonal / diffuse pigmentation, full-face PIH", price: "€ 199", from: true, icon: "pico-pricing-icon-large-sparkle.png" },
];

function Pricing() {
  return (
    <section style={{ padding: "60px 0" }}>
      <div className="container text-center">
        <Serif>pico laser pigmentation pricing</Serif>
        <p className="mx-auto" style={{ maxWidth: "760px", fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.7, marginTop: "16px" }}>
          Choose the treatment option that best suits your skin concern and goals. Every plan is designed to deliver targeted care and a premium experience.
        </p>
        <div className="flex flex-wrap justify-center mx-auto" style={{ gap: "22px", marginTop: "40px", maxWidth: "800px" }}>
          {PRICES.map((p, i) => (
            <div key={p.size} className="text-center relative pig-price-tile"
              style={{ width: "200px", background: "linear-gradient(160deg,#7d7053 0%, #6e6243 100%)", borderRadius: "16px", padding: "44px 18px 26px", marginTop: "26px", boxShadow: "0 12px 30px rgba(0,0,0,0.10)", opacity: i < 4 ? 1 : 0.95, transition: "transform 0.25s ease, box-shadow 0.25s ease" }}>
              <span className="inline-flex items-center justify-center"
                style={{ position: "absolute", top: "-26px", left: "50%", transform: "translateX(-50%)", width: "56px", height: "56px", borderRadius: "12px", backgroundColor: "#5c5236" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${A}/${p.icon}`} alt="" style={{ width: "30px", height: "30px" }} />
              </span>
              <div className="font-serif" style={{ fontSize: "20px", color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase" }}>{p.size}</div>
              <div className="flex items-center justify-center" style={{ width: "60px", margin: "8px auto", gap: "5px" }}>
                <span style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.6)" }} />
                <span aria-hidden style={{ width: "4px", height: "4px", background: "rgba(255,255,255,0.85)", transform: "rotate(45deg)", flexShrink: 0 }} />
                <span style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.6)" }} />
              </div>
              <p style={{ fontSize: "11px", color: "#ffffff", lineHeight: 1.4, marginBottom: "8px" }}>{p.sub}</p>
              <div className="font-serif" style={{ fontSize: "24px", color: "#fff", letterSpacing: "0.02em", lineHeight: 1.1 }}>
                {p.from && <span style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", marginRight: "6px", verticalAlign: "middle" }}>from</span>}
                {p.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHAT TO EXPECT ───────────────────────────────────────────────────────────
const WTE_COLUMNS = [
  {
    label: "before",
    image: "pico-whatToExpect-before.png",
    alt: "Skin with pigmentation before Pico laser treatment",
    points: [
      "Before your treatment, avoid direct sun exposure, tanning, or self-tanning products on the treatment area for at least a few days.",
      "Keep your skin clean and well-hydrated. Avoid harsh exfoliants, acids, retinoids, or active skincare before your session.",
      "Share your medical history, skin sensitivity, and any medication with your specialist so your treatment can be planned safely.",
    ],
  },
  {
    label: "at session",
    image: "pico-whatToExpect-at-session.png",
    alt: "Specialist performing Pico laser pigmentation treatment during a session",
    points: [
      "Your specialist will begin by assessing your pigmentation type, depth, skin tone, and treatment area to customise the Pico laser settings.",
      "During the session, ultra-short Pico laser pulses target excess pigment, helping break it into smaller particles for natural clearance.",
      "You may feel a quick snapping or warming sensation on the skin. Cooling and comfort measures may be used throughout treatment.",
    ],
  },
  {
    label: "after",
    image: "pico-whatToExpect-after.png",
    alt: "Treated skin after Pico laser pigmentation treatment",
    points: [
      "Mild redness, warmth, sensitivity, or temporary darkening of the treated pigmentation can be normal after Pico laser treatment.",
      "Keep the area clean, protected, and moisturised as advised. Avoid picking, scratching, or rubbing the treated skin.",
      "Protect your skin from sun exposure and follow your aftercare plan to support healing and achieve the best possible results.",
    ],
  },
];

function WhatToExpect() {
  return (
    <section style={{ padding: "50px 0" }}>
      <div className="container">
        <Serif style={{ textTransform: "uppercase" }}>what to expect during your pico laser pigmentation treatment?</Serif>
        <div className="pig-wte-grid grid gap-8" style={{ marginTop: "36px" }}>
          {WTE_COLUMNS.map((col) => (
            <div key={col.label}>
              <p className="font-display text-center" style={{ fontSize: "14px", color: GOLD_TEXT, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>{col.label}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${A}/${col.image}`} alt={col.alt} className="rounded-xl"
                style={{ width: "100%", aspectRatio: "5 / 4", objectFit: "cover", boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }} />
              <div className="space-y-3" style={{ marginTop: "16px" }}>
                {col.points.map((point) => (
                  <div key={point} style={{ background: "rgba(255,255,255,0.6)", borderLeft: "3px solid var(--teal)", borderRadius: "6px", padding: "14px 16px" }}>
                    <p style={{ fontSize: "13px", color: "var(--label)", lineHeight: 1.65 }}>{point}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (min-width: 768px) {
          .pig-wte-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
      `}</style>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: "What is Pico Laser pigmentation treatment?", a: "Pico Laser treatment uses ultra-short laser pulses to target unwanted pigment beneath the skin. The pigment is broken into smaller particles, which the body can gradually clear over time." },
  { q: "What pigmentation concerns can it treat?", a: "It may help improve the appearance of sun spots, freckles, age spots, post-inflammatory pigmentation (PIH), uneven skin tone, and selected types of melasma. Suitability is confirmed during consultation based on your skin type, pigmentation depth, and treatment area." },
  { q: "How many sessions will I need?", a: "The number of sessions depends on your pigmentation type, depth, skin tone, and how your skin responds to treatment. Most concerns require multiple sessions, with gradual improvement after each visit. A consultation is the best way to estimate your personalised treatment plan." },
  { q: "Is Pico Laser treatment painful?", a: "You may feel a quick snapping or warming sensation on the skin during treatment. Cooling and comfort measures may be used throughout the session to keep you comfortable." },
  { q: "Is there any downtime after treatment?", a: "There is usually minimal downtime. The treated area may appear red, warm, or slightly swollen for a short time. Most clients can return to normal activities shortly after, following their aftercare guidance." },
  { q: "When will I see results?", a: "Results are gradual. You may begin to notice improvement over the weeks following each session as the body naturally clears the broken-down pigment. The number of sessions needed varies depending on the type and depth of pigmentation." },
  { q: "Is Pico Laser suitable for every skin type?", a: "Pico laser can be used on a range of skin tones, but suitability varies depending on the pigmentation type and individual skin characteristics. Your specialist will assess your skin carefully during consultation before recommending treatment." },
  { q: "What should I avoid before my appointment?", a: "Before your treatment, avoid direct sun exposure, tanning, or self-tanning products on the treatment area for at least a few days. Avoid harsh exfoliants, acids, retinoids, or active skincare before your session. Share your full medical history and any medications with your specialist." },
  { q: "What aftercare is required?", a: "Keep the treated area clean and moisturised as advised. Avoid picking, scratching, or rubbing the treated skin. Protect it from sun exposure with SPF and follow all aftercare instructions given by your practitioner to support safe healing." },
  { q: "Can pigmentation return after treatment?", a: "In some cases, pigmentation can recur — particularly with melasma or pigmentation triggered by ongoing sun exposure. Protecting your skin from the sun and following your aftercare plan can help maintain results. Your specialist will discuss realistic long-term expectations during consultation." },
];

function ShareIcons() {
  const ic = { color: "var(--label)", opacity: 0.65 } as const;
  return (
    <div className="flex items-center" style={{ gap: "20px", padding: "4px 4px 6px" }}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" style={ic} aria-hidden><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.43-4.94 8.43-9.94z" /></svg>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={ic} aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.65l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.16 17.52h1.833L7.084 4.126H5.117l11.967 15.644z" /></svg>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={ic} aria-hidden><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={ic} aria-hidden><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section style={{ background: "#ffffff", padding: "50px 0" }}>
      <div className="container">
        <div className="mx-auto" style={{ maxWidth: "1080px" }}>
          <div className="pig-faq-head" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "20px", marginBottom: "18px" }}>
            <h2 className="font-serif" style={{ fontSize: "clamp(22px,3vw,30px)", color: TEAL, letterSpacing: "0.06em", fontWeight: 400, textTransform: "uppercase", margin: 0, lineHeight: 1.3 }}>
              Frequently asked questions
            </h2>
            {/* search field: the bottom border is the only affordance of the input, so it must meet 1.4.11 (>=3:1). --line #e2e2e2 was 1.3:1; #527979 = 4.81:1. focus-visible ring added via scoped CSS below (never outline:none). */}
            <div style={{ position: "relative", width: "280px", maxWidth: "100%", borderBottom: "1px solid #527979" }}>
              <input type="text" placeholder="Looking for something?" aria-label="Looking for something?"
                className="pig-faq-search"
                style={{ width: "100%", border: "none", background: "transparent", fontSize: "13px", color: "var(--ink-soft)", padding: "8px 26px 8px 2px" }} />
              <span aria-hidden style={{ position: "absolute", right: "2px", top: "50%", transform: "translateY(-50%)", color: "var(--gold-deep)", pointerEvents: "none" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
              </span>
            </div>
          </div>
          <div>
            {FAQS.map((it, i) => {
              const isOpen = open === i;
              return (
                <div key={it.q} style={{ borderBottom: "1px solid rgba(99,145,171,0.32)" }}>
                  <button type="button" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}
                    className="flex items-center justify-between w-full text-left"
                    style={{ padding: "26px 4px", background: "transparent", border: "none", cursor: "pointer", gap: "20px" }}>
                    <span style={{ fontSize: "16px", color: "var(--label)", lineHeight: 1.4, letterSpacing: "0.01em" }}>{it.q}</span>
                    <span aria-hidden style={{ color: "var(--gold-deep)", transition: "transform 0.3s", transform: isOpen ? "rotate(180deg)" : "none", flexShrink: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                    </span>
                  </button>
                  <div style={{ display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr", transition: "grid-template-rows 0.3s ease" }}>
                    <div style={{ overflow: "hidden" }}>
                      <p style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.8, padding: "0 4px 14px" }}>{it.a}</p>
                      <ShareIcons />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col items-center" style={{ marginTop: "36px" }}>
            <Link href="/consultation" className="btn btn-teal" style={{ fontSize: "13px", padding: "15px 56px", letterSpacing: "0.1em" }}>
              CLAIM MY SPOT NOW <span aria-hidden style={{ marginLeft: "4px" }}>›</span>
            </Link>
            <span aria-hidden style={{ width: "1px", height: "40px", background: "var(--line)", marginTop: "0" }} />
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .pig-faq-head { align-items: stretch; }
          .pig-faq-head > div { width: 100%; }
        }
        /* placeholder default browser shade can drop below 4.5:1; pin to a tone that
           flattens to >=4.5:1 on white (#5d5d5d = 5.92:1). */
        .pig-faq-search::placeholder { color: #5d5d5d; opacity: 1; }
        /* visible focus indicator (>=3:1 teal-deep ring); replaces removed outline:none */
        .pig-faq-search:focus-visible { outline: 2px solid #3f6363; outline-offset: 2px; border-radius: 2px; }
      `}</style>
    </section>
  );
}

// ─── WHY CARISMA ──────────────────────────────────────────────────────────────
const WHY_BULLETS = [
  "Team of highly trained and Medically qualified practitioners",
  "Central and discrete location",
  "Flexible scheduling and booking",
  "Personalised treatment plans",
  "Advanced treatments with cutting edge technology",
];

function WhyCarisma() {
  return (
    <section style={{ padding: "50px 0 96px" }}>
      <div className="container">
        <p className="font-display text-center"
          style={{ fontSize: "clamp(20px,2.4vw,28px)", color: GOLD_TEXT, letterSpacing: "0.06em", lineHeight: 1.5, fontWeight: 400, textTransform: "uppercase" }}>
          <span style={{ fontWeight: 700 }}>#1 award winning</span> chain in Malta with<br />
          <span style={{ fontWeight: 700 }}>30+ years</span> in wellness
        </p>
        <div style={{ position: "relative", maxWidth: "640px", margin: "52px auto 0" }}>
          <div aria-hidden style={{ position: "absolute", inset: 0, border: "1px solid var(--gold-deep)", transform: "translate(16px, 16px)", zIndex: 0 }} />
          <div style={{ position: "relative", zIndex: 1, background: "#fff", border: "1px solid var(--gold-deep)", padding: "44px 56px 52px", overflow: "hidden" }}>
            <svg aria-hidden viewBox="0 0 640 140" preserveAspectRatio="none"
              style={{ position: "absolute", left: 0, right: 0, bottom: "24px", width: "100%", height: "140px", opacity: 0.22, pointerEvents: "none", zIndex: 0 }}>
              <path d="M0 96 C 110 30, 230 30, 340 78 C 440 120, 540 120, 640 60" fill="none" stroke="var(--gold-deep)" strokeWidth="1" />
              <path d="M0 110 C 110 48, 230 48, 340 92 C 440 130, 540 130, 640 78" fill="none" stroke="var(--gold-deep)" strokeWidth="1" />
            </svg>
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 className="font-display text-center"
                style={{ fontSize: "clamp(20px,2.4vw,26px)", color: GOLD_TEXT, letterSpacing: "0.1em", fontWeight: 400, textTransform: "uppercase" }}>
                why carisma aesthetics ?
              </h2>
              <div aria-hidden style={{ width: "120px", height: "1px", background: "var(--gold-deep)", margin: "16px auto 32px" }} />
              <ul style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {WHY_BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span aria-hidden style={{ color: GOLD_TEXT, fontSize: "9px", lineHeight: 1.9, flexShrink: 0 }}>●</span>
                    <span className="font-display"
                      style={{ fontSize: "14px", color: GOLD_TEXT, letterSpacing: "0.06em", fontWeight: 400, textTransform: "uppercase", lineHeight: 1.4 }}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div aria-hidden style={{ position: "absolute", left: "50%", bottom: "-9px", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: "9px solid var(--gold-deep)", zIndex: 2 }} />
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function PigmentationPage() {
  return (
    <div style={{ backgroundImage: "url('/assets/hero-bg.png')", backgroundSize: "cover", backgroundAttachment: "fixed", backgroundPosition: "top center" }}>
      {/* solid CTA pills: scale + deepen shadow on hover; price tiles raise on hover */}
      <style>{`
        .pig-cta:hover,
        .pig-cta:focus-visible {
          transform: scale(1.04);
          background: #355555;
          box-shadow: 0 10px 26px rgba(63,99,99,0.35);
        }
        .pig-price-tile:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 44px rgba(0,0,0,0.18);
        }
        @media (prefers-reduced-motion: reduce) {
          .pig-cta:hover, .pig-cta:focus-visible,
          .pig-price-tile:hover { transform: none; }
        }
      `}</style>
      <Hero />
      <Reviews />
      <DoYouHave />
      <TrustedFeatures />
      <Because />
      <Commitment />
      <Secure />
      <FadeUnwanted />
      <Brighter />
      <Pricing />
      <WhatToExpect />
      <Faq />
      <WhyCarisma />
    </div>
  );
}
