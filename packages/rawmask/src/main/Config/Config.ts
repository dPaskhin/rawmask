import type { IRawmaskOptions, TMask } from 'rawmask';
import type { IInitable } from '../Common/types/utils/IInitable';

export class Config implements IInitable {
  public maskPlaceholder!: string;

  public defaultRawValue!: string;

  public defaultValue!: string;

  public inputSize!: number;

  public constructor(public mask: TMask, private options?: IRawmaskOptions) {}

  public init(): void {
    this.maskPlaceholder = Config.preparePlaceholder(
      this.options?.maskPlaceholder,
    );
    this.defaultRawValue = this.options?.defaultRawValue || '';
    this.defaultValue = this.options?.defaultValue || '';
    this.inputSize = this.mask.length;
  }

  public updateMask(mask: TMask): void {
    this.mask = mask;
    this.inputSize = mask.length;
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
