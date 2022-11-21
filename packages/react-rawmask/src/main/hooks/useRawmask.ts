import {
  ChangeEvent,
  ChangeEventHandler,
  RefObject,
  useEffect,
  useRef,
} from 'react';
import { createRawmask, IRawmask, IRawmaskOptions, TMask } from 'rawmask';

import { createSyntheticEvent } from '../utils/createSyntheticEvent';

export interface IUseRawmaskParams extends IRawmaskOptions {
  /**
   * Value of input.
   */
  value?: string;
  /**
   * React change event handler.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /**
   * Raw (unmasked) value of input.
   */
  rawValue?: string;
  /**
   * Change event handler for raw (unmasked) value.
   *
   * @param value
   */
  onChangeRawValue?: (value: string) => void;
}

export const useRawmask = (
  mask: TMask,
  params?: IUseRawmaskParams,
): RefObject<HTMLInputElement> => {
  const ref = useRef<HTMLInputElement>(null);
  const rawmaskRef = useRef<IRawmask>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    rawmaskRef.current ||= createRawmask(ref.current, mask, {
      maskPlaceholder: params?.maskPlaceholder,
      defaultValue: params?.defaultValue,
      defaultRawValue: params?.defaultRawValue,
      formatChars: params?.formatChars,
    });
  }, [
    mask,
    params?.maskPlaceholder,
    params?.defaultValue,
    params?.defaultRawValue,
    params?.formatChars,
  ]);

  useEffect(() => {
    if (rawmaskRef.current) {
      rawmaskRef.current.mask = mask;
    }
  }, [mask]);

  useEffect(() => {
    if (rawmaskRef.current) {
      rawmaskRef.current.value = params?.value || rawmaskRef.current.value;
    }
  }, [params?.value]);

  useEffect(() => {
    if (rawmaskRef.current) {
      rawmaskRef.current.rawValue =
        params?.rawValue || rawmaskRef.current.rawValue;
    }
  }, [params?.rawValue]);

  useEffect(() => {
    rawmaskRef.current?.on('input', (masked, event) => {
      if (!params?.onChange) {
        return;
      }

      const syntheticEvent = createSyntheticEvent<HTMLInputElement>(event);
      const changeEvent: ChangeEvent<HTMLInputElement> = {
        ...syntheticEvent,
        target: syntheticEvent.currentTarget,
      };

      params.onChange(changeEvent);
    });

    return () => rawmaskRef.current?.off('input');
  }, [params?.onChange]);

  useEffect(() => {
    rawmaskRef.current?.on('input', (masked) => {
      params?.onChangeRawValue?.(masked.rawValue);
    });

    return () => rawmaskRef.current?.off('input');
  }, [params?.onChange]);

  useEffect(
    () => () => {
      rawmaskRef.current?.destroy();
    },
    [],
  );

  return ref;
};
