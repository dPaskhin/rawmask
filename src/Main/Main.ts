import { MaskedInput } from '@src/MaskedInput/MaskedInput';
import { InputConfig } from '@src/InputConfig/InputConfig';
import { CharsPreparer } from '@src/Chars/services/CharsPreparer';
import { CharsStringifier } from '@src/Chars/services/CharsStringifier';
import { Chars } from '@src/Chars/Chars';
import { SelectionRange } from '@src/SelectionRange/SelectionRange';
import { InputChanger } from '@src/InputListeners/services/InputChanger';
import { InputListeners } from '@src/InputListeners/InputListeners';
import { ParamsValidator } from '@src/Main/services/ParamsValidator';
import { InputPreparer } from '@src/Main/services/InputPreparer';
import { CharsValueModifier } from '@src/Chars/services/CharsValueModifier';
import type { IMaskedOptions } from '@src/Common/types/IMaskedOptions';
import type { TMask } from '@src/Common/types/TMask';

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

  public constructMaskedInput(): MaskedInput {
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
