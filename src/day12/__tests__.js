const {expect} = require('chai');
import {
  parseInput,
  breed,
  moduleA,
  moduleB,
} from './';

describe('Day 12', () => {
  const input = [
    'initial state: #..#.#..##......###...###',
    '',
    '...## => #',
    '..#.. => #',
    '.#... => #',
    '.#.#. => #',
    '.#.## => #',
    '.##.. => #',
    '.#### => #',
    '#.#.# => #',
    '#.### => #',
    '##.#. => #',
    '##.## => #',
    '###.. => #',
    '###.# => #',
    '####. => #',
  ].join('\n');

  describe('helpers', () => {
    describe('#parseInput', () => {
      it('parses the input text into pots and breeding facts', () => {
        const {pots, breedingFacts} = parseInput(input);
        expect(pots.filter(pot => pot.containsPlant)).to.have.length(11);
        expect(pots.filter(pot => !pot.containsPlant)).to.have.length(14);

        expect(breedingFacts).to.have.length(14);
        expect(breedingFacts.filter(breedingFact => breedingFact.outcome)).to.have.length(14);
      });
    });

    /*
     *
     *                  1         2         3
     *        0         0         0         0
     *  0: ...#..#.#..##......###...###...........
     *  1: ...#...#....#.....#..#..#..#...........
     *  2: ...##..##...##....#..#..#..##..........
     *  3: ..#.#...#..#.#....#..#..#...#..........
     *  4: ...#.#..#...#.#...#..#..##..##.........
     *  5: ....#...##...#.#..#..#...#...#.........
     *  6: ....##.#.#....#...#..##..##..##........
     *  7: ...#..###.#...##..#...#...#...#........
     *  8: ...#....##.#.#.#..##..##..##..##.......
     *  9: ...##..#..#####....#...#...#...#.......
     * 10: ..#.#..#...#.##....##..##..##..##......
     * 11: ...#...##...#.#...#.#...#...#...#......
     * 12: ...##.#.#....#.#...#.#..##..##..##.....
     * 13: ..#..###.#....#.#...#....#...#...#.....
     * 14: ..#....##.#....#.#..##...##..##..##....
     * 15: ..##..#..#.#....#....#..#.#...#...#....
     * 16: .#.#..#...#.#...##...#...#.#..##..##...
     * 17: ..#...##...#.#.#.#...##...#....#...#...
     * 18: ..##.#.#....#####.#.#.#...##...##..##..
     * 19: .#..###.#..#.#.#######.#.#.#..#.#...#..
     * 20: .#....##....#####...#######....#.#..##.
     *
     */
    describe('#breed', () => {
      it('predicts the outcome of breeding one generation of pots according to the breeding facts', () => {
        const {pots, breedingFacts} = parseInput(input);
        const generations = breed(pots, breedingFacts, 20);

        expect(generations[20].pots.map(p => p.index)).to.deep.eq([
          -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
          12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
          24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
        ]);

        expect(generations.map(g => g.pots.join(''))).to.deep.eq([
          '#..#.#..##......###...###',
          '#...#....#.....#..#..#..#',
          '##..##...##....#..#..#..##',
          '#.#...#..#.#....#..#..#...#',
          '#.#..#...#.#...#..#..##..##',
          '#...##...#.#..#..#...#...#',
          '##.#.#....#...#..##..##..##',
          '#..###.#...##..#...#...#...#',
          '#....##.#.#.#..##..##..##..##',
          '##..#..#####....#...#...#...#',
          '#.#..#...#.##....##..##..##..##',
          '#...##...#.#...#.#...#...#...#',
          '##.#.#....#.#...#.#..##..##..##',
          '#..###.#....#.#...#....#...#...#',
          '#....##.#....#.#..##...##..##..##',
          '##..#..#.#....#....#..#.#...#...#',
          '#.#..#...#.#...##...#...#.#..##..##',
          '#...##...#.#.#.#...##...#....#...#',
          '##.#.#....#####.#.#.#...##...##..##',
          '#..###.#..#.#.#######.#.#.#..#.#...#',
          '#....##....#####...#######....#.#..##',
        ]);
      });
    });
  });

  describe('Puzzle A', () => {
    it('satisfies examples', () => {
      expect(moduleA(input)).to.eq(325);
    });
  });

  describe('Puzzle B', () => {
    it('satisfies examples', () => {
      expect(moduleB(input)).to.eq(999999999374);
    });
  });

});