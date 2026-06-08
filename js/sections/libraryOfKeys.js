/**
 * Velnu — Section 7: Library of Keys
 */
Velnu.libraryOfKeys = (function () {
  'use strict';

  const { utils } = Velnu;

  const KEYS = [
    { type: 'golden', name: 'The Golden Key of Dawn' },
    { type: 'crystal', name: 'Crystal of Frozen Time' },
    { type: 'ancient', name: 'Key of Forgotten Kings' },
    { type: 'floating', name: 'The Weightless Key' },
    { type: 'golden', name: 'Brass of Beginnings' },
    { type: 'crystal', name: 'Prism Unlock' },
    { type: 'ancient', name: 'Rust and Memory' },
    { type: 'floating', name: 'Key That Never Falls' },
    { type: 'golden', name: 'Sunset Passage' },
    { type: 'crystal', name: 'Ice Threshold' },
    { type: 'ancient', name: 'Echo Key' },
    { type: 'floating', name: 'Drifting Unlock' },
    { type: 'golden', name: 'Meridian Gate' },
    { type: 'crystal', name: 'Star Fragment' },
    { type: 'ancient', name: 'Buried Secret' },
    { type: 'floating', name: 'Suspended Entry' }
  ];

  function createKey(key) {
    const div = document.createElement('div');
    div.className = 'library-key reveal-on-scroll';
    div.setAttribute('role', 'listitem');
    div.setAttribute('tabindex', '0');
    div.dataset.type = key.type;
    div.setAttribute('aria-label', key.name);

    div.innerHTML = `
      <div class="library-key__icon"></div>
      <span class="library-key__name">${key.name}</span>
    `;

    return div;
  }

  function init() {
    const shelves = document.querySelector('.library__shelves');
    const canvas = document.querySelector('.library__canvas');

    if (!shelves) return;

    KEYS.forEach(key => shelves.appendChild(createKey(key)));

    utils.observeVisibility(
      document.querySelectorAll('.library-key'),
      el => el.classList.add('visible'),
      0.1
    );

    if (canvas) {
      const setup = utils.setupCanvas(canvas);
      if (setup && !utils.reducedMotion) {
        const { ctx } = setup;

        function animate() {
          const w = canvas.getBoundingClientRect().width;
          const h = canvas.getBoundingClientRect().height;

          ctx.fillStyle = 'rgba(10, 12, 16, 0.05)';
          ctx.fillRect(0, 0, w, h);

          for (let i = 0; i < 5; i++) {
            const x = (performance.now() * 0.02 + i * 200) % w;
            ctx.fillStyle = `rgba(181, 157, 106, ${0.02 + i * 0.005})`;
            ctx.fillRect(x, 0, 1, h);
          }

          requestAnimationFrame(animate);
        }
        animate();
      }
    }
  }

  return { init };
})();
