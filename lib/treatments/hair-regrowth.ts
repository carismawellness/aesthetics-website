import type { Treatment } from "../treatment-types";

// Live page: https://www.carismaaesthetics.com/hair-regrowth
// Dark, custom Wix landing page. All copy below is verbatim from the live dump.
// Live section order: hero (video right) → before-and-afters → eligibility criteria →
// the science behind the results → expert care (Dr Giovanni) → our guarantee →
// our packages (3 protocol cards with videos) → "we don't just treat hair loss" collage +
// why-patients-choose card → FAQs → clinical research → real people, real reviews.
const t: Treatment = {
  slug: "hair-regrowth",
  category: "Face",
  hero: {
    // Live renders a small kicker "Hair Loss Treatment in Malta" above this heading.
    title: "non-surgical hair loss clinic guaranteed results in 90 Days",
    subtitle: "Hair Loss Treatment in Malta",
    body: "Malta's only doctor-led, exosome-powered hair loss treatment clinic that reverses thinning hair without surgery. The program combines PRP and exosome therapy delivered in-clinic by our medical team with a doctor-issued prescription for minoxidil, finasteride, and ketoconazole — dispensed by our licensed pharmacy partner, Melita Health & Beauty. One clinically measured, fully managed, guaranteed program.",
    benefits: [
      "AI-Powered Scalp Imaging & Density Mapping",
      "Exosome Hair Treatment via HydroPen Delivery",
      "PRP Hair Treatment (Follicle Reactivation Therapy)",
      "ScalpRx Prescription Protocol — doctor-issued prescription for Minoxidil, Finasteride & Ketoconazole (dispensed by Melita Health & Beauty pharmacy)",
    ],
    location: "St Julian’s, Malta",
    cta: "Book Your Free Consultation",
    note: "Over 1,000 patients treated",
    bgImage: "/assets/treatments/hair-regrowth-hero-bg.jpg",
    // Live hero right column is a portrait video reel — /assets/treatments/vid-hair-regrowth.mp4
    // (no hero.video field in the schema yet; see componentChangesNeeded).
  },

  // Live section 2: "Before and afters / hair loss treatment results guaranteed."
  education: {
    title: "hair loss treatment results guaranteed.",
    subtitle: "Before and afters",
    paragraphs: [
      "Average density increase of 21-28% after 90 days of treatment, as measured by AI-powered scalp density and follicle tracking at our Malta hair loss clinic. Each treatment program includes baseline and follow-up scans so you can see your own progress in numbers, not just in the mirror.",
    ],
    // Live shows a before/after slideshow here plus a gold "CHECK IF YOU QUALIFY" CTA;
    // the slideshow images were lazy-loaded and not present in the DOM extract.
  },

  // Live section 6: "Our guarantee / measured. verified. guaranteed." (renders earlier
  // than live order because of the shared template's fixed slot order).
  guarantee: {
    title: "measured. verified. guaranteed.",
    paragraphs: [
      "The only hair loss treatment clinic in Malta to offer a 100% performance guarantee*",
      "We're selective about who qualifies for our hair loss treatment. We only accept patients we genuinely believe we can help. For those who qualify for treatment at our Malta clinic, we're confident in the results our protocol can deliver — we have seen it work, again and again.",
      "If you qualify and complete your 90-day hair loss treatment — including all prescribed in-clinic sessions, your full prescribed minoxidil and finasteride regimen (issued by Dr. Giovanni and dispensed by our licensed pharmacy partner, Melita Health & Beauty), and the home-care steps in your plan — and your follow-up density scan shows no visible improvement, we will extend your treatment at no cost.",
      "*To ensure results remain measurable and medically valid, patients must:",
      "Complete all prescribed in-clinic sessions on schedule.",
      "Use the recommended oral and topical treatments consistently.",
      "Avoid unapproved scalp products, supplements, or external treatments.",
      "Maintain stable health, with no major hormonal, nutritional, or medical changes (e.g., thyroid imbalance, iron deficiency, pregnancy).",
      "Our guaranteed hair loss treatment programs are limited to 12 patients per month at our Malta clinic to ensure individual follow-up and measurable outcomes. Please inquire for the next available start date.",
    ],
    cta: "CHECK IF YOU QUALIFY",
  },

  // Live section 4: "The Science Behind the Results / no fads. only what works."
  precision: {
    title: "no fads. only what works.",
    intro:
      "For years, advanced hair loss treatments like exosome therapy and medically supervised minoxidil and finasteride protocols were limited to elite clinics abroad. For the first time in Malta, Carisma's doctor-led hair loss clinic offers the same standard of care: PRP and exosome therapy performed in-clinic by our medical team, paired with a doctor-issued prescription for minoxidil, finasteride, and ketoconazole — dispensed by our licensed pharmacy partner, Melita Health & Beauty. One complete, results-guaranteed treatment system. Each component of the Hair Regrowth treatment plays a unique role in restoring your follicles to life.",
  },

  // Live section 3: "eligibility criteria / selective by intention. successful by design."
  suitability: {
    title: "selective by intention. successful by design.",
    intro:
      "Noticing your hair thinning, shedding, or receding more each year? Experienced hair loss after a stressful episode, pregnancy, hormonal changes, or illness? Tried minoxidil, supplements, serums, and every at-home treatment only to end up right where you started? You're not alone. Hair loss affects over 50% of men and 40% of women at some point in their lives. The Hair Reset Protocol at our Malta clinic is for those ready to move beyond fads, a doctor-led, science-based hair loss treatment built for real, measurable regrowth, not quick fixes. Most early-stage hair loss patterns respond strongly to regenerative treatment when addressed early. If follicles are beyond recovery, we advise honestly and may recommend trusted hair transplant partners instead.",
    suitableFor: [
      "Noticing thinning or a receding hairline and want to stop hair loss early",
      "Tried minoxidil, finasteride, supplements, or at-home treatments that failed to work",
      "Don't want a hair transplant because of cost, scarring, or downtime",
      "Tired of \"miracle\" fixes and unproven hair loss products",
      "Want guaranteed, measurable hair regrowth results without surgery",
      "Ready for a doctor-led treatment at a specialist hair loss clinic in Malta",
    ],
    notIdeal: [
      "Advanced baldness where follicles are no longer biologically active",
      "Severe scalp conditions or inflammation that prevent regeneration",
      "Hormonal or medical issues (thyroid, anemia, medications) that must be stabilised first",
      "Expecting instant or one-session results",
      "Unwilling to follow a consistent 90-day medical plan",
      "Focused solely on price instead of clinical outcomes",
      "Seeking cosmetic cover-ups rather than true regeneration",
    ],
  },

  // Live section 5: "expert care / led by expertise. driven by results." (Dr Giovanni).
  experience: {
    title: "led by expertise. driven by results.",
    steps: [
      {
        title: "Dr. Giovanni Scornavacca",
        image: "/assets/treatments/hair-regrowth-dr-giovanni.png",
        desc: "The Hair Reset hair loss treatment is led by Dr. Giovanni Scornavacca, Malta's leading specialist in regenerative hair medicine. With over 20 years of clinical experience treating hair loss, he has helped thousands of patients at our Malta clinic restore their hair and confidence using evidence-based, minimally invasive treatments including PRP, exosome therapy, minoxidil, and finasteride. To ensure world-class expertise, Dr. Giovanni is flown from Italy to Malta each week to oversee all advanced regenerative procedures and treatment protocols personally. “Hair restoration should never be guesswork. Every follicle tells a story — our job is to help it start growing again..” — Dr. Giovanni, Hair Loss Treatment Specialist.",
      },
    ],
  },

  // Live section 7: "Our packages / choose your protocol".
  pricingGrid: {
    title: "choose your protocol",
    intro: "Our packages",
    items: [
      {
        name: "HAIR REGROWTH 30",
        price: "One treatment time: €399",
        desc: "Your first step toward treating hair loss at Malta's leading hair clinic. One time plan Includes: Hair loss treatment consultation with Dr. Giovanni. AI-Powered Scalp Imaging & Density Mapping. PRP Hair Treatment (Follicle Reactivation Therapy). ScalpRx Prescription Protocol — Finasteride (Oral Therapy) – blocks DHT, the hormone responsible for follicle miniaturization. Minoxidil (Topical Therapy) – boosts blood flow and oxygen delivery to stimulate new growth. Ketoconazole Shampoo – maintains scalp balance, reduces inflammation, and supports follicle health.",
      },
      {
        name: "HAIR REGROWTH 90",
        price: "Monthly: €897",
        desc: "Our most popular hair loss treatment - Measurable regrowth guaranteed in 90 days. ✅ Backed by the Carisma Measurable Results Guarantee. 3-month plan Includes: Hair regrowth consultation with Dr. Giovanni. Scalp Imaging & Density Mapping – identifies growth-potential zones for targeted treatment. 3-Month Regenerative Program: Day 1: Hair Scalp Complex: Exosomes delivered with the HydroPen (36-pin deep-delivery system). Day 20: PRP Follicle Reactivation Therapy. Day 40: Hair Scalp Complex. Day 60: PRP Follicle Reactivation Therapy. Day 80: Hair Scalp Complex. Day 90: Final Density Scan – progress comparison against your baseline imaging. Each session is performed by the Dr. ScalpRx Protocol a personalised minoxidil and finasteride prescription, issued by Dr. Giovanni and tailored to your hair loss pattern. Dispensed by our licensed pharmacy partner, Melita Health & Beauty — not by the clinic. Finasteride (Oral Therapy) – blocks DHT, the hormone responsible for follicle miniaturization. Minoxidil (Topical Therapy) – boosts blood flow and oxygen delivery to stimulate new growth. Ketoconazole Shampoo – maintains scalp balance, reduces inflammation, and supports follicle health. Post-Care Plan – guidance to maintain and strengthen results.",
      },
      {
        name: "HAIR REGROWTH 180",
        price: "Monthly: €1494",
        desc: "Full 6-month hair loss treatment protocol for long-term regrowth and stability. ✅ Backed by the Carisma Measurable Results Guarantee. 6 month plan Includes: Hair regrowth consultation with Dr. Giovanni. Scalp Imaging & Density Mapping – identifies growth-potential zones for targeted treatment. 6-Month Regenerative Program: Day 1: Hair Scalp Complex: Exosomes delivered with the HydroPen (36-pin deep-delivery system). Day 20: PRP Follicle Reactivation Therapy. Day 40: Hair Scalp Complex. Day 60: PRP Follicle Reactivation Therapy. Day 80: Hair Scalp Complex. Day 100: PRP Follicle Reactivation Therapy. Day 120: Hair Scalp Complex. Day 140: PRP Follicle Reactivation Therapy. Day 160: Hair Scalp Complex. Day 180: Final Density Scan – progress comparison against your baseline imaging. Each session is performed by the Dr. ScalpRx Protocol a personalised minoxidil and finasteride prescription, issued by Dr. Giovanni and tailored to your hair loss pattern. Dispensed by our licensed pharmacy partner, Melita Health & Beauty — not by the clinic. Finasteride (Oral Therapy) – blocks DHT, the hormone responsible for follicle miniaturization. Minoxidil (Topical Therapy) – boosts blood flow and oxygen delivery to stimulate new growth. Ketoconazole Shampoo – maintains scalp balance, reduces inflammation, and supports follicle health. Post-Care Plan – guidance to maintain and strengthen results.",
      },
    ],
  },

  // Live sections 8+9: "we don't just treat hair loss" photo collage + grey
  // "Why Patients Choose Our Hair Loss Treatment Clinic in Malta" card.
  trusted: {
    title: "We restore confidence through doctor-led regenerative hair treatments",
    subtitle: "to make visible results the new standard in Malta",
    images: [
      "/assets/treatments/hair-regrowth-consult-exam.png",
      "/assets/treatments/hair-regrowth-density-mapping.png",
      "/assets/treatments/hair-regrowth-prp-centrifuge.png",
      "/assets/treatments/hair-regrowth-prp-injection.png",
    ],
    points: [
      { title: "Why Patients Choose Our Hair Loss Treatment Clinic in Malta", desc: "" },
      { title: "No surgery or scars — non-surgical hair loss treatment that reactivates real hair growth", desc: "" },
      { title: "No downtime — minimal redness that fades within a day", desc: "" },
      { title: "Doctor-led treatment plan using clinically proven PRP, exosome therapy, minoxidil, and finasteride", desc: "" },
      { title: "Everything managed for you: consultation, treatment, and prescriptions all at one Malta clinic", desc: "" },
      { title: "Natural, gradual results that look and feel authentic — guaranteed", desc: "" },
      { title: "Discreet, central hair clinic in St Julian's, Malta with a proven track record", desc: "" },
      { title: "Finally, a hair loss treatment that actually works: backed by a measurable results guarantee", desc: "" },
      { title: "", desc: "Due to limited availability, our guaranteed hair loss treatment programs are restricted to 12 patients per month at our Malta clinic. Please inquire about the next available openings." },
    ],
  },

  // Live section 10: "hair loss treatment FAQs / you asked we answered".
  faqKicker: "hair loss treatment FAQs",
  faqTitle: "you asked we answered",
  faq: [
    {
      q: "What exactly is the Hair Reset Program?",
      a: "The Hair Reset Program is a doctor-led hair loss program at Carisma Aesthetics Malta that combines two in-clinic treatments — PRP hair therapy and exosome scalp therapy — with a doctor-issued prescription for proven medications, including minoxidil, finasteride, and ketoconazole. The prescription is written by our doctor and dispensed by our licensed pharmacy partner, Melita Health & Beauty (not by the clinic), to reactivate dormant follicles and restore natural hair growth without surgery. It is Malta's only exosome-powered hair loss treatment clinic.",
    },
    {
      q: "Who is the program best suited for?",
      a: "Our hair loss treatment is best suited for people with mild to moderate hair loss, thinning at the crown, receding hairline, or general reduction in density. The treatment is suitable for both men and women at our Malta clinic, including female pattern hair thinning and postpartum hair loss. If follicles are still active, results are highly achievable.",
    },
    {
      q: "How soon will I start seeing results?",
      a: "Most patients at our Malta hair loss clinic notice visible improvement between 8–12 weeks of treatment, with measurable density increases confirmed through scalp imaging. Patients on the full treatment protocol: PRP, exosomes, minoxidil, and finasteride, typically see the strongest results.",
    },
    {
      q: "How is this different from PRP alone?",
      a: "Traditional PRP hair treatment only stimulates growth factors from your blood. Our Hair Reset Protocol enriches PRP with lab-purified exosomes, which amplify follicle repair and accelerate hair regrowth at a cellular level, clinical studies show 25% greater results with exosome treatment compared to PRP alone. Combined with prescription minoxidil and finasteride, this is Malta's most comprehensive non-surgical hair loss treatment.",
    },
    {
      q: "Is it painful?",
      a: "Not at all. Hair loss treatments at our clinic are performed with topical numbing and gentle HydroPen microneedling, designed for scalp comfort. Mild redness may appear but fades within 24 hours. The minoxidil and finasteride components of the treatment are simply taken at home.",
    },
    {
      q: "Will I need to take time off work?",
      a: "No. The procedure is non-surgical with zero downtime, you can resume normal activity immediately.",
    },
    {
      q: "Is it safe?",
      a: "Yes. All hair loss treatments at our Malta clinic are performed by licensed medical professionals using sterile, CE-approved materials. PRP uses your own plasma, exosomes are biocompatible, and minoxidil and finasteride are FDA-approved medications prescribed by our doctor based on your individual needs.",
    },
    {
      q: "How does the guarantee work?",
      a: "If you qualify for our hair loss treatment and complete your 90-day protocol, including all prescribed in-clinic sessions, minoxidil and finasteride use, and home treatments, and your follow-up density scan shows no visible improvement, we will extend your treatment at no cost. Carisma Aesthetics is the only hair loss treatment clinic in Malta to offer this guarantee.",
    },
    {
      q: "How long do the results last?",
      a: "Hair loss treatment results are long-lasting when maintained. Most patients continue with our Maintenance Membership at our Malta clinic, which includes quarterly scans, PRP treatments, and prescription minoxidil and finasteride refills to sustain regrowth.",
    },
    {
      q: "What if I've already had a hair transplant?",
      a: "You can still benefit from our hair loss treatment. The program helps strengthen transplanted follicles, improve density with PRP and exosome therapy, and prevent future thinning in untreated areas. Post-transplant hair loss treatment is available at our Malta clinic.",
    },
    {
      q: "Can women do this treatment too?",
      a: "Absolutely. Our hair loss treatment is effective for female pattern thinning, postpartum shedding, and hormonal hair loss, with minoxidil dosages and treatment protocols tailored specifically for women at our Malta clinic.",
    },
  ],
};

export default t;
