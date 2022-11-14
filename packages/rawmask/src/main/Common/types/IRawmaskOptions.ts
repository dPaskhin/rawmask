import { TFormatChars } from './TFormatChars';

export interface IRawmaskOptions {
  maskPlaceholder?: string;
  defaultRawValue?: string;
  defaultValue?: string;
  formatChars?: Partial<TFormatChars>;
}
