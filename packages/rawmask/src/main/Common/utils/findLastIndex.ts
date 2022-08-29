export const findLastIndex = <Item>(
  array: Item[],
  predicate: (value: Item, index: number, array: Item[]) => boolean,
): number => {
  let l = array.length;

  // eslint-disable-next-line no-plusplus
  while (l--) {
    const currentItem = array[l];

    if (currentItem === undefined) {
      return l;
    }

    if (predicate(currentItem, l, array)) {
      return l;
    }
  }

  return -1;
};
