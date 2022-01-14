import { textInputMask } from '@src/index';

document.addEventListener('DOMContentLoaded', () => {
  const $input = document.querySelector<HTMLInputElement>('#input');

  if ($input) {
    textInputMask($input, {
      mask: '+7 (999) 999-99-99',
    });
  }
});
