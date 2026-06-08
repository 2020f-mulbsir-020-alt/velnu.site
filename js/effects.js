/**
 * Velnu — Global Canvas Effects
 */
Velnu.effects = (function () {
  'use strict';

  const { utils } = Velnu;
  const particles = [];
  let rafId = null;

  function createParticle(w, h) {
    return {
      x: utils.rand(0, w),
      y: utils.rand(0, h),
      size: utils.rand(0.5, 2),
      speed: utils.rand(0.1, 0.4),
      opacity: utils.rand(0.1, 0.4),
      drift: utils.rand(-0.2, 0.2)
    };
  }

  function drawParticles(ctx, w, h, count, color) {
    if (particles.length < count) {
      for (let i = particles.length; i < count; i++) {
        particles.push(createParticle(w, h));
      }
    }

    ctx.clearRect(0, 0, w, h);

    particles.forEach(p => {
      p.y -= p.speed;
      p.x += p.drift;

      if (p.y < 0) {
        p.y = h;
        p.x = utils.rand(0, w);
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = color.replace('OPACITY', p.opacity);
      ctx.fill();
    });
  }

  function initAtmosphere(canvas, options = {}) {
    const setup = utils.setupCanvas(canvas);
    if (!setup) return;

    const { ctx } = setup;
    const count = options.count || 60;
    const color = options.color || 'rgba(215, 221, 232, OPACITY)';

    function animate() {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      drawParticles(ctx, w, h, count, color);
      rafId = requestAnimationFrame(animate);
    }

    if (!utils.reducedMotion) animate();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }

  function drawDoorLight(ctx, x, y, w, h, intensity) {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, w * 0.6);
    gradient.addColorStop(0, `rgba(244, 246, 248, ${0.15 * intensity})`);
    gradient.addColorStop(0.4, `rgba(181, 157, 106, ${0.08 * intensity})`);
    gradient.addColorStop(1, 'rgba(10, 12, 16, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(x - w * 0.6, y - h * 0.3, w * 1.2, h * 1.2);
  }

  function drawImpossibleDoor(ctx, door, time) {
    const { x, y, w, h, angle, type } = door;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + Math.sin(time * 0.001 + door.phase) * 0.1);

    ctx.fillStyle = 'rgba(20, 22, 28, 0.9)';
    ctx.strokeStyle = 'rgba(181, 157, 106, 0.3)';
    ctx.lineWidth = 1;

    ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.strokeRect(-w / 2, -h / 2, w, h);

    if (type === 'sky') {
      const skyGrad = ctx.createLinearGradient(0, -h / 2, 0, h / 2);
      skyGrad.addColorStop(0, 'rgba(26, 58, 92, 0.6)');
      skyGrad.addColorStop(1, 'rgba(100, 150, 255, 0.2)');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(-w / 2 + 3, -h / 2 + 3, w - 6, h - 6);
    }

    ctx.restore();
  }

  return {
    initAtmosphere,
    drawDoorLight,
    drawImpossibleDoor,
    drawParticles
  };
})();
