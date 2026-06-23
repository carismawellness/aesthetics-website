import Link from "next/link";

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
     --gold      #706552 on white / #deebeb tints ... ≥4.68:1 (AA, headings)
     --teal-text #406060 on white / tints ........... ≥5.62:1 (AA, eyebrows)
     --label     #695c4e on white / tints ........... ≥5.30:1 (AA, body)
     --muted     #636363 on white ................... 6.01:1  (AA, footnote)
     white on --teal-deep #4f7373 ................... 5.21:1  (AA, popular card)
   Server component — no client JS beyond the scoped CSS hover rule.
   ────────────────────────────────────────────────────────────────────────── */

const MEMBERSHIP_HREF = "/membership";

const GOLD = "var(--gold)"; // #706552 — heading / reward TEXT
const TEAL_TEXT = "var(--teal-text)"; // #406060 — eyebrow / small accents
const TEAL_DEEP = "var(--teal-deep)"; // #4f7373 — icon chips, popular-card surface
const POPULAR_BG = "#527979"; // solid teal — white body reads at 4.81:1
const RIBBON_BG = "#c8a96b"; // warm-gold ribbon — ink reads 8.75:1
const INK = "var(--ink)"; // #0c0b0b — ribbon text
const LABEL = "var(--label)"; // #695c4e — body taupe
const MUTED = "var(--muted)"; // #636363 — footnote
const WIDE = '"Novecento Wide", sans-serif';

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

/* ── Three status tiers (names / rewards / thresholds verbatim) ───────── */
type Tier = {
  name: string;
  reward: string;
  threshold: string;
  popular?: boolean;
  gem: React.ReactNode;
};

function Gem({
  base,
  tl,
  tr,
  bl,
  br,
}: {
  base: string;
  tl: string;
  tr: string;
  bl: string;
  br: string;
}) {
  return (
    <svg width="44" height="44" viewBox="0 0 54 54" aria-hidden="true" focusable="false">
      <polygon points="27,6 48,20 48,34 27,48 6,34 6,20" fill={base} opacity="0.9" />
      <polygon points="27,6 48,20 27,28" fill={tr} />
      <polygon points="27,6 6,20 27,28" fill={tl} />
      <polygon points="27,48 48,34 27,28" fill={br} />
      <polygon points="27,48 6,34 27,28" fill={bl} />
    </svg>
  );
}

const TIERS: Tier[] = [
  {
    name: "Signature Status",
    reward: "Carisma Spa Day for two",
    threshold: "€1,000+ lifetime spend",
    gem: <Gem base="#C0C0C0" tl="#a8a8a8" tr="#d8d8d8" bl="#c8c8c8" br="#b0b0b0" />,
  },
  {
    name: "Elite Status",
    reward: "Signature Massage",
    threshold: "€2,500+ lifetime spend",
    popular: true,
    gem: <Gem base="#D4AF37" tl="#b8921c" tr="#e8ca60" bl="#dcc050" br="#c9a230" />,
  },
  {
    name: "Platinum Status",
    reward: "€300 Aesthetics Voucher",
    threshold: "€5,000+ lifetime spend",
    gem: <Gem base="#96b2b2" tl="#7da0a0" tr="#b2cccc" bl="#a0c4c4" br="#88b0b0" />,
  },
];

