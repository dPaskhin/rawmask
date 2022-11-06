import { rawmask } from '../main';

const createInput = (): HTMLInputElement => document.createElement('input');

describe('Initialing input', () => {
  test('should format initial value', () => {
    const $input = createInput();
    const $inputArrayMask = createInput();
    const $inputArrayRegexpMask = createInput();

    rawmask($input, '+7 (999) 999-99-99');
    rawmask($inputArrayMask, ['9', '9', '/', '9', '9', '/', '9', '9']);
    rawmask($inputArrayRegexpMask, [/\./, '9', '/', /\d/, '9']);

    expect($input.value).toEqual('+7 (___) ___-__-__');
    expect($inputArrayMask.value).toEqual('__/__/__');
    expect($inputArrayRegexpMask.value).toEqual('__/__');
  });

  test('should format initial value with custom mask placeholder', () => {
    const $starInput = createInput();
    const $spaceInput = createInput();

    rawmask($starInput, '+7 (999) 999-99-99', {
      maskPlaceholder: '*',
    });

    rawmask($spaceInput, '+7 (999) 999-99-99', {
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

    rawmask($starInput, '+7 (999) 999-99-99', {
      maskPlaceholder: '*',
      defaultValue: '1234',
    });
    rawmask($spaceInput, '+7 (999) 999-99-99', {
      maskPlaceholder: '',
      defaultValue: '123456',
    });
    rawmask($inputArrayMask, ['9', '9', '/', '9', '9', '/', '9', '9'], {
      defaultValue: '1234',
    });
    rawmask($inputArrayRegexpMask, [/./, '9', '/', /\d/, '9'], {
      defaultValue: 's12',
    });

    expect($starInput.value).toEqual('+7 (123) 4**-**-**');
    expect($spaceInput.value).toEqual('+7 (123) 456');
    expect($inputArrayMask.value).toEqual('12/34/__');
    expect($inputArrayRegexpMask.value).toEqual('s1/2_');
  });

  test('should format initial value with default masked value', () => {
    const $input = createInput();
    const $halfInput = createInput();

    rawmask($input, '+7 (999) 999-99-99', {
      defaultMaskedValue: '+7 (999) 999-99-99',
    });
    rawmask($halfInput, '+7 (999) 999-99-99', {
      defaultMaskedValue: '+7 (999) 99',
    });

    expect($input.value).toEqual('+7 (999) 999-99-99');
    expect($halfInput.value).toEqual('+7 (999) 99_-__-__');
  });

  test('should format initial value with default value with wrong chars', () => {
    const $input = createInput();

    rawmask($input, '+7 (999) 999-99-99', {
      defaultValue: '1234asd567',
    });

    expect($input.value).toEqual('+7 (123) 456-7_-__');
  });

  test('should stay not changed value', () => {
    const $input = createInput();

    rawmask($input, '-----', {
      defaultValue: '123',
    });

    expect($input.value).toEqual('-----');
  });
});