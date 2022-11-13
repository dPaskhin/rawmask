export const selectRange = (
  $input: HTMLInputElement,
  range: [number, number],
): void => {
  if (document.activeElement !== $input) {
    throw new Error('The input is not focused');
  }

  $input.setSelectionRange(range[0], range[1]);

  /**
   * Emit explicitly selectionChange event, because explicitly setting selection range doesn't do this.
   */
  document.dispatchEvent(new Event('selectionchange'));
};
