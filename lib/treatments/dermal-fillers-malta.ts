import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "dermal-fillers-malta",
  category: "Face",
  hero: {
    title: "Dermal fillers Malta",
    subtitle: "Enhancing Facial Features with Hyaluronic Acid",
    body: "Looking to reduce facial lines and restore a more youthful appearance? Consider the benefits of injectable dermal fillers in Malta. These cosmetic procedures utilize hyaluronic acid, a gel-like substance found naturally in the body, to treat facial wrinkles, smile lines, and facial creases.",
    prices: [
      { label: "1ml", price: "from €269/ml" },
      { label: "2ml", price: "from €399 (€175/ml)" },
    ],
    cta: "BOOK YOUR DERMAL FILLER SESSION NOW",
    image: "/assets/treatments/dermal-fillers-malta-hero.png",
    imageRatio: "5 / 4",
    productTabs: ["/assets/treatments/dermal-fillers-malta-logo-juvederm.png", "/assets/treatments/dermal-fillers-malta-logo-croma.png", "/assets/treatments/dermal-fillers-malta-logo-teoxane.png"],
    heroForm: true,
  },
  info: [
    { metric: "Procedure time", detail: "20-45 minutes" },
    { metric: "Downtime", detail: "Minimal" },
    { metric: "Results last for", detail: "6-12 months" },
    { metric: "Results visible in", detail: "Immediate" },
    { metric: "Anaesthetic", detail: "Local anesthetic" },
  ],
  beforeAfterTitle: "dermal fillers results",
  beforeAfter: [
    {
      before: "/assets/treatments/dermal-fillers-malta-ba1-before.jpg",
      after: "/assets/treatments/dermal-fillers-malta-ba1-after.jpg",
      label: "Jaw & Cheek Contouring",
    },
    {
      before: "/assets/treatments/dermal-fillers-malta-ba2-before.jpg",
      after: "/assets/treatments/dermal-fillers-malta-ba2-after.jpg",
      label: "Cheek Volume Restoration",
    },
    {
      before: "/assets/treatments/dermal-fillers-malta-ba3-before.jpg",
      after: "/assets/treatments/dermal-fillers-malta-ba3-after.jpg",
      label: "Mid-Face Rejuvenation",
    },
    {
      before: "/assets/treatments/dermal-fillers-malta-ba4-before.jpg",
      after: "/assets/treatments/dermal-fillers-malta-ba4-after.jpg",
      label: "Profile Enhancement",
    },
  ],
  precision: {
    title: "precision areas of refinement",
    intro: "Filler placement is guided by your facial anatomy and individual goals. Below are the four most commonly enhanced zones.",
    areas: [
      { zone: "Cheeks", icon: "/assets/treatments/dermal-fillers-malta-icon-cheeks.png", name: "Cheek Contour", desc: "Restores volume and defines the midface for a naturally lifted, sculpted appearance." },
      { zone: "Jawline", icon: "/assets/treatments/dermal-fillers-malta-icon-jawline.png", name: "Jaw Definition", desc: "Sharpens the jawline contour and strengthens the lower face profile with precise placement." },
      { zone: "Folds", icon: "/assets/treatments/dermal-fillers-malta-icon-folds.png", name: "Nasolabial Folds", desc: "Softens the lines from nose to mouth that deepen with age, restoring a smoother transition." },
      { zone: "Chin", icon: "/assets/treatments/dermal-fillers-malta-icon-chin.png", name: "Chin Projection", desc: "Improves chin shape and projection to bring balance and proportion to the facial profile." },
    ],
    additionalTitle: "Additional zones are assessed during your consultation to ensure a cohesive, balanced result.",
    additional: "Tear troughs, temples, marionette lines, pre-jowl sulcus, nose profile, lip border",
  },
  suitability: {
    title: "Is this suitable for you?",
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
    title: "Your treatment experience", cta: "BOOK YOUR FREE CONSULTATION",
    steps: [
      { title: "personalised consultation", desc: "We assess your facial anatomy, skin condition, medical history, and dermal filler goals with one of our doctors.", image: "/assets/treatments/dermal-fillers-malta-step1.png" },
      { title: "Structured Plan", desc: "Your doctor designs a medically guided dermal filler plan tailored to your facial structure and desired outcome.", image: "/assets/treatments/dermal-fillers-malta-step2.png" },
      { title: "Targeted Treatments", desc: "Your doctor administers dermal fillers with fine, precise injections, quick, comfortable, and no downtime.", image: "/assets/treatments/dermal-fillers-malta-step3.png" },
      { title: "Ongoing Review & Adjustment", desc: "Your doctor monitors your response and refines the plan to ensure natural dermal filler results over time.", image: "/assets/treatments/dermal-fillers-malta-step4.png" },
    ],
  },
  prepAftercare: {
    kicker: "Preparation & Aftercare",
    title: "Your session, step by step",
    intro: "Thoughtful preparation and aftercare help your results look and feel their best.",
    cards: [
      {
        icon: "/assets/treatments/dermal-fillers-malta-icon-before.png",
        label: "Before",
        lead: "Preparation helps your practitioner deliver the best result.",
        points: [
          "Discuss goals, concerns, and medical history",
          "Disclose all medications and supplements",
          "Avoid alcohol and anti-inflammatories for 24 hours",
          "Arrive with clean skin, free of makeup",
        ],
      },
      {
        icon: "/assets/treatments/dermal-fillers-malta-icon-during.png",
        label: "During",
        lead: "Every injection is planned around your facial anatomy.",
        points: [
          "Treatment areas are assessed and marked",
          "Numbing is applied for your comfort",
          "Filler is placed at precisely targeted depths",
          "Session takes 30–60 minutes",
        ],
      },
      {
        icon: "/assets/treatments/dermal-fillers-malta-icon-after.png",
        label: "After",
        lead: "A few precautions help your results settle beautifully.",
        points: [
          "No touching or massaging for 24 hours",
          "Avoid exercise, alcohol, and saunas for 24 hours",
          "Stay upright for the first 4 hours",
          "Results appear in 3–5 days, full effect at 2 weeks",
        ],
      },
    ],
  },
  patientVideos: {
    title: "Real patients, real confidence",
    intro: "Every face is unique. Every story is personal. Discover how our Dermal fillers patients describe their journey to refined, natural results at Carisma Aesthetics in Malta.",
    videos: [
      "/assets/treatments/dermal-fillers-malta-video1.mp4",
      "/assets/treatments/dermal-fillers-malta-video2.mp4",
      "/assets/treatments/dermal-fillers-malta-video3.mp4",
    ],
  },
  trusted: {
    title: "Malta's trusted clinic for dermal fillers",
    subtitle: "DOCTOR-LED dermal fillers IN MALTA",
    asSeenOn: ["/assets/press/lovin-malta.jpeg", "/assets/press/malta-daily.png", "/assets/press/bay.jpeg", "/assets/press/times-of-malta.png", "/assets/press/malta-today.jpg"],
    images: ["/assets/treatments/trusted-clinic-collage.png"],
    points: [
      { title: "medically qualified practitioners", desc: "Every dermal fillers treatment is performed by a qualified doctor." },
      { title: "Advanced Facial Anatomy Expertise", desc: "Precision dermal fillers techniques tailored to your unique facial anatomy." },
      { title: "Personalised Treatment Plans", desc: "Your dermal fillers plan is designed to enhance, never overcorrect." },
      { title: "Clinically Approved Products", desc: "Clinically Approved Products — CE-marked, clinically approved dermal filler and evidence-based protocols." },
      { title: "Thousands of Treatments Performed", desc: "Experience and results you can trust, right here in Malta." },
    ],
  },
  difference: {
    kicker: "the carisma difference",
    title: "Malta's #1 leading wellness chain",
    commitmentTitle: "our commitment",
    commitment: [
      "Natural, refined dermal fillers results, never overdone, never frozen",
      "Doctor-led treatments with advanced facial anatomy expertise",
      "Safe, ethical care using clinically approved products",
      "A personalised journey from consultation to aftercare",
    ],
    whyTitle: "WHY MALTA CHOOSES Carisma for dermal fillers",
    why: [
      "Created by the team behind Malta's leading spa and medical aesthetics centres",
      "Doctor-led dermal fillers treatments with a focus on safety and long-term results",
      "A personalised journey from consultation to aftercare",
      "Seamless experience with ongoing support and guidance",
    ],
    mapQuery: "Carisma Aesthetics, Malta",
  },
  bookingForm: { title: "BOOK YOUR dermal fillers APPOINTMENT TODAY" },
  recommended: {
    title: "Recommended with dermal fillers",
    items: [
      { label: "Lip fillers", href: "/lip-fillers-malta", image: "/assets/treatments/lip-fillers-malta-hero.png" },
      { label: "Microneedling", href: "/microneedling-malta", image: "/assets/treatments/rec-microneedling.jpg" },
      { label: "Platelet rich plasma", href: "/prp-malta", image: "/assets/treatments/rec-prp.jpg" },
      { label: "Mesotherapy", href: "/mesotherapy-malta", image: "/assets/treatments/rec-mesotherapy.jpg" },
    ],
  },
  faqTitle: "Frequently asked questions",
  faq: [
    {
      q: "What are dermal fillers, and how do they work?",
      a: "Dermal and lip fillers are injectable substances used to add volume, plumpness, and definition to various areas of the face. They are often made from hyaluronic acid, a naturally occurring substance in the body that helps to retain moisture and maintain skin elasticity. When injected into the skin, fillers can smooth out wrinkles, enhance facial contours, and restore a more youthful appearance. In the case of lip fillers, they are used to plump and define the lips for a fuller, more balanced look.",
    },
    {
      q: "What is the difference between Botox and fillers?",
      a: "While both Botox and fillers are injectable treatments, they work differently and target different concerns. Botox works by temporarily weakening or paralyzing the muscles that cause wrinkles, resulting in a smoother appearance. Fillers, on the other hand, add volume to areas of the face that have lost fullness due to aging or other factors.",
    },
    {
      q: "How long do the results of dermal fillers last?",
      a: "The longevity of dermal and lip fillers can vary depending on the type of filler used and the individual's metabolism. Generally, the results of hyaluronic acid-based fillers can last anywhere from six months to one years. Over time, the body naturally breaks down and absorbs the filler, so follow-up treatments may be needed to maintain the desired results.",
    },
    {
      q: "Are there any side effects or risks associated with dermal fillers?",
      a: "As with any cosmetic procedure, there can be some side effects and risks associated with dermal and lip fillers. Common side effects include temporary redness, swelling, or bruising at the injection site. More serious but rare complications include infection, allergic reactions, or uneven results. To minimize risks, it's important to consult with a qualified practitioner who will ensure the procedure is performed safely and effectively.",
    },
    {
      q: "Do dermal filler injections hurt?",
      a: "Most people find the injections to be relatively comfortable. However, the level of discomfort can vary depending on the individual's pain tolerance and the area being treated. To make the procedure more comfortable, practitioners often use a numbing cream or local anesthetic to minimize any discomfort.",
    },
    {
      q: "How soon will I see the results of dermal fillers?",
      a: "The great thing about dermal fillers is that the results are often visible immediately after the treatment. You'll notice a difference in volume and fullness right away, with the final results becoming more apparent as any swelling or bruising subsides, usually within a week or two.",
    },
    {
      q: "Can I combine dermal fillers with other cosmetic treatments?",
      a: "Yes, you can combine dermal fillers with other cosmetic treatments, such as Botox, chemical peels. Combining treatments can provide enhanced results and address multiple concerns at once. Always consult with a qualified practitioner to develop a personalized treatment plan that meets your needs.",
    },
    {
      q: "Who is a good candidate for dermal fillers?",
      a: "Dermal fillers are suitable for most adults who are in good health and want to improve their facial appearance by adding volume or correcting asymmetry. However, individuals with certain medical conditions or pregnant or breastfeeding women should avoid fillers. A thorough consultation with a qualified practitioner is necessary to determine if dermal and lip fillers are the right treatment for you.",
    },
  ],
};

export default t;
