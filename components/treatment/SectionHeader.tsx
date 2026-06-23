import Reveal from "@/components/Reveal";

/**
 * SectionHeader — the one header pattern every treatment-page section uses
 * (ported from the Carisma Slimming design language): eyebrow → 64px rule →
 * Trajan uppercase H2 → optional sub. Keeps the whole template visually uniform.
 */
export default function SectionHeader({
  kicker,
  title,
  sub,
  align = "center",
  id,
}: {
  kicker?: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
  id?: string;
}) {
  const centered = align === "center";
  return (
    <Reveal>
      <div style={{ textAlign: centered ? "center" : "left", maxWidth: centered ? 720 : undefined, marginInline: centered ? "auto" : undefined }}>
        {kicker && (
          <p
            className="font-display"
            style={{ fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--teal-text)", fontWeight: 600, margin: "0 0 12px" }}
          >
            {kicker}
          </p>
        )}
        <h2
          id={id}
          className="font-serif"
          style={{ fontSize: "clamp(24px,3.4vw,38px)", color: "var(--gold)", letterSpacing: "0.04em", fontWeight: 400, lineHeight: 1.2, margin: 0, textWrap: "balance" }}
        >
          {title}
        </h2>
        <div
          aria-hidden
          style={{ width: 64, height: 1, background: "var(--teal-deep)", margin: centered ? "18px auto 0" : "18px 0 0" }}
        />
        {sub && (
          <p
            style={{ fontSize: 15.5, lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: centered ? 620 : 560, marginInline: centered ? "auto" : undefined, marginTop: 18, textWrap: "pretty" }}
          >
            {sub}
          </p>
        )}
      </div>
    </Reveal>
  );
}
