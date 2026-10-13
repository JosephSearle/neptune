#!/usr/bin/env node
// Checks what `npm i github:JosephSearle/neptune#vX.Y.Z` installs: runs `npm pack --dry-run`
// and fails if a file sites need is missing, or if anything outside package.json's `files`
// whitelist (tests, scripts, workflows, node_modules, screenshots) would ship.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

// Files every install must contain.
const required = [
  "package.json",
  "README.md",
  "CHANGELOG.md",
  "llms.txt",
  "llms-full.txt",
  "tokens.css",
  "tokens/primitives.json",
  "tokens/dtcg/primitives.tokens.json",
  "tokens/dtcg/base.tokens.json",
  "tokens/dtcg/paper.tokens.json",
  "tokens/dtcg/deep.tokens.json",
  "components/bundle.css",
  "brand/favicon.svg",
  "brand/neptune-mark.svg",
  "brand/og-default.png",
];
// Required once it exists in the repo. components/neptune.js is being added separately;
// npm skips a missing `files` entry, so until then it is neither required nor an error.
const optional = ["components/neptune.js"];
for (const f of optional) if (existsSync(new URL(`../${f}`, import.meta.url))) required.push(f);

// Anything else must sit under one of these.
const allowed = (p) =>
  p === "package.json" ||
  pkg.files.some((f) => (f.endsWith("/") ? p.startsWith(f) : p === f));
const forbidden = /^(tests|scripts|\.github|node_modules|test-results|playwright-report)\/|__screenshots__|(^|\/)preview\.html$/;

const fail = (errors) => {
  console.error(`npm pack check failed:\n${errors.map((e) => `  ${e}`).join("\n")}\nFix package.json, or update scripts/check-pack.mjs if the change is intended.`);
  process.exit(1);
};

// A git install runs these on the consumer's machine. Neptune needs no build step.
const lifecycle = ["preinstall", "install", "postinstall", "prepare", "prepack", "postpack"]
  .filter((s) => pkg.scripts?.[s])
  .map((s) => `lifecycle script "${s}" would run on git installs: remove it`);
if (lifecycle.length) fail(lifecycle);

const out = execFileSync("npm", ["pack", "--dry-run", "--json"], { cwd: root, encoding: "utf8" });
const shipped = JSON.parse(out)[0].files.map((f) => f.path);

const errors = [
  ...required.filter((f) => !shipped.includes(f)).map((f) => `missing: ${f}`),
  ...shipped.filter((f) => !allowed(f) || forbidden.test(f)).map((f) => `not whitelisted: ${f}`),
];
if (errors.length) fail(errors);
console.log(`✓ npm pack ships ${shipped.length} files, all whitelisted.`);
