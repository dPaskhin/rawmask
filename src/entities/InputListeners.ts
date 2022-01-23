import { SelectionRange } from '@src/entities/SelectionRange';
import { InputChanger } from '@src/entities/InputChanger';
import { InputValue } from '@src/entities/InputValue';
import { Chars } from '@src/entities/Chars';

export class InputListeners {
  private userListenersMap: Array<{
    name: keyof HTMLElementEventMap;
    // eslint-disable-next-line @typescript-eslint/method-signature-style
    handler(event: HTMLElementEventMap[keyof HTMLElementEventMap]): void;
  }> = [];

  public constructor(
    private readonly $input: HTMLInputElement,
    private readonly selectionRange: SelectionRange,
    private readonly inputChanger: InputChanger,
    private readonly inputValue: InputValue,
    private readonly chars: Chars,
  ) {}

  public init(): void {
    this.$input.addEventListener('input', this.onInput);
    document.addEventListener('selectionchange', this.onSelectionChange);
  }

  public destroy(): void {
    for (const listener of this.userListenersMap) {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.$input.removeEventListener(listener.name, listener.handler);
    }

    this.userListenersMap = [];

    this.$input.removeEventListener('input', this.onInput);
    document.removeEventListener('selectionchange', this.onSelectionChange);
  }

  public on<Name extends keyof HTMLElementEventMap>(
    name: Name,
    handler: (event: HTMLElementEventMap[Name]) => void,
  ): void {
    this.userListenersMap.push({ name, handler });

    this.$input.addEventListener(name, handler);
  }

  public off(name: keyof HTMLElementEventMap): void {
    const updatedUserListeners = [];

    for (const userListener of this.userListenersMap) {
      if (name !== userListener.name) {
        updatedUserListeners.push(userListener);

        continue;
      }

      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.$input.removeEventListener(userListener.name, userListener.handler);
    }

    this.userListenersMap = updatedUserListeners;
  }

  private onInput = (): void => {
    const cursorPosition =
      this.selectionRange.previous.start === this.selectionRange.previous.end
        ? this.inputChanger.processSingleChange()
        : this.inputChanger.processMultiChange();

    this.inputValue.value = this.chars.stringify();
    this.selectionRange.update(cursorPosition);
  };

  private onSelectionChange = (): void => {
    this.selectionRange.syncPrevious();
  };
}
