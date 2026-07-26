/* assets/cf-collection-grid.js
 * CHIEKH FERRO — AJAX add-to-cart + dynamic sort for cf-collection-grid section.
 * Vanilla JS, no framework dependency. Safe to load deferred.
 */
(function () {
  'use strict';

  function fetchCartCount() {
    return fetch('/cart.js', { headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (c) { return c.item_count; })
      .catch(function () { return 0; });
  }

  function updateCartBadge(count) {
    document.querySelectorAll('[data-cart-count]').forEach(function (el) {
      el.textContent = String(count);
      el.style.display = count > 0 ? '' : 'none';
    });
  }

  function flashButton(btn) {
    var label = btn.querySelector('[data-add-label]');
    var original = label ? label.textContent : null;
    if (label) label.textContent = 'تم ✓';
    btn.classList.add('!bg-success');
    window.setTimeout(function () {
      if (label && original) label.textContent = original;
      btn.classList.remove('!bg-success');
    }, 1400);
  }

  function bindAjaxForms(root) {
    root.querySelectorAll('form[data-ajax-add]').forEach(function (form) {
      if (form.dataset.bound) return;
      form.dataset.bound = '1';
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = form.querySelector('[data-add-btn]');
        if (btn) btn.disabled = true;
        var formData = new FormData(form);
        fetch('/cart/add.js', {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        })
          .then(function (r) { return r.json(); })
          .then(function () {
            if (btn) flashButton(btn);
            return fetchCartCount();
          })
          .then(function (count) { updateCartBadge(count); })
          .catch(function () {})
          .finally(function () { if (btn) btn.disabled = false; });
      });
    });
  }

  function bindSort(root) {
    var sel = root.querySelector('[data-sort-select]');
    if (!sel || sel.dataset.bound) return;
    sel.dataset.bound = '1';
    sel.addEventListener('change', function () {
      var url = new URL(window.location.href);
      url.searchParams.set('sort_by', sel.value);
      window.location.assign(url.toString());
    });
  }

  function init() {
    document.querySelectorAll('[data-section-id]').forEach(function (sec) {
      bindAjaxForms(sec);
      bindSort(sec);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
