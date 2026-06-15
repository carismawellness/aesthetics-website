import type { BlogPost } from "@/lib/blog-types";

// Individual blog files import themselves into this registry.
// Pattern: each blog file does  BLOG_REGISTRY["my-slug"] = { ... }
// before this module is evaluated (side-effect imports).
// For now the registry starts empty; add blog files here as they are created:
//
//   import "@/lib/blogs/example-post";
//

export const BLOG_REGISTRY: Record<string, BlogPost> = {};

export const ALL_BLOG_SLUGS: string[] = Object.keys(BLOG_REGISTRY);

export function getBlog(slug: string): BlogPost | undefined {
  return BLOG_REGISTRY[slug];
}

// Helper: return all posts sorted newest-first
export function getAllBlogs(): BlogPost[] {
  return Object.values(BLOG_REGISTRY).sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

// Helper: return posts in the same category, excluding the current slug
export function getRelatedBlogs(currentSlug: string, category: string, limit = 3): BlogPost[] {
  return getAllBlogs()
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit);
}
