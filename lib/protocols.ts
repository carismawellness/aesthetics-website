// Body "starter-pack protocol" pages (fat freezing, muscle stimulation, skin tightening,
// anti-cellulite, lymphatic drainage) — 1:1 recreations of the live carismaaesthetics.com
// pages. They share one Wix layout, so a single <ProtocolPage> renders all of them from data.

export type PriceItem = { label: string; price: string };

export type ProtocolData = {
  slug: string;
  hero: {
    kicker: string;
    title: string;
    tagline: string;
    intro: string;
    items: PriceItem[];
    totalValue: string;
    today: string;
    individualNote: string;
    cta: string;
    finePrint: string[];
    video: string;
  };
  secret: {
    heading: string;
    sub: string;
    image: string;
    paragraphs: string[];
    bullets: string[];
    cta: string;
  };
  trusted: {
    heading: string;
    headingSub: string;
    pressLogos?: string[];
    features: { icon: string; label: string; desc: string }[];
  };
  eligibility: {
    kicker: string;
    heading: string;
    image: string;
    areasIntro: string;
    areas: string[];
  };
  modality?: {
    kicker: string;
    heading: string;
    name: string;
    tag: string;
    tagSub: string;
    baImage?: string;
    sideImage?: string;
    intro: string;
    bullets: string[];
  };
  difference1: {
    kicker: string;
    heading: string;
    intro: string;
    bullets: string[];
  };
  starterPack: {
    heading: string;
    cols: { title: string; desc: string }[];
    items: PriceItem[];
    totalValue: string;
    today: string;
    finePrint: string[];
    cta: string;
  };
  difference2: {
    kicker: string;
    heading: string;
    commitmentTitle: string;
    commitment: string[];
    whyTitle: string;
    why: string[];
    cta: string;
    parking: string;
  };
  faq: { q: string; a: string }[];
  research: {
    heading: string;
    sub: string;
    cards: { image?: string; title: string; whatItDoes: string; keyResults: string[]; evidence: string }[];
    cta: string;
  };
};

import { fatFreezing } from "./protocols/fat-freezing";
import { muscleStimulation } from "./protocols/muscle-stimulation";
import { skinTightening } from "./protocols/skin-tightening";
import { antiCellulite } from "./protocols/anti-cellulite";
import { lymphaticDrainage } from "./protocols/lymphatic-drainage";

export const PROTOCOLS: Record<string, ProtocolData> = {
  "fat-freezing": fatFreezing,
  "muscle-stimulation": muscleStimulation,
  "skin-tightening": skinTightening,
  "anti-cellulite": antiCellulite,
  "lymphatic-drainage": lymphaticDrainage,
};

export const PROTOCOL_SLUGS = Object.keys(PROTOCOLS);
