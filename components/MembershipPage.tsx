import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Pillars from "@/components/membership/Pillars";
import HowItWorks from "@/components/membership/HowItWorks";
import Tiers from "@/components/membership/Tiers";
import GlowGuarantee from "@/components/membership/GlowGuarantee";
import Benefits from "@/components/membership/Benefits";
import MemberTreatments from "@/components/membership/MemberTreatments";
import MemberReviews from "@/components/membership/MemberReviews";
import MembershipFaq from "@/components/membership/Faq";

const A = "/assets/treatments";

/* ─── page ────────────────────────────────────────────────────────
 * Composes the rebuilt Glow Club membership page from its section
 * components. The ONLY <h1> on the page is the hero headline (PageHero).
 * Primary CTA everywhere → /membership/join ("Join the Glow Club").
 * ─────────────────────────────────────────────────────────────── */

export default function MembershipPage() {
  return (
    <main id="main-content" className="glow-field">
      {/* ════ 1 · HERO ════ */}
      <PageHero
        badge="#1 Voted Med-Aesthetics Clinic"
        headline={[
          { text: "Glow Club membership" },
          { text: "in Malta", em: true },
        ]}
        sub="Save towards your favourite Carisma Aesthetics treatments month by month, then spend your Glow balance with exclusive member discounts."
        bullets={[
          { text: "10% off all aesthetics & spa services" },
          { text: "15% off skin care products" },
          { text: "Priority booking & a yearly complimentary consultation" },
        ]}
        primaryCta={{ text: "Join the Glow Club", href: "/membership/join" }}
        background="transparent"
        media={{
          type: "image",
          src: `${A}/mem-hero-portrait.jpg`,
          alt: "Glow Club membership at Carisma Aesthetics Malta, exclusive aesthetics savings programme",
          fill: true,
          position: "center top",
        }}
        proof={{
          rating: "4.9",
          reviews: "500+",
          statValue: "30+",
          statLabel: "years in wellness",
          awardText: "#1 Voted Clinic\nMalta Healthcare Awards",
        }}
      />

      {/* ════ 2 · PILLARS ════ */}
      <Pillars />

      {/* ════ 3 · HOW IT WORKS ════ */}
      <HowItWorks />

      {/* ════ 4 · TIERS ════ */}
      <Tiers />

      {/* ════ 5 · GLOW GUARANTEE ════ */}
      <GlowGuarantee />

      {/* ════ 6 · BENEFITS ════ */}
      <Benefits />

      {/* ════ 7 · MEMBER TREATMENTS ════ */}
      <MemberTreatments />

      {/* ════ 8 · MEMBER REVIEWS ════ */}
      <MemberReviews />

      {/* ════ 9 · FAQ ════ */}
      <MembershipFaq />

      {/* ════ 10 · JOIN THE GLOW CLUB — final CTA band ════
           Transparent so the page-wide warm ivory/champagne .glow-field shows
           through (no section fill). Gold button boundary + heading/body/script
           taglines remain ≥4.5:1 on the ivory/champagne ground. */}
      <section
        aria-labelledby="join-cta-heading"
        style={{ background: "transparent", padding: "clamp(40px,8vw,76px) 0 clamp(44px,9vw,84px)" }}
      >
        <div
          className="container text-center"
          style={{ maxWidth: "720px" }}
        >
          <SectionHeading
            title="Ready to start saving towards your glow?"
            id="join-cta-heading"
          />
          <p
            style={{
              fontFamily: "var(--font-pinyon), cursive",
              fontSize: "clamp(30px,5vw,42px)",
              color: "var(--gold)",
              marginTop: "10px",
              lineHeight: 1.1,
            }}
          >
            Glow with Confidence
          </p>
          <p
            style={{
              fontSize: "15px",
              color: "#7a6e52",
              lineHeight: 1.7,
              margin: "20px auto 0",
              maxWidth: "520px",
            }}
          >
            Join the Glow Club today and unlock member-only discounts, priority
            booking and a yearly complimentary consultation.
          </p>
          <div style={{ marginTop: "34px" }}>
            <Link
              href="/membership/join"
              className="btn btn-gold"
              aria-label="Join the Glow Club membership"
            >
              Join the Glow Club
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
