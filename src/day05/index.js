import {arrayUnique} from '../shared/helpers';

const doUnitsReact = (unitA, unitB) => {
  return Math.abs(unitA.charCodeAt(0) - unitB.charCodeAt(0)) === 32;
};

const getResultingPolymer = polymer => {
  let finished = false;

  do {
    const startingLength = polymer.length;
    for (let i = 0; i < polymer.length - 1; i = i + 1) {
      if (doUnitsReact(polymer[i], polymer[i + 1])) {
        polymer = polymer.substr(0, i) + polymer.substr(i + 2);
        i = i - 1;
      }
    }
    finished = polymer.length === startingLength;
  } while (!finished);

  return polymer;
};

const getUnitTypes = polymer => {
  const unitTypes = polymer
    .split('')
    .filter(c => c.charCodeAt(0) <= 90); // Z

  return arrayUnique(unitTypes).sort();
};

const removeUnitsFromPolymer = (polymer, unitType) => {
  const regex = new RegExp(unitType, 'ig');
  return polymer.replace(regex, '');
};

const getPolymerVariations = polymer => {
  const unitTypes = getUnitTypes(polymer);

  return unitTypes
    .map(t => removeUnitsFromPolymer(polymer, t))
    .map(v => getResultingPolymer(v));
};

const moduleA = input => {
  const polymer = input.trim();
  return getResultingPolymer(polymer).length;
};

const moduleB = input => {
  const polymer = input.trim();
  const shortestPolymer = getPolymerVariations(polymer)
    .sort((p1, p2) => p1.length - p2.length)[0];

  return shortestPolymer.length;
};

export {
  doUnitsReact,
  getResultingPolymer,
  getUnitTypes,
  removeUnitsFromPolymer,
  getPolymerVariations,
  moduleA,
  moduleB,
};
