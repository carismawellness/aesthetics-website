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
  "laser-hair-removal-malta": {
    title: "Laser Hair Removal Malta | Soprano Ice Platinum",
    description:
      "Laser hair removal in Malta using Alma Soprano Ice Platinum. Virtually painless, all skin types. 6-session packages from €139. Book your free consultation.",
  },
  "medical-weight-loss": {
    title: "Ozempic & Mounjaro Malta | Doctor-Led GLP-1 Programme | Carisma Aesthetics",
    description:
      "Doctor-led Ozempic and Mounjaro programme in Malta. Full medical assessment, structured GLP-1 support, side effect management, and body contouring. Book your eligibility consultation today or call us on +356 27802062.",
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
    title: "Fat Dissolving in Malta |  | #1 Award Winning Clinic",
    description:
      "Our fat-dissolving treatments in Malta will help you discover a new you. To book a free consultation with Carisma Aesthetics, call us on +356 27802062.",
  },
  "4-in-1-hydrafacial-glow": {
    title: "Hydrafacial Glow in Malta |  | #1 Award Winning Clinic",
    description:
      "Our fat-dissolving treatments in Malta will help you discover a new you. To book a free consultation with Carisma Aesthetics, call us on +356 27802062.",
  },
  "exosome-glowlift": {
    title: "Microneedling in Malta |  | #1 Award Winning Clinic",
    description:
      "Experience smoother, firmer, glowing skin with the Exosome Glow Lift Package in Malta. Microneedling with exosomes, LED therapy, and expert care for real, visible results. To book a free consultation with Carisma Aesthetics, call us on +356 27802062.",
  },
  "ultimate-facelift": {
    title: "Thread Lift in Malta |  | #1 Award Winning Clinic",
    description:
      "We provide skincare in Malta tailored to your skin. To contact Carisma Aesthetics, fill out our form or call us on +356 27802062 to book a free consultation.",
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
      openGraph: {
        title: seo.title,
        description: seo.description,
        url: `https://www.carismaaesthetics.com/${slug}`,
        siteName: "Carisma Aesthetics",
        type: "website" as const,
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
