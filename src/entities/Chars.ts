import { TDirection } from '@src/types/TDirection';
import { findLastIndex } from '@src/utils/findLastIndex';
import { InputMask } from '@src/entities/InputMask';

export interface IChar {
  value: string;
  isPermanent: boolean;
  nearMutable: Partial<Record<TDirection, number>>;
  regexp?: RegExp;
}

export class Chars {
  public readonly chars!: IChar[];

  public readonly firstMutableCharIndex!: number;

  public readonly lastMutableCharIndex!: number;

  private readonly FORMAT_CHARS: Partial<Record<string, RegExp>> = {
    '9': /\d/,
    a: /\w/,
    '*': /./,
  };

  public constructor(private readonly inputMask: InputMask) {
    this.chars = this.prepareChars(inputMask.mask, inputMask.maskPlaceholder);
    this.firstMutableCharIndex = this.getFirstMutableCharIndex();
    this.lastMutableCharIndex = this.getLastMutableCharIndex();
  }

  public stringify(): string {
    return this.chars.map(({ value }) => value).join('');
  }

  public mutableStringify(): string {
    const result: string[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const char of this.chars) {
      if (char.isPermanent || char.value === this.inputMask.maskPlaceholder) {
        // eslint-disable-next-line no-continue
        continue;
      }

      result.push(char.value);
    }

    return result.join('');
  }

  public charAt(index: number): IChar | undefined {
    return this.chars[index];
  }

  private findMutable(
    rawChars: string[],
    currentIndex: number,
    direction: TDirection,
  ): number | undefined {
    const checkingIndex = currentIndex + (direction === 'left' ? -1 : 1);

    if (checkingIndex < 0 || checkingIndex > rawChars.length - 1) {
      return undefined;
    }

    const rawChar = rawChars[checkingIndex];

    if (!rawChar) {
      return undefined;
    }

    const isMutable = this.FORMAT_CHARS[rawChar];

    if (isMutable) {
      return checkingIndex;
    }

    return this.findMutable(rawChars, checkingIndex, direction);
  }

  private prepareChars(mask: string, maskPlaceholder: string): IChar[] {
    return [...mask].map((char, idx, rawChars) => {
      const charRegexp = this.FORMAT_CHARS[char];
      const isPermanent = !charRegexp;

      return {
        value: isPermanent ? char : maskPlaceholder,
        regexp: charRegexp,
        isPermanent,
        nearMutable: {
          left: this.findMutable(rawChars, idx, 'left'),
          right: this.findMutable(rawChars, idx, 'right'),
        },
      };
    });
  }

  private getFirstMutableCharIndex(): number {
    const possibleIndex = this.chars.findIndex(
      ({ isPermanent }) => !isPermanent,
    );

    if (possibleIndex === -1) {
      return 0;
    }

    return possibleIndex;
  }

  private getLastMutableCharIndex(): number {
    const possibleIndex = findLastIndex(
      this.chars,
      ({ isPermanent }) => !isPermanent,
    );

    if (possibleIndex === -1) {
      return this.chars.length - 1;
    }

    return possibleIndex;
  }
}
