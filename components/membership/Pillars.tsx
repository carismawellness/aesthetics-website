import Link from "next/link";

/* ────────────────────────────────────────────────────────────────
   Glow Club — "Why join" 4-pillar value grid
   CRO pattern modelled on the Slimming home "4 Core Pillars" section,
   re-skinned in the Carisma Aesthetics cool sage-teal + taupe-gold palette.
   Copy/pricing extracted faithfully from components/MembershipPage.tsx
   (hero bullets ~333-360, benefit/FAQ copy ~100-320). Restructured for
   conversion — every fact kept AS-IS.

   Background cleanup: section + cards no longer use teal fills. The section
   is transparent so the single membership page glow-field (warm ivory /
   champagne) shows through; cards use a soft translucent white for
   separation. Teal stays accent-only (icon chip, eyebrow, rule, links).

   WCAG AA (verified with scripts/contrast.mjs; worst-case ground = the
   page's warm champagne #f3ece0 the translucent card sits over):
     heading  --gold      #706552 on #f3ece0 → 4.87:1  (AA normal)
     body     --ink-soft  #706552 on #f3ece0 → 4.87:1  (AA normal)
     eyebrow  --teal-text #406060 on #f3ece0 → 5.84:1  (AA normal)
     icon chip white #fff on --teal-deep #4f7373 → 5.21:1 (AA normal)
   ──────────────────────────────────────────────────────────────── */

const GOLD = "var(--gold)"; /* #706552 — heading TEXT, AA on white/teal tints */
const INK_SOFT = "var(--ink-soft)"; /* #706552 — body taupe */
const TEAL_TEXT = "var(--teal-text)"; /* #406060 — eyebrow / small accent */
const TEAL_DEEP = "var(--teal-deep)"; /* #4f7373 — icon chip fill carries white */

type Pillar = {
  eyebrow: string;
  title: string;
  body: string;
  icon: React.ReactNode;
};

/* Inline, decorative line icons — stroke = white inside the teal chip. */
const stroke = {
  fill: "none",
  stroke: "#ffffff",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PILLARS: Pillar[] = [
  {
    eyebrow: "Save month by month",
    title: "Build your Glow balance",
    body: "Set aside a little each month — anywhere from €20 to €200 — and watch your balance grow towards the treatments you love. Deposit €40 a month and you’ll have €240 ready to spend in just six months.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <path d="M3 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1" />
        <path d="M3 8v8a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-3" />
        <path d="M21 10v4h-4a2 2 0 0 1 0-4Z" />
      </svg>
    ),
  },
  {
    eyebrow: "Members save more",
    title: "10% off every service",
    body: "Enjoy your member-exclusive 10% discount on all aesthetics & spa services as you spend your Glow credit — from your favourite facial to that mid-year Botox session, kept beautifully affordable.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <path d="M9 21H5a2 2 0 0 1-2-2v-4l11-11a2 2 0 0 1 2.8 0l3.2 3.2a2 2 0 0 1 0 2.8L9 21Z" />
        <circle cx="8.5" cy="8.5" r="1.2" />
      </svg>
    ),
  },
  {
    eyebrow: "Take your glow home",
    title: "15% off skincare products",
    body: "A generous 15% off all retail skincare, so the radiant results you create in-clinic carry on at home. Keep your shelf — and your skin — looking its very best between visits.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <path d="M9 3h6v3l1.5 1.5A3 3 0 0 1 17.5 10v8a3 3 0 0 1-3 3h-5a3 3 0 0 1-3-3v-8a3 3 0 0 1 1.5-2.6L9 6V3Z" />
        <path d="M6.5 12h11" />
      </svg>
    ),
  },
  {
    eyebrow: "You come first",
    title: "Priority booking & yearly consultation",
    body: "Skip the wait with priority booking on the appointments that matter, plus one complimentary expert consultation every year to map your next glow-up — guidance from Sarah’s team, on the house.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <rect x="3.5" y="5" width="17" height="15" rx="2" />
        <path d="M3.5 9h17M8 3v4M16 3v4" />
        <path d="M9.5 14.5l1.7 1.7 3.3-3.6" />
      </svg>
    ),
  },
];

