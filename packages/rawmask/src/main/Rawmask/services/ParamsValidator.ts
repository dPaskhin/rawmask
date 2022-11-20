import type { IRawmaskOptions } from 'rawmask';
import { TextInputMaskError } from '../../Common/errors/TextInputMaskError';
import { BaseType } from '../../Common/enums/BaseType';

export class ParamsValidator {
  public static validate(
    $input: unknown,
    mask: unknown,
    options?: unknown,
  ): void | never {
    if (!($input instanceof Element || typeof $input === 'string')) {
      throw new TextInputMaskError("input DOM element wasn't passed");
    }

    if ($input instanceof Element && !($input instanceof HTMLInputElement)) {
      throw new TextInputMaskError(
        `${$input.constructor.name} was passed instead of HTMLInputElement element`,
      );
    }

    ParamsValidator.maskValidate(mask);

    if (options === undefined) {
      return;
    }

    if (typeof options !== 'object' || options === null) {
      throw new TextInputMaskError('options should be an object');
    }

    const optionsTypes: Record<keyof IRawmaskOptions, BaseType> = {
      maskPlaceholder: BaseType.STRING,
      defaultRawValue: BaseType.STRING,
      defaultValue: BaseType.STRING,
      formatChars: BaseType.OBJECT,
    };
    const rawmaskOptions: IRawmaskOptions = options;

    for (const [key, type] of Object.entries(optionsTypes)) {
      const optionName = key as keyof IRawmaskOptions;

      if (rawmaskOptions[optionName] === undefined) {
        continue;
      }

      if (typeof rawmaskOptions[optionName] !== type) {
        throw new TextInputMaskError(
          `incorrect option "${key}" type: ${typeof rawmaskOptions[
            optionName
          ]}`,
        );
      }
    }
  }

  private static maskValidate(mask: unknown): never | void {
    if (typeof mask !== 'string' && !Array.isArray(mask)) {
      throw new TextInputMaskError(
        'mask should be a string or an array of strings or RegExp',
      );
    }

    if (
      mask.length === 0 ||
      (Array.isArray(mask) && mask.length === 1 && mask[0] === '')
    ) {
      throw new TextInputMaskError("mask shouldn't be empty");
    }

    if (typeof mask === 'string') {
      return;
    }

    if (
      !mask.every((item) => typeof item === 'string' || item instanceof RegExp)
    ) {
      throw new TextInputMaskError(
        'array mask should has only strings or RegExp',
      );
    }
  }
}
