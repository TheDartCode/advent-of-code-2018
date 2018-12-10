const getCoveredInches = (top, left, width, height) => {
  const result = [];

  for (let y = top; y < top + height; y = y + 1) {
    for (let x = left; x < left + width; x = x + 1) {
      result.push({x, y});
    }
  }

  return result;
};

const parseClaim = claim => {
  const regex = /^#([\d]*?) @ ([\d]*?),([\d]*?): ([\d]*?)x([\d]*?)$/;

  const match = claim.match(regex);

  const id = parseInt(match[1], 10);
  const left = parseInt(match[2], 10);
  const top = parseInt(match[3], 10);
  const width = parseInt(match[4], 10);
  const height = parseInt(match[5], 10);

  return {
    id,
    left,
    top,
    width,
    height,
    inches: getCoveredInches(top, left, width, height),
  };
};

const parseInput = input => input
  .split('\n')
  .filter(line => !!line)
  .map(parseClaim);

const getOverlappedInches = claims => {
  const coveredInches = claims
    .reduce((r, i) => [...r, ...i.inches], []);

  const inchOccupations = coveredInches.reduce((reduction, inch) => {
    const key = JSON.stringify(inch);
    if (!reduction[key]) {
      reduction[key] = 0;
    }

    reduction[key] = reduction[key] + 1;

    return reduction;
  }, {});

  return Object.entries(inchOccupations)
    .filter(([, occ]) => occ > 1)
    .map(([inch]) => inch);
};

const moduleA = input => {
  const claims = parseInput(input);
  return getOverlappedInches(claims).length;
};

const moduleB = input => {
  const claims = parseInput(input);
  const overlappedInches = getOverlappedInches(claims);

  const nonOverlappingClaim = claims
    .find(claim => claim.inches.every(inch => !overlappedInches.includes(JSON.stringify(inch))));

  return nonOverlappingClaim.id;
};

export {
  parseClaim,
  getCoveredInches,
  moduleA,
  moduleB,
  parseInput,
};
