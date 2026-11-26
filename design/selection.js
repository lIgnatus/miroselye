const controls = document.querySelector('.device');
controls.hidden = false;
for (const button of controls.querySelectorAll('button')) {
  button.addEventListener('click', () => {
    const selected = button.dataset.device;
    for (const item of controls.querySelectorAll('button')) {
      item.setAttribute('aria-pressed', String(item === button));
    }
    for (const shot of document.querySelectorAll('[data-layout]')) {
      shot.hidden = shot.dataset.layout !== selected;
    }
    document.body.classList.toggle('mobile', selected === 'mobile');
  });
}
