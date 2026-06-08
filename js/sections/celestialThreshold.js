/**
 * Velnu — Section 8: Celestial Threshold
 */
Velnu.celestialThreshold = (function () {
  'use strict';

  const { utils, webgl } = Velnu;

  const NEBULAE = [
    { colors: ['#1a3a5c', '#4a6fa5', '#0a0c10'], label: 'Nebula of Silence' },
    { colors: ['#2a1a4a', '#6a4a8a', '#0a0c10'], label: 'Violet Threshold' },
    { colors: ['#1a2a3a', '#3a5a7a', '#0a0810'], label: 'Deep Space Door' },
    { colors: ['#3a2a1a', '#8a6a4a', '#100a08'], label: 'Golden Galaxy' },
    { colors: ['#1a3a4a', '#4a8a9a', '#080c10'], label: 'Aurora Portal' }
  ];

  function createPortal(nebula) {
    const div = document.createElement('div');
    div.className = 'celestial-portal reveal-on-scroll';
    div.setAttribute('role', 'listitem');
    div.setAttribute('tabindex', '0');
    div.setAttribute('aria-label', nebula.label);

    const gradient = `radial-gradient(circle at 40% 40%, ${nebula.colors[1]}, ${nebula.colors[0]} 60%, ${nebula.colors[2]})`;

    div.innerHTML = `
      <div class="celestial-portal__frame">
        <div class="celestial-portal__nebula" style="background: ${gradient}"></div>
      </div>
    `;

    return div;
  }

  function init() {
    const portals = document.querySelector('.celestial__portals');
    const canvas = document.querySelector('.celestial__webgl');

    if (portals) {
      NEBULAE.forEach(n => portals.appendChild(createPortal(n)));

      utils.observeVisibility(
        document.querySelectorAll('.celestial-portal'),
        el => el.classList.add('visible'),
        0.15
      );
    }

    if (canvas) {
      webgl.initCosmic(canvas);
    }
  }

  return { init };
})();
