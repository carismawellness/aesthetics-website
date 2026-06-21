"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CONTACT,
  FACE_LINKS,
  BODY_LINKS,
  PACKAGE_LINKS,
  type NavLink,
} from "@/lib/site";

const ANNOUNCE =
  "#1 voted med-aesthetics clinic in malta          ⭐ Highest rated clinic in Malta ⭐          Medically qualified doctors";

type Dropdown = { label: string; href?: string; items?: NavLink[]; viewAllHref?: string };

// Curate overloaded dropdowns: show the most popular ~6-7 treatments, then a
// "View all →" link to the section index. Lists at/under the cap render in full
// (no View-all). Curation is done here (slice) rather than by deleting site data.
const MAX_DROPDOWN_ITEMS = 7;

const MENUS: Dropdown[] = [
  // Face has a dedicated index page (/face-treatments) → trim + "View all".
  { label: "Face", items: FACE_LINKS, viewAllHref: "/face-treatments" },
  // Body & Packages have no index route, so they render in full (no View-all to
  // avoid a 404). Body (9) is mildly over the cap but every item is a live page.
  { label: "Body", items: BODY_LINKS },
  { label: "Packages", items: PACKAGE_LINKS },
  { label: "Membership", href: "/membership" },
  { label: "Gifts", href: "/e-giftcards-vouchers" },
];

