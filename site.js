const menu = document.getElementById('mobile-nav');
const toggle = document.querySelector('.menu-toggle');
if (menu && toggle) {
  function setMenu(open) {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  }
  toggle.addEventListener('click', () => setMenu(menu.hidden));
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) {
      setMenu(false);
      toggle.focus();
    }
  });
  window.matchMedia('(max-width:730px)').addEventListener('change', () => setMenu(false));
}
function expandLinkedRole() {
  const role = document.getElementById(location.hash.slice(1));
  if (role?.tagName === 'DETAILS') role.open = true;
}
expandLinkedRole();
window.addEventListener('hashchange', expandLinkedRole);
