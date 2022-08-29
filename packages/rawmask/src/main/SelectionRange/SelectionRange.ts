import type { Chars } from '../Chars/Chars';

interface ISelectionRange {
  start: number;
  end: number;
}

export class SelectionRange {
  public previous: ISelectionRange = {
    start: 0,
    end: 0,
  };

  public constructor(
    private readonly $input: HTMLInputElement,
    private readonly chars: Chars,
  ) {}

  public get range(): ISelectionRange {
    return {
      start: this.$input.selectionStart || 0,
      end: this.$input.selectionEnd || 0,
    };
  }

  private set range({ start, end }: ISelectionRange) {
    this.$input.setSelectionRange(start, end);
  }

  public update(value: number): void {
    this.range = {
      start: this.getSafeSelectionPoint(value),
      end: this.getSafeSelectionPoint(value),
    };
    this.previous = {
      start: this.getSafeSelectionPoint(value),
      end: this.getSafeSelectionPoint(value),
    };
  }

  public syncPrevious(): void {
    this.previous = this.range;
  }

  private getSafeSelectionPoint(value: number): number {
    if (value < 0) {
      return 0;
    }

    if (value > this.chars.length) {
      return this.chars.length;
    }

    return value;
  }
}
