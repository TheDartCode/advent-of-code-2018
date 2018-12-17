const {expect} = require('chai');
import {
  getCircularArrayIndex,
} from './gameEngine';
import {
  parseInput,
  arrayGameEngine,
  linkedListGameEngine,
  moduleA,
  moduleB,
} from './';

describe('Day 9', () => {
  const input = '9 players; last marble is worth 25 points';

  describe('helpers', () => {
    describe('#parseInput', () => {
      it('parses number of players and marbles', () => {
        expect(parseInput(input)).to.deep.eq({
          players: 9,
          marbles: 25,
        });
      });
    });

    describe('#getCircularArrayIndex', () => {
      it('calculates the next position based on the difference and the array length', () => {
        expect(getCircularArrayIndex(0, 1, 1), '1 cw from 0 with a total of 1').to.eq(0);
        expect(getCircularArrayIndex(1, 1, 2), '1 cw from 1 with a total of 2').to.eq(0);
        expect(getCircularArrayIndex(1, 1, 3), '1 cw from 3 with a total of 3').to.eq(2);
        expect(getCircularArrayIndex(15, 1, 16), '1 cw from 15 with a total of 16').to.eq(0);
        expect(getCircularArrayIndex(13, -7, 23), '7 ccw from 13 with a total of 23').to.eq(6);
        expect(getCircularArrayIndex(2, -2, 7)).to.eq(0);
        expect(getCircularArrayIndex(2, -3, 7)).to.eq(6);
        expect(getCircularArrayIndex(2, -4, 7)).to.eq(5);
      });
    });

    describe('#arrayGameEngine', () => {
      it('plays turns sequentially for all players until marbles run out', () => {
        expect(arrayGameEngine(9, 22)).to.deep.eq({
          circle: [0, 16, 8, 17, 4, 18, 9, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15],
          currentMarbleIndex: 13,
          score: {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0},
        });
        expect(arrayGameEngine(9, 23)).to.deep.eq({
          circle: [0, 16, 8, 17, 4, 18, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15],
          currentMarbleIndex: 6,
          score: {'1': 0, '2': 0, '3': 0, '4': 0, '5': 32, '6': 0, '7': 0, '8': 0, '9': 0},
        });
        expect(arrayGameEngine(9, 25)).to.deep.eq({
          circle: [0, 16, 8, 17, 4, 18, 19, 2, 24, 20, 25, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15],
          currentMarbleIndex: 10,
          score: {'1': 0, '2': 0, '3': 0, '4': 0, '5': 32, '6': 0, '7': 0, '8': 0, '9': 0},
        });
      });
    });

    describe('#linkedListGameEngine', () => {
      it('plays turns sequentially for all players until marbles run out', () => {
        expect(linkedListGameEngine(9, 22)).to.deep.eq({
          circle: [0, 16, 8, 17, 4, 18, 9, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15],
          currentMarbleIndex: 13,
          score: {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0},
        });
        expect(linkedListGameEngine(9, 23)).to.deep.eq({
          circle: [0, 16, 8, 17, 4, 18, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15],
          currentMarbleIndex: 6,
          score: {'1': 0, '2': 0, '3': 0, '4': 0, '5': 32, '6': 0, '7': 0, '8': 0, '9': 0},
        });
        expect(linkedListGameEngine(9, 25)).to.deep.eq({
          circle: [0, 16, 8, 17, 4, 18, 19, 2, 24, 20, 25, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15],
          currentMarbleIndex: 10,
          score: {'1': 0, '2': 0, '3': 0, '4': 0, '5': 32, '6': 0, '7': 0, '8': 0, '9': 0},
        });
      });
    });
  });

  describe('Puzzle A', () => {
    it('satisfies examples', () => {
      expect(moduleA(input)).to.eq(32);
      expect(moduleA('10 players; last marble is worth 1618 points')).to.eq(8317);
      expect(moduleA('13 players; last marble is worth 7999 points')).to.eq(146373);
      expect(moduleA('17 players; last marble is worth 1104 points')).to.eq(2764);
      expect(moduleA('21 players; last marble is worth 6111 points')).to.eq(54718);
      expect(moduleA('30 players; last marble is worth 5807 points')).to.eq(37305);
    });
  });

  describe('Puzzle B', () => {
    it('satisfies examples', () => {
      expect(moduleB(input)).to.eq(22563);
    });
  });

});
