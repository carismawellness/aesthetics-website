import type { BlogPost } from "@/lib/blog-types";
import { POST_REGISTRY } from "./index";

export function getAllPostSlugs(): string[] {
  return Object.keys(POST_REGISTRY);
}

export function getPost(slug: string): BlogPost | undefined {
  return POST_REGISTRY[slug];
}

// All ported posts, newest first.
export function getAllPosts(): BlogPost[] {
  return Object.values(POST_REGISTRY).sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

// Related posts: same category first, padded with most-recent others to `limit`.
export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPost[] {
  const all = getAllPosts().filter((p) => p.slug !== currentSlug);
  const sameCat = all.filter((p) => p.category === category);
  if (sameCat.length >= limit) return sameCat.slice(0, limit);
  const rest = all.filter((p) => p.category !== category);
  return [...sameCat, ...rest].slice(0, limit);
}
