import { FC, useState } from 'react';

import { Rawmask } from '../src/main';

export const App: FC = () => {
  const [value, setValue] = useState('');

  return (
    <Rawmask
      mask='+7 (999) 999-99-99'
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};
