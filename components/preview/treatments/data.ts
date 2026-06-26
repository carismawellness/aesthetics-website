// Shared data + type for the /preview/treatments showcase (5 design directions).
// Plain module (NO "use client") so it is safe to import from both server and
// client components. Sourced from the live homepage HOME_SERVICES so every
// direction renders the REAL 12 treatments, blurbs, links and hero photos.

import { HOME_SERVICES } from "@/lib/site";

export type ServiceItem = {
  label: string;
  href: string;
  photo: string;
  blurb: string;
};

export const SERVICES: ServiceItem[] = HOME_SERVICES.map((s) => ({
  label: s.label,
  href: s.href,
  photo: s.photo,
  blurb: s.blurb,
}));

// The five directions, in display order. `id` is the URL hash / switcher key.
export const DIRECTIONS = [
  {
    id: "liquid-glass",
    n: "01",
    name: "Liquid Glass Gallery",
    tech: "three.js + shaders",
    tagline:
      "Treatment photos on curved glass planes; a slow scroll-driven camera glide with refractive displacement and cursor ripples.",
  },
  {
    id: "editorial-scroll",
    n: "02",
    name: "Editorial Horizontal Scroll",
    tech: "GSAP ScrollTrigger",
    tagline:
      "Vertical scroll moves you sideways through oversized editorial cards — giant numerals, clip-path reveals, kinetic captions.",
  },
  {
    id: "aurora-grid",
    n: "03",
    name: "Aurora Spotlight Grid",
    tech: "light canvas / CSS",
    tagline:
      "A soft teal aurora follows the cursor and illuminates the cards beneath it; each tile lifts with a specular 3D tilt.",
  },
  {
    id: "draggable-canvas",
    n: "04",
    name: "Infinite Draggable Canvas",
    tech: "three.js plane grid",
    tagline:
      "All twelve treatments float on a free, momentum-draggable plane. The hovered tile sharpens and scales; the rest recede.",
  },
  {
    id: "cinematic-coverflow",
    n: "05",
    name: "Cinematic Coverflow",
    tech: "three.js depth carousel",
    tagline:
      "A depth-arranged stack — the active treatment centred and large, neighbours curving back with depth-of-field and reflection.",
  },
] as const;

export type DirectionId = (typeof DIRECTIONS)[number]["id"];
