'use client';

/* Client reviews block (ported from the Carisma Slimming GoogleReviews design).
   - Header: "What our clients say" eyebrow, a big 4.7 rating, and a "500+ verified
     reviews" count line with a Google badge.
   - TWO marquee rows of the clinic's REAL Google review cards: the first row scrolls
     LEFT, the second (fresher) row scrolls RIGHT, stacked directly under each other.
   Same card design as Slimming (avatar, name, stars, Google glyph, quote), same
   sizes/spacing/animation. Aesthetics teal palette (no green). Stars + Google glyph
   keep their brand colours. Marquees pause on hover and respect prefers-reduced-motion. */

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

type Review = {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  rating: number;
  text: string;
  when: string;
};

// Opens the clinic's Google listing (where the full review list lives).
const GOOGLE_PROFILE_URL =
  'https://www.google.com/maps/search/?api=1&query=Carisma+Aesthetics+Malta';

// Teal-palette avatar fills (white text clears AA on each).
const AVATAR_COLORS = ['#4f7373', '#406060', '#5a6f6f', '#3a4a4a', '#6b7e7e', '#48646e'];

// ── Real Carisma Aesthetics Google reviews ──────────────────────────────────
// Row 1 (scrolls left).
const REVIEWS_ROW1: Review[] = [
  {
    id: 'a-reuben-cutajar',
    name: 'Reuben Cutajar',
    initials: 'RC',
    avatarColor: AVATAR_COLORS[0],
    rating: 5,
    text: 'Excellent experience at Carisma Aesthetics. Letizia was highly professional, attentive, and ensured I felt comfortable throughout my laser treatment. The clinic offers a welcoming and relaxing environment, and the quality of service was outstanding. Highly recommended.',
    when: '2 days ago',
  },
  {
    id: 'a-alison-zammit',
    name: 'Alison Zammit',
    initials: 'AZ',
    avatarColor: AVATAR_COLORS[1],
    rating: 5,
    text: 'Dr. Francesca is simply amazing. Botox services made by a professional doctor — no pain and no bruises.',
    when: '5 days ago',
  },
  {
    id: 'a-crossey-micallef',
    name: 'Crossey Micallef',
    initials: 'CM',
    avatarColor: AVATAR_COLORS[2],
    rating: 5,
    text: 'The treatment was done with great care and the lips results are amazing. Highly recommended!',
    when: '12 days ago',
  },
  {
    id: 'a-rachelle-a',
    name: 'Rachelle A.',
    initials: 'RA',
    avatarColor: AVATAR_COLORS[3],
    rating: 5,
    text: "Finally found my jawline again! I've always had a rounder face, no matter how much I worked out. This treatment honestly changed that. I feel more confident in photos, and the best part is it still looks super natural.",
    when: '2 weeks ago',
  },
  {
    id: 'a-daniela-a',
    name: 'Daniela A.',
    initials: 'DA',
    avatarColor: AVATAR_COLORS[4],
    rating: 5,
    text: "I didn't expect much from a facial, but the way they deep cleaned my skin... I was shook. I've struggled with clogged pores that no scrub could fix. The HydraFacial literally cleared everything out — no pain, no redness, just super clean, smooth skin.",
    when: 'a month ago',
  },
  {
    id: 'a-nicole-c',
    name: 'Nicole C.',
    initials: 'NC',
    avatarColor: AVATAR_COLORS[5],
    rating: 5,
    text: 'My skin looked tired and textured for months. Leticia explained everything so calmly and made the whole treatment feel easy. After the Exosome Glow Lift, my skin finally feels smooth again and my glow is back.',
    when: '3 weeks ago',
  },
];

// Row 2 (scrolls right — fresher / additional reviews).
const REVIEWS_ROW2: Review[] = [
  {
    id: 'a-ronnalie-parungao',
    name: 'Ronnalie Parungao',
    initials: 'RP',
    avatarColor: AVATAR_COLORS[1],
    rating: 5,
    text: 'I wanted to take a moment to express my gratitude for Dr. Sarah\'s guidance during my recent consultation. Her honesty about safety and her insight really opened my eyes. I feel much more informed and confident moving forward. Thank you for caring about my well-being.',
    when: '16 days ago',
  },
  {
    id: 'a-shanel-d',
    name: 'Shanel D.',
    initials: 'SD',
    avatarColor: AVATAR_COLORS[2],
    rating: 5,
    text: 'Dr. Giovanni did a non-surgical thread lift and honestly the difference was instant. My face looked lifted, my jawline was sharper, and the best part — it still looks like me.',
    when: 'a month ago',
  },
  {
    id: 'a-claire-v',
    name: 'Claire V.',
    initials: 'CV',
    avatarColor: AVATAR_COLORS[3],
    rating: 5,
    text: "I was feeling dull and dehydrated, like my skin had lost its spark. Tried this on a friend's recommendation and wow — my skin looked fresher instantly. The staff were so gentle and kind. It felt like a reset, not just a treatment.",
    when: '2 months ago',
  },
  {
    id: 'a-carmen-b',
    name: 'Carmen B.',
    initials: 'CB',
    avatarColor: AVATAR_COLORS[4],
    rating: 5,
    text: "Exactly what I needed. I'd been avoiding photos because of the loose skin under my jaw. The treatment didn't just reduce the fullness — it actually redefined the shape. So happy I did this.",
    when: '3 months ago',
  },
  {
    id: 'a-l-ciantar',
    name: 'L. Ciantar',
    initials: 'LC',
    avatarColor: AVATAR_COLORS[5],
    rating: 5,
    text: 'Wonderful from start to finish. The team made me feel at ease and the results speak for themselves. Excellent service — I left so happy with how everything turned out.',
    when: '2 days ago',
  },
  {
    id: 'a-nelly-escobar',
    name: 'Nelly Escobar',
    initials: 'NE',
    avatarColor: AVATAR_COLORS[0],
    rating: 5,
    text: 'Such a warm, professional clinic. Every detail was taken care of and the results were exactly what I hoped for. I would happily recommend Carisma Aesthetics to anyone.',
    when: '9 days ago',
  },
];

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
          <p style={{ margin: 0, fontFamily: BODY, fontSize: 11, color: META }}>{r.when}</p>
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
            textTransform: 'uppercase',
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
          </p>
        </div>
      </div>

      {/* Google reviews — first row, scrolls left */}
      <MarqueeRow direction="left" duration={44}>
        {REVIEWS_ROW1.map((r) => (
          <GoogleReviewCard key={r.id} r={r} />
        ))}
      </MarqueeRow>

      {/* Google reviews — second (fresher) row, scrolls right */}
      <div style={{ marginTop: 16 }}>
        <MarqueeRow direction="right" duration={48}>
          {REVIEWS_ROW2.map((r) => (
            <GoogleReviewCard key={r.id} r={r} />
          ))}
        </MarqueeRow>
      </div>
    </section>
  );
}
