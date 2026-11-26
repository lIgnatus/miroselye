// Atlas outlines derived from the public-domain Natural Earth 1:110m land dataset.
const atlas = document.querySelector('[data-mission]');
if (atlas) {
  const list = atlas.querySelector('.mission-choices');
  const tabs = [...list.querySelectorAll('button')];
  const pages = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  const globe = atlas.querySelector('.mission-globe img');
  let selected = 0;
  function selectPage(index, moveFocus = false) {
    selected = (index + tabs.length) % tabs.length;
    tabs.forEach((tab, i) => {
      const active = i === selected;
      tab.tabIndex = active ? 0 : -1;
      tab.setAttribute('aria-selected', String(active));
      pages[i].hidden = !active;
      pages[i].classList.toggle('show-leaf', active);
    });
    const nextImage = 'assets/mission-' + pages[selected].dataset.globe + '.webp';
    if (globe.getAttribute('src') !== nextImage) {
      globe.src = nextImage;
      globe.classList.remove('turn');
      requestAnimationFrame(() => globe.classList.add('turn'));
    }
    if (moveFocus) tabs[selected].focus();
  }
  list.setAttribute('role', 'tablist');
  tabs.forEach((tab, i) => {
    tab.setAttribute('role', 'tab');
    pages[i].setAttribute('role','tabpanel');
    pages[i].setAttribute('aria-labelledby',tab.id);
    pages[i].tabIndex = 0;
    tab.addEventListener('click', () => selectPage(i));
    tab.addEventListener('keydown', e => {
      const index = {ArrowLeft: i - 1, ArrowRight: i + 1, Home: 0, End: tabs.length - 1}[e.key];
      if (index === undefined) return;
      e.preventDefault();
      selectPage(index, true);
    });
  });
  let pointer = null;
  const leaves = atlas.querySelector('.mission-leaves');
  leaves.addEventListener('pointerdown', e => {
    if (e.pointerType === 'touch' && !e.target.closest('button')) pointer = {id:e.pointerId, x:e.clientX, y:e.clientY};
  });
  leaves.addEventListener('pointercancel', () => { pointer = null; });
  leaves.addEventListener('pointerup', e => {
    if (!pointer || pointer.id !== e.pointerId) return;
    const dx = e.clientX - pointer.x, dy = e.clientY - pointer.y;
    pointer = null;
    if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy) * 1.5) selectPage(selected + (dx < 0 ? 1 : -1));
  });
  atlas.dataset.ready = '';
  selectPage(0);
  list.hidden = false;
}
