export class InputMask {
  public readonly maskPlaceholder!: string;

  public constructor(public readonly mask = '', maskPlaceholder?: string) {
    this.maskPlaceholder = InputMask.preparePlaceholder(maskPlaceholder);
  }

  private static preparePlaceholder(value?: string): string {
    if (value === undefined) {
      return '_';
    }

    if (value === null) {
      return ' ';
    }

    return value;
  }
}
