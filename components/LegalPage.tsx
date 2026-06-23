import type React from "react";

/* ============================================================
   Carisma Aesthetics — shared legal-page design system
   Used by /privacy-policy and /terms-conditions.
   Brand: teal #4f7373 / #406060 · gold #706552 · taupe label
   Fonts: Trajan Pro (serif headings) · Novecento Wide (eyebrow)
          Roboto (body). Tokens mirror app/globals.css.
   ============================================================ */

export const lp = {
  teal: "#4f7373", // accessible deep teal — headings / accents
  tealText: "#406060", // teal as small text / links (AA on white)
  tealHair: "#DEEBEB", // light teal hairlines
  tealTint: "#f7fafa", // warm ivory section background (was teal #fbfdfd)
  beigeBg: "#faf7f2", // warm card background
  gold: "#706552", // heading / nav text token
  taupe: "#695c4e", // muted label / body-strong
  body: "#4a4a4a", // body copy
  numWater: "rgba(79,115,115,0.07)",
  serif: 'Trajan Pro, "Trajan Pro Regular", Georgia, serif',
  wide: '"Novecento Wide", "Novecento Wide Book", sans-serif',
  sans: 'Roboto, "Roboto Local", system-ui, sans-serif',
} as const;

/* ── Shared text styles ──────────────────────────────────── */
export const labelStyle: React.CSSProperties = {
  fontFamily: lp.wide,
  fontSize: "11px",
  letterSpacing: "3px",
  textTransform: "uppercase",
  color: lp.tealText,
  fontWeight: 500,
  margin: 0,
};

export const bodyStyle: React.CSSProperties = {
  fontFamily: lp.sans,
  fontSize: "15.5px",
  lineHeight: 1.75,
  color: lp.body,
  marginBottom: "14px",
};

const headingStyle: React.CSSProperties = {
  fontFamily: lp.serif,
  fontWeight: 400,
  color: lp.teal,
  fontSize: "23px",
  lineHeight: "32px",
  margin: 0,
};

/* ── Body sub-components ─────────────────────────────────── */
export function P({ children }: { children: React.ReactNode }) {
  return <p style={bodyStyle}>{children}</p>;
}

export function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: lp.serif,
        fontWeight: 400,
        fontSize: "16px",
        color: lp.teal,
        letterSpacing: "0.3px",
        marginBottom: "10px",
        marginTop: "26px",
      }}
    >
      {children}
    </h3>
  );
}

export function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul style={{ paddingLeft: 0, marginBottom: "16px", listStyleType: "none" }}>
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            ...bodyStyle,
            marginBottom: "8px",
            paddingLeft: "20px",
            position: "relative",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              top: "9px",
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              backgroundColor: lp.teal,
              display: "inline-block",
            }}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ── Numbered section block ──────────────────────────────── */
export function SectionBlock({
  id,
  number,
  title,
  alt = false,
  children,
}: {
  id: string;
  number: string;
  title: string;
  alt?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} style={{ background: alt ? `linear-gradient(180deg, #ffffff 0%, ${lp.tealTint} 50%, #ffffff 100%)` : "#ffffff", scrollMarginTop: "120px" }}>
      <div
        className="mx-auto px-6 lg:px-0"
        style={{ maxWidth: "860px", paddingTop: "52px", paddingBottom: "52px" }}
      >
        <div style={{ position: "relative", marginBottom: "22px" }}>
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-14px",
              left: "-6px",
              fontSize: "72px",
              fontFamily: lp.serif,
              fontWeight: 400,
              color: lp.numWater,
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            {number}
          </span>
          <p style={{ ...labelStyle, marginBottom: "8px", position: "relative" }}>Section {number}</p>
          <h2 style={{ ...headingStyle, position: "relative" }}>{title}</h2>
          <div
            style={{
              width: "48px",
              height: "2px",
              backgroundColor: lp.tealHair,
              borderRadius: "1px",
              marginTop: "14px",
            }}
          />
        </div>
        {children}
      </div>
    </section>
  );
}

/* ── Hero ────────────────────────────────────────────────── */
export function LegalHero({
  eyebrow,
  title,
  tagline,
  lastUpdated,
}: {
  eyebrow: string;
  title: string;
  tagline: string;
  lastUpdated: string;
}) {
  return (
    <section style={{ background: "linear-gradient(180deg, #ffffff 0%, #f7fafa 50%, #ffffff 100%)", paddingTop: "104px", paddingBottom: "72px" }}>
      <div className="mx-auto px-6 lg:px-0 text-center" style={{ maxWidth: "860px" }}>
        <p style={{ ...labelStyle, color: lp.tealText, marginBottom: "20px" }}>{eyebrow}</p>
        <h1
          style={{
            fontFamily: lp.serif,
            fontWeight: 400,
            fontSize: "clamp(34px, 5vw, 50px)",
            lineHeight: 1.18,
            color: lp.teal,
            marginBottom: "20px",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontFamily: lp.sans,
            fontSize: "17px",
            lineHeight: 1.65,
            color: lp.body,
            maxWidth: "580px",
            margin: "0 auto 32px",
          }}
        >
          {tagline}
        </p>
        <span
          style={{
            display: "inline-block",
            backgroundColor: "rgba(238, 243, 243,0.7)",
            border: "1px solid rgba(79,115,115,0.40)",
            borderRadius: "999px",
            padding: "6px 20px",
            fontFamily: lp.sans,
            fontSize: "13px",
            color: lp.tealText,
            letterSpacing: "0.4px",
          }}
        >
          Last Updated: {lastUpdated}
        </span>
        <div
          style={{
            width: "48px",
            height: "1px",
            backgroundColor: "rgba(247, 250, 250,0.35)",
            margin: "40px auto 0",
          }}
        />
      </div>
    </section>
  );
}

/* ── Table of contents ───────────────────────────────────── */
export function LegalTOC({ items }: { items: { id: string; label: string }[] }) {
  return (
    <section style={{ backgroundColor: lp.beigeBg, borderBottom: `1px solid ${lp.tealHair}` }}>
      <div className="mx-auto px-6 lg:px-0" style={{ maxWidth: "860px", paddingTop: "44px", paddingBottom: "44px" }}>
        <p style={{ ...labelStyle, marginBottom: "20px" }}>Contents</p>
        <nav
          aria-label="Table of contents"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "6px 32px",
          }}
        >
          {items.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              style={{
                fontFamily: lp.sans,
                fontSize: "13.5px",
                color: lp.tealText,
                textDecoration: "none",
                padding: "5px 0",
                borderBottom: `1px solid ${lp.tealHair}`,
                display: "block",
              }}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}

/* ── Contact / footer call-out card ──────────────────────── */
export function LegalContactCard({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ background: `linear-gradient(180deg, #ffffff 0%, ${lp.tealTint} 50%, #ffffff 100%)` }}>
      <div className="mx-auto px-6 lg:px-0" style={{ maxWidth: "860px", paddingTop: "52px", paddingBottom: "72px" }}>
        <div
          style={{
            backgroundColor: "#ffffff",
            border: `1px solid ${lp.tealHair}`,
            borderRadius: "16px",
            padding: "36px 32px",
          }}
        >
          <p style={{ ...labelStyle, marginBottom: "10px" }}>{heading}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
