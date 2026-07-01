import type { Metadata } from "next";
import TreatmentsShowcase from "@/components/preview/treatments/TreatmentsShowcase";

// Internal preview — never indexed. Googlebot may still crawl to see the noindex,
// so do NOT also Disallow this in robots.ts.
export const metadata: Metadata = {
  title: "Treatments Section, 5 Directions (Preview)",
  description:
    "Internal preview: five Awwwards-tier rebuilds of the treatments section. Pick one.",
  robots: { index: false, follow: false },
};

export default function TreatmentsPreviewPage() {
  return (
    <main>
      <header
        className="container"
        style={{ padding: "clamp(36px,6vw,72px) 0 4px", textAlign: "center" }}
      >
        <p
          className="font-display"
          style={{
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--brand-taupe)",
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          Internal Preview
        </p>
        <h1
          className="font-serif"
          style={{
            color: "var(--teal-deep)",
            fontSize: "clamp(24px,3.4vw,40px)",
            fontWeight: 400,
            letterSpacing: "0.04em",
            lineHeight: 1.15,
          }}
        >
          Treatments Section, 5 Directions
        </h1>
        <p
          style={{
            color: "var(--ink-soft)",
            maxWidth: 640,
            margin: "16px auto 0",
            fontSize: 15,
            lineHeight: 1.65,
          }}
        >
          Five Awwwards-tier rebuilds of the homepage treatments carousel, each using the
          real 12 treatments and brand palette. Use the switcher to flip between them, then
          tell me the number you want shipped to the live homepage.
        </p>
      </header>

      <TreatmentsShowcase />

      <footer
        className="container"
        style={{ padding: "clamp(48px,6vw,96px) 0", textAlign: "center" }}
      >
        <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.6 }}>
          Reply with the direction number (01–05) and I&apos;ll wire it into the live
          homepage in place of the current carousel.
        </p>
      </footer>
    </main>
  );
}
