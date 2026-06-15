// Blog infrastructure types for Carisma Aesthetics

export type HeadingBlock = {
  type: "heading";
  level: 2 | 3;
  text: string;
};

export type ParagraphBlock = {
  type: "paragraph";
  html: string;
};

export type ImageBlock = {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
};

export type ListBlock = {
  type: "list";
  items: string[];
};

export type CtaBlock = {
  type: "cta";
  label: string;
  href: string;
};

export type BlogBlock =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | ListBlock
  | CtaBlock;

export type InternalLink = {
  anchorText: string;
  href: string;
  context: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  publishDate: string; // ISO date string e.g. "2025-06-01"
  readTime: number;    // minutes
  coverImage: string;
  excerpt: string;
  content: BlogBlock[];
  internalLinks: InternalLink[];
};
