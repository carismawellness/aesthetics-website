import { notFound } from "next/navigation";
import TreatmentPage from "@/components/TreatmentPage";
import SnatchYourJawline from "@/components/packages/SnatchYourJawline";
import { getTreatment, ALL_TREATMENT_SLUGS } from "@/lib/treatments";

export function generateStaticParams() {
  return ALL_TREATMENT_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) return {};
  return {
    title: `${t.hero.title} | Carisma Aesthetics Malta`,
    description: t.hero.body ?? `${t.hero.title} at Carisma Aesthetics, Malta's #1 voted med-aesthetics clinic.`,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "snatch-your-jawline") return <SnatchYourJawline />;
  const t = getTreatment(slug);
  if (!t) notFound();
  return <TreatmentPage t={t} />;
}
