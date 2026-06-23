'use client';

/* Client reviews block (ported from the Carisma Slimming GoogleReviews design).
   - Header: "What our clients say" eyebrow, a big 4.7 rating, and a "500+ verified
     reviews" count line with Google + Fresha badges.
   - TOP marquee row    = GOOGLE reviews, LATEST first, scrolls LEFT.
   - BOTTOM marquee row = FRESHA reviews, scrolls RIGHT (distinct Fresha card).
   All data + the strict ≥4★ filter live in '@/lib/reviews'. Same card design as
   Slimming (avatar, name, stars, source glyph, quote), same sizes/spacing/animation.
   Aesthetics teal palette (no green). Stars keep the brand gold. Marquees pause on
   hover and respect prefers-reduced-motion. */

import {
  getGoogleReviewsLatest,
  getFreshaReviews,
  relativeDate,
  GOOGLE_PROFILE_URL,
  FRESHA_PROFILE,
  type Review,
  type FreshaReview,
} from '@/lib/reviews';

// ── Brand tokens (aesthetics teal, WCAG AA) ───────────────────────────────
const INK = '#3a4a4a';      // warm teal-charcoal; AA on white
const BODY_C = '#333333';   // body text
const META = '#595959';     // muted / meta
const TEAL = '#4f7373';     // links / icons / accent fill (white text = AA)
const TEAL_TEXT = '#406060';// teal as small text / eyebrow (AA on white)
const GOLD = '#8c6d18';     // star fills (brand star colour, kept)
const HAIRLINE = '#deebeb'; // light-teal hairlines
const SERIF = 'Trajan Pro, "Trajan Pro Regular", Georgia, serif';
const WIDE = '"Novecento Wide Book", "Novecento Wide", sans-serif';
const BODY = 'Roboto, sans-serif';

// Teal-palette avatar fills for the Fresha row (white text clears AA on each).
const FRESHA_AVATARS = ['#4f7373', '#406060', '#5a6f6f', '#3a4a4a', '#6b7e7e', '#48646e'];

// ── Badges ────────────────────────────────────────────────────────────────

function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Google" role="img">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
    </svg>
  );
}

function FreshaBadge({ size = 18 }: { size?: number }) {
  const r = Math.round(size * 0.28);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Fresha" role="img">
      <rect x="0" y="0" width="24" height="24" rx={r} fill="#1a0c2e" />
      <text x="12" y="17.5" textAnchor="middle" fontFamily="sans-serif" fontSize="15" fontWeight="700" fill="#ffffff">f</text>
    </svg>
  );
}

