/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createRawmask } from '../main';
import { TextInputMaskError } from '../main/Common/errors/TextInputMaskError';
import { createInput } from './utils/createInput';

describe('Initialize with not valid params', () => {
  test('without params at all', () => {
    // @ts-ignore
    expect(() => createRawmask()).toThrow(
      new TextInputMaskError("input DOM element wasn't passed"),
    );
  });

  test('with not valid input', () => {
    const div = document.createElement('div');

    div.id = 'notValidDiv';

    // @ts-ignore
    expect(() => createRawmask(null, ' ')).toThrow(
      new TextInputMaskError("input DOM element wasn't passed"),
    );
    expect(() => createRawmask('', ' ')).toThrow(
      new TextInputMaskError('"" is not a valid selector'),
    );
    expect(() => createRawmask('notValid', ' ')).toThrow(
      new TextInputMaskError('input by "notValid" selector wasn\'t found'),
    );
    // @ts-ignore
    expect(() => createRawmask(div, ' ')).toThrow(
      new TextInputMaskError(
        'HTMLDivElement was passed instead of HTMLInputElement element',
      ),
    );
    expect(() => createRawmask('#notValidDiv', ' ')).toThrow(
      new TextInputMaskError('input by "#notValidDiv" selector wasn\'t found'),
    );
    expect(() => {
      const input = createInput();

      createRawmask(input, ' ');
      createRawmask(input, ' ');
    }).toThrow(new TextInputMaskError('you trying add mask to masked input'));
    expect(() => {
      const input = createInput();

      input.id = 'input';

      document.body.prepend(input);

      createRawmask('#input', ' ');
      createRawmask('#input', ' ');
    }).toThrow(
      new TextInputMaskError(
        'you trying add mask to masked input with selector "#input"',
      ),
    );
  });

  test('with no valid mask', () => {
    // @ts-ignore
    expect(() => createRawmask(createInput())).toThrow(
      new TextInputMaskError('mask should be a string or an array of strings'),
    );
    expect(() => createRawmask(createInput(), '')).toThrow(
      new TextInputMaskError("mask shouldn't be empty"),
    );
    expect(() => createRawmask(createInput(), [])).toThrow(
      new TextInputMaskError("mask shouldn't be empty"),
    );
    expect(() => createRawmask(createInput(), [''])).toThrow(
      new TextInputMaskError("mask shouldn't be empty"),
    );
    // @ts-ignore
    expect(() => createRawmask(createInput(), ['', null])).toThrow(
      new TextInputMaskError('array mask should has only strings'),
    );
  });

  test('with no valid options', () => {
    // @ts-ignore
    expect(() => createRawmask(createInput(), ' ', null)).toThrow(
      new TextInputMaskError('options should be an object'),
    );
    // @ts-ignore
    expect(() => createRawmask(createInput(), ' ', 'null')).toThrow(
      new TextInputMaskError('options should be an object'),
    );
    expect(() =>
      // @ts-ignore
      createRawmask(createInput(), ' ', { maskPlaceholder: 123 }),
    ).toThrow(
      new TextInputMaskError('incorrect option "maskPlaceholder" type: number'),
    );
    expect(() =>
      // @ts-ignore
      createRawmask(createInput(), ' ', { defaultRawValue: 123 }),
    ).toThrow(
      new TextInputMaskError('incorrect option "defaultRawValue" type: number'),
    );
    expect(() =>
      // @ts-ignore
      createRawmask(createInput(), ' ', { defaultValue: 123 }),
    ).toThrow(
      new TextInputMaskError('incorrect option "defaultValue" type: number'),
    );
  });
});

/* eslint-enable */
