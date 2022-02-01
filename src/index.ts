import type { MaskedInput } from '@src/MaskedInput/MaskedInput';
import type { IMaskedOptions } from '@src/Common/types/IMaskedOptions';
import { Main } from '@src/Main/Main';

export const textInputMask = (
  $input: HTMLInputElement,
  options?: IMaskedOptions,
): MaskedInput => {
  const main = new Main($input, options);

  main.validateParams();

  return main.constructMaskedInput();
};

export default textInputMask;
