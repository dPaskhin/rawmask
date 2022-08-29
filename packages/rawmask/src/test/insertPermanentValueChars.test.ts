import userEvent from '@testing-library/user-event';

import { rawmask } from '../main';
import { clickOnInput } from './utils/clickOnInput';

const createInput = (): HTMLInputElement => {
  const $input = document.createElement('input');

  document.body.prepend($input);

  return $input;
};

describe('Insert permanent value chars', () => {
  test('should stay not changed value', async () => {
    const $input = createInput();

    rawmask($input, '12+999');

    await clickOnInput($input);

    await userEvent.keyboard('1');

    await clickOnInput($input, 1);

    await userEvent.keyboard('2');

    await clickOnInput($input, 2);

    await userEvent.keyboard('+');

    expect($input.value).toEqual('12+___');
  });
});
