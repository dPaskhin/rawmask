import type { InputConfig } from '@src/InputConfig/InputConfig';
import type { CharsPreparer } from '@src/Chars/services/CharsPreparer';
import type { IChar } from '@src/Chars/types/IChar';
import type { CharsStringifier } from '@src/Chars/services/CharsStringifier';
import type { IInitiated } from '@src/Common/types/utils/IInitiated';
import { findLastIndex } from '@src/Common/utils/findLastIndex';
import { CharsValueModifier } from '@src/Chars/services/CharsValueModifier';

export class Chars implements IInitiated {
  public firstChangeableIndex!: number;

  public lastChangeableIndex!: number;

  public length!: number;

  private items!: IChar[];

  public constructor(
    private readonly charsPreparer: CharsPreparer,
    private readonly inputConfig: InputConfig,
    private readonly charsStringifier: CharsStringifier,
    private readonly charsValueModifier: CharsValueModifier,
  ) {}

  public init(): void {
    this.baseInit();
    this.insertValue(this.inputConfig.defaultValue, this.firstChangeableIndex);
  }

  public baseInit(): void {
    this.items = this.charsPreparer.prepare();
    this.firstChangeableIndex = this.getFirstChangeableIndex();
    this.lastChangeableIndex = this.getLastChangeableIndex();
    this.length = this.items.length;
  }

  public stringify(): string {
    return this.charsStringifier.stringify(
      this.items,
      this.firstChangeableIndex,
    );
  }

  public stringifyChangeable(): string {
    return this.charsStringifier.stringifyChangeable(this.items);
  }

  public charAt(index: number): IChar | undefined {
    return this.items[index];
  }

  public clear(): void {
    this.charsValueModifier.clear(this.items);
  }

  public insertValue(value: string, insertIndex: number): IChar | undefined {
    return this.charsValueModifier.insertValue(this.items, value, insertIndex);
  }

  public deleteValue(from: number, to?: number): void {
    this.charsValueModifier.deleteValue(this.items, from, to);
  }

  public changeAllChars(value: string): void {
    this.charsValueModifier.changeAllChars(this.items, value);
  }

  private getFirstChangeableIndex(): number {
    const possibleIndex = this.items.findIndex((char) => !char.permanent);

    if (possibleIndex === -1) {
      return 0;
    }

    return possibleIndex;
  }

  private getLastChangeableIndex(): number {
    const possibleIndex = findLastIndex(
      this.items,
      ({ permanent }) => !permanent,
    );

    if (possibleIndex === -1) {
      return this.items.length - 1;
    }

    return possibleIndex;
  }
}
