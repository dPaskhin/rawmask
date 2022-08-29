import userEvent from '@testing-library/user-event';

import { rawmask } from '../main';
import { clickOnInput } from './utils/clickOnInput';

const createInput = (): HTMLInputElement => {
  const $input = document.createElement('input');

  document.body.prepend($input);

  return $input;
};

describe('Dynamic change mask', () => {
  test('should change mask', async () => {
    const $input = createInput();

    const masked = rawmask($input, '+7 (999) 999-99-99');

    await clickOnInput($input, 4);

    await userEvent.keyboard('1234');

    masked.mask = '99/99/99';

    expect($input.value).toEqual('12/34/__');
  });
});
