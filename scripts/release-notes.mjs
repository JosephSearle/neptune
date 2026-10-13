#!/usr/bin/env node
// Prints a version's section from CHANGELOG.md, e.g. `node scripts/release-notes.mjs 1.1.0`.
// The release workflow uses it as the GitHub release notes.
import { readFileSync } from "node:fs";

const version = process.argv[2];
const lines = readFileSync(new URL("../CHANGELOG.md", import.meta.url), "utf8").split("\n");
const start = lines.findIndex((l) => l.startsWith(`## [${version}]`));
if (start < 0) {
  console.error(`No CHANGELOG.md section for ${version}. Add "## [${version}] - YYYY-MM-DD" before bumping package.json.`);
  process.exit(1);
}
const out = [];
for (const l of lines.slice(start + 1)) {
  if (l.startsWith("## ") || /^\[[^\]]+\]: /.test(l)) break;
  out.push(l.replace(/^### /, "## "));
}
console.log(out.join("\n").trim() + "\n\nThe guide is README.md; agents start at llms.txt.");
