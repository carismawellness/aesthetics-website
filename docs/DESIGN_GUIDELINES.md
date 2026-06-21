# Carisma Aesthetics — Design Guidelines

## Color Palette (2026 Refresh)

The brand palette pairs soft sage-teals with warm neutrals for an elegant, modern, reassuring feel. Bright brand hues are **decorative** — use the darkened, accessible variants for small text and button fills so they meet WCAG AA contrast.

### Brand & Surface Colors

| Color | Hex | Usage |
| --- | --- | --- |
| Sage-teal | `#96B2B2` | Signature brand accent — large fills, decorative elements |
| Light teal | `#DEEBEB` | Section background tint |
| Warm beige | `#EFE7D7` | Warm band background |
| Taupe | `#9B8D83` | Warm accent |
| Neutral grey | `#ECEAE7` | Neutral surface |
| White | `#FFFFFF` | Base / surface |

### Accessible Variants (use for small text & button fills)

| Color | Hex | Usage |
| --- | --- | --- |
| Deep teal | `#4F7373` | Button fill / small text — white text passes AA |
| Heading / label taupe-gold | `#706552` / `#756758` | Headings and labels |
| Ink | `#0C0B0B` | Body text / darkest ink |

> **Note:** Bright brand hues (sage-teal, light teal, warm beige) are decorative. For small text and button fills, use the darkened variants (deep teal, taupe-gold, ink) to maintain WCAG AA contrast.

---

## Typography

| Typeface | CSS Family | Role |
| --- | --- | --- |
| **Novecento Wide** | — | Display — headings, nav, kickers. Uppercase, tracked. |
| **Trajan Pro** | — | Elegant serif accents. |
| **Roboto** | — | Body text. |
| **Helvetica** | `Helvetica Brand` | Clean neutral UI / alternate body face. |
| **Ani Lazy Day** | `Carisma Script` (`.font-script`) | Decorative script — large decorative accents only. |

- **Novecento Wide** is the display face for headings, navigation, and kickers — always uppercase and letter-tracked.
- **Trajan Pro** provides elegant serif accents.
- **Roboto** is the workhorse body face.
- **Helvetica** (CSS family `"Helvetica Brand"`) is a clean neutral option for UI or as an alternate body face.
- **Ani Lazy Day** (CSS family `"Carisma Script"`, utility class `.font-script`) is a decorative script reserved for large decorative accents only — never use it for body copy or UI.

Font files live in `public/assets/fonts/`.

---

## Logo

Three logo variations live in `public/assets/logos/`:

| File | Description | Best for |
| --- | --- | --- |
| `carisma-round.png` | Round rose emblem in a ring | Favicon, compact placements, social avatar |
| `carisma-wordmark.svg` | Horizontal wordmark (scalable) | Primary site logo |
| `carisma-logo.pdf` | Print/vector master | Print |

### Guidance

- **All variations are valid** — pick by context and size.
- Use the **wordmark** in the header and large placements.
- Use the **round emblem** where space is tight or square.
- Use the **PDF master** for print.
- Always maintain clear space around the logo, and **never distort** it.
