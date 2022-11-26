# React plugin for Rawmask

Component and hook for creating masked input in React.

```shell
npm install --save-prod @rawmask/react
```

# Usage

You can use either component `Rawmask` or hook `useRawmask`.

Component:

```tsx
import { Rawmask } from '@rawmask/react';

<Rawmask mask={'+7 (999) 999-99-99'} />
```

Hook:

```tsx
import { FC } from 'react';
import { Rawmask } from '@rawmask/react';

const App: FC = () => {
  const ref = useRawmask('+7 (999) 999-99-99');

  return <input ref={ref} />
};
```

# API

Both component and hook use options from [rawmask](https://github.com/dPaskhin/rawmask#readme) under hood.

### Hook

Hook has the following signature:

```ts
declare const useRawmask: (
  mask: TMask,
  params?: IUseRawmaskParams | undefined
) => RefObject<HTMLInputElement>;
```

### `mask`

Initial mask - string or array of strings/regular expressions. You can change mask dynamically in the runtime.

### `params`

`IRawmaskOptions` from [rawmask](https://github.com/dPaskhin/rawmask#options)

```ts
interface IUseRawmaskParams extends IRawmaskOptions {
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
  onChangeRawValue?: (rawValue: string, event: ChangeEvent<HTMLInputElement>) => void;
}
```

Returned `ref` from the hook should be provided to necessary input.

### Component

Component has the following props:

```ts
interface IRawmaskProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'value' | 'onChange'>, IUseRawmaskParams {
  /**
   * Raw mask contains string or array of strings/regular expressions.
   */
  mask: TMask;
}
```

You can use `Rawmask` component like a native input component - almost all props are native beside these:

- `defaultValue` - you can use with just string type
- `value` - like `defaultValue`
- `onChange` - onChange differs from native one by signature - now this callback has two arguments - first is input's
  value, second is "native" React event object

Also, all params from the [hook](https://github.com/dPaskhin/rawmask/tree/master/packages/react-rawmask#Hook) are
available in the props.
