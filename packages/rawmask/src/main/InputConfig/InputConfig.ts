import type { IMaskedOptions, TMask } from 'rawmask';
import type { IInitable } from '../Common/types/utils/IInitable';

export class InputConfig implements IInitable {
  public maskPlaceholder!: string;

  public defaultValue!: string;

  public defaultMaskedValue!: string;

  public constructor(public mask: TMask, private options?: IMaskedOptions) {}

  public init(): void {
    this.maskPlaceholder = InputConfig.preparePlaceholder(
      this.options?.maskPlaceholder,
    );
    this.defaultValue = this.options?.defaultValue || '';
    this.defaultMaskedValue = this.options?.defaultMaskedValue || '';
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