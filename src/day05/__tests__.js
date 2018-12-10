const {expect} = require('chai');
import {
  doUnitsReact,
  getResultingPolymer,
  getUnitTypes,
  removeUnitsFromPolymer,
  getPolymerVariations,
  moduleA,
  moduleB,
} from './';

describe('Day 5', () => {
  /*
   *
   * The polymer is formed by smaller units which, when triggered, react with
   * each other such that two adjacent units of the same type and opposite
   * polarity are destroyed.
   * Units' types are represented by letters; units' polarity is represented by
   * capitalization. For instance, r and R are units with the same type but
   * opposite polarity, whereas r and s are entirely different types and do not react.
   * For example:
   *
   * In aA, a and A react, leaving nothing behind.
   * In abBA, bB destroys itself, leaving aA. As above, this then destroys itself, leaving nothing.
   * In abAB, no two adjacent units are of the same type, and so nothing happens.
   * In aabAAB, even though aa and AA are of the same type, their polarities match, and so nothing happens.
   *
   */
  describe('helpers', () => {
    describe('#doUnitsReact', () => {
      it('returns true only when the two units are same type different polarity', () => {
        expect(doUnitsReact('a', 'A')).to.eq(true);
        expect(doUnitsReact('b', 'A')).to.eq(false);
        expect(doUnitsReact('B', 'b')).to.eq(true);
        expect(doUnitsReact('a', 'a')).to.eq(false);
        expect(doUnitsReact('A', 'B')).to.eq(false);
      });
    });

    /*
     *
     * Now, consider a larger example, dabAcCaCBAcCcaDA:
     *
     * dabAcCaCBAcCcaDA  The first 'cC' is removed.
     * dabAaCBAcCcaDA    This creates 'Aa', which is removed.
     * dabCBAcCcaDA      Either 'cC' or 'Cc' are removed (the result is the same).
     * dabCBAcaDA        No further actions can be taken.
     * After all possible reactions, the resulting polymer contains 10 units.
     *
     */
    describe('#getResultingPolymer', () => {
      it('reduces a given polymer to its equivalent after reactions', () => {
        expect(getResultingPolymer('dabAcCaCBAcCcaDA')).to.eq('dabCBAcaDA');
      });
    });

    describe('#getUnitTypes', () => {
      it('returns the distinct unit types found in a polymer', () => {
        expect(getUnitTypes('dabAcCaCBAcCcaDA')).to.deep.eq(['A', 'B', 'C', 'D']);
      });
    });

    /*
     * For example, again using the polymer dabAcCaCBAcCcaDA from above:
     *
     * Removing all A/a units produces dbcCCBcCcD. Fully reacting this polymer produces dbCBcD, which has length 6.
     * Removing all B/b units produces daAcCaCAcCcaDA. Fully reacting this polymer produces daCAcaDA, which has length 8.
     * Removing all C/c units produces dabAaBAaDA. Fully reacting this polymer produces daDA, which has length 4.
     * Removing all D/d units produces abAcCaCBAcCcaA. Fully reacting this polymer produces abCBAc, which has length 6.
     */

    describe('#removeUnitsFromPolymer', () => {
      it('removes all units of given type, regardless of polarity', () => {
        expect(removeUnitsFromPolymer('dabAcCaCBAcCcaDA', 'A')).to.eq('dbcCCBcCcD');
        expect(removeUnitsFromPolymer('dabAcCaCBAcCcaDA', 'B')).to.eq('daAcCaCAcCcaDA');
        expect(removeUnitsFromPolymer('dabAcCaCBAcCcaDA', 'C')).to.eq('dabAaBAaDA');
        expect(removeUnitsFromPolymer('dabAcCaCBAcCcaDA', 'D')).to.eq('abAcCaCBAcCcaA');
      });
    });

    describe('#getPolymerVariations', () => {
      it('detects all possible polymer variations and fully reacts them', () => {
        expect(getPolymerVariations('dabAcCaCBAcCcaDA')).to.deep.eq(['dbCBcD', 'daCAcaDA', 'daDA', 'abCBAc']);
      });
    });
  });

  describe('Puzzle A', () => {
    it('satisfies examples', () => {
      expect(moduleA('dabAcCaCBAcCcaDA')).to.eq(10);
    });
  });

  /*
   *
   *
   *
   */
  describe('Puzzle B', () => {
    it('satisfies examples', () => {
      expect(moduleB('dabAcCaCBAcCcaDA')).to.eq(4);
    });
  });
});
