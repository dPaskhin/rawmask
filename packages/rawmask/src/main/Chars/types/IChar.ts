import type { TDirection } from '../../Common/types/TDirection';

export interface IChar {
  index: number;
  value: string;
  permanent: boolean;
  nearChangeable: Partial<Record<TDirection, IChar>>;
  regexp?: RegExp;
}