export default function MembershipSummary() {
  return (
    <section
      aria-labelledby="membership-summary-heading"
      style={{
        /* Slimming-style cool ground: white → light teal → soft mist */
        background:
          "linear-gradient(180deg, #ffffff 0%, var(--teal-100) 58%, var(--cream-2) 100%)",
        padding: "92px 0",
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
        .ms-tier:hover {
          box-shadow: 0 4px 10px rgba(12,11,11,0.08), 0 24px 52px -16px rgba(64,96,96,0.40);
        }
        @media (prefers-reduced-motion: no-preference) {
          .ms-card:hover, .ms-tier:hover { transform: translateY(-6px) scale(1.02); }
        }
      `}</style>

      <div className="container">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="mx-auto text-center" style={{ maxWidth: "760px" }}>
          <p
            aria-hidden="true"
            style={{
              fontFamily: WIDE,
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: TEAL_TEXT,
              margin: 0,
            }}
          >
            The Glow Club · Membership
          </p>
          <div
            aria-hidden="true"
            className="mx-auto"
            style={{
              width: "70px",
              height: "1px",
              background: TEAL_DEEP,
              opacity: 0.45,
              margin: "14px auto 0",
            }}
          />
          <h2
            id="membership-summary-heading"
            className="font-serif"
            style={{
              fontSize: "clamp(26px,3.6vw,40px)",
              color: GOLD,
              fontWeight: 400,
              lineHeight: 1.25,
              letterSpacing: "0.05em",
              margin: "18px auto 0",
            }}
          >
            Save as you go, glow as you grow
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: LABEL,
              lineHeight: 1.7,
              margin: "18px auto 0",
              maxWidth: "600px",
            }}
          >
            One simple monthly membership. Save a little each month into your Glow
            balance, then spend it on the treatments and products you love — with
            exclusive member discounts that apply from day one.
          </p>
        </div>

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
                background: "linear-gradient(180deg, #ffffff 0%, #eef3f3 100%)",
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
                  color: LABEL,
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

        {/* ── Tier snapshot ──────────────────────────────────────── */}
        <p
          aria-hidden="true"
          className="text-center"
          style={{
            fontFamily: WIDE,
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: TEAL_TEXT,
            margin: "64px 0 0",
          }}
        >
          Member status, the more you grow
        </p>
        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-3 mx-auto"
          style={{
            gap: "20px",
            listStyle: "none",
            padding: 0,
            margin: "24px auto 0",
            maxWidth: "920px",
            alignItems: "stretch",
          }}
          aria-label="Glow Club membership status tiers"
        >
          {TIERS.map((t) => {
            const dark = !!t.popular;
            const headingId = `ms-tier-${t.name.replace(/\s+/g, "-").toLowerCase()}`;
            return (
              <li
                key={t.name}
                className="ms-tier"
                aria-labelledby={headingId}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  background: dark ? POPULAR_BG : "#ffffff",
                  border: dark ? `1px solid ${TEAL_DEEP}` : "1px solid #e4eded",
                  borderRadius: "18px",
                  padding: dark ? "40px 24px 30px" : "32px 24px 30px",
                  boxShadow: dark
                    ? "0 18px 44px -20px rgba(64,96,96,0.55)"
                    : "0 8px 24px -18px rgba(64,96,96,0.30)",
                  transition: "box-shadow .3s ease, transform .3s ease",
                }}
              >
                {t.popular && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-12px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: RIBBON_BG,
                      color: INK,
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      padding: "5px 15px",
                      borderRadius: "999px",
                      whiteSpace: "nowrap",
                      boxShadow: "0 4px 12px -4px rgba(0,0,0,0.30)",
                    }}
                  >
                    Most popular
                  </span>
                )}

                <span aria-hidden="true" style={{ marginTop: dark ? 0 : "4px" }}>
                  {t.gem}
                </span>
                <h3
                  id={headingId}
                  className="font-display"
                  style={{
                    fontSize: "12px",
                    color: dark ? "#ffffff" : TEAL_TEXT,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    margin: "14px 0 0",
                  }}
                >
                  {t.name}
                </h3>

                <p
                  className="font-serif"
                  style={{
                    fontSize: "19px",
                    color: dark ? "#ffffff" : GOLD,
                    fontWeight: 600,
                    lineHeight: 1.3,
                    margin: "16px 0 0",
                  }}
                >
                  {t.reward}
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: dark ? "#ffffff" : LABEL,
                    opacity: dark ? 0.95 : 1,
                    fontWeight: 600,
                    margin: "4px 0 0",
                  }}
                >
                  Complimentary
                </p>
                <span
                  aria-hidden="true"
                  style={{
                    width: "40px",
                    height: "1px",
                    background: dark ? "rgba(255,255,255,0.45)" : TEAL_DEEP,
                    opacity: dark ? 1 : 0.4,
                    margin: "14px auto",
                  }}
                />
                <p
                  style={{
                    fontSize: "13px",
                    color: dark ? "#ffffff" : LABEL,
                    fontWeight: 500,
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {t.threshold}
                </p>
              </li>
            );
          })}
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
