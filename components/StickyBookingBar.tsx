"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FACE_LINKS, BODY_LINKS, PACKAGE_LINKS } from "@/lib/site";
import { getTreatment } from "@/lib/treatments";

/*
  Floating liquid-glass booking pill. Mounted once in root layout.
  Desktop: pill with price label + CTA (+ optional free-consultation link).
  Mobile: just the primary CTA pill, centered — avoids the live-chat icon
  that sits bottom-right.
*/

type BarConfig = {
  href: string;
  priceLabel: string;
  ctaLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

const AESTHETICS_FRESHA_BOOK =
  "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2800348&share=true&pId=2708191";

const CONFIG: Record<string, BarConfig> = {};

for (const link of PACKAGE_LINKS) {
  const slug = link.href.replace(/^\//, "");
  const t = getTreatment(slug);
  if (!t) continue;
  const price = (t as { offer?: { priceNow?: string } }).offer?.priceNow;
  CONFIG[link.href] = {
    href: t.hero.bookHref ?? AESTHETICS_FRESHA_BOOK,
    priceLabel: price ? `${link.label} · ${price}` : link.label,
    ctaLabel: "Claim my spot",
  };
}

for (const link of [...FACE_LINKS, ...BODY_LINKS]) {
  if (CONFIG[link.href]) continue;
  const slug = link.href.replace(/^\//, "");
  const t = getTreatment(slug);
  CONFIG[link.href] = {
    href: t?.hero.bookHref ?? AESTHETICS_FRESHA_BOOK,
    priceLabel: link.label,
    ctaLabel: "Book Appointment",
    secondaryHref: "/consultation",
    secondaryLabel: "Free Consultation",
  };
}

// Liquid-glass shell shared between desktop pill and mobile button
const GLASS: React.CSSProperties = {
  backdropFilter: "blur(24px) saturate(200%)",
  WebkitBackdropFilter: "blur(24px) saturate(200%)",
  border: "1px solid rgba(255,255,255,0.45)",
  boxShadow:
    "0 8px 32px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.75) inset, 0 -1px 0 rgba(0,0,0,0.04) inset",
};

export default function StickyBookingBar() {
  const pathname = usePathname();
  // Don't show on home page — hero has its own prominent CTAs
  if (pathname === "/") return null;

  const cfg = pathname ? CONFIG[pathname] : undefined;

  // Only show after the user scrolls past the hero (≈ one viewport height).
  // Avoids competing with the hero's own CTA buttons above the fold.
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const check = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  if (!cfg || !pastHero) return null;

  const isExternal = cfg.href.startsWith("http");
  const linkProps = isExternal
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <>
      {/* ── Desktop pill — full label + optional secondary + primary CTA ── */}
      <div
        className="hidden sm:flex"
        style={{
          position: "fixed",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 49,
          alignItems: "center",
          gap: "10px",
          padding: "7px 8px 7px 18px",
          borderRadius: "9999px",
          background: "rgba(255,255,255,0.70)",
          whiteSpace: "nowrap",
          ...GLASS,
        }}
      >
        <span
          style={{
            fontSize: "13.5px",
            fontWeight: 500,
            color: "var(--ink)",
            letterSpacing: "0.01em",
          }}
        >
          {cfg.priceLabel}
        </span>

        {cfg.secondaryHref && (
          <Link
            href={cfg.secondaryHref}
            style={{
              borderRadius: "9999px",
              border: "1px solid rgba(36,80,82,0.35)",
              padding: "6px 14px",
              fontSize: "12.5px",
              fontWeight: 600,
              color: "var(--teal-deep)",
              transition: "background 0.15s",
            }}
            onMouseOver={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "rgba(150,178,178,0.12)")
            }
            onMouseOut={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "transparent")
            }
          >
            {cfg.secondaryLabel}
          </Link>
        )}

        <a
          href={cfg.href}
          {...linkProps}
          style={{
            borderRadius: "9999px",
            background: "linear-gradient(155deg, #3a6a73 0%, var(--teal-deep) 45%, #1a3d42 100%)",
            padding: "8px 18px",
            fontSize: "12.5px",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            transition: "opacity 0.15s",
            boxShadow: "0 2px 8px rgba(36,80,82,0.30)",
          }}
          onMouseOver={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "0.88")
          }
          onMouseOut={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "1")
          }
        >
          {cfg.ctaLabel}
        </a>
      </div>

      {/* ── Mobile — single CTA pill, centered, clears live-chat icon ── */}
      <div
        className="flex sm:hidden"
        style={{
          position: "fixed",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 49,
        }}
      >
        <a
          href={cfg.href}
          {...linkProps}
          style={{
            borderRadius: "9999px",
            background: "linear-gradient(155deg, #3a6a73 0%, var(--teal-deep) 45%, #1a3d42 100%)",
            padding: "13px 26px",
            fontSize: "13px",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            boxShadow:
              "0 6px 24px rgba(36,80,82,0.38), 0 1px 0 rgba(255,255,255,0.15) inset",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          {cfg.ctaLabel}
        </a>
      </div>
    </>
  );
}
