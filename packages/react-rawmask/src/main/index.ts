import {
  ChangeEvent,
  createElement,
  FC,
  InputHTMLAttributes,
  useEffect,
  useRef,
} from 'react';
import { IMaskedInput, IMaskedOptions, rawmask, TMask } from 'rawmask';

import { createSyntheticEvent } from './utils/createSyntheticEvent';

export interface IRawmaskProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue'>,
    IMaskedOptions {
  mask: TMask;
  unmaskedValue?: string;
  value?: string;
}

export const Rawmask: FC<IRawmaskProps> = ({
  mask,
  maskPlaceholder,
  defaultValue,
  defaultMaskedValue,
  value,
  onChange,
  unmaskedValue,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const maskedInputRef = useRef<IMaskedInput>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    maskedInputRef.current ||= rawmask(ref.current, mask, {
      maskPlaceholder,
      defaultMaskedValue,
      defaultValue,
    });
  }, [mask, maskPlaceholder, defaultMaskedValue, defaultValue]);

  useEffect(() => {
    if (!maskedInputRef.current) {
      return;
    }

    maskedInputRef.current.mask = mask;
    maskedInputRef.current.value = value || maskedInputRef.current.value;
    maskedInputRef.current.unmaskedValue =
      unmaskedValue || maskedInputRef.current.unmaskedValue;
  }, [mask, value, unmaskedValue]);

  useEffect(() => {
    maskedInputRef.current?.on('input', (masked, event) => {
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

    return () => maskedInputRef.current?.off('input');
  }, [onChange]);

  useEffect(
    () => () => {
      maskedInputRef.current?.destroy();
    },
    [],
  );

  return createElement('input', { ref, ...props });
};
