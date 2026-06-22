import { notFound } from "next/navigation";
import TreatmentPage from "@/components/TreatmentPage";
import LaserHairRemovalPage from "@/components/LaserHairRemovalPage";
import ProtocolPage from "@/components/ProtocolPage";
import MedicalWeightLossPage from "@/components/MedicalWeightLossPage";
import PicoLaserPage from "@/components/PicoLaserPage";
import PigmentationPage from "@/components/PigmentationPage";
import HairRegrowthPage from "@/components/HairRegrowthPage";
import BodyPackagePage from "@/components/BodyPackagePage";
import { bodyPackages } from "@/lib/bodypkg";
import { PROTOCOLS } from "@/lib/protocols";
import PackageFunnel from "@/components/packages/PackageFunnel";
import { PACKAGES } from "@/lib/packages";
import { getTreatment, ALL_TREATMENT_SLUGS } from "@/lib/treatments";

export function generateStaticParams() {
  return ALL_TREATMENT_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

const SLUG_SEO: Record<string, { title: string; description: string }> = {
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
    title: "Pico Laser Tattoo Removal Treatment | #1 Award Winning Clinic",
    description:
      "Experience safe and effective Pico laser tattoo removal in Malta. Our advanced treatment helps fade unwanted tattoos with minimal discomfort and is suitable for all skin types and tones.",
  },
  "pico-laser-pigmentation-treatment": {
    title: "Pico Laser Pigmentation Treatment | #1 Award Winning Clinic",
    description:
      "Experience safe and effective Pico laser pigmentation treatment in Malta. Our advanced treatment helps fade unwanted tattoos with minimal discomfort and is suitable for all skin types and tones.",
  },
  "hair-regrowth": {
    title: "Hair Loss Treatment Malta | Malta's #1 Award-Winning Clinic",
    description:
      "Doctor-led hair loss treatment in Malta from €399. PRP, exosomes & prescription therapy in one guaranteed program. 21-28% density increase in 90 days. Free consultation, book today.",
  },
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
    title: "Wrinkles & Fine Lines | Packages | Carisma Aesthetics",
    description:
      "Try our Malta summer recovery packages and rejuvenate your skin this summer. Call us on +356 27802062 to book a free consultation with Carisma Aesthetics!",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const seo = SLUG_SEO[slug];
  if (seo) {
    return {
      title: seo.title,
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
        images: [{ url: "/og-aesthetics.jpg", width: 1200, height: 630 }],
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
  const pkg = PACKAGES[slug];
  if (pkg) return <PackageFunnel data={pkg} />;
  if (slug === "laser-hair-removal-malta") return <LaserHairRemovalPage />;
  if (bodyPackages[slug]) return <BodyPackagePage content={bodyPackages[slug]} />;
  if (PROTOCOLS[slug]) return <ProtocolPage d={PROTOCOLS[slug]} />;
  if (slug === "medical-weight-loss") return <MedicalWeightLossPage />;
  if (slug === "pico-laser-tattoo-removal") return <PicoLaserPage />;
  if (slug === "pico-laser-pigmentation-treatment") return <PigmentationPage />;
  if (slug === "hair-regrowth") return <HairRegrowthPage />;
  const t = getTreatment(slug);
  if (!t) notFound();
  return <TreatmentPage t={t} />;
}
