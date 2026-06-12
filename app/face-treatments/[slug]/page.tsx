import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getFaceTreatment, faceTreatmentSlugs, type FaceTreatment } from "@/lib/face-treatments";
import {
  FaceHero,
  TreatmentInfoBar,
  BeforeAfter,
  AreaGrid,
  SuitabilityCompare,
  ExperienceSteps,
  PrepAftercare,
  TrustStrip,
  CarismaDifference,
  CtaBanner,
  RecommendedGrid,
  FaqSection,
} from "@/components/face/FaceUI";

export function generateStaticParams() {
  return faceTreatmentSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getFaceTreatment(slug);
  if (!t) return {};
  return { title: `${t.name} in Malta | Carisma Aesthetics`, description: t.tagline };
}

export default async function FaceTreatmentDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getFaceTreatment(slug);
  if (!t) notFound();

  const recommended = (t.recommended ?? [])
    .map((s) => getFaceTreatment(s))
    .filter((x): x is FaceTreatment => Boolean(x));

  return (
    <main>
      <FaceHero t={t} />
      <TreatmentInfoBar stats={t.infoStats} />
      {t.beforeAfter && t.beforeAfter.length > 0 && <BeforeAfter name={t.name} pairs={t.beforeAfter} />}
      <AreaGrid areas={t.areas} />
      <SuitabilityCompare ideal={t.suitability.ideal} notIdeal={t.suitability.notIdeal} />
      {t.steps && t.steps.length > 0 && <ExperienceSteps steps={t.steps} />}
      {t.prep && <PrepAftercare prep={t.prep} />}
      <CtaBanner
        heading={`Considering ${t.name}?`}
        sub="Book a private consultation and we will tell you honestly whether it is the right choice for you."
        buttonLabel="Book a Consultation"
      />
      {t.trustLogos && t.benefits && <TrustStrip logos={t.trustLogos} benefits={t.benefits} />}
      {t.commitments && t.commitments.length > 0 && <CarismaDifference commitments={t.commitments} />}
      <RecommendedGrid items={recommended} />
      <CtaBanner heading={`Begin your ${t.name} journey`} buttonLabel={`Book Your ${t.name} Appointment`} />
      <FaqSection faqs={t.faqs} />
    </main>
  );
}
