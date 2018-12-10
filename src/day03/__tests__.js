const {expect} = require('chai');
import {moduleA, moduleB, parseClaim, getCoveredInches} from './';

describe('Day 3', () => {

  describe('helpers', () => {

    describe('#getCoveredInches', () => {
      it('calculates all the fabric points that a claim occupies correctly', () => {
        expect(getCoveredInches(2, 3, 5, 4)).to.deep.eq([
          {x: 3, y: 2}, {x: 4, y: 2}, {x: 5, y: 2}, {x: 6, y: 2}, {x: 7, y: 2},
          {x: 3, y: 3}, {x: 4, y: 3}, {x: 5, y: 3}, {x: 6, y: 3}, {x: 7, y: 3},
          {x: 3, y: 4}, {x: 4, y: 4}, {x: 5, y: 4}, {x: 6, y: 4}, {x: 7, y: 4},
          {x: 3, y: 5}, {x: 4, y: 5}, {x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5},
        ]);
      });
    });

    /*
     *
     * A claim like #123 @ 3,2: 5x4 means that claim
     *  ID 123 specifies a rectangle
     *  3 inches from the left edge,
     *  2 inches from the top edge,
     *  5 inches wide,
     *  and 4 inches tall.
     *
     */
    describe('#parseClaim', () => {
      it('parses the claim string correctly', () => {
        expect(parseClaim('#123 @ 3,2: 5x4')).to.deep.eq({
          id: 123,
          left: 3,
          top: 2,
          width: 5,
          height: 4,
          inches: [
            {x: 3, y: 2}, {x: 4, y: 2}, {x: 5, y: 2}, {x: 6, y: 2}, {x: 7, y: 2},
            {x: 3, y: 3}, {x: 4, y: 3}, {x: 5, y: 3}, {x: 6, y: 3}, {x: 7, y: 3},
            {x: 3, y: 4}, {x: 4, y: 4}, {x: 5, y: 4}, {x: 6, y: 4}, {x: 7, y: 4},
            {x: 3, y: 5}, {x: 4, y: 5}, {x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5},
          ],
        });
      });
    });
  });

  /*
   *
   * #1 @ 1,3: 4x4
   * #2 @ 3,1: 4x4
   * #3 @ 5,5: 2x2
   * Visually, these claim the following areas:
   *
   * ........
   * ...2222.
   * ...2222.
   * .11XX22.
   * .11XX22.
   * .111133.
   * .111133.
   * ........
   * The four square inches marked with X are claimed by both 1 and 2.
   * (Claim 3, while adjacent to the others, does not overlap either of them.)
   *
   */
  describe('Puzzle A', () => {
    it('satisfies examples', () => {
      const claims = '#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2';

      expect(moduleA(claims)).to.eq(4);
    });
  });

  /*
   *
   *
   *
   */
  describe('Puzzle B', () => {
    it('satisfies examples', () => {
      const claims = '#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2';

      expect(moduleB(claims)).to.eq(3);
    });
  });
});
