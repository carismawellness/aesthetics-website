"use client";

/*
  Medical Weight-Loss page — faithful 1:1 recreation of
  https://www.carismaaesthetics.com/medical-weight-loss
  Built fresh from the learning-agent spec (D:/tmp/mwl_spec.md).

  Page body ENDS at the "real people, real reviews" heading: doctor bios,
  reviews, award strip, contact and legal are global Footer chrome and are
  NOT rendered here. Reuses the shared Reveal + FaqAccordion primitives and
  the app/globals.css design tokens. The "how it works" stepper and the
  before/after results carousel are interactive (hence "use client").
*/

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import FaqAccordion, { type Faq } from "@/components/FaqAccordion";

const BOOK_HREF =
  "http://fresha.com/a/carisma-slimming-floriana-great-siege-road-wxxyuj9p/booking?menu=true&share=true&offerItems=sv%3A26105577&pId=2708191&dppub=true&employeeId=5084222";

const A = "/assets/mwl";

/* ---------- small shared primitives ---------- */

function Cta({ children = "book your medical consultation" }: { children?: ReactNode }) {
  return (
    <a
      href={BOOK_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-teal"
      style={{ borderRadius: "2px" }}
    >
      {children}
    </a>
  );
}

function Bullet({ kind, children }: { kind: "check" | "cross"; children: ReactNode }) {
  return (
    <li className="flex items-start" style={{ gap: "12px", marginBottom: "14px" }}>
      <Image
        src={`${A}/bullet-${kind}.png`}
        alt=""
        width={18}
        height={18}
        style={{ flexShrink: 0, marginTop: "3px", width: "18px", height: "18px" }}
      />
      <span style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.7 }}>{children}</span>
    </li>
  );
}

function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <p
      className="font-serif"
      style={{
        color: "var(--gold)",
        fontSize: "13px",
        fontWeight: 700,
        letterSpacing: "0.08em",
        marginBottom: "14px",
        textAlign: center ? "center" : "left",
      }}
    >
      {children}
    </p>
  );
}

