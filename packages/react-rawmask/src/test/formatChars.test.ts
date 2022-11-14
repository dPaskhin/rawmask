import { createInput } from './utils/createInput';

describe('Format chars pattern', () => {
  test('should change base patterns', async () => {
    const mask = 'aa/99/**';
    const { node: $input, rerender } = await createInput({
      mask,
      formatChars: {
        a: /1/,
        '9': /v/,
      },
    });

    rerender({ mask, rawValue: '222200' });

    expect($input.value).toEqual('__/__/__');

    rerender({ mask, rawValue: '11vv00' });

    expect($input.value).toEqual('11/vv/00');
  });
  test('should extend patterns', async () => {
    const mask = 'zz/11/**';
    const { node: $input, rerender } = await createInput({
      mask,
      formatChars: {
        z: /[Zz|]/,
        '1': /1/,
      },
    });

    rerender({ mask, rawValue: '222200' });

    expect($input.value).toEqual('__/__/__');

    rerender({ mask, rawValue: 'zZ1100' });

    expect($input.value).toEqual('zZ/11/00');
  });
});
