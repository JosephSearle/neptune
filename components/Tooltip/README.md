# Tooltip

A short mono hint on hover or keyboard focus, dark like the terminal.

- Markup: `span.np-tip` wrapping the trigger and `span.np-tip__bubble` with `role="tooltip"` and an `id`. The trigger gets `aria-describedby` pointing at that `id`. Add `np-tip--below` when there's no room above.
- Shows after 300ms on hover, at once on focus. Hovering the bubble keeps it open.
- Esc hides it without moving focus (WCAG 1.4.13). The preview has the three-line script.
- Consumer provides: one short sentence or a shortcut, under 80 characters: "Uses the last saved judge. About 4 min." or `⌘K`.
- Supplementary only. Touch screens have no hover, so nothing a reader needs may live only in a tooltip.
- Don't: put links or buttons inside, add one to a disabled control (it can't take focus; say why in a hint instead), or repeat the trigger's own label.
