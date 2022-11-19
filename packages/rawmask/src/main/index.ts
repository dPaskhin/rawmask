import { RawmaskFactory } from './Rawmask/factory/RawmaskFactory';
import type { TMask } from './Common/types/TMask';
import type { IRawmaskOptions } from './Common/types/IRawmaskOptions';
import type { IRawmask } from './Rawmask/types/IRawmask';

/**
 * Creating a rawmask instance.
 *
 * @param $input - The input's DOM node or selector.
 * @param mask - Initial mask - string or array of string/RegExp.
 * @param options - Mask options.
 *
 * @return IRawmask
 */
const createRawmask = (
  $input: HTMLInputElement | string,
  mask: TMask,
  options?: IRawmaskOptions,
): IRawmask => new RawmaskFactory($input, mask, options).createRawmask();

export { createRawmask };

export type { TMask } from './Common/types/TMask';
export type { IRawmaskOptions } from './Common/types/IRawmaskOptions';
export type { IRawmask } from './Rawmask/types/IRawmask';
