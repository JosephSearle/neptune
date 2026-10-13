# Sidebar

Grouped navigation for a docs site, inside a disclosure that ships open.

- Markup: `<details class="np-sidebar" open>` with a `summary` (`Contents`), then one `div.np-sidebar__group` per section: `p.np-sidebar__heading` (`01 · MCP`) and a `ul` of links. The open page's link gets `aria-current="page"`.
- Group headings are indexed in order. Page links are sentence case, as their titles.
- Lives in `np-docs__side`, sticky. Below `bp-md` it stacks above the page; a reader closes it with one tap.
- Consumer provides: sections in reading order, pages in each, and the current page.
- Keep groups to about eight pages. More: split the group.
- Don't: nest beyond one level, or add icons.

## Anatomy

```text
┌ details.np-sidebar[open] ───────────────────────┐
│ summary         Contents                        │
├─────────────────────────────────────────────────┤
│ __group         __heading 01 · MCP              │
│                 ul of links, one aria-current   │
├─────────────────────────────────────────────────┤
│ __group         …                               │
└─────────────────────────────────────────────────┘
```

## Keyboard

- Tab walks the links in reading order; the `summary` toggles the list with Enter or Space.
