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
import { post as botoxAftercareMaltaSummer } from './botox-aftercare-malta-summer';
import { post as howLongDoesBotoxLastMalta } from './how-long-does-botox-last-malta';
import { post as firstTimeBotoxMalta } from './first-time-botox-malta';
import { post as botoxVsFillersMalta } from './botox-vs-fillers-malta';
import { post as babyBotoxMalta } from './baby-botox-malta';
import { post as botoxCostMalta } from './botox-cost-malta';
import { post as lipFillerSwellingStageMalta } from './lip-filler-swelling-stages-malta';
import { post as lipFillerAftercareMaltaHeatSun } from './lip-filler-aftercare-malta-heat-sun';
import { post as howLongDoLipFillersLastMalta } from './how-long-do-lip-fillers-last-malta';
import { post as fillerMigrationSigns } from './filler-migration-signs';
import { post as microneedlingAftercareMaltaSun } from './microneedling-aftercare-malta-sun';
import { post as microneedlingForAcneScarsMalta } from './microneedling-for-acne-scars-malta';
import { post as rfMicroneedlingVsMicroneedlingMalta } from './rf-microneedling-vs-microneedling-malta';
import { post as microneedlingDowntimeMaltaHoliday } from './microneedling-downtime-malta-holiday';
import { post as acneScarsVsAcneMarksMalta } from './acne-scars-vs-acne-marks-malta';
import { post as typesOfAcneScarsMalta } from './types-of-acne-scars-malta';
import { post as pigmentationAfterSummerMalta } from './pigmentation-after-summer-malta';
import { post as melasmaVsSunSpotsMalta } from './melasma-vs-sun-spots-malta';
import { post as postAcneHyperpigmentationMalta } from './post-acne-hyperpigmentation-malta';
import { post as canPigmentationTreatmentsMakeDarkSpotsWorse } from './can-pigmentation-treatments-make-dark-spots-worse';
import { post as adultAcneMaltaSweatHormonesSPF } from './adult-acne-malta-sweat-hormones-spf';

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
  [botoxAftercareMaltaSummer.slug]: botoxAftercareMaltaSummer,
  [howLongDoesBotoxLastMalta.slug]: howLongDoesBotoxLastMalta,
  [firstTimeBotoxMalta.slug]: firstTimeBotoxMalta,
  [botoxVsFillersMalta.slug]: botoxVsFillersMalta,
  [babyBotoxMalta.slug]: babyBotoxMalta,
  [botoxCostMalta.slug]: botoxCostMalta,
  [lipFillerSwellingStageMalta.slug]: lipFillerSwellingStageMalta,
  [lipFillerAftercareMaltaHeatSun.slug]: lipFillerAftercareMaltaHeatSun,
  [howLongDoLipFillersLastMalta.slug]: howLongDoLipFillersLastMalta,
  [fillerMigrationSigns.slug]: fillerMigrationSigns,
  [microneedlingAftercareMaltaSun.slug]: microneedlingAftercareMaltaSun,
  [microneedlingForAcneScarsMalta.slug]: microneedlingForAcneScarsMalta,
  [rfMicroneedlingVsMicroneedlingMalta.slug]: rfMicroneedlingVsMicroneedlingMalta,
  [microneedlingDowntimeMaltaHoliday.slug]: microneedlingDowntimeMaltaHoliday,
  [acneScarsVsAcneMarksMalta.slug]: acneScarsVsAcneMarksMalta,
  [typesOfAcneScarsMalta.slug]: typesOfAcneScarsMalta,
  [pigmentationAfterSummerMalta.slug]: pigmentationAfterSummerMalta,
  [melasmaVsSunSpotsMalta.slug]: melasmaVsSunSpotsMalta,
  [postAcneHyperpigmentationMalta.slug]: postAcneHyperpigmentationMalta,
  [canPigmentationTreatmentsMakeDarkSpotsWorse.slug]: canPigmentationTreatmentsMakeDarkSpotsWorse,
  [adultAcneMaltaSweatHormonesSPF.slug]: adultAcneMaltaSweatHormonesSPF,
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
