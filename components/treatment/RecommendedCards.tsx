"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/treatment/SectionHeader";

/**
 * RecommendedCards — an elegant "Recommended With [treatment]" cross-sell row for
 * the Carisma Aesthetics treatment template.
 *
 * The card is a re-skin of the Carisma SLIMMING "Evidence-Based Clinical Approach"
 * card: a photo with the signature asymmetric `20px 80px` radius + 2px teal border,
 * a floating "Recommended" pill overhanging the top-left corner, and a body panel
 * that overlaps up onto the photo. Recoloured to aesthetics teal tokens and
 * repurposed to surface a recommended TREATMENT (image, name, optional blurb,
 * "Explore ›"), the whole card an accessible <Link>.
 *
 * Cards NEVER wrap to a second row: they live in a single windowed row paginated by
 * circular ‹ › arrows (same control pattern as ReviewsCarousel), responsive 1 / 2 /
 * 3-up. The body fill is an intentionally faint white→teal wash so it reads elegant,
 * not heavy.
 */

type RecommendedItem = {
  label: string;
  href: string;
  image: string;
  desc?: string;
};

type Props = {
  kicker?: string;
  title?: string;
  sub?: string;
  items: RecommendedItem[];
};

function RecommendedCard({ item }: { item: RecommendedItem }) {
  return (
    <Link
      href={item.href}
      className="rec-card"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        paddingTop: 16,
        textDecoration: "none",
      }}
    >
      {/* Photo + floating eyebrow pill — slimming Evidence shape: asymmetric
          20px 80px radius, 2px teal border, badge overhanging the top-left. */}
      <div style={{ position: "relative", width: "92%", margin: "0 auto", zIndex: 2 }}>
        <div
          className="rec-card__photo"
          style={{
            position: "relative",
            height: 186,
            border: "2px solid var(--teal)",
            borderRadius: "20px 80px",
            overflow: "hidden",
            background: "var(--teal-100)",
            transition: "border-color 0.25s ease",
          }}
        >
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(max-width: 720px) 92vw, (max-width: 1080px) 46vw, 30vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <span
          className="font-display"
          style={{
            position: "absolute",
            top: -14,
            left: 18,
            background: "var(--teal-deep)",
            color: "var(--white)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            padding: "7px 16px",
            borderRadius: "var(--radius-pill)",
            whiteSpace: "nowrap",
          }}
        >
          Recommended
        </span>
      </div>

      {/* Body panel — overlaps up onto the photo. Faint white→teal wash (kept
          deliberately subtle) + hairline border + soft teal shadow. */}
      <div
        className="rec-card__body"
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          marginTop: -70,
          padding: "88px 28px 28px",
          background: "linear-gradient(180deg, #ffffff 0%, rgba(238, 243, 243,0.5) 100%)",
          border: "1px solid var(--line)",
          borderRadius: "var(--radius-card)",
          boxShadow: "0 8px 22px rgba(var(--teal-deep-rgb), 0.07)",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        }}
      >
        <h3
          className="font-serif"
          style={{
            fontSize: "clamp(17px, 1.9vw, 20px)",
            color: "var(--gold)",
            letterSpacing: "0.03em",
            fontWeight: 400,
            lineHeight: 1.3,
            margin: 0,
            textWrap: "balance",
          }}
        >
          {item.label}
        </h3>

        <div
          aria-hidden
          style={{ width: 64, height: 1, background: "var(--line)", margin: "16px auto 0" }}
        />

        {item.desc && (
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: "var(--ink-soft)",
              margin: "16px 0 0",
              textWrap: "pretty",
            }}
          >
            {item.desc}
          </p>
        )}

        <span
          className="rec-card__explore font-display"
          style={{
            alignSelf: "center",
            marginTop: "auto",
            paddingTop: 18,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: "var(--teal-text)",
            fontSize: 12.5,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <span className="rec-card__explore-text">Explore</span>
          <span aria-hidden style={{ fontSize: 14, lineHeight: 1 }}>
            ›
          </span>
        </span>
      </div>
    </Link>
  );
}

