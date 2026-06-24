"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FACE_LINKS, BODY_LINKS, PACKAGE_LINKS } from "@/lib/site";
import { getTreatment } from "@/lib/treatments";

/*
  Site-wide sticky Liquid Gloss booking bar. Mounted once in the root layout; it
  renders on every Face, Body and Packages dropdown page (matched by exact
  pathname). One mount covers all ~27 pages and any future ones — no per-page
  or per-template edits.

  - Packages → Fresha booking link + offer price label (e.g. "4 in 1 Hydrafacial · €99").
  - Face/Body treatments → "/consultation" (caught by the site-wide ConsultationModal),
    label = the treatment name.
  Pages not in a dropdown render nothing.
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

// Packages — Fresha booking + price from unified treatment data.
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

// Face + Body treatments — two CTAs: primary "Book Appointment" → Fresha (new
// tab, bypasses popup); secondary "Free Consultation" → /consultation popup.
for (const link of [...FACE_LINKS, ...BODY_LINKS]) {
  // Don't overwrite a package entry that might share a slug.
  if (CONFIG[link.href]) continue;
  CONFIG[link.href] = {
    href: AESTHETICS_FRESHA_BOOK,
    priceLabel: link.label,
    ctaLabel: "Book Appointment",
    secondaryHref: "/consultation",
    secondaryLabel: "Free Consultation",
  };
}

export default function StickyBookingBar() {
  const pathname = usePathname();
  const cfg = pathname ? CONFIG[pathname] : undefined;
  if (!cfg) return null;

  const isExternal = cfg.href.startsWith("http");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-3 border-t border-[var(--line)] bg-white px-4 py-3 shadow-[0_-2px_16px_rgba(0,0,0,0.07)] md:px-6">
      <p className="truncate text-sm font-medium text-[var(--ink)]">{cfg.priceLabel}</p>
      <div className="flex shrink-0 gap-2">
        {cfg.secondaryHref && (
          <Link
            href={cfg.secondaryHref}
            className="rounded-full border border-[var(--teal-deep)] px-4 py-2 text-sm font-semibold text-[var(--teal-deep)] transition-opacity hover:opacity-80"
          >
            {cfg.secondaryLabel}
          </Link>
        )}
        <a
          href={cfg.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="rounded-full bg-[var(--teal-deep)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          {cfg.ctaLabel}
        </a>
      </div>
    </div>
  );
}
