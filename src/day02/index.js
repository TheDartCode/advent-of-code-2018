const parseInput = input => input.split('\n').filter(line => !!line);

const countLetterOccurrences = boxIDs => {
  return boxIDs.reduce((reduction, item) => {
    const counts = {};

    for (let i = 0; i < item.length; i = i + 1) {
      const c = item[i];

      counts[c] = counts[c] ? (counts[c] + 1) : 1;
    }

    Object.keys(counts).forEach(key => {
      if (counts[key] >= 2 && counts[key] <= 3) {
        return;
      }

      delete counts[key];
    });

    reduction[item] = counts;
    return reduction;
  }, {});
};

const moduleA = input => {
  const boxIDs = parseInput(input);
  const letterOccurrences = countLetterOccurrences(boxIDs);

  const twoCounts = Object.values(letterOccurrences).filter(c => Object.values(c).includes(2)).length;
  const threeCounts = Object.values(letterOccurrences).filter(c => Object.values(c).includes(3)).length;

  return twoCounts * threeCounts;
};

const stringDistance = (strA, strB) => {
  if (strA.length !== strB.length) {
    throw new Error(`String lengths are not equal: ${strA} - ${strB}`);
  }

  let distance = 0;

  for (let i = 0; i < strA.length; i = i + 1) {
    if (strA[i] !== strB[i]) {
      distance = distance + 1;
    }
  }

  return distance;
};

const stringCommon = (strA, strB) => {
  if (strA.length !== strB.length) {
    throw new Error(`String lengths are not equal: ${strA} - ${strB}`);
  }

  let result = '';

  for (let i = 0; i < strA.length; i = i + 1) {
    if (strA[i] === strB[i]) {
      result = result + strA[i];
    }
  }

  return result;
};

const findSimilarEntries = boxIDs => {
  const matrix = {};

  boxIDs.forEach(l1 => {
    matrix[l1] = {};
    boxIDs.forEach(l2 => {
      matrix[l1][l2] = stringDistance(l1, l2);
    });
  });

  return boxIDs.reduce((reduction, l) => {
    if (Object.values(matrix[l]).filter(c => c === 1).length > 0) {
      reduction.push(l);
    }
    return reduction;
  }, []);
};

const moduleB = input => {
  const boxIDs = parseInput(input);
  const similarEntries = findSimilarEntries(boxIDs);

  return stringCommon(similarEntries[0], similarEntries[1]);
};

export {
  countLetterOccurrences,
  findSimilarEntries,
  moduleA,
  moduleB,
  parseInput,
};
