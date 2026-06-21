import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
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

const FACE_SEO: Record<string, { title: string; description: string }> = {
  "dermal-fillers": {
    title: "Dermal Fillers Malta | Lips, Cheeks, Jawline | Carisma Aesthetics",
    description:
      "Dermal filler treatments in Malta from €269. Lips, cheeks, jawline, nose, tear trough. Natural results by medically qualified doctor & practitioner. Free consultation.",
  },
  "microneedling": {
    title: "Microneedling Malta | #1 Award Winning Clinic",
    description:
      "Microneedling with mesotherapy in Malta from €149/session. Doctor-led collagen induction therapy with personalised cocktails: smooth acne scars, fine lines & more. Free consultation, book today.",
  },
  "chemical-peels": {
    title: "Chemical Peels Malta | #1 Award Winning Clinic",
    description:
      "Carisma's Malta chemical peels can help you achieve a brighter, smoother, and youthful complexion. Call us on +356 27802062 to book a free consultation!",
  },
  "lip-fillers": {
    title: "Lip Fillers Malta | Natural Results | Carisma Aesthetics",
    description:
      "Lip filler treatments in Malta from €219. Juvederm, Croma, and Teoxane by medically qualified doctors & practitioners. Subtle, natural enhancement. Book your free consultation.",
  },
  "collagen-stimulator": {
    title: "Collagen Stimulator | #1 Award Winning Clinic",
    description:
      "Carisma's collagen stimulators in Malta revitalise your skin and boost collagen production. Call us on +356 27802062 to book a free consultation!",
  },
  "wrinkle-relaxing": {
    title: "Botox Malta | #1 Award Winning Clinic",
    description:
      "Botox in Malta from €59. Doctor-led anti-wrinkle injections by Dr. Giovanni Scornavacca. Natural results, no frozen look. Free consultation | Book Today.",
  },
  "mesotherapy": {
    title: "Mesotherapy in Malta | #1 Award Winning Clinic",
    description:
      "Experience Carisma's Malta Mesotherapy and rejuvenate your skin with skin boosters. Contact us on +356 27802062 to book a free consultation!",
  },
  "thread-lift": {
    title: "Thread Lift | #1 Award Winning Clinic",
    description:
      "We provide skincare in Malta tailored to your skin. To contact Carisma Aesthetics, fill out our form or call us on +356 27802062 to book a free consultation.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getFaceTreatment(slug);
  if (!t) return {};
  const seo = FACE_SEO[slug];
  const title = seo?.title ?? `${t.name} in Malta | Carisma Aesthetics`;
  const description = seo?.description ?? t.tagline;
  return {
    title,
    description,
    // P1 SEO: canonical prevents indexing of duplicate/trailing-slash variants
    alternates: {
      canonical: `https://www.carismaaesthetics.com/face-treatments/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.carismaaesthetics.com/face-treatments/${slug}`,
      siteName: "Carisma Aesthetics",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function FaceTreatmentDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getFaceTreatment(slug);
  if (!t) notFound();

  const recommended = (t.recommended ?? [])
    .map((s) => getFaceTreatment(s))
    .filter((x): x is FaceTreatment => Boolean(x));

  return (
    <main id="main-content">
      {/* P9: Breadcrumb navigation — improves wayfinding and adds BreadcrumbList structured data opportunity */}
      <nav aria-label="Breadcrumb" style={{ background: "var(--cream)", borderBottom: "1px solid var(--line)" }}>
        <div className="container" style={{ paddingTop: "12px", paddingBottom: "12px" }}>
          <ol
            className="flex flex-wrap items-center"
            style={{ gap: "4px 8px", listStyle: "none", padding: 0, margin: 0, fontSize: "12px", color: "var(--muted)", letterSpacing: "0.06em" }}
          >
            <li>
              <Link
                href="/"
                style={{ color: "var(--teal-text)", textDecoration: "none", minHeight: "44px", display: "inline-flex", alignItems: "center" }}
              >
                Home
              </Link>
            </li>
            {/* P9: decorative separator is aria-hidden */}
            <li aria-hidden="true" style={{ userSelect: "none" }}>›</li>
            <li>
              <Link
                href="/face-treatments"
                style={{ color: "var(--teal-text)", textDecoration: "none", minHeight: "44px", display: "inline-flex", alignItems: "center" }}
              >
                Face Treatments
              </Link>
            </li>
            <li aria-hidden="true" style={{ userSelect: "none" }}>›</li>
            {/* P9: aria-current="page" on the final breadcrumb item */}
            <li aria-current="page" style={{ color: "var(--ink-soft)" }}>{t.name}</li>
          </ol>
        </div>
      </nav>

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
