import type { MetadataRoute } from "next";
import { ALL_TREATMENT_SLUGS } from "@/lib/treatments";
import { faceTreatmentSlugs } from "@/lib/face-treatments";
import { ALL_BLOG_SLUGS } from "@/lib/blogs";

// Canonical production origin (WWW per migration decision). Served at /sitemap.xml.
const BASE_URL = "https://www.carismaaesthetics.com";
const url = (path: string) => `${BASE_URL}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  // Evergreen top-level pages.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/face-treatments"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/membership"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/consultation"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/e-giftcards-vouchers"), changeFrequency: "monthly", priority: 0.6 },
    { url: url("/blog"), changeFrequency: "weekly", priority: 0.7 },
    { url: url("/privacy-policy"), changeFrequency: "yearly", priority: 0.2 },
    { url: url("/terms-conditions"), changeFrequency: "yearly", priority: 0.2 },
  ];

  // Treatment detail pages (/<slug>) — every nav-linked face/body/package treatment.
  const treatmentRoutes: MetadataRoute.Sitemap = ALL_TREATMENT_SLUGS.map((slug) => ({
    url: url(`/${slug}`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Face-treatment detail pages (/face-treatments/<slug>).
  const faceRoutes: MetadataRoute.Sitemap = faceTreatmentSlugs().map((slug) => ({
    url: url(`/face-treatments/${slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Blog posts (/blog/<slug>).
  const blogRoutes: MetadataRoute.Sitemap = ALL_BLOG_SLUGS.map((slug) => ({
    url: url(`/blog/${slug}`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // De-duplicate by URL (a nav slug could overlap a static route).
  const all = [...staticRoutes, ...treatmentRoutes, ...faceRoutes, ...blogRoutes];
  const seen = new Set<string>();
  return all.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
