"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import BrandSwitcher from "@/components/BrandSwitcher";
import {
  CONTACT,
  FACE_LINKS,
  BODY_LINKS,
  PACKAGE_LINKS,
  type NavLink,
} from "@/lib/site";

// Pages where StickyBookingBar renders its own floating pill — suppress the
// Header's mobile bottom CTA on these to avoid two overlapping CTAs on mobile.
const STICKY_BAR_PAGES = new Set([
  ...FACE_LINKS.map((l) => l.href),
  ...BODY_LINKS.map((l) => l.href),
  ...PACKAGE_LINKS.map((l) => l.href),
]);

// ── Aesthetics palette (slimming green → aesthetics teal) ──────────────────
// CTA fill / active ink:  --teal-deep #4f7373 (white text passes AA)
// Teal text / link / icon: --teal-text #406060 (AA on white)
// Nav-link ink keeps the existing aesthetics token #423a30.
const TEAL_FILL = "#4f7373";   // CTA fill (slimming GREEN_FILL → teal-deep)
const TEAL = "#406060";        // small teal text / phone / icons (slimming GREEN → teal-text)
const NAV_INK = "#245052";     // nav-link ink (brand teal)
const DROPDOWN_INK = "#245052"; // dropdown/sub-item link ink (brand teal)

// External Fresha booking link used by the header "free consultation" CTAs.
const FRESHA_BOOKING = "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2800348&oiid=sv%3A25754425&share=true&pId=2708191";

type Dropdown = { label: string; href?: string; items?: NavLink[]; viewAllHref?: string };

// Show all treatments in the dropdown; "View all →" always appears for menus
// that have a viewAllHref. Raise the cap well above any realistic list length.
const MAX_DROPDOWN_ITEMS = 20;

const MENUS: Dropdown[] = [
  { label: "Face", items: FACE_LINKS, viewAllHref: "/face-treatments" },
  { label: "Body", items: BODY_LINKS },
  { label: "Packages", items: PACKAGE_LINKS },
  { label: "Membership", href: "/membership" },
  { label: "Gifts", href: "/e-giftcards-vouchers" },
];

function curate(m: Dropdown): { items: NavLink[]; showViewAll: boolean } {
  const all = m.items ?? [];
  if (all.length > MAX_DROPDOWN_ITEMS && m.viewAllHref) {
    return { items: all.slice(0, MAX_DROPDOWN_ITEMS), showViewAll: true };
  }
  return { items: all, showViewAll: false };
}

// Top split-bar (homepage, scroll-top) flanks the centered logo with the SAME
// menus as the pill — items with `.items` get the shared hover dropdown
// (NavDropdown); items without (Membership, Gifts) stay simple links to their
// primary destination: explicit href → viewAllHref → first item → /.
const menuHref = (m: Dropdown): string =>
  m.href ?? m.viewAllHref ?? m.items?.[0]?.href ?? "/";
const TOP_LEFT: Dropdown[] = MENUS.slice(0, Math.ceil(MENUS.length / 2));
const TOP_RIGHT: Dropdown[] = MENUS.slice(Math.ceil(MENUS.length / 2));

// Slimming nav-link spec, exact px (green → aesthetics nav ink).
const navLink: React.CSSProperties = {
  color: NAV_INK,
  fontFamily: '"Novecento Wide", sans-serif',
  fontSize: "12px",
  fontWeight: 400,
  letterSpacing: "0.5px",
  textDecoration: "none",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
};

// Top split-nav trigger spec — mirrors the `.cms-topnav__link` CSS exactly so a
// NavDropdown <button> renders identically to a simple top-nav <Link>.
const topNavLink: React.CSSProperties = {
  color: "#245052",
  fontFamily: '"Novecento Wide", sans-serif',
  fontSize: "12px",
  fontWeight: 400,
  letterSpacing: "1.5px",
  textDecoration: "none",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
};

function PhoneIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.21 12.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.128.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.572 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

// ── Shared desktop dropdown — reused by BOTH the floating pill nav and the
// homepage top split-nav so they look + behave identically (same hover state,
// same open-on-enter / close-on-leave intent timers, same panel markup,
// "View all →", item list). The ONLY difference between call-sites is `align`,
// which anchors the absolutely-positioned panel so it never overflows the
// viewport edge: the pill centers it (translateX(-50%)); the left top-nav group
// is right-aligned (panel hangs left, right:0); the right group is left-aligned
// (panel hangs right, left:0).
type DropAlign = "center" | "left" | "right";

