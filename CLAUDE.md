# CLAUDE.md — Carisma Aesthetics Website

This repository is **only** the marketing website for **Carisma Aesthetics** (Malta).
Keep it that way: everything here is website code, content-as-code, or build config.
Do not add business-ops, CRM, finance, scraping, or scratch tooling here.

## ⚠️ This is a customized Next.js

This is a customized **Next.js 16.2.7** — APIs, conventions, and file structure may
differ from your training data. **Read the relevant guide in
`node_modules/next/dist/docs/` before writing any code**, and heed deprecation notices.

## Stack

- **Next.js 16.2.7** (App Router, Turbopack) · **React 19** · **TypeScript 5**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- Deploys automatically to **Vercel on push to `main`** → `aesthetics-pied.vercel.app`
  (production domain: `carismaaesthetics.com`).

## Project structure

- `app/` — App Router routes. Each route is a folder with `page.tsx` (plus optional
  `layout.tsx`, `route.ts`). Dynamic routes use `[slug]` (e.g. `app/face-treatments/[slug]`,
  `app/blog/[slug]`). API routes live under `app/api/`.
- `components/` — shared/presentational React components and page templates
  (e.g. `TreatmentPage`, `BlogTemplate`, `MembershipPage`, `Header`, `Footer`).
- `lib/` — content-as-code and types: `treatments.ts`, `face-treatments.ts`,
  `packages.ts`, `protocols.ts`, `reviews.ts`, `site.ts`, `*-types.ts`, plus content
  folders (`blogs/`, `treatments/`, `protocols/`).
- `public/` — static assets (images, fonts).
- Config: `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`.

## Working rules

1. **Verify before claiming done**: `npm run build` must pass (compile + TypeScript).
   For SEO/schema work, also inspect the prerendered HTML under `.next/server/app/*.html`.
2. **Surgical edits**: preserve `className`/props/inline styles; don't restructure
   layout, copy, or components unless that's the task.
3. Don't run `dev`/`build` from subagents unnecessarily — it's slow and noisy.

## SEO conventions (this is a marketing site — SEO is a first-class concern)

- Exactly **one `<h1>` per page**, containing the page's primary keyword and "Malta"
  where it reads naturally. Logical `H1 → H2 → H3` with no skipped levels. Headings
  must be descriptive and keyword-relevant — never generic, never stuffed.
- Metadata via `export const metadata` / `generateMetadata`: `title`, `description`,
  and `alternates.canonical`.
- Utility/conversion pages (thank-you, internal previews) use
  `robots: { index: false, follow: true }`. **Do not also `Disallow` them in
  `app/robots.ts`** — Googlebot must be able to crawl a page to see its `noindex`.
- Crawl/index rules live in `app/robots.ts` and `app/sitemap.ts`.

## Structured data (JSON-LD)

- Render JSON-LD as a `<script type="application/ld+json">` in the page/layout, per the
  Next.js JSON-LD guide, sanitising with `.replace(/</g, '\\u003c')`.
- FAQ / Service / Breadcrumb data **must match the visible content**. Keep FAQ/treatment
  copy in a single-source module shared by the visible component and the schema — never
  hand-duplicate it.
- **Exactly one `FAQPage` per page.** Place page-scoped JSON-LD on the page itself, not a
  shared `layout.tsx`, so it doesn't leak onto nested routes.
- **Never import a data array from a `'use client'` module into a server component** — you
  get a client-reference proxy, not the array. Put shared data in a plain module.

## Brand voice

- Tagline **"Glow with Confidence"**. Persona **Sarah** — warm, confident, empowering.
  Audience: women 25+ in Malta. Signature feel: aesthetic results delivered with care.

## Deploy

- Push to `main` → Vercel auto-deploys. Doc/cleanup changes don't affect the build;
  code changes do — always verify `npm run build` first.
