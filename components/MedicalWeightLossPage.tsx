import Link from "next/link";
import Reveal from "@/components/Reveal";
import FaqAccordion, { type Faq } from "@/components/FaqAccordion";
import MwlStepper from "@/components/MwlStepper";

const A = "/assets/treatments";
const CTA = "book your medical consultation";

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="font-display text-center" style={{ fontSize: "18px", color: "var(--gold-deep)", letterSpacing: "0.02em" }}>{children}</p>;
}
function Serif({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <h2 className="font-serif text-center" style={{ fontSize: "clamp(22px,3vw,30px)", color: "var(--gold-deep)", letterSpacing: "0.06em", fontWeight: 400, lineHeight: 1.3, ...style }}>{children}</h2>;
}
function Book() {
  return <Link href="/consultation" style={{ display: "inline-block", background: "#6391AB", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "15px 34px", borderRadius: "10px" }}>{CTA}</Link>;
}
function Dot() { return <span style={{ color: "var(--gold-deep)", fontSize: "11px", lineHeight: 1.8, flexShrink: 0 }}>●</span>; }
function Tick() { return <svg className="shrink-0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold-deep)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "1px" }}><path d="M5 12.5l4.5 4.5L19 7" /></svg>; }
function Ex() { return <svg className="shrink-0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b3a98f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "1px" }}><path d="M7 7l10 10M17 7L7 17" /></svg>; }

const HELPS = ["Appetite regulation and feeling full sooner", "Craving reduction and less “food noise”", "Better control and adherence to your plan", "Better blood sugar control & metabolic support"];
const NOTDO = ["Build muscle or protect your metabolism on its own", "Teach eating habits or create a repeatable routine", "Fix emotional drivers or stress eating", "Create long-term identity change and maintenance"];

const FEATURES = [
  { icon: "mwl-feat1.png", label: "Doctor-first, not drug-first", desc: "We start with clinical suitability, not dosage. Your consultation reviews your full health history, risks, and goals. Our doctor then sets clear expectations and a safe Ozempic or Mounjaro plan with ongoing medical oversight." },
  { icon: "mwl-feat2.png", label: "APPETITE & METABOLIC SUPPORT", desc: "Ozempic and Mounjaro quiet hunger and reduce food noise, making consistency easier. If you qualify, we titrate carefully, monitor side effects, and pair your prescription with a repeatable eating structure — never medication in isolation." },
  { icon: "mwl-feat3.png", label: "Body composition, not weight", desc: "We track what actually matters: fat loss while protecting lean mass. You see progress through body composition trends, measurements, and strength progression — not just a number on the scale." },
  { icon: "mwl-feat4.png", label: "Programme, not prescription", desc: "An Ozempic or Mounjaro prescription alone is not a solution. Results come from phases, milestones, and a defined maintenance plan. We guide you through a structured start, progress targets, and an exit strategy." },
];

const PROMISE_RULES = ["Attend all scheduled in clinic sessions and weekly check ins", "Follow your personalised food plan consistently and tell us when you struggle", "Complete your agreed physical activities & discuss any pain or obstacles", "Use only the treatments and medications recommended by our medical team", "Inform us of any major health (e.g., heart disease) or medication changes", "Avoid crash diets, extreme restriction or outside weight loss treatments that could affect your results"];

const SIDE_EFFECTS = [
  ["Nausea", "slow titration, protein-first meals, hydration and electrolytes, injection timing guidance"],
  ["Constipation", "tolerance-based fibre targets, fluids, daily movement, magnesium support when appropriate"],
  ["Diarrhoea", "simple meal sequencing, trigger-food control, temporary dose stabilisation"],
  ["Fatigue", "minimum calorie floors, protein and micronutrient monitoring, strength habits to protect energy"],
  ["Reflux", "smaller structured portions, meal timing rules, behavioural guidance"],
];

const PILLARS = [
  { title: "MEDICAL ELIGIBILITY & ASSESSMENT", desc: "Every Ozempic or Mounjaro journey begins with a full medical consultation to assess suitability, health history, and individual goals before any prescription is written." },
  { title: "APPETITE & METABOLIC SUPPORT", desc: "Ozempic and Mounjaro support natural fullness signals and reduce food noise, helping make portion control and consistency feel more manageable." },
  { title: "SAFE, LONG-TERM APPROACH", desc: "This is not a crash solution. Ozempic and Mounjaro are always used as part of a wider lifestyle plan designed for sustainable, steady weight loss — with a clear exit strategy." },
];
const PILLAR_STEPS = ["Initial medical consultation & Ozempic/Mounjaro eligibility review", "Personalised GLP-1 treatment planning and dose titration", "Ongoing Medical Monitoring & Reviews", "Nutrition & Lifestyle Support Integration"];

const COMMITMENT = ["Visible inch loss and shape change, not vague promises", "Plans that work with your age, hormones and metabolism", "No crash diets, no banned foods, no endless hours of cardio", "Medical grade technology and treatments delivered by trained professionals"];
const WHY = ["Created by the team behind Malta’s leading spa and medical aesthetics centres", "Doctor led medical slimming, not a beauty salon “diet program”", "All in one approach: assessment, nutrition, movement and treatments", "High touch support with weekly check ins and WhatsApp coaching"];

const FAQS: Faq[] = [
  { q: "What is Ozempic and how does it work for weight loss?", a: "Ozempic (semaglutide) is a GLP-1 receptor agonist, a prescription medication that mimics a naturally occurring hormone in your body. It works by signalling your brain to feel full sooner, reducing appetite and food noise, and slowing gastric emptying. This makes it easier to eat less without the constant battle with hunger. At Carisma, Ozempic is always prescribed as part of a structured, doctor-led programme — never as a standalone prescription." },
  { q: "Who is this programme really for, and do I need to be over 30 or in menopause to qualify?", a: "The programme is for adults who feel stuck with their weight and want a safe, clinically guided solution with Ozempic or Mounjaro. Many clients are in their thirties, forties and fifties, dealing with stress, work, family and sometimes hormonal changes. You do not have to be a certain age. We look at your health, goals, and capacity, then tell you honestly if GLP-1 medication is the right fit." },
  { q: "How much weight can I realistically lose on Ozempic or Mounjaro?", a: "If you qualify and follow the programme, our patients lose on average around 1 kg per week. Clinical trials show average weight loss of 10–15% of body weight with Ozempic and 15–22% with Mounjaro over 12–18 months. Your results depend on starting weight, body composition, health, programme length, and plan adherence. We track progress with body scans and measurements, not just the scale." },
  { q: "What exactly happens in the medical assessment? Is it safe if I have existing health issues?", a: "In your assessment you sit with our doctor and go through your medical history, medications, past diets, and hormonal or metabolic concerns. We take clinical measurements and perform a body composition scan. If needed, we may recommend blood tests, blood pressure checks, or food intolerance tests. Many clients already have conditions like high blood pressure, thyroid issues, or early diabetes, that's exactly why we screen properly and adapt your Ozempic or Mounjaro plan around your safety." },
  { q: "Will I have to follow a strict meal plan, or can I still eat bread, pasta, wine?", a: "You will have structure, not prison. We use a Mediterranean-style framework with enough protein, vegetables, and healthy fats, then fit it to your culture and lifestyle. We plan for weekends, events, and eating out. No food is automatically banned. The focus is on what you can consistently follow, especially important while on Ozempic or Mounjaro, where appetite is reduced and every meal needs to count nutritionally." },
  { q: "What are the side effects of Ozempic and Mounjaro?", a: "The most common side effects of Ozempic and Mounjaro are gastrointestinal, nausea, constipation, diarrhoea, and fatigue, and are usually temporary, occurring in the early weeks as your body adjusts. We manage these through slow dose titration, protein-first nutrition, hydration protocols, and regular doctor reviews. Serious side effects are rare when prescribed appropriately and monitored closely, which is why ongoing medical supervision is a non-negotiable part of our programme." },
  { q: "Mounjaro vs Ozempic — what is the difference?", a: "Both are GLP-1 medications used for weight loss, but they work differently. Ozempic (semaglutide) targets GLP-1 receptors only, while Mounjaro (tirzepatide) targets both GLP-1 and GIP receptors, a dual-action mechanism that may offer stronger appetite suppression. In clinical trials, Mounjaro showed average weight loss of 15–22% compared to 10–15% with Ozempic. Our doctor recommends the right medication based on your medical assessment, not marketing trends." },
  { q: "Can I get Ozempic in Malta? Is it available?", a: "Yes. Ozempic is available in Malta by prescription. At Carisma Aesthetics, our doctors can prescribe Ozempic or Mounjaro after a full medical assessment confirms eligibility. We manage the prescription, dosing, and monitoring in-clinic so you don't need to navigate pharmacies or dosage changes on your own." },
  { q: "How much does Ozempic cost in Malta?", a: "Ozempic and Mounjaro costs depend on the dose you need, programme length, and complementary treatments included. We are fully transparent, you receive a clear plan and pricing in your consultation before starting. We can also discuss payment options to spread your investment. Contact us for current Ozempic and Mounjaro pricing in Malta." },
  { q: "Do I have to take Ozempic or Mounjaro forever?", a: "No. Ozempic and Mounjaro are tools, not lifelong commitments. Our programme includes a defined maintenance phase and exit strategy. We build the habits, nutrition structure, and movement routine you need to maintain results after stepping down from medication. Research shows that stopping GLP-1 medication without a structured plan often leads to weight regain, which is why we include a post-medication protocol." },
  { q: "Is Ozempic safe?", a: "When prescribed appropriately and monitored by a doctor, Ozempic and Mounjaro are widely used and clinically studied. Large-scale trials show most side effects are mild to moderate and manageable. Comprehensive safety reviews have found no increased risk of serious adverse outcomes when prescribed following clinical guidelines. This is why medical assessment and ongoing supervision are non-negotiable parts of our programme." },
  { q: "What is Ozempic face and how do you prevent it?", a: "“Ozempic face” describes the facial volume loss, sagging, and hollowness some patients experience during rapid weight loss on GLP-1 medications. At Carisma Aesthetics, we prevent this by controlling the pace of weight loss, prioritising protein intake to preserve facial fullness, and offering collagen-stimulating treatments and dermal fillers if needed. Being an aesthetics clinic and GLP-1 programme under one roof means we treat the whole picture, body and face." },
  { q: "Can I combine Ozempic with body contouring treatments?", a: "Yes, and this is one of the key advantages of doing your GLP-1 programme at Carisma Aesthetics. While Ozempic or Mounjaro helps you lose weight, treatments like EMSculpt NEO (muscle building), CoolSculpting (fat freezing), and VelaShape (skin tightening) shape and refine your body as it changes. Your treatment plan is tailored to your body composition and goals." },
  { q: "How is the Ozempic programme at Carisma different from just getting a prescription?", a: "Getting a prescription is easy. Building a programme that delivers lasting results is not. At Carisma, your Ozempic or Mounjaro prescription is one part of a wider system: medical monitoring, personalised nutrition, strength training guidance, weekly accountability, body contouring treatments, aesthetics support for Ozempic face prevention, and a defined exit strategy. We don't prescribe and forget, we guide you through every phase." },
];

const RESEARCH = [
  { image: "mwl-research1.jpg", title: "glp-1 receptor agonists for weight management", whatItDoes: "GLP-1 receptor agonists like Ozempic (semaglutide) and Mounjaro (tirzepatide) mimic naturally occurring gut hormones involved in appetite regulation. They slow gastric emptying, increase satiety, and reduce hunger signals in the brain, helping patients feel full sooner and eat less without relying solely on willpower.", keyResults: ["Doctor-prescribed medication", "Appetite regulation support", "Requires medical assessment and monitoring"], evidence: "Moderate-high evidence" },
  { image: "mwl-research2.jpg", title: "ozempic, mounjaro & reduction of “food noise”", whatItDoes: "GLP-1 receptor agonists act on appetite centres in the brain, helping reduce constant thoughts about food, cravings, and reward-driven eating behaviours often described as “food noise.”", keyResults: ["Craving reduction", "Behavioural support", "Best used with nutrition guidance"], evidence: "Moderate-high evidence" },
  { image: "mwl-research3.jpg", title: "long-term weight regain prevention with ozempic & mounjaro", whatItDoes: "By supporting appetite regulation and metabolic signalling, Ozempic and Mounjaro help address one of the main drivers of weight regain after dieting: persistent hunger and reduced satiety.", keyResults: ["Weight maintenance support", "Long-term planning", "Lifestyle integration essential"], evidence: "Moderate-high evidence" },
  { title: "safety and tolerability of medically supervised ozempic & mounjaro use", whatItDoes: "Ozempic and Mounjaro have been extensively studied for safety when prescribed appropriately and monitored by healthcare professionals, with dose titration used to improve tolerability.", keyResults: ["Prescription-only", "Requires eligibility screening", "Ongoing medical monitoring"], evidence: "High evidence" },
];

function List({ items, ok }: { items: string[]; ok: boolean }) {
  return (
    <ul className="space-y-3.5">
      {items.map((s) => (<li key={s} className="flex items-start gap-3">{ok ? <Tick /> : <Ex />}<span style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.55 }}>{s}</span></li>))}
    </ul>
  );
}

export default function MedicalWeightLossPage() {
  return (
    <>
      {/* HERO */}
      <section style={{ background: "url('/assets/hero-bg.png') center / cover no-repeat", padding: "40px 0 56px" }}>
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <p className="font-display" style={{ fontSize: "12px", color: "var(--gold-deep)", letterSpacing: "0.12em" }}>Ozempic & Mounjaro in Malta</p>
              <h1 className="font-serif" style={{ fontSize: "clamp(28px,4vw,44px)", color: "var(--gold-deep)", letterSpacing: "0.04em", marginTop: "10px", textTransform: "uppercase" }}>doctor-led ozempic & mounjaro in malta</h1>
              <p className="font-display" style={{ fontSize: "15px", color: "var(--label)", letterSpacing: "0.04em", marginTop: "14px" }}>Considering Ozempic or Mounjaro for weight loss?</p>
              <p style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.75, marginTop: "14px" }}>At Carisma Aesthetics, GLP-1 medications are never prescribed in isolation. Our doctor-led programme combines a full medical assessment, structured prescription support, nutrition guidance, and weekly monitoring to help you lose weight safely and sustain your results.</p>
              <ul className="space-y-3" style={{ marginTop: "18px" }}>
                {[["Calmer appetite:", "Ozempic and Mounjaro mimic natural fullness signals so you feel satisfied with smaller portions and less food noise."], ["Doctor monitored:", "Full eligibility assessment, body scan, blood work, safety screening, and regular reviews to manage side effects and adjust your dose."], ["Part of a full plan:", "Your GLP-1 prescription is paired with nutrition, movement, accountability, and body contouring treatments — never used on its own."]].map(([b, t]) => (
                  <li key={b} className="flex items-start gap-3"><Dot /><span style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.6 }}><b style={{ color: "var(--gold-deep)", fontWeight: 600 }}>{b}</b> {t}</span></li>
                ))}
              </ul>
              <div style={{ marginTop: "24px" }}><Book /></div>
              <p style={{ fontSize: "11px", color: "var(--muted)", lineHeight: 1.6, marginTop: "18px" }}>Eligibility and exact costs depend on your health, lab results, and the dose you need. You will always receive a clear plan and pricing in your consultation before starting. Important: Ozempic and Mounjaro are prescription-only and not suitable for everyone. This programme is offered only after a full medical assessment by our doctor.</p>
            </Reveal>
            <Reveal delay={120}>
              <div className="overflow-hidden" style={{ borderRadius: "26px", boxShadow: "0 20px 50px rgba(0,0,0,0.14)" }}>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video src={`${A}/vid-medical-weight-loss.mp4`} autoPlay muted loop playsInline className="w-full" style={{ display: "block", aspectRatio: "4 / 5", objectFit: "cover" }} />
              </div>
              <div className="flex items-center justify-center gap-6" style={{ marginTop: "18px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${A}/mwl-ozempic-logo.png`} alt="Ozempic" style={{ height: "26px", width: "auto" }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${A}/mwl-mounjaro-logo.png`} alt="Mounjaro" style={{ height: "26px", width: "auto" }} />
              </div>
              <div className="flex items-center justify-center gap-3" style={{ marginTop: "14px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/awards-badge.png" alt="#1 voted clinic in Malta" style={{ height: "40px", width: "auto" }} />
                <span className="font-display" style={{ fontSize: "12px", color: "var(--gold-deep)", letterSpacing: "0.1em", lineHeight: 1.4 }}>#1 VOTED CLINIC<br />IN MALTA</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div style={{ background: `url('${A}/laser-marble.jpg') top center / cover` }}>
        {/* WHAT ARE THEY */}
        <section style={{ padding: "70px 0" }}>
          <div className="container">
            <Kicker>What are Ozempic & Mounjaro?</Kicker>
            <Serif style={{ marginTop: "8px" }}>clarity before you start</Serif>
            <p className="mx-auto text-center" style={{ maxWidth: "880px", fontSize: "15px", color: "var(--label)", lineHeight: 1.8, marginTop: "20px" }}>Ozempic (semaglutide) and Mounjaro (tirzepatide) are prescription-only GLP-1 receptor agonist medications. They support weight loss by improving appetite regulation and satiety, helping reduce constant hunger and food noise. They can make consistency easier, but they work best inside a structured, medically supervised programme.</p>
            <div className="grid gap-8 md:grid-cols-2 mx-auto" style={{ maxWidth: "960px", marginTop: "40px" }}>
              <div style={{ background: "rgba(255,255,255,0.55)", border: "1px solid var(--line)", borderRadius: "16px", padding: "30px 28px" }}>
                <h3 className="font-display" style={{ fontSize: "14px", color: "var(--gold-deep)", letterSpacing: "0.06em", marginBottom: "18px" }}>What medication helps with:</h3>
                <List items={HELPS} ok />
              </div>
              <div style={{ background: "rgba(255,255,255,0.55)", border: "1px solid var(--line)", borderRadius: "16px", padding: "30px 28px" }}>
                <h3 className="font-display" style={{ fontSize: "14px", color: "var(--label)", letterSpacing: "0.06em", marginBottom: "18px" }}>What medication does not do:</h3>
                <List items={NOTDO} ok={false} />
              </div>
            </div>
            <p className="mx-auto text-center" style={{ maxWidth: "880px", fontSize: "14px", color: "var(--label)", lineHeight: 1.8, marginTop: "28px" }}>That&apos;s why we combine Ozempic or Mounjaro support (if clinically appropriate) with nutrition structure, strength training habits, tracking, and a maintenance plan.</p>
          </div>
        </section>

        {/* TRUSTED features */}
        <section style={{ padding: "50px 0" }}>
          <div className="container text-center">
            <Serif>malta&apos;s trusted clinic for ozempic & mounjaro</Serif>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ marginTop: "44px" }}>
              {FEATURES.map((f, i) => (
                <Reveal key={f.label} delay={(i % 4) * 70} className="text-center" style={{ background: "rgba(255,255,255,0.5)", border: "1px solid var(--line)", borderRadius: "16px 40px 16px 40px", padding: "28px 22px", boxShadow: "0 12px 30px rgba(0,0,0,0.05)" }}>
                  <div className="flex justify-center" style={{ marginBottom: "14px", height: "56px", alignItems: "center" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${A}/${f.icon}`} alt={f.label} style={{ maxHeight: "52px", width: "auto" }} />
                  </div>
                  <h3 className="font-display" style={{ fontSize: "13px", color: "var(--gold-deep)", letterSpacing: "0.06em", marginBottom: "10px" }}>{f.label}</h3>
                  <p style={{ fontSize: "13px", color: "var(--label)", lineHeight: 1.65 }}>{f.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ELIGIBILITY */}
        <section style={{ padding: "60px 0" }}>
          <div className="container text-center">
            <Kicker>Ozempic & Mounjaro eligibility criteria</Kicker>
            <Serif style={{ marginTop: "8px" }}>selective by intention successful by design</Serif>
            <p className="mx-auto" style={{ maxWidth: "880px", fontSize: "15px", color: "var(--label)", lineHeight: 1.8, marginTop: "20px" }}>Ozempic and Mounjaro can be powerful, but only when prescribed as part of a structured, doctor-supervised programme. Eligibility is determined through a proper medical assessment, including blood tests, food intolerance screening, safety checks, and clear protocols so your plan is appropriate, monitored, and adjusted responsibly.</p>
            <div className="grid gap-10 md:grid-cols-2 mx-auto text-left" style={{ maxWidth: "900px", marginTop: "40px" }}>
              <div><h3 className="font-display" style={{ fontSize: "14px", color: "var(--gold-deep)", letterSpacing: "0.08em", marginBottom: "18px" }}>suitable for:</h3><List items={["BMI ≥27", "Insulin resistence", "Emotional eating or Long dieting history", "Menopause-related weight gain"]} ok /></div>
              <div><h3 className="font-display" style={{ fontSize: "14px", color: "var(--label)", letterSpacing: "0.08em", marginBottom: "18px" }}>unsuitable for:</h3><List items={["Eating disorders", "Very lean patients", "Those unwilling to attend check-ins", "Currently pregnant or trying to conceive"]} ok={false} /></div>
            </div>
            <div style={{ marginTop: "36px" }}><Book /></div>
          </div>
        </section>

        {/* HOW IT WORKS — 5-step programme stepper */}
        <section style={{ padding: "60px 0" }}>
          <div className="container">
            <Serif>how it works</Serif>
            <MwlStepper />
          </div>
        </section>

        {/* EXPERT CARE */}
        <section style={{ padding: "60px 0" }}>
          <div className="container">
            <Kicker>expert care</Kicker>
            <Serif style={{ marginTop: "8px" }}>led by expertise. driven by results.</Serif>
            <div className="grid gap-12 lg:grid-cols-2 items-center mx-auto" style={{ maxWidth: "1000px", marginTop: "40px" }}>
              <Reveal>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${A}/mwl-drzaid.jpg`} alt="Dr Zaid Teebi" className="w-full rounded-xl" style={{ display: "block", objectFit: "cover", aspectRatio: "4 / 5", maxWidth: "380px", margin: "0 auto", boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }} />
              </Reveal>
              <div>
                <h3 className="font-serif" style={{ fontSize: "22px", color: "var(--gold-deep)", letterSpacing: "0.04em", marginBottom: "16px" }}>Dr Zaid Teebi</h3>
                <p style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.8 }}>Dr Zaid Teebi is a medical doctor at Carisma with over 30+ years of clinical experience and an evidence-based focus on GLP-1 prescribing and metabolic health. A graduate of Imperial College London, he combines medical rigour with a calm, human approach.</p>
                <p style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.8, marginTop: "14px" }}>His Ozempic and Mounjaro consultations are structured and personalised, with safety screening, clear expectations, and ongoing monitoring. Where clinically appropriate, he prescribes GLP-1 support as part of a wider programme that includes nutrition structure, habit-based strength training to protect metabolism, and a long-term maintenance plan.</p>
                <blockquote style={{ borderLeft: "3px solid var(--gold-deep)", paddingLeft: "20px", margin: "24px 0", fontStyle: "italic", color: "var(--gold-deep)", fontSize: "15px", lineHeight: 1.7 }}>&ldquo;Prescribing Ozempic or Mounjaro is the easy part. Building a programme that works after the medication stops, that&apos;s the real work.&rdquo;<br /><span style={{ fontStyle: "normal", fontSize: "13px" }}>— Dr. Teebi</span></blockquote>
                <Book />
              </div>
            </div>
          </div>
        </section>

        {/* OUR PROMISE */}
        <section style={{ padding: "60px 0" }}>
          <div className="container text-center">
            <Kicker>Our promise</Kicker>
            <Serif style={{ marginTop: "8px" }}>up to 1kg per week</Serif>
            <p className="font-display" style={{ fontSize: "14px", color: "var(--gold-deep)", letterSpacing: "0.1em", marginTop: "10px", textTransform: "uppercase" }}>measured. verified. comitted.</p>
            <div className="mx-auto" style={{ maxWidth: "820px", marginTop: "28px", background: "rgba(255,255,255,0.55)", border: "1px solid var(--line)", borderRadius: "20px", padding: "clamp(26px,3vw,40px)", textAlign: "left" }}>
              <p className="font-display" style={{ fontSize: "14px", color: "var(--gold-deep)", letterSpacing: "0.03em", lineHeight: 1.6, marginBottom: "16px" }}>Only clinic in Malta to offer an extended care commitment on Ozempic & Mounjaro programmes</p>
              <p style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.8 }}>We are selective about who we prescribe Ozempic or Mounjaro to. We only accept those we genuinely believe we can help reach their healthy weight.</p>
              <p style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.8, marginTop: "12px" }}>If you qualify and complete your programme and do not hit your target weight, we will extend your programme at no extra fee until we achieve your desired result.</p>
              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.7, margin: "20px 0 12px" }}>*To ensure results remain measurable and medically valid, patients must:</p>
              <ul className="space-y-3">
                {PROMISE_RULES.map((r) => (<li key={r} className="flex items-start gap-3"><Dot /><span style={{ fontSize: "13.5px", color: "var(--label)", lineHeight: 1.6 }}>{r}</span></li>))}
              </ul>
            </div>
          </div>
        </section>

        {/* SAFETY */}
        <section style={{ padding: "60px 0" }}>
          <div className="container">
            <Serif>ozempic & mounjaro:<br />safety, side effects, & our system</Serif>
            <div className="mx-auto" style={{ maxWidth: "880px", marginTop: "30px" }}>
              <p className="text-center" style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.8 }}>We prescribe Ozempic and Mounjaro with strict screening, clear education, and ongoing monitoring. Most side effects are manageable when dosing and nutrition are structured, and follow-ups are consistent.</p>
              <p className="font-display" style={{ fontSize: "13px", color: "var(--gold-deep)", letterSpacing: "0.04em", margin: "26px 0 16px" }}>Common Ozempic and Mounjaro side effects and how we reduce them:</p>
              <ul className="space-y-4">
                {SIDE_EFFECTS.map(([k, v]) => (<li key={k} className="flex items-start gap-3"><Dot /><span style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.6 }}><b style={{ color: "var(--gold-deep)", fontWeight: 600 }}>{k}:</b> {v}</span></li>))}
              </ul>
              <p style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.8, marginTop: "24px" }}>The biggest clinical mistake: prescribing Ozempic or Mounjaro without a system. Medication can quiet appetite, but it does not build muscle, teach eating, fix emotional drivers, or create long-term habits. That&apos;s why we pair every GLP-1 prescription with strength training, protein-first structure, behavioural coaching, accountability, and a maintenance plan.</p>
              <div className="text-center" style={{ marginTop: "30px" }}><Book /></div>
            </div>
          </div>
        </section>

        {/* PILLARS */}
        <section style={{ padding: "60px 0" }}>
          <div className="container text-center">
            <Kicker>4 core pillars of our Ozempic & Mounjaro methodology</Kicker>
            <Serif style={{ marginTop: "8px" }}>a doctor-led glp-1 programme built to last</Serif>
            <div className="grid gap-6 md:grid-cols-3" style={{ marginTop: "40px" }}>
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={(i % 3) * 80} className="text-center" style={{ background: "rgba(255,255,255,0.55)", border: "1px solid var(--line)", borderRadius: "16px", padding: "28px 24px", boxShadow: "0 12px 30px rgba(0,0,0,0.05)" }}>
                  <h3 className="font-display" style={{ fontSize: "13px", color: "var(--gold-deep)", letterSpacing: "0.06em", marginBottom: "12px" }}>{p.title}</h3>
                  <p style={{ fontSize: "13.5px", color: "var(--label)", lineHeight: 1.7 }}>{p.desc}</p>
                </Reveal>
              ))}
            </div>
            <ul className="mx-auto grid gap-3 sm:grid-cols-2 text-left" style={{ maxWidth: "820px", marginTop: "32px" }}>
              {PILLAR_STEPS.map((s) => (<li key={s} className="flex items-start gap-3"><Dot /><span style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.6 }}>{s}</span></li>))}
            </ul>
            <div style={{ marginTop: "32px" }}><Book /></div>
          </div>
        </section>

        {/* DIFFERENCE */}
        <section style={{ padding: "30px 0 60px" }}>
          <div className="container">
            <div className="mx-auto" style={{ maxWidth: "1120px", borderRadius: "32px", background: "rgba(255,255,255,0.5)", border: "1px solid var(--line)", padding: "clamp(30px,4vw,56px)" }}>
              <div className="text-center"><Kicker>the carisma difference</Kicker><Serif style={{ marginTop: "10px" }}>malta&apos;s #1 leading wellness chain</Serif></div>
              <div className="grid gap-12 lg:grid-cols-2" style={{ marginTop: "40px" }}>
                <div>
                  <h3 className="font-display" style={{ fontSize: "13px", color: "var(--label)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>our commitment</h3>
                  <ul className="space-y-3">{COMMITMENT.map((c) => (<li key={c} className="flex items-start gap-3"><Dot /><span style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.6 }}>{c}</span></li>))}</ul>
                  <h3 className="font-display" style={{ fontSize: "13px", color: "var(--label)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "30px 0 16px" }}>Why Malta chooses Carisma for Ozempic & Mounjaro</h3>
                  <ul className="space-y-3">{WHY.map((c) => (<li key={c} className="flex items-start gap-3"><Dot /><span style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.6 }}>{c}</span></li>))}</ul>
                </div>
                <div style={{ borderRadius: "32px 12px 32px 12px", overflow: "hidden", boxShadow: "0 16px 38px rgba(0,0,0,0.10)", minHeight: "360px" }}>
                  <iframe title="Carisma Aesthetics location" src="https://maps.google.com/maps?q=Carisma%20Aesthetics%20Malta&z=14&output=embed" loading="lazy" style={{ border: 0, width: "100%", height: "100%", minHeight: "360px", display: "block" }} />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6" style={{ marginTop: "40px" }}>
                <Book />
                <div className="flex items-center gap-3">
                  <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden><path fill="none" stroke="var(--gold-deep)" strokeWidth="1.4" d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" /><text x="12" y="13.5" textAnchor="middle" fontSize="9" fill="var(--gold-deep)" fontWeight="700">P</text></svg>
                  <span className="font-display" style={{ fontSize: "12px", color: "var(--label)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Complimentary on-site parking</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WE ARE NOT */}
        <section style={{ padding: "30px 0 50px" }}>
          <div className="container text-center">
            <Serif>we are not another diet clinic.</Serif>
            <p className="mx-auto" style={{ maxWidth: "820px", fontSize: "15px", color: "var(--label)", lineHeight: 1.8, marginTop: "20px" }}>We&apos;re a doctor-led Ozempic and Mounjaro programme that blends medical insight, sustainable nutrition, and modern body technology into one high-touch system, so you don&apos;t just lose weight, you step into your strongest form.</p>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "50px 0" }}>
          <div className="container">
            <h2 className="font-serif text-center" style={{ fontSize: "clamp(22px,3vw,30px)", color: "var(--gold-deep)", letterSpacing: "0.06em", fontWeight: 400, marginBottom: "40px" }}>faqs about ozempic & mounjaro</h2>
            <FaqAccordion items={FAQS} />
          </div>
        </section>

        {/* RESEARCH */}
        <section style={{ padding: "40px 0 90px" }}>
          <div className="container text-center">
            <Kicker>CLINICAL RESEARCH: basis of our Ozempic & Mounjaro methodology</Kicker>
            <Serif style={{ marginTop: "8px" }}>evidence based approach</Serif>
            <div className="grid gap-8 md:grid-cols-2 mx-auto" style={{ maxWidth: "1000px", marginTop: "44px" }}>
              {RESEARCH.map((c, i) => (
                <Reveal key={c.title} delay={(i % 2) * 80} className="text-left flex flex-col" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid var(--line)", borderRadius: "16px", overflow: "hidden", boxShadow: "0 12px 30px rgba(0,0,0,0.05)" }}>
                  {c.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`${A}/${c.image}`} alt={c.title} className="w-full" style={{ display: "block", aspectRatio: "5 / 2", objectFit: "cover" }} />
                  )}
                  <div style={{ padding: "24px" }}>
                    <h3 className="font-display" style={{ fontSize: "13px", color: "var(--gold-deep)", letterSpacing: "0.04em", marginBottom: "14px", lineHeight: 1.4 }}>{c.title}</h3>
                    <p className="font-display" style={{ fontSize: "10px", color: "var(--gold-deep)", letterSpacing: "0.1em", marginBottom: "6px" }}>WHAT IT DOES</p>
                    <p style={{ fontSize: "13px", color: "var(--label)", lineHeight: 1.65, marginBottom: "14px" }}>{c.whatItDoes}</p>
                    <p className="font-display" style={{ fontSize: "10px", color: "var(--gold-deep)", letterSpacing: "0.1em", marginBottom: "6px" }}>KEY RESULTS</p>
                    <ul className="space-y-2">{c.keyResults.map((k) => (<li key={k} className="flex items-start gap-2"><Dot /><span style={{ fontSize: "12.5px", color: "var(--label)", lineHeight: 1.6 }}>{k}</span></li>))}</ul>
                    <p className="font-display" style={{ fontSize: "11px", color: "var(--gold-deep)", letterSpacing: "0.06em", marginTop: "16px", textTransform: "uppercase" }}>{c.evidence}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div style={{ marginTop: "44px" }}><Book /></div>
          </div>
        </section>
      </div>
    </>
  );
}
