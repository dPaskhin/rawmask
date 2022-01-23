export class InputValue {
  public constructor(private readonly $input: HTMLInputElement) {}

  public get value(): string {
    return this.$input.value;
  }

  public set value(value: string) {
    this.$input.value = value;
  }
}
