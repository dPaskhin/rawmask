import { createElement, FC, InputHTMLAttributes } from 'react';
import { TMask } from 'rawmask';

import { IUseRawmaskParams, useRawmask } from '../hooks/useRawmask';

export interface IRawmaskProps
  extends Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'defaultValue' | 'value' | 'onChange'
    >,
    IUseRawmaskParams {
  /**
   * Raw mask contains string or array of string/RegExp.
   */
  mask: TMask;
}

export const Rawmask: FC<IRawmaskProps> = ({
  mask,
  value,
  onChange,
  rawValue,
  onChangeRawValue,
  formatChars,
  defaultValue,
  defaultRawValue,
  maskPlaceholder,
  ...props
}) => {
  const ref = useRawmask(mask, {
    value,
    rawValue,
    onChangeRawValue,
    onChange,
    formatChars,
    defaultValue,
    defaultRawValue,
    maskPlaceholder,
  });

  return createElement('input', { ref, ...props });
};

Rawmask.displayName = 'Rawmask';
