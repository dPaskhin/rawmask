import { Main } from './Main/Main';
import type { TMask } from './Common/types/TMask';
import type { IMaskedOptions } from './Common/types/IMaskedOptions';
import type { IMaskedInput } from './MaskedInput/types/IMaskedInput';

const rawmask = (
  $input: HTMLInputElement | string,
  mask: TMask,
  options?: IMaskedOptions,
): IMaskedInput => {
  const main = new Main($input, mask, options);

  return main.createMaskedInput();
};

export { rawmask };

export type { TMask } from './Common/types/TMask';
export type { IMaskedOptions } from './Common/types/IMaskedOptions';
export type { IMaskedInput } from './MaskedInput/types/IMaskedInput';