// Returns the rendered slice + whether a "View all" link should be appended.
function curate(m: Dropdown): { items: NavLink[]; showViewAll: boolean } {
  const all = m.items ?? [];
  if (all.length > MAX_DROPDOWN_ITEMS && m.viewAllHref) {
    return { items: all.slice(0, MAX_DROPDOWN_ITEMS), showViewAll: true };
  }
  return { items: all, showViewAll: false };
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Scroll-aware: collapse the announcement strip and firm up the glass once
  // the user scrolls past the hero edge.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + close on Escape while the full-page mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Liquid-glass surface for the floating pill. More translucent over the hero,
  // firmer once scrolled for legibility over light content.
  const pillStyle: React.CSSProperties = {
    // 0.66 min opacity bounds the worst-case contrast of dark pill text over the
    // translucent glass so nav labels stay AA even over a saturated hero patch.
    background: scrolled ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.66)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    border: "1px solid rgba(255,255,255,0.65)",
    borderRadius: "999px",
    boxShadow: scrolled
      ? "0 10px 34px rgba(28,30,30,0.16), inset 0 1px 0 rgba(255,255,255,0.85)"
      : "0 8px 30px rgba(28,30,30,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
    transition: "background 0.35s ease, box-shadow 0.35s ease",
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Announcement strip — slides away on scroll */}
      <div
        className="w-full overflow-hidden"
        style={{
          backgroundColor: "var(--teal-100)",
          color: "var(--gold)",
          height: scrolled ? 0 : 28,
          opacity: scrolled ? 0 : 1,
          transition: "height 0.35s ease, opacity 0.25s ease",
        }}
      >
        <div
          className="marquee-track font-display"
          style={{ letterSpacing: "0.18em", fontWeight: 500, fontSize: "11px", padding: "7px 0" }}
        >
          <span style={{ paddingRight: "60px" }}>{ANNOUNCE}</span>
          <span style={{ paddingRight: "60px" }}>{ANNOUNCE}</span>
        </div>
      </div>

      {/* Floating glass pill */}
      <div style={{ padding: "12px clamp(12px,3vw,28px) 0" }}>
        <nav
          className="container flex items-center justify-between"
          style={{ ...pillStyle, minHeight: "62px", padding: "8px 12px 8px 22px" }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" onClick={() => setOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {/* Mobile logo ~28px, desktop ~40px */}
            <img src="/assets/logo.png" alt="Carisma Aesthetics" className="h-7 lg:h-10" style={{ width: "auto" }} />
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center" style={{ gap: "30px" }}>
            {MENUS.map((m) => {
              if (!m.items) {
                return (
                  <Link key={m.label} href={m.href!} className="font-display link-underline" style={{ fontSize: "13px", letterSpacing: "0.12em", color: "#5e5446", cursor: "pointer" }}>
                    {m.label}
                  </Link>
                );
              }
              const { items, showViewAll } = curate(m);
              return (
                <div key={m.label} className="relative group">
                  <button className="font-display link-underline flex items-center gap-1" style={{ fontSize: "13px", letterSpacing: "0.12em", padding: "20px 0", color: "#5e5446", cursor: "pointer" }}>
                    {m.label}
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 4l4 4 4-4" /></svg>
                  </button>
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:block z-50"
                    style={{
                      background: "rgba(255,255,255,0.78)",
                      backdropFilter: "blur(22px) saturate(180%)",
                      WebkitBackdropFilter: "blur(22px) saturate(180%)",
                      border: "1px solid rgba(255,255,255,0.7)",
                      borderRadius: "20px",
                      boxShadow: "0 16px 40px rgba(28,30,30,0.16), inset 0 1px 0 rgba(255,255,255,0.85)",
                      minWidth: "260px",
                      padding: "10px 0 12px",
                      marginTop: "6px",
                    }}
                  >
                    {items.map((it) => (
                      <Link
                        key={it.href}
                        href={it.href}
                        className="block text-center font-display transition-colors"
                        style={{ padding: "7px 24px", fontSize: "11px", color: "#5e5446", textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap", cursor: "pointer" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#5e5446")}
                      >
                        {it.label}
                      </Link>
                    ))}
                    {showViewAll && (
                      <Link
                        href={m.viewAllHref!}
                        className="block text-center font-display transition-colors"
                        style={{ padding: "9px 24px 4px", fontSize: "11px", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap", fontWeight: 600, cursor: "pointer", marginTop: "4px", borderTop: "1px solid rgba(155,141,131,0.22)" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--ink-soft)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "var(--gold)")}
                      >
                        View all →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center" style={{ gap: "18px" }}>
            <a href={`tel:${CONTACT.tel}`} className="flex items-center gap-1.5 link-underline" style={{ color: "var(--gold)", cursor: "pointer" }}>
              <PhoneIcon />
              <span style={{ color: "var(--ink-soft)", letterSpacing: "1px", fontSize: "13px" }}>{CONTACT.phoneDigits}</span>
            </a>
            <Link href="/consultation" className="btn btn-teal" style={{ borderRadius: "999px", cursor: "pointer" }}>
              free consultation
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden flex items-center justify-center" style={{ width: 44, height: 44, cursor: "pointer" }} onClick={() => setOpen(true)} aria-label="Open menu">
            <svg className="w-6 h-6" fill="none" stroke="var(--ink-soft)" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </nav>
      </div>

      {/* Full-page liquid-glass mobile menu */}
      {open && (
        <div
          className="lg:hidden fixed inset-0"
          style={{
            zIndex: 60,
            background:
              "linear-gradient(160deg, rgba(238,243,243,0.88) 0%, rgba(255,255,255,0.82) 55%, rgba(245,241,236,0.86) 100%)",
            backdropFilter: "blur(30px) saturate(180%)",
            WebkitBackdropFilter: "blur(30px) saturate(180%)",
            animation: "glassIn 0.32s cubic-bezier(0.22,1,0.36,1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <style>{`@keyframes glassIn{from{opacity:0;transform:scale(1.03)}to{opacity:1;transform:scale(1)}}`}</style>

          {/* Top row: logo + close */}
          <div className="flex items-center justify-between shrink-0" style={{ padding: "16px clamp(16px,5vw,28px)" }}>
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {/* Mobile menu logo ~28px */}
              <img src="/assets/logo.png" alt="Carisma Aesthetics" className="h-7" style={{ width: "auto" }} />
            </Link>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex items-center justify-center"
              style={{
                width: 46,
                height: 46,
                borderRadius: "999px",
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.7)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
                cursor: "pointer",
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="var(--ink-soft)" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable link area */}
          <div style={{ flex: 1, overflowY: "auto", padding: "8px clamp(16px,5vw,28px) 28px" }}>
            {MENUS.map((m) => {
              if (!m.items) {
                return (
                  <Link
                    key={m.label}
                    href={m.href!}
                    onClick={() => setOpen(false)}
                    className="block font-display link-underline"
                    style={{ padding: "18px 4px", fontSize: "19px", letterSpacing: "0.08em", color: "var(--ink-soft)", borderBottom: "1px solid rgba(155,141,131,0.18)", cursor: "pointer" }}
                  >
                    {m.label}
                  </Link>
                );
              }
              const { items, showViewAll } = curate(m);
              return (
                <div key={m.label} style={{ borderBottom: "1px solid rgba(155,141,131,0.18)" }}>
                  <button
                    className="w-full flex items-center justify-between font-display"
                    style={{ padding: "18px 4px", fontSize: "19px", letterSpacing: "0.08em", color: "var(--ink-soft)", cursor: "pointer" }}
                    onClick={() => setExpanded(expanded === m.label ? null : m.label)}
                  >
                    {m.label}
                    <span style={{ fontSize: "22px", color: "var(--gold)", lineHeight: 1 }}>{expanded === m.label ? "−" : "+"}</span>
                  </button>
                  {expanded === m.label && (
                    <div style={{ paddingBottom: "10px" }}>
                      {items.map((it) => (
                        <Link
                          key={it.href}
                          href={it.href}
                          onClick={() => setOpen(false)}
                          className="block font-display link-underline"
                          style={{ padding: "9px 12px", fontSize: "14px", color: "#5e5446", textTransform: "uppercase", letterSpacing: "0.06em", cursor: "pointer" }}
                        >
                          {it.label}
                        </Link>
                      ))}
                      {showViewAll && (
                        <Link
                          href={m.viewAllHref!}
                          onClick={() => setOpen(false)}
                          className="block font-display link-underline"
                          style={{ padding: "11px 12px 5px", fontSize: "14px", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, cursor: "pointer" }}
                        >
                          View all →
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Phone + CTA */}
            <a href={`tel:${CONTACT.tel}`} className="flex items-center gap-2 link-underline" style={{ padding: "22px 4px 8px", color: "var(--gold)", cursor: "pointer", width: "fit-content" }}>
              <PhoneIcon />
              <span style={{ color: "var(--ink-soft)", letterSpacing: "1px", fontSize: "16px" }}>{CONTACT.phoneDigits}</span>
            </a>
            <Link
              href="/consultation"
              onClick={() => setOpen(false)}
              className="btn btn-teal w-full"
              style={{ borderRadius: "999px", marginTop: "10px", justifyContent: "center", cursor: "pointer" }}
            >
              free consultation
            </Link>
          </div>
        </div>
      )}

      {/* Mobile-only sticky bottom CTA — present on every page, hidden while the
          full-page menu is open (menu is z-60, this sits below at z-40). */}
      {!open && (
        <>
          {/* Spacer reserves layout room so the fixed bar never permanently
              covers page content (incl. footer) on mobile. */}
          <div
            aria-hidden
            className="lg:hidden"
            style={{ height: "calc(64px + env(safe-area-inset-bottom, 0px))" }}
          />
          <div
            className="lg:hidden fixed inset-x-0 bottom-0"
            style={{
              zIndex: 40,
              padding: "10px clamp(12px,4vw,20px) calc(10px + env(safe-area-inset-bottom, 0px))",
              background: "rgba(255,255,255,0.82)",
              backdropFilter: "blur(18px) saturate(180%)",
              WebkitBackdropFilter: "blur(18px) saturate(180%)",
              borderTop: "1px solid rgba(255,255,255,0.7)",
              boxShadow: "0 -8px 28px rgba(28,30,30,0.12)",
            }}
          >
            <Link
              href="/consultation"
              className="btn btn-teal w-full"
              style={{ borderRadius: "999px", justifyContent: "center", cursor: "pointer" }}
            >
              Book Your Free Consultation
            </Link>
          </div>
        </>
      )}
    </header>
  );
}
