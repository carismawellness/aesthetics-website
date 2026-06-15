import type { BlogPost } from "@/lib/blog-types";

// Individual blog files import themselves into this registry.
// Pattern: each blog file does  BLOG_REGISTRY["my-slug"] = { ... }
// before this module is evaluated (side-effect imports).
// Add blog files here as they are created (side-effect imports populate the registry):
import { post as whatToExpectLaserHairRemoval } from './what-to-expect-laser-hair-removal';
import { post as completeGuideDermalFillersMalta } from './complete-guide-dermal-fillers-malta';
import { post as hydrafacialVsTraditional } from './hydrafacial-vs-traditional-facials';
import { post as howDoesPicoLaserTattooRemovalWork } from './how-does-pico-laser-tattoo-removal-work';
import { post as hairRegrowthTreatmentsScience } from './hair-regrowth-treatments-science';
import { post as antiWrinkleInjectionsGuide } from './anti-wrinkle-injections-guide';
import { post as medicallyQualifiedAestheticsClinicMalta } from './medically-qualified-aesthetics-clinic-malta';

export const BLOG_REGISTRY: Record<string, BlogPost> = {
  [whatToExpectLaserHairRemoval.slug]: whatToExpectLaserHairRemoval,
  [completeGuideDermalFillersMalta.slug]: completeGuideDermalFillersMalta,
  [hydrafacialVsTraditional.slug]: hydrafacialVsTraditional,
  [howDoesPicoLaserTattooRemovalWork.slug]: howDoesPicoLaserTattooRemovalWork,
  [hairRegrowthTreatmentsScience.slug]: hairRegrowthTreatmentsScience,
  [antiWrinkleInjectionsGuide.slug]: antiWrinkleInjectionsGuide,
  [medicallyQualifiedAestheticsClinicMalta.slug]: medicallyQualifiedAestheticsClinicMalta,
};

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
