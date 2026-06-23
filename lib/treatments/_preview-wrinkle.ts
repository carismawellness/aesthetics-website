// PREVIEW data for the world-class treatment template — Botox / wrinkle-relaxing.
// Spreads the live wrinkle-relaxing content and adds the new section fields so we
// can approve/perfect the template on /preview/wrinkle-relaxing before rolling out.
// NOTE: `reviews` here are representative placeholders — swap for real verified
// Google reviews before this ships to any live page.
import type { Treatment } from "../treatment-types";
import base from "./wrinkle-relaxing-malta";

const preview: Treatment = {
  ...base,

  stats: [
    { value: "10,000+", label: "Treatments performed" },
    { value: "4.9★", label: "Google rating" },
    { value: "30+", label: "Years in wellness" },
    { value: "Doctor-led", label: "Medically qualified" },
    { value: "CE-marked", label: "Toxins only" },
  ],

  clarity: {
    kicker: "Honest expectations",
    title: "What Botox does — and what it won't",
    sub: "Wrinkle-relaxing is precise, not dramatic. Here's the honest picture before you book.",
    does: [
      "Softens dynamic lines from movement — forehead, frown lines (the 11s), crow's feet",
      "Prevents expression lines from deepening over time",
      "Subtly lifts and opens the eye area (brow / Nefertiti neck lift)",
      "Reduces excessive underarm sweating for up to 6 months",
      "Gives a refreshed, well-rested look — never a 'done' one",
    ],
    doesnt: [
      "Won't freeze your face or erase your expressions",
      "Won't add volume or fill static, at-rest lines — that's dermal fillers",
      "Won't change your features or make you look unnatural",
      "Won't work instantly — results settle over 3–14 days",
      "Won't last forever — a light top-up every 3–4 months maintains results",
    ],
  },

  reviews: {
    kicker: "Real patients, real results",
    title: "What our patients say",
    sub: "A few of the women who trust Carisma with their face.",
    items: [
      { name: "Maria C.", location: "Sliema", rating: 5, quote: "I was terrified of looking frozen — instead I just look like a less tired version of me. The doctor took time to explain everything and the result is so natural my friends just think I'm finally sleeping well." },
      { name: "Elena P.", location: "St Julian's", rating: 5, quote: "Booked for the frown lines that made me look permanently angry. Two weeks later they'd softened beautifully and I still have all my expressions. Painless and professional from start to finish." },
      { name: "Sarah M.", location: "Mosta", rating: 5, quote: "Medically qualified doctors, spotless clinic, zero upselling. They told me honestly what Botox could and couldn't do for me — that honesty is exactly why I keep coming back." },
      { name: "Rachel B.", location: "Birkirkara", rating: 5, quote: "The underarm treatment genuinely changed my summers — no more sweat patches before a meeting. I only wish I'd done it years ago." },
      { name: "Nadia F.", location: "Attard", rating: 5, quote: "Subtle, expert and reassuring. You can tell it's doctor-led the moment you walk in. My crow's feet are softer and nobody can tell I've had anything done." },
    ],
  },

  doctor: {
    kicker: "Doctor-led, never a salon",
    heading: "Meet your doctor",
    name: "Dr. Giovanni Scornavacca",
    title: "Aesthetic Doctor · Carisma Aesthetics",
    credentials: [
      "Medically qualified aesthetic doctor",
      "Restoration-first philosophy — subtle, never overdone",
      "Thousands of wrinkle-relaxing treatments performed",
    ],
    image: "/assets/doctor-giovanni.png",
    quote: "Botox done well should be invisible. My job is to soften what bothers you while keeping everything that makes you, you.",
    bio: [
      "Every plan begins with listening — to your concerns and to how you want to feel in your skin — then shaping a conservative, precisely paced approach that prioritises safety, clarity and natural balance.",
      "From softening expression lines to refining contour and reducing sweating, results are subtle and harmonious: refreshed, never frozen.",
    ],
  },

  guarantee: {
    kicker: "Our promise",
    title: "Natural results, reviewed & refined",
    paragraphs: [
      "We'd rather under-treat and refine than overdo it. Every wrinkle-relaxing treatment includes a complimentary review at two weeks — if a touch-up is needed to perfect your result, it's on us.",
      "Doctor-led, medically qualified, CE-marked toxins only. No pressure and no upselling — just an honest plan and a result you'll genuinely love.",
    ],
    cta: "Book Your Free Consultation",
    points: [
      { value: "2-week", label: "Complimentary review", sub: "We perfect your result, free" },
      { value: "Doctor-led", label: "Medically qualified", sub: "Never salon, never nurse-only" },
      { value: "CE-marked", label: "Toxins only", sub: "Regulated, traceable, safe" },
    ],
  },

  pricingGrid: {
    title: "Botox pricing in Malta",
    intro: "Transparent, per-area pricing. Your exact plan is confirmed at your free consultation.",
    items: [
      { name: "Lip flip / gummy smile / chin", price: "from €59", desc: "Targeted single-point softening." },
      { name: "One area", price: "from €139", desc: "Forehead, frown lines (11s) or crow's feet." },
      { name: "Full upper face / Nefertiti neck lift", price: "from €249", desc: "Comprehensive upper-face or neck & jaw lift." },
      { name: "Underarm sweating (hyperhidrosis)", price: "from €399", desc: "Lasts up to 6 months — goodbye sweat patches." },
    ],
  },

  evidence: {
    kicker: "Backed by science",
    title: "The evidence behind Botox",
    sub: "Botulinum toxin type A is among the most studied aesthetic treatments in the world.",
    items: [
      { tag: "Efficacy", title: "Proven for frown lines", whatItDoes: "Relaxes the muscles that create the frown lines between the brows.", keyResults: "In randomised controlled trials, the majority of patients showed a significant improvement in moderate-to-severe glabellar lines at day 30, with effects commonly lasting up to ~4 months.", source: "Peer-reviewed RCTs (glabellar lines)" },
      { tag: "Safety", title: "A well-characterised safety profile", whatItDoes: "Decades of clinical use across millions of treatments worldwide.", keyResults: "When administered by a qualified medical professional at appropriate doses, botulinum toxin type A has a well-established safety record; side effects are typically mild and temporary (e.g. minor bruising at the injection site).", source: "Long-term post-marketing surveillance" },
      { tag: "Hyperhidrosis", title: "Effective for excessive sweating", whatItDoes: "Blocks the nerve signals that activate the sweat glands.", keyResults: "Studies report marked reductions in underarm sweating, with results commonly lasting 4–6 months per treatment.", source: "Peer-reviewed hyperhidrosis trials" },
    ],
  },
};

export default preview;
