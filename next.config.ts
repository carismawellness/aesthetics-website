import type { NextConfig } from "next";

// ---------------------------------------------------------------------------
// Rewrites: URL is PRESERVED in the browser — no redirect. Use for any URL
// that may receive ad traffic, email campaign traffic, or SEO backlinks where
// a visible URL change would break tracking (UTM params, quality score, etc.).
// ---------------------------------------------------------------------------
const adRewrites: { source: string; destination: string }[] = [
  // --- Active ad landing pages: -lp suffix variants ---
  { source: "/hydrafacial-lp",             destination: "/hydrafacial" },
  { source: "/lip-fillers-lp",             destination: "/lip-fillers-malta" },
  { source: "/microneedling-lp",           destination: "/microneedling-malta" },
  { source: "/prp-lp",                     destination: "/prp-malta" },
  { source: "/wrinkle-relaxer",            destination: "/wrinkle-relaxing-malta" },
  { source: "/laser-hair-removal-booking", destination: "/laser-hair-removal-malta" },
  { source: "/laser-hair-removal-package", destination: "/laser-hair-removal-malta" },
  { source: "/50-off-laser-hair-removal",  destination: "/laser-hair-removal-malta" },

  // --- Treatment URL aliases (Wix used both; cleaner → canonical with -1 suffix) ---
  { source: "/hydra-facial-malta",    destination: "/hydrafacial" },
  // NOTE: /skin-tightening and /muscle-stimulation are the LIVE canonical [slug]
  // routes (200) — Next matches the filesystem route before afterFiles rewrites,
  // so rewriting them was a dead no-op. The old Wix "-1" variants are handled as
  // 301 redirects in legacyRedirects instead.
  { source: "/fat-reduction",         destination: "/fat-freezing" },
  { source: "/anti-callulite",        destination: "/anti-cellulite" },
  { source: "/glp-ozempic",           destination: "/medical-weight-loss" },
  { source: "/wrinkles-and-fine-lines", destination: "/wrinkle-relaxing-malta" },
  { source: "/lip-flip",              destination: "/lip-fillers-malta" },
  { source: "/lip-glow-package",      destination: "/lip-fillers-malta" },

  // --- Seasonal/campaign LPs: URL preserved so live ad sets keep working ---
  { source: "/galentine-lip-filler",        destination: "/lip-fillers-malta" },
  { source: "/galentine-lip-glow",          destination: "/lip-fillers-malta" },
  { source: "/galentine-fat-dissolving",    destination: "/fat-dissolving-malta" },
  { source: "/galentine-chemical-peels",    destination: "/chemical-peels-malta" },
  { source: "/holiday-glow-up-profhilo",    destination: "/profhilo" },
  { source: "/holiday-glow-up-wrinkle-relax", destination: "/wrinkle-relaxing-malta" },
  { source: "/holiday-glow-up-dermal-filler", destination: "/dermal-fillers-malta" },
  { source: "/holiday-lip-filler-up",       destination: "/lip-fillers-malta" },

  // --- Subscribe / email campaign pages → consultation form (URL preserved) ---
  { source: "/subscribe-20", destination: "/consultation" },
  { source: "/subscribe-40", destination: "/consultation" },
  { source: "/subscribe-50", destination: "/consultation" },
  { source: "/subscribe-70", destination: "/consultation" },
  { source: "/subscribe-80", destination: "/consultation" },

  // --- Utility page aliases (bookmarks / old Wix links) ---
  { source: "/quiz",               destination: "/consultation" },
  { source: "/quiz-results",       destination: "/consultation" },
  { source: "/faq",                destination: "/consultation" },
  { source: "/contact",            destination: "/consultation" },
  { source: "/concerns",           destination: "/face-treatments" },
  { source: "/gift-card",          destination: "/e-giftcards-vouchers" },
  { source: "/aesthetics-packages", destination: "/membership" },
];

