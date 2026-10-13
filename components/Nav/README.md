# Nav

The top bar: serif wordmark with a mono version stamp, uppercase mono links and a ⌘K search.

- Markup: `<nav class="np-nav">` with `np-nav__brand` (`np-nav__mark` + `np-meta`), `ul.np-nav__links`, and `div.np-nav__actions` holding `button.np-nav__search` (label in `span.np-search-text`), an optional ThemeToggle, and `details.np-nav__menu`.
- Consumer provides: 3–5 links, the current page marked `aria-current="page"`, and a version stamp. Repeat the links inside `details.np-nav__menu > ul`.
- The active link turns `neptune`. Nothing else in the bar is blue.
- Below 720px the CSS hides `np-nav__links` and the search label, and shows the "Menu" disclosure. No JavaScript needed; `<details>` handles open, close and keyboard.
