import type { TDirection } from '@src/Common/types/TDirection';

export interface IChar {
  index: number;
  value: string;
  isPermanent: boolean;
  nearMutable: Partial<Record<TDirection, IChar>>;
  regexp?: RegExp;
}
