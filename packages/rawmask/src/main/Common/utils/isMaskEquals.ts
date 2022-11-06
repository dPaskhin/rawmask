import type { TMask } from 'rawmask';

export const isMaskEquals = (base: TMask, other: TMask): boolean =>
  base.toString() === other.toString();
