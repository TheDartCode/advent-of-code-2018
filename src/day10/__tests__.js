const {expect} = require('chai');
import {
  readPoint,
  constructSnapshot,
  findMostCohesiveSnapshot,
  renderSnapshot,
  moduleA,
  moduleB,
} from './';

describe('Day 10', () => {
  const lines = [
    'position=< 9,  1> velocity=< 0,  2>',
    'position=< 7,  0> velocity=<-1,  0>',
    'position=< 3, -2> velocity=<-1,  1>',
    'position=< 6, 10> velocity=<-2, -1>',
    'position=< 2, -4> velocity=< 2,  2>',
    'position=<-6, 10> velocity=< 2, -2>',
    'position=< 1,  8> velocity=< 1, -1>',
    'position=< 1,  7> velocity=< 1,  0>',
    'position=<-3, 11> velocity=< 1, -2>',
    'position=< 7,  6> velocity=<-1, -1>',
    'position=<-2,  3> velocity=< 1,  0>',
    'position=<-4,  3> velocity=< 2,  0>',
    'position=<10, -3> velocity=<-1,  1>',
    'position=< 5, 11> velocity=< 1, -2>',
    'position=< 4,  7> velocity=< 0, -1>',
    'position=< 8, -2> velocity=< 0,  1>',
    'position=<15,  0> velocity=<-2,  0>',
    'position=< 1,  6> velocity=< 1,  0>',
    'position=< 8,  9> velocity=< 0, -1>',
    'position=< 3,  3> velocity=<-1,  1>',
    'position=< 0,  5> velocity=< 0, -1>',
    'position=<-2,  2> velocity=< 2,  0>',
    'position=< 5, -2> velocity=< 1,  2>',
    'position=< 1,  4> velocity=< 2,  1>',
    'position=<-2,  7> velocity=< 2, -2>',
    'position=< 3,  6> velocity=<-1, -1>',
    'position=< 5,  0> velocity=< 1,  0>',
    'position=<-6,  0> velocity=< 2,  0>',
    'position=< 5,  9> velocity=< 1, -2>',
    'position=<14,  7> velocity=<-2,  0>',
    'position=<-3,  6> velocity=< 2, -1>',
  ];

  const points = [
    {position: {x: 9, y: 1}, velocity: {x: 0, y: 2}},
    {position: {x: 7, y: 0}, velocity: {x: -1, y: 0}},
    {position: {x: 3, y: -2}, velocity: {x: -1, y: 1}},
    {position: {x: 6, y: 10}, velocity: {x: -2, y: -1}},
    {position: {x: 2, y: -4}, velocity: {x: 2, y: 2}},
    {position: {x: -6, y: 10}, velocity: {x: 2, y: -2}},
    {position: {x: 1, y: 8}, velocity: {x: 1, y: -1}},
    {position: {x: 1, y: 7}, velocity: {x: 1, y: 0}},
    {position: {x: -3, y: 11}, velocity: {x: 1, y: -2}},
    {position: {x: 7, y: 6}, velocity: {x: -1, y: -1}},
    {position: {x: -2, y: 3}, velocity: {x: 1, y: 0}},
    {position: {x: -4, y: 3}, velocity: {x: 2, y: 0}},
    {position: {x: 10, y: -3}, velocity: {x: -1, y: 1}},
    {position: {x: 5, y: 11}, velocity: {x: 1, y: -2}},
    {position: {x: 4, y: 7}, velocity: {x: 0, y: -1}},
    {position: {x: 8, y: -2}, velocity: {x: 0, y: 1}},
    {position: {x: 15, y: 0}, velocity: {x: -2, y: 0}},
    {position: {x: 1, y: 6}, velocity: {x: 1, y: 0}},
    {position: {x: 8, y: 9}, velocity: {x: 0, y: -1}},
    {position: {x: 3, y: 3}, velocity: {x: -1, y: 1}},
    {position: {x: 0, y: 5}, velocity: {x: 0, y: -1}},
    {position: {x: -2, y: 2}, velocity: {x: 2, y: 0}},
    {position: {x: 5, y: -2}, velocity: {x: 1, y: 2}},
    {position: {x: 1, y: 4}, velocity: {x: 2, y: 1}},
    {position: {x: -2, y: 7}, velocity: {x: 2, y: -2}},
    {position: {x: 3, y: 6}, velocity: {x: -1, y: -1}},
    {position: {x: 5, y: 0}, velocity: {x: 1, y: 0}},
    {position: {x: -6, y: 0}, velocity: {x: 2, y: 0}},
    {position: {x: 5, y: 9}, velocity: {x: 1, y: -2}},
    {position: {x: 14, y: 7}, velocity: {x: -2, y: 0}},
    {position: {x: -3, y: 6}, velocity: {x: 2, y: -1}},
  ];

  const finalSnapshot = [
    '#...#..###',
    '#...#...#.',
    '#...#...#.',
    '#####...#.',
    '#...#...#.',
    '#...#...#.',
    '#...#...#.',
    '#...#..###',
  ];

  const snapshot0 = {
    points: [
      {velocity: {x: 0, y: 2}, position: {x: 9, y: 1}, neighbours: 1},
      {velocity: {x: -1, y: 0}, position: {x: 7, y: 0}, neighbours: 1},
      {velocity: {x: -1, y: 1}, position: {x: 3, y: -2}, neighbours: 1},
      {velocity: {x: -2, y: -1}, position: {x: 6, y: 10}, neighbours: 1},
      {velocity: {x: 2, y: 2}, position: {x: 2, y: -4}, neighbours: 1},
      {velocity: {x: 2, y: -2}, position: {x: -6, y: 10}, neighbours: 1},
      {velocity: {x: 1, y: -1}, position: {x: 1, y: 8}, neighbours: 2},
      {velocity: {x: 1, y: 0}, position: {x: 1, y: 7}, neighbours: 3},
      {velocity: {x: 1, y: -2}, position: {x: -3, y: 11}, neighbours: 1},
      {velocity: {x: -1, y: -1}, position: {x: 7, y: 6}, neighbours: 1},
      {velocity: {x: 1, y: 0}, position: {x: -2, y: 3}, neighbours: 2},
      {velocity: {x: 2, y: 0}, position: {x: -4, y: 3}, neighbours: 1},
      {velocity: {x: -1, y: 1}, position: {x: 10, y: -3}, neighbours: 1},
      {velocity: {x: 1, y: -2}, position: {x: 5, y: 11}, neighbours: 1},
      {velocity: {x: 0, y: -1}, position: {x: 4, y: 7}, neighbours: 1},
      {velocity: {x: 0, y: 1}, position: {x: 8, y: -2}, neighbours: 1},
      {velocity: {x: -2, y: 0}, position: {x: 15, y: 0}, neighbours: 1},
      {velocity: {x: 1, y: 0}, position: {x: 1, y: 6}, neighbours: 2},
      {velocity: {x: 0, y: -1}, position: {x: 8, y: 9}, neighbours: 1},
      {velocity: {x: -1, y: 1}, position: {x: 3, y: 3}, neighbours: 1},
      {velocity: {x: 0, y: -1}, position: {x: 0, y: 5}, neighbours: 1},
      {velocity: {x: 2, y: 0}, position: {x: -2, y: 2}, neighbours: 2},
      {velocity: {x: 1, y: 2}, position: {x: 5, y: -2}, neighbours: 1},
      {velocity: {x: 2, y: 1}, position: {x: 1, y: 4}, neighbours: 1},
      {velocity: {x: 2, y: -2}, position: {x: -2, y: 7}, neighbours: 1},
      {velocity: {x: -1, y: -1}, position: {x: 3, y: 6}, neighbours: 1},
      {velocity: {x: 1, y: 0}, position: {x: 5, y: 0}, neighbours: 1},
      {velocity: {x: 2, y: 0}, position: {x: -6, y: 0}, neighbours: 1},
      {velocity: {x: 1, y: -2}, position: {x: 5, y: 9}, neighbours: 1},
      {velocity: {x: -2, y: 0}, position: {x: 14, y: 7}, neighbours: 1},
      {velocity: {x: 2, y: -1}, position: {x: -3, y: 6}, neighbours: 1},
    ],
    time: 0,
    cohesion: 1.1935483870967742,
  };

  const snapshot3 = {
    points: [
      {velocity: {x: 0, y: 2}, position: {x: 9, y: 7}, neighbours: 2},
      {velocity: {x: -1, y: 0}, position: {x: 4, y: 0}, neighbours: 2},
      {velocity: {x: -1, y: 1}, position: {x: 0, y: 1}, neighbours: 3},
      {velocity: {x: -2, y: -1}, position: {x: 0, y: 7}, neighbours: 2},
      {velocity: {x: 2, y: 2}, position: {x: 8, y: 2}, neighbours: 3},
      {velocity: {x: 2, y: -2}, position: {x: 0, y: 4}, neighbours: 3},
      {velocity: {x: 1, y: -1}, position: {x: 4, y: 5}, neighbours: 3},
      {velocity: {x: 1, y: 0}, position: {x: 4, y: 7}, neighbours: 2},
      {velocity: {x: 1, y: -2}, position: {x: 0, y: 5}, neighbours: 3},
      {velocity: {x: -1, y: -1}, position: {x: 4, y: 3}, neighbours: 4},
      {velocity: {x: 1, y: 0}, position: {x: 1, y: 3}, neighbours: 3},
      {velocity: {x: 2, y: 0}, position: {x: 2, y: 3}, neighbours: 3},
      {velocity: {x: -1, y: 1}, position: {x: 7, y: 0}, neighbours: 2},
      {velocity: {x: 1, y: -2}, position: {x: 8, y: 5}, neighbours: 3},
      {velocity: {x: 0, y: -1}, position: {x: 4, y: 4}, neighbours: 3},
      {velocity: {x: 0, y: 1}, position: {x: 8, y: 1}, neighbours: 3},
      {velocity: {x: -2, y: 0}, position: {x: 9, y: 0}, neighbours: 2},
      {velocity: {x: 1, y: 0}, position: {x: 4, y: 6}, neighbours: 3},
      {velocity: {x: 0, y: -1}, position: {x: 8, y: 6}, neighbours: 3},
      {velocity: {x: -1, y: 1}, position: {x: 0, y: 6}, neighbours: 3},
      {velocity: {x: 0, y: -1}, position: {x: 0, y: 2}, neighbours: 3},
      {velocity: {x: 2, y: 0}, position: {x: 4, y: 2}, neighbours: 3},
      {velocity: {x: 1, y: 2}, position: {x: 8, y: 4}, neighbours: 3},
      {velocity: {x: 2, y: 1}, position: {x: 7, y: 7}, neighbours: 2},
      {velocity: {x: 2, y: -2}, position: {x: 4, y: 1}, neighbours: 3},
      {velocity: {x: -1, y: -1}, position: {x: 0, y: 3}, neighbours: 4},
      {velocity: {x: 1, y: 0}, position: {x: 8, y: 0}, neighbours: 4},
      {velocity: {x: 2, y: 0}, position: {x: 0, y: 0}, neighbours: 2},
      {velocity: {x: 1, y: -2}, position: {x: 8, y: 3}, neighbours: 3},
      {velocity: {x: -2, y: 0}, position: {x: 8, y: 7}, neighbours: 4},
      {velocity: {x: 2, y: -1}, position: {x: 3, y: 3}, neighbours: 3},
    ],
    time: 3,
    cohesion: 2.870967741935484,
  };

  describe('helpers', () => {
    describe('#readPoint', () => {
      it('constructs a point object from its string representation', () => {
        expect(readPoint(lines[0])).to.deep.eq({
          position: {x: 9, y: 1},
          velocity: {x: 0, y: 2},
        });
        expect(readPoint(lines[5])).to.deep.eq({
          position: {x: -6, y: 10},
          velocity: {x: 2, y: -2},
        });
      });
    });

    describe('#constructSnapshot', () => {
      it('takes a set of points and advances it according to `time`, returning a snapshot object', () => {
        expect(constructSnapshot(points, 0)).to.deep.eq(snapshot0);

        expect(constructSnapshot(points, 3)).to.deep.eq(snapshot3);
      });
    });

    describe('#renderSnapshot', () => {
      it('returns an array containing each line in a "readable" format', () => {
        expect(renderSnapshot(points)).to.deep.eq([
          '........#.............',
          '................#.....',
          '.........#.#..#.......',
          '......................',
          '#..........#.#.......#',
          '...............#......',
          '....#.................',
          '..#.#....#............',
          '.......#..............',
          '......#...............',
          '...#...#.#...#........',
          '....#..#..#.........#.',
          '.......#..............',
          '...........#..#.......',
          '#...........#.........',
          '...#.......#..........',
        ]);

        expect(renderSnapshot(snapshot3.points)).to.deep.eq(finalSnapshot);
      });
    });

    describe('#findMostCohesiveSnapshot', () => {
      it('searches until `maxTime` to find the most cohesive snapshot, if any', () => {
        expect(findMostCohesiveSnapshot(points, 1)).to.eq(undefined);
        expect(findMostCohesiveSnapshot(points, 2)).to.eq(undefined);
        expect(findMostCohesiveSnapshot(points, 3)).to.deep.eq(snapshot3);
        expect(findMostCohesiveSnapshot(points, 20)).to.deep.eq(snapshot3);
        expect(findMostCohesiveSnapshot(points)).to.deep.eq(snapshot3);
      });
    });
  });

  describe('Puzzle A', () => {
    it('satisfies examples', () => {
      expect(moduleA(lines.join('\n'))).to.deep.eq(finalSnapshot);
    });
  });

  describe('Puzzle B', () => {
    it('satisfies examples', () => {
      expect(moduleB(input)).to.eq();
    });
  });

});
