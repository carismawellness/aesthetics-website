// last updated: 2026-06-23
// Converted from the bespoke components/MedicalWeightLossPage.tsx to the shared
// data-driven TreatmentPage. Content harvested from that page (hero, GLP-1
// clarity, eligibility, Dr Teebi, the 5-step programme, safety, methodology,
// the Carisma difference, FAQs) and re-expressed in the template's sections.
// No before/after section: the live page's result images are single composite
// testimonial cards, not the side-by-side before|after PAIRS the carousel needs,
// so it is intentionally omitted rather than rendering a photo twice.
import type { Treatment } from "../treatment-types";

const BOOK_HREF =
  "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5084222&oiid=sv%3A26105577&share=true&pId=2708191";

const t: Treatment = {
  slug: "medical-weight-loss",
  category: "Body",
  hero: {
    title: "Medical Weight Loss Malta",
    subtitle: "Tried every diet and the weight keeps coming back?",
    body: "Doctor-led Ozempic and Mounjaro weight loss in Malta, never a prescription in isolation. Our programme pairs a full medical assessment, GLP-1 prescription support, nutrition guidance, and weekly monitoring to help you lose weight safely and, just as importantly, keep it off.",
    cta: "Book Your Weight Loss Consultation",
    bookHref: BOOK_HREF,
    image: "/assets/treatments/mwl-hero.png",
    bgImage: "/assets/treatments/medical-weight-loss-bg.png",
  },
  info: [
    { metric: "Approach", detail: "Doctor-Led GLP-1" },
    { metric: "Average Loss", detail: "Up to 1kg / Week" },
    { metric: "Medications", detail: "Ozempic & Mounjaro" },
    { metric: "Monitoring", detail: "Weekly Reviews" },
    { metric: "Eligibility", detail: "Medical Assessment" },
  ],
  problem: {
    kicker: "The real reason people book",
    title: "It is not that you lack willpower, your biology has been working against you",
    body: [
      "Years of dieting, hormones, stress, and age can leave your appetite and metabolism stacked against you. A doctor-led GLP-1 programme quiets the constant hunger and food noise so consistency finally feels possible, no shame, no crash diets, just a plan built around your body.",
    ],
  },
  guarantee: {
    kicker: "The Natural Confidence Guarantee",
    title: "Natural Confidence Guarantee",
    paragraphs: [
      "Every programme starts with a doctor-led medical assessment, never a sales pitch, we only prescribe Ozempic or Mounjaro when it is genuinely right for you. If you qualify, complete your programme, and do not reach your target weight, we extend your programme at no extra fee until you do. We are the only clinic in Malta to offer this extended care commitment.",
    ],
    cta: "Book Your Free Consultation",
    points: [
      { value: "Doctor-led", label: "Assessment first", sub: "Medical screening, never a salesperson" },
      { value: "Up to 1kg", label: "Per week", sub: "Measured, verified, monitored" },
      { value: "100%", label: "Care commitment", sub: "We extend at no extra fee until you reach target" },
    ],
  },
  suitability: {
    title: "Is this right for you?",
    intro:
      "Ozempic and Mounjaro can be powerful, but only as part of a structured, doctor-supervised programme. Eligibility is decided through a proper medical assessment, blood tests, food-intolerance screening, and safety checks, so your plan is appropriate, monitored, and adjusted responsibly. If we do not believe we can help you, we will tell you honestly.",
    personas: [
      { title: "The lifelong dieter", desc: "You have lost and regained the same weight for years. You are not looking for another fad, you want a medical approach that finally addresses the hunger." },
      { title: "The hormonal shift", desc: "Your body changed with age, perimenopause, or menopause, and what used to work simply does not anymore. You want a plan that respects your hormones." },
      { title: "The busy professional or mum", desc: "You have 5–20 kg to lose and no time for crash plans. You want real food, weekly support, and a routine that survives a bad week." },
    ],
    notIdeal: [
      "You are pregnant, breastfeeding, or trying to conceive, we will warmly welcome you back when the time is right",
      "You are looking for a rapid, extreme crash-diet fix, our programme is steady and sustainable by design",
      "You have a history of an eating disorder, your wellbeing comes first, and GLP-1 medication is not the right tool here",
      "You are very lean already, these medications are for clinically appropriate weight loss, not aesthetic leanness",
      "You would rather not attend weekly check-ins, the monitoring is how we keep your results safe and on track",
    ],
  },
  experience: {
    title: "Your treatment experience",
    steps: [
      {
        title: "Consultation & Medical Assessment",
        desc: "You meet our doctor for a full review of your health, hormones, history, and goals, plus clinical measurements and a body-composition scan, fat, muscle, and visceral fat, not just the scale. Where appropriate we check thyroid, blood sugar, and cholesterol to confirm Ozempic or Mounjaro is right and safe for you.",
        image: "/assets/mwl/exp-consult.jpg",
      },
      {
        title: "Your Doctor-Led GLP-1 Programme",
        desc: "If you qualify, we start your prescription with careful dose titration, paired with a Mediterranean-style nutrition plan, protein targets to protect muscle, and movement that fits your life. Weekly check-ins and WhatsApp support mean you are never guessing between visits, and if you go quiet, we reach out first, without judgement.",
        image: "/assets/mwl/exp-glp1.jpg",
      },
      {
        title: "Refine, Maintain & Sustain",
        desc: "We track fat loss and protect lean mass, adjust your dose, and use body-contouring treatments to shape your results. Every programme includes a defined maintenance phase and exit strategy, so the habits and structure stay with you long after the medication does.",
        image: "/assets/mwl/exp-results.jpg",
      },
    ],
  },
  trusted: {
    title: "Malta's trusted clinic for Ozempic & Mounjaro",
    subtitle: "Doctor-Led Medical Weight Loss in Malta",
    asSeenOn: [
      "/assets/press/lovin-malta.jpeg",
      "/assets/press/malta-daily.png",
      "/assets/press/bay.jpeg",
      "/assets/press/times-of-malta.png",
      "/assets/press/malta-today.jpg",
    ],
    images: ["/assets/treatments/mwl-drzaid.jpg"],
    points: [
      { title: "Doctor-First, Not Drug-First", desc: "We start with clinical suitability, not dosage, your full health history, risks, and goals reviewed by a medical doctor." },
      { title: "Appetite & Metabolic Support", desc: "Ozempic and Mounjaro quiet hunger and food noise; we titrate carefully and monitor side effects throughout." },
      { title: "Body Composition, Not Just Weight", desc: "We track fat loss while protecting lean muscle, progress you can see in measurements and strength, not only the scale." },
      { title: "A Programme, Not a Prescription", desc: "Phases, milestones, and a defined maintenance plan with ongoing medical oversight, never medication in isolation." },
    ],
  },
  planSummary: {
    kicker: "Your weight-loss programme",
    title: "Malta's Doctor-Led GLP-1 Programme",
    benefits: [
      { icon: "shield", title: "Doctor-Led & Monitored", desc: "Full eligibility assessment, safety screening, and regular reviews to manage side effects and adjust your dose." },
      { icon: "target", title: "Appetite Under Control", desc: "Ozempic and Mounjaro calm hunger and food noise so you feel satisfied with smaller portions, consistency made possible." },
      { icon: "chart", title: "Built to Last", desc: "Nutrition, movement, accountability, and a maintenance plan so results hold long after the medication ends." },
    ],
    included: [
      { label: "Full medical consultation & GLP-1 eligibility assessment" },
      { label: "Body-composition scan & baseline blood work where appropriate" },
      { label: "Personalised Ozempic or Mounjaro plan with careful dose titration" },
      { label: "Personalised nutrition & movement plan" },
      { label: "Weekly check-ins, WhatsApp support & ongoing medical monitoring" },
      { label: "Defined maintenance phase & exit strategy" },
    ],
    price: "Bespoke",
    priceLabel: "after your medical assessment",
    cta: { text: "Book Your Weight Loss Consultation", href: BOOK_HREF, external: true },
    reviews: "500+ verified reviews",
  },
  recommended: {
    title: "Recommended with Medical Weight Loss",
    items: [
      { label: "Muscle stimulation", href: "/muscle-stimulation", image: "/assets/treatments/ms-feat1.png" },
      { label: "Fat freezing", href: "/fat-freezing", image: "/assets/treatments/ff-feat1.png" },
      { label: "Skin tightening", href: "/skin-tightening", image: "/assets/treatments/st-feat1.png" },
      { label: "Lymphatic drainage", href: "/lymphatic-drainage", image: "/assets/treatments/lympathic-drainage-feat1.png" },
    ],
  },
  faqTitle: "FAQs about Ozempic & Mounjaro in Malta",
  faq: [
    {
      q: "What is Ozempic and how does it work for weight loss?",
      a: "Ozempic (semaglutide) is a GLP-1 receptor agonist, a prescription medication that mimics a naturally occurring hormone in your body. It signals your brain to feel full sooner, reduces appetite and food noise, and slows gastric emptying, making it easier to eat less without the constant battle with hunger. At Carisma, Ozempic is always prescribed as part of a structured, doctor-led programme, never as a standalone prescription.",
    },
    {
      q: "Who is this programme really for, and do I need to be over 30 or in menopause to qualify?",
      a: "The programme is for adults who feel stuck with their weight and want a safe, clinically guided solution with Ozempic or Mounjaro. Many clients are in their thirties, forties, and fifties, juggling stress, work, family, and sometimes hormonal changes. You do not have to be a certain age. We look at your health, goals, and capacity, then tell you honestly whether GLP-1 medication is the right fit.",
    },
    {
      q: "How much weight can I realistically lose on Ozempic or Mounjaro?",
      a: "If you qualify and follow the programme, our patients lose on average around 1 kg per week. Clinical trials show average weight loss of 10–15% of body weight with Ozempic and 15–22% with Mounjaro over 12–18 months. Your results depend on starting weight, body composition, health, programme length, and adherence. We track progress with body scans and measurements, not just the scale.",
    },
    {
      q: "What exactly happens in the medical assessment? Is it safe if I have existing health issues?",
      a: "In your assessment you sit with our doctor and go through your medical history, medications, past diets, and any hormonal or metabolic concerns. We take clinical measurements and perform a body-composition scan, and may recommend blood tests, blood-pressure checks, or food-intolerance testing. Many clients already manage conditions like high blood pressure, thyroid issues, or early diabetes, that is exactly why we screen properly and adapt your Ozempic or Mounjaro plan around your safety.",
    },
    {
      q: "Will I have to follow a strict meal plan, or can I still eat bread, pasta, and wine?",
      a: "You will have structure, not a prison. We use a Mediterranean-style framework with enough protein, vegetables, and healthy fats, then fit it to your culture and lifestyle, planning for weekends, events, and eating out. No food is automatically banned. The focus is on what you can consistently follow, which matters even more on Ozempic or Mounjaro, where appetite is reduced and every meal needs to count nutritionally.",
    },
    {
      q: "What are the side effects of Ozempic and Mounjaro?",
      a: "The most common side effects are gastrointestinal, nausea, constipation, diarrhoea, and fatigue, and are usually temporary, occurring in the early weeks as your body adjusts. We manage these through slow dose titration, protein-first nutrition, hydration protocols, and regular doctor reviews. Serious side effects are rare when the medication is prescribed appropriately and monitored closely, which is why ongoing medical supervision is a non-negotiable part of our programme.",
    },
    {
      q: "Mounjaro vs Ozempic, what is the difference?",
      a: "Both are GLP-1 medications used for weight loss, but they work differently. Ozempic (semaglutide) targets GLP-1 receptors only, while Mounjaro (tirzepatide) targets both GLP-1 and GIP receptors, a dual-action mechanism that may offer stronger appetite suppression. In clinical trials, Mounjaro showed average weight loss of 15–22% compared with 10–15% for Ozempic. Our doctor recommends the right medication based on your medical assessment, not marketing trends.",
    },
    {
      q: "Can I get Ozempic in Malta? Is it available?",
      a: "Yes. Ozempic is available in Malta by prescription. At Carisma Aesthetics, our doctors can prescribe Ozempic or Mounjaro after a full medical assessment confirms eligibility. We manage the prescription, dosing, and monitoring in-clinic, so you do not need to navigate pharmacies or dosage changes on your own.",
    },
    {
      q: "How much does Ozempic cost in Malta?",
      a: "Ozempic and Mounjaro costs depend on the dose you need, the length of your programme, and any complementary treatments included. We are fully transparent: you receive a clear plan and pricing in your consultation before starting, and we can discuss payment options to spread your investment. Contact us for current Ozempic and Mounjaro pricing in Malta.",
    },
    {
      q: "Do I have to take Ozempic or Mounjaro forever?",
      a: "No. Ozempic and Mounjaro are tools, not lifelong commitments. Our programme includes a defined maintenance phase and exit strategy, building the habits, nutrition structure, and movement routine you need to maintain results after stepping down from medication. Research shows that stopping GLP-1 medication without a structured plan often leads to weight regain, which is why we include a post-medication protocol.",
    },
    {
      q: "What is Ozempic face and how do you prevent it?",
      a: "Ozempic face describes the facial volume loss, sagging, and hollowness some patients experience during rapid weight loss on GLP-1 medications. We prevent this by controlling the pace of weight loss, prioritising protein to preserve facial fullness, and offering collagen-stimulating treatments and dermal fillers if needed. Being an aesthetics clinic and a GLP-1 programme under one roof means we treat the whole picture, body and face.",
    },
    {
      q: "Can I combine Ozempic with body-contouring treatments?",
      a: "Yes, and this is one of the key advantages of doing your GLP-1 programme at Carisma Aesthetics. While Ozempic or Mounjaro helps you lose weight, treatments such as muscle stimulation, fat freezing, and skin tightening shape and refine your body as it changes. Your treatment plan is tailored to your body composition and goals, never a one-area-fits-all offer.",
    },
    {
      q: "How is the programme at Carisma different from just getting a prescription?",
      a: "Getting a prescription is easy; building a programme that delivers lasting results is not. At Carisma, your Ozempic or Mounjaro prescription is one part of a wider system: medical monitoring, personalised nutrition, strength-training guidance, weekly accountability, body-contouring treatments, aesthetics support for Ozempic-face prevention, and a defined exit strategy. We do not prescribe and forget, we guide you through every phase.",
    },
  ],
  beforeAfterTitle: "MEDICAL WEIGHT LOSS RESULTS",
  beforeAfter: [
    { before: "/assets/treatments/medical-weight-loss-ba1-1.jpg", after: "/assets/treatments/medical-weight-loss-ba6-1.jpg", label: "Lower back slimming", name: "Marie C.", review: "The soft rolls across my lower back have flattened and my waistband no longer digs in." },
    { before: "/assets/treatments/medical-weight-loss-ba1-2.jpg", after: "/assets/treatments/medical-weight-loss-ba6-2.jpg", label: "Waist and hip slimming", name: "Elena V.", review: "My belly does not push out the way it used to and my side profile sits much flatter now." },
    { before: "/assets/treatments/medical-weight-loss-ba2-1.jpg", after: "/assets/treatments/medical-weight-loss-ba7-1.jpg", label: "Back thigh smoothing", name: "Sofia B.", review: "The dimpling on the backs of my thighs has calmed down and the skin reads smoother." },
    { before: "/assets/treatments/medical-weight-loss-ba2-2.jpg", after: "/assets/treatments/medical-weight-loss-ba7-2.jpg", label: "Thigh and knee texture", name: "Rita D.", review: "My knees look less puffy and the bumpy bits above them have settled." },
    { before: "/assets/treatments/medical-weight-loss-ba3-1.jpg", after: "/assets/treatments/medical-weight-loss-ba8-1.jpg", label: "Front thigh smoothing", name: "Anna F.", review: "My thighs are slimmer and the cottage cheese texture is far less obvious in normal light." },
    { before: "/assets/treatments/medical-weight-loss-ba3-2.jpg", after: "/assets/treatments/medical-weight-loss-ba8-2.jpg", label: "Waistline definition", name: "Julia P.", review: "There is a proper dip back at my waist and the heaviness around my middle has eased." },
    { before: "/assets/treatments/medical-weight-loss-ba4-1.jpg", after: "/assets/treatments/medical-weight-loss-ba9-1.jpg", label: "Tummy slimming", name: "Claire M.", review: "My stomach sits flatter below the navel and fitted leggings feel comfortable again." },
    { before: "/assets/treatments/medical-weight-loss-ba4-2.jpg", after: "/assets/treatments/medical-weight-loss-ba9-2.jpg", label: "Lower tummy slimming", name: "Hannah R.", review: "The little pouch under my belly button has gone down and my waist looks tidier from the side." },
    { before: "/assets/treatments/medical-weight-loss-ba5-1.jpg", after: "/assets/treatments/medical-weight-loss-ba10-1.jpg", label: "Midsection slimming", name: "Petra L.", review: "My waist has narrowed and the soft area around my side tattoo has firmed up." },
    { before: "/assets/treatments/medical-weight-loss-ba5-2.jpg", after: "/assets/treatments/medical-weight-loss-ba10-2.jpg", label: "Back and bra-line slimming", name: "Nadia S.", review: "The rolls across my back and along my bra line have smoothed out and my outline looks leaner." },
  ],
};

export default t;
