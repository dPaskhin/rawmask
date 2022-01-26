import { TDirection } from '@src/types/TDirection';
import { findLastIndex } from '@src/utils/findLastIndex';
import { InputMask } from '@src/entities/InputMask';
import { createArrayFromRange } from '@src/utils/createArrayFromRange';

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
    a: /[A-Za-z]/,
    '*': /./,
  };

  public constructor(private readonly inputMask: InputMask, initialValue = '') {
    this.chars = this.basePrepareChars(
      inputMask.mask,
      inputMask.maskPlaceholder,
    );
    this.firstMutableCharIndex = this.getFirstMutableCharIndex();
    this.lastMutableCharIndex = this.getLastMutableCharIndex();

    this.insertValue([...initialValue], this.firstMutableCharIndex);
  }

  public stringify(): string {
    return this.chars.map(({ value }) => value).join('');
  }

  public mutableStringify(): string {
    const result: string[] = [];

    for (const char of this.chars) {
      if (char.isPermanent || char.value === this.inputMask.maskPlaceholder) {
        continue;
      }

      result.push(char.value);
    }

    return result.join('');
  }

  public charAt(index: number): IChar | undefined {
    return this.chars[index];
  }

  /**
   * @return IChar|undefined (IChar - (last inserted char) if input was succeeded, undefined - if wasn't)
   */
  public insertValue(
    value: string[],
    insertIndex: number,
    prevInsertedChar?: IChar,
  ): IChar | undefined {
    const candidateChar = this.charAt(insertIndex);

    if (!candidateChar) {
      return prevInsertedChar;
    }

    for (let i = 0; i < value.length; i += 1) {
      const valueChar = value[i];

      if (!valueChar) {
        return prevInsertedChar;
      }

      if (candidateChar.isPermanent) {
        return this.insertValue(value, insertIndex + 1, prevInsertedChar);
      }

      if (!candidateChar.regexp?.test(valueChar)) {
        continue;
      }

      candidateChar.value = valueChar;

      const restValue = value.slice(i + 1);

      if (restValue.length === 0) {
        return candidateChar;
      }

      return this.insertValue(restValue, insertIndex + 1, candidateChar);
    }

    return prevInsertedChar;
  }

  public deleteValue(from: number, to = from): void {
    const range = from === to ? [from] : createArrayFromRange([from, to]);

    for (const index of range) {
      const candidateChar = this.charAt(index);

      if (!candidateChar || candidateChar.isPermanent) {
        continue;
      }

      candidateChar.value = this.inputMask.maskPlaceholder;
    }
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

  private basePrepareChars(mask: string, maskPlaceholder: string): IChar[] {
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
