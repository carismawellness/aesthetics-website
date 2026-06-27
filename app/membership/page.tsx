import type { Metadata } from "next";
import MembershipPage from "@/components/MembershipPage";
import { MEMBERSHIP_FAQS } from "@/components/membership/faqData";

export const metadata: Metadata = {
  title: { absolute: "Glow Club Membership in Malta | Carisma Aesthetics" },
  description:
    "Join the Glow Club at Carisma Aesthetics Malta. Save towards treatments month by month with 10% off aesthetics, 15% off skincare and priority booking.",
  alternates: { canonical: "https://www.carismaaesthetics.com/membership" },
  openGraph: {
    title: "Glow Club Membership in Malta | Carisma Aesthetics",
    description:
      "Save towards your favourite treatments month by month, then spend your Glow balance with exclusive member discounts at Carisma Aesthetics Malta.",
    url: "https://www.carismaaesthetics.com/membership",
    images: [
      {
        url: "/og-aesthetics.jpg",
        width: 1200,
        height: 630,
        alt: "Glow Club Membership Malta",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/og-aesthetics.jpg"] },
};

// Page-scoped FAQPage JSON-LD, built from the single-source MEMBERSHIP_FAQS so
// the structured data always matches the visible <MembershipFaq /> answers.
// Sanitised per the Next.js JSON-LD guide by escaping "<" → "<".
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: MEMBERSHIP_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <MembershipPage />
    </>
  );
}
