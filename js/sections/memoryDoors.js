/**
 * Velnu — Section 3: Memory Doors
 */
Velnu.memoryDoors = (function () {
  'use strict';

  const { utils } = Velnu;

  const MEMORIES = [
    { label: 'First light through curtains', hue: 40 },
    { label: 'Rain on an old window', hue: 210 },
    { label: 'A voice from childhood', hue: 30 },
    { label: 'Dust motes in afternoon sun', hue: 45 },
    { label: 'Footsteps in an empty hall', hue: 220 },
    { label: 'The smell of old books', hue: 35 }
  ];

  function createMemoryDoor(memory, index) {
    const div = document.createElement('div');
    div.className = 'memory-door reveal-on-scroll';
    div.setAttribute('role', 'listitem');
    div.setAttribute('tabindex', '0');
    div.setAttribute('aria-label', `Memory: ${memory.label}`);

    div.innerHTML = `
      <div class="memory-door__frame">
        <div class="memory-door__scene" style="background: radial-gradient(circle at 50% 60%, hsl(${memory.hue}, 30%, 25%), hsl(${memory.hue}, 20%, 8%))"></div>
        <div class="memory-door__light"></div>
      </div>
      <span class="memory-door__label">${memory.label}</span>
    `;

    div.addEventListener('click', () => {
      document.querySelectorAll('.memory-door.open').forEach(d => {
        if (d !== div) d.classList.remove('open');
      });
      div.classList.toggle('open');
    });

    return div;
  }

  function init() {
    const gallery = document.querySelector('.memory__gallery');
    const canvas = document.querySelector('.memory__canvas');

    if (!gallery) return;

    MEMORIES.forEach((memory, i) => {
      gallery.appendChild(createMemoryDoor(memory, i));
    });

    utils.observeVisibility(
      document.querySelectorAll('.memory-door'),
      el => el.classList.add('visible'),
      0.15
    );

    if (canvas) {
      const setup = utils.setupCanvas(canvas);
      if (setup && !utils.reducedMotion) {
        const { ctx } = setup;
        const motes = Array.from({ length: 30 }, () => ({
          x: utils.rand(0, 800),
          y: utils.rand(0, 600),
          r: utils.rand(1, 3),
          speed: utils.rand(0.1, 0.3),
          opacity: utils.rand(0.1, 0.3)
        }));

        function animate() {
          const w = canvas.getBoundingClientRect().width;
          const h = canvas.getBoundingClientRect().height;
          ctx.clearRect(0, 0, w, h);

          motes.forEach(m => {
            m.y -= m.speed;
            if (m.y < 0) m.y = h;
            ctx.beginPath();
            ctx.arc(m.x % w, m.y, m.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(181, 157, 106, ${m.opacity})`;
            ctx.fill();
          });

          requestAnimationFrame(animate);
        }
        animate();
      }
    }
  }

  return { init };
})();
