const {expect} = require('chai');
import {
  moduleA,
  moduleB,
} from './';

describe('Day 11', () => {
  const input = '8';

  describe('Puzzle A', () => {
    it('satisfies examples', () => {
      expect(moduleA(input)).to.eq();
    });
  });

  describe('Puzzle B', () => {
    it('satisfies examples', () => {
      expect(moduleB(input)).to.eq();
    });
  });

});
