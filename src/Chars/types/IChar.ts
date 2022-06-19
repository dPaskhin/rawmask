import type { TDirection } from '@src/Common/types/TDirection';

export interface IChar {
  index: number;
  value: string;
  isPermanent: boolean;
  nearChangeable: Partial<Record<TDirection, IChar>>;
  regexp?: RegExp;
}
