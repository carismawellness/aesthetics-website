import Link from "next/link";
import PageHero from "@/components/PageHero";
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
    <main id="main-content">
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
        media={{
          type: "image",
          src: `${A}/mem-hero.jpg`,
          alt: "Glow Club membership at Carisma Aesthetics Malta — exclusive aesthetics savings programme",
          fill: true,
        }}
        proof={{
          rating: "4.9",
          reviews: "200+",
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
           Cream band (var(--cream) #deebeb): teal button boundary passes
           WCAG 1.4.11 (4.26:1 ≥ 3), heading/body/script taglines all ≥4.5:1. */}
      <section
        aria-labelledby="join-cta-heading"
        style={{ background: "var(--cream)", padding: "76px 0 84px" }}
      >
        <div
          className="container text-center"
          style={{ maxWidth: "720px" }}
        >
          <h2
            id="join-cta-heading"
            className="font-serif"
            style={{
              fontSize: "clamp(24px,4vw,38px)",
              color: "var(--teal-text)",
              letterSpacing: "0.06em",
              fontWeight: 400,
              lineHeight: 1.25,
            }}
          >
            Ready to start saving towards your glow?
          </h2>
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
              color: "var(--teal-text)",
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
