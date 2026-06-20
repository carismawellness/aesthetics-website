// Central site data extracted from https://www.carismaaesthetics.com/

export const CONTACT = {
  phone: "+356 27802062",
  phoneDigits: "27802062",
  tel: "+35627802062",
  email: "info@carismaaesthetics.com",
  instagram: "https://www.instagram.com/carismaaesthetics",
  instagramHandle: "@carismaaesthetics",
  facebook: "https://www.facebook.com/carismaaesthetics",
  facebookName: "Carisma Aesthetics",
};

export type NavLink = { label: string; href: string };

export const FACE_LINKS: NavLink[] = [
  { label: "Wrinkle-Relax", href: "/wrinkle-relaxing-malta" },
  { label: "Fat Dissolving", href: "/fat-dissolving-malta" },
  { label: "Thread Lift", href: "/thread-lift-malta" },
  { label: "Chemical Peels", href: "/chemical-peels-malta" },
  { label: "Mesotherapy", href: "/mesotherapy-malta" },
  { label: "Dermal Fillers", href: "/dermal-fillers-malta" },
  { label: "Hair Regrowth", href: "/hair-regrowth" },
  { label: "Collagen Stimulator", href: "/collagen-stimulator-malta" },
  { label: "Microneedling", href: "/microneedling-malta" },
  { label: "Polynucleotides (Salmon DNA)", href: "/polynucleotides-salmon-dna" },
  { label: "Profhilo", href: "/profhilo" },
  { label: "Lip Fillers", href: "/lip-fillers-malta" },
  { label: "Hydrafacial", href: "/hydrafacial" },
  { label: "PRP-Platelet Rich Plasma", href: "/prp-malta" },
];

export const BODY_LINKS: NavLink[] = [
  { label: "Laser Hair Removal", href: "/laser-hair-removal-malta" },
  { label: "Pico Laser Tattoo Removal", href: "/pico-laser-tattoo-removal" },
  { label: "Pico Laser Pigmentation", href: "/pico-laser-pigmentation-treatment" },
  { label: "Medical Weight-Loss", href: "/medical-weight-loss" },
  { label: "Fat Freezing", href: "/fat-freezing" },
  { label: "Muscle Stimulation", href: "/muscle-stimulation-1" },
  { label: "Skin Tightening", href: "/skin-tightening-1" },
  { label: "Anti-Cellulite", href: "/anti-cellulite" },
  { label: "Lympathic Drainage", href: "/lympathic-drainage" },
];

export const PACKAGE_LINKS: NavLink[] = [
  { label: "Snatch Your Jawline", href: "/snatch-your-jawline" },
  { label: "4 in 1 Hydrafacial", href: "/4-in-1-hydrafacial-glow" },
  { label: "Exosome Glow Lift Package", href: "/exosome-glowlift" },
  { label: "Ultimate Facelift", href: "/ultimate-facelift" },
];

// Homepage "medical aesthetics procedures" grid.
// image = local asset under /assets. Mapping verified visually during QA.
export type Service = { label: string; href: string; image: string };

export const HOME_SERVICES: Service[] = [
  { label: "botox", href: "/wrinkle-relaxing-malta", image: "/assets/service-botox.png" },
  { label: "lip fillers", href: "/lip-fillers-malta", image: "/assets/service-lip-fillers.png" },
  { label: "dermal fillers", href: "/dermal-fillers-malta", image: "/assets/service-dermal-fillers.png" },
  { label: "collagen boost", href: "/collagen-stimulator-malta", image: "/assets/service-collagen.png" },
  { label: "microneedling", href: "/microneedling-malta", image: "/assets/service-microneedling.png" },
  { label: "mesotherapy", href: "/mesotherapy-malta", image: "/assets/service-mesotherapy.png" },
  { label: "PRP", href: "/prp-malta", image: "/assets/service-prp.png" },
  { label: "thread lift", href: "/thread-lift-malta", image: "/assets/service-thread-lift.png" },
  { label: "chemical peel", href: "/chemical-peels-malta", image: "/assets/service-chemical-peel.png" },
  { label: "fat Dissolving", href: "/fat-dissolving-malta", image: "/assets/service-fat-dissolving.png" },
  { label: "hydrafacial", href: "/hydrafacial", image: "/assets/service-hydrafacial.png" },
  { label: "laser hair removal", href: "/laser-hair-removal-malta", image: "/assets/service-laser.png" },
  { label: "hair regrowth", href: "/hair-regrowth", image: "/assets/treatments/hair-regrowth-scalp-injection.png" },
  { label: "polynucleotides", href: "/polynucleotides-salmon-dna", image: "/assets/treatments/polynucleotides-salmon-dna-hero.webp" },
];

