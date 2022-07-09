export const createArrayFromRange = (range: [number, number]): number[] => {
  const start = range[0];
  const end = range[1];

  return Array.from({ length: Math.abs(end - start) }).map(
    (_, idx) => idx + start,
  );
};
