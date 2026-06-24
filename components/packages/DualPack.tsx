import Reveal from "@/components/Reveal";
import type { Treatment } from "@/lib/treatment-types";

type Props = { dualPack: NonNullable<Treatment["dualPack"]> };

export default function DualPack({ dualPack }: Props) {
  return (
    <section
      aria-labelledby="dual-heading"
      style={{ padding: "clamp(60px,7vh,88px) 0", background: "#ffffff" }}
    >
      <div className="container">
        <Reveal>
          <div className="mx-auto" style={{ maxWidth: 760 }}>
            {/* Heading */}
            <h2
              id="dual-heading"
              className="font-serif text-center"
              style={{
                fontSize: "clamp(24px,3.4vw,36px)",
                color: "var(--gold)",
                letterSpacing: "0.04em",
                lineHeight: 1.25,
                marginBottom: 36,
              }}
            >
              {dualPack.heading.map((line, i) => (
                <span key={i} style={{ display: "block" }}>{line}</span>
              ))}
            </h2>

            {/* Mini bullets */}
            {dualPack.mini.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2" style={{ marginBottom: 32 }}>
                {dualPack.mini.map((m) => (
                  <div
                    key={m.title}
                    style={{
                      borderRadius: "var(--radius-card)",
                      border: "1px solid var(--line)",
                      background: "linear-gradient(160deg,#eef4f5,#ffffff)",
                      padding: "20px 22px",
                    }}
                  >
                    <p
                      className="font-display"
                      style={{ fontSize: 11, color: "var(--teal-text)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 6 }}
                    >
                      {m.title}
                    </p>
                    <p style={{ fontSize: 13.5, color: "var(--label)", lineHeight: 1.6 }}>{m.body}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Includes list */}
            <ul style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
              {dualPack.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span aria-hidden="true" style={{ color: "var(--teal-text)", fontSize: 12, lineHeight: 1.7 }}>●</span>
                  <span style={{ fontSize: 14, color: "var(--label)", lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>

            {/* Pricing */}
            <div className="flex flex-wrap items-baseline gap-3" style={{ marginBottom: 10 }}>
              <span
                className="font-serif"
                style={{ fontSize: "clamp(28px,4vw,40px)", color: "var(--gold)", letterSpacing: "0.02em" }}
              >
                {dualPack.todayPrice}
              </span>
              <span style={{ fontSize: 16, color: "var(--muted)", textDecoration: "line-through" }}>
                {dualPack.totalValue}
              </span>
            </div>

            {/* Fineprint */}
            {dualPack.fineprint.map((line, i) => (
              <p key={i} style={{ fontSize: 11.5, color: "var(--muted)", lineHeight: 1.55, marginBottom: 4 }}>
                {line}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
