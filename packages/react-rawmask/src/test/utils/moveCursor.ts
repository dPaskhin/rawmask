import userEvent from '@testing-library/user-event';

import { clickOn } from './clickOn';

interface IParams {
  /**
   * The input to move cursor.
   */
  $input: HTMLInputElement;
  /**
   * Direction of moving.
   */
  direction: 'left' | 'right';
  /**
   * How many times is to move cursor.
   *
   * @default 0
   */
  steps?: number;
  /**
   * Start position of moving.
   * If set to `prev` then will be using current cursor position in the focused input.
   *
   * @default prev
   */
  startPosition?: number | 'prev';
}

export const moveCursor = async ({
  $input,
  direction,
  steps = 1,
  startPosition = 'prev',
}: IParams): Promise<void> => {
  if (startPosition === 'prev' && document.activeElement !== $input) {
    throw new Error('The input is not focused');
  }

  if (typeof startPosition === 'number') {
    await clickOn($input, startPosition);
  }

  const stepSymbols =
    direction === 'right' ? `{ArrowRight>${steps}/}` : `{ArrowLeft>${steps}/}`;

  await userEvent.keyboard(stepSymbols);

  /**
   * Arrow buttons on focused input emit selection change event in a browser
   * But it's not happen in test environment, so it needs to be emitting explicitly
   */
  document.dispatchEvent(new Event('selectionchange'));
};
