import type { MaskedInput } from '@src/MaskedInput/MaskedInput';
import type { IMaskedOptions } from '@src/Common/types/IMaskedOptions';
import { Main } from '@src/Main/Main';
import { TMask } from '@src/Common/types/TMask';

export const textInputMask = (
  $input: HTMLInputElement | string,
  mask: TMask,
  options?: IMaskedOptions,
): MaskedInput => {
  const main = new Main($input, mask, options);

  return main.constructMaskedInput();
};

export default textInputMask;
