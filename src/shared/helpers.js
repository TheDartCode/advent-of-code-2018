export const arrayUnique = arr => [...new Set(arr)];

export const numericMaxBy = (arr, propertySelector) => arr
  .map(propertySelector)
  .sort((x, y) => x - y)[arr.length - 1];
