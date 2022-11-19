import { TFormatChars } from './TFormatChars';

export interface IRawmaskOptions {
  /**
   * Character to cover unfilled parts of the mask.
   * If set to empty string, unfilled parts will be empty as in ordinary input.
   *
   * @default "_".
   */
  maskPlaceholder?: string;
  /**
   * Default raw (unmasked) value of input.
   */
  defaultRawValue?: string;
  /**
   * Default masked value of input.
   */
  defaultValue?: string;
  /**
   * Defines format characters with characters as a keys and corresponding RegExp strings as a values.
   *
   * @default { '9': /\d/, a: /[A-Za-z]/, '*': /./ }
   */
  formatChars?: Partial<TFormatChars>;
}
