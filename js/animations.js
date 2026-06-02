(function () {
  'use strict';

  var CSS = [
    '.bc-fade-up{',
      'opacity:0;',
      'transform:translateY(28px);',
      'transition:opacity 650ms ease-out,transform 650ms ease-out;',
    '}',
    '.bc-fade-scale{',
      'opacity:0;',
      'transform:translateY(14px) scale(0.97);',
      'transition:opacity 700ms ease-out,transform 700ms ease-out;',
    '}',
    '.bc-fade-up.bc-in,.bc-fade-scale.bc-in{',
      'opacity:1;',
      'transform:none;',
    '}'
  ].join('');

  var style = document.createElement('style');
  style.textContent = CSS;
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

  function init() {
    var root = document.getElementById('PAGES_CONTAINER');
    if (!root) return;

    // Text blocks
    root.querySelectorAll('[data-testid="richTextElement"]').forEach(function (el) {
      watch(el, 'bc-fade-up');
    });

    // Images (skip background images inside bgLayers)
    root.querySelectorAll('.wixui-image').forEach(function (el) {
      if (el.closest('[data-hook="bgLayers"]')) return;
      watch(el, 'bc-fade-scale');
    });

    // YouTube iframes
    root.querySelectorAll('iframe[src*="youtube"]').forEach(function (el) {
      watch(el, 'bc-fade-scale');
    });

    // Buttons
    root.querySelectorAll('.FubTgk').forEach(function (el) {
      watch(el, 'bc-fade-up', 150);
    });

    // Stagger: 4 icon feature boxes in "我們想設計" section
    ['comp-li3arar1', 'comp-li3ardyk', 'comp-li38hh2y', 'comp-li38go51'].forEach(function (id, i) {
      var el = document.getElementById(id);
      if (el) watch(el, 'bc-fade-up', i * 130);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
