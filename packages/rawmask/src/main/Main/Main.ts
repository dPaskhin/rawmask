import { MaskedInput } from '../MaskedInput/MaskedInput';
import { InputConfig } from '../InputConfig/InputConfig';
import { CharsPreparer } from '../Chars/services/CharsPreparer';
import { CharsStringifier } from '../Chars/services/CharsStringifier';
import { Chars } from '../Chars/Chars';
import { SelectionRange } from '../SelectionRange/SelectionRange';
import { InputChanger } from '../InputListeners/services/InputChanger';
import { InputListeners } from '../InputListeners/InputListeners';
import { ParamsValidator } from './services/ParamsValidator';
import { InputPreparer } from './services/InputPreparer';
import { CharsValueModifier } from '../Chars/services/CharsValueModifier';
import type { IMaskedOptions } from '../Common/types/IMaskedOptions';
import type { TMask } from '../Common/types/TMask';

export class Main {
  private readonly $input: HTMLInputElement;

  private readonly mask: TMask;

  private readonly options?: IMaskedOptions;

  public constructor(
    $input: HTMLInputElement | string,
    mask: TMask,
    options?: IMaskedOptions,
  ) {
    ParamsValidator.validate($input, mask, options);

    this.$input = InputPreparer.prepare($input);
    this.mask = mask;
    this.options = options;
  }

  public createMaskedInput(): MaskedInput {
    const config = new InputConfig(this.mask, this.options);
    const charsPreparer = new CharsPreparer(config);
    const charsStringifier = new CharsStringifier(config);
    const charsValueModifier = new CharsValueModifier(config);
    const chars = new Chars(
      charsPreparer,
      config,
      charsStringifier,
      charsValueModifier,
    );
    const selectionRange = new SelectionRange(this.$input, chars);
    const changer = new InputChanger(this.$input, chars, selectionRange);
    const listeners = new InputListeners(this.$input, selectionRange, changer);

    return new MaskedInput(
      this.$input,
      chars,
      listeners,
      config,
      charsPreparer,
      selectionRange,
      changer,
    );
  }
}
