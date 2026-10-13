# Callout

A boxed aside with a bracketed mono label: note, tip or warning.

- Markup: `<aside class="np-callout" role="note">` holding `div.np-callout__label` (`[ Note ]`) and `div.np-callout__body` with paragraphs, lists or code. Add `np-callout--tip` or `np-callout--warn`.
- Note: neutral, for context. Tip: `neptune`, for a shortcut or a better way. Warning: `alert`, for something that breaks or costs money.
- Write the label as a word in brackets. The colour never carries the meaning alone.
- Consumer provides: the kind, and one to three sentences. A callout longer than a paragraph is a section.
- Inside Prose it takes `space-8` above and below.
- Don't: stack two callouts, put a callout in a card, or add a coloured left edge.

## Anatomy

```text
┌ aside.np-callout ─────────────────────────────────┐
│ __label         [ Tip ], mono, coloured by kind   │
├───────────────────────────────────────────────────┤
│ __body          1–3 sentences, lists or code      │
└───────────────────────────────────────────────────┘
```

## Keyboard

- Not interactive. Links inside it are ordinary tab stops.
