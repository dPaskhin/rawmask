import { IMaskedOptions } from '@src/Common/types/IMaskedOptions';
import { TextInputMaskError } from '@src/Common/errors/TextInputMaskError';
import { BaseType } from '@src/Common/enums/BaseType';

export class ParamsValidator {
  public static validate(
    $input: unknown,
    mask: unknown,
    options?: unknown,
  ): void | never {
    if (!($input instanceof HTMLInputElement)) {
      throw new TextInputMaskError("input DOM element wasn't passed");
    }

    if (typeof mask !== 'string') {
      throw new TextInputMaskError('mask should be string');
    }

    if (mask === '') {
      throw new TextInputMaskError("mask shouldn't be empty");
    }

    if (options === undefined) {
      return;
    }

    if (typeof options !== 'object' || options === null) {
      throw new TextInputMaskError('options should be an object');
    }

    const optionsTypes: Record<keyof IMaskedOptions, BaseType> = {
      maskPlaceholder: BaseType.STRING,
      defaultValue: BaseType.STRING,
    };
    const maskedOptions: IMaskedOptions = options;

    for (const [key, type] of Object.entries(optionsTypes)) {
      const optionName = key as keyof IMaskedOptions;

      if (maskedOptions[optionName] === undefined) {
        continue;
      }

      if (typeof maskedOptions[optionName] !== type) {
        throw new TextInputMaskError(
          `incorrect option "${key}" type: ${typeof maskedOptions[optionName]}`,
        );
      }
    }
  }
}
