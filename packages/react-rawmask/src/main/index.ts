import {
  ChangeEvent,
  createElement,
  FC,
  InputHTMLAttributes,
  useEffect,
  useRef,
} from 'react';
import { IRawmask, IRawmaskOptions, createRawmask, TMask } from 'rawmask';

import { createSyntheticEvent } from './utils/createSyntheticEvent';

export interface IRawmaskProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue'>,
    IRawmaskOptions {
  mask: TMask;
  rawValue?: string;
  value?: string;
}

export const Rawmask: FC<IRawmaskProps> = ({
  mask,
  maskPlaceholder,
  defaultRawValue,
  defaultValue,
  value,
  onChange,
  rawValue,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const rawmaskRef = useRef<IRawmask>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    rawmaskRef.current ||= createRawmask(ref.current, mask, {
      maskPlaceholder,
      defaultValue,
      defaultRawValue,
    });
  }, [mask, maskPlaceholder, defaultValue, defaultRawValue]);

  useEffect(() => {
    if (rawmaskRef.current) {
      rawmaskRef.current.mask = mask;
    }
  }, [mask]);

  useEffect(() => {
    if (rawmaskRef.current) {
      rawmaskRef.current.value = value || rawmaskRef.current.value;
    }
  }, [value]);

  useEffect(() => {
    if (rawmaskRef.current) {
      rawmaskRef.current.rawValue = rawValue || rawmaskRef.current.rawValue;
    }
  }, [rawValue]);

  useEffect(() => {
    rawmaskRef.current?.on('input', (masked, event) => {
      if (!onChange) {
        return;
      }

      const syntheticEvent = createSyntheticEvent<HTMLInputElement>(event);
      const changeEvent: ChangeEvent<HTMLInputElement> = {
        ...syntheticEvent,
        target: syntheticEvent.currentTarget,
      };

      onChange(changeEvent);
    });

    return () => rawmaskRef.current?.off('input');
  }, [onChange]);

  useEffect(
    () => () => {
      rawmaskRef.current?.destroy();
    },
    [],
  );

  return createElement('input', { ref, ...props });
};
