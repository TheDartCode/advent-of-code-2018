const {expect} = require('chai');
import {
  moduleA,
  moduleB,
  countLetterOccurrences,
  findSimilarEntries,
} from './';

describe('Day 2', () => {
  describe('helpers', () => {
    describe('#countLetterOccurrences', () => {
      it('counts letter occurrences in a box ID', () => {
        const input = [
          'abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee',
        ];
        expect(countLetterOccurrences(input)).to.deep.eq({
          abcdef: {},
          bababc: {a: 2, b: 3},
          abbcde: {b: 2},
          abcccd: {c: 3},
          aabcdd: {a: 2, d: 2},
          abcdee: {e: 2},
        });
      });
    });

    describe('#findSimilarEntries', () => {
      it('finds box IDs that differ by exactly one character', () => {
        const input = [
          'abcde', 'fghij', 'klmno', 'pqrst', 'fguij', 'axcye', 'wvxyz',
        ];
        expect(findSimilarEntries(input)).to.deep.eq(['fghij', 'fguij']);
      });
    });
  });
  /*
   *
   * abcdef contains no letters that appear exactly two or three times.
   * bababc contains two a and three b, so it counts for both.
   * abbcde contains two b, but no letter appears exactly three times.
   * abcccd contains three c, but no letter appears exactly two times.
   * aabcdd contains two a and two d, but it only counts once.
   * abcdee contains two e.
   *
   * Of these box IDs, four of them contain a letter which appears exactly twice,
   * and three of them contain a letter which appears exactly three times.
   * Multiplying these together produces a checksum of 4 * 3 = 12.
   */
  describe('Puzzle A', () => {
    it('satisfies examples', () => {
      const input = 'abcdef\nbababc\nabbcde\nabcccd\naabcdd\nabcdee';
      expect(moduleA(input)).to.eq(8);
    });
  });

  /*
   *
   * abcde
   * fghij
   * klmno
   * pqrst
   * fguij
   * axcye
   * wvxyz
   * The IDs abcde and axcye are close, but they differ by two characters (the second and fourth).
   * However, the IDs fghij and fguij differ by exactly one character, the third (h and u).
   * Those must be the correct boxes.
   * What letters are common between the two correct box IDs?
   * (In the example above, this is found by removing the differing character from either ID, producing fgij.)
   *
   */
  describe('Puzzle B', () => {
    it('satisfies examples', () => {
      const input = 'abcde\nfghij\nklmno\npqrst\nfguij\naxcye\nwvxyz';
      expect(moduleB(input)).to.eq('fgij');
    });
  });
});
