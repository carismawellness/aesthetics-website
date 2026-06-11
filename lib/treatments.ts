// Treatment page content extracted from https://www.carismaaesthetics.com/
// Each treatment route renders the shared <TreatmentPage> template driven by this data.
// Sections render only when their data is present, so partially-extracted pages
// still match the global layout/header/footer exactly.

import { FACE_LINKS, BODY_LINKS, PACKAGE_LINKS, type NavLink } from "./site";

export type PriceItem = { label: string; price: string };
export type InfoItem = { metric: string; detail: string };
export type AreaItem = { name: string; desc: string; zone?: string; icon?: string };
export type Step = { title: string; desc: string; image?: string };
export type BeforeAfter = { before: string; after: string; label?: string };

export type Treatment = {
  slug: string;
  category: "Face" | "Body" | "Package";
  hero: {
    title: string;
    subtitle?: string;
    body?: string;
    prices?: PriceItem[];
    cta?: string;
    image?: string;
    imageRatio?: string;
    bgImage?: string;
    productTabs?: string[];
    heroForm?: boolean;
  };
  info?: InfoItem[];
  beforeAfterTitle?: string;
  beforeAfter?: BeforeAfter[];
  precision?: { title: string; intro?: string; areas?: AreaItem[]; additional?: string; additionalTitle?: string; additionalIntro?: string };
  suitability?: { title: string; intro?: string; suitableFor?: string[]; notIdeal?: string[] };
  experience?: { title: string; steps: Step[] };
  prepAftercare?: { kicker?: string; title: string; intro?: string; cards: { icon?: string; label: string; lead: string; points: string[] }[] };
  /** true when full content has not yet been extracted from the live page */
  pending?: boolean;
};

