import { IMaskedOptions } from '@src/Common/types/IMaskedOptions';
import { TextInputMaskError } from '@src/Common/errors/TextInputMaskError';
import { BaseType } from '@src/Common/enums/BaseType';

export class ParamsValidator {
  public static validate(
    $input: HTMLInputElement,
    options?: IMaskedOptions,
  ): void | never {
    if (!($input instanceof HTMLInputElement)) {
      throw new TextInputMaskError("input DOM element wasn't passed");
    }

    if (options === undefined) {
      return;
    }

    if (typeof options !== 'object' || options === null) {
      throw new TextInputMaskError('options should be an object');
    }

    const optionsTypes: Record<keyof IMaskedOptions, BaseType> = {
      mask: BaseType.STRING,
      maskPlaceholder: BaseType.STRING,
      defaultValue: BaseType.STRING,
    };

    for (const [key, type] of Object.entries(optionsTypes)) {
      const optionName = key as keyof IMaskedOptions;

      if (options[optionName] === undefined) {
        continue;
      }

      if (typeof options[optionName] !== type) {
        throw new TextInputMaskError(
          `incorrect option "${key}" type: ${typeof options[optionName]}`,
        );
      }
    }
  }
}
