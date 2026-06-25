import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "fat-dissolving-malta",
  category: "Face",
  hero: {
    title: "Fat dissolving",
    subtitle: "Are you tired of dealing with stubborn localised fat?",
    body: "Embrace a new you with our reliable and impactful localized fat reduction solutions in Malta! Our knowledgeable team is focused on helping you realise a more contoured and youthful version of yourself, without the drawbacks of surgical alternatives.",
    prices: [
      { label: "1 session", price: "from €149" },
      { label: "2 sessions (€125/session)", price: "from €249" },
      { label: "3 sessions (€117/session)", price: "from €349" },
    ],
    cta: "book your fat dissolving session now",
    bookHref: "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2800348&oiid=sv%3A25753622&share=true&pId=2708191",
    image: "/fat-dissolving-hero-aqualyx.jpg",
    productTabs: ["/assets/treatments/fd-logo-aqualyx.png", "/assets/treatments/fd-logo-lemon-bottle.png"],
    heroForm: true,
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
    {
      before: "/assets/treatments/fat-dissolving-malta-ba1-before.jpg",
      after: "/assets/treatments/fat-dissolving-malta-ba1-after.jpg",
      label: "Double Chin Reduction",
    },
    {
      before: "/assets/treatments/fat-dissolving-malta-ba2-before.jpg",
      after: "/assets/treatments/fat-dissolving-malta-ba2-after.jpg",
      label: "Jawline Contouring",
    },
    {
      before: "/assets/treatments/fat-dissolving-malta-ba3-before.jpg",
      after: "/assets/treatments/fat-dissolving-malta-ba3-after.jpg",
      label: "Under Chin Fat Reduction",
    },
    {
      before: "/assets/treatments/fat-dissolving-malta-ba4-before.jpg",
      after: "/assets/treatments/fat-dissolving-malta-ba4-after.jpg",
      label: "Chin & Neck Sculpting",
    },
    {
      before: "/assets/treatments/fat-dissolving-malta-ba5-before.jpg",
      after: "/assets/treatments/fat-dissolving-malta-ba5-after.jpg",
      label: "Facial Contouring",
    },
  ],
  precision: {
    title: "precision areas of refinement",
    intro: "This treatment targets localised fat deposits that resist diet and exercise. Below are the areas most commonly treated.",
    areas: [
      {
        zone: "Chin",
        icon: "/assets/treatments/fat-dissolving-malta-icon-chin.png",
        name: "Double Chin",
        desc: "Reduces submental fullness beneath the chin to reveal a cleaner, more defined profile.",
      },
      {
        zone: "Jawline",
        icon: "/assets/treatments/fat-dissolving-malta-icon-jawline.png",
        name: "Jowl Area",
        desc: "Refines the jawline by reducing soft tissue that blurs the jaw-to-neck transition.",
      },
      {
        zone: "Face",
        icon: "/assets/treatments/fat-dissolving-malta-icon-buccal.png",
        name: "Buccal Region",
        desc: "Slims the lower cheek area for a more contoured, sculpted facial silhouette.",
      },
      {
        zone: "Body",
        icon: "/assets/treatments/fat-dissolving-malta-icon-body.png",
        name: "Stubborn Pockets",
        desc: "Targets small, resistant fat deposits on the body that do not respond to lifestyle alone.",
      },
    ],
    additionalTitle: "Additional Treatment Areas",
    additionalIntro: "Your practitioner will assess suitability and identify the most responsive areas during consultation.",
    additional: "Upper arms, inner thighs, flanks, bra fat, knee area, abdomen",
  },
  suitability: {
    title: "Is this suitable for you?",
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
    title: "Your treatment experience",
    steps: [
      {
        title: "personalised consultation",
        desc: "We assess your facial anatomy, skin condition, medical history, and botox goals with one of our doctors.",
        image: "/assets/treatments/fat-dissolving-malta-step1.png",
      },
      {
        title: "Structured Plan",
        desc: "Your doctor designs a medically guided botox plan tailored to your facial structure and desired outcome.",
        image: "/assets/treatments/fat-dissolving-malta-step2.png",
      },
      {
        title: "Targeted Treatments",
        desc: "Your doctor administers botox using fine, precise injections, quick, comfortable, and no downtime.",
        image: "/assets/treatments/fat-dissolving-malta-step3.png",
      },
      {
        title: "Ongoing Review & Adjustment",
        desc: "Your doctor monitors your response and refines the plan to ensure natural botox results over time.",
        image: "/assets/treatments/fat-dissolving-malta-step4.png",
      },
    ],
    cta: "BOOK YOUR FREE CONSULTATION",
  },
  prepAftercare: {
    kicker: "PREPARATION & AFTERCARE",
    title: "Your session, step by step",
    intro: "Targeted contouring works best with the right preparation. Here is how to support your treatment journey.",
    cards: [
      {
        icon: "/assets/treatments/fat-dissolving-malta-icon-before.png",
        label: "BEFORE",
        lead: "A few steps help prepare your body for treatment.",
        points: [
          "Share your medical history and medications",
          "Disclose any previous treatments in the area",
          "Avoid anti-inflammatories and alcohol for 48 hours",
          "Wear comfortable, loose-fitting clothing",
        ],
      },
      {
        icon: "/assets/treatments/fat-dissolving-malta-icon-during.png",
        label: "DURING",
        lead: "Treatment is targeted, controlled, and carefully guided.",
        points: [
          "The area is precisely marked and cleaned",
          "A series of small injections are administered",
          "Mild stinging or warmth is normal",
          "Session takes 30–45 minutes",
        ],
      },
      {
        icon: "/assets/treatments/fat-dissolving-malta-icon-after.png",
        label: "AFTER",
        lead: "Temporary side effects are part of the process.",
        points: [
          "Swelling and firmness are expected for 1–2 weeks",
          "Avoid intense exercise for 48 hours",
          "Gentle massage may be advised after 3 days",
          "Visible contouring develops over 4–6 weeks",
        ],
      },
    ],
  },
  trusted: {
    title: "Malta's trusted clinic for fat dissolving",
    subtitle: "DOCTOR-LED fat dissolving IN MALTA",
    asSeenOn: [
      "/assets/press/lovin-malta.jpeg",
      "/assets/press/malta-daily.png",
      "/assets/press/bay.jpeg",
      "/assets/press/times-of-malta.png",
      "/assets/press/malta-today.jpg",
    ],
    images: [
      "/assets/treatments/fat-dissolving-malta-trusted-composite.png",
    ],
    points: [
      {
        title: "Medically Qualified Practitioners",
        desc: "Every fat dissolving treatment is performed by a qualified doctor.",
      },
      {
        title: "Advanced Facial Anatomy Expertise",
        desc: "Precision fat dissolving techniques tailored to your unique facial anatomy.",
      },
      {
        title: "Personalised Treatment Plans",
        desc: "Your fat dissolving plan is designed to enhance, never overcorrect.",
      },
      {
        title: "Clinically Approved Products",
        desc: "Clinically Approved Products — CE-marked, clinically approved botox and evidence-based protocols.",
      },
      {
        title: "Thousands of Treatments Performed",
        desc: "Experience and results you can trust, right here in Malta.",
      },
    ],
  },
  difference: {
    kicker: "the carisma difference",
    title: "Malta's #1 leading wellness chain",
    commitmentTitle: "our commitment",
    commitment: [
      "Natural, refined fat dissolving results,  never overdone, never frozen",
      "Doctor-led treatments with advanced facial anatomy expertise",
      "Safe, ethical care using clinically approved products",
      "A personalised journey from consultation to aftercare",
    ],
    whyTitle: "WHY MALTA CHOOSES Carisma for fat dissolving",
    why: [
      "Created by the team behind Malta's leading spa and medical aesthetics centres",
      "Doctor-led fat dissolving treatments with a focus on safety and long-term results",
      "A personalised journey from consultation to aftercare",
      "Seamless experience with ongoing support and guidance",
    ],
    mapQuery: "Carisma Aesthetics, Malta",
  },
  bookingForm: { title: "BOOK YOUR fat dissolving APPOINTMENT TODAY" },
  recommended: {
    title: "Recommended with fat dissolving",
    items: [
      {
        label: "Dermal fillers",
        href: "/dermal-fillers-malta",
        image: "/assets/treatments/thread-lift-malta-rec-dermal-fillers.avif",
      },
      {
        label: "Thread lift",
        href: "/thread-lift-malta",
        image: "/assets/treatments/collagen-stimulator-malta-rec-botox.png",
      },
      {
        label: "Collagen stimulator",
        href: "/collagen-stimulator-malta",
        image: "/assets/treatments/thread-lift-malta-rec-collagen-stimulator.avif",
      },
    ],
  },
  faqTitle: "Frequently asked questions",
  faq: [
    {
      q: "What can I expect during a Fat Dissolving treatment?",
      a: "During a Fat dissolving treatment, a qualified practitioner will administer a series of small injections under in the treated area, such as under chin, stomach and thighs. The number of injections and the amount of product used will depend on your specific needs and desired results. The procedure typically takes about 20-30 minutes to complete, and most patients require multiple treatment sessions spaced several weeks apart for optimal results.",
    },
    {
      q: "Is Fat Dissolving painful?",
      a: "Some discomfort may be experienced during the injections, but it's generally well-tolerated. To minimize pain, your practitioner may apply a topical numbing cream or use a local anesthetic before the injections. Some patients may also experience a mild burning sensation during the treatment, which usually subsides shortly after the procedure.",
    },
    {
      q: "What is the recovery time for Fat Dissolving treatments?",
      a: "After a Fat Dissolving treatment, you may experience some swelling, bruising, or redness in the treated area. These side effects are typically mild and subside within a few days to a week. Most people can return to their normal activities immediately after treatment, but it's essential to follow your practitioner's post-treatment care instructions to ensure proper healing and optimal results.",
    },
    {
      q: "How long does it take to see the results of Fat Dissolving?",
      a: "Results from Fat Dissolving treatments typically become noticeable within two to four weeks after your initial treatment session. It's important to remember that multiple sessions may be needed to achieve your desired results, and the number of sessions will depend on the amount of fat being treated and your individual response to the treatment.",
    },
    {
      q: "How long do the results of Fat Dissolving?",
      a: "The great thing about our Fat Dissolving is that the results are long-lasting. Once the fat cells under the treated areas are destroyed, they cannot store or accumulate fat again. As long as you maintain a stable weight, your treatments results should be permanent.",
    },
    {
      q: "Are there any side effects or risks associated with Fat Dissolving?",
      a: "As with any cosmetic treatment, there can be side effects and risks associated with Fat Dissolving. Common side effects include swelling, bruising, redness, and discomfort at the injection site. In rare cases, more serious complications may occur, such as nerve injury that can cause an uneven smile or facial muscle weakness (when applied on under chin fat). It's essential to consult with a qualified practitioner to minimise risks and ensure proper treatment.",
    },
    {
      q: "Who is a suitable candidate for Fat Dissolving treatment?",
      a: "Fat dissolving is ideal for individuals with minimal to moderate localizes fat who want to improve the appearance without surgery. It is not suitable for those with severe localized fat or individuals with loose, sagging skin in the treatment area. A thorough consultation with a qualified practitioner is necessary to determine if it's the right treatment for you.",
    },
    {
      q: "What parts of the body you can treat with Fat Dissolving?",
      a: "Some of the areas we can treat with fat dissolving are: Double chin, Back fat, Arm fat (bingo wing area), stomach fat and six-pack definition, Flanks and waist, Inner and outer thighs, under the buttocks, fat above knees and other areas that have minimal to moderate localized fat.",
    },
  ],
};

export default t;
