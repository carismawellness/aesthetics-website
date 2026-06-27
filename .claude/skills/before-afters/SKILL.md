---
name: before-afters
description: Use when adding, refreshing, or QC-ing before/after photo sets on Carisma Aesthetics treatment pages (the BeforeAfterCarousel on every treatment page). Covers the data model, image pipeline, the per-pair content (treatment, indication, patient quote), the two-layer vision QC, the human-voice rules, and the deploy.
---

# Before/Afters — Carisma Aesthetics treatment pages

Every treatment page renders a scrollable before/after carousel. This skill is the source of truth for how that section is built, written, QC'd, and shipped. Target: **10+ pairs per page** so the proof feels deep, not token.

## How the system works (data-as-code)

There is no CMS. Each page's before/afters live in a typed array inside the page's data module.

- **Component:** `components/BeforeAfterCarousel.tsx` — pages it 3 / 2 / 1 across desktop / tablet / mobile, arrows + dots, prefetches the next page. Do not redesign it; feed it data. **The source frames are pre-designed with their own rounded corners + soft border, so the tile renders them whole: `object-fit: contain` at the frames' native `823 / 1068` ratio, with NO card border-radius, shadow or background competing with the artwork. Keep new source frames at that ratio (or update the tile ratio) so they fill with no letterbox.**
- **Data:** `lib/treatments/<slug>.ts` exports a `Treatment` with:
  - `beforeAfterTitle?: string` — section heading, e.g. `"BOTOX RESULTS"`.
  - `beforeAfter: BeforeAfter[]` — the pairs (aim for 10).
- **Type** (`lib/treatment-types.ts`):
  ```ts
  type BeforeAfter = { before: string; after: string; label?: string; name?: string; review?: string };
  ```
  - `before` / `after` — absolute public paths to the two photos. **`before` must be the photo that shows MORE of the concern**; `after` is the improved one. Orientation is decided by looking at the images, never by filename order.
  - `label` — the **indication that was targeted**, short sentence case, 2–5 words (`"Forehead and frown lines"`, `"Lip volume and shape"`, `"Lower-abdomen fat"`). Renders as a small caption above the name.
  - `name` — first name + last initial of the patient, **matching the gender shown** (`"Maria C."`). No full surnames.
  - `review` — one first-person customer quote about what changed (rendered in italics).
- **Registry:** add the page to `lib/treatments.ts` (`TREATMENTS` map) — already done for the 27 live treatments.

The four things every pair must carry: **the before/after**, **the treatment involved** (the page itself), **the indication targeted** (`label`), and **a customer quote** (`review`).

## Image pipeline

Source frames arrive as a folder per treatment (e.g. `~/Desktop/Before Afters./<Treatment>/`), 20 frames = 10 pairs in sequence (frame 1 before, frame 2 after, …). Map each folder to its registry slug (Face/Body/Package). Then:

1. **Compress + resize** each frame to ~760px wide JPEG (cards display ~190px, and `next/image` re-encodes to AVIF/WebP on serve, so the source only needs to be modest). macOS one-liner:
   ```bash
   sips -s format jpeg -s formatOptions 82 -Z 760 "<src>.png" --out public/assets/treatments/<slug>-baN-1.jpg
   ```
2. **Name positionally:** `<slug>-baN-1.jpg` and `<slug>-baN-2.jpg` (N = 1..10). Role (before vs after) is NOT in the filename — it is set in the data after QC decides orientation. This avoids renaming files when QC flips a pair.
3. **Commit the images first** (`git add --sparse` if the repo is sparse-checked-out, since `public/` may be excluded from the working tree), then add the content in a second commit.

## Writing the content — TWO vision QC layers, multiple sub-agents

Fan out **one analyst sub-agent per treatment** (27 pages = 27 agents), then **one independent QC sub-agent per treatment**. A Workflow `pipeline()` (analyze → QC, no barrier) is the right shape. Both layers actually open the images with the Read tool — never guess from the filename.

**Layer 1 — Analyst.** For each pair, read BOTH photos and determine:
- which image is the **before** (more of the concern) vs **after** (improved) → set `before`/`after` accordingly,
- **gender** (female/male) of the person,
- **where** the treatment was done (the visible face/body area),
- the **indication** targeted, consistent with the treatment.
Then write `label`, `name` (gender-matched), and a first-person `review` describing the visible change.

**Layer 2 — Independent QC.** A different agent re-reads all 20 images plus the draft and FIXES:
- accuracy — is before/after orientation right, is gender right, do area + indication actually match what is in the photo AND match the treatment;
- voice — does the quote sound like a real person, specific to this result, gender-correct, and distinct from the other nine;
- compliance — every hard rule below.

## Human-voice rules (NON-NEGOTIABLE)

The reviews must read like real Maltese patients, not like AI.

- **No em-dashes. Ever.** No `—`, no `--`. Use a comma or a full stop.
- No AI tells: "I'd be happy to", "Absolutely", "truly", "game-changer", "elevate", "journey", "transformative", "amazing results", "highly recommend".
- No "miracle", "instant", "overnight", "flawless", "perfect", "best in Malta", and no comparison to other clinics.
- No practitioner names (no "Dr.", and Kendra is a nurse, never "Dr. Kendra").
- First person, understated, specific to the visible change. ~12–28 words. Slightly imperfect and conversational. Vary the sentence shape so 10 reviews never feel templated.
- `name` varied across the set, gender-correct, mix of Maltese + European/English names common in Malta (Maria, Elena, Roberta, Daniela, Nadia, Christine, Mark, Luca, Julian, Steve …). First name + last initial only.
- Sentence case for body copy; `beforeAfterTitle` may be ALL CAPS.

## Verify + deploy

1. Inject the QC'd arrays into each `lib/treatments/<slug>.ts` (replace the `beforeAfter` array; set/keep `beforeAfterTitle`).
2. `npm run build` must pass (compile + TypeScript) before committing — Vercel build-gates production.
3. **Deploy = commit + push to `main`.** Vercel auto-deploys to `carismaaesthetics.com`. Per the repo's CLAUDE.md, committed work goes live automatically; you do not stage uncommitted work.

## Checklist before shipping a batch

- [ ] 10 pairs per page, each with `before`, `after`, `label`, `name`, `review`.
- [ ] before/after orientation verified by eye on every pair.
- [ ] gender + area + indication match the actual photo and the treatment.
- [ ] zero em-dashes, zero banned words, zero practitioner names, zero AI tells.
- [ ] names varied + gender-correct; reviews distinct.
- [ ] `npm run build` green, then push to `main`.
