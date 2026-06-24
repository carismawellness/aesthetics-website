import { notFound } from "next/navigation";
import JsonLd from "@/lib/seo/JsonLd";
import TreatmentPage from "@/components/TreatmentPage";
import BodyPackagePage from "@/components/BodyPackagePage";
import { bodyPackages } from "@/lib/bodypkg";
import PackageFunnel from "@/components/packages/PackageFunnel";
import { PACKAGES } from "@/lib/packages";
import { getTreatment, ALL_TREATMENT_SLUGS } from "@/lib/treatments";

export function generateStaticParams() {
  return ALL_TREATMENT_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

const SLUG_SEO: Record<string, { title: string; description: string }> = {
  // ─── Core treatments ───────────────────────────────────────────────────────
  "wrinkle-relaxing-malta": {
    title: "Botox Malta | #1 Award Winning Clinic | Carisma Aesthetics",
    description:
      "Botox in Malta from €59. Doctor-led anti-wrinkle injections. Natural results, no frozen look. Free consultation available. Book today.",
  },
  "laser-hair-removal-malta": {
    title: "Laser Hair Removal Malta | Soprano Ice Platinum | Carisma Aesthetics",
    description:
      "Laser hair removal in Malta using Alma Soprano Ice Platinum. Virtually painless, all skin types. 6-session packages from €139. Book your free consultation.",
  },
  "medical-weight-loss": {
    title: "Ozempic & Mounjaro Malta | Doctor-Led GLP-1 Programme | Carisma Aesthetics",
    description:
      "Doctor-led Ozempic and Mounjaro programme in Malta. Full medical assessment, GLP-1 support, side effect management, and body contouring. Book today.",
  },
  "pico-laser-tattoo-removal": {
    title: "Pico Laser Tattoo Removal Malta | #1 Award Winning Clinic | Carisma Aesthetics",
    description:
      "Safe and effective Pico laser tattoo removal in Malta. Advanced picosecond technology fades tattoos of all colours with minimal discomfort. All skin types. Free consultation.",
  },
  "pico-laser-pigmentation-treatment": {
    title: "Pico Laser Pigmentation Treatment Malta | #1 Award Winning Clinic | Carisma Aesthetics",
    description:
      "Pico laser pigmentation treatment in Malta. Targets sun spots, melasma, age spots and uneven skin tone with precision. Minimal downtime. Free consultation.",
  },
  "hair-regrowth": {
    title: "Hair Loss Treatment Malta | Malta's #1 Award-Winning Clinic | Carisma Aesthetics",
    description:
      "Doctor-led hair loss treatment in Malta from €399. PRP, exosomes & prescription therapy in one guaranteed program. 21-28% density increase in 90 days. Free consultation, book today.",
  },
  "hydrafacial": {
    title: "HydraFacial Malta | #1 Award Winning Clinic | Carisma Aesthetics",
    description:
      "HydraFacial in Malta from €99. Deep cleanse, exfoliation, extraction and hydration in one treatment. Medically supervised — visible results after one session. Book today.",
  },
  "dermal-fillers-malta": {
    title: "Dermal Fillers Malta | Lips, Cheeks, Jawline | Carisma Aesthetics",
    description:
      "Dermal filler treatments in Malta from €269. Lips, cheeks, jawline, nose, tear trough. Natural results by medically qualified doctors. Free consultation.",
  },
  "lip-fillers-malta": {
    title: "Lip Fillers Malta | Natural Results | Carisma Aesthetics",
    description:
      "Lip filler treatments in Malta from €219. Juvederm, Croma, and Teoxane by medically qualified doctors. Subtle, natural enhancement. Book your free consultation.",
  },
  "microneedling-malta": {
    title: "Microneedling Malta | #1 Award Winning Clinic | Carisma Aesthetics",
    description:
      "Microneedling with mesotherapy in Malta from €149/session. Doctor-led collagen induction therapy with personalised cocktails. Smooth acne scars, fine lines. Free consultation.",
  },
  "prp-malta": {
    title: "PRP Treatment Malta | #1 Award Winning Clinic | Carisma Aesthetics",
    description:
      "Doctor-led PRP treatment in Malta. PRP facial, vampire facial, and PRP hair treatment for natural rejuvenation. Plasma-rich platelet therapy at Malta's award-winning clinic. Book today.",
  },
  "fat-dissolving-malta": {
    title: "Fat Dissolving Malta | #1 Award Winning Clinic | Carisma Aesthetics",
    description:
      "Fat dissolving injections in Malta from €149. Doctor-led Aqualyx treatment targeting chin, arms, stomach and thighs. Natural-looking results. Free consultation available.",
  },
  "chemical-peels-malta": {
    title: "Chemical Peels Malta | Brighter, Smoother Skin | Carisma Aesthetics",
    description:
      "Chemical peel treatments in Malta for brighter, smoother, and more youthful skin. Doctor-led peels tailored to your skin type. Free consultation available.",
  },
  "profhilo": {
    title: "Profhilo Malta | Skin Booster Treatment | Carisma Aesthetics",
    description:
      "Profhilo bio-remodelling treatment in Malta — the gold standard for skin hydration and laxity. Doctor-led injectable from €299. Natural, long-lasting results. Free consultation.",
  },
  "fat-freezing": {
    title: "CoolSculpting Malta | Fat Freezing Treatment | Carisma Aesthetics",
    description:
      "CoolSculpting fat freezing in Malta. Non-surgical, FDA-cleared body contouring to permanently eliminate stubborn fat. Natural-looking results. Book your free consultation.",
  },
  "muscle-stimulation-1": {
    title: "EMSculpt NEO Malta | Body Sculpting | Carisma Aesthetics",
    description:
      "EMSculpt NEO in Malta — burn fat and build muscle simultaneously with Malta's only dual-technology body sculpting treatment. Visible results in 4 sessions. Book today.",
  },
  "skin-tightening-1": {
    title: "VelaShape III Malta | Skin Tightening & Cellulite | Carisma Aesthetics",
    description:
      "VelaShape III skin tightening in Malta. Non-invasive radiofrequency and infrared treatment for tighter skin and cellulite reduction. Doctor-supervised. Free consultation.",
  },
  "anti-cellulite": {
    title: "Cellulite Treatment Malta | Advanced Smoothing | Carisma Aesthetics",
    description:
      "Advanced cellulite smoothing treatment in Malta. Multi-technology approach targeting stubborn cellulite to improve skin texture and smoothness. Free consultation.",
  },
  "mesotherapy-malta": {
    title: "Mesotherapy Malta | Skin Boosters | Carisma Aesthetics",
    description:
      "Mesotherapy skin booster treatments in Malta from €149. Hyaluronic acid cocktails for deep hydration, radiance and anti-ageing. Doctor-led. Free consultation.",
  },
  "collagen-stimulator-malta": {
    title: "Collagen Stimulator Malta | Sculptra & Radiesse | Carisma Aesthetics",
    description:
      "Collagen stimulator treatments in Malta including Sculptra and Radiesse. Restore facial volume, improve skin texture and stimulate long-lasting natural collagen. Free consultation.",
  },
  "polynucleotides-salmon-dna": {
    title: "Polynucleotides Malta | PDRN Skin Treatment | Carisma Aesthetics",
    description:
      "Polynucleotides (PDRN) treatment in Malta — regenerative salmon DNA injections to repair and renew skin. Reduces pigmentation, wrinkles and improves elasticity. Free consultation.",
  },
  "lympathic-drainage": {
    title: "Lymphatic Drainage Therapy Malta | Carisma Aesthetics",
    description:
      "Lymphatic drainage therapy in Malta. Professional treatment to reduce fluid retention, puffiness and support overall wellbeing. Available at Carisma Aesthetics. Book today.",
  },
  "thread-lift-malta": {
    title: "Thread Lift Malta | Non-Surgical Lifting | Carisma Aesthetics",
    description:
      "Thread lift in Malta — non-surgical facial rejuvenation from €239. Doctor-led lifting and repositioning for a refreshed, youthful appearance. Results last 8-12 months. Free consultation.",
  },
  // ─── Packages ──────────────────────────────────────────────────────────────
  "snatch-your-jawline": {
    title: "Snatch Your Jawline Package | Carisma Aesthetics Malta",
    description:
      "Sculpt and define your jawline in Malta with our combined fat-dissolving and contouring package. Natural, doctor-led results. Free consultation available.",
  },
  "4-in-1-hydrafacial-glow": {
    title: "4-in-1 HydraFacial Glow Package | Carisma Aesthetics Malta",
    description:
      "Our 4-in-1 HydraFacial Glow package in Malta combines deep cleansing, exfoliation, extraction and hydration for radiant, glowing skin. Book your consultation today.",
  },
  "exosome-glowlift": {
    title: "Exosome Glow Lift Package | Carisma Aesthetics Malta",
    description:
      "Experience smoother, firmer, glowing skin with the Exosome Glow Lift Package in Malta. Microneedling with exosomes, LED therapy and expert care for visible results.",
  },
  "ultimate-facelift": {
    title: "Ultimate Facelift Package | Carisma Aesthetics Malta",
    description:
      "The Ultimate Facelift Package in Malta combines non-surgical lifting treatments for full facial rejuvenation. Doctor-led, personalised approach. Free consultation.",
  },
  "wrinkles-fine-lines-packages": {
    title: "Wrinkles & Fine Lines Packages Malta | Carisma Aesthetics",
    description:
      "Anti-wrinkle treatment packages in Malta combining Botox, fillers and skin-boosting therapies. Doctor-led, tailored combinations. Free consultation available.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const seo = SLUG_SEO[slug];
  if (seo) {
    return {
      title: { absolute: seo.title },
      description: seo.description,
      alternates: {
        canonical: `https://www.carismaaesthetics.com/${slug}`,
      },
      openGraph: {
        title: seo.title,
        description: seo.description,
        url: `https://www.carismaaesthetics.com/${slug}`,
        siteName: "Carisma Aesthetics",
        type: "website" as const,
        images: [{ url: "/og-aesthetics.png", width: 1277, height: 1330 }],
      },
      twitter: {
        card: "summary_large_image" as const,
        title: seo.title,
        description: seo.description,
      },
    };
  }
  const pkg = PACKAGES[slug];
  if (pkg) {
    return {
      title: `${pkg.hero.title} | Carisma Aesthetics Malta`,
      description: pkg.hero.subtitle,
    };
  }
  const t = getTreatment(slug);
  if (!t) return {};
  return {
    title: `${t.hero.title} | Carisma Aesthetics Malta`,
    description: t.hero.body ?? `${t.hero.title} at Carisma Aesthetics, Malta's #1 voted med-aesthetics clinic.`,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const seoEntry = SLUG_SEO[slug];
  const schemas = seoEntry ? (
    <>
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.carismaaesthetics.com" },
          { "@type": "ListItem", position: 2, name: seoEntry.title.split(" | ")[0], item: `https://www.carismaaesthetics.com/${slug}` },
        ],
      }} />
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Medical Aesthetics",
        provider: { "@type": "MedicalOrganization", name: "Carisma Aesthetics", url: "https://www.carismaaesthetics.com" },
        name: seoEntry.title.split(" | ")[0],
        description: seoEntry.description,
        url: `https://www.carismaaesthetics.com/${slug}`,
      }} />
    </>
  ) : null;

  const pkg = PACKAGES[slug];
  if (pkg) return <>{schemas}<PackageFunnel data={pkg} /></>;
  if (bodyPackages[slug]) return <>{schemas}<BodyPackagePage content={bodyPackages[slug]} /></>;
  const t = getTreatment(slug);
  if (!t) notFound();
  return <>{schemas}<TreatmentPage t={t} /></>;
}
