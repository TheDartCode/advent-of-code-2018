const {expect} = require('chai');
import {
  manhattanDistance,
  findClosestReferencePoint,
  createMappedPlane,
  getReferencePointAreaInfo,
  moduleA,
  moduleB,
} from './';

describe('Day 6', () => {
  const lines = [
    '1, 1',
    '1, 6',
    '8, 3',
    '3, 4',
    '5, 5',
    '8, 9',
  ].join('\n');

  const points = [
    [1, 1],
    [1, 6],
    [8, 3],
    [3, 4],
    [5, 5],
    [8, 9],
  ];

  describe('#manhattanDistance', () => {
    it('calculates the Manhattan Distance between two points', () => {
      expect(manhattanDistance([0, 0], [1, 1])).to.eq(2);
      expect(manhattanDistance([1, 0], [7, 8])).to.eq(14);
      expect(manhattanDistance([3, 2], [3, 2])).to.eq(0);
    });
  });

  describe('#findClosestReferencePoint', () => {
    it('returns the closest reference point to a given point, and null if more than one exist', () => {
      expect(findClosestReferencePoint([0, 0], points)).to.deep.eq([1, 1]);
      expect(findClosestReferencePoint([8, 9], points)).to.deep.eq([8, 9]);
      expect(findClosestReferencePoint([5, 1], points)).to.deep.eq(null);
    });
  });

  describe('#createMappedPlane', () => {
    it('creates a plane from 0,0 to maxX,maxY with all points mapped to a reference point', () => {
      const plane = createMappedPlane(points);
      const {map, height, width} = plane;

      expect(width).to.eq(9);
      expect(height).to.eq(10);
      expect(map.length).to.eq(width * height);
      expect(map[0]).to.deep.eq({
        point: [0, 0],
        referencePoint: [1, 1],
        distancesSum: 54,
      });
      expect(map[1]).to.deep.eq({
        point: [1, 0],
        referencePoint: [1, 1],
        distancesSum: 48,
      });
      expect(map[0 + 1 * 9]).to.deep.eq({
        point: [0, 1],
        referencePoint: [1, 1],
        distancesSum: 48,
      });
      expect(map[3 + 4 * 9]).to.deep.eq({
        point: [3, 4],
        referencePoint: [3, 4],
        distancesSum: 28,
      });
      expect(map[8 + 6 * 9]).to.deep.eq({
        point: [8, 6],
        referencePoint: null,
        distancesSum: 36,
      });
    });

    describe('#getReferencePointAreaInfo', () => {
      it('returns the area size of a given reference point', () => {
        const plane = createMappedPlane(points);
        expect(getReferencePointAreaInfo(plane, points[0])).to.deep.eq({
          referencePoint: points[0],
          areaSize: Infinity,
        });
        expect(getReferencePointAreaInfo(plane, points[1])).to.deep.eq({
          referencePoint: points[1],
          areaSize: Infinity,
        });
        expect(getReferencePointAreaInfo(plane, points[2])).to.deep.eq({
          referencePoint: points[2],
          areaSize: Infinity,
        });
        expect(getReferencePointAreaInfo(plane, points[3])).to.deep.eq({
          referencePoint: points[3],
          areaSize: 9,
        });
        expect(getReferencePointAreaInfo(plane, points[4])).to.deep.eq({
          referencePoint: points[4],
          areaSize: 17,
        });
        expect(getReferencePointAreaInfo(plane, points[5])).to.deep.eq({
          referencePoint: points[5],
          areaSize: Infinity,
        });
      });
    });
  });

  describe('Puzzle A', () => {
    it('satisfies examples', () => {
      expect(moduleA(lines)).to.eq(17);
    });
  });

  describe('Puzzle B', () => {
    it('satisfies examples', () => {
      expect(moduleB(lines)).to.eq(16);
    });
  });
});
