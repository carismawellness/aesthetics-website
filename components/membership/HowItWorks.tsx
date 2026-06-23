/* ──────────────────────────────────────────────────────────────────────────
   HowItWorks — Glow Club "How It Works" vertical step timeline.

   CRO model: borrowed from the Carisma Slimming StepTimeline (dashed spine ·
   dot · big "STEP N" · soft petal card), restyled into the Aesthetics cool
   sage-teal + taupe-gold palette. Three steps — Contribute, Save, Spend —
   with the real Glow Club copy and a worked example per step, closing on the
   primary "Join the Glow Club" CTA → /membership/join.

   Self-contained: default export, no required props, all content baked in.
   Server component (no client JS). Every text/UI pair verified WCAG 2.2 AA
   via scripts/contrast.mjs.
   ────────────────────────────────────────────────────────────────────────── */

const SERIF = "var(--font-serif), Trajan Pro, serif";
const WIDE = "var(--font-display), Novecento Wide, sans-serif";

const TEAL_DEEP = "#4f7373"; // step number circle (accent) — WHITE on it = 5.21:1
const TEAL_TEXT = "#406060"; // "STEP" label + accents — accent text
const GOLD = "#706552"; // card subheading taupe-gold on white = 5.72:1
const LABEL = "#695c4e"; // body taupe on white = 6.48:1
const RING = "#f7fafa"; // warm ivory ring behind the step badge (was teal mist)
const DASH = "#bcae9a"; // decorative spine, warm taupe (UI graphic, non-text)

type Step = {
  word: string; // short timeline label (CONTRIBUTE / SAVE / SPEND)
  sub: string; // card subheading
  desc: string; // body
  eg: string; // worked example
};

const STEPS: Step[] = [
  {
    word: "Contribute",
    sub: "Select your monthly contribution amount",
    desc: "Choose an amount you would like to deposit each month into your Glow balance.",
    eg: "If you choose to subscribe at €40, you will automatically be investing this amount each month.",
  },
  {
    word: "Save",
    sub: "Grow your balance",
    desc: "Let your balance grow with your monthly contributions as you save up to spend on any of our services and products.",
    eg: "Your Glow balance will grow over time, accumulating €240 in 6 months if you deposit €40 each month.",
  },
  {
    word: "Spend",
    sub: "Enjoy exclusive member discounts",
    desc: "Enjoy your member exclusive 10% discount on all services and 15% on all products as you spend your Glow credit.",
    eg: "Purchase your mid-yearly botox session at a 10% discount without having to pay the full amount at once.",
  },
];

const cardStyle: React.CSSProperties = {
  borderRadius: "18px 44px 18px 44px",
  background: "rgba(255,255,255,0.78)",
  backdropFilter: "blur(2px)",
  boxShadow: "0 16px 38px rgba(79,115,115,0.10)",
  border: "1px solid rgba(79,115,115,0.10)",
  padding: "22px 26px",
};

function Card({ s, n }: { s: Step; n: number }) {
  return (
    <div style={cardStyle}>
      <h3
        style={{
          fontFamily: WIDE,
          fontSize: 14,
          color: GOLD,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          lineHeight: 1.5,
          margin: "0 0 10px",
        }}
      >
        <span className="sr-only">Step {n}: </span>
        {s.sub}
      </h3>
      <p style={{ fontSize: 14.5, color: LABEL, lineHeight: 1.7, margin: 0 }}>
        {s.desc}
      </p>
      <p style={{ fontSize: 14, color: LABEL, lineHeight: 1.7, margin: "14px 0 0" }}>
        <span
          style={{
            fontFamily: WIDE,
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: TEAL_TEXT,
          }}
        >
          Example
        </span>{" "}
        — {s.eg}
      </p>
    </div>
  );
}

