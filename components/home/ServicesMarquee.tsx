"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { HOME_SERVICES } from "@/lib/site";

/*
  Medical Aesthetics Procedures — premium treatment-card CLICK-THROUGH CAROUSEL.

  Reworked (Jun 2026) from a multi-row grid (stacked down the page) into a single
  horizontal carousel that mirrors the Slimming home "treatments" carousel
  (components/ModalitiesCarousel): a scroll-snap flex track that browses the cards
  side by side, white circular ‹/› arrow buttons, and a hidden scrollbar. The
  track loops INFINITELY: the cards are rendered twice and the scroll position
  is silently wrapped at each set boundary, so the arrows never disable and the
  scroll never dead-ends. Desktop shows ~3-4 cards + a peek; mobile shows ~1.2
  cards and swipes.

  The PREMIUM CARD DESIGN is preserved exactly: real treatment photo, the shared
  hover lift + image zoom (.svc-card / .svc-img), the "Explore" pill that fills
  teal with the button-shine line on hover, plus name + blurb. All 12 procedures
  and their treatment-page links come straight from HOME_SERVICES.

  Palette is brand teal only (#4f7373 / #406060 / #96b2b2 / #f7fafa), brown copy
  (#706552 / #695c4e), fonts Trajan (name) + Roboto (blurb) + Novecento (CTA).
*/

// One card advance per arrow click. Width + gap drive the scrollBy distance and
// the snap targets; mobile overrides the card width in CSS (see .svc-card rule).
const CARD_W = 320;
const GAP = 24;
const PAD = 24; // left/right breathing room inside the track