export const TREATMENTS: Record<string, Treatment> = {
  "wrinkle-relaxing-malta": {
    slug: "wrinkle-relaxing-malta",
    category: "Face",
    hero: {
      title: "BOTOX MALTA",
      subtitle: "Are wrinkles and fine lines getting in your way?",
      body: "Say goodbye to forehead lines, frown lines, and crow's feet with expert Botox treatments in Malta. Every session is performed by qualified doctors who specialise in facial anatomy, delivering natural, refined results that restore your confidence without changing who you are.",
      prices: [
        { label: "Lip Flip / Gummy Smile / Chin", price: "from €59" },
        { label: "One Area", price: "from €139" },
        { label: "Full Upper Face / Nefertiti neck lift", price: "from €249" },
        { label: "Underarms Sweating", price: "from €399" },
      ],
      cta: "BOOK YOUR SESSION NOW",
      image: "/assets/treatments/botox-hero.jpg",
      heroForm: true,
    },
    info: [
      { metric: "Procedure Time", detail: "15-30 Minutes" },
      { metric: "Downtime", detail: "Minimal" },
      { metric: "Results Last For", detail: "3-4 Months" },
      { metric: "Results Visible In", detail: "4-5 Days" },
      { metric: "Anaesthetic", detail: "None" },
    ],
    beforeAfterTitle: "BOTOX RESULTS",
    beforeAfter: [
      { before: "/assets/treatments/botox-before.png", after: "/assets/treatments/botox-after.png", label: "Crow's Feet" },
      { before: "/assets/treatments/botox-r1-before.png", after: "/assets/treatments/botox-r1-after.png" },
      { before: "/assets/treatments/botox-r2-before.png", after: "/assets/treatments/botox-r2-after.png" },
      { before: "/assets/treatments/botox-r3-before.png", after: "/assets/treatments/botox-r3-after.png" },
      { before: "/assets/treatments/botox-r4-before.png", after: "/assets/treatments/botox-r4-after.png" },
    ],
    precision: {
      title: "PRECISION AREAS OF REFINEMENT",
      intro:
        "Each botox treatment is carefully applied to specific anatomical areas by our doctors. Below are the most commonly treated zones at our Malta clinic.",
      areas: [
        { zone: "Forehead", icon: "/assets/treatments/icon-forehead.png", name: "Forehead Lines", desc: "Botox smooths horizontal lines across the forehead while preserving natural movement and expression" },
        { zone: "Brow", icon: "/assets/treatments/icon-brow.png", name: "Frown Lines", desc: "Botox softens the vertical creases between the brows that can create a tired or tense appearance." },
        { zone: "Eyes", icon: "/assets/treatments/icon-eyes.png", name: "Crow's Feet", desc: "Botox relaxes the fine lines at the outer corners of the eyes for a refreshed, rested look." },
        { zone: "Neck", icon: "/assets/treatments/icon-neck.png", name: "Nefertiti Lift", desc: "Botox refines the jawline and neck contour by relaxing the platysmal bands that pull downward." },
      ],
      additionalTitle: "Additional Botox Treatment Areas",
      additionalIntro: "These areas can also be treated with botox following a personalised consultation with one of our doctors.",
      additional: "Lip Flip, Gummy Smile, Chin Dimpling, Bunny Lines, Brow Lift, Jaw Slimming, Hyperhidrosis",
    },
    suitability: {
      title: "IS THIS SUITABLE FOR YOU?",
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
        "You are looking for volume restoration rather than line softening",
        "You prefer results that are visible immediately on day one",
        "You are pregnant, breastfeeding, or managing certain neurological conditions",
        "You expect every line to disappear completely",
        "You are not yet ready for an in-person consultation to assess suitability",
      ],
    },
    experience: {
      title: "YOUR TREATMENT EXPERIENCE",
      steps: [
        { title: "Personalised Consultation", desc: "We assess your facial anatomy, skin condition, medical history, and botox goals with one of our doctors.", image: "/assets/treatments/botox-step1.png" },
        { title: "Structured Botox Plan", desc: "Your doctor designs a precise, conservative plan mapped to the areas you want to refine.", image: "/assets/treatments/botox-step2.png" },
        { title: "The Treatment", desc: "A quick, comfortable session with minimal downtime, performed by a qualified doctor.", image: "/assets/treatments/botox-step3.png" },
        { title: "Review & Aftercare", desc: "We review your results as they settle and guide you through simple aftercare.", image: "/assets/treatments/botox-step4.png" },
      ],
    },
    prepAftercare: {
      kicker: "Preparation & Aftercare",
      title: "Your Session, Step by Step",
      intro: "A smooth botox experience begins with a few simple steps. Here is what to know before, during, and after your session at our Malta clinic.",
      cards: [
        { icon: "/assets/treatments/icon-prep-glow.png", label: "Before", lead: "Arrive informed and ready for a comfortable session.", points: ["Share your concerns and medical history", "Disclose all medications and supplements", "Avoid alcohol and blood thinners for 24 hours", "Pause strenuous exercise the day before"] },
        { icon: "/assets/treatments/icon-prep-exam.png", label: "During", lead: "Treatment is quick, precise, and guided by your comfort.", points: ["Targeted areas are marked before injection by your doctor", "Fine needles deliver precise, controlled doses of botox", "Mild pressure is normal — communicate freely", "Session takes 15–30 minutes"] },
        { icon: "/assets/treatments/icon-prep-glow.png", label: "After", lead: "A few precautions help your results settle beautifully.", points: ["No touching or massaging for 24 hours", "Avoid exercise, alcohol, and saunas for 24 hours", "Stay upright for the first 4 hours", "Results appear in 3–5 days, full effect at 2 weeks"] },
      ],
    },
  },

  "lip-fillers-malta": {
    slug: "lip-fillers-malta",
    category: "Face",
    hero: {
      title: "lip fillers malta",
      subtitle: "Are you looking to achieve fuller, more luscious lips?",
      body: "Get plump and luscious lips with our expert lip fillers in Malta. Say goodbye to thin lips and hello to the perfect pout.",
      prices: [{ label: "1ml", price: "from €219/ml" }],
      cta: "BOOK YOUR SESSION NOW",
    },
    info: [
      { metric: "Procedure Time", detail: "20-30 minutes" },
      { metric: "Downtime", detail: "Minimal" },
      { metric: "Results Last For", detail: "6-12 months" },
      { metric: "Results Visible In", detail: "Immediate" },
      { metric: "Anaesthetic", detail: "Local anesthetic" },
    ],
    beforeAfterTitle: "lip filler results",
    precision: {
      title: "precision areas of refinement",
      intro: "Enhancement is guided by your unique lip anatomy and desired outcome. Below are the four key dimensions we refine.",
      areas: [
        { name: "Lip Body", desc: "Adds subtle or fuller volume to the upper and lower lips, tailored to your natural proportions." },
        { name: "Contour", desc: "Defines the vermilion border for a crisp, elegant outline that frames the lips naturally." },
        { name: "Cupid's Bow", desc: "Refines the cupid's bow for a more defined, balanced shape that complements your features." },
        { name: "Symmetry", desc: "Addresses natural asymmetry between upper and lower lips for a harmonious, proportionate result." },
      ],
      additional: "Philtrum columns, oral commissures, perioral lines, lip flip, smoker's lines, marionette area",
    },
    suitability: {
      title: "is this suitable for you?",
      intro: "Lip enhancement is not one-size-fits-all. The right approach depends on your natural lip shape, facial proportions, and the result you are hoping for. We always start conservatively and build from there.",
      suitableFor: [
        "You want subtle enhancement that complements your natural features",
        "You would like improved symmetry, definition, or hydration",
        "You appreciate a conservative, gradual approach to enhancement",
        "You understand that some swelling is normal and final results settle in 2 to 4 weeks",
        "You are looking for a treatment that can be adjusted or reversed if needed",
      ],
      notIdeal: [
        "You are looking for a dramatically different lip shape",
        "You expect permanent results from a single session",
        "You are pregnant, breastfeeding, or have active cold sores in the lip area",
        "You have a low tolerance for temporary swelling or tenderness",
        "You would prefer a non-injectable alternative such as a lip flip",
      ],
    },
    experience: {
      title: "your treatment experience",
      steps: [
        { title: "personalised consultation", desc: "We assess your facial anatomy, skin condition, medical history, and botox goals with one of our doctors." },
        { title: "Structured Plan", desc: "Your doctor designs a medically guided botox plan tailored to your facial structure and desired outcome." },
        { title: "Targeted Treatments", desc: "Your doctor administers botox using fine, precise injections, quick, comfortable, and no downtime." },
        { title: "Ongoing Review & Adjustment", desc: "Your doctor monitors your response and refines the plan to ensure natural botox results over time." },
      ],
    },
  },

  "dermal-fillers-malta": {
    slug: "dermal-fillers-malta",
    category: "Face",
    hero: {
      title: "dermal fillers malta",
      subtitle: "Enhancing Facial Features with Hyaluronic Acid",
      body: "Looking to reduce facial lines and restore a more youthful appearance? Consider the benefits of injectable dermal fillers in Malta. These cosmetic procedures utilize hyaluronic acid, a gel-like substance found naturally in the body, to treat facial wrinkles, smile lines, and facial creases.",
      prices: [
        { label: "1ml", price: "from €269/ml" },
        { label: "2ml", price: "from €399 (€175/ml)" },
        { label: "3ml+", price: "from €499 (€150/ml)" },
      ],
      cta: "BOOK YOUR DERMAL FILLERS SESSION NOW",
    },
    info: [
      { metric: "Procedure time", detail: "20-45 minutes" },
      { metric: "Downtime", detail: "Minimal" },
      { metric: "Results last for", detail: "6-12 months" },
      { metric: "Results visible in", detail: "Immediate" },
      { metric: "Anaesthetic", detail: "Local anesthetic" },
    ],
    beforeAfterTitle: "dermal fillers results",
    precision: {
      title: "precision areas of refinement",
      intro: "Filler placement is guided by your facial anatomy and individual goals. Below are the four most commonly enhanced zones.",
      areas: [
        { name: "Cheek Contour", desc: "Restores volume and defines the midface for a naturally lifted, sculpted appearance." },
        { name: "Jaw Definition", desc: "Sharpens the jawline contour and strengthens the lower face profile with precise placement." },
        { name: "Nasolabial Folds", desc: "Softens the lines from nose to mouth that deepen with age, restoring a smoother transition." },
        { name: "Chin Projection", desc: "Improves chin shape and projection to bring balance and proportion to the facial profile." },
      ],
      additional: "Tear troughs, temples, marionette lines, pre-jowl sulcus, nose profile, lip border",
    },
    suitability: {
      title: "is this suitable for you?",
      intro: "Dermal fillers restore volume and refine contours, but they work best when guided by a clear understanding of your facial structure. Your consultation ensures the treatment plan is designed around your anatomy, not a trend.",
      suitableFor: [
        "You have noticed volume loss in areas like cheeks, jawline, or temples",
        "You want natural-looking contouring tailored to your facial balance",
        "You are comfortable with results that settle over 2 to 4 weeks",
        "You value a personalised plan rather than a one-area approach",
        "You appreciate that results are adjustable and reversible",
      ],
      notIdeal: [
        "You are seeking an overall skin quality improvement without adding volume",
        "You expect filler to address deep skin texture concerns or pigmentation",
        "You are pregnant, breastfeeding, or have active infection near the treatment area",
        "You are looking for permanent structural changes",
        "You are on blood-thinning medication without medical clearance",
      ],
    },
    experience: {
      title: "your treatment experience",
      steps: [
        { title: "personalised consultation", desc: "We assess your facial anatomy, skin condition, medical history, and botox goals with one of our doctors." },
        { title: "Structured Plan", desc: "Your doctor designs a medically guided botox plan tailored to your facial structure and desired outcome." },
        { title: "Targeted Treatments", desc: "Your doctor administers botox using fine, precise injections, quick, comfortable, and no downtime." },
        { title: "Ongoing Review & Adjustment", desc: "Your doctor monitors your response and refines the plan to ensure natural botox results over time." },
      ],
    },
  },

  "microneedling-malta": {
    slug: "microneedling-malta",
    category: "Face",
    hero: {
      title: "microneedling + mesotherapy malta",
      subtitle: "LOOKING to achieve a smoother, more youthful complexion?",
      body: "Discover the power of Microneedling (combined with Mesotherapy) treatments in Malta! Our minimally invasive, collagen-inducing treatments can help reduce the appearance of fine lines, acne, acne scars, and other skin imperfections, leaving you with a smoother, more radiant complexion. Trust our experienced team to help you achieve your skincare goals.",
      prices: [
        { label: "1 session", price: "from €149 (+€50 for Exosomes)" },
        { label: "3 sessions", price: "from €359 (€120/session)" },
        { label: "5 sessions", price: "from €599 (€119/session)" },
      ],
      cta: "BOOK YOUR MICRONEEDLING+MESOTHERAPY NOW",
    },
    info: [
      { metric: "Procedure time", detail: "1 Hour" },
      { metric: "Downtime", detail: "2-3 days" },
      { metric: "Results last for", detail: "Maintenance courses maybe required" },
      { metric: "Results visible in", detail: "Individual, depending on the skin condition" },
      { metric: "Anaesthetic", detail: "Anesthetic cream" },
    ],
    beforeAfterTitle: "microneedling results",
    precision: {
      title: "precision areas of refinement",
      intro: "Controlled micro-injuries trigger your skin's natural renewal response. Below are the primary concerns and zones we target.",
      areas: [
        { name: "Skin Texture", desc: "Refines overall skin texture by stimulating collagen production across the full treatment zone." },
        { name: "Acne Scarring", desc: "Breaks down scar tissue and promotes new collagen to gradually smooth rolling and pitted scars." },
        { name: "Enlarged Pores", desc: "Tightens the pore structure through repeated collagen stimulation for a visibly refined surface." },
        { name: "Fine Lines", desc: "Softens early fine lines by encouraging the skin to rebuild its collagen matrix from within." },
      ],
      additional: "Pigmentation, stretch marks, neck, decolletage, hands, surgical scars",
    },
    suitability: {
      title: "is this suitable for you?",
      intro: "Every skin tells a different story. Microneedling with mesotherapy is most effective when tailored to your specific skin concerns, whether that is scarring, texture, fine lines, or overall radiance. A free consultation with one of our doctors helps us assess your skin and design a treatment plan that works for you.",
      suitableFor: [
        "You want to improve acne scarring, enlarged pores, fine lines, or uneven texture",
        "You are open to 3 to 6 sessions for cumulative, lasting improvement",
        "You can manage 24 to 48 hours of mild redness similar to light sunburn",
        "You are interested in combining microneedling with exosomes or PRP for enhanced results",
        "You want a treatment that improves skin quality without injectables",
      ],
      notIdeal: [
        "You currently have an active acne breakout or skin infection",
        "You have used isotretinoin (Accutane) within the last six months",
        "You are pregnant, breastfeeding, or have active cold sores in the area",
        "You have a history of keloid scarring that has not been assessed",
        "You cannot commit to sun protection during the recovery period",
      ],
    },
    experience: {
      title: "your treatment experience",
      steps: [
        { title: "personalised consultation", desc: "We assess your skin condition, concerns, and medical history with one of our doctors to design your personalised microneedling plan." },
        { title: "Structured Plan", desc: "Your doctor selects the mesotherapy cocktail and treatment protocol tailored to your skin type, concerns, and goals." },
        { title: "Targeted Treatments", desc: "Your doctor performs microneedling with your personalised mesotherapy cocktail: precise, comfortable, and no downtime." },
        { title: "Ongoing Review & Adjustment", desc: "Your doctor reviews your skin's response and refines the plan to ensure optimal microneedling results over time." },
      ],
    },
  },

  profhilo: {
    slug: "profhilo",
    category: "Face",
    hero: {
      title: "profhilo",
      subtitle: "Are you looking to refresh & revitalize your skin?",
      body: "Looking for a non-invasive way to rejuvenate your skin? Profhilo treatments in Malta can help! Carisma Aesthetics offers this revolutionary hyaluronic acid treatment to boost hydration, firmness, and radiance. Book your appointment today and experience youthful, glowing skin!",
      prices: [
        { label: "1 session", price: "from €279" },
        { label: "2 sessions", price: "from €449 (€224/session)" },
        { label: "3 sessions", price: "from €649 (€216/session)" },
      ],
      cta: "BOOK YOUR SESSION NOW",
    },
    info: [
      { metric: "Procedure Time", detail: "30-60 minutes" },
      { metric: "Downtime", detail: "Dependent of concern" },
      { metric: "Results Last For", detail: "Maintenance may be required" },
      { metric: "Results Visible In", detail: "Dependent of concern" },
      { metric: "Anaesthetic", detail: "Anesthetic cream" },
    ],
    beforeAfterTitle: "profhilo results",
    precision: {
      title: "precision areas of refinement",
      intro: "Profhilo is a skin quality treatment, not a filler. It hydrates and firms from within without adding volume or changing your facial structure.",
      areas: [
        { name: "Face", desc: "Restores deep hydration and firmness across the face using five precise bio-injection points." },
        { name: "Neck", desc: "Addresses crepey texture and laxity in the neck, an area that often reveals early ageing." },
        { name: "Chest", desc: "Improves skin quality across the chest where sun exposure and thinning skin are most visible." },
        { name: "Hands", desc: "Replenishes hydration and volume in the hands, restoring a smoother, more youthful appearance." },
      ],
      additional: "Inner arms, above the knee, under-eye area, jawline laxity, forehead skin quality",
    },
  },

  "mesotherapy-malta": {
    slug: "mesotherapy-malta",
    category: "Face",
    hero: {
      title: "mesotherapy & skin boosters",
      subtitle: "Are you looking to refresh & revitalize your skin?",
      body: "Looking for a non-invasive way to rejuvenate your skin? Our Mesotherapy treatments in Malta can help! Our team uses a personalized blend of skin boosters (hyaluronic acid), vitamins, minerals, and amino acids to restore your skin's natural radiance and vitality.",
      prices: [
        { label: "1 session", price: "from €199" },
        { label: "2 sessions", price: "from €349 (€175/session)" },
        { label: "3 sessions", price: "from €499 (€167/session)" },
      ],
      cta: "free consultation",
    },
    info: [
      { metric: "Procedure time", detail: "30/60 minutes" },
      { metric: "Downtime", detail: "Dependent of concern" },
    ],
  },

  "laser-hair-removal-malta": {
    slug: "laser-hair-removal-malta",
    category: "Body",
    hero: {
      title: "laser hair removal",
      body: "World-renowned Alma Soprano for the first time in Malta",
      cta: "book your session",
    },
    precision: {
      title: "Laser Hair Removal pricing",
      areas: [
        { name: "Arms | from 35 EUR", desc: "Say goodbye to daily shaving and irritation. Our laser hair removal solutions ensure smooth skin from shoulder to fingertip, helping you maintain a well-groomed appearance with minimal effort." },
        { name: "Bikini | from 39 EUR", desc: "Prepare for beach season all year round with our expert bikini laser treatments. We offer a variety of options, from a standard bikini line to a full Brazilian, ensuring optimal comfort and confidence." },
        { name: "Legs | from 109 EUR", desc: "Enjoy effortlessly smooth legs with our professional laser hair removal services. Whether you prefer full or half-leg treatments, we provide long-lasting results, eliminating the need for frequent shaving." },
        { name: "Face | from 25 EUR", desc: "Achieve a flawless, hair-free complexion with our professional laser hair removal services. We target unwanted facial hair, from eyebrows to the chin, ensuring smooth and long-lasting results." },
        { name: "Body | from 49 EUR", desc: "Experience the confidence of a smooth, hair-free torso. Our advanced laser treatments effectively remove unwanted hair from various areas of the body, providing a sleek and polished look." },
        { name: "Men's | from 25 EUR", desc: "Enhance your grooming routine with our customized laser hair removal solutions for men. We target common areas such as the back, shoulders, chest, and abs, ensuring a refined and polished appearance." },
      ],
    },
    experience: {
      title: "our process",
      steps: [
        { title: "Free Consultation", desc: "We begin with a one-on-one consultation to understand your skin type, hair type, and goals. You'll receive a free patch test to experience the Alma Soprano Platinum system firsthand and confirm your skin's compatibility. Takes 15–20 minutes. No obligation to continue." },
        { title: "Custom Treatment Plan", desc: "Based on your hair growth patterns and skin tone, we create a tailored plan designed to maximize results in the fewest sessions possible. We'll walk you through the timeline, pre- and post-care, and answer any questions. Most plans span 6–8 sessions spaced a few weeks apart." },
        { title: "Virtually Painless Laser Sessions", desc: "Using triple-wavelength technology and ICE Plus™ cooling, each session is designed to be comfortable and efficient. Treatments take as little as 15–30 minutes, with no downtime—you can return to your day immediately. Our system cools the skin to as low as –4°C to keep treatments truly pain-free." },
        { title: "Ongoing Monitoring & Adjustments", desc: "We check in throughout your treatment course to monitor progress and adjust settings for optimal results. Our goal is not just smooth skin—but results that last. Most clients report visible reduction after just 2–3 sessions." },
      ],
    },
  },

  hydrafacial: {
    slug: "hydrafacial",
    category: "Face",
    hero: {
      title: "hydrafacial in malta",
      subtitle: "The Deep-Cleansing Facial That Hydrates, Brightens and Restores Your Skin",
      body: "Dull skin, clogged pores, or a complexion that has lost its glow? Our HydraFacial in Malta cleanses, extracts, and hydrates in a single session, personalised to your skin type and concerns. Walk out with visibly clearer, more radiant skin from your very first visit, plumper, more radiant skin from your very first session.",
      prices: [
        { label: "Hydrafacial Fresh (30 mins)", price: "€99" },
        { label: "Hydrafacial Glow (50 mins)", price: "€139" },
        { label: "Hydrafacial Signature (80 mins)", price: "€199" },
      ],
      cta: "BOOK YOUR SESSION NOW",
    },
    beforeAfterTitle: "hydrafacial results",
  },

  "fat-freezing": {
    slug: "fat-freezing",
    category: "Body",
    hero: {
      title: "BURN STUBBORN FAT, NO SURGERY.",
      subtitle: "fat eraser protocol",
      body: "For those who have tried dieting, eating healthier and moving more, but the love handles, stubborn belly fat and double chin still will not budge.",
      prices: [
        { label: "3x Fat Freezing sessions with CoolSculpting", price: "(€360)" },
        { label: "4x access to spa & fitness facilities", price: "(€140)" },
        { label: "Tanita Body Composition Analysis", price: "(€60)" },
        { label: "€25 Carisma Aesthetics credit", price: "(€25)" },
        { label: "TOTAL VALUE: €550 — TODAY: €199 ONLY", price: "€199" },
      ],
      cta: "Claim your spot now",
    },
    precision: {
      title: "TARGETED CONTOURING",
      intro: "Treat visible fat bulges in 7 areas of the body.",
      areas: [
        { name: "Stomach / Belly Fat", desc: "" },
        { name: "Love handles", desc: "" },
        { name: "Upper arms", desc: "" },
        { name: "Thighs", desc: "" },
        { name: "Banana roll", desc: "" },
        { name: "Back fat / bra fat", desc: "" },
        { name: "Double chin / jawline", desc: "" },
      ],
      additional: "Focus on your biggest trouble spot first so love handles, lower belly or double chin start to look smoother in clothes and photos.",
    },
  },

  "fat-dissolving-malta": {
    slug: "fat-dissolving-malta",
    category: "Face",
    hero: {
      title: "fat dissolving",
      subtitle: "Are you tired of dealing with stubborn localised fat?",
      body: "Embrace a new you with our reliable and impactful localized fat reduction solutions in Malta! Our knowledgeable team is focused on helping you realise a more contoured and youthful version of yourself, without the drawbacks of surgical alternatives.",
      prices: [
        { label: "1 session", price: "from €149" },
        { label: "2 sessions (€125/session)", price: "from €249" },
        { label: "3 sessions (€117/session)", price: "from €349" },
      ],
      cta: "book your fat dissolving session now",
      image: "/assets/treatments/fat-dissolving-hero.jpg",
      productTabs: ["AQUALYX", "LEMON BOTTLE"],
    },
    info: [
      { metric: "Procedure Time", detail: "20-30 minutes" },
      { metric: "Downtime", detail: "7-14 days of swelling" },
      { metric: "Results Last For", detail: "Permanent" },
      { metric: "Results Visible In", detail: "2 weeks or more" },
      { metric: "Anaesthetic", detail: "None" },
    ],
    beforeAfterTitle: "fat dissolving results",
    beforeAfter: [
      { before: "/assets/treatments/fat-dissolving-before.jpg", after: "/assets/treatments/fat-dissolving-after.jpg", label: "Under Chin Fat Reduction" },
    ],
    precision: {
      title: "precision areas of refinement",
      intro: "This treatment targets localised fat deposits that resist diet and exercise. Below are the areas most commonly treated.",
      areas: [
        { name: "Double Chin", desc: "Reduces submental fullness beneath the chin to reveal a cleaner, more defined profile." },
        { name: "Jowl Area", desc: "Refines the jawline by reducing soft tissue that blurs the jaw-to-neck transition." },
        { name: "Buccal Region", desc: "Slims the lower cheek area for a more contoured, sculpted facial silhouette." },
        { name: "Stubborn Pockets", desc: "Targets small, resistant fat deposits on the body that do not respond to lifestyle alone." },
      ],
      additional: "Upper arms, inner thighs, flanks, bra fat, knee area, abdomen",
    },
    suitability: {
      title: "is this suitable for you?",
      intro: "Fat dissolving targets small, stubborn pockets of fat that resist diet and exercise. It is a contouring treatment, not a weight loss solution. Realistic expectations and a consultation ensure this is the right fit for your goals.",
      suitableFor: [
        "You have a localised area of stubborn fat, such as under the chin or jawline",
        "You are close to your ideal weight but want targeted refinement",
        "You understand that results develop gradually over 6 to 8 weeks",
        "You are willing to commit to 2 to 3 sessions for optimal contouring",
        "You are comfortable with temporary swelling and tenderness during recovery",
      ],
      notIdeal: [
        "You are looking for significant overall weight loss",
        "You have loose or sagging skin in the treatment area",
        "You expect visible change after a single session without a follow-up course",
        "You are pregnant, breastfeeding, or have active infection near the area",
        "You have a very low tolerance for post-treatment downtime of 1 to 2 weeks",
      ],
    },
    experience: {
      title: "your treatment experience",
      steps: [
        { title: "personalised consultation", desc: "We assess your facial anatomy, skin condition, medical history, and botox goals with one of our doctors.", image: "/assets/treatments/botox-step1.png" },
        { title: "Structured Plan", desc: "Your doctor designs a medically guided botox plan tailored to your facial structure and desired outcome.", image: "/assets/treatments/botox-step2.png" },
        { title: "Targeted Treatments", desc: "Your doctor administers botox using fine, precise injections, quick, comfortable, and no downtime.", image: "/assets/treatments/botox-step3.png" },
        { title: "Ongoing Review & Adjustment", desc: "Your doctor monitors your response and refines the plan to ensure natural botox results over time.", image: "/assets/treatments/botox-step4.png" },
      ],
    },
  },

  "thread-lift-malta": {
    slug: "thread-lift-malta",
    category: "Face",
    hero: {
      title: "thread lift",
      subtitle: "Ready to defy gravity and achieve a more youthful, lifted appearance without surgery?",
      body: "Looking for a non-surgical facelift option in Malta? Our Thread Lift treatments can help lift and tighten your skin, giving you a more youthful and refreshed appearance. Our experienced team uses the latest techniques and top-quality threads to ensure natural-looking, long-lasting results.",
      prices: [
        { label: "BPO threads", price: "from €239" },
        { label: "Semi-permanent (not PDO thread)", price: "from €2100" },
      ],
      cta: "BOOK YOUR THREAD LIFT SESSION NOW",
    },
    info: [
      { metric: "Procedure Time", detail: "2-3 hours" },
      { metric: "Downtime", detail: "2 weeks, with doctor monitoring" },
      { metric: "Results Last For", detail: "4-5 years" },
      { metric: "Results Visible In", detail: "2 weeks" },
      { metric: "Anaesthetic", detail: "Local anesthetic" },
    ],
    beforeAfterTitle: "thread lift results",
    precision: {
      title: "precision areas of refinement",
      intro: "Medical-grade threads are placed beneath the skin to lift and reposition tissue. Below are the primary zones of treatment.",
      areas: [
        { name: "Midface Lift", desc: "Repositions sagging cheek tissue upward to restore a naturally lifted, youthful midface contour." },
        { name: "Jowl Reduction", desc: "Lifts and tightens the jowl area to redefine the transition from face to jawline." },
        { name: "Jawline Contour", desc: "Creates a sharper, more defined jaw profile through precise thread placement along the mandible." },
        { name: "Neck Lift", desc: "Addresses neck laxity and banding for a smoother, more refined neck-to-jaw transition." },
      ],
      additional: "Brow lift, nasolabial area, marionette zone, chin projection, temple region",
    },
    suitability: {
      title: "is this suitable for you?",
      intro: "A thread lift provides non-surgical lifting for the face and neck, offering both an immediate visible result and long-term collagen stimulation. It is a medical procedure that requires a doctor's assessment to determine if it is the right approach for you.",
      suitableFor: [
        "You have mild to moderate sagging and want a non-surgical lifting option",
        "You want both an immediate lift and progressive collagen improvement",
        "You are looking for results that last 12 to 24 months",
      ],
      notIdeal: [
        "You have very advanced sagging that may require a surgical approach",
        "You are not prepared for 1 to 2 weeks of recovery with some swelling",
        "You are pregnant, breastfeeding, or managing autoimmune conditions",
        "You expect the same degree of lift as a surgical facelift",
        "You have very thin skin, which may need a different treatment pathway",
      ],
    },
    experience: {
      title: "YOUR TREATMENT EXPERIENCE",
      steps: [
        { title: "Personalised Consultation", desc: "We assess your facial anatomy, skin condition, medical history, and botox goals with one of our doctors." },
        { title: "Structured Plan", desc: "Your doctor designs a medically guided botox plan tailored to your facial structure and desired outcome." },
        { title: "Targeted Treatments", desc: "Your doctor administers botox using fine, precise injections, quick, comfortable, and no downtime." },
        { title: "Ongoing Review & Adjustment", desc: "Your doctor monitors your response and refines the plan to ensure natural botox results over time." },
      ],
    },
  },

  "chemical-peels-malta": {
    slug: "chemical-peels-malta",
    category: "Face",
    hero: {
      title: "chemical peels",
      subtitle: "Are you seeking a brighter, smoother, and more youthful complexion?",
      body: "Get a safe and effective Chemical Peel treatment in Malta! Our experienced team uses medical-grade solutions. Inflammatory (TCA and Retinoic) peels deeply and takes 1-10 days to heal, typically done in cold season. Non-inflammatory (Mandelic and Salicylic acid) is gentler and can be done in any season. Book now for even, radiant skin!",
      prices: [
        { label: "1 session", price: "from €135" },
        { label: "3 sessions", price: "from €399 (€133/session)" },
        { label: "5 sessions", price: "from €649 (€217/session)" },
      ],
      cta: "free consultation",
    },
    info: [
      { metric: "Procedure time", detail: "20-30 minutes" },
      { metric: "Downtime", detail: "None to 2 weeks" },
      { metric: "Results last for", detail: "6-12 months" },
      { metric: "Results visible in", detail: "1-2 weeks" },
      { metric: "Anaesthetic", detail: "None" },
    ],
  },

  "hair-regrowth": {
    slug: "hair-regrowth",
    category: "Face",
    hero: {
      title: "Hair Loss Treatment in Malta",
      subtitle: "non-surgical hair loss clinic guaranteed results in 90 Days",
      body: "Malta's only doctor-led, exosome-powered hair loss treatment clinic that reverses thinning hair without surgery. The program combines PRP and exosome therapy delivered in-clinic by our medical team with a doctor-issued prescription for minoxidil, finasteride, and ketoconazole — dispensed by our licensed pharmacy partner, Melita Health & Beauty. One clinically measured, fully managed, guaranteed program.",
      prices: [
        { label: "HAIR REGROWTH 30", price: "€399" },
        { label: "HAIR REGROWTH 90", price: "Monthly: €897" },
        { label: "HAIR REGROWTH 180", price: "Monthly: €1494" },
      ],
      cta: "Book Your Free Consultation",
    },
    beforeAfterTitle: "Before and afters",
    precision: {
      title: "The Science Behind the Results",
      intro: "For years, advanced hair loss treatments like exosome therapy and medically supervised minoxidil and finasteride protocols were limited to elite clinics abroad. For the first time in Malta, Carisma's doctor-led hair loss clinic offers the same standard of care: PRP and exosome therapy performed in-clinic by our medical team, paired with a doctor-issued prescription for minoxidil, finasteride, and ketoconazole — dispensed by our licensed pharmacy partner, Melita Health & Beauty. One complete, results-guaranteed treatment system.",
      areas: [
        { name: "Finasteride (Oral Therapy)", desc: "blocks DHT, the hormone responsible for follicle miniaturization." },
        { name: "Minoxidil (Topical Therapy)", desc: "boosts blood flow and oxygen delivery to stimulate new growth." },
        { name: "Ketoconazole Shampoo", desc: "maintains scalp balance, reduces inflammation, and supports follicle health." },
      ],
    },
    suitability: {
      title: "eligibility criteria",
      intro: "Noticing your hair thinning, shedding, or receding more each year? Experienced hair loss after a stressful episode, pregnancy, hormonal changes, or illness? Tried minoxidil, supplements, serums, and every at-home treatment only to end up right where you started? You're not alone. Hair loss affects over 50% of men and 40% of women at some point in their lives. The Hair Reset Protocol at our Malta clinic is for those ready to move beyond fads, a doctor-led, science-based hair loss treatment built for real, measurable regrowth, not quick fixes.",
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
  },

  "collagen-stimulator-malta": {
    slug: "collagen-stimulator-malta",
    category: "Face",
    hero: {
      title: "collagen stimulator (bio-revitalization)",
      subtitle: "Is your skin lacking collagen?",
      body: "Discover the power of Collagen Stimulator (Sculptra & Radiesse) treatment in Malta for natural skin rejuvenation. Boost collagen production, reduce wrinkles, and achieve youthful, radiant skin. Non-surgical facelift alternative",
      prices: [{ label: "Sculptra & Radiesse", price: "From €399/vial" }],
      cta: "BOOK YOUR COLLAGEN STIMULATOR SESSION NOW",
    },
    info: [
      { metric: "Procedure time", detail: "45/60 min" },
      { metric: "Downtime", detail: "Minimal" },
      { metric: "Results last for", detail: "12 months" },
      { metric: "Results visible in", detail: "1-3 months" },
      { metric: "Anaesthetic", detail: "Local anesthetic" },
    ],
    beforeAfterTitle: "collagen stimulator results",
    precision: {
      title: "precision areas of refinement",
      intro: "Collagen stimulators rebuild your skin's structural foundation gradually. Below are the zones where this approach is most effective.",
      areas: [
        { name: "Cheek Volume", desc: "Targets dark spots, sun damage, and uneven skin tone with controlled chemical exfoliation." },
        { name: "Temple Hollows", desc: "Fills the temple area where volume loss creates a hollowed, aged appearance over time." },
        { name: "Jawline Scaffold", desc: "Strengthens the lower face contour through progressive collagen deposition along the jaw." },
        { name: "Skin Firmness", desc: "Improves overall skin density and firmness for a more lifted, toned facial canvas" },
      ],
      additional: "Pre-jowl area, nasolabial folds, marionette region, chin, midface lateral, brow area",
    },
    suitability: {
      title: "is this suitable for you?",
      intro: "Collagen stimulators encourage your body to rebuild its own collagen over time. This is not an instant-result treatment. It is designed for those who prefer a gradual, natural-looking restoration that unfolds over weeks and months.",
      suitableFor: [
        "You want long-lasting rejuvenation that develops naturally over 1 to 3 months",
        "You are experiencing volume loss in areas like cheeks, temples, or mid-face",
        "You value results that come from your own collagen rather than a synthetic filler",
        "You are open to a multi-session treatment plan for optimal rebuilding",
        "You appreciate a treatment that continues improving long after your appointment",
      ],
      notIdeal: [
        "You need visible results for an upcoming event in the next few weeks",
        "You prefer a treatment that delivers immediate, same-day results",
        "You are pregnant, breastfeeding, or managing certain autoimmune conditions",
        "You are looking for quick contouring rather than progressive restoration",
        "You have very thin skin that may need an alternative approach",
      ],
    },
    experience: {
      title: "your treatment experience",
      steps: [
        { title: "personalised consultation", desc: "We assess your facial anatomy, skin condition, medical history, and botox goals with one of our doctors." },
        { title: "Structured Plan", desc: "Your doctor designs a medically guided botox plan tailored to your facial structure and desired outcome." },
        { title: "Targeted Treatments", desc: "Your doctor administers botox using fine, precise injections, quick, comfortable, and no downtime." },
        { title: "Ongoing Review & Adjustment", desc: "Your doctor monitors your response and refines the plan to ensure natural botox results over time." },
      ],
    },
  },

  "polynucleotides-salmon-dna": {
    slug: "polynucleotides-salmon-dna",
    category: "Face",
    hero: {
      title: "polynucleotides (salmon dna)",
      subtitle: "ARE YOU LOOKING TO RESTORE FIRMER, SMOOTHER, MORE RADIANT SKIN?",
      body: "Polynucleotides (Salmon DNA) boost hydration, repair damaged skin, and stimulate collagen — giving you smoother texture, improved elasticity, and a naturally refreshed glow.",
      prices: [{ label: "1ml", price: "from €249/ml" }],
      cta: "BOOK YOUR SESSION NOW",
    },
    info: [
      { metric: "Procedure Time", detail: "20-30 minutes" },
      { metric: "Downtime", detail: "Minimal" },
      { metric: "Results Last For", detail: "6-12 months" },
      { metric: "Results Visible In", detail: "Immediate" },
      { metric: "Anaesthetic", detail: "Local anesthetic" },
    ],
    beforeAfterTitle: "salmon dna results",
  },

  "prp-malta": {
    slug: "prp-malta",
    category: "Face",
    hero: {
      title: "prp malta platelet rich plasma",
      subtitle: "Looking for a natural way to rejuvenate your skin and promote healing?",
      body: "Discover the power of Platelet-Rich Plasma (PRP) treatments in Malta! Our skilled team uses your own blood's healing properties to stimulate collagen production and rejuvenate your skin. Experience a more youthful and radiant complexion with our safe and effective PRP treatments.",
      prices: [
        { label: "PRP for hair loss", price: "from €149" },
        { label: "PRP regular facial", price: "from €175" },
        { label: "PRP vampire facial", price: "from €199" },
      ],
      cta: "BOOK YOUR PRP MALTA PRP SESSION NOW",
    },
    info: [
      { metric: "Procedure time", detail: "35-45 minutes" },
      { metric: "Downtime", detail: "None to couple of days" },
      { metric: "Results last for", detail: "6-12 months" },
      { metric: "Results visible in", detail: "1-4 weeks" },
      { metric: "Anaesthetic", detail: "Anesthetic cream" },
    ],
    beforeAfterTitle: "PRP Results",
    precision: {
      title: "precision areas of refinement",
      intro: "Your body's own growth factors are concentrated and applied where renewal is needed most. Below are the primary treatment zones.",
      areas: [
        { name: "Facial Rejuvenation", desc: "Stimulates collagen and tissue repair across the face for a naturally refreshed, radiant complexion." },
        { name: "Under-Eye Renewal", desc: "Targets dark circles, fine lines, and thin skin beneath the eyes with concentrated growth factors." },
        { name: "Hair Restoration", desc: "Delivers growth factors directly to thinning areas of the scalp to reactivate dormant follicles." },
        { name: "Vampire Facial", desc: "Combines PRP with microneedling for enhanced penetration and accelerated skin renewal." },
      ],
      additional: "Neck, decolletage, hands, acne scars, stretch marks, surgical scars",
    },
    suitability: {
      title: "is this suitable for you?",
      intro: "This treatment uses your own blood to stimulate natural rejuvenation and collagen renewal. Because it works with your biology, there is no risk of allergic reaction. Results are gradual and best achieved through a course of three sessions.",
      suitableFor: [
        "You prefer a natural approach using your body's own growth factors",
        "You want to improve skin quality, texture, or early-stage hair thinning",
        "You are comfortable with a blood draw as part of the treatment process",
        "You are committed to a three-session course for optimal results",
        "You appreciate a treatment with no risk of allergic reaction",
      ],
      notIdeal: [
        "You are looking for instant, same-day results",
        "You have a blood disorder, platelet dysfunction, or are on anticoagulant therapy",
        "You are pregnant, breastfeeding, or have an active infection in the area",
        "You are experiencing advanced hair loss with no remaining active follicles",
        "You are looking for volume or structural changes to your face",
      ],
    },
    experience: {
      title: "your treatment experience",
      steps: [
        { title: "personalised consultation", desc: "We assess your skin or scalp condition, medical history, and PRP treatment goals with one of our doctors." },
        { title: "Structured Plan", desc: "Your doctor designs a personalised treatment protocol tailored to your specific concerns whether facial rejuvenation, hair restoration, or a vampire facial." },
        { title: "Targeted Treatments", desc: "Your doctor draws a blood sample, processes it in a centrifuge, and delivers the concentrated PRP via precise injection: comfortable and approximately 35-45 minutes." },
        { title: "Ongoing Review & Adjustment", desc: "Your doctor monitors your skin or hair response and adjusts the treatment protocol to maximise results across your course of sessions." },
      ],
    },
  },

  "pico-laser-tattoo-removal": {
    slug: "pico-laser-tattoo-removal",
    category: "Body",
    hero: {
      title: "pico laser tattoo removal",
      subtitle: "Do you have a tattoo you no longer want to carry?",
      body: "With our advanced Pico Laser Tattoo Removal treatment, ultra-short laser pulses target unwanted tattoo pigment beneath the skin, helping break the ink into tiny particles so your body can naturally clear them over time. Every tattoo is different. Your treatment plan is personalised based on your tattoo size, colour, depth, age, skin type, and removal goals to support safer fading and better-looking results. Your skin has a new story to tell. Let's help you begin it with confidence.",
      prices: [
        { label: "Total Value", price: "€335" },
        { label: "Today", price: "€99 Only" },
      ],
      cta: "Book Now & Save 50%",
    },
    precision: {
      title: "PRECISE INK TARGETING",
      intro: "Pico pulses target tattoo pigment with focused precision.",
      areas: [
        { name: "GENTLER FADING", desc: "Designed to break ink particles without relying on intense heat." },
        { name: "CUSTOM REMOVAL PLAN", desc: "Tailored to your tattoo, skin type, ink depth, and fading goals." },
        { name: "SAFE & MEDICAL-GRADE CARE", desc: "" },
        { name: "EXPERT AFTERCARE", desc: "Professional guidance before and after treatment for safer results." },
      ],
    },
  },

  "medical-weight-loss": {
    slug: "medical-weight-loss",
    category: "Body",
    hero: {
      title: "doctor-led ozempic & mounjaro in malta",
      subtitle: "Considering Ozempic or Mounjaro for weight loss?",
      body: "At Carisma Aesthetics, GLP-1 medications are never prescribed in isolation. Our doctor-led programme combines a full medical assessment, structured prescription support, nutrition guidance, and weekly monitoring to help you lose weight safely and sustain your results.",
      cta: "book your medical consultation",
    },
    suitability: {
      title: "Ozempic & Mounjaro eligibility criteria",
      intro: "Ozempic and Mounjaro can be powerful, but only when prescribed as part of a structured, doctor-supervised programme. Eligibility is determined through a proper medical assessment, including blood tests, food intolerance screening, safety checks, and clear protocols so your plan is appropriate, monitored, and adjusted responsibly.",
      suitableFor: ["BMI ≥27", "Insulin resistance", "Emotional eating or Long dieting history", "Menopause-related weight gain"],
      notIdeal: ["Eating disorders", "Very lean patients", "Those unwilling to attend check-ins", "Currently pregnant or trying to conceive"],
    },
    experience: {
      title: "how it works",
      steps: [
        { title: "Your Ozempic & Mounjaro consultation", desc: "Every programme starts with a full in-clinic consultation. This is where we determine if Ozempic or Mounjaro is clinically appropriate for you. Because we stand behind your results, we are selective about who we prescribe to." },
      ],
    },
  },

  "muscle-stimulation-1": {
    slug: "muscle-stimulation-1",
    category: "Body",
    hero: {
      title: "EMSculpt NEO MALTA",
      subtitle: "3-in-1 body sculpt protocol",
      body: "Our 3-1 course with EMSculpt NEO with HIFEM + RF gives you the effect of 20,000 sit ups per session, burns local fat and tightens the skin resulting in 30% Fat reduction, 25% Muscle growth & 29% Muscle strength",
      prices: [
        { label: "4x Muscle Stimulation sessions with EMSculpt NEO", price: "€400" },
        { label: "4x access to spa & fitness facilities", price: "€140" },
        { label: "Tanita Body Composition Analysis", price: "€60" },
        { label: "Carisma Aesthetics credit", price: "€25" },
        { label: "TOTAL VALUE: €625 — TODAY", price: "€199 for 4 sessions" },
      ],
      cta: "Claim your spot now",
    },
    precision: {
      title: "TARGETED BODY SCULPTING",
      intro: "Focus on the areas that matter most tummy, hips, bum or thighs using targeted EMSculpt Neo technology to improve muscle definition and firmness where exercise often falls short.",
      areas: [
        { name: "ABDOMEN / CORE", desc: "" },
        { name: "GLUTES / BUTTOCKS", desc: "" },
        { name: "THIGHS (FRONT AND BACK)", desc: "" },
        { name: "CALVES", desc: "" },
        { name: "UPPER ARMS (BICEPS AND TRICEPS)", desc: "" },
      ],
    },
    experience: {
      title: "the carisma difference",
      steps: [
        { title: "Doctor led", desc: "full medical check and body scan" },
        { title: "One integrated program", desc: "medical, diet, movement and treatments together" },
        { title: "Real gym included", desc: "Technogym facility, semi-private classes and PT" },
        { title: "High touch support", desc: "weekly check ins, progress reports and WhatsApp follow up" },
        { title: "Evidence based devices", desc: "Emsculpt NEO, coolsculpting and RF skin tightening" },
        { title: "Selective entry and measurable weight loss results guaranteed", desc: "" },
      ],
    },
  },

  "skin-tightening-1": {
    slug: "skin-tightening-1",
    category: "Body",
    hero: {
      title: "VELASHAPE III IN MALTA",
      subtitle: "4 in 1 skin tightening protocol",
      body: "Our 4 in 1 course with the VelaShape III uses radiofrequency, infrared heat, vacuum and mechanical massage together to stimulate collagen to tighten and smoothen your skin.",
      prices: [
        { label: "4x Skin tightening sessions with the VelaShape", price: "€400" },
        { label: "4x access to spa & fitness facilities", price: "€140" },
        { label: "Tanita Body Composition Analysis", price: "€60" },
        { label: "€25 Carisma Aesthetics credit", price: "€25" },
      ],
      cta: "claim your spot now",
    },
    precision: {
      title: "Treat visible fat bulges in 7 areas of the body",
      areas: [
        { name: "TUMMY / ABDOMEN", desc: "" },
        { name: "NECK", desc: "" },
        { name: "ARMS", desc: "" },
        { name: "BUTTOCKS AND UNDER-BUTT CREASE", desc: "" },
        { name: "THIGHS (FRONT, BACK, INNER AND OUTER)", desc: "" },
      ],
    },
    experience: {
      title: "malta's most effective 4-in-1 skin tightening starter protocol",
      steps: [
        { title: "Targeted SKIN TIGHTENING", desc: "Four focused VelaShape III sessions designed to treat one or more priority areas such as the tummy, hips, thighs or bum." },
        { title: "Visible, NOTICEABLE IMPROVEMENT", desc: "Skin feels firmer and smoother over the course of treatments, with improvements you can see in clothes and feel to the touch." },
        { title: "COLLAGEN-STIMULATING TECHNOLOGY", desc: "Radiofrequency and infrared energy work together with vacuum and mechanical massage to support collagen production." },
      ],
    },
  },

  "anti-cellulite": {
    slug: "anti-cellulite",
    category: "Body",
    hero: {
      title: "ADVANCED CELLULITE SMOOTHING",
      subtitle: "cellulift & contour protocol",
      body: "Our cellulite protocol combines three VelaShape vacuum roller sessions with one lymphatic drainage massage to elminate cellulite, uneven texture, and boost circulation:",
      prices: [
        { label: "4x Anti Cellulite sessions with the VelaShape", price: "€400" },
        { label: "4x access to spa & fitness facilities", price: "€140" },
        { label: "Tanita Body Composition Analysis", price: "€60" },
        { label: "€25 Carisma Aesthetics credit", price: "€25" },
        { label: "TOTAL VALUE: €625 — TODAY: €199 ONLY", price: "€199" },
      ],
      cta: "claim your spot now",
    },
    precision: {
      title: "Treat visible fat bulges in 3 areas of the body",
      areas: [
        { name: "arms", desc: "" },
        { name: "BUTTOCKS AND UNDER-BUTT CREASE", desc: "" },
        { name: "THIGHS (FRONT, BACK, INNER AND OUTER)", desc: "" },
      ],
    },
    experience: {
      title: "VELASHAPE III (CELLULIFT PROTOCOL)",
      steps: [
        { title: "Clinically proven approach", desc: "VelaShape technology has been shown in studies to improve the appearance of cellulite and uneven skin texture." },
        { title: "Visible smoothing", desc: "Vacuum and mechanical massage encourage blood flow and lymphatic drainage for a lighter, smoother feel." },
        { title: "Circulation support", desc: "Results typically start to show from 4–12 weeks after the final session as muscle adapts and fat reduces." },
        { title: "Non invasive", desc: "No needles, no surgery and no downtime for most people." },
        { title: "Comfortable sessions", desc: "Feels like a warm, deep mechanical massage, with each treatment lasting around 30 minutes." },
      ],
    },
  },

  "lympathic-drainage": {
    slug: "lympathic-drainage",
    category: "Body",
    hero: {
      title: "lymphatic drainage therapy",
      subtitle: "Expert LED BODY DETOX & CIRCULATION SUPPORT",
      body: "Our Lymphatic Drainage Therapy is a gentle, expert-guided treatment designed to stimulate your lymphatic system, helping your body eliminate toxins, reduce fluid retention, and restore natural balance.",
      prices: [
        { label: "4x Lymphatic drainage massage", price: "€440" },
        { label: "4x access to spa & fitness facilities", price: "€140" },
        { label: "Tanita Body Composition Analysis", price: "€60" },
        { label: "€25 Carisma Aesthetics credit", price: "€25" },
        { label: "TOTAL VALUE: €665 — TODAY", price: "€299 ONLY" },
      ],
      cta: "Claim Your Spot Now",
    },
    experience: {
      title: "lymphatic drainage therapy",
      steps: [
        { title: "", desc: "You begin with a professional consultation to assess your health history, symptoms, and suitability for treatment." },
        { title: "", desc: "Your practitioner explains how lymphatic drainage works, what results to expect, and how often sessions may be recommended." },
        { title: "", desc: "Treatment is delivered using controlled, medically guided techniques — never aggressively or without assessment." },
        { title: "", desc: "We monitor your response and adjust frequency or approach as needed, ensuring comfort, safety, and effectiveness." },
      ],
    },
  },

  "snatch-your-jawline": {
    slug: "snatch-your-jawline",
    category: "Package",
    hero: {
      title: "snatch your jawline",
      subtitle: "For those in Malta ready to snatch their jawline — this non-surgical, low-downtime treatment melts chin fat, reverses sagging, and restores lasting definition at every age.",
      body: "Do you ever catch your reflection and wish your jawline looked sharper again? You look in the mirror and notice a softer chin line, a little sagging, or stubborn fat that wasn't there before. With our Snatch Your Jawline treatment, you can bring back that definition and confidence — no surgery, no downtime. After just one session, you'll see the difference… and even better, you'll feel it. Because a sculpted, defined jawline doesn't just change your profile — it changes how you carry yourself every day. Your face is your first impression. Let's make it unforgettable.",
      prices: [{ label: "Snatch Your Jawline", price: "from €149" }],
      cta: "CLAIM MY SPOT NOW",
    },
    info: [
      { metric: "Procedure Time", detail: "20-30 minutes" },
      { metric: "Downtime", detail: "7-14 days of swelling" },
      { metric: "Results last for", detail: "Permanent" },
      { metric: "Results visible in", detail: "2 weeks or more" },
      { metric: "Anaesthetic", detail: "None" },
    ],
    beforeAfterTitle: "YOUR JAWLINE — REDEFINED.",
    suitability: {
      title: "Who is a suitable candidate for Fat Dissolving treatment?",
      intro: "Fat dissolving is ideal for individuals with minimal to moderate localizes fat who want to improve the appearance without surgery. It is not suitable for those with severe localized fat or individuals with loose, sagging skin in the treatment area. A thorough consultation with a qualified practitioner is necessary to determine if it's the right treatment for you.",
      suitableFor: ["Fat dissolving is ideal for individuals with minimal to moderate localizes fat who want to improve the appearance without surgery."],
      notIdeal: ["It is not suitable for those with severe localized fat or individuals with loose, sagging skin in the treatment area."],
    },
    experience: {
      title: "what to expect during your Fat dissolving treatment?",
      steps: [
        { title: "before", desc: "Share your concerns and objectives with our expert practitioners and answer any questions. Discuss any medical conditions, allergies, and medications with your provider. Avoid alcohol, blood thinners, and aspirin for 24 hours prior to the procedure." },
        { title: "at session", desc: "Our expert practitioner will mark the injection areas and use a fine needle to inject the solution into the targeted areas. Communicate any discomfort or concerns to the practitioner during the procedure. Relax and remain still during the procedure to ensure accuracy and safety." },
        { title: "after", desc: "Avoid rubbing or massaging the injection areas for at least 24 hours. Refrain from exercise, alcohol, and saunas for at least 24 hours. Results may take 2-4 weeks to appear" },
      ],
    },
  },

  "4-in-1-hydrafacial-glow": {
    slug: "4-in-1-hydrafacial-glow",
    category: "Package",
    hero: {
      title: "4-in-1 hydrafacial glow",
      subtitle: "Clogged pores, dull skin, and products that just don't work? If your glow's gone quiet, you're not alone. This is for Maltese skin that's ready for real results.",
      body: "With our 4-in-1 Hydrafacial Glow treatment, your skin gets exactly what it needs: deep cleansing, gentle resurfacing, and lasting hydration — all designed for Maltese skin and real-world results. After just one session, you'll see (and feel) the difference: smoother texture, balanced tone, and that luminous glow you thought you'd lost. No filters, no downtime — just confidence that shines through.",
      prices: [
        { label: "Medical-Grade Hydrafacial", price: "€100" },
        { label: "LED Light Therapy", price: "€50" },
        { label: "Dermaplaining", price: "€50" },
        { label: "Carisma Spa Day", price: "€50" },
        { label: "In-Person Consultation", price: "€60" },
        { label: "€25 Aesthetics Credit", price: "€25" },
        { label: "Total Value: €335 – Today", price: "€99 Only" },
      ],
      cta: "CLAIM MY SPOT NOW",
    },
    beforeAfterTitle: "THE SECRET TO VISIBLY MORE BEAUTIFUL SKIN – OUR CUSTOMERS SHOW YOU HOW.",
    precision: {
      title: "SO YOUR SKIN GLOWS AGAIN — EFFORTLESSLY.",
      intro: "Do you ever look in the mirror and wonder where your glow went? Your skin feels dull, your pores seem clogged, and every product you try promises more than it delivers. You're not alone — healthy, radiant skin shouldn't feel out of reach.",
    },
    suitability: {
      title: "CREATED FOR WOMEN WHO WANT THEIR SKIN TO GLOW — NATURALLY AND CONFIDENTLY.",
      suitableFor: [
        "Because you want skin that looks luminous, smooth, and deeply refreshed — even without makeup.",
        "Because you deserve a medical-grade facial that delivers visible results, not just promises.",
        "Because you prefer gentle, non-invasive treatments that respect your skin's balance and beauty.",
        "Because you value self-care and know that radiant skin reflects radiant confidence.",
        "Because you choose results backed by science — and trusted by Malta's leading aesthetics clinic.",
      ],
    },
    experience: {
      title: "what to expect during your hydrafacial treatment?",
      steps: [
        { title: "BEFORE", desc: "Before your treatment, prepare your skin by avoiding any harsh exfoliants or treatments for a few days. Drink plenty of water leading up to your treatment for optimal skin hydration. Use a mild cleanser to remove makeup and impurities before your facial." },
        { title: "AT SESSION", desc: "The med-aesthetician will start with a gentle yet thorough cleansing to remove impurities and prepare your skin for hydration. Experience a personalized blend of hydrating serums and masks, expertly applied to infuse moisture deep into your skin's layers. Indulge in a soothing facial massage that enhances circulation and maximizes product absorption, leaving you feeling pampered and rejuvenated." },
        { title: "AFTER", desc: "Refrain from using harsh skincare products immediately after your facial to allow your skin to continue benefiting from the treatment. Apply sunscreen daily to protect your newly rejuvenated skin and preserve its health and radiance. Keep your skin hydrated by drinking water regularly to prolong the effects of your treatment." },
      ],
    },
  },

  "exosome-glowlift": {
    slug: "exosome-glowlift",
    category: "Package",
    hero: {
      title: "EXOSOME GLOW LIFT",
      body: "When facials stop working and your glow fades, Exosomes offer the next step — real regeneration for smoother, firmer, brighter skin.",
      prices: [{ label: "Total Value: €365 – Today", price: "€175 Only" }],
      cta: "CLAIM MY SPOT NOW",
    },
    beforeAfterTitle: "what our clients have to say about their results",
    experience: {
      title: "what to expect during your treatment?",
      steps: [
        { title: "BEFORE", desc: "Avoid using any topical skin products containing retinol, aha or any other acid at least 24 hours prior to the procedure. Discuss any medical conditions, allergies, and medications with your provider. Share your concerns and objectives with our expert practitioners and answer any questions." },
        { title: "AT SESSION", desc: "Our expert practitioner will use a handheld device with tiny needles, microneedling the skin. This stimulates the body's natural healing process and promotes collagen production. Communicate any discomfort or concerns to the practitioner during the procedure." },
        { title: "AFTER", desc: "Avoid using any topical skin products containing retinol, aha or any other acid at least 24 hours after the procedure. Refrain from exercise, alcohol, and saunas for at least 24 hours. Results are gradual and may require several sessions for optimal results." },
      ],
    },
  },

  "ultimate-facelift": {
    slug: "ultimate-facelift",
    category: "Package",
    hero: {
      title: "ultimate facelift",
      subtitle: "Reverse visible aging — no knife, no downtime.",
      body: "If your skin's lost its lift, your cheeks feel flatter than before, or your jawline's lost its shape, this is your sign to rewind time — naturally. Our Ultimate Facelift Package is designed to lift, tighten, and sculpt — without surgery, fillers, or long recovery days.",
      prices: [
        { label: "Total Value", price: "€430" },
        { label: "Today", price: "€239 Only" },
      ],
      cta: "CLAIM MY SPOT NOW",
    },
    info: [
      { metric: "Treatment Duration", detail: "60-Minute Treatment" },
      { metric: "Results", detail: "Results are immediate and can last up to 3-5 years" },
      { metric: "Recovery", detail: "Avoid rubbing or massaging the injection areas for at least 24 hours" },
    ],
    beforeAfterTitle: "what our clients have to say about their results",
    precision: {
      title: "YOUR FACELIFT — REDEFINED.",
      intro: "See how our Ultimate Facelift Package gently lifts, tightens, and sculpts for visibly younger, naturally radiant skin.",
      areas: [
        { name: "Visible Lift & Contour", desc: "Enjoy a firmer, more lifted appearance after your first session." },
        { name: "Refreshed, Smooth Skin", desc: "Restores elasticity and reduces fine lines for a youthful glow." },
        { name: "No Surgery, No Downtime", desc: "A gentle, effective treatment performed with precision care." },
        { name: "Luxury Meets Science", desc: "Advanced thread technology delivered by certified aesthetic specialists." },
      ],
    },
    suitability: {
      title: "Who is a suitable candidate for thread lifting?",
      intro: "Thread lifting is generally suitable for individuals with mild to moderate skin sagging who want a more lifted and youthful appearance without undergoing surgery. It's important to have realistic expectations and be in generally good health. A consultation with a medical practitioner can determine if you're a suitable candidate based on your skin condition and desired outcomes.",
    },
    experience: {
      title: "what to expect during your thread lift treatment?",
      steps: [
        { title: "BEFORE", desc: "Share your concerns and objectives with our expert practitioners and answer any questions. Discuss any medical conditions, allergies, and medications with your provider. Avoid alcohol, blood thinners, and aspirin for 24 hours prior to the procedure." },
        { title: "AT SESSION", desc: "Our expert practitioner will insert thin threads into the targeted areas using a fine needle. Follow the practitioner's instructions for facial expressions and movements during the procedure. Communicate any discomfort or concerns to the practitioner during the procedure." },
        { title: "AFTER", desc: "Avoid rubbing or massaging the injection areas for at least 24 hours. Refrain from exercise, alcohol, and saunas for at least 24 hours. Results are immediate and can last up to 3-5 years." },
      ],
    },
  },
};

// Map every nav slug to a Treatment, falling back to a clean hero-only page
// (clearly flagged as pending) so navigation never 404s and layout stays consistent.
function categoryOf(href: string): Treatment["category"] {
  if (FACE_LINKS.some((l) => l.href === href)) return "Face";
  if (BODY_LINKS.some((l) => l.href === href)) return "Body";
  return "Package";
}

export function getTreatment(slug: string): Treatment | null {
  const key = `/${slug}`;
  const all: NavLink[] = [...FACE_LINKS, ...BODY_LINKS, ...PACKAGE_LINKS];
  const nav = all.find((l) => l.href === key);
  if (TREATMENTS[slug]) return TREATMENTS[slug];
  if (!nav) return null;
  return {
    slug,
    category: categoryOf(key),
    hero: {
      title: nav.label,
      subtitle: "Performed by medically qualified doctors at Carisma Aesthetics, Malta.",
      cta: "BOOK YOUR CONSULTATION",
    },
    pending: true,
  };
}

export const ALL_TREATMENT_SLUGS = [
  ...FACE_LINKS,
  ...BODY_LINKS,
  ...PACKAGE_LINKS,
].map((l) => l.href.replace(/^\//, ""));
