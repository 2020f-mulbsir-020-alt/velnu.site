/**
 * Velnu — Main Application Bootstrap
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    Velnu.utils.observeSections();

    Velnu.firstDoor.init();
    Velnu.corridor.init();
    Velnu.memoryDoors.init();
    Velnu.impossibleArch.init();
    Velnu.secretGates.init();
    Velnu.clockworkPortals.init();
    Velnu.libraryOfKeys.init();
    Velnu.celestialThreshold.init();
    Velnu.mirrorMaze.init();
    Velnu.finalThreshold.init();

    document.querySelectorAll('[tabindex="0"]').forEach(el => {
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          el.click();
        }
      });
    });
  });
})();
