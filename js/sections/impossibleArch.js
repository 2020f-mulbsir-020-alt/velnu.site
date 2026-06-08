/**
 * Velnu — Section 4: Impossible Architecture
 */
Velnu.impossibleArch = (function () {
  'use strict';

  const { utils, effects } = Velnu;

  function init() {
    const canvas = document.querySelector('.impossible__canvas');
    if (!canvas) return;

    const setup = utils.setupCanvas(canvas);
    if (!setup || utils.reducedMotion) return;

    const { ctx } = setup;
    const doors = Array.from({ length: 12 }, (_, i) => ({
      x: utils.rand(100, 700),
      y: utils.rand(100, 500),
      w: utils.rand(40, 80),
      h: utils.rand(70, 130),
      angle: utils.rand(-0.5, 0.5),
      phase: utils.rand(0, Math.PI * 2),
      type: i % 3 === 0 ? 'sky' : 'normal',
      floatSpeed: utils.rand(0.0003, 0.0008),
      floatAmp: utils.rand(10, 30)
    }));

    let time = 0;

    function animate() {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      time += 16;

      ctx.fillStyle = 'rgba(10, 12, 16, 0.15)';
      ctx.fillRect(0, 0, w, h);

      doors.forEach(door => {
        const floatY = Math.sin(time * door.floatSpeed + door.phase) * door.floatAmp;
        effects.drawImpossibleDoor(ctx, {
          ...door,
          x: (door.x / 800) * w,
          y: (door.y / 600) * h + floatY
        }, time);
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  return { init };
})();