export default function ServicesMarquee() {
  const ref        = useRef<HTMLDivElement>(null);
  const lockedRef  = useRef(false);          // prevent stacking scrollBy calls
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Teleport-only sync — runs AFTER scrolling stops (debounced).
  // Never fires during an active smooth-scroll animation, so it can't
  // interrupt in-flight scrollBys and cause the jitter/freeze.
  const doSync = () => {
    const el = ref.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (half <= 0) return;
    if (el.scrollLeft >= half * 1.5) el.scrollLeft -= half;
    else if (el.scrollLeft < half * 0.5) el.scrollLeft += half;
  };

  const onScroll = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(doSync, 120);
  };

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.scrollLeft = el.scrollWidth / 2;
      el.addEventListener("scroll", onScroll, { passive: true });
    }
    return () => {
      if (el) el.removeEventListener("scroll", onScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Gate: ignore arrow clicks until the current smooth scroll finishes.
  // Smooth scroll for CARD_W + GAP takes ≈ 300-350 ms in all browsers.
  const scroll = (dir: 1 | -1) => {
    if (lockedRef.current) return;
    lockedRef.current = true;
    ref.current?.scrollBy({ left: dir * (CARD_W + GAP), behavior: "smooth" });
    setTimeout(() => { lockedRef.current = false; }, 380);
  };

  return (
    <section
      aria-labelledby="services-heading"
      style={{
        padding: "clamp(48px,6vw,88px) 0",
        background: "transparent",
      }}
    >
      {/* Scoped interaction styles — hover lift + image zoom + CTA fill/shine.
          color/bg are !important on hover so they beat the inline pill colour
          (otherwise teal text on a teal fill would be invisible). */}
      <style>{`
        .svc-card {
          transition: transform .4s cubic-bezier(.16,1,.3,1),
                      box-shadow .4s ease, border-color .3s ease;
        }
        .svc-img { transition: transform .55s cubic-bezier(.16,1,.3,1); }
        @media (prefers-reduced-motion: no-preference) {
          .svc-card:hover {
            transform: translateY(-6px) scale(1.02);
            border-color: var(--teal-deep);
            box-shadow: 0 4px 10px rgba(12,11,11,0.10),
                        0 26px 60px -12px rgba(28,30,30,0.22);
          }
          .svc-card:hover .svc-img { transform: scale(1.07); }
        }
        .svc-card:hover .svc-explore { background: var(--teal-deep) !important; color: #fff !important; }
        .svc-card:hover .svc-explore span { color: #fff !important; }
        /* CTA shine: a hairline grows from centre on hover (mirrors .btn::after). */
        .svc-explore::after {
          content: ""; position: absolute; left: 50%; bottom: 8px;
          width: 0; height: 2px; background: currentColor;
          transform: translateX(-50%); transition: width .3s ease; pointer-events: none;
        }
        .svc-card:hover .svc-explore::after { width: 46%; }
        /* Mobile: cards fit the viewport (~1.2 cards + a peek) instead of a fixed
           320px that overflows a phone; tighter side padding on the track. */
        @media (max-width: 640px) {
          .svc-track { padding-left: 16px !important; padding-right: 16px !important;
                       scroll-padding-left: 16px !important; }
          .svc-card { width: 82vw !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .svc-card, .svc-img, .svc-explore::after { transition: none !important; }
        }
      `}</style>

      <div className="container">
        <Reveal>
          <p
            className="font-display text-center"
            style={{
              fontSize: "12px",
              color: "var(--teal-text)",
              letterSpacing: "0.22em",
              fontWeight: 600,
              marginBottom: "14px",
            }}
          >
            Doctor-Led Treatments
          </p>
          <h2
            id="services-heading"
            className="font-serif text-center"
            style={{
              fontSize: "clamp(26px,3.4vw,40px)",
              color: "var(--teal-deep)",
              fontWeight: 400,
              letterSpacing: "0.04em",
              lineHeight: 1.15,
            }}
          >
            Our Medical Aesthetic Treatments
          </h2>
          <p
            className="text-center mx-auto"
            style={{
              maxWidth: "560px",
              marginTop: "16px",
              color: "var(--label)",
              fontSize: "15px",
              lineHeight: 1.65,
            }}
          >
            A complete menu of advanced, medically supervised treatments — each
            tailored to refresh, restore and let you glow with confidence.
          </p>
          <div
            aria-hidden="true"
            className="mx-auto"
            style={{
              width: "120px",
              height: "1.5px",
              background:
                "linear-gradient(90deg, transparent, var(--brand-teal), transparent)",
              marginTop: "26px",
              marginBottom: "clamp(40px,5vw,56px)",
            }}
          />
        </Reveal>
      </div>

      {/* Carousel — full-bleed so cards can peek off the container edges. */}
      <div className="relative">
        {/* Left arrow — always available (the track loops infinitely). */}
        {
          <button
            onClick={() => scroll(-1)}
            aria-label="Previous treatments"
            className="hidden md:flex items-center justify-center absolute z-20 transition-transform duration-300 ease-out hover:scale-[1.04] motion-reduce:transition-none motion-reduce:hover:scale-100"
            style={{
              left: "16px",
              top: "calc(50% - 26px)",
              width: "52px",
              height: "52px",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
              color: "var(--teal-text)",
              fontSize: "26px",
              lineHeight: 1,
              border: "none",
              cursor: "pointer",
              borderRadius: "999px",
            }}
          >
            ‹
          </button>
        }

        {/* Scroll-snap track */}
        <div
          ref={ref}
          className="svc-track flex overflow-x-auto [&::-webkit-scrollbar]:hidden"
          style={{
            gap: `${GAP}px`,
            scrollSnapType: "x proximity",
            scrollBehavior: "smooth",
            /* scroll-padding-left must match paddingLeft so snap targets are correct */
            scrollPaddingLeft: `${PAD}px`,
            scrollbarWidth: "none",
            paddingLeft: `${PAD}px`,
            paddingRight: `${PAD}px`,
            overscrollBehavior: "none",
          }}
        >
          {/* Cards rendered TWICE so the loop is seamless in both directions. */}
          {[...HOME_SERVICES, ...HOME_SERVICES].map((s, i) => (
            <Link
              key={`${s.href}-${i}`}
              href={s.href}
              className="svc-card group flex-shrink-0"
              aria-hidden={i >= HOME_SERVICES.length ? true : undefined}
              tabIndex={i >= HOME_SERVICES.length ? -1 : undefined}
              aria-label={`Learn more about ${s.label}`}
              style={{
                width: `${CARD_W}px`,
                display: "flex",
                flexDirection: "column",
                scrollSnapAlign: "start",
                background: "var(--white)",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-card)",
                overflow: "hidden",
                boxShadow:
                  "0 1px 2px rgba(12,11,11,0.04), 0 10px 28px rgba(12,11,11,0.07)",
                textDecoration: "none",
              }}
            >
              {/* Photo */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4 / 3",
                  overflow: "hidden",
                  background: "var(--teal-100)",
                }}
              >
                <Image
                  src={s.photo}
                  alt={`${s.label} treatment at Carisma Aesthetics Malta`}
                  fill
                  sizes="(max-width:640px) 82vw, 320px"
                  className="svc-img"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  loading="lazy"
                />
                {/* gentle bottom scrim so any future label/legibility holds */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(79,115,115,0) 55%, rgba(64,96,96,0.18) 100%)",
                  }}
                />
              </div>

              {/* Body */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  padding: "22px 22px 24px",
                }}
              >
                <h3
                  className="font-serif"
                  style={{
                    color: "var(--teal-deep)",
                    fontSize: "17px",
                    fontWeight: 400,
                    letterSpacing: "0.05em",
                    lineHeight: 1.25,
                    margin: "0 0 10px",
                  }}
                >
                  {s.label}
                </h3>
                <p
                  style={{
                    color: "var(--ink-soft)",
                    fontSize: "13.5px",
                    lineHeight: 1.6,
                    margin: "0 0 20px",
                    flex: 1,
                  }}
                >
                  {s.blurb}
                </p>
                <span
                  className="svc-explore font-display"
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    alignSelf: "flex-start",
                    minHeight: "44px",
                    padding: "12px 22px",
                    border: "1.5px solid var(--teal-deep)",
                    color: "var(--teal-deep)",
                    fontSize: "11px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    borderRadius: "var(--radius-pill)",
                    transition: "background 0.3s ease, color 0.3s ease",
                  }}
                >
                  Explore <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Right arrow — always available (the track loops infinitely). */}
        {
          <button
            onClick={() => scroll(1)}
            aria-label="Next treatments"
            className="hidden md:flex items-center justify-center absolute z-20 transition-transform duration-300 ease-out hover:scale-[1.04] motion-reduce:transition-none motion-reduce:hover:scale-100"
            style={{
              right: "16px",
              top: "calc(50% - 26px)",
              width: "52px",
              height: "52px",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
              color: "var(--teal-text)",
              fontSize: "26px",
              lineHeight: 1,
              border: "none",
              cursor: "pointer",
              borderRadius: "999px",
            }}
          >
            ›
          </button>
        }
      </div>
    </section>
  );
}
