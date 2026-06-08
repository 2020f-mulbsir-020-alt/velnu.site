/**
 * Velnu — Section 5: Garden of Secret Gates
 */
Velnu.secretGates = (function () {
  'use strict';

  const { utils } = Velnu;

  const GATES = [
    { bloom: true, water: false, label: 'Gate among the roots' },
    { bloom: false, water: true, label: 'Door beneath the water' },
    { bloom: true, water: false, label: 'Blooming threshold' },
    { bloom: false, water: false, label: 'Hidden in ivy' },
    { bloom: true, water: true, label: 'Lily pad portal' },
    { bloom: false, water: false, label: 'Moss-covered entrance' }
  ];

  function createGate(gate) {
    const div = document.createElement('div');
    div.className = 'garden-gate reveal-on-scroll';
    div.setAttribute('role', 'listitem');
    div.setAttribute('tabindex', '0');
    div.dataset.bloom = gate.bloom;
    div.dataset.water = gate.water;
    div.setAttribute('aria-label', gate.label);

    div.innerHTML = `
      <div class="garden-gate__foliage"></div>
      <div class="garden-gate__door"></div>
    `;

    return div;
  }

  function init() {
    const scene = document.querySelector('.garden__scene');
    const canvas = document.querySelector('.garden__canvas');

    if (!scene) return;

    GATES.forEach(gate => scene.appendChild(createGate(gate)));

    utils.observeVisibility(
      document.querySelectorAll('.garden-gate'),
      el => el.classList.add('visible'),
      0.15
    );

    if (canvas) {
      Velnu.effects.initAtmosphere(canvas, {
        count: 35,
        color: 'rgba(100, 140, 80, OPACITY)'
      });
    }
  }

  return { init };
})();
