import userEvent from '@testing-library/user-event';

import { clickOn } from './utils/clickOn';
import { createInput } from './utils/createInput';
import { moveCursor } from './utils/moveCursor';
import { selectRange } from './utils/selectRange';

describe('Changing', () => {
  test('add value by one', async () => {
    const { node: $input } = await createInput({ mask: '+7 (999) 999-99-99' });

    await clickOn($input, 6);

    await userEvent.keyboard('1234');

    expect($input.value).toEqual('+7 (__1) 234-__-__');
  });
  test('add value by paste', async () => {
    const { node: $input } = await createInput({ mask: '+7 (999) 999-99-99' });

    await clickOn($input, 6);

    await userEvent.paste('1234');

    expect($input.value).toEqual('+7 (__1) 234-__-__');
  });
  test('delete value by one', async () => {
    const { node: $input } = await createInput({
      mask: '+7 (999) 999-99-99',
      defaultRawValue: '9999103350',
    });

    await moveCursor({
      $input,
      direction: 'right',
      steps: 3,
      startPosition: 8,
    });

    await userEvent.keyboard('[Backspace]');

    expect($input.value).toEqual('+7 (999) 9_0-33-50');

    await moveCursor({
      $input,
      direction: 'right',
      steps: 3,
    });

    await userEvent.keyboard('[Backspace]');

    expect($input.value).toEqual('+7 (999) 9__-33-50');
  });
  test('delete multiple value', async () => {
    const { node: $input } = await createInput({
      mask: '+7 (999) 999-99-99',
      defaultRawValue: '9999103350',
    });

    await clickOn($input);

    selectRange($input, [8, 11]);

    await userEvent.keyboard('[Backspace]');

    expect($input.value).toEqual('+7 (999) __0-33-50');
  });
  test('delete multiple value with paste another value', async () => {
    const { node: $input } = await createInput({
      mask: '+7 (999) 999-99-99',
      defaultRawValue: '9999103350',
    });

    await clickOn($input);

    selectRange($input, [8, 11]);

    await userEvent.paste('12');

    expect($input.value).toEqual('+7 (999) 120-33-50');
  });
  test('paste value', async () => {
    const { node: $input } = await createInput({
      mask: '+7 (999) 999-99-99',
    });

    await clickOn($input);

    await userEvent.paste('12');

    expect($input.value).toEqual('+7 (12_) ___-__-__');

    await userEvent.paste('9999103350');

    expect($input.value).toEqual('+7 (129) 999-10-33');
  });
});
