#!/usr/bin/env node
// Checks WCAG 2.x contrast for every documented colour pair, in both themes.
//
// Source:    tokens.json and tokens/primitives.json, resolved as build-tokens.mjs resolves them
// Usage:     node scripts/check-contrast.mjs          print the tightest pairs; exit 1 if any pair fails
//            node scripts/check-contrast.mjs --all    print every pair
//
// Text needs 4.5:1 (WCAG 1.4.3 AA). Borders and the focus ring need 3:1 (WCAG 1.4.11).
// A foreground with alpha is composited over its surface first. Surfaces must be opaque.

import { readJSON, primitiveIndex, themeColors } from "./tokens-lib.mjs";

const TEXT = 4.5;
const UI = 3;

const PAPERS = ["paper", "paper-raised", "paper-sunk"];

// [foreground, surfaces, minimum, where the pairing comes from]
// Keep in step with the README (Colour, Accessibility) and the usage notes in tokens.json.
const PAIRS = [
  // Body text and metadata sit on every paper surface.
  ["ink", PAPERS, TEXT, "usage note"],
  ["ink-muted", PAPERS, TEXT, "usage note"],
  // Hovered table rows and selected search results put ink and ink-muted on neptune-soft.
  ["ink", ["neptune-soft"], TEXT, "Table, SearchDialog"],
  ["ink-muted", ["neptune-soft"], TEXT, "Table, SearchDialog"],
  // Links and accent text. paper-sunk: the Footer link hover.
  ["neptune", ["paper", "paper-raised", "neptune-soft"], TEXT, "usage note"],
  ["neptune", ["paper-sunk"], TEXT, "Footer"],
  // State text: tags, hints, callout and dialog labels. The README measures paper-sunk too.
  ["ok", PAPERS, TEXT, "usage note, Accessibility"],
  ["alert", PAPERS, TEXT, "usage note, Accessibility"],
  // Text on a fill.
  ["on-neptune", ["neptune"], TEXT, "primary button"],
  ["on-alert", ["alert"], TEXT, "danger button"],
  // Terminals, code blocks, toasts and tooltips.
  ["term-ink", ["term-bg"], TEXT, "usage note"],
  ["term-muted", ["term-bg"], TEXT, "usage note"],
  ["term-accent", ["term-bg"], TEXT, "usage note"],
  ["term-ok", ["term-bg"], TEXT, "usage note"],
  ["term-alert", ["term-bg"], TEXT, "usage note"],
  // Non-text: meaningful borders and the focus ring.
  ["line-strong", PAPERS, UI, "usage note, Accessibility"],
  ["focus", PAPERS, UI, "usage note"],
];

// Reported, never enforced: line is decoration only.
const INFO = [["line", PAPERS]];

// ---- WCAG 2.x --------------------------------------------------------------

const rgba = (hex) => {
  const c = [1, 3, 5, 7].map((i) => parseInt(hex.slice(i, i + 2) || "ff", 16) / 255);
  return { rgb: c.slice(0, 3), a: c[3] };
};
const over = (fg, bg) => fg.rgb.map((c, i) => c * fg.a + bg.rgb[i] * (1 - fg.a));
const channel = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const luminance = ([r, g, b]) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
const contrast = (fgHex, bgHex) => {
  const bg = rgba(bgHex);
  if (bg.a < 1) throw new Error(`Surface ${bgHex} has alpha; contrast needs an opaque surface`);
  const [l1, l2] = [luminance(over(rgba(fgHex), bg)), luminance(bg.rgb)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

// ---- measure ---------------------------------------------------------------

// A colour with no primitive is build-tokens.mjs --check's error to report; this script measures whatever the hex is.
const src = readJSON("tokens.json");
const byHex = primitiveIndex(readJSON("tokens/primitives.json"));
const fmt = (r) => `${r.toFixed(2)}:1`;
const failures = [];
const all = process.argv.includes("--all");

for (const theme of src.color.themes) {
  const col = themeColors(src, byHex, theme);
  const rows = PAIRS.flatMap(([fg, surfaces, min, from]) =>
    surfaces.map((bg) => ({ fg, bg, min, from, ratio: contrast(col[fg].hex, col[bg].hex) })),
  );
  for (const r of rows) if (r.ratio < r.min) failures.push(`${r.fg} on ${r.bg} (${theme.name}): ${fmt(r.ratio)}, needs ${r.min}:1`);

  // Tightest first, by headroom over each pair's own minimum.
  rows.sort((a, b) => a.ratio / a.min - b.ratio / b.min);
  const shown = all ? rows : [
    ...rows.filter((r) => r.min === TEXT).slice(0, 3),
    ...rows.filter((r) => r.min === UI).slice(0, 2),
  ].sort((a, b) => a.ratio / a.min - b.ratio / b.min);

  console.log(`\n${theme.name}: ${all ? "every" : "tightest"} pair${all ? "" : "s"} (${rows.length} checked)`);
  for (const r of shown) {
    const mark = r.ratio < r.min ? "✗" : "✓";
    console.log(`  ${mark} ${r.fg.padEnd(12)} on ${r.bg.padEnd(13)} ${fmt(r.ratio).padStart(8)}  min ${r.min}:1  ${r.from}`);
  }
  for (const [fg, surfaces] of INFO) {
    const ratios = surfaces.map((bg) => contrast(col[fg].hex, col[bg].hex));
    console.log(`  · ${fg.padEnd(12)} on paper surfaces ${Math.min(...ratios).toFixed(2)}–${Math.max(...ratios).toFixed(2)}:1, decoration only`);
  }
}

if (failures.length) {
  console.error(`\n${failures.map((e) => `✗ ${e}`).join("\n")}`);
  console.error("Adjust the token in tokens.json until each pair passes, then update the README Accessibility figures.");
  process.exit(1);
}
console.log("\n✓ Every documented colour pair meets its WCAG contrast minimum in both themes");
