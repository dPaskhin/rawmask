import type { Chars } from '../Chars/Chars';
import type { SelectionRange } from '../SelectionRange/SelectionRange';

export class InputChanger {
  public constructor(
    private readonly $input: HTMLInputElement,
    private readonly chars: Chars,
    private readonly selectionRange: SelectionRange,
  ) {}

  public change(rawValue: string): void {
    const cursorPosition = this.processChange(rawValue);

    this.$input.value = this.chars.stringify();
    this.selectionRange.update(cursorPosition);
  }

  public fullChange(rawValue: string): void {
    if (rawValue === this.chars.stringify()) {
      return;
    }

    this.chars.changeAllChars(rawValue);

    this.$input.value = this.chars.stringify();
    this.selectionRange.update(this.selectionRange.previous.start);
  }

  public onlyChangeableChange(value: string): void {
    if (value === this.chars.stringifyChangeable()) {
      return;
    }

    this.chars.clear();
    this.chars.insertValue(value, this.chars.firstChangeableIndex);

    this.$input.value = this.chars.stringify();
    this.selectionRange.update(this.selectionRange.previous.start);
  }

  private processChange(rawValue: string): number {
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
    rawValue: string,
  ): number {
    this.chars.deleteValue(rangeStart, rangeEnd);

    const valuesDiffLength = rawValue.length - this.chars.length;

    const diff = rawValue.slice(rangeStart, rangeEnd + valuesDiffLength);

    if (diff.length === 0) {
      const char = this.chars.charAt(rangeStart);

      return char?.nearChangeable.left === undefined
        ? this.chars.firstChangeableIndex
        : rangeStart;
    }

    const lastInsertedChar = this.chars.insertValue(diff, rangeStart);

    return this.chars.getRightChangeableChar(rangeStart, lastInsertedChar);
  }

  private processRightDeleteChange(curCursorPosition: number): number {
    this.chars.deleteValue(curCursorPosition);

    return this.chars.getLeftChangeableChar(curCursorPosition);
  }

  private processAddedValueChange(
    prevCursorPosition: number,
    curCursorPosition: number,
    rawValue: string,
  ): number {
    const diff = rawValue.slice(prevCursorPosition, curCursorPosition);

    const lastInsertedChar = this.chars.insertValue(diff, prevCursorPosition);

    return this.chars.getRightChangeableChar(
      prevCursorPosition,
      lastInsertedChar,
    );
  }

  private processSingleDelete(curCursorPosition: number): number {
    const charToDelete = this.chars.charAt(curCursorPosition);

    if (!charToDelete) {
      return curCursorPosition;
    }

    if (charToDelete.permanent && charToDelete.nearChangeable.left) {
      this.chars.deleteValue(charToDelete.nearChangeable.left.index);

      return charToDelete.nearChangeable.left.index;
    }

    this.chars.deleteValue(curCursorPosition);

    if (charToDelete.nearChangeable.left === undefined) {
      return this.chars.firstChangeableIndex;
    }

    return charToDelete.nearChangeable.left.index + 1;
  }

  private processMultiDelete(
    prevCursorPosition: number,
    curCursorPosition: number,
  ): number {
    this.chars.deleteValue(curCursorPosition, prevCursorPosition);

    return this.chars.getLeftChangeableChar(curCursorPosition);
  }
}
