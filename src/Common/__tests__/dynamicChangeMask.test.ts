import userEvent from '@testing-library/user-event';

import { textInputMask } from '@src/index';
import { clickOnInput } from '@src/Common/__tests__/utils/clickOnInput';

const createInput = (): HTMLInputElement => {
  const $input = document.createElement('input');

  document.body.prepend($input);

  return $input;
};

describe('Dynamic change mask', () => {
  test('should change mask', () => {
    const $input = createInput();

    const masked = textInputMask($input, '+7 (999) 999-99-99');

    clickOnInput($input, 4);

    userEvent.keyboard('1234');

    masked.mask = '99/99/99';

    expect($input).toHaveValue('12/34/__');
  });
});
