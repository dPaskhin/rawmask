import type { IRawmask, TMask } from 'rawmask';
import type { Chars } from '../Chars/Chars';
import type { InputListeners } from '../InputListeners/InputListeners';
import type { Config } from '../Config/Config';
import type { InputChanger } from '../InputChanger/InputChanger';
import { isMaskEquals } from '../Common/utils/isMaskEquals';
import { RAWMASK_INPUT_ATTRIBUTE } from '../Common/utils/constants';

export class Rawmask implements IRawmask {
  private $input: HTMLInputElement;

  private chars: Chars;

  private listeners: InputListeners;

  private config: Config;

  private inputChanger: InputChanger;

  public constructor(
    $input: HTMLInputElement,
    chars: Chars,
    listeners: InputListeners,
    config: Config,
    inputChanger: InputChanger,
  ) {
    this.$input = $input;
    this.chars = chars;
    this.listeners = listeners;
    this.config = config;
    this.inputChanger = inputChanger;

    this.init();
  }

  public get rawValue(): string {
    return this.chars.stringifyChangeable();
  }

  public set rawValue(value: string) {
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
    if (isMaskEquals(mask, this.config.mask)) {
      return;
    }

    const prevRawValue = this.rawValue;

    this.config.updateMask(mask);
    this.chars.reset();

    this.rawValue = prevRawValue;
  }

  public on<Name extends keyof HTMLElementEventMap>(
    name: Name,
    handler: (
      this: Rawmask,
      rawmask: Rawmask,
      event: HTMLElementEventMap[Name],
    ) => void,
  ): Rawmask {
    this.listeners.on(name, (event) => handler.call(this, this, event));

    return this;
  }

  public off(name: keyof HTMLElementEventMap): void {
    this.listeners.off(name);
  }

  public destroy(): void {
    this.listeners.destroy();
    this.$input.value = '';
    this.$input.removeAttribute(RAWMASK_INPUT_ATTRIBUTE);
  }

  private init(): void {
    this.config.init();
    this.listeners.init();
    this.chars.init();
    this.$input.value = this.chars.stringify();
  }
}
