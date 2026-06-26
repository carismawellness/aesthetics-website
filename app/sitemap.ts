import type { MetadataRoute } from "next";
import { ALL_TREATMENT_SLUGS } from "@/lib/treatments";
import { faceTreatmentSlugs } from "@/lib/face-treatments";
import { BLOG_REGISTRY } from "@/lib/blogs";
import { POST_REGISTRY } from "@/lib/posts";

// Canonical production origin (WWW per migration decision). Served at /sitemap.xml.
const BASE_URL = "https://www.carismaaesthetics.com";
const url = (path: string) => `${BASE_URL}${path}`;

// Shared lastModified date for evergreen/static pages.
const LAST_MODIFIED = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  // Evergreen top-level pages.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 1.0 },
    { url: url("/consultation"), lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 0.9 },
    { url: url("/face-treatments"), lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 0.9 },
    { url: url("/membership"), lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/e-giftcards-vouchers"), lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/blog"), lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 0.8 },
  ];

  // Treatment detail pages (/<slug>) — every nav-linked face/body/package treatment.
  const treatmentRoutes: MetadataRoute.Sitemap = ALL_TREATMENT_SLUGS.map((slug) => ({
    url: url(`/${slug}`),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Face-treatment detail pages (/face-treatments/<slug>).
  const faceRoutes: MetadataRoute.Sitemap = faceTreatmentSlugs().map((slug) => ({
    url: url(`/face-treatments/${slug}`),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Blog posts (/blog/<slug>) — use each post's publishDate as lastModified.
  const blogRoutes: MetadataRoute.Sitemap = Object.values(BLOG_REGISTRY).map((post) => ({
    url: url(`/blog/${post.slug}`),
    lastModified: post.publishDate ? new Date(post.publishDate) : LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Ported Wix blog posts (/post/<slug>) — original URLs preserved for SEO.
  const postRoutes: MetadataRoute.Sitemap = Object.values(POST_REGISTRY).map((post) => ({
    url: url(`/post/${post.slug}`),
    lastModified: post.publishDate ? new Date(post.publishDate) : LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // De-duplicate by URL (a nav slug could overlap a static route).
  const all = [...staticRoutes, ...treatmentRoutes, ...faceRoutes, ...blogRoutes, ...postRoutes];
  const seen = new Set<string>();
  return all.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
