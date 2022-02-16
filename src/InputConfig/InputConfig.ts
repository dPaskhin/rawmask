import type { IMaskedOptions } from '@src/Common/types/IMaskedOptions';
import type { TMask } from '@src/Common/types/TMask';

export class InputConfig {
  public mask: TMask;

  public readonly maskPlaceholder: string;

  public readonly defaultValue: string;

  public constructor(mask: TMask, options?: IMaskedOptions) {
    this.mask = mask;
    this.maskPlaceholder = InputConfig.preparePlaceholder(
      options?.maskPlaceholder,
    );
    this.defaultValue = options?.defaultValue || '';
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
