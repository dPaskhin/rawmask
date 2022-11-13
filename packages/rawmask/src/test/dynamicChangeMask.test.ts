import userEvent from '@testing-library/user-event';

import { createRawmask } from '../main';
import { clickOn } from './utils/clickOn';
import { createInput } from './utils/createInput';

describe('Dynamic change mask', () => {
  test('should change mask', async () => {
    const $input = createInput();

    const rawmask = createRawmask($input, '+7 (999) 999-99-99');

    await clickOn($input, 4);

    await userEvent.keyboard('1234');

    rawmask.mask = '99/99/99';

    expect($input.value).toEqual('12/34/__');
  });
});
