import userEvent from '@testing-library/user-event';

import { createRawmask } from '../main';
import { clickOnInput } from './utils/clickOnInput';

// TODO: create util
const createInput = (): HTMLInputElement => {
  const $input = document.createElement('input');

  document.body.prepend($input);

  return $input;
};

describe('Dynamic change mask', () => {
  test('should change mask', async () => {
    const $input = createInput();

    const rawmask = createRawmask($input, '+7 (999) 999-99-99');

    await clickOnInput($input, 4);

    await userEvent.keyboard('1234');

    rawmask.mask = '99/99/99';

    expect($input.value).toEqual('12/34/__');
  });
});
