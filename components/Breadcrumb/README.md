# Breadcrumb

The path from the docs root to the current page, in mono with › separators.

- Markup: `<nav class="np-crumbs" aria-label="Breadcrumb">` holding an `ol` of `li`. Every item but the last is a link; the last is a `span` with `aria-current="page"`.
- Sits above the page title, `space-4` above it.
- Consumer provides: the section names as they appear in the Sidebar, and the page title (shortened to a few words if long).
- Two to four levels. Skip it on top-level pages.
- Don't: link the current page, or use it as the only navigation.
