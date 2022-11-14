import { createRawmask } from '../main';
import { createInput } from './utils/createInput';

describe('Format chars pattern', () => {
  test('should change base patterns', () => {
    const $input = createInput();

    const mask = createRawmask($input, 'aa/99/**', {
      formatChars: {
        a: /1/,
        '9': /v/,
      },
    });

    mask.rawValue = '222200';

    expect($input.value).toEqual('__/__/__');

    mask.rawValue = '11vv00';

    expect($input.value).toEqual('11/vv/00');
  });
  test('should extend patterns', () => {
    const $input = createInput();

    const mask = createRawmask($input, 'zz/11/**', {
      formatChars: {
        z: /[Zz|]/,
        '1': /1/,
      },
    });

    mask.rawValue = '222200';

    expect($input.value).toEqual('__/__/__');

    mask.rawValue = 'zZ1100';

    expect($input.value).toEqual('zZ/11/00');
  });
});
