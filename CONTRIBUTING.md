# Contributing to Neptune

Neptune is Joseph Searle's personal brand and design system, kept by one maintainer. Bug reports and fixes are welcome, and so is work that isn't code: a contrast or screen-reader problem you found, a confusing line in a component README, a preview that breaks at 390px.

The direction of the brand isn't open to proposals. New colours, faces or a different look will be closed, however good they are. Fixes, accessibility work and better docs will be read and answered.

This guide covers how to get a change accepted. For how to use Neptune, read the [README](README.md).

## Ground rules

- Be kind and specific. There's no code of conduct file yet; until there is, treat everyone the way you'd want a reviewer to treat you.
- Open an issue before a pull request, except for the small changes listed under [Small changes](#small-changes).
- A pull request passes `npm run check`, the visual workflow and the a11y workflow, or says why it doesn't.
- Write in the guide's voice: direct, terse, sentence case, no emoji. See [Voice](README.md#voice).

## Questions

There are no Discussions or chat. Read the [README](README.md) first, then use the [Question form](https://github.com/JosephSearle/neptune/issues/new?template=question.yml).

Every issue starts from a form; blank issues are turned off. A mistake or gap in the docs has its own [Docs problem form](https://github.com/JosephSearle/neptune/issues/new?template=docs_problem.yml).

## Reporting a security problem

Don't open a public issue. Report it privately from the repository's **Security** tab, using **Report a vulnerability**. Neptune ships CSS and static files only, so the likely problems are in the workflows (`.github/workflows/`) and the build scripts.

## Reporting a bug

Search the [open issues](https://github.com/JosephSearle/neptune/issues) first. If it's new, use the [Bug report form](https://github.com/JosephSearle/neptune/issues/new?template=bug_report.yml). It asks for:

- **Component and version:** for example, `Dialog`, Neptune 1.1.0.
- **Theme:** Paper, Deep or system, and forced colours or print if they're involved.
- **Steps:** the smallest markup that shows it. A cut-down `preview.html` is ideal.
- **Expected and actual:** what should happen and what does.
- **Environment:** browser and version, OS, viewport width.
- **Evidence:** a screenshot or the contrast ratio you measured.
- **Possible cause:** optional, and kept apart from what you saw.

## Suggesting a change

Neptune stays an engineer's notebook printed on paper: two faces, one blue, square corners, hairlines, no icons. A proposal that fits gets a hearing. Use the [Suggest a change form](https://github.com/JosephSearle/neptune/issues/new?template=suggest_change.yml). It asks for:

- **The problem:** what you couldn't build, or built badly, with today's components.
- **An example:** the page or markup where it came up.
- **The smallest change:** a new variant or state before a new component, an existing token before a new one.
- **Alternatives:** what you tried with existing components, and why it falls short.

New tokens and components are minor releases and renames are major ones (see [Versions](README.md#versions)), so the bar rises in that order.

## Small changes

Typos, broken links and wording fixes in a README can go straight to a pull request. So can a fix of a few lines to a component that doesn't change how it looks. Anything that changes a token, a class, a preview or a screenshot needs an issue first.

## Development setup

You need Node.js 22. Fork the repository, then:

```bash
git clone https://github.com/<your-username>/neptune.git
cd neptune
npm ci
git switch -c fix-dialog-focus
npm run check
```

`npm run check` should finish with no errors before you change anything.

### Making a change

Each kind of change has generated files that must move with it. CI fails if they don't.

| You changed | Then |
| --- | --- |
| A token | Edit `tokens.json`, `tokens/primitives.json` and `tokens.css` together, then run `npm run tokens` |
| A component README or the guide | Run `npm run llms` |
| Component CSS | Use tokens only: `npm run lint` rejects raw colours and raw `z-index` |
| The logo colours or geometry | Rebuild `brand/` (below) |
| Anything visible | Expect the visual workflow to fail, and say so in the pull request |
| A file sites need, added or moved | Update `files` and `exports` in `package.json` and the required list in `scripts/check-pack.mjs` |

A new component lives in `components/<Name>/` with a `README.md` and a `preview.html`. The preview's first line is a `@dsCard` comment naming its group (`Layout`, `Navigation`, `Content`, `Actions`, `Forms` or `Status`). Copy that line from a neighbour. Its CSS goes in `components/bundle.css`.

To rebuild the brand files, install the Python dependencies once, then run the script with the Newsreader font from `node_modules`:

```bash
pip install fonttools brotli pillow
python3 scripts/build-brand.py \
  node_modules/@fontsource/newsreader/files/newsreader-latin-500-normal.woff2
```

### Visual regression

The baselines in `tests/__screenshots__` were made in the Playwright container CI uses. Screenshots from your own machine will differ by a few pixels of font rendering, so compare inside that container:

```bash
docker run --rm -v "$PWD":/work -w /work \
  mcr.microsoft.com/playwright:v1.64.0-noble \
  sh -c "npm ci && npx playwright test"
```

This reinstalls `node_modules` for Linux; run `npm ci` again afterwards if you're on macOS or Windows. Don't commit new baselines yourself. After an intended visual change is merged, the maintainer rewrites them with the **visual** workflow.

## Pull requests

The pull request form asks for each of these; fill it in rather than deleting it.

1. Keep each pull request to one change, and link its issue (`Fixes #12`).
2. Write the title as a [Conventional Commit](https://www.conventionalcommits.org/): `fix:`, `feat:`, `docs:`, `test:` or `ci:`, as in the history (`feat: add Dialog, Toast, Tooltip and the danger button`).
3. Say what changed visually and in which themes, with before and after screenshots for anything visible.
4. The `ci`, `visual` and `a11y` workflows run on every pull request. `ci` and `a11y` must pass. `visual` may fail only for the change you described.

Expect a first reply within a week. The maintainer merges to `main`, records the change in [CHANGELOG.md](CHANGELOG.md), and cuts releases. Don't bump `package.json`'s version yourself, because a new version there publishes a release: the workflow tags `vX.Y.Z`, and sites install that tag. Don't add an install or `prepare` script either; a git install would run it on every site.
