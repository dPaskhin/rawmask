import type { IMaskedOptions } from '@src/Common/types/IMaskedOptions';
import type { TMask } from '@src/Common/types/TMask';
import type { IInitiated } from '@src/Common/types/utils/IInitiated';

export class InputConfig implements IInitiated {
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
