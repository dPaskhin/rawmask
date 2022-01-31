import { SelectionRange } from '@src/SelectionRange/SelectionRange';
import { Chars } from '@src/Chars/Chars';
import { InputChanger } from '@src/InputListeners/services/InputChanger';
import { InputListeners } from '@src/InputListeners/InputListeners';
import { MaskedInput } from '@src/MaskedInput/MaskedInput';
import { IMaskedOptions } from '@src/Common/types/IMaskedOptions';
import { InputConfig } from '@src/InputConfig/InputConfig';
import { CharsPreparer } from '@src/Chars/services/CharsPreparer';
import { CharsStringifier } from '@src/Chars/services/CharsStringifier';

export const textInputMask = (
  $input: HTMLInputElement,
  options?: IMaskedOptions,
): MaskedInput => {
  const config = new InputConfig(options);
  const charsPreparer = new CharsPreparer(config);
  const charsStringifier = new CharsStringifier(config);
  const chars = new Chars(charsPreparer, config, charsStringifier);
  const selectionRange = new SelectionRange($input, chars);
  const changer = new InputChanger($input, chars, selectionRange);
  const listeners = new InputListeners($input, selectionRange, changer);

  return new MaskedInput($input, chars, listeners);
};

export default textInputMask;
