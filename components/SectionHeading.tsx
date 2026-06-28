import type { CSSProperties, ReactNode } from "react";

/*
  SectionHeading — the single source of truth for every SECTION title on the
  site. Standardised to the Carisma "Slimming" proportions that ship on the
  homepage treatments carousel:

    • eyebrow  — Novecento (font-display), 12px, weight 700, 0.25em tracked, UPPERCASE
    • hairline — 64 x 1px rule
    • title    — Trajan (font-serif), clamp(22px,3vw,34px), weight 400, UPPERCASE,
                 0.03em tracked, line-height 1.25
    • subtitle — 16px, ink-soft, line-height 1.6, max-width 620

  Presentational + server-safe (no "use client"): wrap it in the existing
  <Reveal> if a section wants the scroll-in animation. Use this for SECTION
  headers (H2/H3) — NOT for page hero H1s, which have their own larger scale.

  `tone="dark"` flips the palette for sections that sit on a dark ground.
*/

type Tone = "light" | "dark";
type Align = "center" | "left";

export type SectionHeadingProps = {
  /** Small tracked label above the title (optional). */
  eyebrow?: ReactNode;
  /** The section title. Trajan renders it uppercase regardless. */
  title: ReactNode;
  /** Optional supporting line under the title. */
  subtitle?: ReactNode;
  /** Heading level — default h2. Never h1 here (heroes own the page h1). */
  as?: "h2" | "h3";
  /** id on the heading element (for aria-labelledby / anchors). */
  id?: string;
  align?: Align;
  tone?: Tone;
  /** Show the 64px hairline. Defaults to true when an eyebrow is present. */
  divider?: boolean;
  /** Max width of the subtitle measure. Default 620. */
  subtitleMaxWidth?: number;
  className?: string;
  style?: CSSProperties;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  as = "h2",
  id,
  align = "center",
  tone = "light",
  divider,
  subtitleMaxWidth = 620,
  className,
  style,
}: SectionHeadingProps) {
  const Heading = as;
  const showDivider = divider ?? Boolean(eyebrow);
  const center = align === "center";

  const c =
    tone === "dark"
      ? {
          eyebrow: "rgba(255,255,255,0.86)",
          rule: "rgba(255,255,255,0.5)",
          title: "#ffffff",
          subtitle: "rgba(255,255,255,0.82)",
        }
      : {
          eyebrow: "var(--teal-deep)",
          rule: "var(--teal-deep)",
          title: "var(--teal-deep)",
          subtitle: "var(--ink-soft)",
        };

  return (
    <div
      className={className}
      style={{ textAlign: center ? "center" : "left", ...style }}
    >
      {eyebrow ? (
        <p
          className="font-display"
          style={{
            margin: 0,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: c.eyebrow,
          }}
        >
          {eyebrow}
        </p>
      ) : null}

      {showDivider ? (
        <div
          aria-hidden="true"
          style={{
            width: 64,
            height: 1,
            background: c.rule,
            margin: center ? "16px auto 20px" : "16px 0 20px",
          }}
        />
      ) : null}

      <Heading
        id={id}
        className="font-serif"
        style={{
          margin: 0,
          fontSize: "clamp(22px,3vw,34px)",
          fontWeight: 400,
          letterSpacing: "0.03em",
          lineHeight: 1.25,
          textTransform: "uppercase",
          color: c.title,
        }}
      >
        {title}
      </Heading>

      {subtitle ? (
        <p
          style={{
            margin: center ? "18px auto 0" : "18px 0 0",
            maxWidth: subtitleMaxWidth,
            fontSize: 16,
            lineHeight: 1.6,
            color: c.subtitle,
          }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
