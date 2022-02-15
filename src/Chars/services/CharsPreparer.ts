import type { InputConfig } from '@src/InputConfig/InputConfig';
import type { TDirection } from '@src/Common/types/TDirection';
import type { IChar } from '@src/Chars/types/IChar';

export class CharsPreparer {
  private readonly FORMAT_CHARS: Partial<Record<string, RegExp>> = {
    '9': /\d/,
    a: /[A-Za-z]/,
    '*': /./,
  };

  public constructor(private readonly inputConfig: InputConfig) {}

  public prepare(): IChar[] {
    const chars = this.basePrepare();

    for (const [idx, char] of chars.entries()) {
      char.nearMutable = {
        left: this.findNearMutable(chars, idx, 'left'),
        right: this.findNearMutable(chars, idx, 'right'),
      };
    }

    return chars;
  }

  private basePrepare(): IChar[] {
    return [...this.inputConfig.mask].map((maskChar, idx) => {
      if (maskChar instanceof RegExp) {
        return {
          index: idx,
          value: this.inputConfig.maskPlaceholder,
          regexp: maskChar,
          isPermanent: false,
          nearMutable: {},
        };
      }

      const charRegexp = this.FORMAT_CHARS[maskChar];
      const isPermanent = !charRegexp;

      return {
        index: idx,
        value: isPermanent ? maskChar : this.inputConfig.maskPlaceholder,
        regexp: charRegexp,
        isPermanent,
        nearMutable: {},
      };
    });
  }

  private findNearMutable(
    chars: IChar[],
    currentIndex: number,
    direction: TDirection,
  ): IChar | undefined {
    const checkingIndex = currentIndex + (direction === 'left' ? -1 : 1);

    if (checkingIndex < 0 || checkingIndex > chars.length - 1) {
      return undefined;
    }

    const char = chars[checkingIndex];

    if (!char) {
      return undefined;
    }

    if (!char.isPermanent) {
      return char;
    }

    return this.findNearMutable(chars, checkingIndex, direction);
  }
}
