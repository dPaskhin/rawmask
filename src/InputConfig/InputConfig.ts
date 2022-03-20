import type { IMaskedOptions } from '@src/Common/types/IMaskedOptions';
import type { TMask } from '@src/Common/types/TMask';

export class InputConfig {
  public maskPlaceholder!: string;

  public defaultValue!: string;

  public constructor(public mask: TMask, private options?: IMaskedOptions) {}

  public init(): void {
    this.maskPlaceholder = InputConfig.preparePlaceholder(
      this.options?.maskPlaceholder,
    );
    this.defaultValue = this.options?.defaultValue || '';
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
