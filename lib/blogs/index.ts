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
import { post as medicalWeightLossMaltaGuide } from './medical-weight-loss-malta-guide';
import { post as prpFacialMalta } from './prp-facial-malta';
import { post as jawlineFillerMalta } from './jawline-filler-malta';
import { post as cheekFillersMalta } from './cheek-fillers-malta';
import { post as antiAgeingTreatmentsMalta } from './anti-ageing-treatments-malta';
import { post as acneScarTreatmentMalta } from './acne-scar-treatment-malta';
import { post as dermalFillersMaltaGuide } from './dermal-fillers-malta-guide';
import { post as glp1WeightLossTreatmentMalta } from './glp-1-weight-loss-treatment-malta';

export const BLOG_REGISTRY: Record<string, BlogPost> = {
  [whatToExpectLaserHairRemoval.slug]: whatToExpectLaserHairRemoval,
  [completeGuideDermalFillersMalta.slug]: completeGuideDermalFillersMalta,
  [hydrafacialVsTraditional.slug]: hydrafacialVsTraditional,
  [howDoesPicoLaserTattooRemovalWork.slug]: howDoesPicoLaserTattooRemovalWork,
  [hairRegrowthTreatmentsScience.slug]: hairRegrowthTreatmentsScience,
  [antiWrinkleInjectionsGuide.slug]: antiWrinkleInjectionsGuide,
  [medicallyQualifiedAestheticsClinicMalta.slug]: medicallyQualifiedAestheticsClinicMalta,
  [medicalWeightLossMaltaGuide.slug]: medicalWeightLossMaltaGuide,
  [prpFacialMalta.slug]: prpFacialMalta,
  [jawlineFillerMalta.slug]: jawlineFillerMalta,
  [cheekFillersMalta.slug]: cheekFillersMalta,
  [antiAgeingTreatmentsMalta.slug]: antiAgeingTreatmentsMalta,
  [acneScarTreatmentMalta.slug]: acneScarTreatmentMalta,
  [dermalFillersMaltaGuide.slug]: dermalFillersMaltaGuide,
  [glp1WeightLossTreatmentMalta.slug]: glp1WeightLossTreatmentMalta,
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