// ---------------------------------------------------------------------------
// Redirects: browser URL CHANGES (308 permanent). Use only for pages that are
// permanently retired, expired promos, or brand-keyword variants that should
// consolidate link equity onto the canonical slug.
// NOTE: /thread-lift-malta is intentionally NOT here — it is a live TREATMENTS
// page (lib/treatments/thread-lift-malta.ts) reachable via the [slug] catch-all.
// ---------------------------------------------------------------------------
const legacyRedirects: { source: string; destination: string }[] = [
  // --- Expired seasonal LPs (campaigns closed, no active ad spend) ---
  { source: "/galentine",       destination: "/" },
  { source: "/valentine",       destination: "/" },
  { source: "/womens-day-glow", destination: "/" },
  { source: "/bf-early-access", destination: "/" },
  { source: "/holiday-glow-up", destination: "/" },
  { source: "/glow-multiplier", destination: "/" },
  { source: "/advertorial",     destination: "/" },

  // --- Additional booking URL variants ---
  { source: "/book-consultation", destination: "/consultation" },
  { source: "/book",              destination: "/consultation" },
  { source: "/treatments",        destination: "/face-treatments" },

  // --- Old Wix duplicate-slug variants (sitemap-indexed → must not 404) ---
  { source: "/muscle-stimulation-1", destination: "/muscle-stimulation" },
  { source: "/skin-tightening-1",    destination: "/skin-tightening" },
  { source: "/lympathic-drainage",   destination: "/lymphatic-drainage" }, // Wix typo (missing h)

  // --- Brand / keyword slug consolidation ---
  { source: "/botox-malta",                 destination: "/wrinkle-relaxing-malta" },
  { source: "/anti-wrinkle-injections-malta", destination: "/wrinkle-relaxing-malta" },
  { source: "/laser-hair-removal",          destination: "/laser-hair-removal-malta" },
  { source: "/ozempic-malta",               destination: "/medical-weight-loss" },
  { source: "/mounjaro-malta",              destination: "/medical-weight-loss" },
  { source: "/glp1-malta",                  destination: "/medical-weight-loss" },
  // /wrinkles-fine-lines-packages is in the Wix sitemap + SLUG_SEO but is not in
  // ALL_TREATMENT_SLUGS (dynamicParams=false → 404 without this redirect).
  { source: "/wrinkles-fine-lines-packages", destination: "/wrinkle-relaxing-malta" },

  // --- Blog slug migration (Wix /aesthetics-blog/* → /blog/*) ---
  { source: "/aesthetics-blog/:slug*", destination: "/blog/:slug*" },
  { source: "/aesthetics-blog",        destination: "/blog" },

  // --- Dead utility / one-off pages ---
  { source: "/about",                          destination: "/" },
  { source: "/careers",                        destination: "/" },
  { source: "/pricelist",                      destination: "/" },
  { source: "/shop",                           destination: "/" },
  { source: "/home-care",                      destination: "/" },
  { source: "/sign-up",                        destination: "/" },
  { source: "/thank-you-for-contacting-us",    destination: "/" },
  { source: "/angelefarrugia",                 destination: "/" },
  { source: "/copy-of-free-facial-with-injectable", destination: "/" },
  { source: "/copy-of-subscribe",              destination: "/" },
];

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: "https", hostname: "static.wixstatic.com" },
    ],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  async rewrites() {
    return adRewrites;
  },
  async redirects() {
    return [
      // Canonicalise the public Vercel preview alias → production domain so the
      // raw aesthetics-pied.vercel.app host can't get indexed and compete with
      // www.carismaaesthetics.com (duplicate content). Only the production alias
      // host matches — the canonical domain's own requests never loop.
      {
        source: "/:path*",
        has: [{ type: "host", value: "aesthetics-pied.vercel.app" }],
        destination: "https://www.carismaaesthetics.com/:path*",
        permanent: true,
      },
      // Legacy Wix blog: the ~405 /post/* URLs are being ported natively into
      // lib/posts → app/post/[slug] at their ORIGINAL URLs. Until ALL posts are
      // ported, keep this catch-all so un-ported /post/* URLs 308 → /blog instead
      // of 404ing. REMOVE this line once lib/posts holds all 405 posts.
      { source: "/post/:slug*", destination: "/blog", permanent: true },
      // Legacy Wix store: ~101 /product-page/* URLs (no storefront on new site) → home.
      { source: "/product-page/:slug*", destination: "/", permanent: true },
      ...legacyRedirects.map((r) => ({ ...r, permanent: true })),
    ];
  },
};

export default nextConfig;
