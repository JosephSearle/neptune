# ArticleHeader

The top of a note or playbook: a kind-and-date stamp, the title, a lead, then byline and tags, closed by a hairline.

- Markup: `<header class="np-article-head">` holding `p.np-article-head__stamp` (`Playbook · 2026-10-08 · 8 min`), `h1.np-article-head__title`, `p.np-article-head__lead`, and `div.np-article-head__foot` with `p.np-article-head__byline` and a row of tags.
- In the DocsLayout, a Breadcrumb goes above it.
- Byline: `By <strong>Joseph Searle</strong> · Updated 2026-10-12`. Show "Updated" only when the page changed after publishing.
- Read time is true or absent: compute it from the word count (about 230 words a minute) or leave it out.
- One to three tags, from the same fixed set as the Feed.
- The title wraps at 20 characters wide and drops to `heading` size below `bp-sm`.

## Anatomy

```text
┌ header.np-article-head ─────────────────────────┐
│ __stamp         Playbook · 2026-10-08 · 8 min   │
│ __title         h1, serif display               │
│ __lead          one sentence, ink-muted         │
├─────────────────────────────────────────────────┤
│ __foot          __byline · row of np-tag        │
└─────────────────────────────────────────────────┘
```
