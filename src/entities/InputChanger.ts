import { createArrayFromRange } from '@src/utils/createArrayFromRange';
import { Chars } from '@src/entities/Chars';
import { SelectionRange } from '@src/entities/SelectionRange';
import { InputMask } from '@src/entities/InputMask';

export class InputChanger {
  public constructor(
    private readonly $input: HTMLInputElement,
    private readonly chars: Chars,
    private readonly selectionRange: SelectionRange,
    private readonly inputMask: InputMask,
  ) {}

  public processSingleChange(): number {
    const rawValue = [...this.$input.value];
    const prevCursorPosition = this.selectionRange.previous.start;
    const curCursorPosition = this.selectionRange.range.start;

    if (curCursorPosition > prevCursorPosition) {
      const diff = rawValue.slice(prevCursorPosition, curCursorPosition);

      const insertedPosition = this.insertCharValuesInChars(
        diff,
        prevCursorPosition,
      );

      if (insertedPosition === undefined) {
        return this.chars.lastMutableCharIndex + 1;
      }

      const lastInsertedChar = this.chars.charAt(insertedPosition);

      if (
        !lastInsertedChar ||
        lastInsertedChar.nearMutable.right === undefined
      ) {
        return this.chars.lastMutableCharIndex + 1;
      }

      return lastInsertedChar.nearMutable.right;
    }

    if (curCursorPosition === prevCursorPosition) {
      this.deleteCharValuesFromChars([curCursorPosition]);

      return curCursorPosition;
    }

    const charToDelete = this.chars.charAt(curCursorPosition);

    if (!charToDelete) {
      return curCursorPosition;
    }

    const deleteCharIndexes = [curCursorPosition];

    if (charToDelete.isPermanent && charToDelete.nearMutable.left) {
      deleteCharIndexes.push(charToDelete.nearMutable.left);
    }

    this.deleteCharValuesFromChars(deleteCharIndexes);

    if (charToDelete.nearMutable.left === undefined) {
      return this.chars.firstMutableCharIndex;
    }

    return !charToDelete.isPermanent
      ? charToDelete.nearMutable.left + 1
      : charToDelete.nearMutable.left;
  }

  public processMultiChange(): number {
    const deleteRange = createArrayFromRange([
      this.selectionRange.previous.start,
      this.selectionRange.previous.end,
    ]);

    this.deleteCharValuesFromChars(deleteRange);

    const rawValue = [...this.$input.value];
    const valuesDiffLength = rawValue.length - this.chars.chars.length;

    const diff = rawValue.slice(
      this.selectionRange.previous.start,
      this.selectionRange.previous.end + valuesDiffLength,
    );

    if (diff.length === 0) {
      const char = this.chars.charAt(this.selectionRange.previous.start);

      return char?.nearMutable.left === undefined
        ? this.chars.firstMutableCharIndex
        : this.selectionRange.previous.start;
    }

    const insertedPosition = this.insertCharValuesInChars(
      diff,
      this.selectionRange.previous.start,
    );

    if (insertedPosition === undefined) {
      return this.chars.lastMutableCharIndex + 1;
    }

    const lastInsertedChar = this.chars.charAt(insertedPosition);

    if (!lastInsertedChar || lastInsertedChar.nearMutable.right === undefined) {
      return this.chars.lastMutableCharIndex + 1;
    }

    return lastInsertedChar.nearMutable.right;
  }

  private insertCharValuesInChars(
    value: string[],
    insertIndex: number,
  ): number | undefined {
    if (insertIndex > this.chars.chars.length - 1) {
      return undefined;
    }

    const candidateChar = this.chars.chars[insertIndex];

    if (!candidateChar) {
      return undefined;
    }

    if (candidateChar.isPermanent) {
      return this.insertCharValuesInChars(value, insertIndex + 1);
    }

    if (!value[0]) {
      return undefined;
    }

    [candidateChar.value] = value;

    const restValue = value.slice(1);

    if (restValue.length === 0) {
      return insertIndex;
    }

    return this.insertCharValuesInChars(restValue, insertIndex + 1);
  }

  private deleteCharValuesFromChars(range: number[]): void {
    // eslint-disable-next-line no-restricted-syntax
    for (const index of range) {
      const candidateChar = this.chars.charAt(index);

      if (!candidateChar || candidateChar.isPermanent) {
        // eslint-disable-next-line no-continue
        continue;
      }

      candidateChar.value = this.inputMask.maskPlaceholder;
    }
  }
}
