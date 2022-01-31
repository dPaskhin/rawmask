import type { InputConfig } from '@src/InputConfig/InputConfig';
import type { CharsPreparer } from '@src/Chars/services/CharsPreparer';
import type { IChar } from '@src/Chars/types/IChar';
import type { CharsStringifier } from '@src/Chars/services/CharsStringifier';
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
    private readonly charsStringifier: CharsStringifier,
  ) {
    this.chars = charsPreparer.prepare();
    this.firstMutableIndex = this.getFirstMutableIndex();
    this.lastMutableIndex = this.getLastMutableIndex();
    this.length = this.chars.length;

    this.insertValue([...inputConfig.defaultValue], this.firstMutableIndex);
  }

  public stringify(): string {
    return this.charsStringifier.stringify(this.chars, this.firstMutableIndex);
  }

  public mutableStringify(): string {
    return this.charsStringifier.mutableStringify(this.chars);
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
    const possibleIndex = this.chars.findIndex((char) => !char.isPermanent);

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