function NavDropdown({
  menu,
  isOpen,
  triggerStyle,
  onOpen,
  onToggle,
  cancelClose,
  scheduleClose,
  align,
}: {
  menu: Dropdown;
  isOpen: boolean;
  triggerStyle: React.CSSProperties;
  onOpen: () => void;
  onToggle: () => void;
  cancelClose: () => void;
  scheduleClose: () => void;
  align: DropAlign;
}) {
  const { items, showViewAll } = curate(menu);

  // Anchor the panel + the invisible hover-bridge per group so the cursor can
  // travel from the (narrow) trigger into the (wide) panel without crossing
  // dead space, and so the panel never spills off the viewport edge.
  // Centre the panel under its trigger in every state. The top-nav items cluster
  // around the centre logo, so centring keeps each panel on-screen; the previous
  // group-edge anchoring pushed the first item's panel off the viewport edge and
  // clipped a column of links. (All branches intentionally identical.)
  const panelAnchor: React.CSSProperties =
    align === "center"
      ? { left: "50%", transform: `translateX(-50%) translateY(${isOpen ? "0" : "8px"})` }
      : align === "right"
      ? { left: "50%", transform: `translateX(-50%) translateY(${isOpen ? "0" : "8px"})` }
      : { left: "50%", transform: `translateX(-50%) translateY(${isOpen ? "0" : "8px"})` };

  return (
    <div
      className="relative"
      style={{ display: "flex", alignItems: "center", padding: "10px 0" }}
      onMouseEnter={onOpen}
      onMouseLeave={scheduleClose}
    >
      <button
        style={{ ...triggerStyle, background: "none", border: "none", cursor: "pointer", padding: "4px 0", display: "flex", alignItems: "center", gap: "4px" }}
        className="hover:underline transition"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        {menu.label}
        <svg
          width="10" height="10" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.7 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {/* Panel is always mounted; open/close is driven by CSS so it
          fades + slides in AND out smoothly (no abrupt pop). */}
      <div
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        role="menu"
        aria-hidden={!isOpen}
        style={{
          position: "absolute",
          top: "calc(100% - 2px)",
          ...panelAnchor,
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.2s ease, transform 0.24s cubic-bezier(0.22,1,0.36,1), visibility 0.2s",
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(22px) saturate(180%)",
          WebkitBackdropFilter: "blur(22px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.7)",
          borderRadius: "16px",
          boxShadow: "0 16px 40px rgba(28,30,30,0.16), inset 0 1px 0 rgba(255,255,255,0.85)",
          width: "448px",
          padding: "10px",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          columnGap: "6px",
          zIndex: 100,
        }}>
          {/* Invisible hover bridge: wider than the panel and tall
              enough so diagonal cursor paths from the (narrow) trigger
              into the (wide) panel never cross dead space. */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              bottom: "100%",
              left: "-60px",
              right: "-60px",
              height: "32px",
              background: "transparent",
            }}
          />
          {items.map((it) => (
            <Link key={it.href} href={it.href} tabIndex={isOpen ? undefined : -1} className="block hover:bg-black/5 hover:underline"
              style={{ padding: "9px 14px", borderRadius: "10px", color: DROPDOWN_INK, fontFamily: '"Roboto Local", sans-serif', fontSize: "13px", textDecoration: "none", transition: "background 0.3s ease" }}>
              {it.label}
            </Link>
          ))}
          {showViewAll && (
            <Link href={menu.viewAllHref!} tabIndex={isOpen ? undefined : -1} className="block hover:bg-black/5 hover:underline"
              style={{ gridColumn: "1 / -1", marginTop: "4px", borderTop: "1px solid rgba(64,96,96,0.16)", paddingTop: "10px", padding: "10px 14px 4px", color: TEAL, fontFamily: '"Roboto Local", sans-serif', fontSize: "13px", fontWeight: 600, textDecoration: "none", transition: "background 0.3s ease" }}>
              View all →
            </Link>
          )}
        </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const hasStickyBar = !!pathname && STICKY_BAR_PAGES.has(pathname);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hover-intent: open immediately, close on a short delay so the cursor can
  // travel from the trigger into the (wide, centered) panel without the
  // wrapper's onMouseLeave race-closing the menu. The timeout also means the
  // menu never closes on incidental events like scroll while hovered.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const openMenu = (label: string) => {
    cancelClose();
    setHover(label);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setHover(null), 160);
  };
  // Clear any pending timer on unmount.
  useEffect(() => cancelClose, []);

  // Portal target (document.body) is only available after mount.
  useEffect(() => setMounted(true), []);

  // Scroll-aware: firm up the glass once past the hero edge (slimming behaviour).
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
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); setExpanded(null); setHover(null); } };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close desktop dropdown on Escape when mobile menu is closed.
  useEffect(() => {
    if (!hover && !expanded) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setHover(null); setExpanded(null); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [hover, expanded]);

  // Liquid-glass surface for the floating pill (slimming spec, exact values).
  const pillStyle: React.CSSProperties = {
    background: scrolled ? "rgba(255,255,255,0.74)" : "rgba(255,255,255,0.56)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    border: "1px solid rgba(255,255,255,0.65)",
    borderRadius: "999px",
    boxShadow: scrolled
      ? "0 10px 34px rgba(28,30,30,0.16), inset 0 1px 0 rgba(255,255,255,0.85)"
      : "0 8px 30px rgba(28,30,30,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
    transition: "background 0.35s ease, box-shadow 0.35s ease",
  };

  // CTA pill (slimming ctaStyle spec, exact px; green fill → teal-deep gradient).
  const ctaStyle: React.CSSProperties = {
    background: "linear-gradient(155deg, #639090 0%, #4f7373 45%, #365858 100%)",
    boxShadow: "0 0 22px rgba(79,115,115,0.45), 0 8px 24px rgba(79,115,115,0.5)",
    color: "#ffffff",
    fontFamily: '"Novecento Wide", sans-serif',
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    padding: "9px 20px",
    borderRadius: "999px",
    textDecoration: "none",
    whiteSpace: "nowrap",
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Logo sizing rules — identical to Carisma Slimming: desktop 26px, ≤767px 20px, mobile-menu 22px. */}
      <style>{`@media (max-width:767px){.header-logo{height:20px !important}}
.header-logo--mobile{height:22px !important}

        /* ── Homepage top split-nav (cross-fades into the pill on scroll) ── */
        .cms-topnav {
          display: none;
          position: absolute;
          inset: 0 0 auto 0;
          padding: 26px clamp(28px, 5vw, 72px) 0;
          transition: opacity .55s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1);
        }
        @media (min-width: 1024px) {
          .cms-topnav { display: block; opacity: 1; transform: translateY(0); }
          .cms-topnav--hidden { opacity: 0; transform: translateY(-18px); pointer-events: none; }
        }
        .cms-topnav__row {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: clamp(1.5rem, 3vw, 2.75rem);
          max-width: 1480px;
          margin: 0 auto;
        }
        .cms-topnav__group { display: flex; align-items: center; gap: clamp(1.25rem, 3.5vw, 3.5rem); }
        /* Both groups hug the centered logo: left group right-aligned, right group
           left-aligned, so the nearest link sits beside the lockup (not at the page edge). */
        .cms-topnav__group--left { justify-content: flex-end; }
        .cms-topnav__group--right { justify-content: flex-start; }
        .cms-topnav__link {
          color: #245052;
          font-family: "Novecento Wide", sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          text-decoration: none;
          white-space: nowrap;
          transition: color .25s ease;
        }
        .cms-topnav__link:hover { color: #96B2B2; }
        .cms-topnav__brand { display: inline-flex; align-items: center; justify-content: center; }
        /* Real vertical lockup SVG (vector-crisp): ~104px desktop, ~70px mobile. */
        .cms-topnav__logo { height: 104px; width: auto; display: block; }
        @media (max-width: 767px) { .cms-topnav__logo { height: 70px; } }

        /* ── Pill wrapper — the morph target (desktop homepage only) ── */
        .cms-pillwrap {
          transition: opacity .55s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1);
        }
        @media (min-width: 1024px) {
          /* Homepage at top: pill hidden + tucked up & shrunk; on scroll it "pops" in. */
          .cms-pillwrap--home { opacity: 0; transform: translateY(-14px) scale(0.96); pointer-events: none; }
          .cms-pillwrap--home.cms-pillwrap--shown { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
        }
        /* Mobile keeps the existing pill (and its hamburger) visible at all times —
           the split-nav / vertical lockup is a desktop-only homepage treatment. */
        @media (prefers-reduced-motion: reduce) {
          .cms-topnav, .cms-pillwrap { transition: opacity .2s linear; transform: none !important; }
        }`}</style>

      {/* ── Homepage top split-nav (desktop) — flanks the centered vertical lockup ── */}
      {isHome && (
        <div className={`cms-topnav${scrolled ? " cms-topnav--hidden" : ""}`} aria-hidden={scrolled}>
          <div className="cms-topnav__row">
            <nav className="cms-topnav__group cms-topnav__group--left" aria-label="Primary">
              {TOP_LEFT.map((m) =>
                !m.items ? (
                  <Link key={m.label} href={menuHref(m)} className="cms-topnav__link">{m.label}</Link>
                ) : (
                  <NavDropdown
                    key={m.label}
                    menu={m}
                    isOpen={hover === m.label}
                    triggerStyle={topNavLink}
                    align="left"
                    onOpen={() => openMenu(m.label)}
                    onToggle={() => setHover((p) => (p === m.label ? null : m.label))}
                    cancelClose={cancelClose}
                    scheduleClose={scheduleClose}
                  />
                ),
              )}
            </nav>
            <Link href="/" className="cms-topnav__brand" aria-label="Carisma Aesthetics — home">
              <img
                src="/assets/logos/carisma-vertical-lockup.svg"
                alt="Carisma Aesthetics"
                className="cms-topnav__logo"
              />
            </Link>
            <nav className="cms-topnav__group cms-topnav__group--right" aria-label="Secondary">
              {TOP_RIGHT.map((m) =>
                !m.items ? (
                  <Link key={m.label} href={menuHref(m)} className="cms-topnav__link">{m.label}</Link>
                ) : (
                  <NavDropdown
                    key={m.label}
                    menu={m}
                    isOpen={hover === m.label}
                    triggerStyle={topNavLink}
                    align="left"
                    onOpen={() => openMenu(m.label)}
                    onToggle={() => setHover((p) => (p === m.label ? null : m.label))}
                    cancelClose={cancelClose}
                    scheduleClose={scheduleClose}
                  />
                ),
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Floating glass pill */}
      <div
        className={isHome ? `cms-pillwrap cms-pillwrap--home${scrolled ? " cms-pillwrap--shown" : ""}` : undefined}
        style={{ padding: "12px clamp(12px,3vw,28px) 0", maxWidth: "1280px", margin: "0 auto" }}
      >
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between"
          style={{ ...pillStyle, minHeight: "52px", padding: "6px 10px 6px 20px" }}
        >
          {/* Logo + brand switcher */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
              <Image src="/assets/logos/carisma-wordmark-horizontal.svg" alt="Carisma Aesthetics" className="header-logo" width={140} height={36} style={{ height: "26px", width: "auto", display: "block", filter: "brightness(0.6)" }} unoptimized />
            </Link>
            <BrandSwitcher />
          </div>

          {/* Desktop menu — pill nav. Items with a submenu render through the
              shared NavDropdown (center-anchored); simple links stay links. */}
          <div className="hidden lg:flex items-center" style={{ gap: "26px" }}>
            {MENUS.map((m) =>
              !m.items ? (
                <Link key={m.label} href={m.href!} style={navLink} className="hover:underline transition">{m.label}</Link>
              ) : (
                <NavDropdown
                  key={m.label}
                  menu={m}
                  isOpen={hover === m.label}
                  triggerStyle={navLink}
                  align="center"
                  onOpen={() => openMenu(m.label)}
                  onToggle={() => setHover((p) => (p === m.label ? null : m.label))}
                  cancelClose={cancelClose}
                  scheduleClose={scheduleClose}
                />
              ),
            )}
          </div>

          {/* Right — phone + CTA (search lives in the footer) */}
          <div className="hidden lg:flex items-center" style={{ gap: "18px" }}>
            <a href={`tel:${CONTACT.tel}`} className="flex items-center hover:underline transition" style={{ gap: "6px", textDecoration: "none" }}>
              <PhoneIcon />
              <span style={{ color: TEAL, fontFamily: '"Novecento Wide", sans-serif', fontSize: "13px", fontWeight: 600, letterSpacing: "0.5px" }}>{CONTACT.phoneDigits}</span>
            </a>
            <a href={FRESHA_BOOKING} target="_blank" rel="noopener noreferrer" className="cta-glow-teal" style={{ ...ctaStyle }}>free consultation</a>
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden flex items-center justify-center" style={{ width: 44, height: 44 }} onClick={() => setOpen(true)} aria-label="Open menu">
            <svg width="22" height="22" fill="none" stroke={TEAL} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
            background: "linear-gradient(160deg, rgba(238,243,243,0.9) 0%, rgba(255,255,255,0.82) 55%, rgba(245,241,236,0.88) 100%)",
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
              <Image src="/assets/logos/carisma-wordmark-horizontal.svg" alt="Carisma Aesthetics" className="header-logo--mobile" width={130} height={34} style={{ height: "22px", width: "auto", display: "block", filter: "brightness(0.6)" }} unoptimized />
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
              }}
            >
              <svg width="22" height="22" fill="none" stroke={TEAL} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                    className="block"
                    style={{ padding: "18px 4px", fontFamily: '"Novecento Wide", sans-serif', fontSize: "17px", letterSpacing: "0.06em", textTransform: "uppercase", color: NAV_INK, borderBottom: "1px solid rgba(64,96,96,0.18)", textDecoration: "none" }}
                  >
                    {m.label}
                  </Link>
                );
              }
              const { items, showViewAll } = curate(m);
              return (
                <div key={m.label} style={{ borderBottom: "1px solid rgba(64,96,96,0.18)" }}>
                  <button
                    className="w-full flex items-center justify-between"
                    style={{ padding: "18px 4px", fontFamily: '"Novecento Wide", sans-serif', fontSize: "17px", letterSpacing: "0.06em", textTransform: "uppercase", color: NAV_INK }}
                    onClick={() => setExpanded(expanded === m.label ? null : m.label)}
                  >
                    {m.label}
                    <span style={{ fontSize: "22px", color: TEAL, lineHeight: 1 }}>{expanded === m.label ? "−" : "+"}</span>
                  </button>
                  {expanded === m.label && (
                    <div style={{ paddingBottom: "10px" }}>
                      {items.map((it) => (
                        <Link
                          key={it.href}
                          href={it.href}
                          onClick={() => setOpen(false)}
                          className="block"
                          style={{ padding: "9px 12px", fontFamily: '"Roboto Local", sans-serif', fontSize: "14px", color: DROPDOWN_INK, textDecoration: "none" }}
                        >
                          {it.label}
                        </Link>
                      ))}
                      {showViewAll && (
                        <Link
                          href={m.viewAllHref!}
                          onClick={() => setOpen(false)}
                          className="block"
                          style={{ padding: "11px 12px 5px", fontFamily: '"Roboto Local", sans-serif', fontSize: "14px", color: TEAL, fontWeight: 600, textDecoration: "none" }}
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
            <a href={`tel:${CONTACT.tel}`} className="flex items-center" style={{ gap: "8px", padding: "22px 4px 8px", textDecoration: "none" }}>
              <PhoneIcon />
              <span style={{ color: TEAL, fontFamily: '"Novecento Wide", sans-serif', fontSize: "16px", fontWeight: 600, letterSpacing: "0.5px" }}>{CONTACT.phoneDigits}</span>
            </a>
            <a
              href={FRESHA_BOOKING}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="cta-glow-teal block text-center w-full"
              style={{ ...ctaStyle, marginTop: "10px", padding: "14px", fontSize: "13px" }}
            >
              free consultation
            </a>

            {/* Compact footer */}
            <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(64,96,96,0.28)" }}>
              <p style={{ fontFamily: '"Novecento Wide", sans-serif', fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: TEAL, margin: "0 0 10px" }}>
                Carisma Aesthetics
              </p>
              <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 13, lineHeight: 1.6, color: NAV_INK, margin: "0 0 6px" }}>
                St George&apos;s Bay, St Julian&apos;s STJ 3310, Malta
              </p>
              <a href={`mailto:${CONTACT.email}`} style={{ fontFamily: 'Roboto, sans-serif', fontSize: 13, color: TEAL, textDecoration: "none" }}>
                {CONTACT.email}
              </a>
              <div className="flex items-center" style={{ gap: 18, marginTop: 16 }}>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: TEAL }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: TEAL }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
                  </svg>
                </a>
              </div>
              <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 11.5, color: NAV_INK, margin: "18px 0 0" }}>
                © {new Date().getFullYear()} Carisma Aesthetics. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile-only sticky bottom CTA — present on non-treatment pages; hidden
          on treatment/package pages where StickyBookingBar renders its own pill. */}
      {mounted && !open && !hasStickyBar &&
        createPortal(
          <>
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
              <a
                href={FRESHA_BOOKING}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-glow-teal block text-center w-full"
                style={{ ...ctaStyle, padding: "14px", fontSize: "13px" }}
              >
                Book Your Free Consultation
              </a>
            </div>
          </>,
          document.body
        )}
    </header>
  );
}
