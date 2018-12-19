export const arrayUnique = arr => [...new Set(arr)];

export const numericMax = (arr, propertySelector = (x => x)) => arr
  .map(propertySelector)
  .sort((x, y) => x - y)[arr.length - 1];

export const numericMin = (arr, propertySelector = (x => x)) => arr
  .map(propertySelector)
  .sort((x, y) => x - y)[0];

export const range = length => {
  return new Array(length)
    .fill(null)
    .map((_, index) => index);
};

export const arraySum = (arr, propertySelector = (x => x)) => arr
  .map(propertySelector)
  .reduce((acc, x) => acc + x, 0);

export const arrayAvg = (arr, propertySelector = (x => x)) => {
  return arraySum(arr, propertySelector) / arr.length;
};

export const manhattanDistance = (p1, p2) => {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
};
