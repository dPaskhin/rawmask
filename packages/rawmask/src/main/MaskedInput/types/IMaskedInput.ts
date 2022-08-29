import { TMask } from '../../Common/types/TMask';

export interface IMaskedInput {
  unmaskedValue: string;
  value: string;
  mask: TMask;
  on: <Name extends keyof HTMLElementEventMap>(
    name: Name,
    handler: (
      this: IMaskedInput,
      masked: IMaskedInput,
      event: HTMLElementEventMap[Name],
    ) => void,
  ) => IMaskedInput;
  off: (name: keyof HTMLElementEventMap) => void;
  destroy: () => void;
}
