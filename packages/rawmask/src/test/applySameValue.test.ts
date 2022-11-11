import userEvent from '@testing-library/user-event';

import { createRawmask } from '../main';
import { clickOnInput } from './utils/clickOnInput';
import { createInput } from './utils/createInput';

describe('Apply same value', () => {
  test('apply value', async () => {
    const $input = createInput();

    const rawmask = createRawmask($input, '+7 (999) 999-99-99');

    await clickOnInput($input, 6);

    await userEvent.keyboard('1234');

    rawmask.value = '+7 (__1) 234-__-__';

    expect($input.value).toEqual('+7 (__1) 234-__-__');
  });
  test('apply raw value', async () => {
    const $input = createInput();

    const rawmask = createRawmask($input, '+7 (999) 999-99-99');

    await clickOnInput($input, 6);

    await userEvent.keyboard('1234');

    rawmask.rawValue = '1234';

    expect($input.value).toEqual('+7 (__1) 234-__-__');
  });
  test('apply value while change', async () => {
    const $input = createInput();

    const rawmask = createRawmask($input, '+7 (999) 999-99-99');

    rawmask.on('input', ({ value }) => {
      rawmask.value = value;
    });

    await clickOnInput($input, 6);

    await userEvent.keyboard('1234');

    expect($input.value).toEqual('+7 (__1) 234-__-__');
  });
  test('apply raw value while change', async () => {
    const $input = createInput();

    const rawmask = createRawmask($input, '+7 (999) 999-99-99');

    rawmask.on('input', ({ rawValue }) => {
      rawmask.rawValue = rawValue;
    });

    await clickOnInput($input, 6);

    await userEvent.keyboard('1234');

    expect($input.value).toEqual('+7 (__1) 234-__-__');
  });
});
