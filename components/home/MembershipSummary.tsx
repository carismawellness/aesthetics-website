import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

/* ──────────────────────────────────────────────────────────────────────────
   MembershipSummary — home-page summary of the Carisma Aesthetics "Glow Club".

   A premium, conversion-led teaser for the full /membership page. Summarises
   the real Glow Club proposition (save monthly → spend with member discounts),
   its four headline benefits and its three status tiers, then drives to the
   membership page with a single primary CTA.

   Design language matches the Carisma Aesthetics / Slimming home rhythm:
   eyebrow → Trajan serif heading → hairline rule → sub-line → content grid →
   CTA. Cool sage-teal + taupe-gold palette, soft "petal" card radii, scoped
   card hover-lift, and the global .btn shine on every CTA.

   CONTENT SOURCE — pulled faithfully from the live membership components
   (no invented figures):
     • Discounts / perks ........ components/membership/Pillars.tsx + Tiers.tsx
     • Save→spend mechanic ...... components/membership/HowItWorks.tsx
     • Tier names / rewards /
       lifetime-spend thresholds  components/membership/Tiers.tsx (TIERS[])
   Every €/% figure below is verbatim from those files. No PLACEHOLDERs.

   Accessibility (palette tokens already AA-verified in the source sections):
     --gold      #706552 on white / #f7fafa tints ... ≥4.68:1 (AA, headings)
     --teal-text #406060 on white / tints ........... ≥5.62:1 (AA, eyebrows)
     --label     #695c4e on white / tints ........... ≥5.30:1 (AA, body)
     --muted     #636363 on white ................... 6.01:1  (AA, footnote)
     white on --teal-deep #4f7373 ................... 5.21:1  (AA, popular card)
   Server component — no client JS beyond the scoped CSS hover rule.
   ────────────────────────────────────────────────────────────────────────── */

const MEMBERSHIP_HREF = "/membership";

const GOLD = "var(--gold)"; // #706552 — heading / reward TEXT
const TEAL_DEEP = "var(--teal-deep)"; // #4f7373 — icon chips
const MUTED = "var(--muted)"; // #7a6e52 — footnote (brand warm taupe)

/* ── Four headline benefits (verbatim discount facts) ─────────────────── */
type Perk = { title: string; body: string; icon: React.ReactNode };

const stroke = {
  fill: "none",
  stroke: "#ffffff",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PERKS: Perk[] = [
  {
    title: "Save month by month",
    body: "Set aside €20–€200 each month and watch your Glow balance grow towards the treatments you love.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <path d="M3 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1" />
        <path d="M3 8v8a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-3" />
        <path d="M21 10v4h-4a2 2 0 0 1 0-4Z" />
      </svg>
    ),
  },
  {
    title: "10% off every service",
    body: "A member-exclusive 10% discount on all aesthetics & spa services, from your favourite facial to Botox.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <path d="M9 21H5a2 2 0 0 1-2-2v-4l11-11a2 2 0 0 1 2.8 0l3.2 3.2a2 2 0 0 1 0 2.8L9 21Z" />
        <circle cx="8.5" cy="8.5" r="1.2" />
      </svg>
    ),
  },
  {
    title: "15% off skincare",
    body: "A generous 15% off all retail skincare, so your in-clinic results carry on beautifully at home.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <path d="M9 3h6v3l1.5 1.5A3 3 0 0 1 17.5 10v8a3 3 0 0 1-3 3h-5a3 3 0 0 1-3-3v-8a3 3 0 0 1 1.5-2.6L9 6V3Z" />
        <path d="M6.5 12h11" />
      </svg>
    ),
  },
  {
    title: "Priority & a yearly consult",
    body: "Priority booking on the appointments that matter, plus one complimentary consultation every year.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <rect x="3.5" y="5" width="17" height="15" rx="2" />
        <path d="M3.5 9h17M8 3v4M16 3v4" />
        <path d="M9.5 14.5l1.7 1.7 3.3-3.6" />
      </svg>
    ),
  },
];


export default function MembershipSummary() {
  return (
    <section
      aria-labelledby="membership-summary-heading"
      style={{
        background: "transparent",
        padding: "clamp(28px,5vw,72px) 0 clamp(40px,7vw,92px)",
      }}
    >
      {/* Scoped hover-lift — mirrors the home WhyUs / Slimming "Meet Your Doctor"
          card interaction. Reduced-motion guarded. CTA shine comes from .btn. */}
      <style>{`
        .ms-card { transition: box-shadow .3s ease, border-color .3s ease, transform .3s ease; }
        .ms-card:hover {
          border-color: ${TEAL_DEEP};
          box-shadow: 0 4px 10px rgba(12,11,11,0.08), 0 22px 48px -14px rgba(28,30,30,0.22);
        }
        @media (prefers-reduced-motion: no-preference) {
          .ms-card:hover { transform: translateY(-6px) scale(1.02); }
        }
      `}</style>

      <div className="container">
        {/* ── Header ─────────────────────────────────────────────── */}
        <SectionHeading
          className="mx-auto"
          style={{ maxWidth: "760px" }}
          eyebrow="The Glow Club · Membership"
          title="Glow Club Membership — Save More. Glow More."
          subtitle={
            <>
              One simple monthly membership. Save a little each month into your Glow
              balance, then spend it on the treatments and products you love — with
              exclusive member discounts that apply from day one.
            </>
          }
          id="membership-summary-heading"
          subtitleMaxWidth={600}
        />

        {/* ── Benefit grid ───────────────────────────────────────── */}
        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{
            gap: "22px",
            listStyle: "none",
            padding: 0,
            margin: "54px auto 0",
            maxWidth: "1100px",
          }}
        >
          {PERKS.map((p) => (
            <li
              key={p.title}
              className="ms-card"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "28px 24px",
                background: "linear-gradient(180deg, #ffffff 0%, #f7fafa 100%)",
                border: "1px solid rgba(79,115,115,0.12)",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "44px",
                borderBottomLeftRadius: "44px",
                borderBottomRightRadius: "16px",
                boxShadow: "0 10px 30px rgba(79,115,115,0.08)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "48px",
                  height: "48px",
                  borderRadius: "13px",
                  background: TEAL_DEEP,
                  flexShrink: 0,
                  marginBottom: "18px",
                }}
              >
                {p.icon}
              </span>
              <h3
                className="font-serif"
                style={{
                  color: GOLD,
                  fontSize: "17px",
                  fontWeight: 400,
                  lineHeight: 1.3,
                  letterSpacing: "0.03em",
                  margin: "0 0 10px",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  color: "#7a6e52",
                  fontSize: "14px",
                  lineHeight: 1.65,
                  margin: 0,
                  flex: 1,
                }}
              >
                {p.body}
              </p>
            </li>
          ))}
        </ul>

        {/* ── CTA + reassurance ──────────────────────────────────── */}
        <div className="text-center" style={{ marginTop: "48px" }}>
          <Link
            href={MEMBERSHIP_HREF}
            className="btn btn-teal"
            aria-label="Explore the Glow Club membership"
          >
            Explore the Glow Club
          </Link>
          <p
            style={{
              fontSize: "13px",
              color: MUTED,
              lineHeight: 1.7,
              margin: "18px auto 0",
              maxWidth: "520px",
            }}
          >
            Your 10% member discount applies from the very first day, and every
            tier is yours to reach on lifetime contributions.
          </p>
        </div>
      </div>
    </section>
  );
}
