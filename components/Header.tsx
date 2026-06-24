"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  CONTACT,
  FACE_LINKS,
  BODY_LINKS,
  PACKAGE_LINKS,
  type NavLink,
} from "@/lib/site";

// ── Aesthetics palette (slimming green → aesthetics teal) ──────────────────
// CTA fill / active ink:  --teal-deep #4f7373 (white text passes AA)
// Teal text / link / icon: --teal-text #406060 (AA on white)
// Nav-link ink keeps the existing aesthetics token #423a30.
const TEAL_FILL = "#4f7373";   // CTA fill (slimming GREEN_FILL → teal-deep)
const TEAL = "#406060";        // small teal text / phone / icons (slimming GREEN → teal-text)
const NAV_INK = "#245052";     // nav-link ink (brand teal)
const DROPDOWN_INK = "#245052"; // dropdown/sub-item link ink (brand teal)

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

function PhoneIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.21 12.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.128.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.572 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function Header() {
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
    closeTimer.current = setTimeout(() => setHover(null), 140);
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
      {/* Logo sizing rules (slimming): mobile ~20px, mobile-menu ~22px. */}
      <style>{`@media (max-width:1023px){.header-logo{height:20px !important}}
.header-logo--mobile{height:22px !important}`}</style>

      {/* Floating glass pill */}
      <div style={{ padding: "12px clamp(12px,3vw,28px) 0", maxWidth: "1280px", margin: "0 auto" }}>
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between"
          style={{ ...pillStyle, minHeight: "52px", padding: "6px 10px 6px 20px" }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" onClick={() => setOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image src="/assets/logo.png" alt="Carisma Aesthetics" className="header-logo" width={120} height={26} style={{ height: "26px", width: "auto", display: "block" }} quality={85} />
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center" style={{ gap: "26px" }}>
            {MENUS.map((m) => {
              if (!m.items) {
                return (
                  <Link key={m.label} href={m.href!} style={navLink} className="hover:underline transition">{m.label}</Link>
                );
              }
              const { items, showViewAll } = curate(m);
              return (
                <div
                  key={m.label}
                  className="relative"
                  style={{ display: "flex", alignItems: "center" }}
                  onMouseEnter={() => openMenu(m.label)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    style={{ ...navLink, background: "none", border: "none", cursor: "pointer", padding: "20px 0", display: "flex", alignItems: "center", gap: "4px" }}
                    className="hover:underline transition"
                    aria-haspopup="true"
                    aria-expanded={hover === m.label}
                    onClick={() => setHover((p) => (p === m.label ? null : m.label))}
                  >
                    {m.label}
                    <svg
                      width="10" height="10" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transition: "transform 0.2s ease", transform: hover === m.label ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.7 }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {hover === m.label && (
                    <div
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                      style={{
                      position: "absolute",
                      top: "calc(100% - 4px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "rgba(255,255,255,0.82)",
                      backdropFilter: "blur(22px) saturate(180%)",
                      WebkitBackdropFilter: "blur(22px) saturate(180%)",
                      border: "1px solid rgba(255,255,255,0.7)",
                      borderRadius: "16px",
                      boxShadow: "0 16px 40px rgba(28,30,30,0.16), inset 0 1px 0 rgba(255,255,255,0.85)",
                      width: "360px",
                      padding: "10px",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      columnGap: "6px",
                      zIndex: 100,
                    }}>
                      {/* Invisible hover bridge: spans the full panel width and
                          covers the gap up to the trigger, so moving the cursor
                          from the (narrow) button down into the (wide, centered)
                          panel never crosses dead space and closes the menu. */}
                      <span
                        aria-hidden
                        style={{
                          position: "absolute",
                          bottom: "100%",
                          left: 0,
                          right: 0,
                          height: "18px",
                          background: "transparent",
                        }}
                      />
                      {items.map((it) => (
                        <Link key={it.href} href={it.href} className="block hover:bg-black/5 hover:underline"
                          style={{ padding: "9px 14px", borderRadius: "10px", color: DROPDOWN_INK, fontFamily: '"Roboto Local", sans-serif', fontSize: "13px", textDecoration: "none", transition: "background 0.3s ease", whiteSpace: "nowrap" }}>
                          {it.label}
                        </Link>
                      ))}
                      {showViewAll && (
                        <Link href={m.viewAllHref!} className="block hover:bg-black/5 hover:underline"
                          style={{ gridColumn: "1 / -1", marginTop: "4px", borderTop: "1px solid rgba(64,96,96,0.16)", paddingTop: "10px", padding: "10px 14px 4px", color: TEAL, fontFamily: '"Roboto Local", sans-serif', fontSize: "13px", fontWeight: 600, textDecoration: "none", transition: "background 0.3s ease" }}>
                          View all →
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right — phone + CTA (search lives in the footer) */}
          <div className="hidden lg:flex items-center" style={{ gap: "18px" }}>
            <a href={`tel:${CONTACT.tel}`} className="flex items-center hover:underline transition" style={{ gap: "6px", textDecoration: "none" }}>
              <PhoneIcon />
              <span style={{ color: TEAL, fontFamily: '"Novecento Wide", sans-serif', fontSize: "13px", fontWeight: 600, letterSpacing: "0.5px" }}>{CONTACT.phoneDigits}</span>
            </a>
            <Link href="/consultation" className="cta-glow-teal" style={{ ...ctaStyle }}>free consultation</Link>
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Image src="/assets/logo.png" alt="Carisma Aesthetics" className="header-logo--mobile" width={100} height={22} style={{ height: "22px", width: "auto", display: "block" }} quality={85} />
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
            <Link
              href="/consultation"
              onClick={() => setOpen(false)}
              className="cta-glow-teal block text-center w-full"
              style={{ ...ctaStyle, marginTop: "10px", padding: "14px", fontSize: "13px" }}
            >
              free consultation
            </Link>
          </div>
        </div>
      )}

      {/* Mobile-only sticky bottom CTA — present on every page, hidden while the
          full-page menu is open. Portaled to <body> so the in-flow spacer can
          reserve room after the footer (existing aesthetics mobile behaviour). */}
      {mounted && !open &&
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
              <Link
                href="/consultation"
                className="cta-glow-teal block text-center w-full"
                style={{ ...ctaStyle, padding: "14px", fontSize: "13px" }}
              >
                Book Your Free Consultation
              </Link>
            </div>
          </>,
          document.body
        )}
    </header>
  );
}
