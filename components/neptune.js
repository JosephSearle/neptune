/*
 * neptune.js: behaviour for Neptune's interactive components.
 *
 * Plain ES2017, no dependencies, no build step. Load it once, after bundle.css:
 *   <script src="components/neptune.js" defer></script>
 * It also works as type="module". It wires itself up from the documented markup
 * and attributes; CSS-only components need none of it. Loading it twice is safe.
 *
 * Wires up: Tabs, Tooltip (Esc), Toast (Dismiss, Neptune.toast), SearchDialog
 * (⌘K / Ctrl+K, Nav search button, arrow keys), Dialog (data-np-open,
 * data-np-confirm), ThemeToggle and CodeCopy. Nothing here animates.
 *
 * API: window.Neptune.init(root) and window.Neptune.toast(options). See README "Behaviour".
 */
(function () {
  "use strict";

  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (window.Neptune && window.Neptune.init) return;

  var THEME_KEY = "np-theme";
  var TOAST_MS = 6000;
  var TOAST_MAX = 3;
  var COPIED_MS = 1500;

  var all = function (root, sel) {
    var list = Array.prototype.slice.call(root.querySelectorAll(sel));
    if (root.matches && root.matches(sel)) list.unshift(root);
    return list;
  };
  var once = function (el, name) {
    var key = "data-np-ready";
    var have = (el.getAttribute(key) || "").split(" ").filter(Boolean);
    if (have.indexOf(name) !== -1) return false;
    have.push(name);
    el.setAttribute(key, have.join(" "));
    return true;
  };

  /* Tabs: click selects; Left and Right wrap; Home and End go to the first and last.
     Only the selected tab is in the tab order. */
  var tabsOf = function (root) {
    return Array.prototype.slice.call(root.querySelectorAll('[role="tab"]')).filter(function (t) {
      return t.closest(".np-tabs") === root;
    });
  };
  var selectTab = function (tab) {
    var root = tab.closest(".np-tabs");
    tabsOf(root).forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute("aria-controls"));
      if (panel) panel.hidden = !on;
    });
    tab.focus();
  };
  var tabKeys = function (e) {
    var tab = e.target.closest && e.target.closest('.np-tabs [role="tab"]');
    if (!tab) return;
    var tabs = tabsOf(tab.closest(".np-tabs")), i = tabs.indexOf(tab), n = tabs.length;
    var to = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    selectTab(tabs[to]);
  };
  var initTabs = function (root) {
    all(root, ".np-tabs").forEach(function (el) {
      if (!once(el, "tabs")) return;
      tabsOf(el).forEach(function (t) {
        if (t.getAttribute("aria-selected") !== "true" && !t.hasAttribute("tabindex")) t.tabIndex = -1;
      });
    });
  };

  /* Tooltip: CSS shows it (300ms on hover, at once on focus; hovering the bubble keeps it).
     Esc hides it without moving focus (WCAG 1.4.13); leaving the trigger resets that. */
  var tipEscape = function (e) {
    if (e.key !== "Escape") return;
    all(document, ".np-tip:hover, .np-tip:focus-within, .np-tip[data-open]").forEach(function (t) {
      t.setAttribute("data-dismissed", "");
    });
  };
  var tipReset = function (e) {
    var tip = e.target.closest && e.target.closest(".np-tip");
    if (!tip) return;
    if (e.type === "mouseout" && tip.contains(e.relatedTarget)) return;
    tip.removeAttribute("data-dismissed");
  };

  /* Toast: Dismiss removes it. Neptune.toast() adds one; ok and neutral leave after 6s,
     paused while hovered or focused. Alerts and toasts with an action stay. */
  var toast = function (options) {
    var o = options || {};
    var kind = o.kind || "";
    var region = document.querySelector(".np-toasts");
    if (!region) {
      region = document.createElement("section");
      region.className = "np-toasts";
      region.setAttribute("aria-label", "Notifications");
      region.setAttribute("aria-live", "polite");
      document.body.append(region);
    }
    var t = document.createElement("div");
    t.className = "np-toast" + (kind ? " np-toast--" + kind : "");
    if (kind === "alert") t.setAttribute("role", "alert");
    t.innerHTML = '<p class="np-toast__label">' + (kind ? '<span class="np-dot"></span> ' : "") + '</p><p class="np-toast__text"></p>';
    t.querySelector(".np-toast__label").append(o.label || "");
    t.querySelector(".np-toast__text").textContent = o.text || "";
    if (o.action) {
      var row = document.createElement("div"), act = document.createElement("button");
      row.className = "np-toast__actions";
      act.className = "np-toast__action";
      act.type = "button";
      act.textContent = o.action.label;
      act.addEventListener("click", function () {
        if (typeof o.action.onClick === "function") o.action.onClick();
        t.remove();
      });
      row.append(act);
      t.append(row);
    }
    var close = document.createElement("button");
    close.className = "np-toast__close";
    close.type = "button";
    close.textContent = "Dismiss";
    t.append(close);
    region.append(t);
    while (region.children.length > TOAST_MAX) region.firstElementChild.remove();
    if (kind !== "alert" && !o.action) {
      var left = TOAST_MS, start, id, hovered = false, focused = false;
      var run = function () { start = Date.now(); id = setTimeout(function () { t.remove(); }, left); };
      var sync = function () {
        if (hovered || focused) {
          if (id) { clearTimeout(id); id = 0; left -= Date.now() - start; }
        } else if (!id) run();
      };
      t.addEventListener("mouseenter", function () { hovered = true; sync(); });
      t.addEventListener("mouseleave", function () { hovered = false; sync(); });
      t.addEventListener("focusin", function () { focused = true; sync(); });
      t.addEventListener("focusout", function (e) { focused = t.contains(e.relatedTarget); sync(); });
      run();
    }
    return t;
  };

  /* Dialog and SearchDialog: data-np-open="id" opens that dialog with showModal().
     The Nav search button and ⌘K / Ctrl+K open the page's SearchDialog and focus its input. */
  var openDialog = function (dlg) {
    if (!dlg || typeof dlg.showModal !== "function") return;
    if (dlg.open) dlg.close();
    dlg.showModal();
    if (dlg.classList.contains("np-search")) {
      var input = dlg.querySelector("input");
      if (input) input.focus();
    }
  };
  var searchKeys = function (e) {
    var dlg = e.target.closest && e.target.closest(".np-search");
    if (!dlg) return;
    var list = Array.prototype.slice.call(dlg.querySelectorAll(".np-search__item"));
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!list.length) return;
      var i = list.findIndex(function (a) { return a.getAttribute("aria-selected") === "true"; });
      var n = (i + (e.key === "ArrowDown" ? 1 : -1) + list.length) % list.length;
      list.forEach(function (a, k) { a.setAttribute("aria-selected", String(k === n)); });
      // Focus stays in the combobox input; aria-activedescendant tells screen readers which option is selected.
      var box = dlg.querySelector('[role="combobox"]');
      if (box && list[n].id) box.setAttribute("aria-activedescendant", list[n].id);
      list[n].scrollIntoView({ block: "nearest" });
    }
    if (e.key === "Enter") {
      e.preventDefault();
      var s = dlg.querySelector('.np-search__item[aria-selected="true"]');
      if (s) s.click();
    }
  };
  var shortcut = function (e) {
    if (!(e.metaKey || e.ctrlKey) || !e.key || e.key.toLowerCase() !== "k") return;
    var dlg = document.querySelector("dialog.np-search");
    if (!dlg) return;
    e.preventDefault();
    openDialog(dlg);
  };

  /* Dialog: data-np-confirm="name" on an input keeps the form's np-btn--danger disabled
     until the typed text matches. */
  var confirmState = function (input) {
    var form = input.closest("form") || input.closest("dialog");
    var go = form && form.querySelector(".np-btn--danger");
    if (go) go.disabled = input.value.trim() !== input.getAttribute("data-np-confirm");
  };
  var initConfirm = function (root) {
    all(root, "input[data-np-confirm]").forEach(function (el) {
      if (once(el, "confirm")) confirmState(el);
    });
  };

  /* ThemeToggle: a click sets data-theme on <html>, saves it and marks the pressed side.
     On load, the side the page is showing (saved choice or system) is pressed. */
  var dark = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  var showing = function () {
    return document.documentElement.getAttribute("data-theme") || (dark && dark.matches ? "dark" : "light");
  };
  var markTheme = function () {
    var now = showing();
    all(document, ".np-theme button[data-set]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-set") === now));
    });
  };
  var applySaved = function () {
    if (document.documentElement.hasAttribute("data-theme")) return;
    try {
      var t = localStorage.getItem(THEME_KEY);
      if (t) document.documentElement.setAttribute("data-theme", t);
    } catch (e) { /* storage blocked */ }
  };

  /* CodeCopy: copies the block without its "$ " prompts; the button reads "Copied" for 1.5s. */
  var copy = function (b) {
    var code = b.closest(".np-code").querySelector("code");
    var text = code ? code.innerText.replace(/^\$ /gm, "") : "";
    var done = function () {
      b.textContent = "Copied";
      b.setAttribute("data-copied", "");
      setTimeout(function () { b.textContent = "Copy"; b.removeAttribute("data-copied"); }, COPIED_MS);
    };
    try { navigator.clipboard.writeText(text).then(done, done); } catch (e) { done(); }
  };

  var onClick = function (e) {
    var t = e.target;
    if (!t.closest) return;
    var el;
    if ((el = t.closest('.np-tabs [role="tab"]'))) return selectTab(el);
    if ((el = t.closest(".np-toast__close"))) return el.closest(".np-toast").remove();
    if ((el = t.closest(".np-code__copy"))) return copy(el);
    if ((el = t.closest(".np-theme button[data-set]"))) {
      document.documentElement.setAttribute("data-theme", el.getAttribute("data-set"));
      try { localStorage.setItem(THEME_KEY, el.getAttribute("data-set")); } catch (err) { /* storage blocked */ }
      return markTheme();
    }
    if ((el = t.closest("[data-np-open]"))) return openDialog(document.getElementById(el.getAttribute("data-np-open")));
    if ((el = t.closest(".np-nav__search"))) return openDialog(document.querySelector("dialog.np-search"));
  };

  var onKey = function (e) {
    tabKeys(e);
    tipEscape(e);
    searchKeys(e);
    shortcut(e);
  };

  var onInput = function (e) {
    if (e.target.matches && e.target.matches("input[data-np-confirm]")) confirmState(e.target);
  };

  /* Sets the initial state of components under root. Call it again after adding markup. */
  var init = function (root) {
    root = root || document;
    initTabs(root);
    initConfirm(root);
    markTheme();
  };

  document.addEventListener("click", onClick);
  document.addEventListener("keydown", onKey);
  document.addEventListener("input", onInput);
  document.addEventListener("mouseout", tipReset);
  document.addEventListener("focusout", tipReset);
  if (dark) {
    if (dark.addEventListener) dark.addEventListener("change", markTheme);
    else if (dark.addListener) dark.addListener(markTheme);
  }

  window.Neptune = { init: init, toast: toast };

  applySaved();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { init(); });
  else init();
})();
