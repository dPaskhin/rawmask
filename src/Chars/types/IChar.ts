import type { TDirection } from '@src/Common/types/TDirection';

export interface IChar {
  index: number;
  value: string;
  // todo: Maybe regexp field is enough
  isPermanent: boolean;
  nearChangeable: Partial<Record<TDirection, IChar>>;
  regexp?: RegExp;
}
