# Card

A square, hairline-bordered panel with a mono index bar, serif title and a metadata footer.

- Markup: `<a class="np-card">` (linked, lifts on hover) or `<div class="np-card">` (static). Parts: `np-card__bar`, `np-card__body`, `np-card__title`, `np-card__text`, `np-card__foot`.
- Consumer provides: index and category (`01 / Playbook`), title, one-sentence summary, ISO date, and a read time or action in the footer.
- Lay cards in a grid with `space-8` gaps. Indexes count up across the grid.
- Optional: one tag or a bracketed status (`[ Draft ]`) on the right of the bar.
- Optional image: `img.np-card__media` (with `alt`) between the bar and the body. 16:9 by default; add `np-ratio-square`, `np-ratio-portrait` or `np-ratio-wide` to change it. No image yet: `div.np-card__media.np-slot` with a `<span>` label (`[ IMAGE · 16:9 ]`).
- In a grid, give every card an image or none. Mixed rows break the baseline.
- Don't: add images inside the bar, colour the border, round the corners, add a coloured left edge.

## Anatomy

```text
┌ a.np-card ────────────────────────────────────────┐
│ __bar           01 / Playbook        [ tag ]      │
├───────────────────────────────────────────────────┤
│ __media         optional image or np-slot, 16:9   │
├───────────────────────────────────────────────────┤
│ __body          __title, then __text              │
├───────────────────────────────────────────────────┤
│ __foot          2026-10-08          8 min →       │
└───────────────────────────────────────────────────┘
```

## Keyboard

- A linked card is one tab stop: the whole card is the `<a>`. Don't nest other links or buttons inside it.
