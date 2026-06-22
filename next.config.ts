import type { NextConfig } from "next";

// ---------------------------------------------------------------------------
// Legacy Wix → new-site permanent (308) redirects.
// Source of truth: live Wix sitemaps (pages / blog-posts / store-products).
// NOTE: same-slug service pages (e.g. /thread-lift-malta, /dermal-fillers-malta)
// resolve natively on the new site and are deliberately NOT listed here.
// Only legacy URLs that would otherwise 404 after cutover are redirected.
// ---------------------------------------------------------------------------
const legacyRedirects: { source: string; destination: string }[] = [
  // --- Old slug → new slug (same treatment, different path) ---
  { source: "/hydra-facial-malta", destination: "/hydrafacial" },
  { source: "/hydrafacial-lp", destination: "/hydrafacial" },
  { source: "/lip-fillers-lp", destination: "/lip-fillers-malta" },
  { source: "/lip-flip", destination: "/lip-fillers-malta" },
  { source: "/lip-glow-package", destination: "/lip-fillers-malta" },
  { source: "/microneedling-lp", destination: "/microneedling-malta" },
  { source: "/prp-lp", destination: "/prp-malta" },
  { source: "/glp-ozempic", destination: "/medical-weight-loss" },
  { source: "/anti-callulite", destination: "/anti-cellulite" }, // legacy typo
  { source: "/skin-tightening", destination: "/skin-tightening-1" },
  { source: "/muscle-stimulation", destination: "/muscle-stimulation-1" },
  { source: "/fat-reduction", destination: "/fat-freezing" },
  { source: "/wrinkle-relaxer", destination: "/wrinkle-relaxing-malta" },
  { source: "/wrinkles-and-fine-lines", destination: "/wrinkle-relaxing-malta" },
  { source: "/wrinkles-fine-lines-packages", destination: "/wrinkle-relaxing-malta" },
  { source: "/laser-hair-removal-booking", destination: "/laser-hair-removal-malta" },
  { source: "/laser-hair-removal-package", destination: "/laser-hair-removal-malta" },
  { source: "/50-off-laser-hair-removal", destination: "/laser-hair-removal-malta" },

  // --- Seasonal / campaign LPs → closest matching treatment ---
  { source: "/galentine-lip-filler", destination: "/lip-fillers-malta" },
  { source: "/galentine-lip-glow", destination: "/lip-fillers-malta" },
  { source: "/galentine-fat-dissolving", destination: "/fat-dissolving-malta" },
  { source: "/galentine-chemical-peels", destination: "/chemical-peels-malta" },
  { source: "/holiday-glow-up-profhilo", destination: "/profhilo" },
  { source: "/holiday-glow-up-wrinkle-relax", destination: "/wrinkle-relaxing-malta" },
  { source: "/holiday-glow-up-dermal-filler", destination: "/dermal-fillers-malta" },
  { source: "/holiday-lip-filler-up", destination: "/lip-fillers-malta" },

  // --- Expired seasonal LPs with no treatment match → home ---
  { source: "/galentine", destination: "/" },
  { source: "/valentine", destination: "/" },
  { source: "/womens-day-glow", destination: "/" },
  { source: "/bf-early-access", destination: "/" },
  { source: "/holiday-glow-up", destination: "/" },
  { source: "/glow-multiplier", destination: "/" },
  { source: "/advertorial", destination: "/" },

  // --- Additional booking / utility URL variants ---
  { source: "/book-consultation", destination: "/consultation" },
  { source: "/book", destination: "/consultation" },
  { source: "/treatments", destination: "/face-treatments" },

  // --- Legacy brand-keyword slugs → canonical treatment slugs ---
  { source: "/botox-malta", destination: "/wrinkle-relaxing-malta" },
  { source: "/anti-wrinkle-injections-malta", destination: "/wrinkle-relaxing-malta" },
  { source: "/laser-hair-removal", destination: "/laser-hair-removal-malta" },
  { source: "/ozempic-malta", destination: "/medical-weight-loss" },
  { source: "/mounjaro-malta", destination: "/medical-weight-loss" },
  { source: "/glp1-malta", destination: "/medical-weight-loss" },

  // --- Face-treatment hierarchy variants ---
  { source: "/thread-lift-malta", destination: "/face-treatments/thread-lift" },

  // --- Blog slug migration (Wix blog sub-paths → new blog) ---
  { source: "/aesthetics-blog/:slug*", destination: "/blog/:slug*" },

  // --- Utility / info pages → nearest new equivalent ---
  { source: "/contact", destination: "/consultation" },
  { source: "/quiz", destination: "/consultation" },
  { source: "/quiz-results", destination: "/consultation" },
  { source: "/faq", destination: "/consultation" },
  { source: "/concerns", destination: "/face-treatments" },
  { source: "/aesthetics-blog", destination: "/blog" },
  { source: "/aesthetics-packages", destination: "/membership" },
  { source: "/gift-card", destination: "/e-giftcards-vouchers" },
  { source: "/about", destination: "/" },
  { source: "/careers", destination: "/" },
  { source: "/pricelist", destination: "/" },
  { source: "/shop", destination: "/" },
  { source: "/home-care", destination: "/" },
  { source: "/sign-up", destination: "/" },
  { source: "/thank-you-for-contacting-us", destination: "/" },
  { source: "/angelefarrugia", destination: "/" },
  { source: "/copy-of-free-facial-with-injectable", destination: "/" },
  { source: "/copy-of-subscribe", destination: "/" },

  // --- Subscribe campaign variants → home ---
  { source: "/subscribe-20", destination: "/" },
  { source: "/subscribe-40", destination: "/" },
  { source: "/subscribe-50", destination: "/" },
  { source: "/subscribe-70", destination: "/" },
  { source: "/subscribe-80", destination: "/" },
];

const nextConfig: NextConfig = {
  images: {
    // Allow next/image to optimize the legacy Wix CDN assets still referenced on
    // a few pages (e.g. the gift-card occasion mockups). Without this the image
    // optimizer returns 400 Bad Request for the remote host.
    remotePatterns: [
      { protocol: "https", hostname: "static.wixstatic.com" },
    ],
  },
  async redirects() {
    return [
      // Legacy Wix blog: ~404 /post/* URLs (new slugs differ entirely) → blog index.
      { source: "/post/:slug*", destination: "/blog", permanent: true },
      // Legacy Wix store: ~101 /product-page/* URLs (no storefront on new site) → home.
      // TODO(editorial): refine high-traffic products to specific treatments, and send
      // gift-card products to /e-giftcards-vouchers; consider 410 Gone (via middleware)
      // for permanently-retired SKUs instead of a redirect-to-home soft-404.
      { source: "/product-page/:slug*", destination: "/", permanent: true },
      ...legacyRedirects.map((r) => ({ ...r, permanent: true })),
    ];
  },
};

export default nextConfig;
