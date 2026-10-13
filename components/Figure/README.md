# Figure

A framed image with ┌ ┘ corner marks and a numbered `FIG.` caption.

- Markup: `<figure class="np-figure">` holding `div.np-figure__frame` with `img.np-figure__media` inside, then `figcaption.np-figure__caption` with `span.np-figure__num` (`Fig. 01`) and the caption text.
- No image yet: put `div.np-figure__media.np-slot` with a `<span>` label (`[ Image · 16:9 ]`) in the frame instead of the `img`.
- Ratio: 16:9 by default. Add `np-ratio-square`, `np-ratio-portrait` or `np-ratio-wide` to the `figure`.
- Consumer provides: the image with real `alt` text, a figure number counting up through the page, and a one-line caption in sentence case.
- Images follow the brand's imagery rules: dithered or halftone classical subjects, diagrams in hairlines. No stock photos.
- Don't: round the frame, add a shadow, set the caption in italic, or drop the number.

## Anatomy

```text
┌ figure.np-figure ──────────────────────────┐
│ __frame         ┌ corner marks ┘           │
│   __media       img, or np-slot            │
├────────────────────────────────────────────┤
│ __caption       __num Fig. 01 · one line   │
└────────────────────────────────────────────┘
```
