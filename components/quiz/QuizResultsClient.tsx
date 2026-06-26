'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParticleScene = dynamic(() => import('./ParticleScene'), { ssr: false });

/* ── Brand tokens ─────────────────────────────────────────────────────── */
const SERIF    = '"Trajan Pro", Georgia, serif';
const WIDE     = '"Novecento Wide", sans-serif';
const BODY     = 'Roboto, sans-serif';
const TEAL     = '#4F7373';
const TEAL_D   = '#245052';
const TEAL_L   = '#DEEBEB';
const TEAL_B   = '#96B2B2';
const TAUPE    = '#6f6057';
const TAUPE_D  = '#3d3530';
const GOLD     = '#C4AD8E';

/* ── Types ─────────────────────────────────────────────────────────────── */
export type TreatmentRec = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  stats: { label: string; value: string }[];
  href: string;
  matchedConcerns: string[];
  matchedAreas: string[];
  matchPct: number;
};

type Props = {
  firstName: string;
  concerns: string[];
  areas: string[];
  recs: TreatmentRec[];
};

/* ── Match ring SVG ─────────────────────────────────────────────────────── */
function MatchRing({ pct, rank }: { pct: number; rank: number }) {
  const R = 30;
  const CIRC = 2 * Math.PI * R;
  const circleRef = useRef<SVGCircleElement>(null);
  const textRef   = useRef<SVGTextElement>(null);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const el = circleRef.current;
    const tx = textRef.current;
    if (!el || !tx) return;

    el.style.strokeDashoffset = String(CIRC);

    const obj = { val: 0 };
    const anim = gsap.to(obj, {
      val: pct,
      duration: 1.4,
      ease: 'power2.out',
      delay: rank * 0.15,
      onUpdate: () => {
        const v = Math.round(obj.val);
        setDisplayed(v);
        el.style.strokeDashoffset = String(CIRC * (1 - obj.val / 100));
      },
    });

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { anim.play(); obs.disconnect(); } },
      { threshold: 0.3 },
    );
    const parent = el.closest('.quiz-card');
    if (parent) obs.observe(parent);
    anim.pause();

    return () => { anim.kill(); obs.disconnect(); };
  }, [pct, rank, CIRC]);

  const color = rank === 0 ? GOLD : TEAL;

  return (
    <svg width="76" height="76" viewBox="0 0 76 76" style={{ flexShrink: 0 }}>
      {/* Track */}
      <circle cx="38" cy="38" r={R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
      {/* Fill */}
      <circle
        ref={circleRef}
        cx="38" cy="38" r={R}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${CIRC} ${CIRC}`}
        strokeDashoffset={CIRC}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '38px 38px', transition: 'stroke-dashoffset 0.05s linear' }}
      />
      {/* Label */}
      <text ref={textRef} x="38" y="34" textAnchor="middle" dominantBaseline="middle" fill="white" fontFamily={WIDE} fontSize="13" letterSpacing="0.5">
        {displayed}%
      </text>
      <text x="38" y="50" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.5)" fontFamily={WIDE} fontSize="8" letterSpacing="1">
        MATCH
      </text>
    </svg>
  );
}

/* ── Single treatment card ─────────────────────────────────────────────── */
function TreatmentCard({ rec, rank }: { rec: TreatmentRec; rank: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isTop = rank === 0;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 56 });
    const trig = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      onEnter: () =>
        gsap.to(el, {
          opacity: 1, y: 0,
          duration: 0.72,
          ease: 'power3.out',
          delay: rank * 0.1,
        }),
    });
    return () => trig.kill();
  }, [rank]);

  const accentColor = isTop ? GOLD : TEAL;

  return (
    <div
      ref={cardRef}
      className="quiz-card"
      style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid rgba(255,255,255,0.10)`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: isTop
          ? `0 0 0 1px ${GOLD}33, 0 24px 60px rgba(0,0,0,0.4)`
          : '0 8px 40px rgba(0,0,0,0.28)',
        transition: 'transform 0.28s ease, box-shadow 0.28s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = isTop
          ? `0 0 0 1px ${GOLD}55, 0 32px 80px rgba(0,0,0,0.50)`
          : `0 0 0 1px ${TEAL}44, 0 32px 80px rgba(0,0,0,0.44)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = isTop
          ? `0 0 0 1px ${GOLD}33, 0 24px 60px rgba(0,0,0,0.4)`
          : '0 8px 40px rgba(0,0,0,0.28)';
      }}
    >
      {/* Top accent strip */}
      {isTop && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
          zIndex: 2,
        }} />
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'clamp(180px, 26%, 260px) 1fr',
        minHeight: '260px',
      }}>
        {/* Image col */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Image
            src={rec.image}
            alt={rec.name}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 40vw, 260px"
            style={{
              objectFit: 'cover',
              filter: 'brightness(0.72) saturate(0.85)',
              transition: 'filter 0.3s ease, transform 0.4s ease',
            }}
          />
          {/* Rank number overlay */}
          <div style={{
            position: 'absolute', bottom: '14px', left: '16px',
            fontFamily: SERIF,
            fontSize: '56px',
            lineHeight: 1,
            color: isTop ? GOLD : 'rgba(255,255,255,0.35)',
            fontWeight: 400,
            letterSpacing: '-2px',
            userSelect: 'none',
            textShadow: '0 2px 16px rgba(0,0,0,0.6)',
            zIndex: 1,
          }}>
            {String(rank + 1).padStart(2, '0')}
          </div>
          {isTop && (
            <div style={{
              position: 'absolute', top: '14px', left: '14px',
              background: GOLD,
              color: '#fff',
              fontFamily: WIDE,
              fontSize: '9px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              padding: '5px 10px',
              borderRadius: '999px',
              zIndex: 1,
            }}>
              Top Pick
            </div>
          )}
        </div>

        {/* Content col */}
        <div style={{
          padding: 'clamp(20px, 3%, 32px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '16px',
        }}>
          <div>
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '12px' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: 'clamp(14px, 1.6vw, 18px)',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  color: 'white',
                  margin: '0 0 6px',
                  lineHeight: 1.25,
                }}>
                  {rec.name}
                </h3>
                {/* Divider */}
                <div style={{ width: '36px', height: '1px', background: accentColor, opacity: 0.7 }} />
              </div>
              <MatchRing pct={rec.matchPct} rank={rank} />
            </div>

            <p style={{
              fontFamily: BODY,
              fontSize: '14px',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.7,
              margin: '0 0 16px',
            }}>
              {rec.tagline}
            </p>

            {/* Matched goals */}
            {(rec.matchedConcerns.length > 0 || rec.matchedAreas.length > 0) && (
              <div style={{ marginBottom: '18px' }}>
                <p style={{
                  fontFamily: WIDE,
                  fontSize: '9px',
                  letterSpacing: '2px',
                  color: accentColor,
                  textTransform: 'uppercase',
                  margin: '0 0 8px',
                }}>
                  Why this for you
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {[...rec.matchedConcerns, ...rec.matchedAreas].map((label) => (
                    <span key={label} style={{
                      fontFamily: BODY,
                      fontSize: '11px',
                      color: 'rgba(255,255,255,0.85)',
                      background: `${accentColor}22`,
                      border: `1px solid ${accentColor}44`,
                      borderRadius: '999px',
                      padding: '3px 11px',
                    }}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            <div style={{
              display: 'flex',
              gap: '0',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: '14px',
            }}>
              {rec.stats.map((s, i) => (
                <div key={s.label} style={{
                  flex: 1,
                  textAlign: 'center',
                  borderRight: i < rec.stats.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  padding: '0 8px',
                }}>
                  <p style={{
                    fontFamily: SERIF,
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.90)',
                    margin: 0,
                    lineHeight: 1.3,
                  }}>
                    {s.value}
                  </p>
                  <p style={{
                    fontFamily: WIDE,
                    fontSize: '9px',
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.38)',
                    margin: '5px 0 0',
                  }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link
            href={rec.href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              alignSelf: 'flex-start',
              fontFamily: WIDE,
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: accentColor,
              border: `1px solid ${accentColor}55`,
              borderRadius: '999px',
              padding: '10px 24px',
              transition: 'background 0.2s, color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = `${accentColor}22`;
              (e.currentTarget as HTMLAnchorElement).style.borderColor = accentColor;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = `${accentColor}55`;
            }}
          >
            View Treatment
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Main client component ─────────────────────────────────────────────── */
export default function QuizResultsClient({ firstName, concerns, areas, recs }: Props) {
  const heroRef     = useRef<HTMLDivElement>(null);
  const eyebrowRef  = useRef<HTMLParagraphElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const arrowRef    = useRef<HTMLDivElement>(null);

  /* ── Hero reveal timeline ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(eyebrowRef.current,  { opacity: 0, y: 20, duration: 0.7 }, 0.4)
        .from(headingRef.current,  { opacity: 0, y: 32, duration: 0.9 }, 0.65)
        .from(dividerRef.current,  { scaleX: 0, duration: 0.6, transformOrigin: 'center' }, 0.95)
        .from(subtitleRef.current, { opacity: 0, y: 20, duration: 0.7 }, 1.1)
        .from(arrowRef.current,    { opacity: 0, y: -10, duration: 0.5 }, 1.6);

      /* Gentle infinite arrow bob */
      gsap.to(arrowRef.current, {
        y: 6, repeat: -1, yoyo: true,
        duration: 1.2, ease: 'sine.inOut',
        delay: 2.2,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: '#070e0e' }}>

      {/* ═══════════════════════════════════════════════════════════════
          HERO — dark cinematic with particle field
      ════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(110px, 16vh, 148px) 24px 80px',
          background: 'radial-gradient(ellipse 90% 70% at 55% 30%, #1a3535 0%, #0c1d1d 50%, #070e0e 100%)',
        }}
      >
        <ParticleScene />

        {/* Vignette overlay */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(7,14,14,0.7) 100%)',
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '720px', textAlign: 'center' }}>
          {/* Eyebrow */}
          <p
            ref={eyebrowRef}
            style={{
              fontFamily: WIDE,
              fontSize: '11px',
              letterSpacing: '4px',
              color: TEAL_B,
              textTransform: 'uppercase',
              margin: '0 0 20px',
            }}
          >
            {firstName
              ? `${firstName.toUpperCase()}, YOUR PERSONALISED PLAN`
              : 'YOUR PERSONALISED AESTHETIC PLAN'}
          </p>

          {/* Heading */}
          <h1
            ref={headingRef}
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              lineHeight: 1.15,
              color: 'rgba(255,255,255,0.96)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              margin: '0 0 24px',
            }}
          >
            Your Glow<br />Starts Here
          </h1>

          {/* Divider */}
          <div
            ref={dividerRef}
            style={{
              width: '72px',
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${TEAL}, transparent)`,
              margin: '0 auto 24px',
            }}
          />

          {/* Subtitle */}
          {(concerns.length > 0 || areas.length > 0) && (
            <p
              ref={subtitleRef}
              style={{
                fontFamily: BODY,
                fontSize: 'clamp(14px, 1.6vw, 17px)',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.75,
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Based on your concerns{' '}
              {concerns.length > 0 && (
                <span style={{ color: TEAL_B, fontWeight: 500 }}>
                  {concerns.join(', ')}
                </span>
              )}
              {areas.length > 0 && (
                <>
                  {' '}and focus areas{' '}
                  <span style={{ color: TEAL_B, fontWeight: 500 }}>
                    {areas.join(', ')}
                  </span>
                </>
              )}
              {' '}— our doctors have curated{' '}
              <span style={{ color: 'rgba(255,255,255,0.82)' }}>
                {recs.length} personalised treatment{recs.length !== 1 ? 's' : ''}
              </span>{' '}
              for you.
            </p>
          )}

          {/* Scroll indicator */}
          <div
            ref={arrowRef}
            style={{
              marginTop: '52px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontFamily: WIDE, fontSize: '9px', letterSpacing: '2.5px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
              Scroll for your plan
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TREATMENT CARDS
      ════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: 'linear-gradient(180deg, #070e0e 0%, #0c1a1a 30%, #101d1d 100%)',
          padding: 'clamp(56px, 8vh, 96px) 0 clamp(72px, 10vh, 116px)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)' }}>

          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{
              fontFamily: WIDE,
              fontSize: '10px',
              letterSpacing: '4px',
              color: TEAL,
              textTransform: 'uppercase',
              margin: '0 0 14px',
            }}>
              Recommended for you
            </p>
            <div style={{
              width: '40px', height: '1px',
              background: `linear-gradient(90deg, transparent, ${TEAL}, transparent)`,
              margin: '0 auto 18px',
            }} />
            <h2 style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: 'clamp(20px, 2.8vw, 30px)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: 'rgba(255,255,255,0.90)',
              margin: 0,
            }}>
              Medical Aesthetic Treatments in Malta
            </h2>
          </div>

          {/* Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {recs.map((rec, i) => (
              <TreatmentCard key={rec.id} rec={rec} rank={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA SECTION — flows seamlessly from card section above
      ════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: 'linear-gradient(180deg, #101d1d 0%, #0c1818 40%, #070e0e 100%)',
          padding: 'clamp(56px, 8vh, 96px) 24px clamp(72px, 10vh, 116px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow — fills the whole section, no card border */}
        <div aria-hidden style={{
          position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '320px', borderRadius: '50%',
          background: 'rgba(79,115,115,0.12)', filter: 'blur(90px)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Teal divider line */}
          <div style={{
            width: '40px', height: '1px',
            background: `linear-gradient(90deg, transparent, ${TEAL}, transparent)`,
            margin: '0 auto 28px',
          }} />
          <p style={{
            fontFamily: WIDE,
            fontSize: '10px',
            letterSpacing: '4px',
            color: TEAL,
            textTransform: 'uppercase',
            margin: '0 0 16px',
          }}>
            Ready to begin?
          </p>
          <h2 style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: 'clamp(22px, 3vw, 32px)',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            color: 'rgba(255,255,255,0.95)',
            margin: '0 0 14px',
          }}>
            Meet Your Doctor
          </h2>
          <p style={{
            fontFamily: BODY,
            fontSize: '14px',
            color: 'rgba(255,255,255,0.40)',
            lineHeight: 1.75,
            maxWidth: '420px',
            margin: '0 auto 32px',
          }}>
            Discuss your personalised plan in person and start your journey toward glowing confidence — completely free, no obligation.
          </p>
          <Link
            href="/consultation"
            className="cta-glow-teal"
            style={{
              display: 'inline-block',
              padding: '15px 44px',
              fontFamily: WIDE,
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: '#fff',
              borderRadius: '999px',
            }}
          >
            Book Free Consultation
          </Link>
          <p style={{
            fontFamily: WIDE,
            fontSize: '9px',
            letterSpacing: '1.5px',
            color: 'rgba(255,255,255,0.18)',
            textTransform: 'uppercase',
            margin: '18px 0 0',
          }}>
            No obligation · Free of charge · Carisma Aesthetics, Malta
          </p>
        </div>
      </section>

      {/* ── Responsive overrides ── */}
      <style jsx global>{`
        @media (max-width: 600px) {
          .quiz-card > div {
            grid-template-columns: 1fr !important;
          }
          .quiz-card > div > div:first-child {
            min-height: 200px !important;
          }
        }
      `}</style>
    </main>
  );
}
