import { IChar } from '@src/Chars/types/IChar';
import { InputConfig } from '@src/InputConfig/InputConfig';

export class CharsStringifier {
  public constructor(private readonly inputConfig: InputConfig) {}

  public stringify(chars: IChar[], firstChangeableIndex: number): string {
    if (this.inputConfig.maskPlaceholder === '') {
      return CharsStringifier.stringifyWithEmptyPlaceholder(
        chars,
        firstChangeableIndex,
      );
    }

    return chars.map(({ value }) => value).join('');
  }

  public stringifyChangeable(chars: IChar[]): string {
    const result: string[] = [];

    for (const char of chars) {
      if (char.permanent || char.value === this.inputConfig.maskPlaceholder) {
        continue;
      }

      result.push(char.value);
    }

    return result.join('');
  }

  private static stringifyWithEmptyPlaceholder(
    chars: IChar[],
    firstChangeableIndex: number,
  ): string {
    const result = [];

    for (const [index, char] of chars.entries()) {
      if (index < firstChangeableIndex) {
        result.push(char.value);

        continue;
      }

      if (char.permanent && char.nearChangeable.right?.value === '') {
        break;
      }

      if (char.value !== '') {
        result.push(char.value);

        continue;
      }

      break;
    }

    return result.join('');
  }
}
