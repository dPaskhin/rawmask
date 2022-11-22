import type { TMask } from 'rawmask';

export const isMaskEquals = (base: TMask, other: TMask): boolean => {
  const basePrepared = typeof base === 'string' ? base : base.join('');
  const otherPrepared = typeof other === 'string' ? other : other.join('');

  return basePrepared === otherPrepared;
};
