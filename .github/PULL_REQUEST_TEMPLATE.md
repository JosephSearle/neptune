<!--
Title: a Conventional Commit, e.g. "fix: give the Dialog close button a focus ring in Deep".
Delete these comments as you fill each section in.
-->

## Summary

<!-- One line, imperative: "Give the Dialog close button a focus ring in Deep", not "This PR fixes…". -->

## Why

<!-- What was wrong or missing, who it affects, and what happens if this isn't merged. The diff shows what changed; this is the part that can't be recovered later. -->

## Issue

<!--
"Closes #123" closes the issue when this merges to main.
Small changes (typos, links, wording) can say "None: small change".
-->

## Kind

- [ ] `fix`: something didn't work as documented
- [ ] `feat`: a new token, variant, state or component
- [ ] `docs`: the guide, a component README or `llms.txt`
- [ ] `test` or `ci`: tooling only

## Visual change

<!-- Tick one. For a visual change, add before and after screenshots for every theme it touches. -->

- [ ] No visual change: the `visual` workflow should pass.
- [ ] Visual change in: <!-- Paper, Deep, forced colours, print --> The `visual` workflow will fail on these previews only: <!-- e.g. Dialog-dark -->

## Alternatives considered

<!-- Optional for fixes. For a feat, what you tried with existing components or tokens, and why it fell short. -->

## Checks

- [ ] `npm run check` passes.
- [ ] Generated files are updated: `npm run tokens` after a token change, `npm run llms` after a README change.
- [ ] Anything interactive works by keyboard and keeps its focus ring; any new text pair meets 4.5:1 in both themes.
- [ ] `package.json`'s version is unchanged.
