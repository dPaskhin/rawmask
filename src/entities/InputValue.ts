import { Chars } from '@src/entities/Chars';

export class InputValue {
  public constructor(
    private readonly $input: HTMLInputElement,
    private readonly chars: Chars,
  ) {
    this.setFromChars();
  }

  public get value(): string {
    return this.$input.value;
  }

  public set value(value: string) {
    this.$input.value = value;
  }

  public setFromChars(): void {
    this.value = this.chars.chars.map(({ value }) => value).join('');
  }
}
