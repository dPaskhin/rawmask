import { createArrayFromRange } from '../main/Common/utils/createArrayFromRange';
import { findLastIndex } from '../main/Common/utils/findLastIndex';
import { isMaskEquals } from '../main/Common/utils/isMaskEquals';
import { isSelectorValid } from '../main/Common/utils/isSelectorValid';

describe('Utils', () => {
  describe('Create array from range', () => {
    test('base', () => {
      expect(createArrayFromRange([0, 5])).toEqual([0, 1, 2, 3, 4]);
    });
    test('without end', () => {
      expect(createArrayFromRange([2])).toEqual([2]);
    });
    test('wrong order', () => {
      expect(createArrayFromRange([5, 2])).toEqual([2, 3, 4]);
    });
    test('negatives', () => {
      expect(createArrayFromRange([-5, 2])).toEqual([-5, -4, -3, -2, -1, 0, 1]);
    });
  });

  describe('Find last index', () => {
    test('base', () => {
      expect(findLastIndex([0, 5], (item) => item === 5)).toEqual(1);
    });
    test('duplicates', () => {
      expect(findLastIndex([0, 5, 5, 5], (item) => item === 5)).toEqual(3);
    });
    test('not found', () => {
      expect(findLastIndex([0, 5, 5, 5], (item) => item === 1)).toEqual(-1);
    });
  });

  describe('Are masks equal', () => {
    test('base', () => {
      expect(isMaskEquals('+7 (999) 999-99-99', '+7 (999) 999-99-99')).toEqual(
        true,
      );
      expect(isMaskEquals('+7 (999) 999-99-99', '+7 (991) 999-99-99')).toEqual(
        false,
      );
    });

    test('arrays', () => {
      expect(isMaskEquals(['1', '9', '1'], ['1', '9', '1'])).toEqual(true);
      expect(isMaskEquals(['1', '9', '1'], ['1', '1', '1'])).toEqual(false);
    });

    test('regexp arrays', () => {
      expect(isMaskEquals([/\d/, /\s/, /d/], [/\d/, /\s/, /d/])).toEqual(true);
      expect(isMaskEquals([/\d/, /\s/, /d/], [/\d/, /\s/, /s/])).toEqual(false);
    });

    test('multiple elements in arrays', () => {
      expect(
        isMaskEquals(
          ['+\\9\\98 ', '( ', '', '99', ' )', ' 999-', '99-', '99'],
          [
            '+',
            '\\9\\98 ',
            '( ',
            '9',
            '9',
            ' )',
            ' ',
            '999',
            '-',
            '99-',
            '9',
            '9',
          ],
        ),
      ).toEqual(true);
      expect(
        isMaskEquals(
          ['+\\9\\98 ', '( ', '', '99', ' )', ' 999-', '99-', '99'],
          ['+\\9\\98 ', '(', '', '99', ' )', ' 999-', '99-', '99'],
        ),
      ).toEqual(false);
    });
  });

  describe('Is selector valid', () => {
    test('base', () => {
      expect(isSelectorValid('div')).toEqual(true);
      expect(isSelectorValid('1div')).toEqual(false);
      expect(isSelectorValid('[test=sad]')).toEqual(true);
      expect(isSelectorValid('[1test=sad]')).toEqual(false);
    });
  });
});
