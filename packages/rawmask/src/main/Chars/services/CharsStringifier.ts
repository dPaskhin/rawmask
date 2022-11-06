import { IChar } from '../types/IChar';
import { Config } from '../../Config/Config';

export class CharsStringifier {
  public constructor(private readonly inputConfig: Config) {}

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
