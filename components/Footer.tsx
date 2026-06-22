import Link from "next/link";
import { CONTACT, FACE_LINKS, BODY_LINKS, PACKAGE_LINKS } from "@/lib/site";
import Reveal from "@/components/Reveal";
import DoctorsSection from "@/components/home/DoctorsSection";
import Reviews from "@/components/home/Reviews";
import AwardSection from "@/components/home/AwardSection";
import AmbientField from "@/components/fx/AmbientField";
import Motif from "@/components/fx/Motif";

// ─── Shared design tokens (aesthetics palette, WCAG AA) ─────────────────────────
// The whole footer sits on the same hero mist gradient, adapted to aesthetics teal.
const GRADIENT =
  "radial-gradient(120% 90% at 85% 10%, var(--teal-100) 0%, #f6f4ef 45%, #ffffff 100%)";
const SERIF = '"Trajan Pro", Georgia, serif'; // titling caps — always uppercase

// ─── Sister brands (aesthetics cross-promotes the OTHER two) ────────────────────
const BRANDS = [
  {
    title: "Carisma Spa & Wellness",
    img: "/assets/banner-spa.png",
    cta: "Discover Our Spas",
    href: "https://www.carismaspa.com",
  },
  {
    title: "Carisma Slimming",
    img: "/assets/banner-slimming.png",
    cta: "Discover Slimming",
    href: "https://www.carismaslimming.com",
  },
];

// Instagram preview — site assets (not a live feed). To show real @carismaaesthetics
// posts, wire an Instagram feed integration (Basic Display API token or a widget).
// All four files are confirmed present under /public/assets.
const IG_SRCS = [
  { src: "/assets/service-hydrafacial.png", alt: "Hydrafacial treatment at Carisma Aesthetics" },
  { src: "/assets/service-microneedling.png", alt: "Microneedling treatment" },
  { src: "/assets/service-dermal-fillers.png", alt: "Dermal fillers" },
  { src: "/assets/clinic-room.jpg", alt: "Carisma Aesthetics clinic in Malta" },
];

// Compact footer nav — a curated cross-section of the main service families.
const NAV_COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  { heading: "Face Treatments", links: FACE_LINKS.slice(0, 6) },
  { heading: "Body Treatments", links: BODY_LINKS.slice(0, 6) },
  { heading: "Packages", links: PACKAGE_LINKS },
];

