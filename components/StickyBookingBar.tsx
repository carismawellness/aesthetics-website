"use client";

import { usePathname } from "next/navigation";
import StickyCta from "@/components/packages/preview/StickyCta";
import { FACE_LINKS, BODY_LINKS, PACKAGE_LINKS } from "@/lib/site";
import { PACKAGES } from "@/lib/packages";

/*
  Site-wide sticky Liquid Gloss booking bar. Mounted once in the root layout; it
  renders the exact <StickyCta> from the package preview on every Face, Body and
  Packages dropdown page (matched by exact pathname). One mount covers all ~27
  pages and any future ones — no per-page or per-template edits.

  - Packages → Fresha booking link + price label (e.g. "4 in 1 Hydrafacial · €99").
  - Face/Body treatments → "/consultation" (caught by the site-wide ConsultationModal),
    label = the treatment name.
  Pages not in a dropdown (home, blog, membership, the noindexed preview route, etc.)
  render nothing.
*/

type BarConfig = { href: string; priceLabel: string; ctaLabel: string };

// Extract the "Today: €N" price from a package's hero.total, if present.
function priceFromTotal(total?: string): string | null {
  const m = total?.match(/Today:\s*€\s*([\d.,]+)/i);
  return m ? `€${m[1]}` : null;
}

const CONFIG: Record<string, BarConfig> = {};

// Packages — Fresha booking + price.
for (const link of PACKAGE_LINKS) {
  const slug = link.href.replace(/^\//, "");
  const pkg = PACKAGES[slug];
  if (!pkg) continue;
  const price = priceFromTotal(pkg.hero.total);
  CONFIG[link.href] = {
    href: pkg.bookHref,
    priceLabel: price ? `${link.label} · ${price}` : link.label,
    ctaLabel: "Claim my spot",
  };
}

// Face + Body treatments — consultation-first (modal-intercepted), name as label.
for (const link of [...FACE_LINKS, ...BODY_LINKS]) {
  // Don't overwrite a package entry that might share a slug.
  if (CONFIG[link.href]) continue;
  CONFIG[link.href] = {
    href: "/consultation",
    priceLabel: link.label,
    ctaLabel: "Book consultation",
  };
}

export default function StickyBookingBar() {
  const pathname = usePathname();
  const cfg = pathname ? CONFIG[pathname] : undefined;
  if (!cfg) return null;
  return <StickyCta freshaHref={cfg.href} priceLabel={cfg.priceLabel} ctaLabel={cfg.ctaLabel} />;
}
