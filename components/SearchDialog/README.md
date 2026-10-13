# SearchDialog

The ⌘K search: a native modal dialog with a prompt input, grouped results and key hints.

- Markup: `<dialog class="np-search" aria-label="Search">` holding `form.np-search__box` (an `np-input` with `type="search"` and an `Esc` Kbd), `div.np-search__results` and `div.np-search__foot` with key hints.
- Results are a listbox, with the input as its combobox. The input takes `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded`, `aria-controls` pointing at the results' `id`, and `aria-activedescendant` naming the selected result. `div.np-search__results` takes `role="listbox"` and an `aria-label`. Per group: `div[role="group"]` labelled by its `p.np-search__group`, holding `ul.np-search__list[role="none"]` of `li[role="none"]` > `a.np-search__item[role="option"]`, each with an `id`, `tabindex="-1"` and `aria-selected`.
- Open with `showModal()` from the Nav search button and from ⌘K / Ctrl+K. The browser handles Esc, the focus trap and the backdrop.
- Keyboard: focus stays in the input. Up and Down move `aria-selected` and `aria-activedescendant` through results; Enter opens the selected one. The preview has the script to copy.
- Each result: the title, with the matched words in `<mark>`, and its section in `np-meta` on the right.
- No results: put an EmptyState in the results area.
- Results read from a prebuilt index; nothing loads until the dialog opens.

## Anatomy

```text
┌ dialog.np-search ──────────────────────────────┐
│ __box           np-input type=search · Esc     │
├────────────────────────────────────────────────┤
│ __results       __group + ul of __item         │
│                 title with <mark> · np-meta    │
├────────────────────────────────────────────────┤
│ __foot          ↑↓ move · ↵ open · esc close   │
└────────────────────────────────────────────────┘
```
