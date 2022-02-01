import { MaskedInput } from '@src/MaskedInput/MaskedInput';
import { InputConfig } from '@src/InputConfig/InputConfig';
import { CharsPreparer } from '@src/Chars/services/CharsPreparer';
import { CharsStringifier } from '@src/Chars/services/CharsStringifier';
import { Chars } from '@src/Chars/Chars';
import { SelectionRange } from '@src/SelectionRange/SelectionRange';
import { InputChanger } from '@src/InputListeners/services/InputChanger';
import { InputListeners } from '@src/InputListeners/InputListeners';
import { ParamsValidator } from '@src/Main/services/ParamsValidator';
import type { IMaskedOptions } from '@src/Common/types/IMaskedOptions';

export class Main {
  public constructor(
    private readonly $input: HTMLInputElement,
    private readonly mask: string,
    private readonly options?: IMaskedOptions,
  ) {}

  public validateParams(): void | never {
    ParamsValidator.validate(this.$input, this.mask, this.options);
  }

  public constructMaskedInput(): MaskedInput {
    const config = new InputConfig(this.mask, this.options);
    const charsPreparer = new CharsPreparer(config);
    const charsStringifier = new CharsStringifier(config);
    const chars = new Chars(charsPreparer, config, charsStringifier);
    const selectionRange = new SelectionRange(this.$input, chars);
    const changer = new InputChanger(this.$input, chars, selectionRange);
    const listeners = new InputListeners(this.$input, selectionRange, changer);

    return new MaskedInput(this.$input, chars, listeners);
  }
}
