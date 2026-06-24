'use client';
import Link from "next/link";
import Image from "next/image";
import { CONTACT } from "@/lib/site";
import DoctorsSection from "@/components/home/DoctorsSection";
import Reviews from "@/components/home/Reviews";
import SiteSearch from "@/components/SiteSearch";
import FooterRose from "@/components/FooterRose";

// ─── Shared design tokens (cross-file consistent) ────────────────────────────
const GRADIENT = 'radial-gradient(120% 90% at 85% 10%, #eaf1f1 0%, #f4f9f9 45%, #ffffff 100%)';
const INK   = '#4f7373';  // brand teal — no black anywhere on aesthetics site
const TEXT  = '#333333';
const MUTED = '#595959';
const TEAL  = '#4f7373';  // deep teal — WCAG AA on light backgrounds
const DECO  = '#96B2B2';  // decorative-only teal
const HAIR  = '#DEEBEB';  // hairlines
const SERIF = 'Trajan Pro, "Trajan Pro Regular", Georgia, serif';
const WIDE  = '"Novecento Wide Book","Novecento Wide",sans-serif';
const BODY  = 'Roboto, sans-serif';

const IG_URL = CONTACT.instagram;
const FB_URL = CONTACT.facebook;

// ─── Static data ─────────────────────────────────────────────────────────────
const BRANDS = [
  {
    title: 'Carisma Spa & Wellness',
    img: '/assets/banner-spa.png',
    cta: 'Discover Our Spas',
    href: 'https://www.carismaspa.com',
    btnColor: '#8c6d18',
  },
  {
    title: 'Carisma Slimming',
    img: '/assets/banner-slimming.png',
    cta: 'Discover Slimming',
    href: 'https://www.carismaslimming.com',
    btnColor: '#4f7256',
  },
];

const IG_SRCS = [
  { src: '/assets/clinic-interior-2.jpg', alt: 'Carisma Aesthetics clinic interior in Malta' },
  { src: '/assets/clinic-treatment-room.jpg', alt: 'Treatment room at Carisma Aesthetics Malta' },
  { src: '/assets/clinic-interior-1-resized.jpg', alt: 'Carisma Aesthetics medical aesthetics clinic' },
  { src: '/assets/treatments/botox-hero.jpg', alt: 'Doctor-led Botox treatment at Carisma Aesthetics' },
];

const NAV_LINKS = [
  { label: 'Face Treatments', href: '/face-treatments' },
  { label: 'Body Treatments', href: '/body-treatments' },
  { label: 'Packages', href: '/packages' },
  { label: 'Membership', href: '/membership' },
  { label: 'Gifts & Vouchers', href: '/e-giftcards-vouchers' },
  { label: 'Book a Consultation', href: '/consultation' },
  { label: 'Blog', href: '/blog' },
];

// ─── Micro helpers ────────────────────────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: WIDE, fontSize: '11px', fontWeight: 700, letterSpacing: '3.5px', textTransform: 'uppercase', color: MUTED, marginBottom: '10px' }}>
      {children}
    </p>
  );
}
function Rule({ center = false }: { center?: boolean }) {
  return <div style={{ width: '36px', height: '1px', backgroundColor: DECO, marginBottom: '24px', ...(center ? { marginLeft: 'auto', marginRight: 'auto' } : {}) }} />;
}

