import { IChar } from '@src/Chars/types/IChar';
import { InputConfig } from '@src/InputConfig/InputConfig';

export class CharsStringifier {
  public constructor(private readonly inputConfig: InputConfig) {}

  public stringify(chars: IChar[], firstMutableIndex: number): string {
    if (!this.inputConfig.maskPlaceholder) {
      return CharsStringifier.stringifyWithEmptyPlaceholder(
        chars,
        firstMutableIndex,
      );
    }

    return chars.map(({ value }) => value).join('');
  }

  public mutableStringify(chars: IChar[]): string {
    const result: string[] = [];

    for (const char of chars) {
      if (char.isPermanent || char.value === this.inputConfig.maskPlaceholder) {
        continue;
      }

      result.push(char.value);
    }

    return result.join('');
  }

  private static stringifyWithEmptyPlaceholder(
    chars: IChar[],
    firstMutableIndex: number,
  ): string {
    const result = [];

    for (const [index, char] of chars.entries()) {
      if (index < firstMutableIndex) {
        result.push(char.value);

        continue;
      }

      if (char.isPermanent && char.nearMutable.right?.value === '') {
        break;
      }

      if (char.value) {
        result.push(char.value);

        continue;
      }

      break;
    }

    return result.join('');
  }
}
