import type { Treatment } from "../treatment-types";

const t: Treatment = {
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
};

export default t;
