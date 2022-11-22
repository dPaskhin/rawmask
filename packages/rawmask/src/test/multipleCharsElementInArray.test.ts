import { createRawmask } from '../main';
import { createInput } from './utils/createInput';

describe('Multiple chars element in mask array', () => {
  test('should format initial value', () => {
    const $input = createInput();

    createRawmask($input, [
      '+\\9\\98 ',
      '( ',
      '',
      '99',
      ' )',
      ' 999-',
      '99-',
      '99',
    ]);

    expect($input.value).toEqual('+998 ( __ ) ___-__-__');
  });
  test('should format initial value with default value', () => {
    const $input = createInput();

    createRawmask(
      $input,
      ['+\\9\\98 ', '( ', '', '99', ' )', ' 999-', '99-', '99'],
      {
        defaultRawValue: '1234',
      },
    );

    expect($input.value).toEqual('+998 ( 12 ) 34_-__-__');
  });
  test('should change mask', () => {
    const $input = createInput();

    const rawmask = createRawmask(
      $input,
      ['+\\9\\98 ', '( ', '', '99', ' )', ' 999-', '99-', '99'],
      {
        defaultRawValue: '1234',
      },
    );

    expect($input.value).toEqual('+998 ( 12 ) 34_-__-__');

    rawmask.mask = ['+7 ', '( ', '999', ' )', '', '', ' 999-', '99-', '99'];

    expect($input.value).toEqual('+7 ( 123 ) 4__-__-__');
  });
});
