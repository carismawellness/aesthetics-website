// Treatment page registry — content lives in lib/treatments/<slug>.ts (one file
// per page so pages can be edited independently). Types in lib/treatment-types.ts.
// Sections render only when their data is present, so partially-extracted pages
// still match the global layout/header/footer exactly.

import { FACE_LINKS, BODY_LINKS, PACKAGE_LINKS, type NavLink } from "./site";
import type { Treatment } from "./treatment-types";

export * from "./treatment-types";

import WrinkleRelaxingMalta from "./treatments/wrinkle-relaxing-malta";
import LipFillersMalta from "./treatments/lip-fillers-malta";
import DermalFillersMalta from "./treatments/dermal-fillers-malta";
import MicroneedlingMalta from "./treatments/microneedling-malta";
import Profhilo from "./treatments/profhilo";
import MesotherapyMalta from "./treatments/mesotherapy-malta";
import LaserHairRemovalMalta from "./treatments/laser-hair-removal-malta";
import Hydrafacial from "./treatments/hydrafacial";
import FatFreezing from "./treatments/fat-freezing";
import FatDissolvingMalta from "./treatments/fat-dissolving-malta";
import ThreadLiftMalta from "./treatments/thread-lift-malta";
import ChemicalPeelsMalta from "./treatments/chemical-peels-malta";
import HairRegrowth from "./treatments/hair-regrowth";
import CollagenStimulatorMalta from "./treatments/collagen-stimulator-malta";
import PolynucleotidesSalmonDna from "./treatments/polynucleotides-salmon-dna";
import PrpMalta from "./treatments/prp-malta";
import PicoLaserTattooRemoval from "./treatments/pico-laser-tattoo-removal";
import PicoLaserPigmentationTreatment from "./treatments/pico-laser-pigmentation-treatment";
import MedicalWeightLoss from "./treatments/medical-weight-loss";
import MuscleStimulation1 from "./treatments/muscle-stimulation-1";
import SkinTightening1 from "./treatments/skin-tightening-1";
import AntiCellulite from "./treatments/anti-cellulite";
import LympathicDrainage from "./treatments/lympathic-drainage";
import SnatchYourJawline from "./treatments/snatch-your-jawline";
import T4In1HydrafacialGlow from "./treatments/4-in-1-hydrafacial-glow";
import ExosomeGlowlift from "./treatments/exosome-glowlift";
import UltimateFacelift from "./treatments/ultimate-facelift";

export const TREATMENTS: Record<string, Treatment> = {
  "wrinkle-relaxing-malta": WrinkleRelaxingMalta,
  "lip-fillers-malta": LipFillersMalta,
  "dermal-fillers-malta": DermalFillersMalta,
  "microneedling-malta": MicroneedlingMalta,
  "profhilo": Profhilo,
  "mesotherapy-malta": MesotherapyMalta,
  "laser-hair-removal-malta": LaserHairRemovalMalta,
  "hydrafacial": Hydrafacial,
  "fat-freezing": FatFreezing,
  "fat-dissolving-malta": FatDissolvingMalta,
  "thread-lift-malta": ThreadLiftMalta,
  "chemical-peels-malta": ChemicalPeelsMalta,
  "hair-regrowth": HairRegrowth,
  "collagen-stimulator-malta": CollagenStimulatorMalta,
  "polynucleotides-salmon-dna": PolynucleotidesSalmonDna,
  "prp-malta": PrpMalta,
  "pico-laser-tattoo-removal": PicoLaserTattooRemoval,
  "pico-laser-pigmentation-treatment": PicoLaserPigmentationTreatment,
  "medical-weight-loss": MedicalWeightLoss,
  "muscle-stimulation-1": MuscleStimulation1,
  "skin-tightening-1": SkinTightening1,
  "anti-cellulite": AntiCellulite,
  "lympathic-drainage": LympathicDrainage,
  "snatch-your-jawline": SnatchYourJawline,
  "4-in-1-hydrafacial-glow": T4In1HydrafacialGlow,
  "exosome-glowlift": ExosomeGlowlift,
  "ultimate-facelift": UltimateFacelift,
};

// Map every nav slug to a Treatment, falling back to a clean hero-only page
// (clearly flagged as pending) so navigation never 404s and layout stays consistent.
function categoryOf(href: string): Treatment["category"] {
  if (FACE_LINKS.some((l) => l.href === href)) return "Face";
  if (BODY_LINKS.some((l) => l.href === href)) return "Body";
  return "Package";
}

export function getTreatment(slug: string): Treatment | null {
  const key = `/${slug}`;
  const all: NavLink[] = [...FACE_LINKS, ...BODY_LINKS, ...PACKAGE_LINKS];
  const nav = all.find((l) => l.href === key);
  if (TREATMENTS[slug]) return TREATMENTS[slug];
  if (!nav) return null;
  return {
    slug,
    category: categoryOf(key),
    hero: {
      title: nav.label,
      subtitle: "Performed by medically qualified doctors at Carisma Aesthetics, Malta.",
      cta: "BOOK YOUR CONSULTATION",
    },
    pending: true,
  };
}

export const ALL_TREATMENT_SLUGS = [
  ...FACE_LINKS,
  ...BODY_LINKS,
  ...PACKAGE_LINKS,
].map((l) => l.href.replace(/^\//, ""));
