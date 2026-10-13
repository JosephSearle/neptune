#!/usr/bin/env node
// Builds W3C DTCG (Design Tokens Format Module 2025.10) files from Neptune's sources.
//
// Sources:   tokens.json            semantic tokens, both themes (the design system artifact's format)
//            tokens/primitives.json raw colour primitives
// Outputs:   tokens/dtcg/primitives.tokens.json
//            tokens/dtcg/base.tokens.json       theme-independent tokens
//            tokens/dtcg/paper.tokens.json      light theme, aliasing primitives
//            tokens/dtcg/deep.tokens.json       dark theme, aliasing primitives
//
// Usage:     node scripts/build-tokens.mjs           write the outputs
//            node scripts/build-tokens.mjs --check   fail if outputs or tokens.css are out of date

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { root, readJSON as read, aliasOf, primitiveIndex } from "./tokens-lib.mjs";

const src = read("tokens.json");
const prim = read("tokens/primitives.json");
const errors = [];

// ---- helpers -------------------------------------------------------------

const color = (hex) => {
  const h = hex.toLowerCase();
  if (!/^#[0-9a-f]{6}([0-9a-f]{2})?$/.test(h)) throw new Error(`Not a 6- or 8-digit hex colour: ${hex}`);
  const c = [1, 3, 5].map((i) => +(parseInt(h.slice(i, i + 2), 16) / 255).toFixed(4));
  const out = { colorSpace: "srgb", components: c, hex: h.slice(0, 7) };
  if (h.length === 9) out.alpha = +(parseInt(h.slice(7, 9), 16) / 255).toFixed(4);
  return out;
};

const dim = (v) => {
  const m = String(v).match(/^(-?[\d.]+)(px|rem)?$/);
  if (!m) throw new Error(`Not a px/rem dimension: ${v}`);
  return { value: Number(m[1]), unit: m[2] || "px" };
};

const dur = (v) => {
  const m = String(v).match(/^([\d.]+)(ms|s)$/);
  if (!m) throw new Error(`Not a duration: ${v}`);
  return { value: Number(m[1]), unit: m[2] };
};

// hex -> "{primitive.family.step}"
const byHex = primitiveIndex(prim, errors);
const ref = (hex, where) => {
  const r = byHex.get(hex.toLowerCase());
  if (!r) errors.push(`${where}: ${hex} has no primitive in tokens/primitives.json`);
  return r;
};

const familyStacks = (s) => s.split(",").map((f) => f.trim().replace(/^"|"$/g, ""));

// ---- primitives ----------------------------------------------------------

const primitives = { primitive: { $type: "color", $description: prim.$description } };
for (const [family, steps] of Object.entries(prim)) {
  if (family.startsWith("$")) continue;
  primitives.primitive[family] = {};
  for (const [step, hex] of Object.entries(steps)) primitives.primitive[family][step] = { $value: color(hex) };
}

// ---- themes --------------------------------------------------------------

const themeOut = {};
for (const theme of src.color.themes) {
  const out = { color: { $type: "color" } };
  for (const t of src.color.tokens) {
    const v = t.value[theme.id];
    const alias = aliasOf(v);
    out.color[t.name] = {
      $value: alias ? `{color.${alias}}` : ref(v, `${theme.name} ${t.name}`),
      $description: t.usage,
    };
  }
  for (const t of src.shadow.tokens) {
    const m = t.value[theme.id].match(/^(-?\d+px) (-?\d+px) (\d+(?:px)?) (#[0-9a-fA-F]{6})$/);
    if (!m) { errors.push(`${theme.name} ${t.name}: can't parse shadow "${t.value[theme.id]}"`); continue; }
    out.shadow ??= { $type: "shadow" };
    out.shadow[t.name] = {
      $value: { color: ref(m[4], `${theme.name} ${t.name}`), offsetX: dim(m[1]), offsetY: dim(m[2]), blur: dim(m[3]), spread: dim(0) },
      $description: t.usage,
    };
  }
  out.$description = `Neptune ${theme.name} theme (${theme.id}). Combine with primitives.tokens.json and base.tokens.json.`;
  themeOut[theme.name.toLowerCase()] = out;
}

// ---- base (theme-independent) -------------------------------------------

const group = (type, tokens, map = (v) => v) =>
  Object.fromEntries([["$type", type], ...tokens.map((t) => [t.name, { $value: map(t.value), $description: t.usage }])]);

const families = { serif: familyStacks(src.type.families.serif), mono: familyStacks(src.type.families.mono) };
const typography = { $type: "typography" };
for (const g of src.type.groups) {
  for (const s of g.styles) {
    const fam = s.family || g.family;
    const size = dim(s.fontSize).value;
    const ls = s.letterSpacing ? Number(s.letterSpacing.replace("em", "")) : 0;
    typography[s.name] = {
      $value: {
        fontFamily: `{font.${fam}}`,
        fontSize: dim(s.fontSize),
        fontWeight: s.fontWeight,
        // DTCG dimensions are px or rem only, so em tracking is converted to px at this size.
        letterSpacing: { value: +(ls * size).toFixed(3), unit: "px" },
        lineHeight: +(dim(s.lineHeight).value / size).toFixed(4),
      },
      $description: s.usage + (s.fontStyle === "italic" ? " Italic." : ""),
      $extensions: { "dev.neptune": { group: g.name, ...(s.fontStyle ? { fontStyle: s.fontStyle } : {}), ...(s.letterSpacing ? { letterSpacing: s.letterSpacing } : {}) } },
    };
  }
}

const layoutDims = src.layout.tokens.filter((t) => /px$/.test(t.value));
const layoutCh = src.layout.tokens.filter((t) => !/px$/.test(t.value));

const base = {
  $description: "Neptune tokens shared by both themes.",
  font: { $type: "fontFamily", serif: { $value: families.serif }, mono: { $value: families.mono } },
  space: group("dimension", src.spacing.tokens, dim),
  radius: group("dimension", src.radius.tokens, (v) => dim(v === "0" ? "0px" : v)),
  stroke: group("dimension", src.stroke.tokens, dim),
  layout: group("dimension", layoutDims, dim),
  breakpoint: group("dimension", src.breakpoint.tokens, dim),
  duration: group("duration", src.timing.tokens.filter((t) => /m?s$/.test(t.value)), dur),
  z: group("number", src.zIndex.tokens, Number),
  typography,
  // Values DTCG 2025.10 has no type for (ch units, steps() easing). Kept here so nothing is lost.
  $extensions: {
    "dev.neptune": {
      css: Object.fromEntries([
        ...layoutCh.map((t) => [t.name, t.value]),
        ...src.timing.tokens.filter((t) => !/m?s$/.test(t.value)).map((t) => [t.name, t.value]),
      ]),
    },
  },
};

// ---- tokens.css drift check ---------------------------------------------

const css = readFileSync(join(root, "tokens.css"), "utf8");
const block = (sel) => {
  const i = css.indexOf(sel);
  if (i < 0) errors.push(`tokens.css has no block "${sel}"`);
  return i < 0 ? "" : css.slice(i, css.indexOf("}", i));
};
// Every block that sets theme colours: the two themes, the system-dark default, and print (always Paper).
for (const [sel, id] of [
  [':root, [data-theme="light"] {', "light"],
  ['[data-theme="dark"] {', "dark"],
  [':root:not([data-theme="light"]) {', "dark"],
  [':root[data-theme], :root:not([data-theme]) {', "light"],
]) {
  const b = block(sel);
  for (const t of src.color.tokens) {
    const v = t.value[id];
    const want = v.startsWith("{") ? `var(--${v.slice(1, -1)})` : v.toLowerCase();
    const got = (b.match(new RegExp(`--${t.name}:\\s*([^;]+);`)) || [])[1];
    if (got?.trim().toLowerCase() !== want) errors.push(`tokens.css "${sel}" --${t.name} is "${got}", tokens.json says "${want}"`);
  }
}

// ---- write or check ------------------------------------------------------

const outputs = {
  "tokens/dtcg/primitives.tokens.json": primitives,
  "tokens/dtcg/base.tokens.json": base,
  ...Object.fromEntries(Object.entries(themeOut).map(([n, v]) => [`tokens/dtcg/${n}.tokens.json`, v])),
};

const check = process.argv.includes("--check");
for (const [p, data] of Object.entries(outputs)) {
  const text = JSON.stringify(data, null, 2) + "\n";
  const file = join(root, p);
  if (check) {
    if (!existsSync(file) || readFileSync(file, "utf8") !== text) errors.push(`${p} is out of date. Run: node scripts/build-tokens.mjs`);
  } else {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, text);
  }
}

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log(check ? "✓ DTCG tokens and tokens.css match tokens.json" : `✓ Wrote ${Object.keys(outputs).length} files to tokens/dtcg/`);
