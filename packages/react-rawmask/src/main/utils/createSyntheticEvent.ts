import { SyntheticEvent } from 'react';

export const createSyntheticEvent = <
  T extends Element,
  E extends Event = Event,
>(
  event: E,
): SyntheticEvent<T, E> => {
  let isDefaultPrevented = false;
  let isPropagationStopped = false;
  const preventDefault = (): void => {
    isDefaultPrevented = true;
    event.preventDefault();
  };
  const stopPropagation = (): void => {
    isPropagationStopped = true;
    event.stopPropagation();
  };

  return {
    nativeEvent: event,
    currentTarget: event.currentTarget as EventTarget & T,
    target: event.target as EventTarget & T,
    bubbles: event.bubbles,
    cancelable: event.cancelable,
    defaultPrevented: event.defaultPrevented,
    eventPhase: event.eventPhase,
    isTrusted: event.isTrusted,
    preventDefault,
    isDefaultPrevented: () => isDefaultPrevented,
    stopPropagation,
    isPropagationStopped: () => isPropagationStopped,
    persist: () => null,
    timeStamp: event.timeStamp,
    type: event.type,
  };
};
