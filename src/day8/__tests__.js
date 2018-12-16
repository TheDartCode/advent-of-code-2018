const {expect} = require('chai');
import {
  moduleA,
  moduleB,
} from './';

describe('Day 8', () => {
  const input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';

  describe('Puzzle A', () => {
    it('satisfies examples', () => {
      expect(moduleA(input)).to.eq(138);
    });
  });

  describe('Puzzle B', () => {
    it('satisfies examples', () => {
      expect(moduleB(input)).to.eq();
    });
  });

});
