(function () {
  'use strict';

  /* CSS */
  var style = document.createElement('style');
  style.textContent = [
    '.bc-fade-up{opacity:0;transform:translateY(28px);transition:opacity 650ms ease-out,transform 650ms ease-out;}',
    '.bc-fade-scale{opacity:0;transform:scale(0.97) translateY(14px);transition:opacity 700ms ease-out,transform 700ms ease-out;}',
    '.bc-zoom{opacity:0;transform:scale(0.88);transition:opacity 950ms ease-out,transform 950ms ease-out;}',
    '.bc-from-tl{opacity:0;transform:translate(-22px,-18px);transition:opacity 700ms ease-out,transform 700ms ease-out;}',
    '.bc-from-tr{opacity:0;transform:translate(22px,-18px);transition:opacity 700ms ease-out,transform 700ms ease-out;}',
    '.bc-from-bl{opacity:0;transform:translate(-22px,18px);transition:opacity 700ms ease-out,transform 700ms ease-out;}',
    '.bc-from-br{opacity:0;transform:translate(22px,18px);transition:opacity 700ms ease-out,transform 700ms ease-out;}',
    '.bc-fade-up.bc-in,.bc-fade-scale.bc-in,.bc-zoom.bc-in,.bc-from-tl.bc-in,.bc-from-tr.bc-in,.bc-from-bl.bc-in,.bc-from-br.bc-in{opacity:1;transform:none;}'
  ].join('');
  document.head.appendChild(style);

  if (!('IntersectionObserver' in window)) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var delay = parseInt(el.getAttribute('data-bc-delay') || '0', 10);
      setTimeout(function () { el.classList.add('bc-in'); }, delay);
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  function watch(el, cls, delay) {
    el.classList.add(cls);
    if (delay) el.setAttribute('data-bc-delay', delay);
    io.observe(el);
  }

  /* Sections excluded from all animations */
  var NO_ANIM_SECTIONS = ['comp-lia02dzq', 'comp-libjlsi1', 'SITE_FOOTER'];

  function isExcluded(el) {
    for (var i = 0; i < NO_ANIM_SECTIONS.length; i++) {
      if (el.id === NO_ANIM_SECTIONS[i]) return true;
      if (el.closest('#' + NO_ANIM_SECTIONS[i])) return true;
    }
    return false;
  }

  /* Icon boxes that get their own directional animation — skip their children */
  var ICON_BOX_IDS = ['comp-li3arar1', 'comp-li3ardyk', 'comp-li38hh2y', 'comp-li38go51'];

  function isInsideIconBox(el) {
    return ICON_BOX_IDS.some(function (id) { return !!el.closest('#' + id); });
  }

  /* ── Fix camping tent section bg (replace LQIP with full quality) ── */
  function fixCampingBg() {
    var bgMedia = document.getElementById('bgMedia_comp-lhzzyqfb');
    if (!bgMedia) return;
    var img = bgMedia.querySelector('img');
    if (!img) return;
    img.src = 'assets/ba616a_5bb22f7b54fe4713916c7b87c26b26be_mv2.png';
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;object-position:50% 50%;';
  }

  /* ── Main init ────────────────────────────────────────────────── */
  function init() {
    var root = document.getElementById('PAGES_CONTAINER');
    if (!root) return;

    fixCampingBg();

    /* Text blocks */
    root.querySelectorAll('[data-testid="richTextElement"]').forEach(function (el) {
      if (isExcluded(el) || isInsideIconBox(el)) return;
      watch(el, 'bc-fade-up');
    });

    /* Images (not background, not excluded, not inside icon boxes) */
    root.querySelectorAll('.wixui-image').forEach(function (el) {
      if (el.closest('[data-hook="bgLayers"]')) return;
      if (isExcluded(el) || isInsideIconBox(el)) return;
      if (el.id === 'comp-li01u6yi') { watch(el, 'bc-zoom'); return; }
      watch(el, 'bc-fade-scale');
    });

    /* YouTube iframes */
    root.querySelectorAll('iframe[src*="youtube"]').forEach(function (el) {
      if (isExcluded(el)) return;
      watch(el, 'bc-fade-scale');
    });

    /* Buttons */
    root.querySelectorAll('.FubTgk').forEach(function (el) {
      if (isExcluded(el)) return;
      watch(el, 'bc-fade-up', 150);
    });

    /* Icon boxes: 4-direction converge */
    [
      { id: 'comp-li3arar1', cls: 'bc-from-tl', delay: 0   },
      { id: 'comp-li3ardyk', cls: 'bc-from-tr', delay: 100 },
      { id: 'comp-li38hh2y', cls: 'bc-from-bl', delay: 200 },
      { id: 'comp-li38go51', cls: 'bc-from-br', delay: 300 }
    ].forEach(function (d) {
      var el = document.getElementById(d.id);
      if (el) watch(el, d.cls, d.delay);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
