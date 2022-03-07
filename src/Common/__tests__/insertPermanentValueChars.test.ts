import userEvent from '@testing-library/user-event';

import { textInputMask } from '@src/index';
import { clickOnInput } from '@src/Common/__tests__/utils/clickOnInput';

const createInput = (): HTMLInputElement => {
  const $input = document.createElement('input');

  document.body.prepend($input);

  return $input;
};

describe('Insert permanent value chars', () => {
  test('should stay not changed value', () => {
    const $input = createInput();

    textInputMask($input, '12+999');

    clickOnInput($input);

    userEvent.keyboard('1');

    clickOnInput($input, 1);

    userEvent.keyboard('2');

    clickOnInput($input, 2);

    userEvent.keyboard('+');

    expect($input).toHaveValue('12+___');
  });
});