// ─── Section: Sister Brands ───────────────────────────────────────────────────
function BrandsSection() {
  return (
    <section aria-labelledby="footer-brands-h" style={{ background: 'transparent', padding: 'clamp(48px, 9vw, 80px) 0' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ textAlign: 'center', marginBottom: 'clamp(24px, 5vw, 40px)' }}>
          <Eyebrow>The Carisma Wellness Group</Eyebrow>
          <Rule center />
          <h3 id="footer-brands-h" style={{ fontFamily: SERIF, fontSize: 'clamp(20px,3vw,28px)', fontWeight: 400, color: INK, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0' }}>
            Malta&rsquo;s Leading Wellness Group
          </h3>
        </div>
        {/* Two side-by-side brand cards — same structure as the Carisma Slimming
            footer (two-up grid, dark gradient, white CTA pill with arrow). The
            designed banners already carry the white logo + Google-reviews strip on
            their LEFT, so each card uses objectPosition:left at a ~2:1 aspect to
            keep the logo/reviews intact while trimming only the right photo edge. */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '20px' }}>
          {BRANDS.map((brand) => (
            <a
              key={brand.title}
              href={brand.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${brand.cta} — opens in new tab`}
              data-brand-cta
              style={{ position: 'relative', display: 'block', height: 'clamp(210px, 52vw, 264px)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.10)', textDecoration: 'none' }}
            >
              <Image
                src={brand.img}
                alt={brand.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover', objectPosition: 'left center' }}
                loading="lazy"
              />
              {/* gradient strengthens the bottom-right so the CTA pill stays legible */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(300deg, rgba(2,20,20,0.45) 0%, rgba(2,20,20,0.12) 45%, transparent 70%)' }} />
              <span
                className="btn"
                style={{
                  position: 'absolute',
                  right: '20px',
                  bottom: '20px',
                  minHeight: '44px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: brand.btnColor,
                  color: '#fff',
                  fontFamily: WIDE,
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  padding: '12px 22px',
                  borderRadius: '999px',
                }}
              >
                {brand.cta} →
              </span>
            </a>
          ))}
        </div>
        <style>{`
          [data-brand-cta] { transition: transform 200ms ease; }
          [data-brand-cta]:hover { transform: translateY(-4px); }
          [data-brand-cta]:active { transform: translateY(-1px); }
          @media (prefers-reduced-motion: reduce) {
            [data-brand-cta]:hover, [data-brand-cta]:active { transform: none; }
          }
        `}</style>
      </div>
    </section>
  );
}

// ─── Section: Light base ──────────────────────────────────────────────────────
function FooterBase() {
  return (
    <div style={{ background: 'transparent' }}>
      {/* Info grid — 3-column layout matching Slimming: Brand | Explore | Get in Touch */}
      <div style={{ padding: 'clamp(32px, 6vw, 52px) 0 clamp(28px, 5vw, 44px)', borderBottom: `1px solid ${HAIR}` }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: '44px' }}>

            {/* Brand */}
            <div>
              <p style={{ fontFamily: SERIF, fontSize: '18px', fontWeight: 400, color: INK, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Carisma Aesthetics</p>
              <p style={{ fontFamily: BODY, fontSize: '13px', lineHeight: 1.75, color: TEXT, maxWidth: '210px', marginBottom: '20px' }}>
                Glow with confidence — doctor-led medical aesthetics in Malta. Natural results, delivered with care.
              </p>
              <div style={{ display: 'flex', gap: '14px' }}>
                {[
                  { href: IG_URL, label: 'Instagram', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg> },
                  { href: FB_URL, label: 'Facebook', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.45 9-4.7 9-9.95z" /></svg> },
                ].map(({ href, label, icon }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    style={{ color: TEAL, transition: 'color .2s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = INK)}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = TEAL)}>
                    {icon}
                  </a>
                ))}
              </div>

              {/* Follow us — desktop only */}
              <div className="hidden md:block" style={{ marginTop: '26px' }}>
                <h3 style={{ fontFamily: WIDE, fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: MUTED, marginBottom: '12px' }}>Follow us</h3>
                <a href={IG_URL} target="_blank" rel="noopener noreferrer" style={{ fontFamily: BODY, fontSize: '13px', color: TEXT, textDecoration: 'none', display: 'inline-block', marginBottom: '12px', transition: 'color .2s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = TEAL)}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = TEXT)}>
                  @carismaaesthetics
                </a>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '7px', maxWidth: '212px' }}>
                  {IG_SRCS.map((img, i) => (
                    <a key={i} href={IG_URL} target="_blank" rel="noopener noreferrer" aria-label={`${img.alt} — Instagram`}
                      style={{ display: 'block', aspectRatio: '1/1', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
                      <Image src={img.src} alt={img.alt} fill style={{ objectFit: 'cover' }} sizes="110px" loading="lazy" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Explore — flat nav list */}
            <div>
              <h3 style={{ fontFamily: WIDE, fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: MUTED, marginBottom: '18px' }}>Explore</h3>
              <nav aria-label="Footer navigation">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
                  {NAV_LINKS.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} style={{ fontFamily: BODY, fontSize: '13px', color: TEXT, textDecoration: 'none', transition: 'color .2s' }}
                        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = TEAL)}
                        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = TEXT)}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Get in touch */}
            <div>
              <h3 style={{ fontFamily: WIDE, fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: MUTED, marginBottom: '18px' }}>Get in touch</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '13px' }}>
                {[
                  { href: `tel:${CONTACT.tel}`, label: CONTACT.phone, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.21 12.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.128.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.572 2.81.7A2 2 0 0 1 22 16.92z" /></svg> },
                  { href: `mailto:${CONTACT.email}`, label: CONTACT.email, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> },
                ].map(({ href, label, icon }) => (
                  <li key={href}>
                    <a href={href} style={{ display: 'flex', alignItems: 'center', gap: '9px', color: TEXT, fontFamily: BODY, fontSize: '13px', textDecoration: 'none', transition: 'color .2s' }}
                      onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = TEAL)}
                      onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = TEXT)}>
                      <span style={{ color: TEAL, flexShrink: 0 }}>{icon}</span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Slim full-width search bar */}
          <div className="hidden md:block" style={{ marginTop: '40px', paddingTop: '32px', borderTop: `1px solid ${HAIR}` }}>
            <SiteSearch />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{ padding: '18px 0' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
          <p style={{ fontFamily: BODY, fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: MUTED }}>
            © {new Date().getFullYear()} Carisma Aesthetics. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '22px' }}>
            {[{ label: 'Privacy Policy', href: '/privacy-policy' }, { label: 'Terms & Conditions', href: '/terms-conditions' }].map(({ label, href }) => (
              <Link key={href} href={href} style={{ fontFamily: BODY, fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: MUTED, textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = TEAL)}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = MUTED)}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer style={{ background: GRADIENT, position: 'relative', overflow: 'hidden', isolation: 'isolate' }}>
      {/* decorative rose hidden on mobile (it overlapped the copyright) */}
      <div className="hidden md:block"><FooterRose /></div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Reviews />
        {/* heavy/decorative rows hidden on mobile to keep the footer lean */}
        <div className="hidden md:block"><DoctorsSection /></div>
        <BrandsSection />
        <FooterBase />
      </div>
    </footer>
  );
}
