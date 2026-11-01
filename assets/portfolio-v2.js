(() => {
  'use strict';
  const dialog = document.querySelector('#case-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const content = document.querySelector('#case-content');
  const closeButton = dialog.querySelector('[data-close]');
  let returnFocus = null;

  const openCase = (id, trigger) => {
    const template = document.getElementById(`case-${id}`);
    if (!template) return;
    if (!dialog.open) returnFocus = trigger;
    content.replaceChildren(template.content.cloneNode(true));
    dialog.setAttribute('aria-labelledby', `title-${id}`);
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('dialog-open');
    dialog.scrollTop = 0;
    closeButton.focus({preventScroll:true});
  };

  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-case]');
    if (trigger && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      openCase(trigger.dataset.case, trigger);
    }
  });
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    returnFocus?.focus({preventScroll:true});
  });

  const gameImage = document.querySelector('[data-game-image]');
  const gameSources = [...document.querySelector('#case-games').content.querySelectorAll('.case-gallery img')];
  const gameButtons = [...document.querySelectorAll('[data-game-preview]')];
  gameButtons.forEach(button => button.addEventListener('click', () => {
    const source = gameSources[Number(button.dataset.gamePreview)];
    gameImage.src = source.src;
    gameImage.alt = source.alt;
    gameButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  }));
})();
