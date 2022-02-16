import type { MaskedInput } from '@src/MaskedInput/MaskedInput';
import type { IMaskedOptions } from '@src/Common/types/IMaskedOptions';
import type { TMask } from '@src/Common/types/TMask';
import { Main } from '@src/Main/Main';

export const textInputMask = (
  $input: HTMLInputElement | string,
  mask: TMask,
  options?: IMaskedOptions,
): MaskedInput => {
  const main = new Main($input, mask, options);

  return main.constructMaskedInput();
};

export default textInputMask;
