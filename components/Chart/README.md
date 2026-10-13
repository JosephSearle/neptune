# Chart

The frame around a data plot: mono eyebrow, serif title, legend, an SVG plot with a hover readout, a source line, and the numbers as a table.

- Markup: `<figure class="np-chart">` holding `p.np-chart__eyebrow`, `h3.np-chart__title`, `ul.np-chart__legend` of `li.np-chart__key` (each sets `--key: var(--viz-N)`), `div.np-chart__plot` with the `<svg>` and a `div.np-chart__tip` (`hidden` until hover), `figcaption.np-chart__caption` (`Source: evals, 2026-10-07`), then `details.np-chart__data` with a Table.
- Draw the plot yourself (inline SVG, D3, Observable Plot); this component styles the frame and the SVG classes: `.grid`, `.axis`, `.tick text`, `.label`, `.direct`, `.hover-line`.

## Colour, by the job it does

- Identity (which series): `viz-1` to `viz-6`, assigned in order and never cycled. Colour follows the entity: a filter that drops a series doesn't repaint the rest. A seventh series folds into Other (`viz-other`).
- Scatter, bubble, maps and small multiples: at most three series (`viz-1` to `viz-3`), the only three that stay apart when any two can touch.
- Magnitude: `viz-seq-1` (least) to `viz-seq-7`, one hue. Deep flips the ramp so low values recede into the ground; use the tokens and it happens for you. For ordered buckets (tiers, funnel steps), start at `viz-seq-4` on Paper so every step clears 2:1.
- Polarity: `viz-div-neg-3…1`, `viz-div-mid`, `viz-div-pos-1…3`: gold below zero, blue above, neutral at zero. The weakest steps sit near the ground on purpose; label values.
- State: when a series means good or bad, it wears `ok` or `alert` with a word, never a `viz-` slot.
- Measured 2026-10-13 on `paper` and Deep `paper`: every series at least 3:1, adjacent series at least 16.5 apart under protan/deutan simulation (target 8) and 21 apart for full-colour vision (floor 15); the first three at least 11.6 apart as any pair.

## Marks

- Lines 2px, square caps. Bars square, with a 2px `paper` gap between neighbours and stacked segments. Points at least 8px.
- Text wears ink tokens, never the series colour. Direct-label up to four series at the line end (`.direct`); always show the legend for two or more. One series: no legend, the title names it.
- One y-axis. Two measures on different scales are two charts.
- Gridlines in `viz-grid`, baseline in `viz-axis`. No chart junk: no 3D, no gradients, no shadows.

## Interaction and access

- Hover or focus shows the readout in `np-chart__tip`: a crosshair on line charts, per-mark on bars. Hit areas larger than the mark.
- Keyboard: the plot takes focus (`tabindex="0"`); Left and Right step through x values and update the readout, Esc hides it.
- The `details` table holds every number in the chart. A chart without it fails for screen readers, print and forced colours.
- Give the `<svg>` `role="img"` and an `aria-label` that states the takeaway, not "a chart".

- Don't: use a pie with more than three slices, label every point, or use colour as the only key.

## Anatomy

```text
┌ figure.np-chart ──────────────────────────────────┐
│ __eyebrow       Fig. 03 · Evals                   │
│ __title         serif, the takeaway               │
│ __legend        ■ series  ■ series  ■ series      │
├───────────────────────────────────────────────────┤
│ __plot          svg role=img + __tip readout      │
├───────────────────────────────────────────────────┤
│ __caption       Source: …, date                   │
│ __data          details › Table of every number   │
└───────────────────────────────────────────────────┘
```
