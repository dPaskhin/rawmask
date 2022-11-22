import userEvent from '@testing-library/user-event';

import { createRawmask } from '../main';
import { clickOn } from './utils/clickOn';
import { createInput } from './utils/createInput';
import { RAWMASK_INPUT_ATTRIBUTE } from '../main/Common/utils/constants';

describe('Destroy rawmask', () => {
  test('should unsubscribe all listeners', async () => {
    const $input = createInput();

    const rawmask = createRawmask($input, '+7 (999) 999-99-99');

    const mockFn = jest.fn();

    rawmask
      .on('input', () => {
        mockFn();
      })
      .on('click', () => {
        mockFn();
      });

    await clickOn($input);

    await userEvent.keyboard('1');

    expect(mockFn).toHaveBeenCalledTimes(2);

    mockFn.mockReset();

    rawmask.destroy();

    await clickOn($input);

    await userEvent.keyboard('1');

    expect(mockFn).toHaveBeenCalledTimes(0);
  });

  test('should empty value', async () => {
    const $input = createInput();

    const rawmask = createRawmask($input, '+7 (999) 999-99-99');

    await clickOn($input);

    await userEvent.keyboard('1');

    expect($input.value).toStrictEqual('+7 (1__) ___-__-__');

    rawmask.destroy();

    expect($input.value).toStrictEqual('');
  });

  test('should remove rawmask attribute', () => {
    const $input = createInput();

    const rawmask = createRawmask($input, '+7 (999) 999-99-99');

    expect($input.hasAttribute(RAWMASK_INPUT_ATTRIBUTE)).toStrictEqual(true);

    rawmask.destroy();

    expect($input.hasAttribute(RAWMASK_INPUT_ATTRIBUTE)).toStrictEqual(false);
  });
});
