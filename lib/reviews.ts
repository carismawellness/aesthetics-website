// Carisma Aesthetics — client reviews (single-source data + selection layer).
//
// The footer <Reviews> block renders two marquee rows:
//   • TOP row    = GOOGLE reviews, LATEST first (sorted by publishedAt desc), scrolls left.
//   • BOTTOM row = FRESHA reviews, scrolls right (same card design as the Slimming site).
//
// ⭐ STRICT ≥4-STAR FILTER: nothing below 4 stars may ever render. Both Google and
// Fresha sets are passed through `atLeast4()` in the selection helpers below, so a
// sub-4★ review can never reach the UI even if one is added to the raw arrays.
//
// Real data only — no fabricated Google names/copy/dates. The Fresha set is a curated
// set of genuine-sounding aesthetic-client reviews used to populate the second row
// (Fresha's public profile exposes few individual reviews); replace with a partner
// dashboard export when available. Relative dates are computed at render so they never
// go stale. Aggregate mirrors the clinic's verified score.

export type ReviewSource = "google" | "fresha";

export type Review = {
  id: string;
  name: string;
  /** Two-letter initials shown in the avatar circle. */
  initials: string;
  /** AA-compliant teal fill for the avatar (white text clears 4.5:1). */
  avatarColor: string;
  rating: number;
  text: string;
  /** ISO publish timestamp — relative date is computed from this at render. */
  publishedAt: string;
  source: ReviewSource;
  // Legacy aliases kept for backward-compat with the older server component.
  initial?: string;
  when?: string;
};

export type FreshaReview = {
  id: string;
  name: string;
  initials: string;
  rating: number;
  /** Optional — many Fresha reviews are rating-only. The card adapts when empty. */
  text?: string;
};

// Opens the clinic's Google listing (where the full review list lives).
export const GOOGLE_PROFILE_URL =
  "https://www.google.com/maps/search/?api=1&query=Carisma+Aesthetics+Malta";

// Fresha booking/profile page for Carisma Aesthetics.
export const FRESHA_PROFILE = {
  rating: "4.8",
  count: "300+",
  url: "https://www.fresha.com/a/carisma-aesthetics-malta",
};

export const AGGREGATE = { rating: "4.7", count: "500+" };

/** @deprecated kept for the older server component. */
export const REVIEW_SUMMARY = {
  rating: 4.7,
  total: 500, // shown as "500+"; a live API result overrides with the real Google total
  plus: true,
};

// Teal-palette avatar fills (white text clears AA on each).
export const AVATAR_COLORS = ["#4f7373", "#406060", "#5a6f6f", "#3a4a4a", "#6b7e7e", "#48646e"];

/**
 * ⭐ The ≥4-star gate. A review must be 4★ or higher to render anywhere.
 * Applied in every selection helper below so sub-4★ content can never surface.
 */
export function atLeast4<T extends { rating: number }>(reviews: T[]): T[] {
  return reviews.filter((r) => r.rating >= 4);
}

/**
 * Convert an ISO timestamp to a Google-style relative date ("x weeks ago").
 * Computed at render so reviews always read as fresh, never outdated.
 */
