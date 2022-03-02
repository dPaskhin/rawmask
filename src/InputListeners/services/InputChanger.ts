import type { Chars } from '@src/Chars/Chars';
import type { SelectionRange } from '@src/SelectionRange/SelectionRange';
import type { IChar } from '@src/Chars/types/IChar';

export class InputChanger {
  public constructor(
    private readonly $input: HTMLInputElement,
    private readonly chars: Chars,
    private readonly selectionRange: SelectionRange,
  ) {}

  public change(rawValue: string): void {
    const cursorPosition = this.processChange([...rawValue]);

    this.$input.value = this.chars.stringify();
    this.selectionRange.update(cursorPosition);
  }

  public fullChange(rawValue: string): void {
    this.chars.insertMaskedValue(rawValue);

    this.$input.value = this.chars.stringify();
    this.selectionRange.update(this.selectionRange.previous.start);
  }

  private processChange(rawValue: string[]): number {
    if (
      this.selectionRange.previous.start !== this.selectionRange.previous.end
    ) {
      return this.processRangeChange(
        this.selectionRange.previous.start,
        this.selectionRange.previous.end,
        rawValue,
      );
    }

    const prevCursorPosition = this.selectionRange.previous.start;
    const curCursorPosition = this.selectionRange.range.start;

    if (curCursorPosition === prevCursorPosition) {
      return this.processRightDeleteChange(curCursorPosition);
    }

    if (curCursorPosition > prevCursorPosition) {
      return this.processAddedValueChange(
        prevCursorPosition,
        curCursorPosition,
        rawValue,
      );
    }

    if (prevCursorPosition - curCursorPosition > 1) {
      return this.processMultiDelete(prevCursorPosition, curCursorPosition);
    }

    return this.processSingleDelete(curCursorPosition);
  }

  private processRangeChange(
    rangeStart: number,
    rangeEnd: number,
    rawValue: string[],
  ): number {
    this.chars.deleteValue(rangeStart, rangeEnd);

    const valuesDiffLength = rawValue.length - this.chars.length;

    const diff = rawValue.slice(rangeStart, rangeEnd + valuesDiffLength);

    if (diff.length === 0) {
      const char = this.chars.charAt(rangeStart);

      return char?.nearMutable.left === undefined
        ? this.chars.firstMutableIndex
        : rangeStart;
    }

    const lastInsertedChar = this.chars.insertValue(diff, rangeStart);

    return this.getActualCursorPositionAfterInsert(
      rangeStart,
      lastInsertedChar,
    );
  }

  private processRightDeleteChange(curCursorPosition: number): number {
    this.chars.deleteValue(curCursorPosition);

    return this.getActualCursorPositionAfterDelete(curCursorPosition);
  }

  private processAddedValueChange(
    prevCursorPosition: number,
    curCursorPosition: number,
    rawValue: string[],
  ): number {
    const diff = rawValue.slice(prevCursorPosition, curCursorPosition);

    const lastInsertedChar = this.chars.insertValue(diff, prevCursorPosition);

    return this.getActualCursorPositionAfterInsert(
      prevCursorPosition,
      lastInsertedChar,
    );
  }

  private processSingleDelete(curCursorPosition: number): number {
    const charToDelete = this.chars.charAt(curCursorPosition);

    if (!charToDelete) {
      return curCursorPosition;
    }

    if (charToDelete.isPermanent && charToDelete.nearMutable.left) {
      this.chars.deleteValue(charToDelete.nearMutable.left.index);

      return charToDelete.nearMutable.left.index;
    }

    this.chars.deleteValue(curCursorPosition);

    if (charToDelete.nearMutable.left === undefined) {
      return this.chars.firstMutableIndex;
    }

    return charToDelete.nearMutable.left.index + 1;
  }

  private processMultiDelete(
    prevCursorPosition: number,
    curCursorPosition: number,
  ): number {
    this.chars.deleteValue(curCursorPosition, prevCursorPosition);

    return this.getActualCursorPositionAfterDelete(curCursorPosition);
  }

  private getActualCursorPositionAfterInsert(
    prevCursorPosition: number,
    lastInsertedChar?: IChar,
  ): number {
    if (lastInsertedChar?.nearMutable.right) {
      return lastInsertedChar.nearMutable.right.index;
    }

    if (lastInsertedChar) {
      return this.chars.lastMutableIndex + 1;
    }

    const prevCursorPositionChar = this.chars.charAt(prevCursorPosition);

    if (!prevCursorPositionChar) {
      return this.chars.lastMutableIndex + 1;
    }

    if (!prevCursorPositionChar.isPermanent) {
      return prevCursorPosition;
    }

    if (prevCursorPositionChar.nearMutable.right === undefined) {
      return this.chars.lastMutableIndex + 1;
    }

    return prevCursorPositionChar.nearMutable.right.index;
  }

  private getActualCursorPositionAfterDelete(
    curCursorPosition: number,
  ): number {
    const lastDeletedChar = this.chars.charAt(curCursorPosition);

    if (!lastDeletedChar) {
      return this.chars.firstMutableIndex;
    }

    if (
      lastDeletedChar.isPermanent &&
      lastDeletedChar.nearMutable.left === undefined
    ) {
      return this.chars.firstMutableIndex;
    }

    return curCursorPosition;
  }
}
