import type { IRawmaskOptions, TMask } from 'rawmask';
import { Rawmask } from '../Rawmask/Rawmask';
import { Config } from '../Config/Config';
import { CharsPreparer } from '../Chars/services/CharsPreparer';
import { CharsStringifier } from '../Chars/services/CharsStringifier';
import { Chars } from '../Chars/Chars';
import { SelectionRange } from '../SelectionRange/SelectionRange';
import { InputChanger } from '../InputChanger/InputChanger';
import { InputListeners } from '../InputListeners/InputListeners';
import { ParamsValidator } from './services/ParamsValidator';
import { InputPreparer } from './services/InputPreparer';
import { CharsValueChanger } from '../Chars/services/CharsValueChanger';

// TODO: rename to Fabric
export class Main {
  private readonly $input: HTMLInputElement;

  private readonly mask: TMask;

  private readonly options?: IRawmaskOptions;

  public constructor(
    $input: HTMLInputElement | string,
    mask: TMask,
    options?: IRawmaskOptions,
  ) {
    ParamsValidator.validate($input, mask, options);

    this.$input = InputPreparer.prepare($input);
    this.mask = mask;
    this.options = options;
  }

  public createRawmask(): Rawmask {
    const config = new Config(this.mask, this.options);
    const charsPreparer = new CharsPreparer(config);
    const charsStringifier = new CharsStringifier(config);
    const charsValueModifier = new CharsValueChanger(config);
    const chars = new Chars(
      charsPreparer,
      config,
      charsStringifier,
      charsValueModifier,
    );
    const selectionRange = new SelectionRange(this.$input, chars);
    const changer = new InputChanger(this.$input, chars, selectionRange);
    const listeners = new InputListeners(this.$input, selectionRange, changer);

    return new Rawmask(
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