// ─── Icons ──────────────────────────────────────────────────────────────────────
function Ig({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function Fb({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}
function Phone({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function Mail({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

// ─── Micro helpers ──────────────────────────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-display"
      style={{
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--muted)",
        marginBottom: "10px",
      }}
    >
      {children}
    </p>
  );
}
function Rule({ center = false }: { center?: boolean }) {
  return (
    <div
      style={{
        width: "36px",
        height: "1px",
        backgroundColor: "var(--teal)",
        marginBottom: "24px",
        ...(center ? { marginLeft: "auto", marginRight: "auto" } : {}),
      }}
    />
  );
}

// ─── Section: Sister brands (cross-brand block) ─────────────────────────────────
function BrandsSection() {
  return (
    <section aria-labelledby="footer-brands-h" className="container" style={{ padding: "clamp(48px, 9vw, 80px) 20px" }}>
      <Reveal style={{ maxWidth: "920px", margin: "0 auto", minWidth: 0 }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(24px, 5vw, 40px)" }}>
          <Eyebrow>The Carisma Wellness Group</Eyebrow>
          <Rule center />
          <h2
            id="footer-brands-h"
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(20px,3vw,28px)",
              fontWeight: 400,
              color: "var(--ink)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Malta&rsquo;s Leading Wellness Group
          </h2>
        </div>
        <div className="grid gap-6 grid-cols-1">
          {BRANDS.map((brand) => (
            <a
              key={brand.title}
              href={brand.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${brand.cta} — opens in new tab`}
              className="relative block overflow-hidden group"
              style={{ minWidth: 0, borderRadius: "var(--radius-card)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.img}
                alt={brand.title}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              />
              <span
                className="font-display"
                style={{
                  position: "absolute",
                  right: "22px",
                  bottom: "20px",
                  background: "rgba(255,255,255,0.92)",
                  color: "var(--ink)",
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "10px 18px",
                  borderRadius: "var(--radius-pill)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {brand.cta} <span aria-hidden>›</span>
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// ─── Section: Instagram grid ────────────────────────────────────────────────────
function InstagramSection() {
  return (
    <section aria-labelledby="footer-ig-h" className="container" style={{ padding: "clamp(40px, 7vw, 64px) 20px" }}>
      <Reveal style={{ maxWidth: "920px", margin: "0 auto", textAlign: "center", minWidth: 0 }}>
        <Eyebrow>Follow the Glow</Eyebrow>
        <Rule center />
        <h2
          id="footer-ig-h"
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(18px,2.6vw,26px)",
            fontWeight: 400,
            color: "var(--ink)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          @carismaaesthetics
        </h2>
        <a
          href={CONTACT.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline font-display"
          style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal-text)" }}
        >
          Follow on Instagram
        </a>
        <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: "12px", marginTop: "28px" }}>
          {IG_SRCS.map((img, i) => (
            <a
              key={i}
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${img.alt} — Instagram`}
              className="relative block overflow-hidden group"
              style={{ aspectRatio: "1 / 1", borderRadius: "var(--radius-card)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                style={{ objectFit: "cover" }}
              />
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// ─── Section: Darker base — nav columns + contact + socials ─────────────────────
function FooterBase() {
  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    letterSpacing: "0.1em",
    color: "var(--label)",
    textTransform: "uppercase",
  };
  return (
    <section
      className="ambient-host"
      style={{ background: "linear-gradient(180deg, var(--white) 0%, var(--cream-2) 100%)", padding: "56px 0 40px" }}
    >
      <AmbientField blob="top-left" tone="teal" soft dots />
      <Motif mode="watermark" opacity={0.045} />
      <div className="container">
        <div className="grid gap-x-10 gap-y-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + socials */}
          <div>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: "18px",
                fontWeight: 400,
                color: "var(--ink)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Carisma Aesthetics
            </p>
            <p style={{ fontSize: "13px", lineHeight: 1.75, color: "var(--label)", maxWidth: "230px", marginBottom: "20px" }}>
              Glow with confidence — doctor-led medical aesthetics in St Julian&rsquo;s, Malta. Subtle, natural results delivered with care.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center"
                style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid var(--teal-deep)", color: "var(--teal-deep)" }}
              >
                <Ig size={18} />
              </a>
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center justify-center"
                style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid var(--teal-deep)", color: "var(--teal-deep)" }}
              >
                <Fb size={18} />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="font-display" style={{ ...labelStyle, marginBottom: "18px", fontWeight: 700 }}>
                {col.heading}
              </h4>
              <nav aria-label={`${col.heading} footer navigation`}>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "11px" }}>
                  {col.links.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className="link-underline" style={{ fontSize: "13px", color: "#5b5249" }}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div
          className="grid gap-x-10 gap-y-6 grid-cols-1 sm:grid-cols-2"
          style={{ maxWidth: "640px", marginTop: "44px", paddingTop: "32px", borderTop: "1px solid var(--teal-100)" }}
        >
          <a href={`tel:${CONTACT.tel}`} className="flex items-center gap-4 group">
            <span
              className="shrink-0 inline-flex items-center justify-center"
              style={{ width: "42px", height: "42px", borderRadius: "50%", border: "1px solid var(--teal-deep)", color: "var(--teal-deep)" }}
            >
              <Phone />
            </span>
            <span className="flex flex-col">
              <h4 className="font-display" style={labelStyle}>Phone</h4>
              <span style={{ fontSize: "14px", color: "#5b5249" }} className="group-hover:underline">{CONTACT.phone}</span>
            </span>
          </a>
          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4 group">
            <span
              className="shrink-0 inline-flex items-center justify-center"
              style={{ width: "42px", height: "42px", borderRadius: "50%", border: "1px solid var(--teal-deep)", color: "var(--teal-deep)" }}
            >
              <Mail />
            </span>
            <span className="flex flex-col">
              <h4 className="font-display" style={labelStyle}>Email</h4>
              <span style={{ fontSize: "14px", color: "#5b5249" }} className="group-hover:underline">{CONTACT.email}</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Legal strip ───────────────────────────────────────────────────────
function LegalStrip() {
  return (
    <section
      className="ambient-host"
      style={{ background: "linear-gradient(180deg, var(--cream-2) 0%, var(--teal-100) 100%)", padding: "26px 0 40px" }}
    >
      <AmbientField blob="bottom-right" tone="teal" soft dots={false} />
      <div className="container">
        <div className="lg lg--panel" style={{ position: "relative", overflow: "hidden", padding: "18px 28px" }}>
          <Motif mode="watermark" opacity={0.06} />
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ fontSize: "12px", letterSpacing: "0.06em", color: "var(--label)" }}
          >
            <span>© {new Date().getFullYear()} – CARISMA AESTHETICS ALL RIGHTS RESERVED.</span>
            <div className="flex items-center gap-8">
              <Link href="/privacy-policy" className="link-underline">PRIVACY POLICY</Link>
              <Link href="/terms-conditions" className="link-underline">TERMS &amp; CONDITION</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main export — section order mirrors the slimming footer ────────────────────
export default function Footer() {
  return (
    <footer style={{ background: GRADIENT, position: "relative", overflow: "hidden", isolation: "isolate" }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* 1 — Doctors showcase */}
        <DoctorsSection />

        {/* 2 — Reviews + award band */}
        <Reviews />
        <AwardSection />

        {/* 3 — Cross-brand block (Spa / Slimming) */}
        <BrandsSection />

        {/* 4 — Instagram grid */}
        <InstagramSection />

        {/* 5 — Nav columns + contact + socials on darker base */}
        <FooterBase />

        {/* 6 — Legal strip */}
        <LegalStrip />
      </div>
    </footer>
  );
}
