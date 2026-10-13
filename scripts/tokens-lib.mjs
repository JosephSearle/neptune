// Shared by build-tokens.mjs and check-contrast.mjs: read the token sources and resolve semantic colours.
//
// A semantic colour value is either an alias to another semantic colour in the same theme ("{neptune}")
// or a hex that must exist in tokens/primitives.json.

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const readJSON = (p) => JSON.parse(readFileSync(join(root, p), "utf8"));

export const aliasOf = (v) => (v.match(/^\{(.+)\}$/) || [])[1];

// hex -> "{primitive.family.step}". Duplicate hexes are reported in errors.
export const primitiveIndex = (prim, errors = []) => {
  const byHex = new Map();
  for (const [family, steps] of Object.entries(prim)) {
    if (family.startsWith("$")) continue;
    for (const [step, hex] of Object.entries(steps)) {
      const h = hex.toLowerCase();
      if (byHex.has(h)) errors.push(`Primitive ${family}.${step} duplicates ${byHex.get(h)} (${h})`);
      else byHex.set(h, `{primitive.${family}.${step}}`);
    }
  }
  return byHex;
};

// name -> { hex, primitive } for one theme, following aliases to the primitive they end on.
export const themeColors = (src, byHex, theme, errors = []) => {
  const raw = Object.fromEntries(src.color.tokens.map((t) => [t.name, t.value[theme.id]]));
  const resolve = (name, seen = []) => {
    if (seen.includes(name)) throw new Error(`${theme.name}: alias loop ${[...seen, name].join(" -> ")}`);
    const v = raw[name];
    if (v === undefined) throw new Error(`${theme.name}: no colour token "${name}"${seen.length ? ` (aliased from ${seen.at(-1)})` : ""}`);
    const a = aliasOf(v);
    if (a) return resolve(a, [...seen, name]);
    const primitive = byHex.get(v.toLowerCase());
    if (!primitive) errors.push(`${theme.name} ${name}: ${v} has no primitive in tokens/primitives.json`);
    return { hex: v.toLowerCase(), primitive };
  };
  return Object.fromEntries(Object.keys(raw).map((n) => [n, resolve(n)]));
};
