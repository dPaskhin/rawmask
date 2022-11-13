import userEvent from '@testing-library/user-event';

import { clickOn } from './utils/clickOn';
import { createInput } from './utils/createInput';

describe('Dynamic change mask', () => {
  test('should change mask', async () => {
    const { node: $input, rerender } = await createInput({
      mask: '+7 (999) 999-99-99',
    });

    await clickOn($input, 4);

    await userEvent.keyboard('1234');

    rerender({ mask: '99/99/99' });

    expect($input.value).toEqual('12/34/__');
  });
});
