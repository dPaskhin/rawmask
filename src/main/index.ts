import type { MaskedInput } from '@src/main/MaskedInput/MaskedInput';
import type { IMaskedOptions } from '@src/main/Common/types/IMaskedOptions';
import type { TMask } from '@src/main/Common/types/TMask';
import { Main } from '@src/main/Main/Main';

export const textInputMask = (
  $input: HTMLInputElement | string,
  mask: TMask,
  options?: IMaskedOptions,
): MaskedInput => {
  const main = new Main($input, mask, options);

  return main.createMaskedInput();
};
