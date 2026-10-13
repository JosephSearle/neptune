# Pager

Previous and next links at the foot of a docs page.

- Markup: `<nav class="np-pager" aria-label="Pages">` with up to two `a.np-pager__link`, the second with `np-pager__link--next`. Each holds `span.np-pager__dir` (`← Previous`, `Next →`) and `span.np-pager__title`.
- First page: next only; it stays in the right column. Last page: previous only.
- Below 640px the links stack, previous first.
- Consumer provides: the neighbouring pages in Sidebar order, with their real titles.
- Don't: number pages, or use it for anything but reading order.

## Anatomy

```text
┌ nav.np-pager ────────────────────────────────┐
│ __link          __dir ← Previous · __title   │
│ __link--next    __dir Next → · __title       │
└──────────────────────────────────────────────┘
```

## Keyboard

- Two tab stops, previous then next. Each link's text names the page it goes to.
