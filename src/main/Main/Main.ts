import { MaskedInput } from '@src/main/MaskedInput/MaskedInput';
import { InputConfig } from '@src/main/InputConfig/InputConfig';
import { CharsPreparer } from '@src/main/Chars/services/CharsPreparer';
import { CharsStringifier } from '@src/main/Chars/services/CharsStringifier';
import { Chars } from '@src/main/Chars/Chars';
import { SelectionRange } from '@src/main/SelectionRange/SelectionRange';
import { InputChanger } from '@src/main/InputListeners/services/InputChanger';
import { InputListeners } from '@src/main/InputListeners/InputListeners';
import { ParamsValidator } from '@src/main/Main/services/ParamsValidator';
import { InputPreparer } from '@src/main/Main/services/InputPreparer';
import { CharsValueModifier } from '@src/main/Chars/services/CharsValueModifier';
import type { IMaskedOptions } from '@src/main/Common/types/IMaskedOptions';
import type { TMask } from '@src/main/Common/types/TMask';

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