function Stars({ rating = 5, size = 14 }: { rating?: number; size?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 1 }} aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < Math.round(rating) ? GOLD : '#e2e2e2'} aria-hidden>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <span
      style={{
        flexShrink: 0,
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: color,
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: WIDE,
        fontSize: 14,
        fontWeight: 700,
      }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

// Shared card chrome.
const CARD_STYLE: React.CSSProperties = {
  flexShrink: 0,
  width: 300,
  background: '#ffffff',
  borderRadius: 16,
  padding: '20px 22px',
  border: `1px solid ${HAIRLINE}`,
  boxShadow: '0 2px 12px rgba(26,26,26,0.06)',
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  margin: '0 10px',
  textDecoration: 'none',
  color: 'inherit',
};

const NAME_STYLE: React.CSSProperties = {
  margin: 0,
  fontFamily: BODY,
  fontSize: 13.5,
  fontWeight: 600,
  color: INK,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

// ── Google review card ──────────────────────────────────────────────────────

function GoogleReviewCard({ r }: { r: Review }) {
  return (
    <a
      href={GOOGLE_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read ${r.name}'s review on Google`}
      style={CARD_STYLE}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar initials={r.initials} color={r.avatarColor} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={NAME_STYLE}>{r.name}</p>
          <p style={{ margin: 0, fontFamily: BODY, fontSize: 11, color: META }} suppressHydrationWarning>
            {relativeDate(r.publishedAt)}
          </p>
        </div>
        <GoogleG size={18} />
      </div>

      <Stars rating={r.rating} size={14} />

      <p
        style={{
          margin: 0,
          fontFamily: BODY,
          fontSize: 13,
          color: BODY_C,
          lineHeight: 1.6,
          display: '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {r.text}
      </p>
    </a>
  );
}

// ── Fresha review card (no dates) ───────────────────────────────────────────

function FreshaReviewCard({ r, idx }: { r: FreshaReview; idx: number }) {
  const hasText = !!r.text && r.text.trim().length > 0;
  return (
    <a
      href={FRESHA_PROFILE.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read ${r.name}'s review on Fresha`}
      style={CARD_STYLE}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar initials={r.initials} color={FRESHA_AVATARS[idx % FRESHA_AVATARS.length]} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={NAME_STYLE}>{r.name}</p>
          <p style={{ margin: 0, fontFamily: BODY, fontSize: 11, color: META }}>Fresha booking</p>
        </div>
        <FreshaBadge size={18} />
      </div>

      <Stars rating={r.rating} size={14} />

      {hasText ? (
        <p
          style={{
            margin: 0,
            fontFamily: BODY,
            fontSize: 13,
            color: BODY_C,
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {r.text}
        </p>
      ) : (
        <p style={{ margin: 0, fontFamily: BODY, fontSize: 13, fontStyle: 'italic', color: META, lineHeight: 1.6 }}>
          Verified Fresha review
        </p>
      )}
    </a>
  );
}

// ── Marquee row ─────────────────────────────────────────────────────────────

function MarqueeRow({
  direction,
  duration,
  children,
}: {
  direction: 'left' | 'right';
  duration: number;
  children: React.ReactNode[];
}) {
  // Duplicate for seamless looping.
  const doubled = [...children, ...children];
  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        className="aes-marquee-track"
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `aes-marquee-${direction} ${duration}s linear infinite`,
          paddingBottom: 4,
        }}
      >
        {doubled.map((child, i) => (
          <div key={i} style={{ display: 'flex' }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main export ─────────────────────────────────────────────────────────────

export default function Reviews() {
  // Top row: Google reviews, ≥4★, latest first. Bottom row: Fresha reviews, ≥4★.
  const googleReviews = getGoogleReviewsLatest();
  const freshaReviews = getFreshaReviews();

  return (
    <section style={{ background: 'transparent', padding: '44px 0 40px' }} aria-label="Client reviews">
      <style>{`
        @keyframes aes-marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes aes-marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .aes-marquee-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .aes-marquee-track { animation: none !important; }
        }
      `}</style>

      {/* Header — aggregate rating + count, Google attribution */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ marginBottom: 24, textAlign: 'center' }}>
        <p
          style={{
            fontFamily: SERIF,
            fontSize: 13,
            letterSpacing: 4,
            color: TEAL_TEXT,
            marginBottom: 16,
          }}
        >
          What our clients say
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          {/* Primary stats — big and bold */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontFamily: SERIF, fontSize: 64, color: INK, lineHeight: 1, fontWeight: 400 }}>4.7</span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
              <Stars rating={5} size={24} />
              <span style={{ fontFamily: BODY, fontSize: 20, fontWeight: 600, color: INK, letterSpacing: '-0.3px' }}>500+ verified reviews</span>
            </div>
          </div>
          {/* Secondary — platform attribution */}
          <p
            style={{
              margin: 0,
              fontFamily: BODY,
              fontSize: 12,
              color: META,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              flexWrap: 'wrap',
            }}
          >
            <span>on</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
              <GoogleG size={13} /> Google
            </span>
            <span aria-hidden style={{ color: HAIRLINE }}>·</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
              <FreshaBadge size={13} /> Fresha
            </span>
          </p>
        </div>
      </div>

      {/* TOP row — GOOGLE reviews, latest first, scrolls left.
          duration scaled to match Slimming's px/s: Slimming shows 5 google cards
          at 44s (~34px/s); we show 10, so 44×(10/5)=88s keeps the same glide. */}
      <MarqueeRow direction="left" duration={88}>
        {googleReviews.map((r) => (
          <GoogleReviewCard key={r.id} r={r} />
        ))}
      </MarqueeRow>

      {/* BOTTOM row — FRESHA reviews, scrolls right */}
      <div style={{ marginTop: 16 }}>
        {/* 10 fresha cards vs Slimming's 6 at 48s → 48×(10/6)=80s for matching px/s */}
        <MarqueeRow direction="right" duration={80}>
          {freshaReviews.map((r, i) => (
            <FreshaReviewCard key={r.id} r={r} idx={i} />
          ))}
        </MarqueeRow>
      </div>
    </section>
  );
}
