import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PackageTemplatePreview from "@/components/packages/preview/PackageTemplatePreview";
import { PACKAGES } from "@/lib/packages";
import { hydrafacialPreview } from "@/lib/packages/preview-content";
import type { PreviewContent } from "@/lib/packages/preview-types";

/*
  PREVIEW route for the V2 package template. Noindexed (robots index:false) so it
  never competes with the live package pages while we perfect it. Currently wired
  for the flagship 4-in-1 HydraFacial Glow only; more slugs added at rollout.
*/

const PREVIEW_CONTENT: Record<string, PreviewContent> = {
  "4-in-1-hydrafacial-glow": hydrafacialPreview,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(PREVIEW_CONTENT).map((slug) => ({ slug }));
}

export const metadata: Metadata = {
  title: "Preview — 4-in-1 HydraFacial Glow | Carisma Aesthetics",
  description: "Internal preview of the new package template. Not for indexing.",
  robots: { index: false, follow: true },
};

export default async function PackagePreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = PACKAGES[slug];
  const content = PREVIEW_CONTENT[slug];
  if (!data || !content) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <PackageTemplatePreview data={data} content={content} />
    </>
  );
}
