"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { gsap } from "gsap";

/* ────────────────────────────────────────────────────────────────
   Glow Club — detailed member benefits + EXCLUSIVE 10% member discount
   savings band.

   CRO pattern modelled on the Carisma Slimming home "what you get / proof"
   blocks (benefit roster with imagery → tangible savings proof → single
   clear CTA), re-skinned in the Carisma Aesthetics cool sage-teal +
   taupe-gold palette and written in Sarah's warm, confident, empowering
   voice ("Glow with Confidence").

   Every fact and figure extracted FAITHFULLY from the current
   components/MembershipPage.tsx — BENEFITS (~201-212), SAVINGS (~195-199)
   and the "*prices may vary over time" note (~808). Presentation
   restructured for conversion only; no facts or pricing changed.

   ── PREMIUM / ELITE MOTION LAYER (this file) ─────────────────────────
   The spend→save tier cards are elevated into refined "foil" cards:
   gold hairline + corner foil accents, elegant SPEND/SAVE hierarchy,
   premium spacing and layered depth. On scroll-into-view they perform a
   tasteful GSAP stagger reveal, and the € figures COUNT UP from 0 to
   their real values. Hover applies a subtle magnetic lift + 3D tilt
   (modelled on components/motion/Magnetic.tsx).

   SSR / performance / a11y safeguards:
     • 'use client' (motion needs the DOM) — markup is otherwise static,
       no server-only APIs; next/image + next/link are client-safe.
     • Motion is gated behind a single IntersectionObserver — it only
       runs once the band enters view, and only fires once.
     • prefers-reduced-motion → NO GSAP, NO count-up animation; the real
       final figures render immediately and the elegant static card design
       is shown as-is (graceful fallback, identical layout = no shift).
     • coarse pointers (touch) get no hover tilt/magnetic (free on mobile).
     • Layout reserves all space up-front; reveal only animates transform
       + opacity, so there is no layout shift / CLS.

   WCAG 2.2 AA verified with scripts/contrast.mjs on every text/UI pair:
     gold      #706552 on #ffffff → 5.72 · on #f3f8f8 → 5.34 · on #deebeb → 4.68
     teal-txt  #406060 on #ffffff → 6.86 · on #f3f8f8 → 6.40 · on #deebeb → 5.62
     label     #695c4e on #ffffff → 6.48 · on #f3f8f8 → 6.04
     teal-deep #3f6363 (icon/UI) on #f3f8f8 → 6.17 · on #deebeb → 5.41 (≥3 UI)
     gold-deep #9c8344 (foil hairline/graphic, UI/large only) on #fff → 3.66,
               on #f3f8f8 → 3.41 (both ≥3 UI; used only for decorative
               hairlines/badge graphics + ≥24px large foil ribbon text)
     white     #ffffff on .btn-teal #4f7373 → 5.21
   ──────────────────────────────────────────────────────────────── */

const A = "/assets/treatments";

const GOLD = "var(--gold)"; /* #706552 — headings / savings figures */
const GOLD_DEEP = "var(--gold-deep)"; /* #9c8344 — foil hairlines / graphics (UI/large) */
const TEAL_TEXT = "var(--teal-text)"; /* #406060 — body copy */
const LABEL = "var(--label)"; /* #695c4e — muted supporting text */
const TEAL_DEEP = "#3f6363"; /* teal-deep — icon strokes / hairlines (UI ≥3:1) */

type Benefit = {
  big: string;
  label: string;
  note?: string;
  icon: React.ReactNode;
};

