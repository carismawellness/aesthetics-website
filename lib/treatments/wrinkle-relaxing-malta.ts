// last updated: 2026-06-18
import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "wrinkle-relaxing-malta",
  category: "Face",
  hero: {
    title: "Botox Malta — Natural Results by Medically Qualified Doctors",
    subtitle: "Are wrinkles and fine lines getting in your way?",
    body: "Say goodbye to forehead lines, frown lines, and crow's feet with expert Botox treatments in Malta. Every session is performed by qualified doctors who specialise in facial anatomy, delivering natural, refined results that restore your confidence without changing who you are.",
    prices: [
      { label: "Lip Flip / Gummy Smile / Chin", price: "from €59" },
      { label: "One Area", price: "from €139" },
      { label: "Full Upper Face / Nefertiti neck lift", price: "from €249" },
      { label: "Underarms Sweating", price: "from €399" },
    ],
    cta: "BOOK YOUR BOTOX APPOINTMENT NOW",
    image: "/assets/treatments/wrinkle-relaxing-malta-hero.jpg",
    heroForm: true,
  },
  info: [
    { metric: "Procedure Time", detail: "15-30 Minutes" },
    { metric: "Downtime", detail: "Minimal" },
    { metric: "Results Last For", detail: "3-4 Months" },
    { metric: "Results Visible In", detail: "4-5 Days" },
    { metric: "Anaesthetic", detail: "None" },
  ],
  beforeAfterTitle: "Real Botox Results — Before and After at Carisma Malta",
  beforeAfter: [
    { before: "/assets/treatments/botox-r4-before.png", after: "/assets/treatments/botox-r4-after.png" },
    { before: "/assets/treatments/botox-r1-before.png", after: "/assets/treatments/botox-r1-after.png" },
    { before: "/assets/treatments/botox-r2-before.png", after: "/assets/treatments/botox-r2-after.png" },
    { before: "/assets/treatments/botox-r3-before.png", after: "/assets/treatments/botox-r3-after.png" },
  ],
  precision: {
    title: "Botox Treatment Areas — What Can Be Treated?",
    intro:
      "Each botox treatment is carefully applied to specific anatomical areas by our doctors. Below are the most commonly treated zones at our Malta clinic.",
    areas: [
      { zone: "Forehead", icon: "/assets/treatments/wrinkle-relaxing-malta-icon-forehead.png", name: "Forehead Lines", desc: "Botox smooths horizontal lines across the forehead while preserving natural movement and expression" },
      { zone: "Brow", icon: "/assets/treatments/wrinkle-relaxing-malta-icon-brow.png", name: "Frown Lines", desc: "Botox softens the vertical creases between the brows that can create a tired or tense appearance." },
      { zone: "Eyes", icon: "/assets/treatments/wrinkle-relaxing-malta-icon-eyes.png", name: "Crow's Feet", desc: "Botox relaxes the fine lines at the outer corners of the eyes for a refreshed, rested look." },
      { zone: "Neck", icon: "/assets/treatments/wrinkle-relaxing-malta-icon-neck.png", name: "Nefertiti Lift", desc: "Botox refines the jawline and neck contour by relaxing the platysmal bands that pull downward." },
    ],
    additionalTitle: "Additional Botox Treatment Areas",
    additionalIntro: "These areas can also be treated with botox following a personalised consultation with one of our doctors.",
    additional: "Lip flip, gummy smile, chin dimpling, bunny lines, brow lift, jaw slimming, hyperhidrosis",
  },
  suitability: {
    title: "Who Is a Good Candidate for Botox in Malta?",
    intro:
      "Every face moves differently. Botox is most effective when tailored to your unique facial anatomy, targeting the lines that bother you while preserving your natural expressions. A free consultation with one of our doctors helps us understand what will work for you.",
    suitableFor: [
      "You have lines that deepen when you smile, frown, or raise your brows",
      "You want a subtle refresh that still looks like you",
      "You are open to a personalised approach based on your facial movement",
      "You would like to soften specific areas such as crow's feet, forehead, or frown lines",
      "You are comfortable with a quick treatment and minimal downtime",
    ],
    notIdeal: [
      "You're hoping to restore lost volume — that's what dermal fillers are for, not wrinkle relaxing",
      "You need to see the full result the same day — it settles gently over 3–14 days",
      "You're pregnant or breastfeeding — we'll happily welcome you back afterwards",
      "You want every line gone completely — we soften and refresh, we never freeze your expression",
      "You'd rather skip the quick doctor consultation — it's how we keep results safe and natural",
    ],
    personas: [
      { title: "The expressive face", desc: "You smile, frown, and raise your brows — and those lines are starting to stay even when your face is relaxed." },
      { title: "The tired-looking face", desc: "You feel well, but your forehead, eyes, or frown area make you look stressed or exhausted." },
      { title: "The subtle-refinement patient", desc: "You don't want a dramatic change — you want a natural softening that still looks like you." },
    ],
  },
  problem: {
    kicker: "The real reason people book",
    title: "You look more tired, tense, or stressed than you feel",
    body: [
      "It's rarely about chasing perfection or erasing every line. It's that your forehead, frown, or eyes can make you look exhausted, tense, or older than you actually feel — even on the days you're calm and well-rested.",
      "Doctor-led wrinkle relaxing gently softens those expression lines while keeping your natural movement. You still look like you — just more rested, calmer, and refreshed.",
    ],
    points: [
      { title: "Softer, not frozen", desc: "We relax the lines that age you while keeping every natural expression." },
      { title: "Rested, not 'done'", desc: "People notice you look refreshed — not that you've had something done." },
      { title: "Still you", desc: "A subtle softening that looks like you on your most well-rested day." },
    ],
  },
  guarantee: {
    kicker: "The Natural Confidence Guarantee",
    title: "Natural Botox Results — or Your Follow-Up Is Free",
    paragraphs: [
      "The fears we hear most are the ones we're built around: I don't want to look overdone. I don't want to be pressured. What if I'm not happy? What if I don't even need it? What if they overdo it?",
      "So we do the opposite. Every treatment starts with a doctor-led facial assessment — never a sales pitch — and a natural-first plan that treats only what you need. If you're ever not completely happy with how your result settles, your follow-up adjustment session is on us, until you're 100% satisfied with a result that still looks like you.",
    ],
    cta: "Book Your Free Consultation",
    points: [
      { value: "Doctor-led", label: "Assessment first", sub: "Every plan starts with a doctor, never a salesperson" },
      { value: "Natural-first", label: "Never overdone", sub: "We'd rather under-treat and refine than overdo it" },
      { value: "Free", label: "Follow-up session", sub: "Included until you're 100% satisfied" },
    ],
  },
  experience: {
    title: "How Does Botox Work? Your Step-by-Step Journey",
    steps: [
      { title: "Step 1 — Your Consultation", desc: "We assess your facial anatomy, skin condition, medical history, and botox goals with one of our doctors.", image: "/assets/treatments/wrinkle-relaxing-malta-step1.png" },
      { title: "Step 2 — Your Personalised Plan", desc: "Your doctor designs a medically guided botox plan tailored to your facial structure and desired outcome.", image: "/assets/treatments/wrinkle-relaxing-malta-step2.png" },
      { title: "Step 3 — Targeted Injections", desc: "Your doctor administers botox using fine, precise injections, quick, comfortable, and no downtime.", image: "/assets/treatments/wrinkle-relaxing-malta-step3.png" },
      { title: "Step 4 — Review and Adjustment", desc: "Your doctor monitors your response and refines the plan to ensure natural botox results over time.", image: "/assets/treatments/wrinkle-relaxing-malta-step4.png" },
    ],
  },
  prepAftercare: {
    kicker: "Preparation & Aftercare",
    title: "Botox Aftercare — What to Do Before and After",
    intro: "A smooth botox experience begins with a few simple steps. Here is what to know before, during, and after your session at our Malta clinic.",
    cards: [
      { icon: "/assets/treatments/wrinkle-relaxing-malta-icon-prep-before.png", label: "Before", lead: "Arrive informed and ready for a comfortable session.", points: ["Share your concerns and medical history", "Disclose all medications and supplements", "Avoid alcohol and blood thinners for 24 hours", "Pause strenuous exercise the day before"] },
      { icon: "/assets/treatments/wrinkle-relaxing-malta-icon-prep-during.png", label: "During", lead: "Treatment is quick, precise, and guided by your comfort.", points: ["Targeted areas are marked before injection by your doctor", "Fine needles deliver precise, controlled doses of botox", "Mild pressure is normal — communicate freely", "Session takes 15–30 minutes"] },
      { icon: "/assets/treatments/wrinkle-relaxing-malta-icon-prep-after.png", label: "After", lead: "A few precautions help your results settle beautifully.", points: ["No touching or massaging for 24 hours", "Avoid exercise, alcohol, and saunas for 24 hours", "Stay upright for the first 4 hours", "Results appear in 3–5 days, full effect at 2 weeks"] },
    ],
  },
  patientVideos: {
    title: "Real Botox Patients — Stories from Our Malta Clinic",
    intro: "Every face is unique. Every story is personal. Discover how our botox patients describe their journey to refined, natural results at Carisma Aesthetics in Malta.",
    videos: ["/assets/treatments/botox-video1.mp4", "/assets/treatments/botox-video2.mp4", "/assets/treatments/botox-video3.mp4"],
  },
  trusted: {
    title: "Medically Qualified Practitioners — Safe Botox in Malta",
    subtitle: "Doctor-Led Botox in Malta",
    asSeenOn: ["/assets/press/lovin-malta.jpeg", "/assets/press/malta-daily.png", "/assets/press/bay.jpeg", "/assets/press/times-of-malta.png", "/assets/press/malta-today.jpg"],
    images: ["/assets/treatments/trusted-clinic-collage.png"],
    points: [
      { title: "Medically Qualified Practitioners", desc: "Every botox treatment is performed by a qualified doctor." },
      { title: "Advanced Facial Anatomy Expertise", desc: "Precision botox techniques tailored to your unique facial anatomy." },
      { title: "Personalised Treatment Plans", desc: "Your botox plan is designed to enhance, never overcorrect." },
      { title: "Clinically Approved Products", desc: "Clinically Approved Products — CE-marked, clinically approved botox and evidence-based protocols." },
      { title: "Thousands of Treatments Performed", desc: "Experience and results you can trust, right here in Malta." },
    ],
  },
  difference: {
    kicker: "The Carisma Difference",
    title: "Why Malta Patients Choose Carisma for Botox",
    commitmentTitle: "Our Commitment",
    commitment: [
      "Natural, refined botox results, never overdone, never frozen",
      "Doctor-led treatments with advanced facial anatomy expertise",
      "Safe, ethical care using clinically approved products",
      "A personalised journey from consultation to aftercare",
    ],
    whyTitle: "Why Malta Chooses Carisma for Botox",
    why: [
      "Created by the team behind Malta's leading spa and medical aesthetics centres",
      "Doctor-led botox treatments with a focus on safety and long-term results",
      "A personalised journey from consultation to aftercare",
      "Seamless experience with ongoing support and guidance",
    ],
    mapQuery: "Carisma Aesthetics, Malta",
  },
  bookingForm: { title: "Book Your Botox Appointment Today" },
  planSummary: {
    kicker: "Your botox plan",
    title: "Malta's Doctor-Led Botox Plan",
    benefits: [
      { icon: "shield", title: "Doctor-Led Precision", desc: "Every treatment is performed by a medically qualified doctor — never a salon, never nurse-only." },
      { icon: "sparkle", title: "Natural, Refined Results", desc: "We soften the lines that bother you while keeping your full expression — refreshed, never frozen." },
      { icon: "clock", title: "Complimentary 2-Week Review", desc: "We review your result at two weeks and perfect it with a touch-up if needed — included free." },
    ],
    included: [
      { label: "Free doctor-led consultation" },
      { label: "Personalised, medically guided treatment plan" },
      { label: "Expert CE-marked Botox treatment", value: "from €59" },
      { label: "Complimentary 2-week review & touch-up" },
      { label: "Aftercare guidance & ongoing support" },
    ],
    price: "From €59",
    priceLabel: "per area",
    cta: { text: "Book Your Botox Appointment", href: "/consultation" },
    reviews: "200+ verified reviews",
  },
  recommended: {
    title: "Recommended Treatments to Combine with Botox",
    items: [
      { label: "Dermal fillers", href: "/dermal-fillers-malta", image: "/assets/treatments/wrinkle-relaxing-malta-rec-dermal-fillers.jpg" },
      { label: "Microneedling", href: "/microneedling-malta", image: "/assets/treatments/wrinkle-relaxing-malta-rec-microneedling.png" },
      { label: "Platelet rich plasma", href: "/prp-malta", image: "/assets/treatments/wrinkle-relaxing-malta-rec-prp.jpg" },
      { label: "Mesotherapy", href: "/mesotherapy-malta", image: "/assets/treatments/wrinkle-relaxing-malta-rec-mesotherapy.png" },
    ],
  },
  faqTitle: "How Long Does Botox Last in Malta?",
  faq: [
    { q: "What is botox and how does it work?", a: "Botox is a purified protein that temporarily relaxes specific facial muscles. By blocking the nerve signals that cause muscle contraction, it smooths dynamic wrinkles, such as forehead lines, frown lines, and crow's feet. The result is smoother skin and a naturally refreshed appearance, without altering your unique expressions. Botox has been used safely for over 30 years and is one of the most popular cosmetic treatments in Malta." },
    { q: "What are the common cosmetic uses of botox?", a: "Botox treatments are designed to relax specific facial muscles, reducing the appearance of dynamic wrinkles and expression lines. Common treatment areas include forehead lines, frown lines between the eyebrows, and crow's feet around the eyes. Botox can also be used for a lip flip, gummy smile correction, chin dimpling, bunny lines, brow lift, jawline slimming, and the nefertiti neck lift, resulting in a smoother, more refreshed look." },
    { q: "How long do botox results last?", a: "The effects of Botox typically last between 3 to 4 months. As muscle activity gradually returns, expression lines may begin to reappear, at which point a follow-up treatment can help maintain results. With consistent botox treatments over time, some patients notice longer-lasting results as the targeted muscles become trained to relax." },
    { q: "Are there any side effects or risks associated with botox?", a: "When performed by a qualified doctor, Botox is very safe. However, as with any injectable procedure, some temporary side effects may occur, such as mild redness, swelling, or tenderness at the injection site. These typically resolve within a day or two. A thorough consultation with one of our doctors at Carisma ensures the treatment is appropriate for you and minimises any potential risks." },
    { q: "Is botox painful?", a: "Most patients find Botox very tolerable. The injections are performed using a fine needle, and the sensation is often described as a brief pinch. To ensure your comfort, a topical numbing cream can be applied beforehand if needed. Our doctors guide you through each step with care and precision, it is one of the reasons patients rate Carisma as the best botox clinic in Malta for comfort." },
    { q: "How long does it take to see botox results?", a: "You may begin to notice a visible softening of lines within 3-5 days, with full Botox results typically settling in after 7 to 14 days. The treated area gradually appears smoother and more relaxed, revealing a naturally refreshed look." },
    { q: "Can botox be combined with other treatments?", a: "Yes, Botox can be safely combined with other aesthetic treatments, such as dermal fillers, skin boosters, microneedling, chemical peels, or PRP, to enhance overall results. This allows multiple concerns to be addressed in a single, personalised plan. During your consultation at our Malta clinic, our doctors will tailor a treatment strategy that aligns with your goals and ensures optimal safety and results." },
    { q: "Who is a suitable candidate for botox?", a: "Botox is suitable for most healthy adults looking to soften the appearance of dynamic lines and wrinkles. It is also popular for preventative use in patients in their twenties and thirties. However, botox may not be recommended for individuals who are pregnant, breastfeeding, or have certain medical conditions. A detailed consultation with one of our doctors is essential to ensure the treatment is both safe and right for you." },
    { q: "How much does Botox cost in Malta?", a: "Botox at Carisma starts from €59 for targeted treatments like a lip flip, gummy smile, or chin. Single-area treatments such as forehead lines, frown lines, or crow's feet start from €139. Full upper face botox or a nefertiti neck lift starts from €249. Hyperhidrosis treatment starts from €399. Book a free consultation at our St. Julian's clinic for a personalised quote." },
    { q: "What should I avoid after Botox?", a: "After your Botox treatment, avoid strenuous exercise for 24 hours, do not lie flat for 4 hours, and avoid rubbing or massaging the treated areas for 24 hours. Also avoid excessive heat such as saunas for 48 hours. Most patients can return to normal activities immediately. Your doctor at Carisma will provide detailed aftercare instructions specific to the areas treated." },
  ],
};

export default t;
