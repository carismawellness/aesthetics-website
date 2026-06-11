import { PackageContent } from "./types";
import { fatFreezing } from "./fat-freezing";
import { muscleStimulation } from "./muscle-stimulation";
import { skinTightening } from "./skin-tightening";
import { antiCellulite } from "./anti-cellulite";
import { lymphaticDrainage } from "./lymphatic-drainage";

/** Body-treatment package content (slimming-style design, Aesthetics brand). */
export const bodyPackages: Record<string, PackageContent> = {
  "fat-freezing": fatFreezing,
  "muscle-stimulation-1": muscleStimulation,
  "skin-tightening-1": skinTightening,
  "anti-cellulite": antiCellulite,
  "lympathic-drainage": lymphaticDrainage,
};
