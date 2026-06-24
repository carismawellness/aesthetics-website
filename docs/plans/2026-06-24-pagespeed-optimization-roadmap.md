# PageSpeed Optimization Roadmap — Target: 90+ Lighthouse

**Goal:** Achieve 90+ performance score on all pages via systematic optimization.

**Status:** Baseline audit complete. Images are 60% of bottleneck.

## Baseline Findings

| Metric | Status |
|--------|--------|
| Images using `next/image` | 4 / 30+ pages (13%) |
| Raw `<img>` tags | 62 (need conversion) |
| Image formats | 788 PNG, 120 JPG, 17 AVIF (need modernization) |
| Largest images | 15MB uncompressed (need compression) |
| CSS size | 32KB globals.css (moderate) |
| Build size | 126MB .next (acceptable) |

## Optimization Phases

### Phase 1: Image Optimization (60% of wins)
**Impact: ~40-60% performance improvement**

1. **Batch convert all images to AVIF + JPEG fallback**
   - Use `sharp` or ImageMagick to convert all public/assets to AVIF
   - Keep JPEG as fallback (95% browser support)
   - Target: 85% file size reduction

2. **Replace all `<img>` tags with `<Image from next/image`**
   - Audit all 62 `<img>` occurrences
   - Migrate to next/image with proper `sizes` prop
   - Add `priority={true}` for above-fold images
   - Add `loading="lazy"` for below-fold (automatic in next/image)

3. **Implement responsive images**
   - Define `sizes` breakpoints for each image context
   - Generate srcsets automatically via next/image

4. **Enable image optimization in next.config.ts**
   - Ensure `images.formats = ['image/avif', 'image/webp']`

### Phase 2: Code Splitting & Bundle Optimization (15% of wins)
**Impact: ~10-15% performance improvement**

1. **Identify heavy components** (modals, 3D elements, animations)
   - Use dynamic imports for components loaded on interaction
   - Example: GlowClubModal, Tiers 3D geometry

2. **Remove unused dependencies**
   - Audit node_modules for unused packages
   - Tree-shake unused code

3. **Split CSS by route**
   - PurgeCSS / Tailwind v4 tree-shaking
   - Only load CSS needed for each page

### Phase 3: Font & CSS Optimization (10% of wins)
**Impact: ~8-12% performance improvement**

1. **Optimize font loading**
   - Use `font-display: swap` for Google Fonts
   - Subset fonts to Latin (if content allows)
   - Preload critical fonts

2. **Audit and minimize globals.css**
   - Remove unused Tailwind classes
   - Remove unused custom properties
   - Consolidate duplicate rules

### Phase 4: Caching & Delivery (10% of wins)
**Impact: ~5-10% performance improvement**

1. **Vercel caching headers**
   - Set `Cache-Control: public, max-age=31536000, immutable` for static assets
   - Configure `revalidate` for ISR routes

2. **Preload critical resources**
   - Preload hero images (LCP candidate)
   - Preload critical fonts

3. **Compression**
   - Enable Brotli on Vercel
   - Check gzip settings

## Execution Order

1. **Phase 1 (Images)** — 70% of impact, parallel work possible
   - Start: Batch image conversion
   - Parallel: Convert img tags to Image
   - Verify: Build green, spot-check on 5 pages

2. **Phase 2 (Code)** — 15% of impact
   - Identify dynamic import candidates
   - Implement and measure

3. **Phase 3 (Fonts/CSS)** — 10% of impact
   - Optimize fonts
   - Audit CSS

4. **Phase 4 (Caching)** — 5% of impact
   - Configure headers
   - Preload

## Success Criteria

✅ **All pages 90+ Lighthouse performance score**
✅ **LCP < 2.5s (mobile)**
✅ **CLS < 0.1**
✅ **FID/INP < 100ms**
✅ **No raw `<img>` tags in codebase**
✅ **All images AVIF or modern format**
✅ **Build size stays < 150MB**

## Timeline

- **Phase 1:** 4-6 hours (images are labor-intensive)
- **Phase 2:** 2-3 hours
- **Phase 3:** 1-2 hours
- **Phase 4:** 1 hour
- **Verification:** 1-2 hours

**Total:** ~10-14 hours across multiple sessions
