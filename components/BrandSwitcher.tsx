'use client';

/**
 * BrandSwitcher — floating trigger button + animated brand panel.
 *
 * Trigger: three coloured dots (one per brand) arranged in a compact motif.
 * Panel:   frosted-glass card drops below; contains a Three.js canvas with
 *          three floating glass spheres + text cards per brand below.
 *
 * Three.js scene is only initialised when the panel opens (lazy import via
 * next/dynamic ssr:false). Closed panel = zero GPU cost.
 *
 * On mobile / coarse pointer: Three.js is skipped; renders three coloured
 * circles instead. Under prefers-reduced-motion the spheres are static.
 */

import dynamic from 'next/dynamic';
import { useState, useRef, useEffect, useCallback } from 'react';
import type { BrandSphereConfig } from './BrandSwitcherScene';

const BrandSwitcherScene = dynamic(() => import('./BrandSwitcherScene'), {
  ssr: false,
  loading: () => <div style={{ height: 140 }} />,
});

const BRANDS: BrandSphereConfig[] = [
  {
    color: '#245052',
    name: 'Aesthetics',
    tagline: 'Glow with Confidence',
    url: 'https://www.carismaaesthetics.com',
    isCurrent: true,
  },
  {
    color: '#024C27',
    name: 'Slimming',
    tagline: 'Your journey, your pace',
    url: 'https://www.carismaslimming.com',
    isCurrent: false,
  },
  {
    color: '#5C3D2E',
    name: 'Spa',
    tagline: 'Beyond the Spa',
    url: 'https://www.carismaspa.com',
    isCurrent: false,
  },
];

function useCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    setCoarse(window.matchMedia('(pointer: coarse)').matches);
  }, []);
  return coarse;
}

