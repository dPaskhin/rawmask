import { SelectionRange } from '@src/entities/SelectionRange';
import { Chars } from '@src/entities/Chars';
import { InputMask } from '@src/entities/InputMask';
import { InputChanger } from '@src/entities/InputChanger';
import { InputListeners } from '@src/entities/InputListeners';
import { MaskedInput } from '@src/entities/MaskedInput';

interface IOptions {
  mask?: string;
  maskPlaceholder?: string;
  defaultValue?: string;
}

export const textInputMask = (
  $input: HTMLInputElement,
  options?: IOptions,
): MaskedInput => {
  const inputMask = new InputMask(options?.mask, options?.maskPlaceholder);
  const chars = new Chars(inputMask, options?.defaultValue);
  const selectionRange = new SelectionRange($input, chars);
  const changer = new InputChanger($input, chars, selectionRange, inputMask);
  const listeners = new InputListeners($input, selectionRange, changer, chars);

  return new MaskedInput(
    $input,
    inputMask,
    chars,
    selectionRange,
    changer,
    listeners,
  );
};

export default textInputMask;
