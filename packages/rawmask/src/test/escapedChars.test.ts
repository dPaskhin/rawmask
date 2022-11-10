import userEvent from '@testing-library/user-event';

import { createRawmask } from '../main';
import { createInput } from './utils/createInput';
import { clickOnInput } from './utils/clickOnInput';

describe('Escaped chars', () => {
  test('should format initial value', () => {
    const $input = createInput();
    const $inputArrayMask = createInput();

    createRawmask($input, '+\\9\\98 (99) 999-99-99');
    createRawmask($inputArrayMask, [
      '\\9',
      '9',
      '/',
      '9',
      '\\a',
      '/',
      '\\7',
      '9',
    ]);

    expect($input.value).toEqual('+998 (__) ___-__-__');
    expect($inputArrayMask.value).toEqual('9_/_a/7_');
  });

  test('should format initial value with default value', () => {
    const $spaceInput = createInput();
    const $inputArrayMask = createInput();

    createRawmask($spaceInput, '+\\9\\98 (99) 999-99-99', {
      maskPlaceholder: '',
      defaultRawValue: '123456',
    });
    createRawmask(
      $inputArrayMask,
      ['\\9', '9', '/', '9', '\\a', '/', '\\7', '9'],
      {
        defaultRawValue: '1234',
      },
    );

    expect($spaceInput.value).toEqual('+998 (12) 345-6');
    expect($inputArrayMask.value).toEqual('91/2a/73');
  });

  test('should change mask', async () => {
    const $input = createInput();

    const rawmask = createRawmask($input, '+\\9\\98 (99) 999-99-99');

    await clickOnInput($input, 5);

    await userEvent.keyboard('1234');

    rawmask.mask = ['\\9', '9', '/', '9', '\\a', '/', '\\7', '9'];

    expect($input.value).toEqual('91/2a/73');
  });
});
