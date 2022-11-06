import { createInput } from './utils/createInput';

describe('Initialing input', () => {
  test('should format initial value', async () => {
    const { node: $input } = await createInput({
      mask: '+7 (999) 999-99-99',
    });
    const { node: $inputArrayMask } = await createInput(
      {
        mask: ['9', '9', '/', '9', '9', '/', '9', '9'],
      },
      'array',
    );
    const { node: $inputArrayRegexpMask } = await createInput(
      {
        mask: [/\./, '9', '/', /\d/, '9'],
      },
      'regex',
    );

    expect($input.value).toEqual('+7 (___) ___-__-__');
    expect($inputArrayMask.value).toEqual('__/__/__');
    expect($inputArrayRegexpMask.value).toEqual('__/__');
  });

  test('should format initial value with custom mask placeholder', async () => {
    const { node: $starInput } = await createInput(
      {
        mask: '+7 (999) 999-99-99',
        maskPlaceholder: '*',
      },
      'star',
    );
    const { node: $spaceInput } = await createInput(
      {
        mask: '+7 (999) 999-99-99',
        maskPlaceholder: '',
      },
      'space',
    );

    expect($starInput.value).toEqual('+7 (***) ***-**-**');
    expect($spaceInput.value).toEqual('+7 (');
  });

  test('should format initial value with default value', async () => {
    const { node: $starInput } = await createInput(
      {
        mask: '+7 (999) 999-99-99',
        maskPlaceholder: '*',
        defaultRawValue: '1234',
      },
      'star',
    );
    const { node: $spaceInput } = await createInput(
      {
        mask: '+7 (999) 999-99-99',
        maskPlaceholder: '',
        defaultRawValue: '123456',
      },
      'space',
    );
    const { node: $inputArrayMask } = await createInput(
      {
        mask: ['9', '9', '/', '9', '9', '/', '9', '9'],
        defaultRawValue: '1234',
      },
      'array',
    );
    const { node: $inputArrayRegexpMask } = await createInput(
      {
        mask: [/./, '9', '/', /\d/, '9'],
        defaultRawValue: 's12',
      },
      'regex',
    );

    expect($starInput.value).toEqual('+7 (123) 4**-**-**');
    expect($spaceInput.value).toEqual('+7 (123) 456');
    expect($inputArrayMask.value).toEqual('12/34/__');
    expect($inputArrayRegexpMask.value).toEqual('s1/2_');
  });

  test('should format initial value with default masked value', async () => {
    const { node: $input } = await createInput({
      mask: '+7 (999) 999-99-99',
      defaultValue: '+7 (999) 999-99-99',
    });
    const { node: $halfInput } = await createInput(
      {
        mask: '+7 (999) 999-99-99',
        defaultValue: '+7 (999) 99',
      },
      'half',
    );

    expect($input.value).toEqual('+7 (999) 999-99-99');
    expect($halfInput.value).toEqual('+7 (999) 99_-__-__');
  });

  test('should format initial value with default value with wrong chars', async () => {
    const { node: $input } = await createInput({
      mask: '+7 (999) 999-99-99',
      defaultRawValue: '1234asd567',
    });

    expect($input.value).toEqual('+7 (123) 456-7_-__');
  });

  test('should stay not changed value', async () => {
    const { node: $input } = await createInput({
      mask: '-----',
      defaultRawValue: '123',
    });

    expect($input.value).toEqual('-----');
  });
});
