"use client";

import { useId, useState } from "react";
import Image from "next/image";
import SectionHeader from "@/components/treatment/SectionHeader";
import Reveal from "@/components/Reveal";

/*
  EvidenceCards — a responsive grid of clinical-evidence cards for the Carisma
  Aesthetics treatment template. Client component because each card has an
  expandable "Key results" block (Read more / Show less toggle).

  Harvested from the "Research" section of MedicalWeightLossPage (image → pill →
  "WHAT IT DOES" → toggled "KEY RESULTS" with citation) and restyled to the
  shared aesthetics light palette (design tokens): fronted by <SectionHeader>,
  then a 1 / 2 / 3-column grid of white cards (--radius-card, hairline border,
  soft teal shadow). Each card carries an "EVIDENCE" tag pill (var(--teal-deep)
  bg, white text), a Trajan/var(--gold) title, a "What it does" line, and an
  expandable "Key results" block with an optional source citation in small muted
  text. Hover lift is gated behind prefers-reduced-motion.
*/

type EvidenceItem = {
  tag?: string;
  title: string;
  whatItDoes: string;
  keyResults: string;
  image?: string;
  source?: string;
};

type Props = {
  kicker?: string;
  title?: string;
  sub?: string;
  items: EvidenceItem[];
};

function EvidenceCard({ item }: { item: EvidenceItem }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const tag = item.tag ?? "Evidence";

  return (
    <div
      className="evidence-card"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "var(--white)",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius-card)",
        boxShadow: "0 10px 28px rgba(var(--teal-deep-rgb), 0.10)",
        overflow: "hidden",
        transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
      }}
    >
      {item.image && (
        <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 10", background: "var(--teal-100)" }}>
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 33vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "clamp(22px, 2.4vw, 28px)" }}>
        {/* EVIDENCE tag pill */}
        <span
          className="font-display"
          style={{
            alignSelf: "flex-start",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "var(--white)",
            background: "var(--teal-deep)",
            padding: "6px 14px",
            borderRadius: "var(--radius-pill)",
            marginBottom: 16,
          }}
        >
          {tag}
        </span>

        {/* Card title — Trajan / gold */}
        <h3
          className="font-serif"
          style={{
            fontSize: "clamp(17px, 1.9vw, 20px)",
            color: "var(--gold)",
            letterSpacing: "0.03em",
            textTransform: "uppercase",
            fontWeight: 400,
            lineHeight: 1.3,
            margin: "0 0 16px",
            textWrap: "balance",
          }}
        >
          {item.title}
        </h3>

        {/* What it does */}
        <p
          className="font-display"
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--teal-text)",
            fontWeight: 600,
            margin: "0 0 8px",
          }}
        >
          What it does
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ink-soft)", margin: 0, textWrap: "pretty" }}>
          {item.whatItDoes}
        </p>

        {/* Key results — expandable */}
        <div id={panelId} hidden={!open} style={{ marginTop: 18 }}>
          <p
            className="font-display"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--teal-text)",
              fontWeight: 600,
              margin: "0 0 8px",
            }}
          >
            Key results
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ink-soft)", margin: 0, textWrap: "pretty" }}>
            {item.keyResults}
          </p>
          {item.source && (
            <p style={{ fontSize: 12, lineHeight: 1.6, color: "var(--label)", margin: "12px 0 0" }}>
              Source: {item.source}
            </p>
          )}
        </div>

        {/* Toggle — pinned to the bottom so card footers align across the grid */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          className="font-display"
          style={{
            alignSelf: "flex-start",
            marginTop: "auto",
            paddingTop: 18,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "var(--teal-text)",
            fontSize: 12.5,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          {open ? "Show less" : "Read more"}
        </button>
      </div>
    </div>
  );
}

export default function EvidenceCards({
  kicker = "Backed by science",
  title = "The Evidence",
  sub,
  items,
}: Props) {
  if (!items?.length) return null;

  return (
    <section style={{ padding: "clamp(72px,9vh,112px) 0", background: "var(--white)" }}>
      <div className="container">
        <SectionHeader kicker={kicker} title={title} sub={sub} />

        {/* Responsive 1 / 2 / 3-up grid; hover lift gated behind reduced-motion. */}
        <style>{`
          .evidence-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: clamp(20px, 2.4vw, 28px);
            max-width: 1120px;
            margin: clamp(40px, 5vw, 56px) auto 0;
            align-items: stretch;
          }
          @media (min-width: 640px) {
            .evidence-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          @media (min-width: 1000px) {
            .evidence-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          }
          @media (prefers-reduced-motion: no-preference) {
            .evidence-card:hover,
            .evidence-card:focus-within {
              transform: translateY(-4px);
              box-shadow: 0 22px 46px rgba(var(--teal-deep-rgb), 0.18);
              border-color: rgba(var(--teal-deep-rgb), 0.35);
            }
          }
        `}</style>

        <div className="evidence-grid">
          {items.map((item, i) => (
            <Reveal key={`${item.title}-${i}`} delay={Math.min(i, 3) * 80}>
              <EvidenceCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
