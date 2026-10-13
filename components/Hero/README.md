# Hero

The page opener: a mono stamp, a `display-xl` serif headline, a lead, actions and an optional stats strip, framed by ┌ ┘ corner marks.

- Markup: `<section class="np-hero">` with `np-hero__eyebrow`, `h1.np-hero__title`, `p.np-hero__lead`, an `np-row` of buttons, and optional `dl.np-hero__stats`.
- Consumer provides: a stamp (`NEPTUNE / 0.1 · LDN · TOPIC`), a headline under 10 words, a one-sentence lead, one primary and one secondary action.
- Put one word of the headline in `<em>` to set it in italic `neptune`. Once only.
- Stats must be real and countable. No stats beats fake stats.
- One hero per page. Below 640px the headline drops to `display` size.
