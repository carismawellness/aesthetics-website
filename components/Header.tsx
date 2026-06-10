"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CONTACT,
  FACE_LINKS,
  BODY_LINKS,
  PACKAGE_LINKS,
  type NavLink,
} from "@/lib/site";

const ANNOUNCE =
  "#1 VOTED MED-AESTHETICS CLINIC IN MALTA ⭐ HIGHEST RATED CLINIC IN MALTA ⭐ MEDICALLY QUALIFIED DOCTORS";

type Dropdown = { label: string; href?: string; items?: NavLink[] };

const MENUS: Dropdown[] = [
  { label: "Face", items: FACE_LINKS },
  { label: "Body", items: BODY_LINKS },
  { label: "Packages", items: PACKAGE_LINKS },
  { label: "Membership", href: "/membership" },
  { label: "Gifts", href: "/e-giftcards-vouchers" },
];

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

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div
        className="w-full overflow-hidden"
        style={{ backgroundColor: "var(--teal-100)", color: "var(--gold)", padding: "7px 0", fontSize: "11px" }}
      >
        <div
          className="marquee-track font-display"
          style={{ letterSpacing: "0.18em", fontWeight: 500 }}
        >
          <span style={{ paddingRight: "60px" }}>{ANNOUNCE}</span>
          <span style={{ paddingRight: "60px" }}>{ANNOUNCE}</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-white border-b" style={{ borderColor: "var(--line)" }}>
        <div className="container flex items-center justify-between" style={{ height: "78px" }}>
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo.png" alt="Carisma Aesthetics" style={{ height: "34px", width: "auto" }} />
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center" style={{ gap: "34px" }}>
            {MENUS.map((m) =>
              m.items ? (
                <div key={m.label} className="relative group">
                  <button className="font-display flex items-center gap-1" style={{ fontSize: "13px", letterSpacing: "0.12em", padding: "28px 0", color: "var(--label)" }}>
                    {m.label}
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 4l4 4 4-4" /></svg>
                  </button>
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:grid bg-white shadow-xl z-50"
                    style={{
                      gridTemplateColumns: "1fr",
                      minWidth: "330px",
                      padding: "16px 0",
                      borderTop: "2px solid var(--gold)",
                    }}
                  >
                    {m.items.map((it) => (
                      <Link
                        key={it.href}
                        href={it.href}
                        className="block hover:bg-cream transition-colors text-center"
                        style={{ padding: "9px 24px", fontSize: "11px", color: "var(--label)", textTransform: "uppercase", letterSpacing: "0.08em" }}
                      >
                        {it.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={m.label} href={m.href!} className="font-display" style={{ fontSize: "13px", letterSpacing: "0.12em", color: "var(--label)" }}>
                  {m.label}
                </Link>
              )
            )}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center" style={{ gap: "22px" }}>
            <a href={`tel:${CONTACT.tel}`} className="flex items-center gap-2" style={{ color: "var(--gold)" }}>
              <PhoneIcon />
              <span style={{ color: "var(--ink-soft)", letterSpacing: "1px", fontSize: "14px" }}>{CONTACT.phoneDigits}</span>
            </a>
            <Link href="/consultation" className="btn btn-teal">
              free consultation
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={open ? "M6 18L18 6M6 6l12 12" : "M4 7h16M4 12h16M4 17h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t bg-white" style={{ borderColor: "var(--line)", maxHeight: "75vh", overflowY: "auto" }}>
            <div className="container py-3">
              {MENUS.map((m) =>
                m.items ? (
                  <div key={m.label} className="border-b" style={{ borderColor: "var(--line)" }}>
                    <button
                      className="w-full flex items-center justify-between font-display"
                      style={{ padding: "13px 0", fontSize: "13px", letterSpacing: "0.12em" }}
                      onClick={() => setExpanded(expanded === m.label ? null : m.label)}
                    >
                      {m.label}
                      <span>{expanded === m.label ? "−" : "+"}</span>
                    </button>
                    {expanded === m.label && (
                      <div className="pb-2">
                        {m.items.map((it) => (
                          <Link key={it.href} href={it.href} onClick={() => setOpen(false)} className="block" style={{ padding: "8px 12px", fontSize: "14px", color: "var(--label)" }}>
                            {it.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={m.label} href={m.href!} onClick={() => setOpen(false)} className="block border-b font-display" style={{ borderColor: "var(--line)", padding: "13px 0", fontSize: "13px", letterSpacing: "0.12em" }}>
                    {m.label}
                  </Link>
                )
              )}
              <a href={`tel:${CONTACT.tel}`} className="flex items-center gap-2 py-4" style={{ color: "var(--gold)" }}>
                <PhoneIcon />
                <span style={{ color: "var(--ink-soft)", letterSpacing: "1px" }}>{CONTACT.phoneDigits}</span>
              </a>
              <Link href="/consultation" onClick={() => setOpen(false)} className="btn btn-gold w-full">
                free consultation
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
