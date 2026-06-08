/**
 * Velnu — Section 9: Mirror Door Maze
 */
Velnu.mirrorMaze = (function () {
  'use strict';

  const { utils } = Velnu;

  const REFLECTIONS = [
    { label: 'Past', gradient: 'linear-gradient(135deg, rgba(181,157,106,0.2), rgba(42,45,74,0.5))' },
    { label: 'Future', gradient: 'linear-gradient(135deg, rgba(100,150,255,0.15), rgba(26,58,92,0.4))' },
    { label: 'Parallel', gradient: 'linear-gradient(135deg, rgba(215,221,232,0.1), rgba(181,157,106,0.15))' },
    { label: 'Unchosen', gradient: 'linear-gradient(135deg, rgba(139,115,85,0.2), rgba(20,22,28,0.6))' },
    { label: 'Dream', gradient: 'linear-gradient(135deg, rgba(196,181,232,0.15), rgba(42,45,74,0.4))' },
    { label: 'Echo', gradient: 'linear-gradient(135deg, rgba(215,221,232,0.08), rgba(26,58,92,0.3))' },
    { label: 'Shadow', gradient: 'linear-gradient(135deg, rgba(10,12,16,0.8), rgba(42,45,74,0.3))' },
    { label: 'Light', gradient: 'linear-gradient(135deg, rgba(244,246,248,0.1), rgba(181,157,106,0.1))' },
    { label: 'Void', gradient: 'linear-gradient(135deg, rgba(10,12,16,0.9), rgba(10,12,16,0.95))' }
  ];

  function createMirrorDoor(reflection) {
    const div = document.createElement('div');
    div.className = 'mirror-door reveal-on-scroll';
    div.setAttribute('role', 'listitem');
    div.setAttribute('tabindex', '0');
    div.setAttribute('aria-label', `Mirror of ${reflection.label}`);

    div.innerHTML = `
      <div class="mirror-door__surface">
        <div class="mirror-door__reflection" style="background: ${reflection.gradient}"></div>
      </div>
      <span class="mirror-door__label">${reflection.label}</span>
    `;

    return div;
  }

  function init() {
    const labyrinth = document.querySelector('.mirror__labyrinth');
    const canvas = document.querySelector('.mirror__canvas');

    if (!labyrinth) return;

    REFLECTIONS.forEach(r => labyrinth.appendChild(createMirrorDoor(r)));

    utils.observeVisibility(
      document.querySelectorAll('.mirror-door'),
      el => el.classList.add('visible'),
      0.1
    );

    if (canvas) {
      const setup = utils.setupCanvas(canvas);
      if (setup && !utils.reducedMotion) {
        const { ctx } = setup;
        let shimmer = 0;

        function animate() {
          const w = canvas.getBoundingClientRect().width;
          const h = canvas.getBoundingClientRect().height;
          shimmer += 0.005;

          ctx.clearRect(0, 0, w, h);

          const grad = ctx.createLinearGradient(0, 0, w, h);
          grad.addColorStop(0, `rgba(215, 221, 232, ${0.02 + Math.sin(shimmer) * 0.01})`);
          grad.addColorStop(0.5, 'rgba(42, 45, 74, 0.03)');
          grad.addColorStop(1, `rgba(181, 157, 106, ${0.02 + Math.cos(shimmer) * 0.01})`);
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, w, h);

          requestAnimationFrame(animate);
        }
        animate();
      }
    }
  }

  return { init };
})();
