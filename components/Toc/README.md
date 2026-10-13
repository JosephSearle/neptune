# Toc

The "on this page" list: the page's headings, the one in view marked with › in `neptune`.

- Markup: `<nav class="np-toc" aria-label="On this page">` with `p.np-toc__label` and `ol.np-toc__list`. Each `li` holds an `a` to a heading's id; add `np-toc__sub` to the `li` for an `h3`.
- Mark the heading in view with `aria-current="true"` on its link. Set it from an IntersectionObserver; with no script, mark none.
- Two levels: `h2` and `h3`. Deeper headings stay out.
- Lives in `np-docs__toc`, sticky; hidden below `bp-lg`.
- Consumer provides: the headings, in page order, with the same words as the headings.

## Anatomy

```text
┌ nav.np-toc ───────────────────────────────────────┐
│ __label         On this page                      │
│ __list          ol of links; np-toc__sub for h3   │
│                 › marks the heading in view       │
└───────────────────────────────────────────────────┘
```

## Keyboard

- Tab walks the headings; Enter jumps to one and moves focus there (the heading needs an `id`).
