export const createArrayFromRange = (range: [number, number]): number[] => {
  const start = Math.min(...range);
  const end = Math.max(...range);

  return Array.from({ length: end - start }).map((_, idx) => idx + start);
};
