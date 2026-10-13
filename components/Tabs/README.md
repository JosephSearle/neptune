# Tabs

Mono tabs over panels, for alternatives a reader picks one of: package managers, languages, operating systems.

- Markup: `div.np-tabs` holding `div.np-tabs__list` with `role="tablist"` and an `aria-label`, then one `div.np-tabs__panel` per tab with `role="tabpanel"`. Tabs are `button.np-tabs__tab` with `role="tab"`, `aria-selected`, `aria-controls` and an `id`; panels carry `aria-labelledby` and `hidden` when not shown.
- Behaviour comes from `neptune.js`: click selects, and only the selected tab is in the tab order (`tabindex="-1"` on the rest). Call `Neptune.init(el)` after adding tabs to a live page.
- The selected tab carries a 2px `neptune` underline. That is the view's one blue.
- Consumer provides: two to five short labels and a panel each, usually a CodeCopy.
- Don't: use tabs for content a reader needs to compare. Show it side by side.

## Anatomy

```text
┌ div.np-tabs ────────────────────────────────┐
│ __list          role=tablist: __tab × 2–5   │
├─────────────────────────────────────────────┤
│ __panel         role=tabpanel, one shown    │
└─────────────────────────────────────────────┘
```

## Keyboard

- Tab moves into the tab list onto the selected tab, then out to its panel.
- Left and Right move to the previous or next tab and select it, wrapping at the ends.
- Home and End move to the first and last tab and select it.
