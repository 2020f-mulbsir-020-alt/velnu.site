/**
 * Velnu — Section 2: Corridor of Infinite Entrances
 */
Velnu.corridor = (function () {
  'use strict';

  const { utils } = Velnu;

  const DOOR_TYPES = ['stone', 'glass', 'celestial', 'mechanical', 'living', 'floating'];
  const DOOR_LABELS = [
    'Threshold of Stone', 'Glass Between Worlds', 'Celestial Passage',
    'Mechanical Gate', 'Living Wood', 'Floating Entrance',
    'Obsidian Arch', 'Crystal Veil', 'Brass Portal', 'Void Door'
  ];

  function createDoor(index, side) {
    const li = document.createElement('li');
    li.className = 'corridor-door reveal-on-scroll';
    li.setAttribute('role', 'listitem');
    li.setAttribute('tabindex', '0');
    li.style.setProperty('--depth', (index % 8) / 8);

    const type = DOOR_TYPES[index % DOOR_TYPES.length];
    li.dataset.type = type;
    li.setAttribute('aria-label', DOOR_LABELS[index % DOOR_LABELS.length]);

    li.innerHTML = `
      <div class="corridor-door__glow"></div>
      <div class="corridor-door__frame"></div>
      <div class="corridor-door__panel"></div>
    `;

    li.addEventListener('click', () => {
      li.classList.toggle('corridor-door--active');
    });

    return li;
  }

  function init() {
    const leftWall = document.querySelector('.door-wall--left');
    const rightWall = document.querySelector('.door-wall--right');
    const canvas = document.querySelector('.corridor__canvas');

    if (!leftWall || !rightWall) return;

    for (let i = 0; i < 12; i++) {
      leftWall.appendChild(createDoor(i, 'left'));
      rightWall.appendChild(createDoor(i + 12, 'right'));
    }

    utils.observeVisibility(
      document.querySelectorAll('.corridor-door'),
      el => el.classList.add('visible'),
      0.1
    );

    if (canvas) {
      Velnu.effects.initAtmosphere(canvas, { count: 50 });
    }
  }

  return { init };
})();
