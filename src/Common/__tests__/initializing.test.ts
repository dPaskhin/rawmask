import { textInputMask } from '@src/index';

const createInput = (): HTMLInputElement => document.createElement('input');

describe('Initialing input', () => {
  test('should format initial value', () => {
    const $input = createInput();
    const $inputArrayMask = createInput();
    const $inputArrayRegexpMask = createInput();

    textInputMask($input, '+7 (999) 999-99-99');
    textInputMask($inputArrayMask, ['9', '9', '/', '9', '9', '/', '9', '9']);
    textInputMask($inputArrayRegexpMask, [/\./, '9', '/', /\d/, '9']);

    expect($input.value).toEqual('+7 (___) ___-__-__');
    expect($inputArrayMask.value).toEqual('__/__/__');
    expect($inputArrayRegexpMask.value).toEqual('__/__');
  });

  test('should format initial value with custom mask placeholder', () => {
    const $starInput = createInput();
    const $spaceInput = createInput();

    textInputMask($starInput, '+7 (999) 999-99-99', {
      maskPlaceholder: '*',
    });

    textInputMask($spaceInput, '+7 (999) 999-99-99', {
      maskPlaceholder: '',
    });

    expect($starInput.value).toEqual('+7 (***) ***-**-**');
    expect($spaceInput.value).toEqual('+7 (');
  });

  test('should format initial value with default value', () => {
    const $starInput = createInput();
    const $spaceInput = createInput();
    const $inputArrayMask = createInput();
    const $inputArrayRegexpMask = createInput();

    textInputMask($starInput, '+7 (999) 999-99-99', {
      maskPlaceholder: '*',
      defaultValue: '1234',
    });
    textInputMask($spaceInput, '+7 (999) 999-99-99', {
      maskPlaceholder: '',
      defaultValue: '123456',
    });
    textInputMask($inputArrayMask, ['9', '9', '/', '9', '9', '/', '9', '9'], {
      defaultValue: '1234',
    });
    textInputMask($inputArrayRegexpMask, [/./, '9', '/', /\d/, '9'], {
      defaultValue: 's12',
    });

    expect($starInput.value).toEqual('+7 (123) 4**-**-**');
    expect($spaceInput.value).toEqual('+7 (123) 456');
    expect($inputArrayMask.value).toEqual('12/34/__');
    expect($inputArrayRegexpMask.value).toEqual('s1/2_');
  });

  test('should format initial value with default value with wrong chars', () => {
    const $input = createInput();

    textInputMask($input, '+7 (999) 999-99-99', {
      defaultValue: '1234asd567',
    });

    expect($input.value).toEqual('+7 (123) 456-7_-__');
  });

  test('should stay not changed value', () => {
    const $input = createInput();

    textInputMask($input, '-----', {
      defaultValue: '123',
    });

    expect($input.value).toEqual('-----');
  });
});
