import { textInputMask } from '@src/index';

const createInput = (): HTMLInputElement => document.createElement('input');

describe('Dynamic change mask', () => {
  test('should change mask', () => {
    const $input = createInput();

    const masked = textInputMask($input, '+7 (999) 999-99-99', {
      defaultValue: '1234',
    });

    masked.mask = '99/99/99';

    expect($input.value).toEqual('12/34/__');
  });
});
