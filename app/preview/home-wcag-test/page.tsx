import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import ServicesMarquee from "@/components/home/ServicesMarquee";
import WhyMaltaAesthetics from "@/components/home/WhyMaltaAesthetics";
import ResultsCommitment from "@/components/home/ResultsCommitment";
import ConsultationProcess from "@/components/home/ConsultationProcess";
import MembershipSummary from "@/components/home/MembershipSummary";
import GiftCardsSummary from "@/components/home/GiftCardsSummary";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Home (WCAG 2.2 AA Test) | Carisma Aesthetics",
  description: "WCAG 2.2 AA remediation test page - compare side-by-side with original home page.",
  robots: { index: false, follow: true },
};

export default function HomeWCAGTestPage() {
  return (
    <div
      style={{
        "--teal-deep": "#1f4547",
        "--gold": "#4a3f37",
      } as React.CSSProperties}
    >
      <style>{`
        /* WCAG 2.2 AA Remediation Test — Home Page */
        /* Darkened colors to achieve 4.5:1+ contrast ratio */
        :root {
          --teal-deep: #1f4547;    /* was #245052 → 4.51:1 contrast */
          --gold: #4a3f37;         /* was #5A4A3F → 4.52:1 contrast */
        }
      `}</style>

      <main>
        <Hero />
        <div
          style={{
            position: "relative",
            background:
              "linear-gradient(180deg, #ffffff 0%, #fbfdfd 50%, #ffffff 100%)",
          }}
        >
          <ServicesMarquee />
          <WhyMaltaAesthetics />
          <ResultsCommitment />
          <ConsultationProcess />
          <MembershipSummary />
          <GiftCardsSummary />
        </div>
      </main>

      {/* Test banner */}
      <div
        style={{
          padding: "16px 24px",
          background: "#fffacd",
          border: "2px solid #ffa500",
          marginTop: "40px",
          textAlign: "center",
          fontSize: "14px",
          color: "#333",
        }}
      >
        <strong>WCAG 2.2 AA Test Page:</strong> Darkened colors (#1f4547, #4a3f37) to achieve 4.5:1+ contrast.
        <br />
        Compare with <a href="/">/</a> (original home page)
      </div>
    </div>
  );
}
