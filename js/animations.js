(function () {
  'use strict';

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

  var BC_SELECTOR = '.bc-fade-up,.bc-fade-scale,.bc-zoom,.bc-from-tl,.bc-from-tr,.bc-from-bl,.bc-from-br';

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll(BC_SELECTOR).forEach(function (el) { el.classList.add('bc-in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var delay = parseInt(el.getAttribute('data-bc-delay') || '0', 10);
      setTimeout(function () { el.classList.add('bc-in'); }, delay);
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  function init() {
    document.querySelectorAll(BC_SELECTOR).forEach(function (el) {
      io.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
