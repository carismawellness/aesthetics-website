"use client";

import { useState } from "react";
import Link from "next/link";

/*
  "How it works" — 5-step programme stepper on the Medical Weight Loss page.
  Faithful recreation of the live Wix tab widget (STEP 1–5): consultation,
  body analysis, diet & accountability, movement, and treatments. Content is
  verbatim from carismaaesthetics.com/medical-weight-loss.
*/

type Block =
  | { t: "p"; x: string }
  | { t: "h"; x: string }
  | { t: "ul"; x: string[] }
  | { t: "lead"; x: { b: string; d: string }[] }
  | { t: "cols"; a: { h: string; items: string[] }; b: { h: string; items: string[] } }
  | { t: "note"; x: string }
  | { t: "device"; title: string; desc: string; uses: string[]; note?: string };

type Step = { n: string; title: string; blocks: Block[] };

const STEPS: Step[] = [
  {
    n: "STEP 1",
    title: "Your Ozempic & Mounjaro consultation",
    blocks: [
      { t: "p", x: "Every programme starts with a full in-clinic consultation. This is where we determine if Ozempic or Mounjaro is clinically appropriate for you. Because we stand behind your results, we are selective about who we prescribe to." },
      { t: "ul", x: [
        "Go through your goals, your reasons for changing and your timeline",
        "Review your health history, medications and past diets",
        "Look at your current capacity for food changes, movement and clinic visits",
        "Share real before and after cases that match your age, body type and situation",
        "Explain exactly how our Ozempic or Mounjaro programme works and what support you receive",
        "Tell you honestly whether GLP-1 medication is right for you",
      ] },
      { t: "p", x: "If we do not believe we can deliver real, measurable change, we will not enrol you. If we do accept you, it is because we are prepared to stand behind your results." },
      { t: "cols",
        a: { h: "SUITABLE FOR", items: [
          "You are 28–60 with 5–20 kg to lose",
          "Your body has changed with age, hormones or menopause",
          "You want a doctor-led approach with Ozempic or Mounjaro, not another fad diet",
          "You want to lose weight while still eating real food",
          "You are willing to follow a clear plan with weekly check-ins",
          "You are ready to invest time, energy and budget into your health",
          "Committed to attend all scheduled appointments and sessions",
        ] },
        b: { h: "NOT SUITABLE FOR", items: [
          "You are pregnant, or breastfeeding",
          "You want a rapid, extreme “crash diet” style solution",
          "You are not willing to follow a structured plan",
          "You cannot commit to weekly check-ins or scheduled appointments",
          "You want results without changing routines, eating habits, or lifestyle basics",
          "You are currently dealing with an unmanaged medical condition, or you’re on medication that requires medical clearance (we’ll screen this in the consultation)",
        ] },
      },
    ],
  },
  {
    n: "STEP 2",
    title: "Body analysis & medical grade consultation",
    blocks: [
      { t: "p", x: "Before prescribing Ozempic or Mounjaro, we take time to understand your body. You meet our medical doctor for a full review of your health, hormones, medical history, medications, pregnancies, and menopause. You also receive clinical measurements and a body composition scan — looking at fat, muscle, visceral fat, and water — not just the number on the scale." },
      { t: "p", x: "We talk through how you feel day to day: energy, cravings, sleep, mood, digestion, and joint pain. Together, we set a clear baseline." },
      { t: "h", x: "What we may check, if it makes sense for you:" },
      { t: "ul", x: [
        "Blood tests for thyroid, blood sugar and cholesterol",
        "Food intolerance testing if symptoms suggest it",
        "Blood pressure and other basic checks to ensure your plan is safe",
      ] },
      { t: "p", x: "These assessments determine your Ozempic or Mounjaro eligibility, starting dose, and treatment plan. Based on your results, we enrol you on your prescription protocol, tailor your programme, and schedule your follow-ups with our doctor and slimming consultant." },
    ],
  },
  {
    n: "STEP 3",
    title: "Diet and accountability",
    blocks: [
      { t: "p", x: "Ozempic and Mounjaro reduce hunger, but they don't teach you how to eat. Together, we build a personalised food plan that fits school runs, meetings, weekends, and Maltese food. Your plan is built on three simple rules:" },
      { t: "lead", x: [
        { b: "Mediterranean style, not misery style", d: "Plenty of protein, olive oil, veg, beans and whole grains, with room for bread, pasta and social meals in the right portions." },
        { b: "Higher protein to protect muscle and keep you full", d: "Especially important while on Ozempic or Mounjaro, enough protein to keep you satisfied, support metabolism, and avoid losing muscle while you lose fat." },
        { b: "Flexible structure, not food fear", d: "No “good vs bad” foods. We teach portions and timing so you can enjoy hobz biz zejt, pasta, wine or dessert without losing control." },
      ] },
      { t: "h", x: "Then we shape it around your life:" },
      { t: "lead", x: [
        { b: "Busy mums", d: "Fast family meals, smart leftovers and simple plate formulas" },
        { b: "Menopause", d: "Blood sugar balance, protein timing and fat loss strategies that support hormones" },
        { b: "Bride / event prep", d: "A clear 6–12 week plan that tightens your silhouette without banning social events" },
      ] },
      { t: "note", x: "No shakes only, no keto only, no 1,000 calorie days. Your plan has to work on bad weeks, or it does not work at all." },
      { t: "h", x: "Accountability: how we keep you moving" },
      { t: "p", x: "You are not doing this alone or guessing between visits." },
      { t: "ul", x: [
        "Weekly check-ins with weight and measurements so we see what is really happening",
        "Short written progress updates every week or two with clear next steps",
        "WhatsApp check-ins so you can message when you are stuck, tempted or confused",
        "If you go quiet, we follow up first — without judgement — to help you get back on track",
      ] },
    ],
  },
  {
    n: "STEP 4",
    title: "Movement That Fits Your Life",
    blocks: [
      { t: "p", x: "Weight loss on Ozempic or Mounjaro sticks when movement feels realistic, not punishing. We design a movement plan that meets you where you are today and fits your schedule, fitness level, and preferences." },
      { t: "p", x: "The goal is simple: build consistency, improve strength, increase basal metabolic rate, and protect the lean muscle that GLP-1 medications can sometimes affect." },
      { t: "h", x: "Choose the training style that suits you" },
      { t: "lead", x: [
        { b: "Open Gym Access (Independent Training)", d: "Train on your own time with a clear plan to follow. Perfect if you like flexibility and want structure without fixed class times." },
        { b: "Group Classes (Fat Loss + Strength)", d: "High-energy sessions designed to burn fat, build lean muscle, and keep you accountable. Ideal if you thrive with community and coaching in the room." },
        { b: "Personal Training (Extra Guidance + Motivation)", d: "One-to-one sessions for maximum support, form coaching, and personalised progression. Best if you want faster confidence, tighter technique, and strong accountability." },
      ] },
    ],
  },
  {
    n: "STEP 5",
    title: "Treatments",
    blocks: [
      { t: "p", x: "We use internationally renowned technologies to shape, tighten, and refine your results while you're on Ozempic or Mounjaro. These treatments are not the whole plan, but they are powerful tools when used alongside your GLP-1 programme. Every device we use is leading in its category, chosen for safety, research, and real-world results." },
      { t: "device", title: "Muscle stimulation — EMSculpt NEO", desc: "Protecting muscle mass while on Ozempic or Mounjaro is critical. EMSculpt NEO uses high-intensity electromagnetic pulses to contract your muscles thousands of times in a session, stimulating the effect of 20,000 sit-ups in one 30-minute session.", uses: [
        "Build and tone muscle in areas like the abdomen and glutes",
        "Support posture and core strength as you lose weight on GLP-1 medication",
        "Refine shape after you start dropping kilos",
      ], note: "You stay dressed, lie down, and feel strong, deep contractions while our team monitors you." },
      { t: "device", title: "Fat freezing — CoolSculpting", desc: "CoolSculpting targets stubborn pockets of fat that don't respond to diet and exercise, even while on Ozempic or Mounjaro. It cools fat cells in a controlled way so your body can gradually clear them over time.", uses: [
        "Target areas like lower belly, flanks, bra fat or thighs",
        "Help contour the body as your weight comes down with GLP-1 support",
        "Support results without surgery or downtime",
      ] },
      { t: "device", title: "Skin tightening — VelaShape", desc: "VelaShape combines radiofrequency, infrared light, gentle vacuum and massage to heat the deeper layers of the skin and stimulate collagen.", uses: [
        "Improve skin texture and mild laxity as the body changes during Ozempic or Mounjaro treatment",
        "Smooth the look of areas that feel softer or “looser” after weight loss",
        "Support circulation and the appearance of cellulite-prone zones",
      ], note: "It feels like a warm, deep massage rather than a harsh, painful treatment." },
      { t: "device", title: "Lymphatic drainage", desc: "We offer lymphatic drainage using compressive microvibration technology and specialised massage.", uses: [
        "Support circulation and fluid drainage during your Ozempic or Mounjaro programme",
        "Help with that “puffy, heavy” feeling some women experience in the legs or abdomen",
        "Complement fat loss and skin tightening treatments",
      ] },
      { t: "note", x: "Every treatment plan is based on your medical assessment and body goals, not a “one area fits all” offer." },
    ],
  },
];

