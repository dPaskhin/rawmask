import { textInputMask } from '@src/index';

const createInput = (): HTMLInputElement => document.createElement('input');

describe('Initialing input', () => {
  test('should format initial value', () => {
    const $input = createInput();

    textInputMask($input, {
      mask: '+7 (999) 999-99-99',
    });

    expect($input.value).toEqual('+7 (___) ___-__-__');
  });

  test('should format initial value with custom mask placeholder', () => {
    const $starInput = createInput();
    const $spaceInput = createInput();

    textInputMask($starInput, {
      mask: '+7 (999) 999-99-99',
      maskPlaceholder: '*',
    });

    textInputMask($spaceInput, {
      mask: '+7 (999) 999-99-99',
      maskPlaceholder: '',
    });

    expect($starInput.value).toEqual('+7 (***) ***-**-**');
    expect($spaceInput.value).toEqual('+7 (');
  });

  test('should format initial value with default value', () => {
    const $starInput = createInput();
    const $spaceInput = createInput();

    textInputMask($starInput, {
      mask: '+7 (999) 999-99-99',
      maskPlaceholder: '*',
      defaultValue: '1234',
    });

    textInputMask($spaceInput, {
      mask: '+7 (999) 999-99-99',
      maskPlaceholder: '',
      defaultValue: '123456',
    });

    expect($starInput.value).toEqual('+7 (123) 4**-**-**');
    expect($spaceInput.value).toEqual('+7 (123) 456');
  });

  test('should format initial value with default value with wrong chars', () => {
    const $input = createInput();

    textInputMask($input, {
      mask: '+7 (999) 999-99-99',
      defaultValue: '1234asd567',
    });

    expect($input.value).toEqual('+7 (123) 456-7_-__');
  });

  test('should stay not changed value', () => {
    const $input = createInput();

    textInputMask($input, {
      mask: '-----',
      defaultValue: '123',
    });

    expect($input.value).toEqual('-----');
  });
});
