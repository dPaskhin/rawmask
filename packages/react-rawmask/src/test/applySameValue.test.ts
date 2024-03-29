import userEvent from '@testing-library/user-event';

import { clickOn } from './utils/clickOn';
import { createInput } from './utils/createInput';

describe('Apply same value', () => {
  test('apply value', async () => {
    const mask = '+7 (999) 999-99-99';
    const { node: $input, rerender } = await createInput({ mask });

    await clickOn($input, 6);

    await userEvent.keyboard('1234');

    rerender({ mask, value: '+7 (__1) 234-__-__' });

    expect($input.value).toEqual('+7 (__1) 234-__-__');
  });
  test('apply raw value', async () => {
    const mask = '+7 (999) 999-99-99';
    const { node: $input, rerender } = await createInput({ mask });

    await clickOn($input, 6);

    await userEvent.keyboard('1234');

    rerender({ mask, rawValue: '1234' });

    expect($input.value).toEqual('+7 (__1) 234-__-__');
  });
  test('apply value while change', async () => {
    const mask = '+7 (999) 999-99-99';
    const { node: $input, rerender } = await createInput({
      mask,
      onChange: (value) => {
        rerender({ mask, value });
      },
    });

    await clickOn($input, 6);

    await userEvent.keyboard('1234');

    expect($input.value).toEqual('+7 (__1) 234-__-__');
  });
  test('apply raw value while change', async () => {
    const mask = '+7 (999) 999-99-99';
    const { node: $input, rerender } = await createInput({
      mask,
      onChangeRawValue: (value) => {
        rerender({ mask, rawValue: value });
      },
    });

    await clickOn($input, 6);

    await userEvent.keyboard('1234');

    expect($input.value).toEqual('+7 (__1) 234-__-__');
  });
});