function Dot() {
  return <span style={{ color: "var(--gold-deep)", fontSize: "11px", lineHeight: 1.8, flexShrink: 0 }}>●</span>;
}
function Tick() {
  return <svg className="shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-deep)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "2px" }}><path d="M5 12.5l4.5 4.5L19 7" /></svg>;
}
function Ex() {
  return <svg className="shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b3a98f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "2px" }}><path d="M7 7l10 10M17 7L7 17" /></svg>;
}

function ColList({ items, ok }: { items: string[]; ok: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((s) => (
        <li key={s} className="flex items-start gap-3">{ok ? <Tick /> : <Ex />}<span style={{ fontSize: "13.5px", color: "var(--label)", lineHeight: 1.55 }}>{s}</span></li>
      ))}
    </ul>
  );
}

function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case "p":
      return <p style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.8, marginTop: "14px" }}>{b.x}</p>;
    case "h":
      return <p className="font-display" style={{ fontSize: "13px", color: "var(--gold-deep)", letterSpacing: "0.06em", marginTop: "22px", marginBottom: "2px" }}>{b.x}</p>;
    case "ul":
      return (
        <ul className="space-y-3" style={{ marginTop: "16px" }}>
          {b.x.map((s) => (<li key={s} className="flex items-start gap-3"><Dot /><span style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.6 }}>{s}</span></li>))}
        </ul>
      );
    case "lead":
      return (
        <div className="space-y-4" style={{ marginTop: "16px" }}>
          {b.x.map((it) => (
            <div key={it.b} className="flex items-start gap-3">
              <Dot />
              <span style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.6 }}>
                <b style={{ color: "var(--gold-deep)", fontWeight: 600 }}>{it.b}</b> — {it.d}
              </span>
            </div>
          ))}
        </div>
      );
    case "cols":
      return (
        <div className="grid gap-10 md:grid-cols-2" style={{ marginTop: "28px" }}>
          <div>
            <h4 className="font-display" style={{ fontSize: "13px", color: "var(--gold-deep)", letterSpacing: "0.08em", marginBottom: "16px" }}>{b.a.h}</h4>
            <ColList items={b.a.items} ok />
          </div>
          <div>
            <h4 className="font-display" style={{ fontSize: "13px", color: "var(--label)", letterSpacing: "0.08em", marginBottom: "16px" }}>{b.b.h}</h4>
            <ColList items={b.b.items} ok={false} />
          </div>
        </div>
      );
    case "note":
      return (
        <p style={{ fontSize: "13.5px", color: "var(--gold-deep)", lineHeight: 1.7, marginTop: "18px", padding: "14px 18px", background: "rgba(255,255,255,0.6)", borderLeft: "3px solid var(--gold-deep)", borderRadius: "0 10px 10px 0" }}>{b.x}</p>
      );
    case "device":
      return (
        <div style={{ marginTop: "22px", paddingTop: "22px", borderTop: "1px solid var(--line)" }}>
          <h4 className="font-display" style={{ fontSize: "14px", color: "var(--gold-deep)", letterSpacing: "0.04em", marginBottom: "8px", textTransform: "uppercase" }}>{b.title}</h4>
          <p style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.75 }}>{b.desc}</p>
          <p className="font-display" style={{ fontSize: "12px", color: "var(--gold-deep)", letterSpacing: "0.06em", margin: "14px 0 8px" }}>We use it to:</p>
          <ul className="space-y-2">
            {b.uses.map((u) => (<li key={u} className="flex items-start gap-3"><Dot /><span style={{ fontSize: "13.5px", color: "var(--label)", lineHeight: 1.6 }}>{u}</span></li>))}
          </ul>
          {b.note && <p style={{ fontSize: "13.5px", color: "var(--muted)", fontStyle: "italic", lineHeight: 1.7, marginTop: "12px" }}>{b.note}</p>}
        </div>
      );
  }
}

