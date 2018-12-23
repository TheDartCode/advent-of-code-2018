const {expect} = require('chai');
import {
  moduleA,
  moduleB,
} from './';
import {Cell} from './cell';
import {Grid} from './grid';
import {Region} from './region';

describe('Day 11', () => {
  const input = '18';

  describe('Cell', () => {
    describe('Cell()', () => {
      it('creates a new cell with the respective attributes and the correct power level', () => {
        const cell = new Cell(3, 5, 8, 0);
        expect(cell.x).to.eq(3);
        expect(cell.y).to.eq(5);
        expect(cell.gridSerial).to.eq(8);
        expect(cell.weight).to.eq(0);
        expect(cell.powerLevel).to.eq(4);
      });
    });

    describe('#getPowerLevel', () => {
      it('calculates the power level for a given cell and grid serial number', () => {
        expect(new Cell(3, 5, 8, 0).getPowerLevel()).to.eq(4);
        expect(new Cell(122, 79, 57, 0).getPowerLevel()).to.eq(-5);
        expect(new Cell(217, 196, 39, 0).getPowerLevel()).to.eq(0);
        expect(new Cell(101, 153, 71, 0).getPowerLevel()).to.eq(4);
      });
    });
  });

  describe('Grid', () => {
    describe('Grid()', () => {
      it('creates the GRID_SIZExGRID_SIZE grid assigning power levels and weights to cells', () => {
        let grid = new Grid(18);
        expect(grid.cells.map(cell => cell.powerLevel)).to.deep.eq([
          -2, -2, -1, -1,
          -1, 0, 0, 1,
          0, 1, 2, 3,
          1, 2, 4, -5,
        ]);
        expect(grid.cells.map(cell => cell.weight)).to.deep.eq([
          6, 5, 4, 3,
          5, 4, 3, 2,
          4, 3, 2, 1,
          3, 2, 1, 0,
        ]);

        grid = new Grid(42);
        expect(grid.cells.map(cell => cell.powerLevel)).to.deep.eq([
          0, 1, 2, 2,
          2, 2, 3, 4,
          3, 4, -5, -4,
          4, -5, -3, -2,
        ]);
        expect(grid.cells.map(cell => cell.weight)).to.deep.eq([
          6, 5, 4, 3,
          5, 4, 3, 2,
          4, 3, 2, 1,
          3, 2, 1, 0,
        ]);
      });
    });

    describe('#findHighestPowerRegion', () => {
      it('finds the highest power region 3x3 by default', () => {
        let grid = new Grid(18);
        let region = grid.findHighestPowerRegion();
        expect(region.totalPower).to.eq(9);
        expect(region.label).to.eq('1,2,3');

        grid = new Grid(42);
        region = grid.findHighestPowerRegion();
        expect(region.totalPower).to.eq(12);
        expect(region.label).to.eq('1,1,3');
      });

      it('finds the highest power region among specified size constraints', () => {
        const grid = new Grid(18);
        const region = grid.findHighestPowerRegion({minRegionSize: 1, maxRegionSize: 4});
        expect(region.totalPower).to.eq(9);
        expect(region.label).to.eq('2,3,2');
      });
    });
  });

  describe('Region', () => {
    describe('#calculateTotalPower', () => {
      it('calculates total power when no subregion supplied', () => {
        const grid = new Grid(18);
        const region = new Region(1, 1, 4, grid);

        expect(region.totalPower).to.eq(undefined);

        region.calculateTotalPower();

        expect(region.totalPower).to.eq(2);
      });

      it('calculates total power through subregion when supplied', () => {
        const grid = new Grid(18);
        const subregion = new Region(2, 2, 3, grid);
        const region = new Region(1, 1, 4, grid);

        subregion.calculateTotalPower();

        expect(region.totalPower).to.eq(undefined);

        region.calculateTotalPower(subregion);

        expect(region.totalPower).to.eq(2);

        subregion.totalPower = subregion.totalPower + 10;

        region.calculateTotalPower(subregion);

        expect(region.totalPower).to.eq(12);
      });
    });
  });

  describe('Puzzle A', () => {
    it('satisfies examples', () => {
      expect(moduleA(input)).to.eq('1,2');
    });
  });

  describe('Puzzle B', () => {
    it('satisfies examples', () => {
      expect(moduleB(input)).to.eq('2,3,2');
    });
  });

});
