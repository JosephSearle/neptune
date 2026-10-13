# SkipLink

A "Skip to content" link, hidden until a keyboard user tabs to it, so they can jump past the Nav and Sidebar.

- Markup: `<a class="np-skip" href="#main">Skip to content</a>` as the first child of `<body>`. The target is `<main id="main" tabindex="-1">`, wrapping the page content after the Nav.
- On focus it appears top left as a `neptune` block with `on-neptune` mono text.
- Every page gets one, including pages without a Sidebar: the Nav alone is several tab stops.
- `tabindex="-1"` lets the browser move focus into `main`; Neptune hides the outline there because nothing visible is focused.

## Visually hidden

`np-visually-hidden` keeps text in the accessibility tree but off the screen: a label for an icon-only control, a "(opens in a new tab)" note, a table caption that sighted readers get from context. It shows again if the element takes focus.
