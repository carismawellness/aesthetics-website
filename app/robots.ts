import type { MetadataRoute } from "next";

// Canonical production origin (WWW per migration decision). Served at /robots.txt.
const BASE_URL = "https://www.carismaaesthetics.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
