import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "laser-hair-removal-malta",
  category: "Body",
  hero: {
    title: "laser hair removal",
    benefits: [
      "Painless sessions with patented ICE Plus™ Cooling",
      "Permanently reduce 10-15% of hair per treatment",
      "No more waxing, shaving, or ingrowns",
      "Safe for all skin types - even tanned",
    ],
    subtitle: "Permanently Smooth, Hair-Free Skin with our Virtually Painfree SHR® guarantee:",
    body: "World-renowned Alma Soprano for the first time in Malta. Experience the triple wavelength laser hair removal difference.",
    location: "intercontinental hotel | st. julian's",
    note: "Minors may undergo this procedure only with the presence of a parent or legal guardian during the session.",
    cta: "book your session",
    image: "/assets/treatments/laser-hero.png",
    imageRatio: "1812 / 2398",
  },
  info: [
    { metric: "Procedure Time", detail: "15-30 Minutes" },
    { metric: "Downtime", detail: "None" },
    { metric: "Treatment Course", detail: "6-8 Sessions" },
    { metric: "Results Visible In", detail: "2-3 Sessions" },
    { metric: "Technology", detail: "Triple-Wavelength SHR®" },
  ],
  education: {
    title: "laser hair removal In Malta",
    subtitle: "what is all the hype?",
    paragraphs: [
      "Laser hair removal is a popular alternative to waxing and shaving. This is largely due to the fact that laser hair removal provides permanent results and is less expensive than maintaining a waxing and shaving routine for a lifetime.",
      "Additionally, there's no recovery time needed after a treatment—so no more doing the waxing-waddle or battling razor burn.",
      "Our treatments are safe, and all of our procedures are performed by Authorized Alma Practitioners. We use CE & FDA-cleared lasers that are tailored to your specific skin type & hair color.",
    ],
    image: "/assets/treatments/laser-comparison.png",
    imageCaption: "Alma Soprano's triple-wavelength technology targets every depth of follicle — for the first time in Malta.",
    chart: "/assets/treatments/laser-suitability-chart.png",
    chartCaption: "Safe and effective across all skin tones and hair colours.",
  },
  guarantee: {
    title: "never shave again. guaranteed.",
    paragraphs: [
      "We're so confident in our technology that we guarantee visible hair reduction after just 3 sessions — or your next one is free.",
      "And when we say it's virtually painless, we mean it. Our patented SHR® and ICE Plus™ technology make this one of the most comfortable laser experiences available today.",
      "Book your free consultation today and feel the difference for yourself.",
    ],
    cta: "book your session",
    beforeAfterTitle: "Real results, real skin",
    beforeAfter: ["/assets/treatments/laser-before-after.png"],
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
  pricingGrid: {
    title: "Laser Hair Removal pricing",
    items: [
      { name: "arms", price: "from 35 EUR", desc: "Say goodbye to daily shaving and irritation. Our laser hair removal solutions ensure smooth skin from shoulder to fingertip, helping you maintain a well-groomed appearance with minimal effort." },
      { name: "bikini", price: "from 39 EUR", desc: "Prepare for beach season all year round with our expert bikini laser treatments. We offer a variety of options, from a standard bikini line to a full Brazilian, ensuring optimal comfort and confidence." },
      { name: "legs", price: "from 109 EUR", desc: "Enjoy effortlessly smooth legs with our professional laser hair removal services. Whether you prefer full or half-leg treatments, we provide long-lasting results, eliminating the need for frequent shaving." },
      { name: "face", price: "from 25 EUR", desc: "Achieve a flawless, hair-free complexion with our professional laser hair removal services. We target unwanted facial hair, from eyebrows to the chin, ensuring smooth and long-lasting results." },
      { name: "body", price: "FROM 49 EUR", desc: "Experience the confidence of a smooth, hair-free torso. Our advanced laser treatments effectively remove unwanted hair from various areas of the body, providing a sleek and polished look." },
      { name: "men's", price: "from 25 EUR", desc: "Enhance your grooming routine with our customized laser hair removal solutions for men. We target common areas such as the back, shoulders, chest, and abs, ensuring a refined and polished appearance." },
    ],
  },
  membership: {
    title: "Laser Hair Removal Memberships",
    intro: "Choose from three tailored membership tiers — Bronze, Silver, or Gold — based on your treatment duration and coverage needs. Each option offers six sessions at exclusive pricing, making it easier than ever to commit to smooth, hair-free skin on your terms.",
    tiers: [
      { image: "/assets/treatments/laser-member-bronze.png", name: "bronze membership", sessions: "6 Sessions | 15 min each", price: "139 EUR" },
      { image: "/assets/treatments/laser-member-silver.png", name: "silver membership", sessions: "6 Sessions | 30 min each", price: "245 EUR" },
      { image: "/assets/treatments/laser-member-gold.png", name: "gold membership", sessions: "6 Sessions | 60 min each", price: "399 EUR" },
    ],
  },
};

export default t;
