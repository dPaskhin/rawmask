import { Main } from './Main/Main';
import type { TMask } from './Common/types/TMask';
import type { IRawmaskOptions } from './Common/types/IRawmaskOptions';
import type { IRawmask } from './Rawmask/types/IRawmask';

const createRawmask = (
  $input: HTMLInputElement | string,
  mask: TMask,
  options?: IRawmaskOptions,
): IRawmask => {
  const main = new Main($input, mask, options);

  return main.createRawmask();
};

export { createRawmask };

export type { TMask } from './Common/types/TMask';
export type { IRawmaskOptions } from './Common/types/IRawmaskOptions';
export type { IRawmask } from './Rawmask/types/IRawmask';
