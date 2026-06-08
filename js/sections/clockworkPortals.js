/**
 * Velnu — Section 6: Clockwork Portals
 */
Velnu.clockworkPortals = (function () {
  'use strict';

  const { utils } = Velnu;

  function init() {
    const canvas = document.querySelector('.clockwork__canvas');
    if (!canvas) return;

    const setup = utils.setupCanvas(canvas);
    if (!setup || utils.reducedMotion) return;

    const { ctx } = setup;
    let angle = 0;

    function drawGear(cx, cy, r, teeth, rot, color) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;

      for (let i = 0; i < teeth; i++) {
        const a = (i / teeth) * Math.PI * 2;
        const innerR = r * 0.85;
        const outerR = r;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * innerR, Math.sin(a) * innerR);
        ctx.lineTo(Math.cos(a + 0.05) * outerR, Math.sin(a + 0.05) * outerR);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(0, 0, r * 0.3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(181, 157, 106, 0.5)';
      ctx.stroke();

      ctx.restore();
    }

    function animate() {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;

      ctx.fillStyle = 'rgba(10, 12, 16, 0.3)';
      ctx.fillRect(0, 0, w, h);

      angle += 0.005;
      drawGear(w / 2, h / 2, Math.min(w, h) * 0.25, 24, angle, 'rgba(181, 157, 106, 0.25)');
      drawGear(w * 0.75, h * 0.25, Math.min(w, h) * 0.1, 12, -angle * 2, 'rgba(181, 157, 106, 0.15)');

      requestAnimationFrame(animate);
    }

    animate();
  }

  return { init };
})();
