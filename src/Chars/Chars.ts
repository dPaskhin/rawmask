import type { InputConfig } from '@src/InputConfig/InputConfig';
import type { CharsPreparer } from '@src/Chars/services/CharsPreparer';
import type { IChar } from '@src/Chars/types/IChar';
import { findLastIndex } from '@src/Common/utils/findLastIndex';
import { createArrayFromRange } from '@src/Common/utils/createArrayFromRange';

export class Chars {
  public readonly firstMutableIndex!: number;

  public readonly lastMutableIndex!: number;

  public readonly length!: number;

  private readonly chars!: IChar[];

  public constructor(
    private readonly charsPreparer: CharsPreparer,
    private readonly inputConfig: InputConfig,
  ) {
    this.chars = charsPreparer.prepare();
    this.firstMutableIndex = this.getFirstMutableIndex();
    this.lastMutableIndex = this.getLastMutableIndex();
    this.length = this.chars.length;

    this.insertValue([...inputConfig.defaultValue], this.firstMutableIndex);
  }

  public stringify(): string {
    if (!this.inputConfig.maskPlaceholder) {
      const result = [];

      for (let i = 0; i < this.length; i += 1) {
        const char = this.charAt(i);

        if (!char) {
          continue;
        }

        const rightMutableChar =
          char.nearMutable.right !== undefined
            ? char.nearMutable.right
            : undefined;

        if (i < this.firstMutableIndex) {
          result.push(char.value);

          continue;
        }

        if (char.isPermanent && rightMutableChar?.value === '') {
          break;
        }

        if (this.chars[i]?.value !== '') {
          result.push(this.chars[i]?.value);
          continue;
        }

        break;
      }

      return result.join('');
    }

    return this.chars.map(({ value }) => value).join('');
  }

  public mutableStringify(): string {
    const result: string[] = [];

    for (const char of this.chars) {
      if (char.isPermanent || char.value === this.inputConfig.maskPlaceholder) {
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

      candidateChar.value = this.inputConfig.maskPlaceholder;
    }
  }

  private getFirstMutableIndex(): number {
    const possibleIndex = this.chars.findIndex(
      ({ isPermanent }) => !isPermanent,
    );

    if (possibleIndex === -1) {
      return 0;
    }

    return possibleIndex;
  }

  private getLastMutableIndex(): number {
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
