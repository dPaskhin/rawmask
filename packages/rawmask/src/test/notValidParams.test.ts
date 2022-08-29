/* eslint-disable @typescript-eslint/ban-ts-comment */
import { rawmask } from '../main';
import { TextInputMaskError } from '../main/Common/errors/TextInputMaskError';

const createInput = (): HTMLInputElement => document.createElement('input');

describe('Initialize with not valid params', () => {
  test('without params at all', () => {
    // @ts-ignore
    expect(() => rawmask()).toThrow(
      new TextInputMaskError("input DOM element wasn't passed"),
    );
  });

  test('with not valid input', () => {
    const div = document.createElement('div');

    div.id = 'notValidDiv';

    // @ts-ignore
    expect(() => rawmask(null, ' ')).toThrow(
      new TextInputMaskError("input DOM element wasn't passed"),
    );
    expect(() => rawmask('', ' ')).toThrow(
      new TextInputMaskError('"" is not a valid selector'),
    );
    expect(() => rawmask('notValid', ' ')).toThrow(
      new TextInputMaskError('input by "notValid" selector wasn\'t found'),
    );
    // @ts-ignore
    expect(() => rawmask(div, ' ')).toThrow(
      new TextInputMaskError(
        'HTMLDivElement was passed instead of HTMLInputElement element',
      ),
    );
    expect(() => rawmask('#notValidDiv', ' ')).toThrow(
      new TextInputMaskError('input by "#notValidDiv" selector wasn\'t found'),
    );
    expect(() => {
      const input = createInput();

      rawmask(input, ' ');
      rawmask(input, ' ');
    }).toThrow(new TextInputMaskError('you trying add mask to masked input'));
    expect(() => {
      const input = createInput();

      input.id = 'input';

      document.body.prepend(input);

      rawmask('#input', ' ');
      rawmask('#input', ' ');
    }).toThrow(
      new TextInputMaskError(
        'you trying add mask to masked input with selector "#input"',
      ),
    );
  });

  test('with no valid mask', () => {
    // @ts-ignore
    expect(() => rawmask(createInput())).toThrow(
      new TextInputMaskError('mask should be a string or an array of strings'),
    );
    expect(() => rawmask(createInput(), '')).toThrow(
      new TextInputMaskError("mask shouldn't be empty"),
    );
    expect(() => rawmask(createInput(), [])).toThrow(
      new TextInputMaskError("mask shouldn't be empty"),
    );
    expect(() => rawmask(createInput(), [''])).toThrow(
      new TextInputMaskError("mask shouldn't be empty"),
    );
    // @ts-ignore
    expect(() => rawmask(createInput(), ['', null])).toThrow(
      new TextInputMaskError('array mask should has only strings'),
    );
  });

  test('with no valid options', () => {
    // @ts-ignore
    expect(() => rawmask(createInput(), ' ', null)).toThrow(
      new TextInputMaskError('options should be an object'),
    );
    // @ts-ignore
    expect(() => rawmask(createInput(), ' ', 'null')).toThrow(
      new TextInputMaskError('options should be an object'),
    );
    expect(() =>
      // @ts-ignore
      rawmask(createInput(), ' ', { maskPlaceholder: 123 }),
    ).toThrow(
      new TextInputMaskError('incorrect option "maskPlaceholder" type: number'),
    );
    expect(() =>
      // @ts-ignore
      rawmask(createInput(), ' ', { defaultValue: 123 }),
    ).toThrow(
      new TextInputMaskError('incorrect option "defaultValue" type: number'),
    );
    expect(() =>
      // @ts-ignore
      rawmask(createInput(), ' ', { defaultMaskedValue: 123 }),
    ).toThrow(
      new TextInputMaskError(
        'incorrect option "defaultMaskedValue" type: number',
      ),
    );
  });
});

/* eslint-enable */
