'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * ResultsCommitment — "The Carisma Results Commitment" section (Carisma Aesthetics).
 *
 * Adapted from Carisma Slimming's ResultsGuarantee, re-skinned to the Aesthetics
 * teal/blue palette and "Glow with Confidence" voice. A calm, premium, centred
 * "About Us / stats" layout: a small pill eyebrow, a Trajan H2 (uppercase) with a
 * system-font subline, a fanned cluster of three image cards (a prominent upright
 * centre card with two rotated cards behind it), a row of three stat figures
 * divided by thin rules, and the shared teal CTA pill that links to /consultation
 * (the site-wide ConsultationModal intercepts it).
 *
 * All copy stays in the server-rendered DOM (SEO / a11y). One subtle,
 * reduced-motion-safe fade/rise reveal cascades heading → images → stats → CTA.
 * No WebGL, no frosted panels — just whitespace, typography and three photos.
 *
 * NOTE: the three stat figures below (100% / 12+ / 3,000+) are PLACEHOLDER values
 * chosen to fit the design and avoid inventing precise clinical efficacy claims.
 * Verify and replace with real, owner-confirmed data before relying on them
 * publicly.
 */

const INK = '#0c0b0b'; // near-black heading (--ink)
const TEAL_DEEP = '#4f7373'; // accessible teal — big numbers / CTA fill (AA, white text passes)
const TEAL_TEXT = '#406060'; // teal as small text / divider / eyebrow (AA on white + light tints)
const TEAL_100 = '#f7fafa'; // lightest teal tint — section background gradient stop
const BODY = '#706552'; // brand taupe-brown body (--ink-soft, AA on near-white)
const SERIF = '"Trajan Pro", Georgia, serif'; // headings + big numbers (uppercase only)
const WIDE = '"Novecento Wide", sans-serif'; // eyebrow / stat titles / CTA label
const SYS = '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'; // body (normal weight)

/* The three fanned photos. Centre card sits upright and larger; the two
   flanking cards are rotated and tucked behind it like a hand of cards.
   All paths are real, verified assets in /public/assets. */
const CARDS = [
  {
    src: '/assets/clinic-interior-2.jpg',
    alt: 'Carisma Aesthetics clinic interior — premium treatment suite in Birkirkara, Malta',
    role: 'left' as const,
  },
  {
    src: '/assets/clinic-interior-1-resized.jpg',
    alt: 'Professional consultation room at the Carisma Aesthetics clinic in Malta',
    role: 'center' as const,
  },
  {
    src: '/assets/clinic-treatment-room.jpg',
    alt: 'Doctor-led aesthetic treatment in progress at Carisma Aesthetics Malta',
    role: 'right' as const,
  },
];

const STATS = [
  {
    value: '97%',
    title: 'Would Recommend',
    desc: 'Clients who say they would recommend Carisma Aesthetics to a friend or family member.',
  },
  {
    value: '12+',
    title: 'Treatments',
    desc: 'A full menu of advanced face and skin treatments, tailored to your features and your goals.',
  },
  {
    value: '10,000+',
    title: 'Glow-Ups',
    desc: 'Clients across Malta who chose natural-looking results delivered with genuine care.',
  },
];

