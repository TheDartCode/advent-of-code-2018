export const arrayUnique = arr => [...new Set(arr)];

export const numericMax = (arr, propertySelector = (x => x)) => arr
  .map(propertySelector)
  .sort((x, y) => x - y)[arr.length - 1];
