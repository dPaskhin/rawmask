import userEvent from '@testing-library/user-event';

export const clickOnInput = (
  $input: HTMLInputElement,
  cursorPosition = 0,
): void => {
  $input.setSelectionRange(cursorPosition, cursorPosition);
  userEvent.click($input);
};
