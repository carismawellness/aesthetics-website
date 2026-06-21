import React from "react";

type Variant = "pill" | "card" | "panel";

/**
 * Liquid Gloss surface — the navbar's frosted-glass recipe, systematised.
 * Use ONLY on floating elements (bars, cards, pills), never large sections.
 */
export default function GlossSurface({
  as: Tag = "div",
  variant = "card",
  solid = false,
  strong = false,
  className = "",
  style,
  children,
  ...rest
}: {
  as?: React.ElementType;
  variant?: Variant;
  solid?: boolean;
  strong?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const cls = [
    "lg",
    `lg--${variant}`,
    solid ? "lg--solid" : "",
    strong ? "lg--strong" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Tag className={cls} style={style} {...rest}>
      {children}
    </Tag>
  );
}
