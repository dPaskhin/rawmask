/* eslint-disable unicorn/no-array-for-each,@typescript-eslint/unbound-method,@typescript-eslint/method-signature-style */
import { SelectionRange } from '@src/entities/SelectionRange';
import { InputChanger } from '@src/entities/InputChanger';
import { InputValue } from '@src/entities/InputValue';

export class InputListeners {
  private readonly listenersMap: Array<{
    name: keyof HTMLElementEventMap;
    handler(event: HTMLElementEventMap[keyof HTMLElementEventMap]): void;
  }> = [
    { name: 'click', handler: this.onClick.bind(this) },
    { name: 'select', handler: this.onSelect.bind(this) },
    { name: 'keyup', handler: this.onKeyup.bind(this) },
    { name: 'input', handler: this.onInput.bind(this) },
  ];

  private userListenersMap: Array<{
    name: keyof HTMLElementEventMap;
    handler(event: HTMLElementEventMap[keyof HTMLElementEventMap]): void;
  }> = [];

  public constructor(
    private readonly $input: HTMLInputElement,
    private readonly selectionRange: SelectionRange,
    private readonly inputChanger: InputChanger,
    private readonly inputValue: InputValue,
  ) {}

  public init(): void {
    this.listenersMap.forEach((listener) => {
      this.$input.addEventListener(listener.name, listener.handler);
    });
  }

  public destroy(): void {
    this.listenersMap.forEach((listener) => {
      this.$input.removeEventListener(listener.name, listener.handler);
    });

    this.userListenersMap.forEach((listener) => {
      this.$input.removeEventListener(listener.name, listener.handler);
    });

    this.userListenersMap = [];
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

    // eslint-disable-next-line no-restricted-syntax
    for (const userListener of this.userListenersMap) {
      if (name !== userListener.name) {
        updatedUserListeners.push(userListener);

        // eslint-disable-next-line no-continue
        continue;
      }

      this.$input.removeEventListener(userListener.name, userListener.handler);
    }

    this.userListenersMap = updatedUserListeners;
  }

  private onClick(): void {
    this.selectionRange.syncPrevious();
  }

  private onSelect(): void {
    this.selectionRange.syncPrevious();
  }

  private onKeyup(event: KeyboardEvent): void {
    if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
      this.selectionRange.syncPrevious();
    }
  }

  private onInput(): void {
    const possibleCursorPosition =
      this.selectionRange.previous.start === this.selectionRange.previous.end
        ? this.inputChanger.processSingleChange()
        : this.inputChanger.processMultiChange();

    this.selectionRange.safeRangeSetter(possibleCursorPosition);
    this.inputValue.setFromChars();
    this.selectionRange.safePreviousSetter(possibleCursorPosition);
  }
}

/* eslint-enable */
