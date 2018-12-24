const arrayUnique = arr => [...new Set(arr)];

const numericMax = (arr, propertySelector = (x => x)) => arr
  .map(propertySelector)
  .sort((x, y) => x - y)[arr.length - 1];

const numericMin = (arr, propertySelector = (x => x)) => arr
  .map(propertySelector)
  .sort((x, y) => x - y)[0];

const range = length => {
  return new Array(length)
    .fill(null)
    .map((_, index) => index);
};

const arraySum = (arr, propertySelector = (x => x)) => arr
  .map(propertySelector)
  .reduce((acc, x) => acc + x, 0);

const arrayAvg = (arr, propertySelector = (x => x)) => {
  return arraySum(arr, propertySelector) / arr.length;
};

const manhattanDistance = (p1, p2) => {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
};

const findLastIndex = (arr, func) => {
  for (let i = arr.length - 1; i >= 0; i = i - 1) {
    if (func(arr[i])) {
      return i;
    }
  }

  return -1;
};

export {
  arrayAvg,
  arrayUnique,
  findLastIndex,
  manhattanDistance,
  numericMax,
  numericMin,
  range,
};
