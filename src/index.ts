import { SelectionRange } from '@src/entities/SelectionRange';
import { Chars } from '@src/entities/Chars';
import { InputMask } from '@src/entities/InputMask';
import { InputValue } from '@src/entities/InputValue';
import { InputChanger } from '@src/entities/InputChanger';
import { InputListeners } from '@src/entities/InputListeners';
import { MaskedInput } from '@src/entities/MaskedInput';

interface IOptions {
  mask?: string;
  maskPlaceholder?: string;
}

export const textInputMask = (
  $input: HTMLInputElement,
  options?: IOptions,
): MaskedInput => {
  const inputMask = new InputMask(options?.mask, options?.maskPlaceholder);
  const chars = new Chars(inputMask);
  const selectionRange = new SelectionRange($input, chars);
  const value = new InputValue($input, chars);
  const changer = new InputChanger(chars, selectionRange, value, inputMask);
  const listeners = new InputListeners($input, selectionRange, changer, value);

  return new MaskedInput(
    inputMask,
    chars,
    selectionRange,
    value,
    changer,
    listeners,
  );
};

export default textInputMask;
