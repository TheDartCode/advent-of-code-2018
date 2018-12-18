const {expect} = require('chai');
import {
  getPowerLevel,
  setupGrid,
  calculateGridRegions,
  moduleA,
  moduleB,
} from './';
import {numericMax} from '../shared/helpers';

const sliceRegion = (grid, x, y, width, height) => {
  return grid.slice(y - 1, y - 1 + height).map(row => row
    .slice(x - 1, x - 1 + width)
    .map(cell => cell.powerLevel));
};

describe('Day 11', () => {
  const input = '18';

  describe('helpers', () => {
    describe('#getPowerLevel', () => {
      it('calculates the power level for a given cell and grid serial number', () => {
        expect(getPowerLevel({x: 3, y: 5}, 8)).to.eq(4);
        expect(getPowerLevel({x: 122, y: 79}, 57)).to.eq(-5);
        expect(getPowerLevel({x: 217, y: 196}, 39)).to.eq(0);
        expect(getPowerLevel({x: 101, y: 153}, 71)).to.eq(4);
      });
    });

    describe('#setupGrid', () => {
      it('creates the 300x300 grid assigning power levels to cells', () => {
        let grid = setupGrid(18);
        let region = sliceRegion(grid, 33 - 1, 45 - 1, 5, 5);
        expect(region).to.deep.eq([
          [-2, -4, 4, 4, 4],
          [-4, 4, 4, 4, -5],
          [4, 3, 3, 4, -4],
          [1, 1, 2, 4, -3],
          [-1, 0, 2, -5, -2],
        ]);

        grid = setupGrid(42);
        region = sliceRegion(grid, 21 - 1, 61 - 1, 5, 5);
        expect(region).to.deep.eq([
          [-3, 4, 2, 2, 2],
          [-4, 4, 3, 3, 4],
          [-5, 3, 3, 4, -4],
          [4, 3, 3, 4, -3],
          [3, 3, 3, -5, -1],
        ]);
      });
    });

    describe('#calculateGridRegions', () => {
      it('calculates all possible 3x3 regions with their corresponding power level', () => {
        let grid = setupGrid(18);
        let regions = calculateGridRegions(grid);
        expect(regions.length).to.eq(88804);
        expect(regions.find(region => region.x === 33 && region.y === 45).totalPower).to.eq(29);
        expect(numericMax(regions, region => region.totalPower)).to.eq(29);

        grid = setupGrid(42);
        regions = calculateGridRegions(grid);
        expect(regions.length).to.eq(88804);
        expect(regions.find(region => region.x === 21 && region.y === 61).totalPower).to.eq(30);
        expect(numericMax(regions, region => region.totalPower)).to.eq(30);
      });
    });
  });

  describe('Puzzle A', () => {
    it('satisfies examples', () => {
      expect(moduleA(input)).to.eq('33,45');
    });
  });

  describe('Puzzle B', () => {
    it('satisfies examples', () => {
      expect(moduleB(input)).to.eq(18);
    });
  });

});
