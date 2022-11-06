import type { TMask } from '../types/TMask';

export const isMaskEquals = (base: TMask, other: TMask): boolean =>
  JSON.stringify(base) === JSON.stringify(other);
