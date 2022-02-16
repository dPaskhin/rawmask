import type { Chars } from '@src/Chars/Chars';
import type { InputListeners } from '@src/InputListeners/InputListeners';
import type { TMask } from '@src/Common/types/TMask';
import type { InputConfig } from '@src/InputConfig/InputConfig';
import type { CharsPreparer } from '@src/Chars/services/CharsPreparer';
import { SelectionRange } from '@src/SelectionRange/SelectionRange';

export class MaskedInput {
  #$input: HTMLInputElement;

  #chars: Chars;

  #listeners: InputListeners;

  #config: InputConfig;

  #charsPreparer: CharsPreparer;

  #selectionRange: SelectionRange;

  public constructor(
    $input: HTMLInputElement,
    chars: Chars,
    listeners: InputListeners,
    config: InputConfig,
    charsPreparer: CharsPreparer,
    selectionRange: SelectionRange,
  ) {
    this.#$input = $input;
    this.#chars = chars;
    this.#listeners = listeners;
    this.#config = config;
    this.#charsPreparer = charsPreparer;
    this.#selectionRange = selectionRange;

    this.init();
  }

  public get unmaskedValue(): string {
    return this.#chars.mutableStringify();
  }

  public set mask(mask: TMask) {
    const prevUnmaskedValue = this.unmaskedValue;

    this.#config.mask = mask;
    this.#chars.chars = this.#charsPreparer.prepare();
    const lastInsertedChar = this.#chars.insertValue(
      [...prevUnmaskedValue],
      this.#chars.firstMutableIndex,
    );

    this.#$input.value = this.#chars.stringify();
    this.#selectionRange.update(
      (lastInsertedChar?.index || this.#chars.lastMutableIndex) + 1,
    );
  }

  public on<Name extends keyof HTMLElementEventMap>(
    name: Name,
    handler: (
      this: MaskedInput,
      masked: MaskedInput,
      event: HTMLElementEventMap[Name],
    ) => void,
  ): MaskedInput {
    this.#listeners.on(name, (event) => handler.call(this, this, event));

    return this;
  }

  public off(name: keyof HTMLElementEventMap): void {
    this.#listeners.off(name);
  }

  public destroy(): void {
    this.#listeners.destroy();
    this.#$input.value = '';
  }

  private init(): void {
    this.#listeners.init();
    this.#$input.value = this.#chars.stringify();
  }
}
