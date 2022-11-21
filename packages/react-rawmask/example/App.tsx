import { FC, forwardRef, InputHTMLAttributes, useState } from 'react';

import { Rawmask, useRawmask } from '../src/main';

interface IUiInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const UiInput = forwardRef<HTMLInputElement, IUiInputProps>((props, ref) => (
  <input
    ref={ref}
    style={{ fontSize: '2rem', color: 'red', borderRadius: 10 }}
    {...props}
  />
));

const CustomReactComponent: FC = () => {
  const [value, setValue] = useState('');
  const ref = useRawmask('+\\9\\98 (99) 999-99-99', {
    value,
    onChange: (event) => setValue(event.target.value),
  });

  return <UiInput ref={ref} />;
};

export const App: FC = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <CustomReactComponent />

      <br />

      <Rawmask
        mask='+7 (999) 999-99-99'
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </>
  );
};
