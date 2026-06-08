/**
 * Velnu — Floating Key Navigation
 */
(function () {
  'use strict';

  const nav = document.querySelector('.key-nav');
  const trigger = document.querySelector('.key-nav__trigger');
  const radial = document.getElementById('key-nav-radial');

  if (!nav || !trigger || !radial) return;

  let isOpen = false;

  function createBurst(x, y) {
    const burst = document.createElement('div');
    burst.className = 'key-nav-burst';
    burst.style.left = x + 'px';
    burst.style.top = y + 'px';
    document.body.appendChild(burst);
    burst.addEventListener('animationend', () => burst.remove());
  }

  function openNav() {
    isOpen = true;
    nav.classList.add('open');
    radial.removeAttribute('hidden');
    trigger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');

    requestAnimationFrame(() => radial.classList.add('open'));

    const rect = trigger.getBoundingClientRect();
    createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  function closeNav() {
    isOpen = false;
    nav.classList.remove('open');
    radial.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');

    setTimeout(() => {
      if (!isOpen) radial.setAttribute('hidden', '');
    }, 500);
  }

  trigger.addEventListener('click', () => (isOpen ? closeNav() : openNav()));

  radial.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeNav();
  });

  document.addEventListener('click', e => {
    if (isOpen && !nav.contains(e.target)) closeNav();
  });
})();
