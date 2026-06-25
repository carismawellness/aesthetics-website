import type { ReactNode } from 'react';

export type QuizOption = {
  value: string;
  label: string;
  hint?: string;
  icon: ReactNode;
};

const ico = (children: ReactNode) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

/* ── Step 1 · Skin concerns (multi-select, ≥1) ─────────────────────────── */
export const CONCERNS: QuizOption[] = [
  {
    value: 'Wrinkles & fine lines',
    label: 'Wrinkles & fine lines',
    hint: 'Expression lines, forehead, crow\'s feet',
    icon: ico(<><path d="M3 12c3-4 6-6 9-6s6 2 9 6" /><path d="M3 17c3-3 6-4.5 9-4.5S18 14 21 17" /><path d="M3 7c3-2 6-3 9-3s6 1 9 3" /></>),
  },
  {
    value: 'Volume loss',
    label: 'Volume loss',
    hint: 'Sunken cheeks, hollows, thinning lips',
    icon: ico(<><path d="M12 3c3.5 0 6 2.5 6 5.5 0 4-3 7-6 10-3-3-6-6-6-10C6 5.5 8.5 3 12 3Z" /><circle cx="12" cy="8" r="1.5" /></>),
  },
  {
    value: 'Skin texture & pores',
    label: 'Skin texture & pores',
    hint: 'Rough texture, large pores, dullness',
    icon: ico(<><circle cx="7" cy="8" r="1.2" /><circle cx="13" cy="7" r="1.2" /><circle cx="17" cy="10" r="1.2" /><circle cx="9" cy="14" r="1.2" /><circle cx="15" cy="13" r="1.2" /><path d="M5 20h14" /></>),
  },
  {
    value: 'Pigmentation & dark spots',
    label: 'Pigmentation & dark spots',
    hint: 'Sun spots, melasma, uneven skin tone',
    icon: ico(<><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6" /><path d="m15 9-6 6" /></>),
  },
  {
    value: 'Acne & scarring',
    label: 'Acne & scarring',
    hint: 'Active acne, post-acne marks, scars',
    icon: ico(<><path d="M12 3a9 9 0 1 0 9 9" /><circle cx="9" cy="10" r="1" /><circle cx="14" cy="8" r="1" /><circle cx="12" cy="15" r="1" /></>),
  },
  {
    value: 'Sagging & jowls',
    label: 'Sagging & jowls',
    hint: 'Skin laxity, jowls, drooping',
    icon: ico(<><path d="M5 9a7 7 0 0 1 14 0c0 5-3 9-7 12-4-3-7-7-7-12Z" /><path d="M8 15c1.5 1.5 6.5 1.5 8 0" /></>),
  },
];

/* ── Step 2 · Treatment areas (multi-select, optional) ─────────────────── */
export const AREAS: QuizOption[] = [
  { value: 'Forehead', label: 'Forehead', icon: ico(<><path d="M7 10c0-3 2-5 5-5s5 2 5 5" /><path d="M5 14h14" /></>) },
  { value: 'Eyes & crow\'s feet', label: 'Eyes & crow\'s feet', icon: ico(<><path d="M2 12s3-5 10-5 10 5 10 5-3 5-10 5-10-5-10-5Z" /><circle cx="12" cy="12" r="3" /></>) },
  { value: 'Lips & mouth', label: 'Lips & mouth', icon: ico(<><path d="M8 14s1.5 2 4 2 4-2 4-2" /><path d="M9 9h.01M15 9h.01" /><circle cx="12" cy="12" r="9" /></>) },
  { value: 'Cheeks & midface', label: 'Cheeks & midface', icon: ico(<><circle cx="12" cy="10" r="3" /><path d="M6 20c0-3.5 2.7-6 6-6s6 2.5 6 6" /></>) },
  { value: 'Jawline & chin', label: 'Jawline & chin', icon: ico(<><path d="M7 8c0 5 2 8 5 10 3-2 5-5 5-10" /><path d="M7 8V6a5 5 0 0 1 10 0v2" /></>) },
  { value: 'Neck & décolleté', label: 'Neck & décolleté', icon: ico(<><path d="M12 3v8" /><path d="M7 7c0 5 1 8 5 11 4-3 5-6 5-11" /><path d="M5 17h14" /></>) },
];

/* ── Step 3 · Injectable comfort (single-select) ────────────────────────── */
export const INJECTABLE_COMFORT: QuizOption[] = [
  {
    value: 'Yes, I am open',
    label: 'Yes, I\'m open to it',
    hint: 'Comfortable with injectables / fillers',
    icon: ico(<><path d="m10.5 13.5 3-3" /><rect x="3" y="9" width="10" height="6" rx="3" transform="rotate(45 8 12)" /></>),
  },
  {
    value: 'Prefer non-injectable',
    label: 'Prefer non-injectable',
    hint: 'Lasers, energy, skincare only',
    icon: ico(<><path d="M12 2L2 7l10 5 10-5-10-5Z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></>),
  },
  {
    value: 'Not sure yet',
    label: 'Not sure yet',
    hint: 'Happy to discuss with the doctor',
    icon: ico(<><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3" /><path d="M12 17h.01" /></>),
  },
];

/* ── Step 4 · Timeline (single-select) ─────────────────────────────────── */
export const TIMELINE: QuizOption[] = [
  { value: 'As soon as possible', label: 'As soon as possible', hint: 'Ready to book now', icon: ico(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>) },
  { value: '1-2 months', label: '1–2 months', hint: 'Planning ahead', icon: ico(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></>) },
  { value: '3-6 months', label: '3–6 months', hint: 'A comfortable pace', icon: ico(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4M8 13h2M14 13h2M8 17h2" /></>) },
  { value: 'Just exploring', label: 'Just exploring', hint: 'Curious, no rush', icon: ico(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>) },
];

/* ── Step 5 · Referral source (single-select) ───────────────────────────── */
export const REFERRAL: QuizOption[] = [
  { value: 'Social Media', label: 'Social Media', icon: ico(<><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3.2" /><circle cx="17" cy="7" r="1" /></>) },
  { value: 'Google', label: 'Google', icon: ico(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>) },
  { value: 'Hotel', label: 'Hotel', icon: ico(<><path d="M3 21V7l9-4 9 4v14" /><path d="M3 21h18M9 21v-5h6v5" /></>) },
  { value: 'Friend / Family', label: 'Friend / Family', icon: ico(<><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><path d="M16 11a3 3 0 1 0-1-5.8" /><path d="M18 20c0-2-.6-3.7-1.6-5" /></>) },
  { value: 'Influencer', label: 'Influencer', icon: ico(<><path d="M12 3l2.3 4.7L19.5 8l-3.8 3.6.9 5.2L12 14.8 7.4 16.8l.9-5.2L4.5 8l5.2-.3L12 3Z" /></>) },
  { value: 'Doctor referral', label: 'Doctor referral', icon: ico(<><path d="M8 11V7a4 4 0 0 1 8 0v4" /><rect x="4" y="11" width="16" height="9" rx="2" /></>) },
  { value: 'Repeat client', label: 'Repeat client', hint: 'I\'ve visited before', icon: ico(<><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 3v4h-4" /><path d="m9 12 2 2 4-4" /></>) },
  { value: 'Other', label: 'Other', icon: ico(<><circle cx="6" cy="12" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="18" cy="12" r="1.4" /></>) },
];

/* ── Step 6 · Consultation preference (single-select) ───────────────────── */
export const CONSULTATION: QuizOption[] = [
  {
    value: 'Free consultation',
    label: 'Free consultation',
    hint: 'In clinic, no obligation',
    icon: ico(<><circle cx="12" cy="8" r="3.2" /><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" /></>),
  },
  {
    value: 'In-person consultation (€60)',
    label: 'In-person consult (€60)',
    hint: 'Full doctor assessment at our clinic',
    icon: ico(<><rect x="3" y="6" width="13" height="12" rx="2" /><path d="m16 10 5-3v10l-5-3" /></>),
  },
  {
    value: 'No consultation',
    label: 'Just show my results',
    hint: 'Show me the treatments',
    icon: ico(<><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6M15 9l-6 6" /></>),
  },
];
