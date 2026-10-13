# Changelog

All notable changes to Neptune are recorded here. The public surface is the token names, the `np-` classes and their documented markup; the [Versions](README.md#versions) section of the README says what counts as major, minor and patch.

The format follows [Keep a Changelog 2.0.0](https://keepachangelog.com/en/2.0.0/), and Neptune uses [Semantic Versioning](https://semver.org/). Releases are tagged `vX.Y.Z`; each release's GitHub notes are copied from its section here.

## [Unreleased]

### Added

- `CONTRIBUTING.md`: how to report a bug or a security problem, set up, and get a pull request merged, including how to run the visual tests in the same container CI uses.
- Issue forms for bug reports, suggested changes, docs problems and questions. Blank issues are off, and security reports are routed to private reporting.
- A pull request template asking why the change is needed, what it changes visually, and for the checks CI runs.
- README: install steps, a working page example and a table of the npm scripts.
- `npm run contrast` (`scripts/check-contrast.mjs`): measures every documented text pair (4.5:1) and `line-strong` and `focus` on each paper surface (3:1) in both themes. `npm run check` and CI run it, so a token nudge that breaks contrast fails the build.

### Changed

- The changelog moved from the README to this file. GitHub release notes now come from here.
- README: restructured to the Standard-Readme order, with a centred title, the social card and status badges. The brand guide's sections and wording are unchanged.

### Fixed

- Tabs: Home and End now move to the first and last tab, and the README documents the keys.

## [1.1.0] - 2026-10-13

39 components.

### Added

- Chart, with a measured data-viz palette: six series colours, a seven-step sequential ramp and a gold–blue diverging pair, checked for colour-blind safety in both themes.
- Dialog, with a destructive pattern and the `np-btn--danger` button.
- Toast and Tooltip.
- SkipLink and the `np-visually-hidden` class.
- Logo: the trident mark, lockups, a single-ink version, the favicon set and a social card.
- Disabled, busy, read-only and invalid states for Button, Input, Select and Textarea, set by attributes. Errors follow `aria-invalid`.
- A primitive colour tier, and the tokens `on-alert`, `scrim`, `term-ok`, `term-alert`, `z-toast`, `z-tooltip` and the `viz-` set.
- Tokens exported as W3C Design Tokens (DTCG 2025.10) for Style Dictionary, Terrazzo, Tokens Studio or Figma variables.
- Forced-colours support for Windows contrast themes.
- `llms.txt` and `llms-full.txt`, so agents can read the guide and every component.
- Anatomy diagrams and keyboard notes for every component that needs them.

### Changed

- Pages follow the system light or dark setting until the reader picks a theme.
- Print is always Paper.

### Fixed

- Card and Figure image slots now centre their label and hatch the empty area.
- Card bars in a row are now the same height.

## [1.0.0] - 2026-10-13

35 components. Released before the repository existed, in the design system artifact only, so it has no tag.

### Added

- Layout, breakpoint, timing and z-index tokens.
- Docs components: DocsLayout, Sidebar, Breadcrumb, ArticleHeader, Toc, Pager, Callout and Tabs.
- Form components: Select, Textarea, Checkbox and Switch.
- SearchDialog, EmptyState, PageGrid, Figure, Split and Feed.
- A type scale for slides.

### Fixed

- One focus ring for every interactive element.
- The hover lift now respects reduced motion.
- Terminals keep a visible edge in Deep.
- Touch targets grow to 44px.
- Text contrast measured: every text pair meets 4.5:1 in both themes.

## [0.1.0] - 2026-10-13

Released in the design system artifact only, so it has no tag.

### Added

- Tokens in two themes, Paper and Deep.
- 15 components.
- The brand book.

[Unreleased]: https://github.com/JosephSearle/neptune/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/JosephSearle/neptune/releases/tag/v1.1.0
