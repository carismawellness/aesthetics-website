// Google reviews shown in the footer.
//
// The <GoogleReviews> component fetches LIVE from the Google Places API when both
// GOOGLE_PLACES_API_KEY and GOOGLE_PLACES_PLACE_ID env vars are set (cached/revalidated
// daily). Until then it renders the curated real reviews below so the section is never
// empty. Aggregate rating mirrors the clinic's verified 4.9★ score.

export type Review = {
  name: string;
  initial: string;
  rating: number;
  text: string;
  when: string;
};

export const REVIEW_SUMMARY = {
  rating: 4.9,
  total: 200, // shown as "200+"; live API overrides with the real Google total
  plus: true,
};

// Opens the clinic's Google listing (where the full review list lives).
export const GOOGLE_PROFILE_URL =
  "https://www.google.com/maps/search/?api=1&query=Carisma%20Aesthetics%20St%20Julian's%20Malta";

// Real Carisma Aesthetics customer reviews (fallback content until the live feed is wired).
export const CURATED_REVIEWS: Review[] = [
  {
    name: "Rachelle A.",
    initial: "R",
    rating: 5,
    text: "Finally found my jawline again! I've always had a rounder face, no matter how much I worked out. This treatment honestly changed that. I feel more confident in photos, and the best part is it still looks super natural.",
    when: "2 weeks ago",
  },
  {
    name: "Daniela A.",
    initial: "D",
    rating: 5,
    text: "I didn't expect much from a facial, but the way they deep cleaned my skin... I was shook. I've struggled with clogged pores that no scrub could fix. The HydraFacial literally cleared everything out — no pain, no redness, just super clean, smooth skin.",
    when: "a month ago",
  },
  {
    name: "Nicole C.",
    initial: "N",
    rating: 5,
    text: "My skin looked tired and textured for months. Leticia explained everything so calmly and made the whole treatment feel easy. After the Exosome Glow Lift, my skin finally feels smooth again and my glow is back.",
    when: "3 weeks ago",
  },
  {
    name: "Shanel D.",
    initial: "S",
    rating: 5,
    text: "Dr. Giovanni did a non-surgical thread lift and honestly the difference was instant. My face looked lifted, my jawline was sharper, and the best part — it still looks like me.",
    when: "a month ago",
  },
  {
    name: "Claire V.",
    initial: "C",
    rating: 5,
    text: "I was feeling dull and dehydrated, like my skin had lost its spark. Tried this on a friend's recommendation and wow — my skin looked fresher instantly. The staff were so gentle and kind. It felt like a reset, not just a treatment.",
    when: "2 months ago",
  },
  {
    name: "Carmen B.",
    initial: "C",
    rating: 5,
    text: "Exactly what I needed. I'd been avoiding photos because of the loose skin under my jaw. The treatment didn't just reduce the fullness — it actually redefined the shape. So happy I did this.",
    when: "3 months ago",
  },
];
