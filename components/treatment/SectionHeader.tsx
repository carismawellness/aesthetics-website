import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

/**
 * SectionHeader — treatment/package-page section header. Now a thin wrapper over
 * the site-wide <SectionHeading> so every treatment-page section uses the ONE
 * standardised title structure (eyebrow → 64px rule → Trajan uppercase H2 → sub).
 * Props are unchanged so existing call sites keep working.
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
      <div style={{ maxWidth: centered ? 720 : undefined, marginInline: centered ? "auto" : undefined }}>
        <SectionHeading eyebrow={kicker} title={title} subtitle={sub} align={align} id={id} />
      </div>
    </Reveal>
  );
}
