import type { Treatment } from "../treatment-types";

const t: Treatment = {
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
};

export default t;