export default function ResultsCommitment() {
  const rootRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // Respect reduced motion: reveal immediately, skip the observer & hidden state.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      return;
    }

    setArmed(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-labelledby="results-commitment-heading"
      data-armed={armed && !revealed ? '' : undefined}
      className={`rc${revealed ? ' rc--in' : ''}`}
      style={{
        padding: 'clamp(36px,6vw,88px) 0',
        background: "transparent",
      }}
    >
      <style>{`
        /* Subtle, reduced-motion-safe fade/rise. The hidden start state only
           applies once JS has armed the section (data-armed), so SSR / no-JS
           renders stay fully visible. */
        .rc[data-armed] .rc-rise { opacity: 0; transform: translateY(14px); }
        .rc-rise { transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
        .rc--in .rc-rise { opacity: 1; transform: none; }
        .rc-rise.rc-d1 { transition-delay: .08s; }
        .rc-rise.rc-d2 { transition-delay: .18s; }
        .rc-rise.rc-d3 { transition-delay: .28s; }
        .rc-rise.rc-d4 { transition-delay: .38s; }

        /* ── Fanned image cluster ── */
        .rc-fan {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: clamp(300px, 40vw, 440px);
        }
        .rc-card {
          position: absolute;
          border-radius: 20px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 24px 60px -20px rgba(79,115,115,0.30), 0 6px 18px -8px rgba(79,115,115,0.20);
          transition: transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s ease;
        }
        .rc-card img { object-fit: cover; }
        .rc-card--center {
          width: clamp(220px, 26vw, 300px);
          height: clamp(280px, 33vw, 380px);
          z-index: 3;
        }
        .rc-card--left {
          width: clamp(180px, 22vw, 250px);
          height: clamp(240px, 28vw, 320px);
          transform: translateX(clamp(-118px, -16vw, -176px)) rotate(-8deg);
          z-index: 1;
        }
        .rc-card--right {
          width: clamp(180px, 22vw, 250px);
          height: clamp(240px, 28vw, 320px);
          transform: translateX(clamp(118px, 16vw, 176px)) rotate(8deg);
          z-index: 1;
        }
        /* Card hover lift — gentle rise + deeper teal shadow (mirrors .card-lift). */
        .rc-card--center:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 34px 72px -22px rgba(79,115,115,0.38), 0 10px 24px -10px rgba(79,115,115,0.26);
        }
        .rc-card--left:hover {
          transform: translateX(clamp(-118px, -16vw, -176px)) translateY(-8px) rotate(-8deg);
          box-shadow: 0 34px 72px -22px rgba(79,115,115,0.38), 0 10px 24px -10px rgba(79,115,115,0.26);
        }
        .rc-card--right:hover {
          transform: translateX(clamp(118px, 16vw, 176px)) translateY(-8px) rotate(8deg);
          box-shadow: 0 34px 72px -22px rgba(79,115,115,0.38), 0 10px 24px -10px rgba(79,115,115,0.26);
        }
        /* On very small screens, tighten the fan to a gentle overlap. */
        @media (max-width: 460px) {
          .rc-fan { height: clamp(280px, 78vw, 340px); }
          .rc-card--center { width: 60vw; height: 74vw; max-height: 320px; }
          .rc-card--left  { transform: translateX(-32vw) rotate(-7deg); }
          .rc-card--right { transform: translateX(32vw) rotate(7deg); }
          .rc-card--left:hover  { transform: translateX(-32vw) translateY(-6px) rotate(-7deg); }
          .rc-card--right:hover { transform: translateX(32vw) translateY(-6px) rotate(7deg); }
        }

        /* ── Stats row ── */
        .rc-stats {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        .rc-stat { padding: 24px clamp(16px,3vw,40px); text-align: center; }
        .rc-stat + .rc-stat { border-top: 1px solid rgba(64,96,96,0.18); }
        @media (min-width: 760px) {
          .rc-stats { grid-template-columns: repeat(3, 1fr); }
          .rc-stat + .rc-stat { border-top: none; border-left: 1px solid rgba(64,96,96,0.22); }
        }

        /* ── CTA ── */
        .rc-cta:focus-visible { outline: 3px solid ${TEAL_DEEP}; outline-offset: 3px; }

        @media (prefers-reduced-motion: reduce) {
          .rc-rise { transition: none !important; opacity: 1 !important; transform: none !important; }
          .rc-card { transition: none !important; }
          .rc-card--center:hover { transform: none; }
          .rc-card--left:hover  { transform: translateX(clamp(-118px, -16vw, -176px)) rotate(-8deg); }
          .rc-card--right:hover { transform: translateX(clamp(118px, 16vw, 176px)) rotate(8deg); }
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* ── Heading ── */}
        <div className="rc-rise" style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '7px 16px',
              borderRadius: 999,
              border: `1px solid ${TEAL_TEXT}`,
              background: 'rgba(64,96,96,0.06)',
              color: TEAL_TEXT,
              fontFamily: WIDE,
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            Our Commitment
          </span>
          <h2
            id="results-commitment-heading"
            style={{
              color: INK,
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: 'clamp(27px,3.8vw,42px)',
              lineHeight: 1.16,
              margin: '22px 0 0',
            }}
          >
            Award-Winning Aesthetic Clinic
          </h2>
          <p style={{ color: BODY, fontFamily: SYS, fontSize: 'clamp(16px,1.7vw,19px)', lineHeight: 1.6, margin: '14px auto 0', maxWidth: 540 }}>
            Doctor-led. Natural-looking. Built around you — so you glow with confidence, never overdone.
          </p>
        </div>

        {/* ── Fanned image cluster ── */}
        <div className="rc-fan rc-rise rc-d1" style={{ marginTop: 'clamp(40px,6vw,64px)' }}>
          {CARDS.map((c) => (
            <div key={c.src} className={`rc-card rc-card--${c.role}`}>
              <Image
                src={c.src}
                alt={c.alt}
                fill
                sizes="(max-width: 460px) 60vw, (max-width: 760px) 30vw, 300px"
                style={{ objectPosition: '50% 30%' }}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* ── Stats row ── */}
        <div className="rc-stats rc-rise rc-d2" style={{ marginTop: 'clamp(48px,7vw,80px)' }}>
          {STATS.map((s) => (
            <div key={s.title} className="rc-stat">
              <div
                style={{
                  color: TEAL_DEEP,
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: 'clamp(40px,5.5vw,60px)',
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <h3
                style={{
                  color: INK,
                  fontFamily: WIDE,
                  fontSize: 12.5,
                  fontWeight: 400,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  margin: '14px 0 8px',
                }}
              >
                {s.title}
              </h3>
              <p style={{ color: BODY, fontFamily: SYS, fontSize: 14.5, lineHeight: 1.6, margin: 0, maxWidth: 300, marginInline: 'auto' }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ── CTA pill ── */}
        <div className="rc-rise rc-d3" style={{ textAlign: 'center', marginTop: 'clamp(40px,6vw,64px)' }}>
          <Link
            href="/consultation"
            className="cta-glow-teal rc-cta"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '15px 36px',
              borderRadius: 999,
              color: '#fff',
              fontFamily: WIDE,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Book Your Free Consultation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
