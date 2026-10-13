#!/usr/bin/env node
// Prints the changelog entry for a version from README.md, e.g. `node scripts/release-notes.mjs 1.1.0`.
import { readFileSync } from "node:fs";

const version = process.argv[2];
const short = version.replace(/\.0$/, ""); // the changelog says "1.1", the tag says "v1.1.0"
const lines = readFileSync(new URL("../README.md", import.meta.url), "utf8").split("\n");
const start = lines.findIndex((l) => l.startsWith(`- ${short} · `) || l.startsWith(`- ${version} · `));
if (start < 0) {
  console.error(`No changelog entry for ${version}`);
  process.exit(1);
}
const out = [lines[start].replace(/^- /, "")];
for (const l of lines.slice(start + 1)) {
  if (/^- \d/.test(l) || l.startsWith("#") || l.trim() === "") break;
  out.push(l.replace(/^ {2}/, ""));
}
console.log(out.join("\n") + "\n\nThe guide is README.md; agents start at llms.txt.");
