"use client";

import { useEffect, useState } from "react";
import SectionHeader from "@/components/treatment/SectionHeader";

/*
  ReviewsCarousel — a scroll/snap row of light review cards for the Carisma
  Aesthetics treatment template. Harvested from the HairRegrowthPage testimonial
  carousel (TESTIMONIALS + ReviewCard + visible-window state) but restyled to the
  shared aesthetics light palette (design tokens) and fronted by <SectionHeader>.

  Light cards only: white bg, --radius-card, soft teal shadow, gentle lift on hover
  (gated behind prefers-reduced-motion: no-preference). Responsive 1 / 2 / 3 up with
  circular ‹ › prev/next controls, a right-edge fade, and reduced-motion safety.
*/

type ReviewItem = {
  name: string;
  quote: string;
  rating?: number;
  image?: string;
  location?: string;
};

const PREVIEW_LEN = 150;

function Stars({ rating = 5 }: { rating?: number }) {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div
      className="flex justify-center gap-1"
      style={{ marginBottom: 12 }}
      role="img"
      aria-label={`${full} out of 5 stars`}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < full ? "var(--gold-deep)" : "var(--teal-200)"}
          aria-hidden
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ name, image }: { name: string; image?: string }) {
  const initial = name.trim().charAt(0).toUpperCase() || "•";
  return (
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: "50%",
        overflow: "hidden",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--teal-100)",
        border: "1px solid rgba(var(--teal-deep-rgb), 0.18)",
        margin: "0 auto",
      }}
      aria-hidden
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span
          className="font-serif"
          style={{ fontSize: 20, color: "var(--teal-deep)", fontWeight: 400 }}
        >
          {initial}
        </span>
      )}
    </div>
  );
}

function ReviewCard({ item }: { item: ReviewItem }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = item.quote.length > PREVIEW_LEN;
  const truncated = isLong && !expanded;
  return (
    <div
      className="rc-card"
      style={{
        background: "#ffffff",
        borderRadius: "var(--radius-card)",
        border: "1px solid rgba(var(--teal-deep-rgb), 0.15)",
        boxShadow: "0 10px 30px rgba(var(--teal-deep-rgb), 0.08)",
        padding: "26px 24px 24px",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        height: "100%",
        transition:
          "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      <Avatar name={item.name} image={item.image} />
      <div style={{ marginTop: 16 }}>
        <Stars rating={item.rating ?? 5} />
      </div>
      <p
        className="text-center"
        style={{
          fontSize: 14,
          color: "var(--ink-soft)",
          lineHeight: 1.7,
          flex: 1,
          textWrap: "pretty",
        }}
      >
        &ldquo;{truncated ? item.quote.slice(0, PREVIEW_LEN).trimEnd() + "…" : item.quote}&rdquo;
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="rc-readmore text-center"
          style={{
            marginTop: 12,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            color: "var(--teal-text)",
            textDecoration: "underline",
            textUnderlineOffset: 2,
            minHeight: 44,
          }}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
      <p
        className="font-display text-center"
        style={{
          fontSize: 12,
          color: "var(--teal-text)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 600,
          marginTop: 18,
        }}
      >
        {item.name}
      </p>
      {item.location && (
        <p
          className="text-center"
          style={{ fontSize: 12, color: "var(--ink-soft)", opacity: 0.8, marginTop: 4 }}
        >
          {item.location}
        </p>
      )}
    </div>
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
      aria-label={dir === "prev" ? "Previous reviews" : "Next reviews"}
      onClick={onClick}
      disabled={disabled}
      className="rc-arrow"
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

export default function ReviewsCarousel({
  kicker,
  title = "Real reviews",
  sub,
  items,
}: {
  kicker?: string;
  title?: string;
  sub?: string;
  items: ReviewItem[];
}) {
  const [visible, setVisible] = useState(3);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const update = () =>
      setVisible(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const count = items?.length ?? 0;
  // keep the index normalized in range when the item count changes
  useEffect(() => {
    setIdx((i) => (count ? ((i % count) + count) % count : 0));
  }, [count]);

  const hasOverflow = count > visible;
  // Infinite loop: wrap the index modulo the item count so paging past the end
  // continues with the first reviews again (never dead-ends / disables an arrow).
  const go = (d: number) => setIdx((i) => ((i + d) % count + count) % count);
  const window_ = hasOverflow
    ? Array.from({ length: visible }, (_, i) => items[(idx + i) % count])
    : items ?? [];

  if (!count) return null;

  return (
    <section style={{ padding: "clamp(44px,9vh,112px) 0" }}>
      <style>{`
        .rc-readmore:focus-visible,
        .rc-arrow:focus-visible {
          outline: 2px solid var(--teal-deep);
          outline-offset: 2px;
          border-radius: 4px;
        }
        @media (prefers-reduced-motion: no-preference) {
          .rc-card:hover {
            transform: translateY(-4px);
            border-color: rgba(var(--teal-deep-rgb), 0.55);
            box-shadow: 0 18px 40px rgba(var(--teal-deep-rgb), 0.16);
          }
          .rc-arrow:not(:disabled):hover,
          .rc-arrow:not(:disabled):focus-visible {
            transform: scale(1.08);
            background: var(--teal-100);
          }
        }
      `}</style>
      <div className="container">
        <SectionHeader kicker={kicker} title={title} sub={sub} />

        <div
          className="relative mx-auto"
          style={{ maxWidth: 1100, marginTop: 48 }}
        >
          {/* Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${visible}, minmax(0, 1fr))`,
              gap: 20,
            }}
          >
            {window_.map((item, i) => (
              <ReviewCard key={`${item.name}-${idx + i}`} item={item} />
            ))}
          </div>

          {/* Right-edge fade — there's always more to the right when looping */}
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
                background:
                  "linear-gradient(to right, rgba(255,255,255,0), #ffffff)",
              }}
            />
          )}

          {/* Prev / Next controls */}
          {hasOverflow && (
            <div
              className="flex items-center justify-center gap-4"
              style={{ marginTop: 32 }}
            >
              <Arrow dir="prev" onClick={() => go(-1)} disabled={false} />
              <Arrow dir="next" onClick={() => go(1)} disabled={false} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
