import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getFaceTreatment, faceTreatmentSlugs, type FaceTreatment } from "@/lib/face-treatments";
import JsonLd from "@/lib/seo/JsonLd";
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
      "Dermal filler treatments in Malta from €269. Lips, cheeks, jawline, nose, tear trough. Natural results by medically qualified doctors. Free consultation.",
  },
  "lip-fillers": {
    title: "Lip Fillers Malta | Natural Results | Carisma Aesthetics",
    description:
      "Lip filler treatments in Malta from €219. Juvederm, Croma, and Teoxane by medically qualified doctors. Subtle, natural enhancement. Book your free consultation.",
  },
  "microneedling": {
    title: "Microneedling Malta | Collagen Induction Therapy | Carisma Aesthetics",
    description:
      "Microneedling with mesotherapy in Malta from €149/session. Doctor-led collagen induction therapy with personalised cocktails. Smooth acne scars, fine lines. Free consultation.",
  },
  "chemical-peels": {
    title: "Chemical Peels Malta | Brighter, Smoother Skin | Carisma Aesthetics",
    description:
      "Chemical peel treatments in Malta for brighter, smoother, and more youthful skin. Doctor-led peels tailored to your skin type. Free consultation available.",
  },
  "thread-lift": {
    title: "Thread Lift Malta | Non-Surgical Face Lift | Carisma Aesthetics",
    description:
      "Thread lift in Malta, non-surgical face lifting using PDO threads. Lift sagging skin around jawline, cheeks and neck. Doctor-led, natural results. Free consultation.",
  },
  "wrinkle-relaxing": {
    title: "Anti-Wrinkle Injections Malta | Botox | Carisma Aesthetics",
    description:
      "Anti-wrinkle injections in Malta from €59. Doctor-led Botox treatments with natural results. No frozen look. Free consultation with our medical team.",
  },
  "collagen-stimulator": {
    title: "Collagen Stimulator Malta | Sculptra & Radiesse | Carisma Aesthetics",
    description:
      "Collagen stimulator treatments in Malta including Sculptra and Radiesse. Restore facial volume, improve skin texture and stimulate long-lasting natural collagen. Free consultation.",
  },
  "mesotherapy": {
    title: "Mesotherapy Malta | Skin Booster Injections | Carisma Aesthetics",
    description:
      "Mesotherapy skin booster treatments in Malta from €149. Hyaluronic acid cocktails for deep hydration, radiance and anti-ageing. Doctor-led. Free consultation.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getFaceTreatment(slug);
  if (!t) return {};
  const seo = FACE_SEO[slug];
  const BASE = "https://www.carismaaesthetics.com";
  const canonical = `${BASE}/face-treatments/${slug}`;
  const title = seo?.title ?? `${t.name} in Malta | Carisma Aesthetics`;
  const description = seo?.description ?? t.tagline;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Carisma Aesthetics",
      type: "website",
      images: t.heroImage ? [{ url: t.heroImage, width: 1200, height: 630, alt: t.name }] : [],
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
      {/* BreadcrumbList JSON-LD */}
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.carismaaesthetics.com" },
            { "@type": "ListItem", position: 2, name: "Face Treatments", item: "https://www.carismaaesthetics.com/face-treatments" },
            { "@type": "ListItem", position: 3, name: t.name, item: `https://www.carismaaesthetics.com/face-treatments/${slug}` },
          ],
        }}
      />
      {/* FAQPage JSON-LD — rendered only when the treatment has FAQs */}
      {t.faqs && t.faqs.length > 0 && (
        <JsonLd
          schema={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: t.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}
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
