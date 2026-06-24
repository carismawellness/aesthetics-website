# Phase 3: Migrate img→Image Components

**Status:** Ready for execution after Phase 2 completes

## Overview

This document outlines how to migrate all 62 `<img>` tags to Next.js `<Image>` components for automatic optimization.

## Files with Raw `<img>` Tags (62 total)

```
components/PageHero.tsx (2 tags)
components/ProtocolPage.tsx (7 tags)
components/HairRegrowthPage.tsx (2 tags)
components/LaserHairRemovalPage.tsx (15 tags)
components/TreatmentPage.tsx (10+ tags)
components/face/FaceUI.tsx (5+ tags)
[+ other components]
```

## Migration Strategy

### Step 1: Add Image Import
At the top of each component file:
```tsx
import Image from 'next/image';
```

### Step 2: Convert img→Image Tag Pattern

**Before:**
```tsx
<img 
  src="/assets/treatments/botox.png" 
  alt="Botox treatment" 
  className="w-full"
  style={{ objectFit: "cover" }}
/>
```

**After:**
```tsx
<Image
  src="/assets/treatments/botox.png"
  alt="Botox treatment"
  width={800}
  height={600}
  className="w-full"
  style={{ objectFit: "cover" }}
  priority={false}
  quality={85}
/>
```

### Step 3: Handle Image Dimensions

For images without explicit width/height:
- Use actual image dimensions if known
- Default to 800×600 (will be corrected by Image)
- Next.js Image component handles responsive sizing

### Step 4: Priority Hints

- `priority={true}` — Hero images, above-fold content
- `priority={false}` — Below-fold, lazy-loaded

Examples:
- `PageHero.tsx` line 287: media image → `priority={true}` (LCP candidate)
- `LaserHairRemovalPage.tsx` line 263: treatment cards → `priority={false}` (lazy load)

## Estimated Changes

| File | Tags | Priority | Effort |
|------|------|----------|--------|
| PageHero | 2 | High | 15 min |
| LaserHairRemovalPage | 15 | Medium | 30 min |
| TreatmentPage | 10 | Medium | 25 min |
| ProtocolPage | 7 | Medium | 20 min |
| FaceUI | 5 | Low | 15 min |
| Other (23) | 23 | Low | 30 min |

**Total estimated time:** ~2 hours

## Verification

After migration:
1. Run `npm run build` — should pass without errors
2. Check for TypeScript errors (Image prop validation)
3. Spot-check 3 pages in dev mode:
   - Home (verifies Image imports)
   - Treatment detail (verifies lazy loading)
   - Blog post (verifies responsive images)

## Benefits

✅ **Automatic Responsive Srcsets** — Next.js generates srcsets automatically  
✅ **Lazy Loading** — Off-screen images load on demand  
✅ **Format Selection** — Serves AVIF to modern browsers, JPEG to others  
✅ **Size Optimization** — Responsive image sizing based on viewport  
✅ **LCP Improvement** — Priority hints speed up critical images  

**Estimated Lighthouse gain:** +15–20 points

## Next: Phase 4 (CSS & Fonts)

After Phase 3 completes:
- Tailwind tree-shaking (remove unused classes)
- Font loading strategy (swap instead of block)
- Preload critical fonts

See `docs/plans/2026-06-24-pagespeed-optimization-roadmap.md` for full roadmap.
