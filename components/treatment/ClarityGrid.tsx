import SectionHeader from "@/components/treatment/SectionHeader";
import Reveal from "@/components/Reveal";

/*
  ClarityGrid — an honest, expectation-setting "what it does / what it won't do"
  section for the Carisma Aesthetics treatment template. Server component (no
  client state).

  Harvested from the "Clarity" section of MedicalWeightLossPage (the ✓/✗ ticked
  lists) and restyled to the shared aesthetics light palette (design tokens):
  fronted by <SectionHeader>, then TWO side-by-side light cards — a reassuring
  green/teal ✓ "what it does" column and a muted ✗ "what it won't do" column.
  Cards are white on a teal-tinted ground, --radius-card, soft teal shadow.
  Stacks to a single column on mobile. No hover motion (static, calm section).
*/

type Props = {
  kicker?: string;
  title?: string;
  sub?: string;
  does: string[];
  doesnt: string[];
};

function TickIcon({ kind }: { kind: "check" | "cross" }) {
  // ✓ in accessible deep teal (AA on white); ✗ in muted taupe label colour.
  const stroke = kind === "check" ? "var(--teal-deep)" : "var(--label)";
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ flexShrink: 0, marginTop: 2 }}
    >
      {kind === "check" ? <path d="M4 12.5l5 5L20 6" /> : <path d="M6 6l12 12M18 6L6 18" />}
    </svg>
  );
}

function ClarityCard({
  kind,
  heading,
  items,
}: {
  kind: "check" | "cross";
  heading: string;
  items: string[];
}) {
  const accent = kind === "check" ? "var(--teal-deep)" : "var(--label)";
  return (
    <div
      style={{
        height: "100%",
        background: "var(--white)",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius-card)",
        boxShadow: "0 14px 34px rgba(var(--teal-deep-rgb), 0.10)",
        padding: "clamp(26px, 3vw, 38px)",
      }}
    >
      <div
        className="flex items-center"
        style={{
          gap: 12,
          paddingBottom: 18,
          marginBottom: 22,
          borderBottom: "1px solid var(--line)",
        }}
      >
        <TickIcon kind={kind} />
        <h3
          className="font-display"
          style={{
            fontSize: 14,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: accent,
            fontWeight: 600,
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {heading}
        </h3>
      </div>

      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {items.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="flex items-start"
            style={{ gap: 12, marginBottom: i === items.length - 1 ? 0 : 16 }}
          >
            <TickIcon kind={kind} />
            <span
              style={{
                fontSize: 15,
                lineHeight: 1.65,
                color: "var(--ink-soft)",
                textWrap: "pretty",
              }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ClarityGrid({
  kicker = "Honest expectations",
  title = "What it does, and what it won't",
  sub,
  does,
  doesnt,
}: Props) {
  return (
    <section style={{ padding: "clamp(44px,8vw,80px) 0", background: "linear-gradient(180deg, #ffffff 0%, var(--teal-100) 50%, #ffffff 100%)" }}>
      <div className="container">
        <SectionHeader kicker={kicker} title={title} sub={sub} />

        <Reveal>
          {/* Two side-by-side cards; stacks to one column under 720px. */}
          <style>{`
            .clarity-grid {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: clamp(20px, 2.4vw, 32px);
              max-width: 960px;
              margin: clamp(40px, 5vw, 56px) auto 0;
              align-items: stretch;
            }
            @media (max-width: 720px) {
              .clarity-grid { grid-template-columns: 1fr; }
            }
          `}</style>
          <div className="clarity-grid">
            <ClarityCard kind="check" heading="What it does" items={does} />
            <ClarityCard kind="cross" heading="What it won't do" items={doesnt} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
