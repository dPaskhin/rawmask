/* eslint-disable @typescript-eslint/ban-ts-comment */
import { textInputMask } from '@src/index';
import { TextInputMaskError } from '@src/Common/errors/TextInputMaskError';

const createInput = (): HTMLInputElement => document.createElement('input');

describe('Initialize with not valid params', () => {
  test('without params at all', () => {
    // @ts-ignore
    expect(() => textInputMask()).toThrow(
      new TextInputMaskError("input DOM element wasn't passed"),
    );
  });

  test('with not valid input', () => {
    const div = document.createElement('div');

    div.id = 'notValidDiv';

    // @ts-ignore
    expect(() => textInputMask(null)).toThrow(
      new TextInputMaskError("input DOM element wasn't passed"),
    );
    // @ts-ignore
    expect(() => textInputMask('')).toThrow(
      new TextInputMaskError("input DOM element wasn't passed"),
    );
    // @ts-ignore
    expect(() => textInputMask('notValid', ' ')).toThrow(
      new TextInputMaskError('input by "notValid" selector wasn\'t found'),
    );
    // @ts-ignore
    expect(() => textInputMask(div)).toThrow(
      new TextInputMaskError(
        'HTMLDivElement was passed instead of HTMLInputElement element',
      ),
    );
    // @ts-ignore
    expect(() => textInputMask('#notValidDiv', ' ')).toThrow(
      new TextInputMaskError('input by "#notValidDiv" selector wasn\'t found'),
    );
  });

  test('with no valid mask', () => {
    // @ts-ignore
    expect(() => textInputMask(createInput())).toThrow(
      new TextInputMaskError('mask should be string'),
    );
    expect(() => textInputMask(createInput(), '')).toThrow(
      new TextInputMaskError("mask shouldn't be empty"),
    );
  });

  test('with no valid options', () => {
    // @ts-ignore
    expect(() => textInputMask(createInput(), ' ', null)).toThrow(
      new TextInputMaskError('options should be an object'),
    );
    // @ts-ignore
    expect(() => textInputMask(createInput(), ' ', 'null')).toThrow(
      new TextInputMaskError('options should be an object'),
    );
    expect(() =>
      // @ts-ignore
      textInputMask(createInput(), ' ', { maskPlaceholder: 123 }),
    ).toThrow(
      new TextInputMaskError('incorrect option "maskPlaceholder" type: number'),
    );
    expect(() =>
      // @ts-ignore
      textInputMask(createInput(), ' ', { defaultValue: 123 }),
    ).toThrow(
      new TextInputMaskError('incorrect option "defaultValue" type: number'),
    );
  });
});

/* eslint-enable */
