import type { Config } from '../../Config/Config';
import type { TDirection } from '../../Common/types/TDirection';
import type { IChar } from '../types/IChar';

export class CharsPreparer {
  private readonly FORMAT_CHARS: Partial<Record<string, RegExp>> = {
    '9': /\d/,
    a: /[A-Za-z]/,
    '*': /./,
  };

  public constructor(private readonly inputConfig: Config) {}

  public prepare(): IChar[] {
    const chars = this.basePrepare();

    for (const [idx, char] of chars.entries()) {
      char.nearChangeable = {
        left: this.findNearChangeable(chars, idx, 'left'),
        right: this.findNearChangeable(chars, idx, 'right'),
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
          permanent: false,
          nearChangeable: {},
        };
      }

      const charRegexp = this.FORMAT_CHARS[maskChar];
      const permanent = !charRegexp;

      return {
        index: idx,
        value: permanent ? maskChar : this.inputConfig.maskPlaceholder,
        regexp: charRegexp,
        permanent,
        nearChangeable: {},
      };
    });
  }

  private findNearChangeable(
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

    if (!char.permanent) {
      return char;
    }

    return this.findNearChangeable(chars, checkingIndex, direction);
  }
}
