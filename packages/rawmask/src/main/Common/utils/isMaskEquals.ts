import type { TMask } from 'rawmask';

export const isMaskEquals = (base: TMask, other: TMask): boolean =>
  JSON.stringify(base) === JSON.stringify(other);