export default function Pillars() {
  return (
    <section
      aria-labelledby="glow-pillars-heading"
      style={{ padding: "84px 0", background: "transparent" }}
    >
      <div className="container">
        {/* Eyebrow + heading + rule */}
        <p
          aria-hidden="true"
          className="text-center"
          style={{
            color: TEAL_TEXT,
            fontFamily: '"Novecento Wide", sans-serif',
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Why join the Glow Club
        </p>
        <div
          aria-hidden="true"
          className="mx-auto"
          style={{ width: "70px", height: "1px", background: TEAL_DEEP, opacity: 0.45, margin: "14px auto 0" }}
        />
        <h2
          id="glow-pillars-heading"
          className="font-serif text-center"
          style={{
            color: GOLD,
            fontSize: "clamp(22px,3vw,32px)",
            fontWeight: 400,
            lineHeight: 1.3,
            letterSpacing: "0.06em",
            margin: "18px auto 0",
            maxWidth: "640px",
          }}
        >
          Four ways the Glow Club rewards you
        </h2>
        <p
          className="text-center"
          style={{
            color: INK_SOFT,
            fontFamily: '"Roboto Local", Roboto, sans-serif',
            fontSize: "16px",
            lineHeight: 1.6,
            maxWidth: "600px",
            margin: "16px auto 0",
          }}
        >
          A monthly savings membership built around you — save towards the
          treatments you love, then spend with exclusive member perks.
        </p>

        {/* Pillar grid */}
        <ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          role="list"
          style={{ gap: "26px", listStyle: "none", padding: 0, margin: "52px 0 0" }}
        >
          {PILLARS.map((p) => (
            <li
              key={p.title}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "30px 26px",
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(2px)",
                borderTopLeftRadius: "18px",
                borderTopRightRadius: "90px",
                borderBottomLeftRadius: "90px",
                borderBottomRightRadius: "18px",
                boxShadow: "0 10px 30px rgba(79,115,115,0.08)",
                overflow: "hidden",
              }}
            >
              {/* Icon chip */}
              <span
                aria-hidden="true"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: TEAL_DEEP,
                  flexShrink: 0,
                  marginBottom: "20px",
                }}
              >
                {p.icon}
              </span>

              <p
                style={{
                  color: TEAL_TEXT,
                  fontFamily: '"Novecento Wide", sans-serif',
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  margin: "0 0 8px",
                }}
              >
                {p.eyebrow}
              </p>

              <h3
                className="font-serif"
                style={{
                  color: GOLD,
                  fontSize: "19px",
                  fontWeight: 400,
                  lineHeight: 1.3,
                  letterSpacing: "0.04em",
                  margin: "0 0 12px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid rgba(79,115,115,0.18)",
                }}
              >
                {p.title}
              </h3>

              <p
                style={{
                  color: INK_SOFT,
                  fontFamily: '"Roboto Local", Roboto, sans-serif',
                  fontSize: "14px",
                  lineHeight: 1.6,
                  margin: 0,
                  flex: 1,
                }}
              >
                {p.body}
              </p>
            </li>
          ))}
        </ul>

        {/* Reassurance + primary CTA */}
        <div style={{ marginTop: "44px", textAlign: "center" }}>
          <p
            style={{
              color: INK_SOFT,
              fontFamily: '"Roboto Local", Roboto, sans-serif',
              fontSize: "14px",
              lineHeight: 1.6,
              maxWidth: "560px",
              margin: "0 auto 22px",
            }}
          >
            Your first month is non-refundable — but it’s never lost. We credit it
            straight towards your second procedure with us once you join.
          </p>
          <Link
            href="/membership/join"
            className="btn btn-teal"
            aria-label="Join the Glow Club membership"
          >
            Join the Glow Club
          </Link>
        </div>
      </div>
    </section>
  );
}
