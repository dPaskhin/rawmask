import type { IRawmaskOptions, TMask } from 'rawmask';
import type { IInitable } from '../Common/types/utils/IInitable';
import { TDetailedMask } from '../Common/types/TMask';
import { TFormatChars } from '../Common/types/TFormatChars';

export class Config implements IInitable {
  public readonly FORMAT_CHARS: TFormatChars;

  public maskPlaceholder!: string;

  public defaultRawValue!: string;

  public defaultValue!: string;

  public inputSize!: number;

  public mask!: TDetailedMask;

  public constructor(mask: TMask, private options?: IRawmaskOptions) {
    this.mask = Config.prepareMask(mask);
    this.FORMAT_CHARS = {
      '9': /\d/,
      a: /[A-Za-z]/,
      '*': /./,
      ...options?.formatChars,
    };
  }

  public init(): void {
    this.maskPlaceholder = Config.preparePlaceholder(
      this.options?.maskPlaceholder,
    );
    this.defaultRawValue = this.options?.defaultRawValue || '';
    this.defaultValue = this.options?.defaultValue || '';
    this.inputSize = this.mask.length;
  }

  public updateMask(mask: TMask): void {
    this.mask = Config.prepareMask(mask);
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

  private static prepareMask(mask: TMask): TDetailedMask {
    if (typeof mask !== 'string') {
      return mask;
    }

    const prepared: TDetailedMask = [];

    for (let i = 0; i < mask.length; i += 1) {
      const char = mask[i];

      if (char === '\\') {
        i += 1;
        prepared.push(`\\${mask[i]}`);

        continue;
      }

      prepared.push(char);
    }

    return prepared;
  }
}
