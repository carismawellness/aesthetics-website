'use client';
import Link from "next/link";
import Image from "next/image";
import { CONTACT, FACE_LINKS, BODY_LINKS, PACKAGE_LINKS, type NavLink } from "@/lib/site";
import DoctorsSection from "@/components/home/DoctorsSection";
import Reviews from "@/components/home/Reviews";
import SiteSearch from "@/components/SiteSearch";
import FooterRose from "@/components/FooterRose";

// ─── Shared design tokens (cross-file consistent) ────────────────────────────
const GRADIENT = 'radial-gradient(120% 90% at 85% 10%, #eaf1f1 0%, #f6f4ef 45%, #ffffff 100%)';
const INK   = '#1a1a1a';
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
  },
  {
    title: 'Carisma Slimming',
    img: '/assets/banner-slimming.png',
    cta: 'Discover Slimming',
    href: 'https://www.carismaslimming.com',
  },
];

// Small Instagram preview — real Carisma Aesthetics clinic/treatment images only.
// NOTE: these are site assets, NOT a live feed — to show the genuinely-latest
// @carismaaesthetics posts, wire an Instagram feed integration (Instagram Graph
// API token, or a widget like Behold / EmbedSocial). That is out of static scope.
// Each tile links to the clinic Instagram (IG_URL) in a new tab.
const IG_SRCS = [
  { src: '/assets/service-hydrafacial.png', alt: 'Hydrafacial treatment at Carisma Aesthetics' },
  { src: '/assets/service-microneedling.png', alt: 'Microneedling treatment at Carisma Aesthetics' },
  { src: '/assets/service-dermal-fillers.png', alt: 'Dermal fillers at Carisma Aesthetics' },
  { src: '/assets/clinic-room.jpg', alt: 'Carisma Aesthetics clinic in Malta' },
];

// Full-site footer navigation, grouped into columns. Every real page is sourced
// from lib/site.ts (FACE_LINKS, BODY_LINKS, PACKAGE_LINKS) so the footer stays in
// sync with the header nav; the "More" group holds the standalone pages.
type NavGroup = { title: string; links: NavLink[] };

const MORE_LINKS: NavLink[] = [
  { label: 'Face Treatments', href: '/face-treatments' },
  { label: 'Packages', href: '/membership' },
  { label: 'Membership', href: '/membership' },
  { label: 'Gifts & Vouchers', href: '/e-giftcards-vouchers' },
  { label: 'Book a Consultation', href: '/consultation' },
  { label: 'Blog', href: '/blog' },
];

const NAV_GROUPS: NavGroup[] = [
  { title: 'Face', links: FACE_LINKS },
  { title: 'Body', links: BODY_LINKS },
  { title: 'Packages', links: PACKAGE_LINKS },
  { title: 'More', links: MORE_LINKS },
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
          <h2 id="footer-brands-h" style={{ fontFamily: SERIF, fontSize: 'clamp(20px,3vw,28px)', fontWeight: 400, color: INK, letterSpacing: '1px', marginBottom: '0' }}>
            Malta&rsquo;s leading wellness group
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '20px' }}>
          {BRANDS.map((brand) => (
            <div key={brand.title} style={{ position: 'relative', height: 'clamp(210px, 54vw, 272px)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
              <Image src={brand.img} alt={brand.title} fill style={{ objectFit: 'cover' }} sizes="(max-width:768px) 100vw, 50vw" loading="lazy" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg,rgba(0,30,40,0.72) 0%,rgba(0,30,40,0.22) 60%,transparent 100%)' }} />
              <div style={{ position: 'absolute', inset: 0, padding: '28px 28px 28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <p style={{ fontFamily: SERIF, fontSize: '17px', fontWeight: 400, color: '#fff', letterSpacing: '1.5px', marginBottom: '14px', lineHeight: 1.3 }}>
                  {brand.title}
                </p>
                <a href={brand.href} target="_blank" rel="noopener noreferrer" aria-label={`${brand.cta} — opens in new tab`}
                  style={{ display: 'inline-flex', alignItems: 'center', fontFamily: WIDE, fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', textDecoration: 'none', color: '#fff', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', padding: '11px 20px', borderRadius: '999px', minHeight: '42px', width: 'fit-content', transition: 'background .2s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.28)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.15)')}>
                  {brand.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Light base ──────────────────────────────────────────────────────
function FooterBase() {
  return (
    <div style={{ background: 'transparent' }}>
      {/* Info grid */}
      <div style={{ padding: '52px 0 44px', borderBottom: `1px solid ${HAIR}` }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px,300px) 1fr', gap: '44px' }} className="footer-info-grid">
            <style>{`@media (max-width:767px){.footer-info-grid{grid-template-columns:1fr !important}}`}</style>

            {/* Brand + socials + IG preview */}
            <div>
              <p style={{ fontFamily: SERIF, fontSize: '18px', fontWeight: 400, color: INK, letterSpacing: '1px', marginBottom: '12px' }}>Carisma Aesthetics</p>
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

              {/* Follow us — embedded under the brand column (desktop only) */}
              <div className="hidden md:block" style={{ marginTop: '26px' }}>
                <h4 style={{ fontFamily: WIDE, fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: MUTED, marginBottom: '12px' }}>Follow us</h4>
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

            {/* Explore (full-site nav, multi-column) + Get in touch underneath */}
            <div>
              <h4 style={{ fontFamily: WIDE, fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: MUTED, marginBottom: '18px' }}>Explore</h4>
              <nav aria-label="Footer navigation">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '28px 24px' }}>
                  {NAV_GROUPS.map((group) => (
                    <div key={group.title}>
                      <h5 style={{ fontFamily: WIDE, fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: TEAL, marginBottom: '12px' }}>{group.title}</h5>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {group.links.map(({ label, href }) => (
                          <li key={`${group.title}-${href}-${label}`}>
                            <Link href={href} style={{ fontFamily: BODY, fontSize: '13px', lineHeight: 1.4, color: TEXT, textDecoration: 'none', transition: 'color .2s' }}
                              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = TEAL)}
                              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = TEXT)}>
                              {label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </nav>

              {/* Get in touch — directly underneath Explore */}
              <div style={{ marginTop: '36px' }}>
                <h4 style={{ fontFamily: WIDE, fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: MUTED, marginBottom: '18px' }}>Get in touch</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '13px 32px' }}>
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

          </div>

          {/* Slim full-width search bar, directly under the info block (Slimming spec) */}
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
