'use strict';

{
  const open = document.getElementById('open');
  const overlay = document.querySelector('.overlay');
  const close = document.getElementById('close');

  const footer_line = document.querySelector('.footer_line');

  open.addEventListener('click', () => {
    overlay.classList.add('show');
    open.classList.add('hide');

    footer_line.classList.add('hide');
  });

  close.addEventListener('click', () => {
    overlay.classList.remove('show');
    open.classList.remove('hide');

    footer_line.classList.remove('hide');
  });
}