export default function BrandSwitcher() {
  const [open, setOpen] = useState(false);
  const [cardHovered, setCardHovered] = useState<number | null>(null);
  const [sceneHovered, setSceneHovered] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const coarse = useCoarsePointer();

  // close on outside click
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (
        !panelRef.current?.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // close on Escape
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleBrandClick = useCallback((index: number) => {
    const brand = BRANDS[index];
    if (!brand.isCurrent) {
      window.open(brand.url, '_blank', 'noopener,noreferrer');
    }
    setOpen(false);
  }, []);

  const effectiveHovered = sceneHovered ?? cardHovered;

  return (
    <>
      {/* Entrance animation keyframes injected once */}
      <style>{`
        @keyframes bs-fade-in {
          from { opacity: 0; transform: translateY(-6px) translateX(-50%); }
          to   { opacity: 1; transform: translateY(0)   translateX(-50%); }
        }
        .bs-panel { animation: bs-fade-in 0.22s cubic-bezier(.22,1,.36,1) both; }
        @keyframes bs-dot-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(36,80,82,0.45); }
          50%      { box-shadow: 0 0 0 4px rgba(36,80,82,0); }
        }
        .bs-dot-current { animation: bs-dot-pulse 2.4s ease-in-out infinite; }
      `}</style>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {/* Divider */}
        <div style={{
          width: 1,
          height: 18,
          background: 'rgba(36,80,82,0.18)',
          margin: '0 10px 0 8px',
          borderRadius: 1,
        }} />

        {/* Trigger button */}
        <button
          ref={triggerRef}
          onClick={() => setOpen(v => !v)}
          aria-label="Explore Carisma brands"
          aria-haspopup="true"
          aria-expanded={open}
          title="Explore Carisma brands"
          style={{
            position: 'relative',
            width: 30,
            height: 30,
            border: 'none',
            background: open ? 'rgba(36,80,82,0.08)' : 'transparent',
            cursor: 'pointer',
            padding: 0,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
        >
          {/* Three-dot brand motif: triangle arrangement */}
          <span style={{ position: 'relative', width: 20, height: 18, display: 'block' }}>
            {/* Top-centre = Aesthetics (current, filled, pulsing) */}
            <span className="bs-dot-current" style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: 8, height: 8, borderRadius: '50%',
              background: '#245052',
              display: 'block',
            }} />
            {/* Bottom-left = Slimming */}
            <span style={{
              position: 'absolute', bottom: 0, left: 0,
              width: 6, height: 6, borderRadius: '50%',
              border: '1.5px solid #024C27',
              background: 'transparent',
              display: 'block',
            }} />
            {/* Bottom-right = Spa */}
            <span style={{
              position: 'absolute', bottom: 0, right: 0,
              width: 6, height: 6, borderRadius: '50%',
              border: '1.5px solid #7A5842',
              background: 'transparent',
              display: 'block',
            }} />
          </span>
        </button>

        {/* Panel */}
        {open && (
          <div
            ref={panelRef}
            className="bs-panel"
            role="dialog"
            aria-label="Carisma brand selector"
            style={{
              position: 'absolute',
              top: 'calc(100% + 14px)',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 300,
              background: 'rgba(255,255,255,0.94)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              borderRadius: 20,
              boxShadow: '0 24px 72px rgba(0,0,0,0.13), 0 0 0 1px rgba(0,0,0,0.05)',
              overflow: 'hidden',
              zIndex: 1000,
            }}
          >
            {/* Header strip */}
            <div style={{
              padding: '12px 16px 8px',
              borderBottom: '1px solid rgba(0,0,0,0.05)',
              textAlign: 'center',
            }}>
              <p style={{
                margin: 0,
                fontFamily: '"Novecento Wide", sans-serif',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#406060',
              }}>
                Carisma World
              </p>
            </div>

            {/* Three.js scene or mobile fallback */}
            {!coarse ? (
              <BrandSwitcherScene
                brands={BRANDS}
                externalHovered={cardHovered}
                onHover={setSceneHovered}
                onClick={handleBrandClick}
              />
            ) : (
              /* Mobile fallback: three coloured circles */
              <div style={{
                height: 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '0 24px',
              }}>
                {BRANDS.map((b, i) => (
                  <button
                    key={b.name}
                    onClick={() => handleBrandClick(i)}
                    style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: b.color,
                      border: 'none', cursor: b.isCurrent ? 'default' : 'pointer',
                      opacity: b.isCurrent ? 1 : 0.55,
                      boxShadow: b.isCurrent ? `0 0 0 3px rgba(255,255,255,0.9), 0 0 0 5px ${b.color}66` : 'none',
                      transition: 'opacity 0.2s',
                    }}
                    aria-label={`Go to Carisma ${b.name}`}
                  />
                ))}
              </div>
            )}

            {/* Brand info cards */}
            <div style={{
              display: 'flex',
              borderTop: '1px solid rgba(0,0,0,0.06)',
            }}>
              {BRANDS.map((b, i) => (
                <button
                  key={b.name}
                  onMouseEnter={() => setCardHovered(i)}
                  onMouseLeave={() => setCardHovered(null)}
                  onClick={() => handleBrandClick(i)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    padding: '10px 6px 12px',
                    border: 'none',
                    background: effectiveHovered === i
                      ? `${b.color}10`
                      : 'transparent',
                    borderRadius: 0,
                    cursor: b.isCurrent ? 'default' : 'pointer',
                    transition: 'background 0.2s',
                    borderRight: i < BRANDS.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                  }}
                  aria-label={b.isCurrent ? `Currently on ${b.name}` : `Go to Carisma ${b.name}`}
                >
                  {/* colour dot */}
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: b.color,
                    display: 'block',
                    boxShadow: effectiveHovered === i || b.isCurrent
                      ? `0 0 6px 2px ${b.color}55`
                      : 'none',
                    transition: 'box-shadow 0.2s',
                  }} />
                  <span style={{
                    fontFamily: '"Novecento Wide", sans-serif',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: b.isCurrent ? b.color : '#888',
                    transition: 'color 0.2s',
                  }}>
                    {b.name}
                  </span>
                  <span style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: 9,
                    color: '#bbb',
                    textAlign: 'center',
                    lineHeight: 1.3,
                    letterSpacing: '0.02em',
                  }}>
                    {b.tagline}
                  </span>
                  {b.isCurrent && (
                    <span style={{
                      fontFamily: '"Novecento Wide", sans-serif',
                      fontSize: 8,
                      color: b.color,
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      marginTop: 2,
                    }}>
                      ✓ HERE
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Footer */}
            <div style={{
              padding: '8px 16px 10px',
              borderTop: '1px solid rgba(0,0,0,0.04)',
              textAlign: 'center',
            }}>
              <span style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: 9,
                color: '#ccc',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                Carisma Wellness Group · Malta
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
