import { TMask } from '../../Common/types/TMask';

export interface IRawmask {
  rawValue: string;
  value: string;
  mask: TMask;
  on: <Name extends keyof HTMLElementEventMap>(
    name: Name,
    handler: (
      this: IRawmask,
      rawmask: IRawmask,
      event: HTMLElementEventMap[Name],
    ) => void,
  ) => IRawmask;
  off: (name: keyof HTMLElementEventMap) => void;
  destroy: () => void;
}
