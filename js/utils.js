/**
 * Velnu — Utility Functions
 */
const Velnu = window.Velnu || {};

Velnu.utils = (function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function randInt(min, max) {
    return Math.floor(rand(min, max + 1));
  }

  function setupCanvas(canvas) {
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });
    return { ctx, resize, dpr };
  }

  function getScrollProgress(element) {
    const rect = element.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height - vh;
    if (total <= 0) return clamp(-rect.top / vh, 0, 1);
    return clamp(-rect.top / total, 0, 1);
  }

  function observeVisibility(elements, callback, threshold = 0.15) {
    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => callback(el, true));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback(entry.target, true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    elements.forEach(el => observer.observe(el));
  }

  function observeSections(callback) {
    const headers = document.querySelectorAll('.section-header--subtle');
    observeVisibility(Array.from(headers), (el) => {
      el.classList.add('visible');
      callback && callback(el);
    });

    const finalSection = document.querySelector('.section--final');
    if (finalSection) {
      observeVisibility([finalSection], () => {
        finalSection.classList.add('visible');
      }, 0.3);
    }
  }

  return {
    reducedMotion,
    clamp,
    lerp,
    rand,
    randInt,
    setupCanvas,
    getScrollProgress,
    observeVisibility,
    observeSections
  };
})();

window.Velnu = Velnu;
