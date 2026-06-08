/**
 * Velnu — Section 1: Hall of the First Door
 */
Velnu.firstDoor = (function () {
  'use strict';

  const { utils, effects } = Velnu;
  let opened = false;

  function init() {
    const section = document.querySelector('.section--first-door');
    const door = section?.querySelector('.door--first');
    const canvas = section?.querySelector('.first-door__canvas');
    const voidEl = section?.querySelector('.first-door__void');

    if (!section || !door) return;

    const setup = canvas ? utils.setupCanvas(canvas) : null;

    function onScroll() {
      const progress = utils.getScrollProgress(section);
      const scale = utils.lerp(0.35, 1.15, Math.pow(progress, 0.7));
      const proximity = utils.clamp(progress * 1.5, 0, 1);

      section.style.setProperty('--door-scale', scale);
      section.style.setProperty('--door-proximity', proximity);
      section.style.setProperty('--floor-glow', proximity * 0.8);

      if (progress > 0.75 && !opened) {
        opened = true;
        door.classList.add('door--open');
        section.classList.add('door-revealed');
        document.body.classList.add('door-opening');

        setTimeout(() => {
          document.body.classList.remove('door-opening');
        }, 1500);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (setup && !utils.reducedMotion) {
      const motes = Array.from({ length: 40 }, () => ({
        x: utils.rand(0, 800),
        y: utils.rand(0, 600),
        r: utils.rand(0.5, 1.5),
        speed: utils.rand(0.15, 0.5),
        opacity: utils.rand(0.1, 0.35),
        drift: utils.rand(-0.15, 0.15)
      }));

      function drawFrame() {
        const { ctx } = setup;
        const w = canvas.getBoundingClientRect().width;
        const h = canvas.getBoundingClientRect().height;

        ctx.fillStyle = '#0A0C10';
        ctx.fillRect(0, 0, w, h);

        motes.forEach(m => {
          m.y -= m.speed;
          m.x += m.drift;
          if (m.y < 0) { m.y = h; m.x = utils.rand(0, w); }
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(181, 157, 106, ${m.opacity})`;
          ctx.fill();
        });

        const progress = utils.getScrollProgress(section);
        const cx = w / 2;
        const cy = h / 2 + utils.lerp(40, 0, progress);
        const doorW = utils.lerp(80, 280, progress);
        const doorH = utils.lerp(140, 480, progress);

        effects.drawDoorLight(ctx, cx, cy, doorW, doorH, utils.lerp(0.3, 1, progress));

        if (progress > 0.7) {
          const spill = utils.lerp(0, 1, (progress - 0.7) / 0.3);
          ctx.globalAlpha = spill * 0.4;
          ctx.fillStyle = 'rgba(244, 246, 248, 0.1)';
          ctx.fillRect(0, 0, w, h);
          ctx.globalAlpha = 1;
        }

        requestAnimationFrame(drawFrame);
      }

      drawFrame();
    }
  }

  return { init };
})();
