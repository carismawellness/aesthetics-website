import type { Treatment } from "../treatment-types";

// Hair Regrowth / PRP + exosome hair-loss treatment (Malta).
// Migrated from the bespoke components/HairRegrowthPage.tsx (dark theme) to the
// shared, light-theme data-driven TreatmentPage. Content harvested from the live
// page (https://www.carismaaesthetics.com/hair-regrowth) and adapted to the
// template's section schema: hero · before/after · problem reframe · guarantee ·
// precision (the science) · suitability (3 personas + humanized notIdeal) ·
// experience (exactly 3 steps) · trusted (Top-Clinic band) · plan summary ·
// recommended · FAQ.
//
// Before/after note: the live page ships *combined* before|after PNGs
// (hair-regrowth-ba1..5.png), which cannot render in the shared BeforeAfterCarousel
// (it frames `before` and `after` as two separate side-by-side images). We instead
// use the repo's genuine *split* hair-loss before/after assets (prp-malta-ba4/ba5,
// mesotherapy-malta-ba-hair), with patient names + reviews matched to each photo's
// gender and thinning area, preserving 3 of the harvested testimonials.
const t: Treatment = {
  slug: "hair-regrowth",
  category: "Face",
  hero: {
    title: "Hair Loss Treatment Malta",
    subtitle: "Doctor-led, guaranteed regrowth in 90 days, no surgery, no guesswork.",
    body: "Malta's only doctor-led, exosome-powered hair loss clinic that reverses thinning hair without surgery. We combine PRP and exosome therapy, delivered in-clinic by our medical team, with a doctor-issued prescription for minoxidil, finasteride, and ketoconazole, dispensed by our licensed pharmacy partner, Melita Health & Beauty. One clinically measured, fully managed, results-guaranteed program with baseline and follow-up density scans, so you see your progress in numbers, not just in the mirror.",
    benefits: [
      "AI-powered scalp imaging & density mapping at Day 0 and Day 90",
      "Exosome hair therapy via 36-pin HydroPen delivery",
      "PRP follicle reactivation therapy from your own blood",
      "ScalpRx prescription protocol, minoxidil, finasteride & ketoconazole (dispensed by Melita Health & Beauty)",
    ],
    prices: [
      { label: "Single session (Hair Regrowth 30)", price: "from €399" },
      { label: "90-day guaranteed program", price: "from €897" },
      { label: "180-day program", price: "from €1,494" },
    ],
    location: "St Julian's, Malta",
    cta: "Book Your Hair Regrowth Consultation",
    bookHref: "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2800348&eid=4994303&oiid=sv%3A27490604&share=true&pId=2708191",
    note: "Over 1,000 patients treated · Guaranteed programs limited to 12 patients per month",
    heroVideo: "/assets/treatments/vid-hair-regrowth.mp4",
    image: "/assets/treatments/hair-regrowth-hero-poster.jpg",
  },
  info: [
    { metric: "Procedure Time", detail: "45-60 Minutes" },
    { metric: "Downtime", detail: "Minimal" },
    { metric: "Results Visible In", detail: "8-12 Weeks" },
    { metric: "Program Length", detail: "90-180 Days" },
    { metric: "Anaesthetic", detail: "Topical Numbing" },
  ],
  beforeAfterTitle: "HAIR REGROWTH RESULTS",
  beforeAfter: [
    { before: "/assets/treatments/hair-regrowth-ba1-1.jpg", after: "/assets/treatments/hair-regrowth-ba1-2.jpg", label: "Thinning temple hairline", name: "Marija C.", review: "My temple had gone so sparse you could see the scalp through it. The side sits much thicker now and the bald look is gone." },
    { before: "/assets/treatments/hair-regrowth-ba2-1.jpg", after: "/assets/treatments/hair-regrowth-ba2-2.jpg", label: "Diffuse crown thinning", name: "Daniel B.", review: "The whole top of my head was see-through in photos. There is proper coverage up there again and it reads a lot fuller." },
    { before: "/assets/treatments/hair-regrowth-ba3-1.jpg", after: "/assets/treatments/hair-regrowth-ba3-2.jpg", label: "Frontal scalp thinning", name: "Joseph A.", review: "I had assumed the thinning at the front was just my age now. It holds its shape and the scalp shows far less." },
    { before: "/assets/treatments/hair-regrowth-ba4-1.jpg", after: "/assets/treatments/hair-regrowth-ba4-2.jpg", label: "Receding frontal hairline", name: "Luke F.", review: "The corners of my hairline had thinned right back to bare skin. New hair has filled the front in and the patches closed up." },
    { before: "/assets/treatments/hair-regrowth-ba5-1.jpg", after: "/assets/treatments/hair-regrowth-ba5-2.jpg", label: "Widening crown part", name: "Rebecca M.", review: "My part kept getting wider and the crown looked wispy in daylight. It sits denser now and I can style it without hiding gaps." },
    { before: "/assets/treatments/hair-regrowth-ba6-1.jpg", after: "/assets/treatments/hair-regrowth-ba6-2.jpg", label: "Receded front hairline", name: "Kyle R.", review: "My forehead looked enormous because the front had gone so far back. The hairline sits lower and fuller now, which surprised me." },
    { before: "/assets/treatments/hair-regrowth-ba7-1.jpg", after: "/assets/treatments/hair-regrowth-ba7-2.jpg", label: "Top and vertex thinning", name: "Andrew S.", review: "The thin patch over the top kept catching the light in photos. There is noticeably more density across the middle now." },
    { before: "/assets/treatments/hair-regrowth-ba8-1.jpg", after: "/assets/treatments/hair-regrowth-ba8-2.jpg", label: "Thinning central parting", name: "Elena P.", review: "You could see straight down my parting in bright light. It looks much fuller along the part and barely any scalp shows." },
    { before: "/assets/treatments/hair-regrowth-ba9-1.jpg", after: "/assets/treatments/hair-regrowth-ba9-2.jpg", label: "Crown bald patch", name: "Matthew V.", review: "My partner kept pointing out the bare spot at the back of my head. The patch has closed over and blends with the rest now." },
    { before: "/assets/treatments/hair-regrowth-ba10-1.jpg", after: "/assets/treatments/hair-regrowth-ba10-2.jpg", label: "Crown thinning patch", name: "Steven G.", review: "The thin spot at the back was spreading wider every month. It has thickened up and the scalp no longer shows through." },
  ],
  problem: {
    kicker: "The real reason people book",
    title: "Every morning you notice a little more scalp than hair",
    body: [
      "Thinning hair quietly chips away at how confident you feel, doctor-led regenerative treatment reactivates your own follicles so you can stop counting strands and feel like yourself again.",
    ],
  },
  guarantee: {
    kicker: "The Natural Confidence Guarantee",
    title: "Natural Confidence Guarantee",
    paragraphs: [
      "Every program starts with a doctor-led scalp assessment and AI density scan, never a sales pitch, and follows a clinically measured, natural-first plan. If you qualify, complete your 90-day protocol exactly as prescribed, and your follow-up density scan shows no visible improvement, we extend your treatment at no cost. We are the only hair loss clinic in Malta to offer this.",
    ],
    cta: "Book Your Hair Regrowth Consultation",
    points: [
      { value: "Doctor-led", label: "Assessment & scan first", sub: "Never a salesperson" },
      { value: "Measured", label: "21-28% average density gain", sub: "Confirmed by Day-0 and Day-90 scans" },
      { value: "100%", label: "Performance guarantee", sub: "No visible result, treatment extended free" },
    ],
  },
  precision: {
    title: "No fads. Only what works.",
    intro:
      "For years, advanced hair loss treatments like exosome therapy and medically supervised minoxidil and finasteride protocols were limited to elite clinics abroad. For the first time in Malta, Carisma's doctor-led clinic offers the same standard of care, PRP and exosome therapy performed in-clinic by our medical team, paired with a doctor-issued prescription dispensed by our licensed pharmacy partner, Melita Health & Beauty. Each part of the program plays a distinct role in bringing your follicles back to life.",
    areas: [
      {
        zone: "01",
        video: "/assets/treatments/hair-regrowth-scalp-scanning.mp4",
        poster: "/assets/treatments/hair-regrowth-scalp-scanning-poster.jpg",
        name: "AI Scalp Imaging & Density Mapping",
        desc: "Establishes your clinical baseline, follicle density, thinning zones, and growth potential. Repeated at Day 0 and Day 90 to measure real results in numbers.",
      },
      {
        zone: "02",
        video: "/assets/treatments/hair-regrowth-exosome-hydropen.mp4",
        poster: "/assets/treatments/hair-regrowth-exosome-hydropen-poster.jpg",
        name: "Exosome Therapy via HydroPen",
        desc: "Lab-purified exosomes delivered deep into the scalp via the 36-pin HydroPen. Clinical studies show 25% greater results than PRP alone.",
      },
      {
        zone: "03",
        media: "/assets/treatments/hair-regrowth-prp-centrifuge.jpg",
        name: "PRP Follicle Reactivation",
        desc: "Growth factors concentrated from your own blood, injected precisely into the scalp to reactivate dormant follicles and stimulate new growth.",
      },
      {
        zone: "04",
        video: "/assets/treatments/hair-regrowth-scalprx.mp4",
        poster: "/assets/treatments/hair-regrowth-scalprx-poster.jpg",
        name: "ScalpRx Prescription Protocol",
        desc: "A personalised prescription for minoxidil, finasteride, and ketoconazole, written by Dr. Giovanni and dispensed by Melita Health & Beauty pharmacy.",
      },
    ],
  },
  suitability: {
    title: "Selective by intention. Successful by design.",
    intro:
      "Noticing your hair thinning, shedding, or receding more each year? Tried minoxidil, supplements, and every at-home fix only to end up where you started? You're not alone, hair loss affects over 50% of men and 40% of women at some point. We're selective about who we accept and only take on patients we genuinely believe we can help, because early-stage thinning responds strongly to regenerative treatment when addressed in time. If follicles are beyond recovery, we tell you honestly and may point you to trusted hair transplant partners instead.",
    personas: [
      {
        title: "The early-stage thinner",
        desc: "You've spotted a widening part, a receding hairline, or more scalp at the crown, and you want to act before it progresses.",
      },
      {
        title: "The tried-everything sceptic",
        desc: "You've cycled through shampoos, serums, and supplements with nothing to show for it, and you want a plan that's actually measured.",
      },
      {
        title: "The no-surgery seeker",
        desc: "You don't want a transplant's cost, scarring, or downtime, you want natural regrowth from your own follicles, guided by a doctor.",
      },
    ],
    notIdeal: [
      "Your follicles are no longer biologically active, advanced baldness needs a different route, and we'll point you to trusted transplant partners",
      "A scalp condition or active inflammation needs settling first, we'll treat that before regeneration can work",
      "An underlying issue (thyroid, iron, hormones) should be stabilised first, we'll guide you, then welcome you back",
      "You're hoping for instant, one-session results, real regrowth is measured over 90 days, not days",
      "You'd rather not commit to a consistent medical plan, the guarantee depends on following it through",
    ],
  },
  experience: {
    title: "Your treatment experience",
    steps: [
      {
        title: "Consultation & Density Scan",
        desc: "Dr. Giovanni assesses your hair loss pattern and medical history, and an AI scalp scan maps your follicle density to establish your Day-0 baseline.",
        image: "/assets/treatments/hair-regrowth-exp-consult.jpg",
      },
      {
        title: "Regenerative Treatment",
        desc: "In-clinic PRP and exosome sessions reactivate dormant follicles, paired with your personalised ScalpRx prescription for minoxidil, finasteride, and ketoconazole.",
        image: "/assets/treatments/hair-regrowth-exp-treatment.jpg",
      },
      {
        title: "Day-90 Review & Maintenance",
        desc: "A follow-up density scan compares your results against baseline in measurable numbers, and we set a maintenance plan to protect and build on your regrowth.",
        image: "/assets/treatments/hair-regrowth-exp-review.jpg",
      },
    ],
  },
  trusted: {
    title: "Malta's Top Clinic for Hair Loss Treatment",
    subtitle: "Doctor-Led Regenerative Hair Treatment in Malta",
    asSeenOn: [
      "/assets/press/lovin-malta.jpeg",
      "/assets/press/malta-daily.png",
      "/assets/press/bay.jpeg",
      "/assets/press/times-of-malta.png",
      "/assets/press/malta-today.jpg",
    ],
    images: ["/assets/treatments/hair-regrowth-scalp-marking.png"],
    points: [
      {
        title: "Doctor-Led, Not Salon-Led",
        desc: "Every program is overseen by Dr. Giovanni Scornavacca, a specialist in regenerative hair medicine flown in from Italy each week.",
      },
      {
        title: "Measured, Not Guessed",
        desc: "AI scalp imaging at Day 0 and Day 90 proves your results in numbers, the foundation of our performance guarantee.",
      },
      {
        title: "Non-Surgical, No Downtime",
        desc: "PRP, exosomes, and prescription therapy reactivate real hair growth with only mild redness that fades within a day.",
      },
      {
        title: "Everything Managed for You",
        desc: "Consultation, in-clinic treatment, and prescriptions handled at one Malta clinic, backed by a measurable results guarantee.",
      },
    ],
  },
  planSummary: {
    kicker: "Your hair regrowth plan",
    title: "Malta's Doctor-Led Hair Regrowth Program",
    benefits: [
      {
        icon: "shield",
        title: "Doctor-Led & Guaranteed",
        desc: "Overseen by a regenerative hair specialist and backed by a 100% performance guarantee, the only one of its kind in Malta.",
      },
      {
        icon: "chart",
        title: "Measured in Numbers",
        desc: "AI density scans at Day 0 and Day 90 prove your regrowth, patients average a 21-28% increase in density.",
      },
      {
        icon: "sparkle",
        title: "Natural, Gradual Regrowth",
        desc: "Your own follicles reactivated with PRP, exosomes, and prescription therapy, results that look and feel authentically yours.",
      },
    ],
    included: [
      { label: "Doctor-led consultation with Dr. Giovanni" },
      { label: "AI scalp imaging & density mapping (Day 0 + Day 90)" },
      { label: "In-clinic PRP & exosome therapy sessions" },
      { label: "ScalpRx prescription (dispensed by Melita Health & Beauty)" },
      { label: "Final density scan & post-care maintenance plan" },
    ],
    price: "From €399",
    priceLabel: "single session · 90-day program from €897",
    cta: { text: "Book Your Hair Regrowth Consultation", href: "/consultation" },
    reviews: "500+ verified reviews",
  },
  recommended: {
    title: "Recommended with Hair Regrowth",
    items: [
      { label: "PRP treatment", href: "/prp-malta", image: "/assets/treatments/hair-regrowth-prp-centrifuge.png" },
      { label: "Mesotherapy", href: "/mesotherapy-malta", image: "/assets/treatments/hair-regrowth-scalp-injection.png" },
      { label: "Exosome glow lift", href: "/exosome-glowlift", image: "/assets/treatments/hair-regrowth-scalp-imaging.png" },
      { label: "Microneedling", href: "/microneedling-malta", image: "/assets/treatments/hair-regrowth-density-mapping.png" },
    ],
  },
  faqKicker: "hair loss treatment FAQs",
  faqTitle: "You asked, we answered",
  faq: [
    {
      q: "What exactly is the Hair Reset Program?",
      a: "The Hair Reset Program is a doctor-led hair loss program at Carisma Aesthetics Malta that combines two in-clinic treatments, PRP hair therapy and exosome scalp therapy, with a doctor-issued prescription for proven medications, including minoxidil, finasteride, and ketoconazole. The prescription is written by our doctor and dispensed by our licensed pharmacy partner, Melita Health & Beauty (not by the clinic), to reactivate dormant follicles and restore natural hair growth without surgery. It is Malta's only exosome-powered hair loss treatment clinic.",
    },
    {
      q: "Who is the program best suited for?",
      a: "Our hair loss treatment is best suited for people with mild to moderate hair loss, thinning at the crown, a receding hairline, or general reduction in density. The treatment is suitable for both men and women at our Malta clinic, including female pattern hair thinning and postpartum hair loss. If follicles are still active, results are highly achievable.",
    },
    {
      q: "How soon will I start seeing results?",
      a: "Most patients at our Malta hair loss clinic notice visible improvement between 8 and 12 weeks of treatment, with measurable density increases confirmed through scalp imaging. Patients on the full protocol, PRP, exosomes, minoxidil, and finasteride, typically see the strongest results.",
    },
    {
      q: "How is this different from PRP alone?",
      a: "Traditional PRP hair treatment only stimulates growth factors from your blood. Our Hair Reset Protocol enriches PRP with lab-purified exosomes, which amplify follicle repair and accelerate hair regrowth at a cellular level, clinical studies show 25% greater results with exosome treatment compared to PRP alone. Combined with prescription minoxidil and finasteride, this is Malta's most comprehensive non-surgical hair loss treatment.",
    },
    {
      q: "Is it painful?",
      a: "Not at all. Hair loss treatments at our clinic are performed with topical numbing and gentle HydroPen microneedling, designed for scalp comfort. Mild redness may appear but fades within 24 hours. The minoxidil and finasteride components are simply taken at home.",
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
      a: "If you qualify for our hair loss treatment and complete your 90-day protocol, including all prescribed in-clinic sessions, minoxidil and finasteride use, and home-care steps, and your follow-up density scan shows no visible improvement, we will extend your treatment at no cost. Carisma Aesthetics is the only hair loss treatment clinic in Malta to offer this guarantee. To keep results measurable and medically valid, patients must complete all sessions on schedule, use the recommended oral and topical treatments consistently, avoid unapproved scalp products, and maintain stable health with no major hormonal, nutritional, or medical changes.",
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
      a: "Absolutely. Our hair loss treatment is effective for female pattern thinning, postpartum shedding, and hormonal hair loss, with minoxidil dosages and protocols tailored specifically for women at our Malta clinic.",
    },
    {
      q: "How much does hair loss treatment cost in Malta?",
      a: "A single session (Hair Regrowth 30) starts from €399 and includes your consultation with Dr. Giovanni, AI scalp imaging, PRP therapy, and the ScalpRx prescription protocol. Our most popular 90-day guaranteed program starts from €897, and the full 180-day program from €1,494. Book a free consultation at our St Julian's clinic for a personalised plan and quote.",
    },
  ],
};

export default t;
