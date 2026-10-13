# Checkbox

Checkboxes and radio buttons: a square (round for radio) that fills with a `neptune` mark when checked.

- Markup: `<label class="np-check"><input type="checkbox"> Label</label>`. Same for `type="radio"`.
- Group related options in `fieldset.np-fieldset` with a `legend` styled `np-field__label`.
- Checkbox for independent options; radio for one of several. Two to six radios; more is a Select.
- Labels are serif, sentence case, and say what happens when checked.
- Disabled: add `disabled` to the input; the label turns `ink-muted`.
- Don't: use a checkbox for an action that applies at once. Use a Switch.