export const WHY_POINTS = [
  "Team of highly trained and Medically qualified practitioners",
  "Central and discrete location",
  "Flexible scheduling and booking",
  "Personalised treatment plans",
  "Advanced treatments with cutting edge technology",
];

export type Doctor = {
  name: string;
  title: string;
  bio: string[];
  image: string;
};

export const DOCTORS: Doctor[] = [
  {
    name: "dr. giovanni scornavacca",
    title: "Italian aesthetic doctor at Carisma Aesthetics",
    bio: [
      "Dr. Giovanni is an Italian aesthetic doctor at Carisma Aesthetics, trained and practiced for years in Italy with continued advanced education across leading universities in Rome, Bologna and other centres. He specialises in aesthetic medicine with a particular interest in regenerative approaches such as PRP, stem cells, pairing medical rigour with a calm, human manner.",
      "His philosophy is restoration, not change: every consultation begins with listening to your story and how you want to feel in your skin, then shaping a conservative, precisely paced plan that prioritises safety, clarity and natural balance. From softening expression lines and refining contour to improving tone, texture and early laxity, his results are subtle and harmonious—refreshed, never overdone.",
      "At our St Julian’s clinic, Dr. Giovanni offers evidence-based treatments including  dermal fillers, collagen stimulators, skin boosters, microneedling with mesotherapy, PRP and medical-grade laser therapies, guiding you thoughtfully through each step so you can glow with confidence.",
    ],
    image: "/assets/doctor-giovanni.png",
  },
  {
    name: "dr. francesca CHIRCOP",
    title: "London-trained aesthetic doctor",
    bio: [
      "Dr. Francesca is a London-trained aesthetic doctor with eight years in medical aesthetics and a foundation in orthopaedic surgery, bringing precise anatomical insight to subtle, balanced results. Her philosophy is restoration, not change: every consultation begins with listening to your story and how you want to feel in your skin before shaping a conservative, personalised plan that prioritises safety, clarity, and natural harmony.",
      "She leads our Lip Flip enhancements and oversees the majority of our medical-grade laser hair removal care, pairing meticulous technique with advanced protocols for smooth, long-term results. Across anti-wrinkle injections, dermal fillers, skin boosters, PRP/regenerative techniques, microneedling with mesotherapy, and medical-grade lasers, she guides you thoughtfully through each step so the outcome feels authentically you—refreshed, never overdone.",
    ],
    image: "/assets/doctor-francesca.png",
  },
  {
    name: "dr. zaid teebi",
    title: "Medical consultant",
    bio: [
      "Dr Zaid Teebi, a medical consultant with over 30 years experience in medical practice. He holds credentials in general medicine, geriatrics, and has specialised allergy training, allowing him to combine broad clinical insight with focused allergy care. In addition, he obtained a certificate in Sports Medicine from the American College of Sports Medicine. He followed a course in Allergy and allergy therapy at the Imperial College London (UK).",
      "He also underwent a course and training in Pain Management at Harvard Medical School (USA). Dr Teebi personally conducts detailed consultations: a comprehensive medical and allergy history, explores symptom chronology and exposures, considers family history, environmental and occupational factors, and then performs a full clinical examination before recommending targeted diagnostic tests and therapy. His philosophy is that the history and clinical picture form the backbone on which test results can be interpreted more accurately.",
    ],
    image: "/assets/doctor-zaid.png",
  },
];
