# Rawmask&ensp;🥩&ensp;[![build](https://github.com/dPaskhin/rawmask/actions/workflows/build.yml/badge.svg)](https://github.com/dPaskhin/rawmask/actions/workflows/build.yml)

The lightweight tool with minimum functionality for creating masked inputs.

```shell
npm install --save-prod rawmask
```

# Feature list

- easy to get and to set _raw_ (unmasked) value and also masked value
- easy to change mask in the runtime
- string and array of strings/regular expressions masks support
- lightweight
- no external dependencies
- simple add event listeners to masked input

# Usage

For add mask to input you need to invoke function `createRawmask` with two required params - input (selector or node)
and mask:

```ts
import { createRawmask } from 'rawmask';

const rawmask = createRawmask('#input', '+7 (999) 999-99-99');
```

# API

The `createRawmask` function has the following signature:

```ts
declare const createRawmask: (
  $input: HTMLInputElement | string,
  mask: TMask,
  options?: IRawmaskOptions | undefined
) => IRawmask;
```

### `$input`

The input's DOM node or CSS selector.

### `mask`

Initial mask - string or array of strings/regular expressions. You can change mask dynamically in the runtime.

### `options`

```ts
interface IRawmaskOptions {
  /**
   * Character to cover unfilled parts of the mask.
   * If set to empty string, unfilled parts will be empty as in ordinary input.
   *
   * @default "_".
   */
  maskPlaceholder?: string;
  /**
   * Default raw (unmasked) value of input.
   */
  defaultRawValue?: string;
  /**
   * Default masked value of input.
   */
  defaultValue?: string;
  /**
   * Defines format characters with characters as a keys
   * and corresponding RegExp strings as a values.
   */
  formatChars?: Partial<TFormatChars>;
}
```

### `formatChars`

You can change initial format chars and add your custom ones. Default:

| Character | Allowed input |
|:---------:|:-------------:|
|     9     |      0-9      |
|     a     |   a-z, A-Z    |
|     *     | any character |

Any format character can be escaped with a backslash.

### IRawmask

Function `createRawmask` returns `IRawmask` instance. With it, you can get and set _raw_ (_unmasked_) `rawValue` and _masked_ `value` of input, also you can change `mask` dynamically in the runtime. Methods like `on` add `off` allow you
to subscribe and unsubscribe event listeners:

```ts
interface IRawmask {
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
  on: <Name extends keyof HTMLElementEventMap>(name: Name, handler: (this: IRawmask, rawmask: IRawmask, event: HTMLElementEventMap[Name]) => void) => IRawmask;
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
```

# Plugins

- [@rawmask/react](https://github.com/dPaskhin/rawmask/tree/master/packages/react-rawmask#readme) - Component and hook
  for creating masked input in React.
  

