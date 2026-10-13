# Logo

The mark is Neptune's trident (♆, the planet's astronomical sign) drawn on a 24-unit grid with 2-unit square strokes, in a `neptune` square. The lockup sets it beside the "Neptune" wordmark in Newsreader 500, outlined.

- Files in `brand/`: `neptune-mark.svg` and `neptune-mark-deep.svg` (the tile), `neptune-mark-ink.svg` (single ink, no tile), `neptune-lockup.svg` and `neptune-lockup-deep.svg`, the favicon set (`favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`) and the social card (`og-template.html`, `og-default.png`). `scripts/build-brand.py` makes them all from `tokens.json`; don't edit them by hand.
- Paper pages use the Paper files, Deep pages the Deep ones. `favicon.svg` switches with the system theme by itself.
- Single ink (`neptune-mark-ink.svg`, in `ink`) is for print, embossing, one-colour merch, and anywhere the blue tile would be the only colour on a page that already spends its `neptune`.
- Clear space: half the tile on every side. Nothing else enters it, including other marks and the page edge.
- Minimum size: 16px for the mark, 24px tile height for the lockup. Below that, set the wordmark in type.
- In the Nav, the mark (20px) may sit before the wordmark; the text wordmark stays, so the name is still text.

## Head tags

```html
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:image" content="https://…/og-default.png">
```

## Social card

`brand/og-template.html` is a 1200×630 card: stamp, serif title, kind and date, the trident on a `neptune` slab. Open it with `?kind=Playbook&title=MCP%20servers%20in%20production&date=2026-10-08` and screenshot it at 1200×630 for each page; `og-default.png` is the fallback.

- Don't: recolour the mark (other than single ink), round the tile, add a shadow or gradient, rotate it, outline it, set the wordmark in another face, or stretch either.