function Arrow({
  dir,
  onClick,
  disabled,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={dir === "prev" ? "Previous treatments" : "Next treatments"}
      onClick={onClick}
      disabled={disabled}
      className="rec-arrow"
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "#ffffff",
        border: "1px solid rgba(var(--teal-deep-rgb), 0.35)",
        color: "var(--teal-deep)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.35 : 1,
        boxShadow: "0 6px 18px rgba(var(--teal-deep-rgb), 0.18)",
        transition: "transform 0.25s ease, background 0.25s ease",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        {dir === "prev" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}

export default function RecommendedCards({
  kicker,
  title = "Recommended with",
  sub,
  items,
}: Props) {
  const [visible, setVisible] = useState(3);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const update = () =>
      setVisible(window.innerWidth < 640 ? 1 : window.innerWidth < 1000 ? 2 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const count = items?.length ?? 0;
  useEffect(() => {
    setIdx((i) => (count ? ((i % count) + count) % count : 0));
  }, [count]);

  if (!count) return null;

  const hasOverflow = count > visible;
  // Infinite loop: wrap the index modulo the item count so paging past the end
  // continues with the first cards again (never dead-ends / disables an arrow).
  const go = (d: number) => setIdx((i) => ((i + d) % count + count) % count);
  const window_ = hasOverflow
    ? Array.from({ length: visible }, (_, i) => items[(idx + i) % count])
    : items;
  // Number of columns actually rendered — never more than the cards shown, so a
  // short list (e.g. 2 recommendations) stays centred instead of hugging the left.
  const cols = Math.min(visible, count);
  // Shrink the row container proportionally to the column count so cards keep
  // their normal ~1/3 width and the group centres (via mx-auto) instead of
  // stretching to fill the full 3-column width.
  const rowMaxWidth = Math.round((1120 / 3) * cols);

  return (
    <section style={{ padding: "clamp(44px,8vw,80px) 0", background: "var(--white)" }}>
      <style>{`
        .rec-card__explore-text {
          background-image: linear-gradient(var(--teal-text), var(--teal-text));
          background-repeat: no-repeat;
          background-position: 0 100%;
          background-size: 0% 1px;
          transition: background-size 0.25s ease;
          padding-bottom: 2px;
        }
        .rec-arrow:focus-visible {
          outline: 2px solid var(--teal-deep);
          outline-offset: 2px;
          border-radius: 50%;
        }
        @media (prefers-reduced-motion: no-preference) {
          .rec-card:hover .rec-card__body,
          .rec-card:focus-visible .rec-card__body {
            transform: translateY(-4px);
            box-shadow: 0 18px 38px rgba(var(--teal-deep-rgb), 0.14);
            border-color: rgba(var(--teal-deep-rgb), 0.3);
          }
          .rec-card:hover .rec-card__photo,
          .rec-card:focus-visible .rec-card__photo {
            border-color: var(--teal-deep);
          }
          .rec-card:hover .rec-card__explore-text,
          .rec-card:focus-visible .rec-card__explore-text {
            background-size: 100% 1px;
          }
          .rec-arrow:not(:disabled):hover,
          .rec-arrow:not(:disabled):focus-visible {
            transform: scale(1.08);
            background: var(--teal-100);
          }
        }
      `}</style>

      <div className="container">
        <SectionHeader kicker={kicker} title={title} sub={sub} />

        <div className="relative mx-auto" style={{ maxWidth: rowMaxWidth, marginTop: "clamp(40px, 5vw, 56px)" }}>
          {/* Single row only — a windowed slice paginated by the arrows below,
              never wrapping to a second row. */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              gap: "clamp(20px, 2.4vw, 32px)",
              alignItems: "stretch",
              justifyContent: "center",
            }}
          >
            {window_.map((item, i) => (
              <RecommendedCard key={`${item.href}-${idx + i}`} item={item} />
            ))}
          </div>

          {/* Right-edge fade hint — there's always more to the right when looping */}
          {hasOverflow && (
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: 56,
                pointerEvents: "none",
                background: "linear-gradient(to right, rgba(255,255,255,0), var(--white))",
              }}
            />
          )}

          {hasOverflow && (
            <div className="flex items-center justify-center gap-4" style={{ marginTop: 32 }}>
              <Arrow dir="prev" onClick={() => go(-1)} disabled={false} />
              <Arrow dir="next" onClick={() => go(1)} disabled={false} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
