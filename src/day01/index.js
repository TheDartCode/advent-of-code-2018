const parseInput = input => input
  .split('\n')
  .filter(line => !!line)
  .map(i => parseInt(i, 10));

const moduleA = input => {
  const frequencyChanges = parseInput(input);
  return frequencyChanges.reduce((reduction, val) => reduction + val, 0);
};

const moduleB = input => {
  const frequencyChanges = parseInput(input);
  const memo = [];

  let accumulator = 0;
  let i = 0;

  while (!memo.includes(accumulator)) {
    memo.push(accumulator);

    accumulator = accumulator + frequencyChanges[i];

    i = i + 1;

    if (i === frequencyChanges.length) {
      i = 0;
    }
  }

  return accumulator;
};

export {
  moduleA,
  moduleB,
  parseInput,
};
