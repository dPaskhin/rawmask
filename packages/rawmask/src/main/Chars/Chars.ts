import type { Config } from '../Config/Config';
import type { CharsPreparer } from './services/CharsPreparer';
import type { IChar } from './types/IChar';
import type { CharsStringifier } from './services/CharsStringifier';
import type { IInitable } from '../Common/types/utils/IInitable';
import type { CharsValueChanger } from './services/CharsValueChanger';
import { findLastIndex } from '../Common/utils/findLastIndex';

export class Chars implements IInitable {
  public firstChangeableIndex!: number;

  public lastChangeableIndex!: number;

  public length!: number;

  private items!: IChar[];

  public constructor(
    private readonly charsPreparer: CharsPreparer,
    private readonly config: Config,
    private readonly charsStringifier: CharsStringifier,
    private readonly charsValueChanger: CharsValueChanger,
  ) {}

  public init(): void {
    this.reset();
    this.changeAllChars(this.config.defaultValue);
    this.insertValue(this.config.defaultRawValue, this.firstChangeableIndex);
  }

  public reset(): void {
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
    this.charsValueChanger.clear(this.items);
  }

  public insertValue(value: string, insertIndex: number): IChar | undefined {
    return this.charsValueChanger.insertValue(this.items, value, insertIndex);
  }

  public deleteValue(from: number, to?: number): void {
    this.charsValueChanger.deleteValue(this.items, from, to);
  }

  public changeAllChars(value: string): void {
    this.charsValueChanger.changeAllChars(this.items, value);
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
