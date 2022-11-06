import { TextInputMaskError } from '../../Common/errors/TextInputMaskError';
import { RAWMASK_INPUT_ATTRIBUTE } from '../../Common/utils/constants';
import { isSelectorValid } from '../../Common/utils/isSelectorValid';

export class InputPreparer {
  public static prepare(
    $rawInput: string | HTMLInputElement,
  ): HTMLInputElement | never {
    const $validatingInput = InputPreparer.getInput($rawInput);

    if ($validatingInput.hasAttribute(RAWMASK_INPUT_ATTRIBUTE)) {
      throw new TextInputMaskError(
        typeof $rawInput === 'string'
          ? `you trying add mask to masked input with selector "${$rawInput}"`
          : 'you trying add mask to masked input',
      );
    }

    $validatingInput.setAttribute(RAWMASK_INPUT_ATTRIBUTE, '');

    return $validatingInput;
  }

  private static getInput(
    $input: string | HTMLInputElement,
  ): HTMLInputElement | never {
    if ($input instanceof HTMLInputElement) {
      return $input;
    }

    if (!isSelectorValid($input)) {
      throw new TextInputMaskError(`"${$input}" is not a valid selector`);
    }

    const $possibleInput = document.querySelector($input);

    if (!$possibleInput || !($possibleInput instanceof HTMLInputElement)) {
      throw new TextInputMaskError(
        `input by "${$input}" selector wasn't found`,
      );
    }

    return $possibleInput;
  }
}
