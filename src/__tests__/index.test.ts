import { textInputMask } from '@src/index';

const $input = document.createElement('input');

describe('Initialing input', () => {
  test('should format initial value', () => {
    textInputMask($input, {
      mask: '+7 (999) 999-99-99',
    });

    expect($input.value).toEqual('+7 (___) ___-__-__');
  });

  test('should format initial value with custom mask placeholder', () => {
    textInputMask($input, {
      mask: '+7 (999) 999-99-99',
      maskPlaceholder: '*',
    });

    expect($input.value).toEqual('+7 (***) ***-**-**');
  });

  test('should format initial value with default value', () => {
    textInputMask($input, {
      mask: '+7 (999) 999-99-99',
      maskPlaceholder: '*',
      defaultValue: '1234',
    });

    expect($input.value).toEqual('+7 (123) 4**-**-**');
  });
});
