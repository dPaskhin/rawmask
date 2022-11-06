import userEvent from '@testing-library/user-event';

export const clickOnInput = async (
  $input: HTMLInputElement,
  cursorPosition = 0,
): Promise<void> => {
  /** Click on the input sets cursor position at last symbol in a value */
  await userEvent.click($input);

  /** The cursor position is set explicitly here  */
  $input.setSelectionRange(cursorPosition, cursorPosition);

  /**
   * Click on input emits selection change event in a browser
   * But it's not happen in test environment, so it needs to be emitting explicitly
   */
  document.dispatchEvent(new Event('selectionchange'));
};