function StepBadge({ n }: { n: number }) {
  return (
    <span
      className="flex items-center justify-center font-serif"
      aria-hidden="true"
      style={{
        width: 64,
        height: 64,
        borderRadius: "50%",
        background: TEAL_DEEP,
        color: "#ffffff",
        fontFamily: SERIF,
        fontSize: 32,
        lineHeight: 1,
        boxShadow: `0 0 0 6px ${RING}`,
        flexShrink: 0,
      }}
    >
      {n}
    </span>
  );
}

export default function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      style={{ background: "transparent", padding: "76px 0" }}
    >
      <div className="container">
        {/* ── Header ── */}
        <div className="mx-auto text-center" style={{ maxWidth: 680 }}>
          <p
            style={{
              fontFamily: WIDE,
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: TEAL_TEXT,
              margin: "0 0 14px",
            }}
          >
            How the Glow Club works
          </p>
          <h2
            id="how-it-works-heading"
            className="font-serif"
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(28px, 4.5vw, 40px)",
              color: TEAL_DEEP,
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Three simple steps to glow for less
          </h2>
          <p
            style={{
              fontSize: 16,
              color: LABEL,
              lineHeight: 1.7,
              margin: "18px auto 0",
              maxWidth: 560,
            }}
          >
            Save a little each month into your Glow balance, then spend it at
            member-only prices on the treatments and products you already love.
          </p>
        </div>

        {/* ── Desktop timeline ── */}
        <div
          className="relative mx-auto hidden md:block"
          style={{ maxWidth: 780, marginTop: 56 }}
        >
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 31,
              top: 50,
              bottom: 50,
              borderLeft: `2px dashed ${DASH}`,
              zIndex: 0,
            }}
          />
          {STEPS.map((s, i) => (
            <div
              key={s.word}
              className="relative grid items-center"
              style={{
                gridTemplateColumns: "64px 210px minmax(0, 1fr)",
                columnGap: 48,
                marginBottom: i === STEPS.length - 1 ? 0 : 32,
              }}
            >
              <div
                className="flex justify-center"
                style={{ position: "relative", zIndex: 2 }}
              >
                <StepBadge n={i + 1} />
              </div>
              <div
                className="text-center"
                aria-hidden="true"
                style={{ position: "relative", zIndex: 2, paddingRight: 4 }}
              >
                <div
                  style={{
                    fontFamily: WIDE,
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: TEAL_TEXT,
                  }}
                >
                  Step {i + 1}
                </div>
                <div
                  style={{
                    fontFamily: SERIF,
                    fontSize: "clamp(17px, 1.7vw, 21px)",
                    color: GOLD,
                    lineHeight: 1.2,
                    marginTop: 4,
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {s.word}
                </div>
              </div>
              <Card s={s} n={i + 1} />
            </div>
          ))}
        </div>

        {/* ── Mobile timeline ── */}
        <div className="md:hidden mx-auto" style={{ maxWidth: 480, marginTop: 44 }}>
          {STEPS.map((s, i) => (
            <div
              key={s.word}
              style={{ marginBottom: i === STEPS.length - 1 ? 0 : 26 }}
            >
              <div
                className="flex items-center gap-3"
                style={{ marginBottom: 14 }}
              >
                <StepBadge n={i + 1} />
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: SERIF,
                    fontSize: 18,
                    color: GOLD,
                    letterSpacing: "0.04em",
                  }}
                >
                  {s.word}
                </span>
              </div>
              <Card s={s} n={i + 1} />
            </div>
          ))}
        </div>

        {/* ── Closing CTA ── */}
        <div className="text-center" style={{ marginTop: 52 }}>
          <a href="/membership/join" className="btn btn-teal">
            Join the Glow Club
          </a>
          <p
            style={{
              fontSize: 13.5,
              color: LABEL,
              lineHeight: 1.6,
              margin: "16px auto 0",
              maxWidth: 480,
            }}
          >
            Your first month is non-refundable, but it&rsquo;s fully credited
            toward your second procedure — so every euro keeps working for you.
          </p>
        </div>
      </div>
    </section>
  );
}
