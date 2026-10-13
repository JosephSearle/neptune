# Feed

A dated list of entries, one row each: ISO date, serif title, tag.

- Markup: `ol.np-feed` holding `li.np-feed__item`, each with `a.np-feed__link` containing `time.np-feed__date` (with `datetime`), `span.np-feed__title` and one `np-tag`.
- Newest first. Dates in ISO (`2026-10-08`). One tag per row, from a short fixed set (`Playbook`, `Research`, `Notes`).
- The whole row is the link; the title turns `neptune` and underlines on hover.
- Below 640px the date and tag share the first line and the title takes the second.
- Consumer provides: date, title in sentence case, tag, and the link.
- Open it with a SectionHead. Close long feeds with a ghost button (`All notes →`), not pagination.
- Don't: add summaries or thumbnails to rows. Use Card for that.

## Anatomy

```text
┌ ol.np-feed › li.np-feed__item › a.np-feed__link ────┐
│ __date          time, ISO                           │
│ __title         serif, sentence case                │
│ np-tag          one, from a fixed set               │
└─────────────────────────────────────────────────────┘
```

## Keyboard

- One tab stop per row: the whole row is the link.
