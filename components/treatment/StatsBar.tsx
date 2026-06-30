/*
  StatsBar — a slim, scannable trust bar for the Carisma Aesthetics treatment
  template, designed to sit directly under the hero. Server component (no client
  state): each item shows a bold value (Trajan, --gold) over a small uppercase
  label (Novecento, --teal-text), evenly distributed across a subtle --teal-100
  band with thin divider rules between items. Wraps to a 2-column grid on mobile.
  Intentionally has no SectionHeader — it's a bar, not a titled section.
*/

type StatItem = { value: string; label: string };

export default function StatsBar({ items }: { items: StatItem[] }) {
  if (!items?.length) return null;

  return (
    <section style={{ padding: "clamp(44px,9vh,112px) 0" }}>
      <div className="container">
        <div
          style={{
            background: "var(--teal-100)",
            border: "1px solid var(--line)",
            borderRadius: "var(--radius-card)",
            padding: "clamp(22px,3.2vw,34px) clamp(18px,2vw,28px)",
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "26px 12px",
          }}
          className="stats-bar"
        >
          {/* On >=640px, fan out to one column per item so the bar reads as a
              single evenly-distributed row (set inline via the media block below). */}
          <style>{`
            @media (min-width: 640px) {
              .stats-bar {
                grid-template-columns: repeat(${items.length}, minmax(0, 1fr)) !important;
                gap: 0 !important;
              }
            }
          `}</style>

          {items.map((item, i) => (
            <div
              key={`${item.label}-${i}`}
              style={{
                position: "relative",
                textAlign: "center",
                padding: "4px clamp(12px,2vw,24px)",
                // hairline divider before every item except the first in its row
                borderLeft:
                  i === 0 ? "none" : "1px solid rgba(var(--teal-deep-rgb), 0.22)",
              }}
            >
              <div
                className="font-serif"
                style={{
                  fontSize: "clamp(24px,3.4vw,38px)",
                  color: "var(--gold)",
                  letterSpacing: "0.02em",
                  lineHeight: 1.1,
                  fontWeight: 400,
                }}
              >
                {item.value}
              </div>
              <div
                className="font-display"
                style={{
                  fontSize: 11,
                  color: "var(--teal-text)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginTop: 10,
                  lineHeight: 1.5,
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