/* Inline, decorative line icons — stroke = teal-deep on light grounds. */
const stroke = {
  fill: "none",
  stroke: TEAL_DEEP,
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* BENEFITS — faithful to MembershipPage.tsx (~201-212). */
const BENEFITS: Benefit[] = [
  {
    big: "10%* OFF",
    label: "aesthetics & spa services",
    note: "*individual treatments are discounted by 8–12%",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <path d="M19 5 5 19" />
        <circle cx="7.5" cy="7.5" r="2.2" />
        <circle cx="16.5" cy="16.5" r="2.2" />
      </svg>
    ),
  },
  {
    big: "15% OFF",
    label: "skincare products",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <path d="M9 3h6v3l1.5 1.5A3 3 0 0 1 17.5 10v8a3 3 0 0 1-3 3h-5a3 3 0 0 1-3-3v-8a3 3 0 0 1 1.5-2.6L9 6V3Z" />
        <path d="M6.5 12h11" />
      </svg>
    ),
  },
  {
    big: "#1 PRIORITY",
    label: "booking & scheduling",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <rect x="3.5" y="5" width="17" height="15" rx="2" />
        <path d="M3.5 9h17M8 3v4M16 3v4" />
        <path d="M9.5 14.5l1.7 1.7 3.3-3.6" />
      </svg>
    ),
  },
  {
    big: "1× YEAR",
    label: "complimentary consultation",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <path d="M12 3l2.1 4.3 4.7.7-3.4 3.3.8 4.7L12 14.9 7.8 16l.8-4.7L5.2 8l4.7-.7z" />
      </svg>
    ),
  },
  {
    big: "EXCLUSIVE",
    label: "events & open days",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <path d="M4 9V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2" />
        <path d="M4 9a2 2 0 1 1 0 4v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3a2 2 0 1 1 0-4" />
        <path d="M12 6v12" strokeDasharray="2 2.4" />
      </svg>
    ),
  },
  {
    big: "1× SPA DAY",
    label: "for every member you refer",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <path d="M12 20s-6.5-3.8-6.5-8.4A3.6 3.6 0 0 1 12 9a3.6 3.6 0 0 1 6.5 2.6C18.5 16.2 12 20 12 20Z" />
      </svg>
    ),
  },
];

/* SAVINGS — faithful to MembershipPage.tsx (~195-199).
   Numeric pair retained for the count-up; the rendered strings are
   reconstructed verbatim ("€1,000", "€100", …) so no displayed value
   changes vs the original. */
const SAVINGS = [
  { spendValue: 1000, saveValue: 100 },
  { spendValue: 2500, saveValue: 250 },
  { spendValue: 5000, saveValue: 500 },
];

/* "€1,000" exactly as before — explicit grouping, no locale surprises. */
function euro(n: number) {
  return "€" + Math.round(n).toLocaleString("en-US");
}

/* ── reduced-motion helper (matches Magnetic.tsx / GiftCardScene.tsx) ── */
function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function isCoarsePointer() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches
  );
}

/* ────────────────────────────────────────────────────────────────
   SavingsTierCard — a single elite "foil" tier card.
   • Animated count-up driven by GSAP (or instant under reduced-motion).
   • Magnetic lift + subtle 3D tilt on hover (fine pointers only).
   ──────────────────────────────────────────────────────────────── */
