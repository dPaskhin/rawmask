import { InputMask } from '@src/entities/InputMask';
import { Chars } from '@src/entities/Chars';
import { SelectionRange } from '@src/entities/SelectionRange';
import { InputValue } from '@src/entities/InputValue';
import { InputChanger } from '@src/entities/InputChanger';
import { InputListeners } from '@src/entities/InputListeners';

export class MaskedInput {
  public constructor(
    private readonly inputMask: InputMask,
    private readonly chars: Chars,
    private readonly selectionRange: SelectionRange,
    private readonly value: InputValue,
    private readonly changer: InputChanger,
    private readonly listeners: InputListeners,
  ) {
    this.init();
  }

  public on<Name extends keyof HTMLElementEventMap = keyof HTMLElementEventMap>(
    name: Name,
    handler: (event: HTMLElementEventMap[Name]) => void,
  ): MaskedInput {
    this.listeners.on(name, handler);

    return this;
  }

  public off(name: keyof HTMLElementEventMap): void {
    this.listeners.off(name);
  }

  public destroy(): void {
    this.listeners.destroy();
  }

  private init(): void {
    this.listeners.init();
  }
}