function H2({
  children,
  serif = false,
  style,
}: {
  children: ReactNode;
  serif?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <h2
      className={serif ? "font-serif" : "font-display"}
      style={{
        textAlign: "center",
        fontSize: serif ? "clamp(24px,3.4vw,30px)" : "clamp(22px,3vw,28px)",
        color: serif ? "var(--label)" : "var(--ink)",
        textTransform: serif ? "lowercase" : undefined,
        lineHeight: 1.25,
        margin: "0 auto 26px",
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

/* =================================================================== */

export default function MedicalWeightLossPage() {
  return (
    <main style={{ overflowX: "hidden" }}>
      <Hero />
      <Results />
      <Clarity />
      <Trusted />
      <HowItWorks />
      <Promise />
      <Safety />
      <Methodology />
      <Difference />
      <NotAnotherClinic />
      <Faqs />
      <Research />
      <EndBoundary />
    </main>
  );
}

/* ---------- S1 HERO ---------- */

function Hero() {
  const bullets = [
    "Calmer appetite: Ozempic and Mounjaro mimic natural fullness signals so you feel satisfied with smaller portions and less food noise.",
    "Doctor monitored: Full eligibility assessment, body scan, blood work, safety screening, and regular reviews to manage side effects and adjust your dose.",
    "Part of a full plan: Your GLP-1 prescription is paired with nutrition, movement, accountability, and body contouring treatments — never used on its own.",
  ];
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        backgroundImage: `url(${A}/hero-frame.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "var(--cream)",
      }}
    >
      <div className="container" style={{ paddingTop: "64px", paddingBottom: "64px" }}>
        <div
          className="grid items-center"
          style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,405px)", gap: "48px" }}
        >
          {/* LEFT — copy */}
          <Reveal>
            <Eyebrow>Ozempic &amp; Mounjaro in Malta</Eyebrow>
            <h1
              className="font-display"
              style={{ fontSize: "clamp(24px,3.2vw,30px)", color: "var(--ink)", lineHeight: 1.25, marginBottom: "16px" }}
            >
              doctor-led ozempic &amp; mounjaro in malta
            </h1>
            <p style={{ fontSize: "14px", color: "var(--ink-soft)", fontWeight: 600, marginBottom: "10px" }}>
              Considering Ozempic or Mounjaro for weight loss?
            </p>
            <p style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.75, marginBottom: "20px" }}>
              At Carisma Aesthetics, GLP-1 medications are never prescribed in isolation. Our doctor-led programme
              combines a full medical assessment, structured prescription support, nutrition guidance, and weekly
              monitoring to help you lose weight safely and sustain your results.
            </p>
            <ul style={{ marginBottom: "24px" }}>
              {bullets.map((b) => (
                <Bullet key={b} kind="check">
                  {b}
                </Bullet>
              ))}
            </ul>
            <Cta />

            <div className="flex items-center" style={{ gap: "22px", margin: "26px 0 22px" }}>
              <Image src={`${A}/ozempic-wordmark.png`} alt="Ozempic Semaglutide" width={176} height={51} style={{ height: "38px", width: "auto" }} />
              <Image src={`${A}/mounjaro-wordmark.png`} alt="Mounjaro tirzepatide" width={152} height={51} style={{ height: "38px", width: "auto" }} />
            </div>

            <div className="flex items-center" style={{ gap: "26px", flexWrap: "wrap" }}>
              <Image src={`${A}/google-reviews-bar.png`} alt="G 4.9 — TOP-RATED CLINIC IN MALTA" width={313} height={20} style={{ height: "20px", width: "auto" }} />
              <div className="flex items-center" style={{ gap: "10px" }}>
                <Image src={`${A}/award-badge.png`} alt="Malta Healthcare, Wellness, Beauty & Best Spa Awards" width={114} height={72} style={{ height: "44px", width: "auto" }} />
                <span className="font-display" style={{ fontSize: "11px", color: "var(--ink)", letterSpacing: "0.1em", maxWidth: "120px", lineHeight: 1.3 }}>
                  #1 Voted Clinic in Malta
                </span>
              </div>
            </div>
          </Reveal>

          {/* RIGHT — portrait video box */}
          <Reveal delay={120}>
            <div
              style={{
                width: "100%",
                maxWidth: "405px",
                aspectRatio: "405 / 560",
                marginInline: "auto",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
              }}
            >
              <video
                src={`${A}/hero.mp4`}
                poster={`${A}/hero-doctor.png`}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- S2 RESULTS — before/after testimonial carousel ---------- */

const RESULTS = [
  {
    name: "ANNA LINDSTRÖM",
    snippet:
      "My issue wasn't just weight, it was how heavy my body felt to carry. Walking, …",
  },
  {
    name: "NICOLE FARRUGIA",
    snippet:
      "I struggled with my weight for a long time and it was affecting my confidence and…",
  },
  {
    name: "LAURA BENNETT",
    snippet: "I had tried dieting on and … my weight always came back…",
  },
];

function ResultCard({ name, snippet }: { name: string; snippet: string }) {
  return (
    <div
      style={{
        background: "var(--white)",
        borderRadius: "10px",
        border: "1px solid var(--line)",
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* BEFORE | AFTER split photo — images not recovered from the live Wix Pro
          Gallery (lazy canvas/blob); rendered as a clearly-marked placeholder. */}
      <div className="grid grid-cols-2">
        {(["BEFORE", "AFTER"] as const).map((lbl) => (
          <div
            key={lbl}
            style={{
              position: "relative",
              aspectRatio: "3 / 5",
              background: "var(--cream)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className="font-display"
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                background: "rgba(255,255,255,0.9)",
                color: "var(--ink)",
                fontSize: "9px",
                letterSpacing: "0.12em",
                padding: "4px 8px",
                borderRadius: "3px",
              }}
            >
              {lbl}
            </span>
            <span style={{ fontSize: "11px", color: "var(--muted)" }}>{lbl} photo</span>
          </div>
        ))}
      </div>
      <div style={{ padding: "20px" }}>
        <p style={{ fontSize: "13.5px", color: "var(--label)", lineHeight: 1.7, marginBottom: "10px" }}>
          &ldquo;{snippet}&rdquo;
        </p>
        <button
          type="button"
          style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", color: "var(--teal)", fontSize: "13px", fontWeight: 600 }}
        >
          Read more
        </button>
        <p className="font-display" style={{ fontSize: "14px", color: "var(--ink)", letterSpacing: "0.08em", marginTop: "16px" }}>
          {name}
        </p>
      </div>
    </div>
  );
}

function Results() {
  const [start, setStart] = useState(0);
  const n = RESULTS.length;
  const go = (d: number) => setStart((s) => (s + d + n) % n);
  const ordered = [...RESULTS.slice(start), ...RESULTS.slice(0, start)];

  return (
    <section id="results" style={{ background: "var(--white)", padding: "72px 0" }}>
      <div className="container text-center">
        <H2>ozempic &amp; mounjaro results</H2>
        <Reveal>
          <div className="relative" style={{ maxWidth: "1080px", margin: "0 auto" }}>
            <div
              className="grid"
              style={{ gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "24px", textAlign: "left" }}
            >
              {ordered.map((r) => (
                <ResultCard key={r.name} name={r.name} snippet={r.snippet} />
              ))}
            </div>
            <CarouselArrow dir="left" onClick={() => go(-1)} />
            <CarouselArrow dir="right" onClick={() => go(1)} />
          </div>
        </Reveal>
        <p style={{ fontSize: "12px", color: "var(--muted)", marginTop: "20px" }}>
          Before / after photos are sourced individually from each patient&rsquo;s consented case file.
        </p>
      </div>
    </section>
  );
}

function CarouselArrow({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={dir === "left" ? "Previous results" : "Next results"}
      onClick={onClick}
      style={{
        position: "absolute",
        top: "40%",
        [dir]: "-22px",
        transform: "translateY(-50%)",
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        background: "var(--white)",
        border: "1px solid var(--line)",
        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
        color: "var(--teal)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 2,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}

/* ---------- S3 CLARITY ---------- */

function Clarity() {
  return (
    <section id="clarity" style={{ background: "var(--cream)", padding: "72px 0" }}>
      <div className="container">
        <Reveal>
          <Eyebrow center>What are Ozempic &amp; Mounjaro?</Eyebrow>
          <H2>clarity before you start</H2>
          <p
            style={{
              maxWidth: "880px",
              margin: "0 auto 44px",
              textAlign: "center",
              fontSize: "15px",
              color: "var(--label)",
              lineHeight: 1.8,
            }}
          >
            Ozempic (semaglutide) and Mounjaro (tirzepatide) are prescription-only GLP-1 receptor agonist
            medications. They support weight loss by improving appetite regulation and satiety, helping reduce
            constant hunger and food noise. They can make consistency easier, but they work best inside a structured,
            medically supervised programme
          </p>
        </Reveal>

        <div className="grid" style={{ gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "40px", maxWidth: "920px", margin: "0 auto" }}>
          <Reveal>
            <h3 className="font-display" style={{ fontSize: "16px", color: "var(--ink)", marginBottom: "20px" }}>
              What medication helps with:
            </h3>
            <ul>
              <Bullet kind="check">Appetite regulation and feeling full sooner</Bullet>
              <Bullet kind="check">Craving reduction and less &ldquo;food noise&rdquo;</Bullet>
              <Bullet kind="check">Better control and adherence to your plan</Bullet>
              <Bullet kind="check">Better blood sugar control &amp; metabolic support</Bullet>
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <h3 className="font-display" style={{ fontSize: "16px", color: "var(--ink)", marginBottom: "20px" }}>
              What medication does not do:
            </h3>
            <ul>
              <Bullet kind="cross">Build muscle or protect your metabolism on its own</Bullet>
              <Bullet kind="cross">Teach eating habits or create a repeatable routine</Bullet>
              <Bullet kind="cross">Fix emotional drivers or stress eating</Bullet>
              <Bullet kind="cross">Create long-term identity change and maintenance</Bullet>
            </ul>
          </Reveal>
        </div>

        <p
          className="font-serif"
          style={{ maxWidth: "880px", margin: "40px auto 0", textAlign: "center", fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.8 }}
        >
          That&rsquo;s why we combine Ozempic or Mounjaro support (if clinically appropriate) with nutrition structure,
          strength training habits, tracking, and a maintenance plan.
        </p>
      </div>
    </section>
  );
}

/* ---------- S4 TRUSTED + ELIGIBILITY ---------- */

const PRESS = [
  { src: `${A}/press-1.jpeg`, alt: "" },
  { src: `${A}/press-maltatoday.jpg`, alt: "Malta Today" },
  { src: `${A}/press-2.jpeg`, alt: "" },
  { src: `${A}/press-timesmalta.png`, alt: "Times of Malta" },
  { src: `${A}/press-mttoday.png`, alt: "MT Today" },
];

const DIFFERENTIATORS = [
  {
    icon: `${A}/icon-doctor-first.png`,
    label: "Doctor-first, not drug-first",
    body:
      "We start with clinical suitability, not dosage. Your consultation reviews your full health history, risks, and goals. Our doctor then sets clear expectations and a safe Ozempic or Mounjaro plan with ongoing medical oversight.",
  },
  {
    icon: `${A}/icon-appetite.png`,
    label: "APPETITE & METABOLIC SUPPORT",
    body:
      "Ozempic and Mounjaro quiet hunger and reduce food noise, making consistency easier. If you qualify, we titrate carefully, monitor side effects, and pair your prescription with a repeatable eating structure — never medication in isolation.",
  },
  {
    icon: `${A}/icon-bodycomp.png`,
    label: "Body composition, not weight",
    body:
      "We track what actually matters: fat loss while protecting lean mass. You see progress through body composition trends, measurements, and strength progression — not just a number on the scale.",
  },
  {
    icon: `${A}/icon-programme.png`,
    label: "Programme, not prescription",
    body:
      "An Ozempic or Mounjaro prescription alone is not a solution. Results come from phases, milestones, and a defined maintenance plan. We guide you through a structured start, progress targets, and an exit strategy.",
  },
];

function Trusted() {
  return (
    <section id="trusted" style={{ background: "var(--white)", padding: "72px 0" }}>
      <div className="container">
        <Reveal>
          <H2>malta&rsquo;s trusted clinic for ozempic &amp; mounjaro</H2>
          <div className="flex items-center justify-center" style={{ gap: "40px", flexWrap: "wrap", margin: "0 auto 56px", maxWidth: "900px" }}>
            {PRESS.map((p, i) => (
              <Image key={i} src={p.src} alt={p.alt} width={120} height={40} style={{ height: "34px", width: "auto", objectFit: "contain", opacity: 0.85 }} />
            ))}
          </div>
        </Reveal>

        <div className="grid" style={{ gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: "32px" }}>
          {DIFFERENTIATORS.map((d, i) => (
            <Reveal key={d.label} delay={i * 80}>
              <div className="text-center">
                <Image src={d.icon} alt="" width={74} height={74} style={{ height: "62px", width: "auto", margin: "0 auto 18px" }} />
                <p className="font-serif" style={{ color: "var(--gold)", fontSize: "13px", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "12px", textTransform: "uppercase" }}>
                  {d.label}
                </p>
                <p style={{ fontSize: "13.5px", color: "var(--label)", lineHeight: 1.7 }}>{d.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Eligibility />
      </div>
    </section>
  );
}

function Eligibility() {
  return (
    <div id="eligibility" style={{ marginTop: "72px", paddingTop: "56px", borderTop: "1px solid var(--line)" }}>
      <Reveal>
        <Eyebrow center>Ozempic &amp; Mounjaro eligibility criteria</Eyebrow>
        <H2>selective by intention successful by design</H2>
        <p style={{ maxWidth: "900px", margin: "0 auto 44px", textAlign: "center", fontSize: "15px", color: "var(--label)", lineHeight: 1.8 }}>
          Ozempic and Mounjaro can be powerful, but only when prescribed as part of a structured, doctor-supervised
          programme. Eligibility is determined through a proper medical assessment, including blood tests, food
          intolerance screening, safety checks, and clear protocols so your plan is appropriate, monitored, and
          adjusted responsibly.
        </p>
      </Reveal>

      <div className="grid" style={{ gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "40px", maxWidth: "920px", margin: "0 auto" }}>
        <Reveal>
          <h3 className="font-display" style={{ fontSize: "16px", color: "var(--ink)", marginBottom: "20px" }}>suitable for:</h3>
          <ul>
            <Bullet kind="check">BMI ≥27</Bullet>
            <Bullet kind="check">Insulin resistence</Bullet>
            <Bullet kind="check">Emotional eating or Long dieting history</Bullet>
            <Bullet kind="check">Menopause-related weight gain</Bullet>
          </ul>
        </Reveal>
        <Reveal delay={100}>
          <h3 className="font-display" style={{ fontSize: "16px", color: "var(--ink)", marginBottom: "20px" }}>unsuitable for:</h3>
          <ul>
            <Bullet kind="cross">Eating disorders</Bullet>
            <Bullet kind="cross">Very lean patients</Bullet>
            <Bullet kind="cross">Those unwilling to attend check-ins</Bullet>
            <Bullet kind="cross">Currently pregnant or trying to conceive</Bullet>
          </ul>
        </Reveal>
      </div>

      <div className="text-center" style={{ marginTop: "40px" }}>
        <Cta />
      </div>
    </div>
  );
}

/* ---------- S5 HOW IT WORKS — 5-step stepper ---------- */

type StepPanel = { num: number; title: string; icon: string; body: ReactNode };

function CheckCol({ title, items, kind }: { title: string; items: string[]; kind: "check" | "cross" }) {
  return (
    <div>
      <h4 className="font-display" style={{ fontSize: "14px", color: "var(--ink)", marginBottom: "16px" }}>{title}</h4>
      <ul>
        {items.map((it) => (
          <Bullet key={it} kind={kind}>{it}</Bullet>
        ))}
      </ul>
    </div>
  );
}

function LeadList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: "8px 0 18px" }}>
      {items.map((it) => (
        <Bullet key={it} kind="check">{it}</Bullet>
      ))}
    </ul>
  );
}

function P({ children, bold = false }: { children: ReactNode; bold?: boolean }) {
  return (
    <p style={{ fontSize: "14.5px", color: bold ? "var(--ink-soft)" : "var(--label)", fontWeight: bold ? 600 : 400, lineHeight: 1.8, marginBottom: "16px" }}>
      {children}
    </p>
  );
}

const STEPS: StepPanel[] = [
  {
    num: 1,
    title: "Your Ozempic & Mounjaro consultation",
    icon: `${A}/step-consultation.png`,
    body: (
      <>
        <P>
          Every programme starts with a full in-clinic consultation. This is where we determine if Ozempic or Mounjaro
          is clinically appropriate for you. Because we stand behind your results, we are selective about who we
          prescribe to.
        </P>
        <P bold>We will:</P>
        <LeadList
          items={[
            "Go through your goals, your reasons for changing and your timeline",
            "Review your health history, medications and past diets",
            "Look at your current capacity for food changes, movement and clinic visits",
            "Share real before and after cases that match your age, body type and situation",
            "Explain exactly how our Ozempic or Mounjaro programme works and what support you receive",
            "Tell you honestly whether GLP-1 medication is right for you",
          ]}
        />
        <P bold>
          If we do not believe we can deliver real, measurable change, we will not enrol you. If we do accept you, it is
          because we are prepared to stand behind your results.
        </P>
        <div className="grid" style={{ gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "32px", marginTop: "26px" }}>
          <CheckCol
            kind="check"
            title="SUITABLE FOR"
            items={[
              "You are 28–60 with 5–20 kg to lose",
              "Your body has changed with age, hormones or menopause",
              "You want a doctor-led approach with Ozempic or Mounjaro, not another fad diet",
              "You want to lose weight while still eating real food",
              "You are willing to follow a clear plan with weekly check-ins",
              "You are ready to invest time, energy and budget into your health",
              "Committed to attend all scheduled appointments and sessions",
            ]}
          />
          <CheckCol
            kind="cross"
            title="NOT SUITABLE FOR"
            items={[
              "You are pregnant, or breastfeeding",
              "You want a rapid, extreme “crash diet” style solution",
              "You are not willing to follow a structured plan",
              "You cannot commit to weekly check-ins or scheduled appointments",
              "You want results without changing routines, eating habits, or lifestyle basics",
              "You are currently dealing with an unmanaged medical condition, or you're on medication that requires medical clearance (we'll screen this in the consultation)",
            ]}
          />
        </div>
      </>
    ),
  },
  {
    num: 2,
    title: "Body analysis & medical grade consultation",
    icon: `${A}/step-bodyanalysis.png`,
    body: (
      <>
        <P bold>
          Before prescribing Ozempic or Mounjaro, we take time to understand your body. You meet our medical doctor for
          a full review of your health, hormones, medical history, medications, pregnancies, and menopause. You also
          receive clinical measurements and a body composition scan — looking at fat, muscle, visceral fat, and water —
          not just the number on the scale.
        </P>
        <P bold>
          We talk through how you feel day to day: energy, cravings, sleep, mood, digestion, and joint pain. Together,
          we set a clear baseline.
        </P>
        <P>What we may check, if it makes sense for you:</P>
        <LeadList
          items={[
            "Blood tests for thyroid, blood sugar and cholesterol",
            "Food intolerance testing if symptoms suggest it",
            "Blood pressure and other basic checks to ensure your plan is safe",
          ]}
        />
        <P bold>
          These assessments determine your Ozempic or Mounjaro eligibility, starting dose, and treatment plan. Based on
          your results, we enrol you on your prescription protocol, tailor your programme, and schedule your follow-ups
          with our doctor and slimming consultant.
        </P>
      </>
    ),
  },
  {
    num: 3,
    title: "Diet and accountability",
    icon: `${A}/step-diet.png`,
    body: (
      <>
        <P bold>
          Ozempic and Mounjaro reduce hunger, but they don&rsquo;t teach you how to eat. Together, we build a
          personalised food plan that fits school runs, meetings, weekends, and Maltese food. Your plan is built on
          three simple rules:
        </P>
        <ul style={{ marginBottom: "18px" }}>
          <Bullet kind="check">
            <strong>Mediterranean style, not misery style</strong> — Plenty of protein, olive oil, veg, beans and whole
            grains, with room for bread, pasta and social meals in the right portions.
          </Bullet>
          <Bullet kind="check">
            <strong>Higher protein to protect muscle and keep you full</strong> — Especially important while on Ozempic
            or Mounjaro, enough protein to keep you satisfied, support metabolism, and avoid losing muscle while you
            lose fat.
          </Bullet>
          <Bullet kind="check">
            <strong>Flexible structure, not food fear</strong> — No &ldquo;good vs bad&rdquo; foods. We teach portions
            and timing so you can enjoy hobz biz zejt, pasta, wine or dessert without losing control.
          </Bullet>
        </ul>
        <P bold>Then we shape it around your life:</P>
        <LeadList
          items={[
            "Busy mums – Fast family meals, smart leftovers and simple plate formulas",
            "Menopause – Blood sugar balance, protein timing and fat loss strategies that support hormones",
            "Bride / event prep – A clear 6–12 week plan that tightens your silhouette without banning social events",
          ]}
        />
        <P bold>
          No shakes only, no keto only, no 1,000 calorie days. Your plan has to work on bad weeks, or it does not work
          at all.
        </P>
        <P bold>Accountability: how we keep you moving — You are not doing this alone or guessing between visits.</P>
        <LeadList
          items={[
            "Weekly check-ins with weight and measurements so we see what is really happening",
            "Short written progress updates every week or two with clear next steps",
            "WhatsApp check-ins so you can message when you are stuck, tempted or confused",
            "If you go quiet, we follow up first — without judgement — to help you get back on track",
          ]}
        />
      </>
    ),
  },
  {
    num: 4,
    title: "Movement That Fits Your Life",
    icon: `${A}/step-movement.png`,
    body: (
      <>
        <P bold>
          Weight loss on Ozempic or Mounjaro sticks when movement feels realistic, not punishing. We design a movement
          plan that meets you where you are today and fits your schedule, fitness level, and preferences.
        </P>
        <P bold>
          The goal is simple: build consistency, improve strength, increase basal metabolic rate, and protect the lean
          muscle that GLP-1 medications can sometimes affect.
        </P>
        <P>Choose the training style that suits you:</P>
        <ul>
          <Bullet kind="check">
            <strong>Open Gym Access (Independent Training):</strong> Train on your own time with a clear plan to follow.
            Perfect if you like flexibility and want structure without fixed class times.
          </Bullet>
          <Bullet kind="check">
            <strong>Group Classes (Fat Loss + Strength):</strong> High-energy sessions designed to burn fat, build lean
            muscle, and keep you accountable. Ideal if you thrive with community and coaching in the room.
          </Bullet>
          <Bullet kind="check">
            <strong>Personal Training (Extra Guidance + Motivation):</strong> One-to-one sessions for maximum support,
            form coaching, and personalised progression. Best if you want faster confidence, tighter technique, and
            strong accountability.
          </Bullet>
        </ul>
      </>
    ),
  },
  {
    num: 5,
    title: "treatments",
    icon: `${A}/step-treatments.png`,
    body: (
      <>
        <P bold>
          We use internationally renowned technologies to shape, tighten, and refine your results while you&rsquo;re on
          Ozempic or Mounjaro. These treatments are not the whole plan, but they are powerful tools when used alongside
          your GLP-1 programme. Every device we use is leading in its category, chosen for safety, research, and
          real-world results.
        </P>
        <ul style={{ marginBottom: "18px" }}>
          <Bullet kind="check">
            <strong>Muscle stimulation- emsculpt neo</strong> — &ldquo;Protecting muscle mass while on Ozempic or
            Mounjaro is critical. EMSculpt NEO uses high-intensity electromagnetic pulses to contract your muscles
            thousands of times in a session, stimulating the effect of 20,000 sit-ups in one 30-minute session.&rdquo;
            We use it to: Build and tone muscle in areas like the abdomen and glutes · Support posture and core strength
            as you lose weight on GLP-1 medication · Refine shape after you start dropping kilos. &ldquo;You stay
            dressed, lie down, and feel strong, deep contractions while our team monitors you.&rdquo;
          </Bullet>
          <Bullet kind="check">
            <strong>Fat freezing — CoolSculpting</strong> — &ldquo;CoolSculpting targets stubborn pockets of fat that
            don&rsquo;t respond to diet and exercise, even while on Ozempic or Mounjaro. It cools fat cells in a
            controlled way so your body can gradually clear them over time.&rdquo; We use it to: Target areas like lower
            belly, flanks, bra fat or thighs · Help contour the body as your weight comes down with GLP-1 support ·
            Support results without surgery or downtime.
          </Bullet>
          <Bullet kind="check">
            <strong>Skin tightening — VelaShape</strong> — &ldquo;VelaShape combines radiofrequency, infrared light,
            gentle vacuum and massage to heat the deeper layers of the skin and stimulate collagen.&rdquo; We use it to:
            Improve skin texture and mild laxity as the body changes during Ozempic or Mounjaro treatment · Smooth the
            look of areas that feel softer or &ldquo;looser&rdquo; after weight loss · Support circulation and the
            appearance of cellulite-prone zones. &ldquo;It feels like a warm, deep massage rather than a harsh, painful
            treatment.&rdquo;
          </Bullet>
          <Bullet kind="check">
            <strong>Lymphatic drainage</strong> — &ldquo;We offer lymphatic drainage using compressive microvibration
            technology and specialised massage.&rdquo; We use it to: Support circulation and fluid drainage during your
            Ozempic or Mounjaro programme · Help with that &ldquo;puffy, heavy&rdquo; feeling some women experience in
            the legs or abdomen · Complement fat loss and skin tightening treatments.
          </Bullet>
        </ul>
        <P bold>
          Every treatment plan is based on your medical assessment and body goals, not a &ldquo;one area fits
          all&rdquo; offer.
        </P>

        <div
          className="grid items-center"
          style={{ gridTemplateColumns: "minmax(0,300px) minmax(0,1fr)", gap: "32px", marginTop: "32px", paddingTop: "32px", borderTop: "1px solid var(--line)" }}
        >
          <Image
            src={`${A}/drteebi-stepper.jpeg`}
            alt="Dr Zaid Teebi — Ozempic and Mounjaro prescribing doctor at Carisma Aesthetics Malta"
            width={448}
            height={479}
            style={{ width: "100%", height: "auto", borderRadius: "10px" }}
          />
          <div>
            <h4 className="font-display" style={{ fontSize: "18px", color: "var(--ink)", marginBottom: "14px" }}>Dr Zaid Teebi</h4>
            <P>
              Dr Zaid Teebi is a medical doctor at Carisma with over 30+ years of clinical experience and an
              evidence-based focus on GLP-1 prescribing and metabolic health. A graduate of Imperial College London, he
              combines medical rigour with a calm, human approach. His Ozempic and Mounjaro consultations are structured
              and personalised, with safety screening, clear expectations, and ongoing monitoring. Where clinically
              appropriate, he prescribes GLP-1 support as part of a wider programme that includes nutrition structure,
              habit-based strength training to protect metabolism, and a long-term maintenance plan.
            </P>
          </div>
        </div>

        <blockquote
          className="font-serif"
          style={{ fontSize: "clamp(18px,2.2vw,25px)", color: "var(--ink)", lineHeight: 1.5, textAlign: "center", margin: "36px auto 0", maxWidth: "860px" }}
        >
          &ldquo;Prescribing Ozempic or Mounjaro is the easy part. Building a programme that works after the medication
          stops, that&rsquo;s the real work.&rdquo;
          <footer style={{ fontSize: "14px", color: "var(--label)", marginTop: "14px", letterSpacing: "0.04em" }}>— Dr. Teebi</footer>
        </blockquote>

        <div className="text-center" style={{ marginTop: "32px" }}>
          <Cta />
        </div>
      </>
    ),
  },
];

function HowItWorks() {
  const [active, setActive] = useState(0);
  return (
    <section id="how-it-works" style={{ background: "var(--cream)", padding: "72px 0" }}>
      <div className="container">
        <H2>how it works</H2>

        {/* tab row */}
        <div className="flex items-center justify-center" style={{ gap: "10px", flexWrap: "wrap", marginBottom: "40px" }}>
          {STEPS.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={on}
                className="font-display"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.12em",
                  padding: "11px 22px",
                  borderRadius: "2px",
                  border: `1px solid ${on ? "var(--teal)" : "var(--line)"}`,
                  background: on ? "var(--teal)" : "var(--white)",
                  color: on ? "var(--white)" : "var(--ink-soft)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                STEP {s.num}
              </button>
            );
          })}
        </div>

        {/* panels — all in DOM; only active is visible */}
        <Reveal key={active}>
          <div
            style={{
              background: "var(--white)",
              border: "1px solid var(--line)",
              borderRadius: "12px",
              padding: "clamp(24px,4vw,44px)",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            {STEPS.map((s, i) => (
              <div key={s.num} hidden={i !== active}>
                <div className="flex items-center" style={{ gap: "16px", marginBottom: "22px" }}>
                  <Image src={s.icon} alt="" width={56} height={56} style={{ width: "48px", height: "48px", objectFit: "contain" }} />
                  <div>
                    <p className="font-display" style={{ fontSize: "12px", color: "var(--teal)", letterSpacing: "0.14em" }}>STEP {s.num}</p>
                    <h3 className="font-display" style={{ fontSize: "clamp(17px,2.2vw,20px)", color: "var(--ink)" }}>{s.title}</h3>
                  </div>
                </div>
                {s.body}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- S6 PROMISE ---------- */

function Promise() {
  return (
    <section id="promise" style={{ background: "var(--white)", padding: "80px 0" }}>
      <div className="container">
        <Reveal>
          <h2
            className="font-serif"
            style={{ textAlign: "center", fontSize: "clamp(30px,5vw,48px)", color: "var(--ink)", textTransform: "lowercase", lineHeight: 1.25, marginBottom: "48px" }}
          >
            up to 1kg per week measured. verified. comitted.
          </h2>
        </Reveal>
        <div className="grid" style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1.2fr)", gap: "48px", alignItems: "start" }}>
          <Reveal>
            <p className="font-serif" style={{ fontSize: "clamp(20px,2.6vw,26px)", color: "var(--ink)", lineHeight: 1.45 }}>
              Only clinic in Malta to offer an extended care commitment on Ozempic &amp; Mounjaro programmes
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.8, marginBottom: "24px" }}>
              We are selective about who we prescribe Ozempic or Mounjaro to. We only accept those we genuinely believe
              we can help reach their healthy weight. If you qualify and complete your programme and do not hit your
              target weight, we will extend your programme at no extra fee until we achieve your desired result.
            </p>
            <p style={{ fontSize: "14px", color: "var(--ink-soft)", fontWeight: 600, marginBottom: "16px" }}>
              *To ensure results remain measurable and medically valid, patients must:
            </p>
            <ul>
              <Bullet kind="check">Attend all scheduled in clinic sessions and weekly check ins</Bullet>
              <Bullet kind="check">Follow your personalised food plan consistently and tell us when you struggle</Bullet>
              <Bullet kind="check">Complete your agreed physical activities &amp; discuss any pain or obstacles</Bullet>
              <Bullet kind="check">Use only the treatments and medications recommended by our medical team</Bullet>
              <Bullet kind="check">Inform us of any major health (e.g., heart disease) or medication changes</Bullet>
              <Bullet kind="check">Avoid crash diets, extreme restriction or outside weight loss treatments that could affect your results</Bullet>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- S7 SAFETY ---------- */

function Safety() {
  return (
    <section id="safety" style={{ background: "var(--cream)", padding: "72px 0" }}>
      <div className="container">
        <Reveal>
          <H2>ozempic &amp; mounjaro: safety, side effects, &amp; our system</H2>
        </Reveal>
        <div className="grid" style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1.1fr)", gap: "44px", alignItems: "start", marginTop: "12px" }}>
          <Reveal>
            <Image src={`${A}/ozempic-pen.jpg`} alt="Ozempic injection pen — GLP-1 medication prescribed at Carisma Aesthetics" width={477} height={270} style={{ width: "100%", height: "auto", borderRadius: "10px", marginBottom: "16px" }} />
            <div className="grid" style={{ gridTemplateColumns: "176px minmax(0,1fr)", gap: "16px" }}>
              <Image src={`${A}/safety-consult-1.jpg`} alt="Patient consultation for Ozempic side effect management in Malta" width={176} height={168} style={{ width: "100%", height: "auto", borderRadius: "10px" }} />
              <Image src={`${A}/safety-consult-2.jpg`} alt="Doctor-led Ozempic monitoring session at Carisma clinic" width={281} height={168} style={{ width: "100%", height: "auto", borderRadius: "10px" }} />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.8, marginBottom: "22px" }}>
              We prescribe Ozempic and Mounjaro with strict screening, clear education, and ongoing monitoring. Most
              side effects are manageable when dosing and nutrition are structured, and follow-ups are consistent.
            </p>
            <p style={{ fontSize: "14px", color: "var(--ink-soft)", fontWeight: 600, marginBottom: "16px" }}>
              Common Ozempic and Mounjaro side effects and how we reduce them:
            </p>
            <ul>
              <Bullet kind="check"><strong>Nausea:</strong> slow titration, protein-first meals, hydration and electrolytes, injection timing guidance</Bullet>
              <Bullet kind="check"><strong>Constipation:</strong> tolerance-based fibre targets, fluids, daily movement, magnesium support when appropriate</Bullet>
              <Bullet kind="check"><strong>Diarrhoea:</strong> simple meal sequencing, trigger-food control, temporary dose stabilisation</Bullet>
              <Bullet kind="check"><strong>Fatigue:</strong> minimum calorie floors, protein and micronutrient monitoring, strength habits to protect energy</Bullet>
              <Bullet kind="check"><strong>Reflux:</strong> smaller structured portions, meal timing rules, behavioural guidance</Bullet>
            </ul>
          </Reveal>
        </div>
        <p style={{ maxWidth: "960px", margin: "32px auto 0", textAlign: "center", fontSize: "14.5px", color: "var(--label)", lineHeight: 1.8 }}>
          The biggest clinical mistake: prescribing Ozempic or Mounjaro without a system. Medication can quiet appetite,
          but it does not build muscle, teach eating, fix emotional drivers, or create long-term habits. That&rsquo;s
          why we pair every GLP-1 prescription with strength training, protein-first structure, behavioural coaching,
          accountability, and a maintenance plan.
        </p>
        <div className="text-center" style={{ marginTop: "32px" }}>
          <Cta />
        </div>
      </div>
    </section>
  );
}

/* ---------- S8 METHODOLOGY ---------- */

const PILLARS = [
  {
    icon: `${A}/pillar-location.png`,
    label: "MEDICAL ELIGIBILITY & ASSESSMENT",
    body:
      "Every Ozempic or Mounjaro journey begins with a full medical consultation to assess suitability, health history, and individual goals before any prescription is written.",
  },
  {
    icon: `${A}/pillar-rise.png`,
    label: "APPETITE & METABOLIC SUPPORT",
    body:
      "Ozempic and Mounjaro support natural fullness signals and reduce food noise, helping make portion control and consistency feel more manageable.",
  },
  {
    icon: `${A}/pillar-dollar.png`,
    label: "SAFE, LONG-TERM APPROACH",
    body:
      "This is not a crash solution. Ozempic and Mounjaro are always used as part of a wider lifestyle plan designed for sustainable, steady weight loss — with a clear exit strategy.",
  },
];

function Methodology() {
  return (
    <section id="methodology" style={{ background: "var(--white)", padding: "72px 0" }}>
      <div className="container">
        <Reveal>
          <Eyebrow center>4 core pillars of our Ozempic &amp; Mounjaro methodology</Eyebrow>
          <H2 serif>a doctor-led glp-1 programme built to last</H2>
        </Reveal>
        <div className="grid" style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "48px", alignItems: "start", marginTop: "20px" }}>
          <Reveal>
            <Image src={`${A}/methodology-photo.jpg`} alt="Doctor-led Ozempic and Mounjaro programme — medical assessment at Carisma" width={382} height={183} style={{ width: "100%", height: "auto", borderRadius: "10px", marginBottom: "26px" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              {PILLARS.map((p) => (
                <div key={p.label} className="flex items-start" style={{ gap: "14px" }}>
                  <Image src={p.icon} alt="" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <p className="font-display" style={{ fontSize: "13px", color: "var(--ink)", letterSpacing: "0.08em", marginBottom: "6px" }}>{p.label}</p>
                    <p style={{ fontSize: "13.5px", color: "var(--label)", lineHeight: 1.7 }}>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ul>
              <Bullet kind="check">Initial medical consultation &amp; Ozempic/Mounjaro eligibility review</Bullet>
              <Bullet kind="check">Personalised GLP-1 treatment planning and dose titration</Bullet>
              <Bullet kind="check">Ongoing Medical Monitoring &amp; Reviews</Bullet>
              <Bullet kind="check">Nutrition &amp; Lifestyle Support Integration</Bullet>
            </ul>
            <div style={{ marginTop: "28px" }}>
              <Cta />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- S9 DIFFERENCE ---------- */

function Difference() {
  return (
    <section id="difference" style={{ background: "var(--cream)", padding: "72px 0" }}>
      <div className="container">
        <Reveal>
          <Eyebrow center>the carisma difference</Eyebrow>
          <H2 serif>malta&rsquo;s #1 leading wellness chain</H2>
        </Reveal>
        <div className="grid" style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "48px", alignItems: "center", marginTop: "20px" }}>
          <Reveal>
            <h3 className="font-display" style={{ fontSize: "15px", color: "var(--ink)", marginBottom: "16px" }}>our commitment</h3>
            <ul style={{ marginBottom: "30px" }}>
              <Bullet kind="check">Visible inch loss and shape change, not vague promises</Bullet>
              <Bullet kind="check">Plans that work with your age, hormones and metabolism</Bullet>
              <Bullet kind="check">No crash diets, no banned foods, no endless hours of cardio</Bullet>
              <Bullet kind="check">Medical grade technology and treatments delivered by trained professionals</Bullet>
            </ul>
            <h3 className="font-display" style={{ fontSize: "15px", color: "var(--ink)", marginBottom: "16px" }}>
              Why Malta chooses Carisma for Ozempic &amp; Mounjaro
            </h3>
            <ul>
              <Bullet kind="check">Created by the team behind Malta&rsquo;s leading spa and medical aesthetics centres</Bullet>
              <Bullet kind="check">Doctor led medical slimming, not a beauty salon &ldquo;diet program&rdquo;</Bullet>
              <Bullet kind="check">All in one approach: assessment, nutrition, movement and treatments</Bullet>
              <Bullet kind="check">High touch support with weekly check ins and WhatsApp coaching</Bullet>
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ position: "relative" }}>
              <Image src={`${A}/difference-photo.png`} alt="" width={678} height={610} style={{ width: "100%", height: "auto", borderRadius: "10px" }} />
              <div
                className="flex items-center"
                style={{ gap: "10px", position: "absolute", bottom: "16px", left: "16px", background: "var(--white)", padding: "10px 16px", borderRadius: "8px", boxShadow: "0 8px 22px rgba(0,0,0,0.14)" }}
              >
                <Image src={`${A}/icon-parking.png`} alt="" width={31} height={35} style={{ width: "24px", height: "auto" }} />
                <span className="font-display" style={{ fontSize: "11px", color: "var(--ink)", letterSpacing: "0.08em" }}>Complimentary on-site parking</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- S10 NOT ANOTHER DIET CLINIC ---------- */

function NotAnotherClinic() {
  const tiles = [`${A}/grid-1g.png`, `${A}/grid-2g.png`, `${A}/grid-3g.png`, `${A}/grid-4g.png`];
  return (
    <section id="not-another-clinic" style={{ background: "var(--white)", padding: "72px 0" }}>
      <div className="container">
        <div className="grid" style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "48px", alignItems: "center" }}>
          <Reveal>
            <h2 className="font-display" style={{ fontSize: "clamp(22px,3vw,28px)", color: "var(--ink)", lineHeight: 1.25, marginBottom: "20px" }}>
              we are not another diet clinic.
            </h2>
            <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.85 }}>
              We&rsquo;re a doctor-led Ozempic and Mounjaro programme that blends medical insight, sustainable nutrition,
              and modern body technology into one high-touch system, so you don&rsquo;t just lose weight, you step into
              your strongest form.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {tiles.map((src, i) => (
                <Image key={i} src={src} alt="" width={284} height={299} style={{ width: "100%", height: "auto", borderRadius: "10px", objectFit: "cover" }} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- S11 FAQs ---------- */

const FAQS: Faq[] = [
  {
    q: "What is Ozempic and how does it work for weight loss?",
    a: "Ozempic (semaglutide) is a GLP-1 receptor agonist, a prescription medication that mimics a naturally occurring hormone in your body. It works by signalling your brain to feel full sooner, reducing appetite and food noise, and slowing gastric emptying. This makes it easier to eat less without the constant battle with hunger. At Carisma, Ozempic is always prescribed as part of a structured, doctor-led programme — never as a standalone prescription.",
  },
  {
    q: "Who is this programme really for, and do I need to be over 30 or in menopause to qualify?",
    a: "The programme is for adults who feel stuck with their weight and want a safe, clinically guided solution with Ozempic or Mounjaro. Many clients are in their thirties, forties and fifties, dealing with stress, work, family and sometimes hormonal changes. You do not have to be a certain age. We look at your health, goals, and capacity, then tell you honestly if GLP-1 medication is the right fit.",
  },
  {
    q: "How much weight can I realistically lose on Ozempic or Mounjaro?",
    a: "If you qualify and follow the programme, our patients lose on average around 1 kg per week. Clinical trials show average weight loss of 10–15% of body weight with Ozempic and 15–22% with Mounjaro over 12–18 months. Your results depend on starting weight, body composition, health, programme length, and plan adherence. We track progress with body scans and measurements, not just the scale.",
  },
  {
    q: "What exactly happens in the medical assessment? Is it safe if I have existing health issues?",
    a: "In your assessment you sit with our doctor and go through your medical history, medications, past diets, and hormonal or metabolic concerns. We take clinical measurements and perform a body composition scan. If needed, we may recommend blood tests, blood pressure checks, or food intolerance tests. Many clients already have conditions like high blood pressure, thyroid issues, or early diabetes, that's exactly why we screen properly and adapt your Ozempic or Mounjaro plan around your safety.",
  },
  {
    q: "Will I have to follow a strict meal plan, or can I still eat bread, pasta, wine?",
    a: "You will have structure, not prison. We use a Mediterranean-style framework with enough protein, vegetables, and healthy fats, then fit it to your culture and lifestyle. We plan for weekends, events, and eating out. No food is automatically banned. The focus is on what you can consistently follow, especially important while on Ozempic or Mounjaro, where appetite is reduced and every meal needs to count nutritionally.",
  },
  {
    q: "What are the side effects of Ozempic and Mounjaro?",
    a: "The most common side effects of Ozempic and Mounjaro are gastrointestinal, nausea, constipation, diarrhoea, and fatigue, and are usually temporary, occurring in the early weeks as your body adjusts. We manage these through slow dose titration, protein-first nutrition, hydration protocols, and regular doctor reviews. Serious side effects are rare when prescribed appropriately and monitored closely, which is why ongoing medical supervision is a non-negotiable part of our programme.",
  },
  {
    q: "Mounjaro vs Ozempic — what is the difference?",
    a: "Both are GLP-1 medications used for weight loss, but they work differently. Ozempic (semaglutide) targets GLP-1 receptors only, while Mounjaro (tirzepatide) targets both GLP-1 and GIP receptors, a dual-action mechanism that may offer stronger appetite suppression. In clinical trials, Mounjaro showed average weight loss of 15–22% compared to 10–15% with Ozempic. Our doctor recommends the right medication based on your medical assessment, not marketing trends.",
  },
  {
    q: "Can I get Ozempic in Malta? Is it available?",
    a: "Yes. Ozempic is available in Malta by prescription. At Carisma Aesthetics, our doctors can prescribe Ozempic or Mounjaro after a full medical assessment confirms eligibility. We manage the prescription, dosing, and monitoring in-clinic so you don't need to navigate pharmacies or dosage changes on your own.",
  },
  {
    q: "How much does Ozempic cost in Malta?",
    a: "Ozempic and Mounjaro costs depend on the dose you need, programme length, and complementary treatments included. We are fully transparent, you receive a clear plan and pricing in your consultation before starting. We can also discuss payment options to spread your investment. Contact us for current Ozempic and Mounjaro pricing in Malta.",
  },
  {
    q: "Do I have to take Ozempic or Mounjaro forever?",
    a: "No. Ozempic and Mounjaro are tools, not lifelong commitments. Our programme includes a defined maintenance phase and exit strategy. We build the habits, nutrition structure, and movement routine you need to maintain results after stepping down from medication. Research shows that stopping GLP-1 medication without a structured plan often leads to weight regain, which is why we include a post-medication protocol.",
  },
  {
    q: "Is Ozempic safe?",
    a: "When prescribed appropriately and monitored by a doctor, Ozempic and Mounjaro are widely used and clinically studied. Large-scale trials show most side effects are mild to moderate and manageable. Comprehensive safety reviews have found no increased risk of serious adverse outcomes when prescribed following clinical guidelines. This is why medical assessment and ongoing supervision are non-negotiable parts of our programme.",
  },
  {
    q: "What is Ozempic face and how do you prevent it?",
    a: "Ozempic face\" describes the facial volume loss, sagging, and hollowness some patients experience during rapid weight loss on GLP-1 medications. At Carisma Aesthetics, we prevent this by controlling the pace of weight loss, prioritising protein intake to preserve facial fullness, and offering collagen-stimulating treatments and dermal fillers if needed. Being an aesthetics clinic and GLP-1 programme under one roof means we treat the whole picture, body and face.",
  },
  {
    q: "Can I combine Ozempic with body contouring treatments?",
    a: "Yes, and this is one of the key advantages of doing your GLP-1 programme at Carisma Aesthetics. While Ozempic or Mounjaro helps you lose weight, treatments like EMSculpt NEO (muscle building), CoolSculpting (fat freezing), and VelaShape (skin tightening) shape and refine your body as it changes. Your treatment plan is tailored to your body composition and goals.",
  },
  {
    q: "How is the Ozempic programme at Carisma different from just getting a prescription?",
    a: "Getting a prescription is easy. Building a programme that delivers lasting results is not. At Carisma, your Ozempic or Mounjaro prescription is one part of a wider system: medical monitoring, personalised nutrition, strength training guidance, weekly accountability, body contouring treatments, aesthetics support for Ozempic face prevention, and a defined exit strategy. We don't prescribe and forget, we guide you through every phase.",
  },
];

function Faqs() {
  return (
    <section id="faqs" style={{ background: "var(--white)", padding: "72px 0" }}>
      <div className="container">
        <h2 className="font-serif" style={{ textAlign: "center", fontSize: "clamp(20px,2.6vw,25px)", color: "var(--teal)", textTransform: "lowercase", marginBottom: "36px" }}>
          faqs about ozempic &amp; mounjaro
        </h2>
        <Reveal>
          <FaqAccordion items={FAQS} uppercase={false} />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- S12 RESEARCH ---------- */

type ResearchCard = {
  img: string;
  title: string;
  pill: string;
  whatItDoes: string;
  keyResults: { text: string; cite: string }[];
};

const RESEARCH: ResearchCard[] = [
  {
    img: `${A}/research-1-glp1.png`,
    title: "glp-1 receptor agonists for weight management",
    pill: "Moderate-high evidence",
    whatItDoes:
      "GLP-1 receptor agonists like Ozempic (semaglutide) and Mounjaro (tirzepatide) mimic naturally occurring gut hormones involved in appetite regulation. They slow gastric emptying, increase satiety, and reduce hunger signals in the brain, helping patients feel full sooner and eat less without relying solely on willpower.",
    keyResults: [
      {
        text: "A large randomised controlled trial published in The New England Journal of Medicine showed that patients using semaglutide (Ozempic) alongside lifestyle intervention achieved significantly greater and more sustained weight loss compared to lifestyle changes alone, with improvements maintained over 68 weeks.",
        cite: "NEJM",
      },
      {
        text: "A systematic review of multiple clinical trials reported consistent reductions in body weight and appetite, with GLP-1 therapies demonstrating a favourable safety profile when medically supervised.",
        cite: "PMC",
      },
    ],
  },
  {
    img: `${A}/research-2-foodnoise.png`,
    title: "ozempic, mounjaro & reduction of “food noise”",
    pill: "Moderate-high evidence",
    whatItDoes:
      "GLP-1 receptor agonists act on appetite centres in the brain, helping reduce constant thoughts about food, cravings, and reward-driven eating behaviours often described as “food noise.”",
    keyResults: [
      {
        text: "Neuroimaging and behavioural studies have shown that GLP-1 therapies reduce activation in brain regions linked to food reward and impulsive eating, supporting better appetite control and eating behaviour regulation.",
        cite: "Nature Medicine",
      },
      {
        text: "Clinical observations reported in peer-reviewed studies note improved dietary adherence and reduced emotional eating when Ozempic or Mounjaro is combined with structured lifestyle support.",
        cite: "PMC",
      },
    ],
  },
  {
    img: `${A}/research-3-regain.png`,
    title: "long-term weight regain prevention with ozempic & mounjaro",
    pill: "Moderate-high evidence",
    whatItDoes:
      "By supporting appetite regulation and metabolic signalling, Ozempic and Mounjaro help address one of the main drivers of weight regain after dieting: persistent hunger and reduced satiety.",
    keyResults: [
      {
        text: "A long-term follow-up study found that patients who continued semaglutide therapy alongside lifestyle changes maintained significantly more weight loss compared to those relying on lifestyle intervention alone, highlighting the biological role of appetite hormones in weight maintenance.",
        cite: "The Lancet",
      },
      {
        text: "Additional research confirms that discontinuation of Ozempic or Mounjaro without behavioural support may lead to appetite return, reinforcing the importance of structured, doctor-led programmes.",
        cite: "PMC",
      },
    ],
  },
  {
    img: `${A}/research-4-safety.png`,
    title: "safety and tolerability of medically supervised ozempic & mounjaro use",
    pill: "High evidence",
    whatItDoes:
      "Ozempic and Mounjaro have been extensively studied for safety when prescribed appropriately and monitored by healthcare professionals, with dose titration used to improve tolerability.",
    keyResults: [
      {
        text: "Large-scale clinical trials and post-marketing surveillance studies report that most side effects are mild to moderate and temporary, commonly gastrointestinal, and manageable through gradual dose adjustments and medical follow-up.",
        cite: "FDA / PMC",
      },
      {
        text: "A comprehensive safety review found no increased risk of serious adverse outcomes when GLP-1 medications are prescribed following clinical guidelines.",
        cite: "JAMA",
      },
    ],
  },
];

function ResearchCardView({ card }: { card: ResearchCard }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "var(--white)", border: "1px solid var(--line)", borderRadius: "12px", overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.05)" }}>
      <Image src={card.img} alt="" width={381} height={182} style={{ width: "100%", height: "auto", display: "block" }} />
      <div style={{ padding: "24px" }}>
        <h3 className="font-display" style={{ fontSize: "16px", color: "var(--ink)", textAlign: "center", lineHeight: 1.4, marginBottom: "16px" }}>
          {card.title}
        </h3>
        <div className="flex justify-center" style={{ marginBottom: "20px" }}>
          <span className="font-display" style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--white)", background: "var(--teal)", padding: "7px 16px", borderRadius: "20px" }}>
            {card.pill}
          </span>
        </div>
        <p className="font-display" style={{ fontSize: "12px", color: "var(--teal)", letterSpacing: "0.1em", marginBottom: "8px" }}>WHAT IT DOES</p>
        <p style={{ fontSize: "13.5px", color: "var(--label)", lineHeight: 1.75, marginBottom: "18px" }}>{card.whatItDoes}</p>

        <div style={{ display: open ? "block" : "none" }}>
          <p className="font-display" style={{ fontSize: "12px", color: "var(--teal)", letterSpacing: "0.1em", marginBottom: "10px" }}>KEY RESULTS</p>
          <ul style={{ margin: 0 }}>
            {card.keyResults.map((r, i) => (
              <li key={i} style={{ fontSize: "13px", color: "var(--label)", lineHeight: 1.7, marginBottom: "14px" }}>
                {r.text} <strong style={{ color: "var(--ink)" }}>{r.cite}</strong>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", color: "var(--teal)", fontSize: "13px", fontWeight: 600, marginTop: "6px" }}
        >
          {open ? "Read less" : "Read more"}
        </button>
      </div>
    </div>
  );
}

function Research() {
  return (
    <section id="research" style={{ background: "var(--cream)", padding: "72px 0" }}>
      <div className="container">
        <Reveal>
          <Eyebrow center>CLINICAL RESEARCH: basis of our Ozempic &amp; Mounjaro methodology</Eyebrow>
          <H2 serif style={{ fontSize: "clamp(24px,3.6vw,30px)" }}>evidence based approach</H2>
        </Reveal>
        <div className="grid" style={{ gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "28px", maxWidth: "960px", margin: "0 auto" }}>
          {RESEARCH.map((c) => (
            <Reveal key={c.title}>
              <ResearchCardView card={c} />
            </Reveal>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: "40px" }}>
          <Cta>book your Medical consultation</Cta>
        </div>
      </div>
    </section>
  );
}

/* ---------- END BOUNDARY ---------- */

function EndBoundary() {
  return (
    <section style={{ background: "var(--white)", padding: "56px 0 16px" }}>
      <div className="container">
        <h2 className="font-serif" style={{ textAlign: "center", fontSize: "clamp(26px,4vw,35px)", color: "var(--ink)", textTransform: "lowercase" }}>
          real people, real reviews
        </h2>
      </div>
    </section>
  );
}