function SavingsTierCard({
  tier,
  index,
  active,
  featured,
}: {
  tier: (typeof SAVINGS)[number];
  index: number;
  active: boolean; // band has entered view → run count-up
  featured: boolean; // middle card gets a touch more presence
}) {
  const liRef = useRef<HTMLLIElement>(null);
  const spendRef = useRef<HTMLSpanElement>(null);
  const saveRef = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  /* Count-up: only when the band is active. Reduced-motion renders the
     final value immediately (and we never start a tween). */
  useEffect(() => {
    if (!active || counted.current) return;
    counted.current = true;

    const spendEl = spendRef.current;
    const saveEl = saveRef.current;
    if (!spendEl || !saveEl) return;

    if (prefersReducedMotion()) {
      spendEl.textContent = euro(tier.spendValue);
      saveEl.textContent = euro(tier.saveValue);
      return;
    }

    const obj = { spend: 0, save: 0 };
    const delay = 0.12 * index + 0.25; // follows the card reveal stagger
    const tween = gsap.to(obj, {
      spend: tier.spendValue,
      save: tier.saveValue,
      duration: 1.25,
      delay,
      ease: "power2.out",
      onUpdate: () => {
        spendEl.textContent = euro(obj.spend);
        saveEl.textContent = euro(obj.save);
      },
    });
    return () => {
      tween.kill();
    };
  }, [active, index, tier.spendValue, tier.saveValue]);

  /* Magnetic lift + 3D tilt on hover (fine pointers, motion allowed). */
  const onMove = (e: React.MouseEvent) => {
    const el = liRef.current;
    if (!el || prefersReducedMotion() || isCoarsePointer()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    gsap.to(el, {
      rotateX: -py * 4,
      rotateY: px * 4,
      y: -8,
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const onLeave = () => {
    const el = liRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
      overwrite: "auto",
    });
  };

  return (
    <li
      ref={liRef}
      className="glow-tier"
      data-featured={featured ? "true" : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        {
          // base reveal state — overridden to "in" by GSAP / reduced-motion
          opacity: 0,
          transform: "translateY(26px)",
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        } as CSSProperties
      }
    >
      {/* gold foil corner accents */}
      <span aria-hidden="true" className="glow-tier__corner glow-tier__corner--tl" />
      <span aria-hidden="true" className="glow-tier__corner glow-tier__corner--br" />

      <div className="glow-tier__inner">
        <p className="glow-tier__cap">Spend</p>
        <p className="glow-tier__fig glow-tier__fig--spend font-serif">
          <span ref={spendRef}>{euro(tier.spendValue)}</span>
        </p>
        <p className="glow-tier__sub">on services</p>

        {/* foil divider with diamond node */}
        <div aria-hidden="true" className="glow-tier__rule">
          <span className="glow-tier__node" />
        </div>

        <p className="glow-tier__cap glow-tier__cap--save">You save</p>
        <p className="glow-tier__fig glow-tier__fig--save font-serif">
          <span ref={saveRef}>{euro(tier.saveValue)}</span>
        </p>
        <p className="glow-tier__sub">annually</p>
      </div>
    </li>
  );
}

export default function Benefits() {
  /* Single in-view gate for the savings band (count-up + reveal stagger). */
  const bandRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = bandRef.current;
    if (!el) return;

    // Reduced motion: skip the reveal animation entirely, show final state.
    if (prefersReducedMotion()) {
      el.querySelectorAll<HTMLElement>(".glow-tier").forEach((c) => {
        c.style.opacity = "1";
        c.style.transform = "none";
      });
      setActive(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setActive(true);

        const cards = el.querySelectorAll<HTMLElement>(".glow-tier");
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.12,
          clearProps: "opacity", // leave transform managed for hover tilt
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="glow-benefits-heading"
      style={{ background: "transparent", padding: "clamp(64px,9vw,104px) 0" }}
    >
      {/* Scoped premium styling for the elite tier cards. */}
      <style>{`
        .glow-tier {
          position: relative;
          border-radius: 20px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(222, 235, 235,0.85) 100%);
          backdrop-filter: blur(2px);
          border: 1px solid rgba(79, 115, 115, 0.14);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.9) inset,
            0 18px 44px rgba(79, 115, 115, 0.10);
          overflow: hidden;
          transition: box-shadow 0.4s ease, border-color 0.4s ease;
        }
        /* gold foil hairline frame, drawn just inside the border */
        .glow-tier::before {
          content: "";
          position: absolute;
          inset: 7px;
          border: 1px solid rgba(156, 131, 68, 0.32);
          border-radius: 14px;
          pointer-events: none;
        }
        /* soft top foil sheen */
        .glow-tier::after {
          content: "";
          position: absolute;
          inset: 0 0 auto 0;
          height: 3px;
          background: linear-gradient(
            90deg,
            rgba(156, 131, 68, 0) 0%,
            rgba(156, 131, 68, 0.55) 50%,
            rgba(156, 131, 68, 0) 100%
          );
          pointer-events: none;
        }
        .glow-tier[data-featured="true"] {
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.9) inset,
            0 26px 60px rgba(79, 115, 115, 0.16);
        }
        .glow-tier:hover {
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.9) inset,
            0 30px 66px rgba(79, 115, 115, 0.20);
          border-color: rgba(156, 131, 68, 0.40);
        }
        .glow-tier__inner {
          position: relative;
          z-index: 1;
          padding: clamp(30px, 3.4vw, 42px) clamp(20px, 2.6vw, 30px);
          text-align: center;
        }
        .glow-tier__corner {
          position: absolute;
          width: 18px;
          height: 18px;
          border: 1px solid var(--gold-deep);
          opacity: 0.55;
          pointer-events: none;
          z-index: 2;
        }
        .glow-tier__corner--tl {
          top: 13px;
          left: 13px;
          border-right: 0;
          border-bottom: 0;
          border-top-left-radius: 6px;
        }
        .glow-tier__corner--br {
          bottom: 13px;
          right: 13px;
          border-left: 0;
          border-top: 0;
          border-bottom-right-radius: 6px;
        }
        .glow-tier__cap {
          font-family: var(--font-display, "Novecento Wide"), sans-serif;
          font-size: 10.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--label);
          margin: 0;
        }
        .glow-tier__cap--save { color: var(--gold); }
        .glow-tier__fig {
          letter-spacing: 0.03em;
          line-height: 1.05;
          margin: 8px 0 3px;
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum" 1;
        }
        .glow-tier__fig--spend {
          font-size: clamp(28px, 3.2vw, 36px);
          color: var(--teal-text);
        }
        .glow-tier__fig--save {
          font-size: clamp(34px, 4.2vw, 46px);
          color: var(--gold);
        }
        .glow-tier__sub {
          font-family: var(--font-display, "Novecento Wide"), sans-serif;
          font-size: 10.5px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--label);
          margin: 0;
        }
        .glow-tier__rule {
          position: relative;
          width: 64px;
          height: 1px;
          margin: clamp(18px, 2vw, 24px) auto;
          background: linear-gradient(
            90deg,
            rgba(156, 131, 68, 0) 0%,
            rgba(156, 131, 68, 0.6) 50%,
            rgba(156, 131, 68, 0) 100%
          );
        }
        .glow-tier__node {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 6px;
          height: 6px;
          background: var(--gold-deep);
          transform: translate(-50%, -50%) rotate(45deg);
          opacity: 0.85;
        }
        @media (prefers-reduced-motion: reduce) {
          .glow-tier { transition: none; }
        }
      `}</style>

      <div className="container">
        {/* ── Heading block ── */}
        <div className="mx-auto text-center" style={{ maxWidth: "680px" }}>
          <p
            aria-hidden="true"
            style={{
              color: TEAL_TEXT,
              fontFamily: '"Novecento Wide", sans-serif',
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Everything your membership unlocks
          </p>
          <h2
            id="glow-benefits-heading"
            className="font-serif"
            style={{
              color: GOLD,
              fontSize: "clamp(22px,3.2vw,34px)",
              fontWeight: 400,
              lineHeight: 1.25,
              letterSpacing: "0.05em",
              margin: "16px auto 0",
            }}
          >
            Your Glow Club benefits
          </h2>
          <div
            aria-hidden="true"
            className="mx-auto"
            style={{
              width: "70px",
              height: "1px",
              background: TEAL_DEEP,
              opacity: 0.5,
              margin: "16px auto 0",
            }}
          />
          <p
            style={{
              color: TEAL_TEXT,
              fontSize: "clamp(16px,1.6vw,18px)",
              lineHeight: 1.7,
              margin: "20px auto 0",
              maxWidth: "560px",
            }}
          >
            Real, lasting perks designed around you — so every visit feels a
            little more rewarding, and your glow keeps going between
            appointments.
          </p>
        </div>

        {/* ── Imagery + benefit roster ── */}
        <div
          className="grid gap-12 lg:grid-cols-2 items-center mx-auto"
          style={{ maxWidth: "1040px", marginTop: "clamp(40px,6vw,60px)" }}
        >
          {/* Image */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "3 / 4",
              overflow: "hidden",
              borderRadius: "16px",
              boxShadow: "0 18px 44px rgba(79,115,115,0.18)",
            }}
          >
            <Image
              src={`${A}/mem-benefits.png`}
              alt="Carisma Aesthetics Glow Club member enjoying premium aesthetics and spa treatments in Malta"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Benefit rows */}
          <ul
            style={{ listStyle: "none", padding: 0, margin: 0 }}
            aria-label="Glow Club member benefits"
          >
            {BENEFITS.map((b, i) => (
              <li
                key={b.big}
                className="flex items-start gap-4"
                style={{
                  padding: "20px 0",
                  borderBottom:
                    i === BENEFITS.length - 1
                      ? "none"
                      : "1px solid rgba(79,115,115,0.18)",
                }}
              >
                {/* Icon chip */}
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "46px",
                    height: "46px",
                    borderRadius: "12px",
                    background: "rgba(63,99,99,0.08)",
                    flexShrink: 0,
                  }}
                >
                  {b.icon}
                </span>

                <span style={{ minWidth: 0 }}>
                  <span
                    className="font-display"
                    style={{
                      display: "block",
                      fontSize: "clamp(16px,1.8vw,20px)",
                      color: GOLD,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      lineHeight: 1.2,
                    }}
                  >
                    {b.big}
                  </span>
                  <span
                    className="font-display"
                    style={{
                      display: "block",
                      fontSize: "12.5px",
                      color: TEAL_TEXT,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginTop: "4px",
                    }}
                  >
                    {b.label}
                  </span>
                  {b.note && (
                    <span
                      style={{
                        display: "block",
                        fontSize: "11.5px",
                        color: LABEL,
                        marginTop: "5px",
                        fontStyle: "italic",
                        lineHeight: 1.5,
                      }}
                    >
                      {b.note}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── EXCLUSIVE 10% member discount — elite savings proof band ── */}
        <div
          ref={bandRef}
          aria-labelledby="glow-savings-heading"
          role="group"
          style={{
            position: "relative",
            overflow: "hidden",
            marginTop: "clamp(56px,8vw,88px)",
            background:
              "linear-gradient(165deg, rgba(255,255,255,0.86) 0%, rgba(222, 235, 235,0.86) 52%, rgba(238, 243, 243,0.86) 100%)",
            backdropFilter: "blur(2px)",
            border: "1px solid rgba(112,101,82,0.16)",
            borderRadius: "28px",
            padding: "clamp(44px,6vw,72px) clamp(20px,5vw,56px)",
            boxShadow: "0 30px 70px rgba(79,115,115,0.12)",
          }}
        >
          {/* Soft decorative gold glow — purely aesthetic */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-24%",
              right: "-10%",
              width: "min(44%, 380px)",
              aspectRatio: "1",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(156,131,68,0.10) 0%, rgba(156,131,68,0) 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            className="text-center mx-auto"
            style={{ position: "relative", maxWidth: "640px" }}
          >
            {/* Foil "VIP" pill — gold-deep graphic + large foil label (≥3:1) */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                border: "1px solid rgba(156,131,68,0.45)",
                borderRadius: 999,
                padding: "7px 16px",
                marginBottom: "22px",
                background: "rgba(255,255,255,0.75)",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke={GOLD_DEEP}
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9z" />
              </svg>
              <span
                className="font-display"
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  color: TEAL_TEXT,
                  textTransform: "uppercase",
                }}
              >
                Members only · 10% off everything
              </span>
            </span>

            <p
              aria-hidden="true"
              style={{
                color: TEAL_TEXT,
                fontFamily: '"Novecento Wide", sans-serif',
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              The savings add up
            </p>
            <h3
              id="glow-savings-heading"
              className="font-serif"
              style={{
                color: GOLD,
                fontSize: "clamp(20px,2.6vw,30px)",
                fontWeight: 400,
                lineHeight: 1.25,
                letterSpacing: "0.05em",
                margin: "14px auto 0",
              }}
            >
              Your exclusive 10% member discount
            </h3>
            <p
              style={{
                color: TEAL_TEXT,
                fontSize: "15.5px",
                lineHeight: 1.7,
                margin: "16px auto 0",
                maxWidth: "520px",
              }}
            >
              See how your member-exclusive 10% off all services turns into real
              money kept in your pocket, year after year.
            </p>
          </div>

          {/* Spend → Save elite tier cards */}
          <ul
            className="grid gap-6 md:grid-cols-3 mx-auto"
            style={{
              position: "relative",
              maxWidth: "900px",
              listStyle: "none",
              padding: 0,
              margin: "clamp(34px,5vw,52px) auto 0",
              perspective: "1100px",
            }}
            aria-label="Annual savings examples for Glow Club members"
          >
            {SAVINGS.map((tier, i) => (
              <SavingsTierCard
                key={tier.spendValue}
                tier={tier}
                index={i}
                active={active}
                featured={i === 1}
              />
            ))}
          </ul>

          <p
            className="font-display text-center"
            style={{
              position: "relative",
              fontSize: "11px",
              color: LABEL,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              margin: "26px 0 0",
            }}
          >
            *prices may vary over time
          </p>
        </div>

        {/* ── Closing CTA ── */}
        <div
          className="text-center"
          style={{ marginTop: "clamp(40px,6vw,56px)" }}
        >
          <Link
            href="/membership/join"
            className="btn btn-teal"
            aria-label="Join the Glow Club membership"
            style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}
          >
            Join the Glow Club
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
