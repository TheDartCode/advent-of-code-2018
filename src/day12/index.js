import {findLastIndex} from '../shared/helpers';

class Pot {
  constructor(containsPlant, index) {
    this.containsPlant = containsPlant;
    this.index = index;
  }

  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return this.containsPlant
          ? 1
          : 0;
      case 'string':
      default:
        return this.containsPlant
          ? '#'
          : '.';
    }
  }

  setIndex(index) {
    this.index = index;
    return this;
  }

  static parse(str) {
    return new Pot(str === '#');
  }
}

class BreedingFact {
  constructor(precondition, outcome) {
    this.outcome = outcome;
    this.precondition = precondition;
  }

  static parse(str) {
    const [precondition, outcome] = str.split(' => ');
    return new BreedingFact(precondition, outcome === '#');
  }
}

const parsePots = line => {
  line = line.replace('initial state: ', '');
  return line.split('').map((char, index) => Pot.parse(char).setIndex(index));
};

const parseBreedingFacts = lines => {
  return lines.map(line => BreedingFact.parse(line));
};

const parseInput = input => {
  const lines = input.split('\n').filter(line => !!line);

  const pots = parsePots(lines[0]);
  const breedingFacts = parseBreedingFacts(lines.slice(1));

  return {pots, breedingFacts};
};

const extendPotList = pots => {
  // scan 4 pots to the left and right in order to cover
  // all pots that may contain plants in the next generation
  const minPotIndex = pots[0].index - 4;
  const maxPotIndex = pots[pots.length - 1].index + 4;
  const extendedPots = [];

  for (let i = minPotIndex; i < pots[0].index; i = i + 1) {
    extendedPots.push(new Pot(false, i));
  }

  extendedPots.push(...pots);

  for (let i = pots[pots.length - 1].index + 1; i <= maxPotIndex; i = i + 1) {
    extendedPots.push(new Pot(false, i));
  }

  return extendedPots;
};

const shrinkPotList = pots => {
  const indexContainingFirstPlant = pots
    .findIndex(pot => pot.containsPlant);

  const indexContainingLastPlant = findLastIndex(pots,
    pot => pot.containsPlant);

  return pots.slice(indexContainingFirstPlant, indexContainingLastPlant + 1);
};

const breedGeneration = (pots, breedingFacts) => {
  // extend the pot list to cover all pots that may
  // contain plants in the next generation
  pots = extendPotList(pots);

  const nextGeneration = pots.map((pot, index) => {
    const farLeftPot = pots[index - 2] || new Pot(false);
    const leftPot = pots[index - 1] || new Pot(false);
    const rightPot = pots[index + 1] || new Pot(false);
    const farRightPot = pots[index + 2] || new Pot(false);

    const precondition = `${farLeftPot}${leftPot}${pot}${rightPot}${farRightPot}`;
    const matchingFact = breedingFacts.find(fact => fact.precondition === precondition);

    return new Pot(matchingFact ? matchingFact.outcome : false, pot.index);
  });

  // shrink the pot list to start from the first pot that contains a
  // plant and end in the last one containing a plant.
  return shrinkPotList(nextGeneration);
};


const breed = (pots, breedingFacts, generations) => {
  const result = [
    {generation: 0, pots},
  ];
  for (let i = 0; i < generations; i = i + 1) {
    const nextGeneration = breedGeneration(result[result.length - 1].pots, breedingFacts);
    result.push({
      generation: i + 1,
      pots: nextGeneration,
    });
  }

  return result;
};

const moduleA = input => {
  const {pots, breedingFacts} = parseInput(input);
  const generations = breed(pots, breedingFacts, 20);

  return generations[20]
    .pots
    .filter(pot => pot.containsPlant)
    .reduce((acc, pot) => {
      return acc + pot.index;
    }, 0);
};

const moduleB = input => {

};

export {
  parseInput,
  breed,
  moduleA,
  moduleB,
};
