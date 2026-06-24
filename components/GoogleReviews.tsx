import { CURATED_REVIEWS, REVIEW_SUMMARY, GOOGLE_PROFILE_URL } from "@/lib/reviews";

/*
  Google reviews block for the footer (legacy server component — NOT mounted in
  the current Footer, which uses components/home/Reviews.tsx). Kept compiling.

  Live data: if GOOGLE_PLACES_API_KEY and GOOGLE_PLACES_PLACE_ID are set, this
  server component fetches the latest reviews from the Google Places API and
  caches them for a day (ISR). Otherwise it renders the curated real reviews
  from lib/reviews.ts, so the section always shows content. A strict ≥4★ filter
  is applied to whatever source supplies the cards.
*/

// Flat shape this component renders (distinct from the richer lib `Review`).
type LegacyReview = { name: string; initial: string; rating: number; text: string; when: string };

type Feed = { rating: number; total: number; url: string; reviews: LegacyReview[] };

async function fetchGoogleReviews(): Promise<Feed | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACES_PLACE_ID;
  if (!key || !placeId) return null;
  try {
    const url =
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}` +
      `&fields=rating,user_ratings_total,reviews,url&reviews_sort=newest&language=en&key=${key}`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status !== "OK" || !data.result) return null;
    const r = data.result;
    const reviews: LegacyReview[] = (r.reviews ?? [])
      .filter((rv: { text?: string }) => rv.text && rv.text.trim().length > 0)
      .map((rv: { author_name?: string; rating?: number; text?: string; relative_time_description?: string }) => ({
        name: rv.author_name ?? "Google user",
        initial: (rv.author_name ?? "G").trim().charAt(0).toUpperCase(),
        rating: rv.rating ?? 5,
        text: rv.text ?? "",
        when: rv.relative_time_description ?? "",
      }))
      // ⭐ Strict ≥4★ filter — never render sub-4★ reviews.
      .filter((rv: LegacyReview) => rv.rating >= 4);
    return {
      rating: r.rating ?? REVIEW_SUMMARY.rating,
      total: r.user_ratings_total ?? REVIEW_SUMMARY.total,
      url: r.url ?? GOOGLE_PROFILE_URL,
      reviews: reviews.length ? reviews : CURATED_REVIEWS,
    };
  } catch {
    return null;
  }
}

function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
    </svg>
  );
}

function Stars({ rating = 5, size = 14 }: { rating?: number; size?: number }) {
  return (
    <span role="img" className="inline-flex" style={{ color: "#b8860b" }} aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < Math.round(rating) ? "currentColor" : "#8a8a8a"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

// Aesthetics teal-palette avatar fills (white text clears AA on each).
const AVATAR_COLORS = ["#4f7373", "#406060", "#5a6f6f", "#3a4a4a", "#6b7e7e", "#48646e"];

export default async function GoogleReviews() {
  const live = await fetchGoogleReviews();
  const rating = live?.rating ?? REVIEW_SUMMARY.rating;
  // Curated fallback count is shown as "500+"; a live API result overrides with the real Google total.
  const total = live?.total ?? 500;
  const showPlus = !live;
  const url = live?.url ?? GOOGLE_PROFILE_URL;
  const reviews = (live?.reviews?.length ? live.reviews : CURATED_REVIEWS).slice(0, 6);

  return (
    <section style={{ backgroundColor: "var(--white)", padding: "64px 0 24px" }}>
      <div className="container">
        {/* summary header */}
        <div className="flex flex-col items-center text-center" style={{ marginBottom: "40px" }}>
          <div className="flex items-center gap-3">
            <GoogleG size={30} />
            <span className="font-display" style={{ fontSize: "13px", letterSpacing: "0.14em", color: "var(--label)" }}>GOOGLE REVIEWS</span>
          </div>
          <div className="flex items-center gap-3" style={{ marginTop: "14px" }}>
            <span className="font-serif" style={{ fontSize: "34px", color: "var(--teal-text)", lineHeight: 1 }}>{rating.toFixed(1)}</span>
            <span className="flex flex-col items-start">
              <Stars rating={rating} size={17} />
              <span style={{ fontSize: "12.5px", color: "var(--muted)", marginTop: "3px" }}>
                Based on {total.toLocaleString("en-US")}{showPlus ? "+" : ""} reviews
              </span>
            </span>
          </div>
        </div>

        {/* review cards */}
        <div className="grid gap-6 md:grid-cols-3 mx-auto" style={{ maxWidth: "1080px" }}>
          {reviews.map((r, i) => (
            <div key={r.name + i} className="review-card bg-white" style={{ padding: "24px", borderRadius: "var(--radius-card)", border: "1px solid var(--line)", boxShadow: "0 10px 26px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-3">
                <span className="shrink-0 inline-flex items-center justify-center font-display" style={{ width: "40px", height: "40px", borderRadius: "50%", background: AVATAR_COLORS[i % AVATAR_COLORS.length], color: "#fff", fontSize: "16px" }}>
                  {r.initial}
                </span>
                <span className="flex-1">
                  <span className="block" style={{ fontSize: "14px", color: "var(--ink)", fontWeight: 600 }}>{r.name}</span>
                  {r.when && <span className="block" style={{ fontSize: "11.5px", color: "var(--muted)" }}>{r.when}</span>}
                </span>
                <GoogleG size={18} />
              </div>
              <div style={{ marginTop: "12px" }}><Stars rating={r.rating} /></div>
              <p style={{ marginTop: "10px", fontSize: "13.5px", color: "var(--ink-soft)", lineHeight: 1.7 }}>{r.text}</p>
            </div>
          ))}
        </div>

        {/* CTA to full Google profile */}
        <div className="text-center" style={{ marginTop: "36px" }}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-outline inline-flex items-center gap-2" style={{ padding: "11px 24px", fontSize: "13px" }}>
            <GoogleG size={16} />
            Review us on Google
          </a>
        </div>
      </div>
    </section>
  );
}