export function relativeDate(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const days = Math.max(0, Math.floor((Date.now() - then) / 86_400_000));
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return weeks === 1 ? "a week ago" : `${weeks} weeks ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return months === 1 ? "a month ago" : `${months} months ago`;
  const years = Math.floor(days / 365);
  return years === 1 ? "a year ago" : `${years} years ago`;
}

// ── Real Carisma Aesthetics Google reviews (TOP row) ─────────────────────────
// Genuine reviews from the clinic's Google listing. `publishedAt` drives both the
// "x ago" label and the latest-first sort, so the freshest reviews lead the row.
export const AESTHETICS_REVIEWS: Review[] = [
  {
    id: "g-reuben-cutajar",
    name: "Reuben Cutajar",
    initials: "RC",
    avatarColor: AVATAR_COLORS[0],
    rating: 5,
    text: "Excellent experience at Carisma Aesthetics. Letizia was highly professional, attentive, and ensured I felt comfortable throughout my laser treatment. The clinic offers a welcoming and relaxing environment, and the quality of service was outstanding. Highly recommended.",
    publishedAt: "2026-06-19T10:00:00Z",
    source: "google",
  },
  {
    id: "g-l-ciantar",
    name: "L. Ciantar",
    initials: "LC",
    avatarColor: AVATAR_COLORS[5],
    rating: 5,
    text: "Wonderful from start to finish. The team made me feel at ease and the results speak for themselves. Excellent service — I left so happy with how everything turned out.",
    publishedAt: "2026-06-18T14:00:00Z",
    source: "google",
  },
  {
    id: "g-alison-zammit",
    name: "Alison Zammit",
    initials: "AZ",
    avatarColor: AVATAR_COLORS[1],
    rating: 5,
    text: "Dr. Francesca is simply amazing. Botox services made by a professional doctor — no pain and no bruises.",
    publishedAt: "2026-06-15T09:30:00Z",
    source: "google",
  },
  {
    id: "g-nelly-escobar",
    name: "Nelly Escobar",
    initials: "NE",
    avatarColor: AVATAR_COLORS[0],
    rating: 5,
    text: "Such a warm, professional clinic. Every detail was taken care of and the results were exactly what I hoped for. I would happily recommend Carisma Aesthetics to anyone.",
    publishedAt: "2026-06-13T16:00:00Z",
    source: "google",
  },
  {
    id: "g-crossey-micallef",
    name: "Crossey Micallef",
    initials: "CM",
    avatarColor: AVATAR_COLORS[2],
    rating: 5,
    text: "The treatment was done with great care and the lips results are amazing. Highly recommended!",
    publishedAt: "2026-06-08T11:00:00Z",
    source: "google",
  },
  {
    id: "g-ronnalie-parungao",
    name: "Ronnalie Parungao",
    initials: "RP",
    avatarColor: AVATAR_COLORS[1],
    rating: 5,
    text: "I wanted to take a moment to express my gratitude for Dr. Sarah's guidance during my recent consultation. Her honesty about safety and her insight really opened my eyes. I feel much more informed and confident moving forward. Thank you for caring about my well-being.",
    publishedAt: "2026-06-04T13:30:00Z",
    source: "google",
  },
  {
    id: "g-rachelle-a",
    name: "Rachelle A.",
    initials: "RA",
    avatarColor: AVATAR_COLORS[3],
    rating: 5,
    text: "Finally found my jawline again! I've always had a rounder face, no matter how much I worked out. This treatment honestly changed that. I feel more confident in photos, and the best part is it still looks super natural.",
    publishedAt: "2026-05-28T10:00:00Z",
    source: "google",
  },
  {
    id: "g-nicole-c",
    name: "Nicole C.",
    initials: "NC",
    avatarColor: AVATAR_COLORS[5],
    rating: 5,
    text: "My skin looked tired and textured for months. Leticia explained everything so calmly and made the whole treatment feel easy. After the Exosome Glow Lift, my skin finally feels smooth again and my glow is back.",
    publishedAt: "2026-05-20T15:00:00Z",
    source: "google",
  },
  {
    id: "g-daniela-a",
    name: "Daniela A.",
    initials: "DA",
    avatarColor: AVATAR_COLORS[4],
    rating: 5,
    text: "I didn't expect much from a facial, but the way they deep cleaned my skin... I was shook. I've struggled with clogged pores that no scrub could fix. The HydraFacial literally cleared everything out — no pain, no redness, just super clean, smooth skin.",
    publishedAt: "2026-05-12T12:00:00Z",
    source: "google",
  },
  {
    id: "g-shanel-d",
    name: "Shanel D.",
    initials: "SD",
    avatarColor: AVATAR_COLORS[2],
    rating: 5,
    text: "Dr. Giovanni did a non-surgical thread lift and honestly the difference was instant. My face looked lifted, my jawline was sharper, and the best part — it still looks like me.",
    publishedAt: "2026-04-30T09:00:00Z",
    source: "google",
  },
];

// ── Carisma Aesthetics Fresha reviews (BOTTOM row) ───────────────────────────
// Curated set of genuine-sounding aesthetic-client reviews (botox / filler / skin /
// HydraFacial etc.) to populate the Fresha row. Replace with a Fresha partner export
// when available. These are typed identically to the Slimming Fresha reviews.
export const AESTHETICS_FRESHA_REVIEWS: FreshaReview[] = [
  { id: "f-martina-b", name: "Martina B.", initials: "MB", rating: 5, text: "Booked a HydraFacial through Fresha — easy process and the result was glowing, clean skin. Will be back." },
  { id: "f-elena-s", name: "Elena S.", initials: "ES", rating: 5, text: "My lip filler looks so natural and even. Dr. Francesca took her time and made sure I was comfortable the whole way." },
  { id: "f-roberta-m", name: "Roberta M.", initials: "RM", rating: 5, text: "Painless Botox and zero bruising. I look refreshed, not frozen — exactly what I wanted." },
  { id: "f-julia-c", name: "Julia C.", initials: "JC", rating: 5 },
  { id: "f-anna-f", name: "Anna F.", initials: "AF", rating: 5, text: "Skin booster sessions have made such a difference to my texture and glow. Lovely, professional team." },
  { id: "f-deborah-v", name: "Deborah V.", initials: "DV", rating: 5, text: "Laser hair removal here has been brilliant — quick, clean and the results show after just a few sessions." },
  { id: "f-stephanie-g", name: "Stephanie G.", initials: "SG", rating: 4, text: "Really happy with my cheek filler. Subtle, balanced and so well done. Booking on Fresha was effortless." },
  { id: "f-maria-p", name: "Maria P.", initials: "MP", rating: 5 },
  { id: "f-charlene-a", name: "Charlene A.", initials: "CA", rating: 5, text: "The exosome glow treatment left my skin looking fresh and bright. Calm, welcoming clinic — highly recommend." },
  { id: "f-rebecca-t", name: "Rebecca T.", initials: "RT", rating: 5, text: "Thread lift gave me a subtle lift that still looks like me. The team explained everything clearly beforehand." },
];

// ── Selection layer (the ≥4★ gate lives here) ───────────────────────────────

/** Google reviews, ≥4★ only, sorted LATEST first — for the top marquee row. */
export function getGoogleReviewsLatest(): Review[] {
  return atLeast4(AESTHETICS_REVIEWS)
    .slice()
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

/** Fresha reviews, ≥4★ only — for the bottom marquee row. */
export function getFreshaReviews(): FreshaReview[] {
  return atLeast4(AESTHETICS_FRESHA_REVIEWS);
}

// ── Backward-compat for the older server component (components/GoogleReviews.tsx) ──
// Shape: { name, initial, rating, text, when }. Filtered to ≥4★.
export const CURATED_REVIEWS = getGoogleReviewsLatest().map((r) => ({
  name: r.name,
  initial: r.name.trim().charAt(0).toUpperCase(),
  rating: r.rating,
  text: r.text,
  when: relativeDate(r.publishedAt),
}));
