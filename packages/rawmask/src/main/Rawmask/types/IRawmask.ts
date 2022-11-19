import { TMask } from '../../Common/types/TMask';

export interface IRawmask {
  /**
   * Raw (unmasked) value of input.
   * Getter and setter.
   */
  rawValue: string;
  /**
   * Value of input.
   * Getter and setter.
   */
  value: string;
  /**
   * Mask of input.
   * Getter and setter. You can dynamically change mask in any moment.
   */
  mask: TMask;
  /**
   * Method for adding input event listeners.
   *
   * @param name - Name from all native event map.
   * @param handler - Custom event handler, that takes instance of rawmask as context and as parameter, also native event.
   *
   * @return IRawmask
   */
  on: <Name extends keyof HTMLElementEventMap>(
    name: Name,
    handler: (
      this: IRawmask,
      rawmask: IRawmask,
      event: HTMLElementEventMap[Name],
    ) => void,
  ) => IRawmask;
  /**
   * Method for removing all event listeners from input by event name.
   *
   * @param name - Name from all native event map.
   *
   * @return void
   */
  off: (name: keyof HTMLElementEventMap) => void;
  /**
   * Remove all listeners from input and set input value to empty string.
   */
  destroy: () => void;
}
