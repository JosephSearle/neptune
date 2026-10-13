# SearchDialog

The ⌘K search: a native modal dialog with a prompt input, grouped results and key hints.

- Markup: `<dialog class="np-search" aria-label="Search">` holding `form.np-search__box` (an `np-input` with `type="search"` and an `Esc` Kbd), `div.np-search__results` (per group: `p.np-search__group` and `ul.np-search__list` of `a.np-search__item`), and `div.np-search__foot` with key hints.
- Open with `showModal()` from the Nav search button and from ⌘K / Ctrl+K. The browser handles Esc, the focus trap and the backdrop.
- Keyboard: Up and Down move `aria-selected` through results, Enter opens the selected one. The preview has the script to copy.
- Each result: the title, with the matched words in `<mark>`, and its section in `np-meta` on the right.
- No results: put an EmptyState in the results area.
- Results read from a prebuilt index; nothing loads until the dialog opens.
