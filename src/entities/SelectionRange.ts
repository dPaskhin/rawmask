import { Chars } from '@src/entities/Chars';

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

  public set range({ start, end }: ISelectionRange) {
    requestAnimationFrame(() => {
      this.$input.setSelectionRange(start, end);
    });
  }

  public safeRangeSetter(value?: ISelectionRange | number): void {
    if (value === undefined) {
      this.range = {
        start: this.range.start,
        end: this.range.end,
      };

      return;
    }

    if (typeof value === 'number') {
      this.range = {
        start: this.getSafeSelectionPoint(value),
        end: this.getSafeSelectionPoint(value),
      };

      return;
    }

    this.range = value;
  }

  public syncPrevious(): void {
    this.previous = this.range;
  }

  public safePreviousSetter(value?: number): void {
    if (value === undefined) {
      this.previous = this.range;

      return;
    }

    this.previous = {
      start: this.getSafeSelectionPoint(value),
      end: this.getSafeSelectionPoint(value),
    };
  }

  private getSafeSelectionPoint(value: number): number {
    if (value < 0) {
      return 0;
    }

    if (value > this.chars.chars.length) {
      return this.chars.chars.length;
    }

    return value;
  }
}
