/**
 * Defines format characters with characters as a keys and corresponding RegExp strings as a values.
 *
 * @default { '9': /\d/, a: /[A-Za-z]/, '*': /./ }
 */
export type TFormatChars = Record<string, RegExp>;
