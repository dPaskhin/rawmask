import userEvent from '@testing-library/user-event';

import { clickOn } from './utils/clickOn';
import { createInput } from './utils/createInput';

describe('Insert permanent value chars', () => {
  test('should stay not changed value', async () => {
    const { node: $input } = await createInput({
      mask: '12+999',
    });

    await clickOn($input);

    await userEvent.keyboard('1');

    await clickOn($input, 1);

    await userEvent.keyboard('2');

    await clickOn($input, 2);

    await userEvent.keyboard('+');

    expect($input.value).toEqual('12+___');
  });
});
