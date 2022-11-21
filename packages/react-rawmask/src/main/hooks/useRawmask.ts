import { ChangeEvent, RefObject, useEffect, useRef } from 'react';
import { createRawmask, IRawmask, IRawmaskOptions, TMask } from 'rawmask';

import { createSyntheticEvent } from '../utils/createSyntheticEvent';

export interface IUseRawmaskParams extends IRawmaskOptions {
  /**
   * Value of input.
   */
  value?: string;
  /**
   * React change event handler.
   *
   * @param value
   * @param event - React change synthetic event.
   */
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Raw (unmasked) value of input.
   */
  rawValue?: string;
  /**
   * Change event handler for raw (unmasked) value.
   *
   * @param rawValue
   * @param event - React change synthetic event.
   */
  onChangeRawValue?: (
    rawValue: string,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
}

/**
 * Hook for separate implement rawmask functionality for custom input components.
 *
 * @param mask - Raw mask contains string or array of string/RegExp.
 * @param params
 */
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
    rawmaskRef.current?.on('input', (rawmask, event) => {
      if (!params?.onChange) {
        return;
      }

      const syntheticEvent = createSyntheticEvent<HTMLInputElement>(event);
      const changeEvent: ChangeEvent<HTMLInputElement> = {
        ...syntheticEvent,
        target: syntheticEvent.currentTarget,
      };

      params.onChange(rawmask.value, changeEvent);
    });

    return () => rawmaskRef.current?.off('input');
  }, [params?.onChange]);

  useEffect(() => {
    rawmaskRef.current?.on('input', (rawmask, event) => {
      if (!params?.onChangeRawValue) {
        return;
      }

      const syntheticEvent = createSyntheticEvent<HTMLInputElement>(event);
      const changeEvent: ChangeEvent<HTMLInputElement> = {
        ...syntheticEvent,
        target: syntheticEvent.currentTarget,
      };

      params.onChangeRawValue(rawmask.rawValue, changeEvent);
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
