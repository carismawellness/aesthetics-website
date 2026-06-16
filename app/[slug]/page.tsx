import { notFound } from "next/navigation";
import TreatmentPage from "@/components/TreatmentPage";
import LaserHairRemovalPage from "@/components/LaserHairRemovalPage";
import ProtocolPage from "@/components/ProtocolPage";
import MedicalWeightLossPage from "@/components/MedicalWeightLossPage";
import PicoLaserPage from "@/components/PicoLaserPage";
import HairRegrowthPage from "@/components/HairRegrowthPage";
import BodyPackagePage from "@/components/BodyPackagePage";
import { bodyPackages } from "@/lib/bodypkg";
import { PROTOCOLS } from "@/lib/protocols";
import PackageFunnel from "@/components/packages/PackageFunnel";
import SnatchJawlinePage from "@/components/packages/SnatchJawlinePage";
import { PACKAGES } from "@/lib/packages";
import { JAWLINE } from "@/lib/jawline-funnel";
import { getTreatment, ALL_TREATMENT_SLUGS } from "@/lib/treatments";

export function generateStaticParams() {
  return ALL_TREATMENT_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "snatch-your-jawline") {
    const s = JAWLINE.seo;
    return {
      title: s.metaTitle,
      description: s.metaDescription,
      alternates: { canonical: s.canonical },
      openGraph: {
        title: s.metaTitle,
        description: s.metaDescription,
        url: s.canonical,
        type: "website",
        images: [{ url: s.ogImage }],
      },
      twitter: {
        card: "summary_large_image",
        title: s.metaTitle,
        description: s.metaDescription,
        images: [s.ogImage],
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
  if (slug === "snatch-your-jawline") return <SnatchJawlinePage />;
  const pkg = PACKAGES[slug];
  if (pkg) return <PackageFunnel data={pkg} />;
  if (slug === "laser-hair-removal-malta") return <LaserHairRemovalPage />;
  if (bodyPackages[slug]) return <BodyPackagePage content={bodyPackages[slug]} />;
  if (PROTOCOLS[slug]) return <ProtocolPage d={PROTOCOLS[slug]} />;
  if (slug === "medical-weight-loss") return <MedicalWeightLossPage />;
  if (slug === "pico-laser-tattoo-removal") return <PicoLaserPage />;
  if (slug === "hair-regrowth") return <HairRegrowthPage />;
  const t = getTreatment(slug);
  if (!t) notFound();
  return <TreatmentPage t={t} />;
}
