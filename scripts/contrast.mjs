#!/usr/bin/env node
/*
  WCAG 2.2 contrast calculator — deterministic helper for the a11y remediation fleet.
  Agents MUST use this for every ratio instead of estimating by eye.

  Usage:
    node scripts/contrast.mjs <fg> <bg>
        Print the contrast ratio between two SOLID colors and which WCAG tiers pass.
        <fg>/<bg> accept: #rgb, #rrggbb, rgb(r,g,b), or a CSS var resolved to hex by you.

    node scripts/contrast.mjs flatten <rgbaOverlay> <solidBelow>
        Composite a translucent color/overlay over a solid color and print the
        resulting opaque hex. Use this FIRST for text over gradients/overlays/images,
        then feed the result back into the ratio command.

  Examples:
    node scripts/contrast.mjs "#ffffff" "#96b2b2"
    node scripts/contrast.mjs flatten "rgba(12,11,11,0.55)" "#96b2b2"
*/

function parseColor(input) {
  const s = String(input).trim();
  let m;
  if ((m = s.match(/^#([0-9a-f]{3})$/i))) {
    const h = m[1];
    return [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16), 1];
  }
  if ((m = s.match(/^#([0-9a-f]{6})$/i))) {
    const h = m[1];
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), 1];
  }
  if ((m = s.match(/^#([0-9a-f]{8})$/i))) {
    const h = m[1];
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), parseInt(h.slice(6, 8), 16) / 255];
  }
  if ((m = s.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)\s*(?:[,/]\s*([\d.]+%?))?\s*\)$/i))) {
    let a = m[4] == null ? 1 : (m[4].endsWith("%") ? parseFloat(m[4]) / 100 : parseFloat(m[4]));
    return [+m[1], +m[2], +m[3], a];
  }
  throw new Error(`Cannot parse color: "${input}"`);
}

function toHex([r, g, b]) {
  return "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
}

function composite(fg, bg) {
  const a = fg[3];
  return [
    fg[0] * a + bg[0] * (1 - a),
    fg[1] * a + bg[1] * (1 - a),
    fg[2] * a + bg[2] * (1 - a),
    1,
  ];
}

function relLum([r, g, b]) {
  const f = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function ratio(c1, c2) {
  const L1 = relLum(c1), L2 = relLum(c2);
  const [hi, lo] = L1 >= L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}

const [cmd, ...rest] = process.argv.slice(2);

if (cmd === "flatten") {
  const [overlay, below] = rest;
  const result = composite(parseColor(overlay), parseColor(below));
  console.log(toHex(result));
  process.exit(0);
}

if (!cmd || rest.length < 1) {
  console.error("Usage: node scripts/contrast.mjs <fg> <bg>   |   node scripts/contrast.mjs flatten <rgbaOverlay> <solidBelow>");
  process.exit(1);
}

let fg = parseColor(cmd);
let bg = parseColor(rest[0]);
// Auto-composite any translucent input over the other (best-effort; for precise
// stacks use `flatten` explicitly).
if (fg[3] < 1) fg = composite(fg, bg[3] < 1 ? composite(bg, [255, 255, 255, 1]) : bg);
if (bg[3] < 1) bg = composite(bg, [255, 255, 255, 1]);

const r = ratio(fg, bg);
const rr = Math.round(r * 100) / 100;
console.log(JSON.stringify({
  fg: toHex(fg),
  bg: toHex(bg),
  ratio: rr,
  normalText: { AA: r >= 4.5, AAA: r >= 7 },
  largeText: { AA: r >= 3, AAA: r >= 4.5 },
  uiComponent: { pass: r >= 3 },
}, null, 2));
