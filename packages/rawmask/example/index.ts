import { createRawmask } from '../src/main';

document.addEventListener('DOMContentLoaded', () => {
  const rawmask = createRawmask('#root', '+7 (999) 999-99-99');

  rawmask.on('input', ({ rawValue }) => {
    rawmask.rawValue = rawValue;
  });
});
