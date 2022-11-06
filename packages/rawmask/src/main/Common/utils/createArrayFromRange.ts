export const createArrayFromRange = (range: [number, number?]): number[] => {
  const start = range[0];
  const end = range[1];

  if (end === undefined) {
    return [start];
  }

  const [min, max] = [start, end].sort((a, b) => a - b);

  return Array.from({ length: max - min }).map((_, idx) => idx + min);
};
