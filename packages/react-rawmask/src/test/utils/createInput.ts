import { render, screen } from '@testing-library/react';
import React from 'react';

import { IRawmaskProps, Rawmask } from '@rawmask/react';

interface ITestedRawmaskProps extends IRawmaskProps {
  'data-testid': string;
}

export const createInput = async (
  props: IRawmaskProps,
  id = 'default',
): Promise<{
  node: HTMLInputElement;
  rerender: (props: IRawmaskProps) => void;
}> => {
  const { rerender } = render(
    React.createElement<ITestedRawmaskProps>(Rawmask, {
      ...props,
      'data-testid': id,
    }),
  );

  return {
    node: await screen.findByTestId(id),
    rerender: (innerProps) =>
      rerender(
        React.createElement<ITestedRawmaskProps>(Rawmask, {
          ...innerProps,
          'data-testid': id,
        }),
      ),
  };
};
