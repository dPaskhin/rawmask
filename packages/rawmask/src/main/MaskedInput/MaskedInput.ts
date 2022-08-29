import type { Chars } from '../Chars/Chars';
import type { InputListeners } from '../InputListeners/InputListeners';
import type { TMask } from '../Common/types/TMask';
import type { InputConfig } from '../InputConfig/InputConfig';
import type { CharsPreparer } from '../Chars/services/CharsPreparer';
import type { IMaskedInput } from './types/IMaskedInput';
import { SelectionRange } from '../SelectionRange/SelectionRange';
import { InputChanger } from '../InputListeners/services/InputChanger';

export class MaskedInput implements IMaskedInput {
  private $input: HTMLInputElement;

  private chars: Chars;

  private listeners: InputListeners;

  private config: InputConfig;

  private charsPreparer: CharsPreparer;

  private selectionRange: SelectionRange;

  private inputChanger: InputChanger;

  public constructor(
    $input: HTMLInputElement,
    chars: Chars,
    listeners: InputListeners,
    config: InputConfig,
    charsPreparer: CharsPreparer,
    selectionRange: SelectionRange,
    inputChanger: InputChanger,
  ) {
    this.$input = $input;
    this.chars = chars;
    this.listeners = listeners;
    this.config = config;
    this.charsPreparer = charsPreparer;
    this.selectionRange = selectionRange;
    this.inputChanger = inputChanger;

    this.init();
  }

  public get unmaskedValue(): string {
    return this.chars.stringifyChangeable();
  }

  public set unmaskedValue(value: string) {
    this.inputChanger.onlyChangeableChange(value);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public get value(): string {
    return this.chars.stringify();
  }

  public set value(value: string) {
    this.inputChanger.fullChange(value);
  }

  public set mask(mask: TMask) {
    const prevUnmaskedValue = this.unmaskedValue;

    this.config.mask = mask;
    this.chars.baseInit();

    this.unmaskedValue = prevUnmaskedValue;
  }

  public on<Name extends keyof HTMLElementEventMap>(
    name: Name,
    handler: (
      this: MaskedInput,
      masked: MaskedInput,
      event: HTMLElementEventMap[Name],
    ) => void,
  ): MaskedInput {
    this.listeners.on(name, (event) => handler.call(this, this, event));

    return this;
  }

  public off(name: keyof HTMLElementEventMap): void {
    this.listeners.off(name);
  }

  public destroy(): void {
    this.listeners.destroy();
    this.$input.value = '';
  }

  private init(): void {
    this.config.init();
    this.listeners.init();
    this.chars.init();
    this.$input.value = this.chars.stringify();
  }
}
