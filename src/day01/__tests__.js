import {expect} from 'chai';
import {moduleA, moduleB, parseInput} from './';

describe('Day 1', () => {
  describe('helpers', () => {
    describe('#parseInput', () => {
      it('parses string input', () => {
        expect(parseInput('+3\n+3\n+4\n-2\n-4')).to.deep.eq([3, 3, 4, -2, -4]);
      });
    });
  });

  /**
   *
   * +1, +1, +1 results in  3
   * +1, +1, -2 results in  0
   * -1, -2, -3 results in -6
   *
   */
  describe('Puzzle A', () => {
    it('satisfies examples', () => {
      expect(moduleA('1\n1\n1')).to.eq(3);
      expect(moduleA('1\n1\n-2')).to.eq(0);
      expect(moduleA('-1\n-2\n-3')).to.eq(-6);
    });
  });

  /**
  *
  * +1, -1 first reaches 0 twice.
  * +3, +3, +4, -2, -4 first reaches 10 twice.
  * -6, +3, +8, +5, -6 first reaches 5 twice.
  * +7, +7, -2, -7, -4 first reaches 14 twice.
  *
  */
  describe('Puzzle B', () => {
    it('satisfies examples', () => {
      expect(moduleB('+1\n-1')).to.eq(0);
      expect(moduleB('3\n3\n4\n-2\n-4')).to.eq(10);
      expect(moduleB('-6\n3\n8\n5\n-6')).to.eq(5);
      expect(moduleB('7\n7\n-2\n-7\n-4')).to.eq(14);
    });
  });
});