export default function MwlStepper() {
  const [active, setActive] = useState(0);

  return (
    <div className="mx-auto" style={{ maxWidth: "920px", marginTop: "36px" }}>
      {/* step tabs */}
      <div className="flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="How it works steps">
        {STEPS.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.n}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className="font-display"
              style={{
                fontSize: "12px",
                letterSpacing: "0.1em",
                padding: "11px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                textTransform: "uppercase",
                transition: "all 0.2s ease",
                background: on ? "#6391AB" : "rgba(255,255,255,0.55)",
                color: on ? "#fff" : "var(--gold-deep)",
                border: on ? "1px solid #6391AB" : "1px solid var(--line)",
                fontWeight: on ? 700 : 400,
              }}
            >
              {s.n}
            </button>
          );
        })}
      </div>

      {/* panels — all mounted (matches live), inactive ones hidden */}
      <div style={{ marginTop: "26px" }}>
        {STEPS.map((s, i) => (
          <div
            key={s.n}
            role="tabpanel"
            hidden={i !== active}
            style={{ display: i === active ? "block" : "none", background: "rgba(255,255,255,0.55)", border: "1px solid var(--line)", borderRadius: "20px", padding: "clamp(26px,3vw,40px)" }}
          >
            <h3 className="font-display" style={{ fontSize: "17px", color: "var(--gold-deep)", letterSpacing: "0.04em" }}>{s.title}</h3>
            {s.blocks.map((b, bi) => (<BlockView key={bi} b={b} />))}
          </div>
        ))}
      </div>

      <div className="text-center" style={{ marginTop: "32px" }}>
        <Link href="/consultation" style={{ display: "inline-block", background: "#6391AB", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "15px 34px", borderRadius: "10px" }}>book your medical consultation</Link>
      </div>
    </div>
  );
}
