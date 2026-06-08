/**
 * Velnu — Section 10: Final Threshold
 */
Velnu.finalThreshold = (function () {
  'use strict';

  const { utils } = Velnu;

  function init() {
    const section = document.querySelector('.section--final');
    const door = section?.querySelector('.door--final');
    const btn = section?.querySelector('.final__handle-btn');
    const dialog = document.getElementById('contact-portal');
    const closeBtn = dialog?.querySelector('.contact-portal__close');
    const canvas = section?.querySelector('.final__canvas');

    if (!section || !door || !btn) return;

    let unlocking = false;

    btn.addEventListener('mouseenter', () => {
      if (!door.classList.contains('door--open')) {
        door.classList.add('door--unlocking');
      }
    });

    btn.addEventListener('mouseleave', () => {
      if (!door.classList.contains('door--open')) {
        door.classList.remove('door--unlocking');
      }
    });

    btn.addEventListener('click', () => {
      if (unlocking) return;
      unlocking = true;

      door.classList.remove('door--unlocking');
      door.classList.add('door--open');

      setTimeout(() => {
        if (dialog && typeof dialog.showModal === 'function') {
          dialog.showModal();
        }
        unlocking = false;
      }, 1200);
    });

    closeBtn?.addEventListener('click', () => dialog?.close());

    dialog?.addEventListener('click', e => {
      if (e.target === dialog) dialog.close();
    });

    if (canvas) {
      const setup = utils.setupCanvas(canvas);
      if (setup && !utils.reducedMotion) {
        const { ctx } = setup;

        function animate() {
          const w = canvas.getBoundingClientRect().width;
          const h = canvas.getBoundingClientRect().height;
          const cx = w / 2;
          const cy = h * 0.4;

          ctx.fillStyle = '#0A0C10';
          ctx.fillRect(0, 0, w, h);

          Velnu.effects.drawDoorLight(ctx, cx, cy, w * 0.3, h * 0.5, 0.6);

          requestAnimationFrame(animate);
        }
        animate();
      }
    }
  }

  return { init };
})();
