import { createRawmask } from '../main';
import { createInput } from './utils/createInput';

describe('Initialing input', () => {
  test('should format initial value', () => {
    const $input = createInput();
    const $inputArrayMask = createInput();
    const $inputArrayRegexpMask = createInput();

    createRawmask($input, '+7 (999) 999-99-99');
    createRawmask($inputArrayMask, ['9', '9', '/', '9', '9', '/', '9', '9']);
    createRawmask($inputArrayRegexpMask, [/\./, '9', '/', /\d/, '9']);

    expect($input.value).toEqual('+7 (___) ___-__-__');
    expect($inputArrayMask.value).toEqual('__/__/__');
    expect($inputArrayRegexpMask.value).toEqual('__/__');
  });

  test('should format initial value with custom mask placeholder', () => {
    const $starInput = createInput();
    const $spaceInput = createInput();

    createRawmask($starInput, '+7 (999) 999-99-99', {
      maskPlaceholder: '*',
    });

    createRawmask($spaceInput, '+7 (999) 999-99-99', {
      maskPlaceholder: '',
    });

    expect($starInput.value).toEqual('+7 (***) ***-**-**');
    expect($spaceInput.value).toEqual('+7 (');
  });

  test('should format initial value with default raw value', () => {
    const $starInput = createInput();
    const $spaceInput = createInput();
    const $inputArrayMask = createInput();
    const $inputArrayRegexpMask = createInput();

    createRawmask($starInput, '+7 (999) 999-99-99', {
      maskPlaceholder: '*',
      defaultRawValue: '1234',
    });
    createRawmask($spaceInput, '+7 (999) 999-99-99', {
      maskPlaceholder: '',
      defaultRawValue: '123456',
    });
    createRawmask($inputArrayMask, ['9', '9', '/', '9', '9', '/', '9', '9'], {
      defaultRawValue: '1234',
    });
    createRawmask($inputArrayRegexpMask, [/./, '9', '/', /\d/, '9'], {
      defaultRawValue: 's12',
    });

    expect($starInput.value).toEqual('+7 (123) 4**-**-**');
    expect($spaceInput.value).toEqual('+7 (123) 456');
    expect($inputArrayMask.value).toEqual('12/34/__');
    expect($inputArrayRegexpMask.value).toEqual('s1/2_');
  });

  test('should format initial value with default value', () => {
    const $input = createInput();
    const $halfInput = createInput();

    createRawmask($input, '+7 (999) 999-99-99', {
      defaultValue: '+7 (999) 999-99-99',
    });
    createRawmask($halfInput, '+7 (999) 999-99-99', {
      defaultValue: '+7 (999) 99',
    });

    expect($input.value).toEqual('+7 (999) 999-99-99');
    expect($halfInput.value).toEqual('+7 (999) 99_-__-__');
  });

  test('should format initial value with default raw value with wrong chars', () => {
    const $input = createInput();

    createRawmask($input, '+7 (999) 999-99-99', {
      defaultRawValue: '1234asd567',
    });

    expect($input.value).toEqual('+7 (123) 456-7_-__');
  });

  test('should stay not changed value', () => {
    const $input = createInput();

    createRawmask($input, '-----', {
      defaultRawValue: '123',
    });

    expect($input.value).toEqual('-----');
  });
});
