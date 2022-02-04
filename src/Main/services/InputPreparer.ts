import { TextInputMaskError } from '@src/Common/errors/TextInputMaskError';

export class InputPreparer {
  public static prepare(
    $input: string | HTMLInputElement,
  ): HTMLInputElement | never {
    if ($input instanceof HTMLInputElement) {
      return $input;
    }

    const possibleInput = document.querySelector($input);

    if (!possibleInput || !(possibleInput instanceof HTMLInputElement)) {
      throw new TextInputMaskError(
        `input by "${$input}" selector wasn't found`,
      );
    }

    return possibleInput;
  }
}
