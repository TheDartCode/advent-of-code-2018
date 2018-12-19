import {Cell} from './cell';
import {Region} from './region';
import {manhattanDistance} from '../shared/helpers';

export class Grid {
  constructor(serial) {
    this.serial = serial;
    this.width = DAY_11_GRID_SIZE;
    this.height = DAY_11_GRID_SIZE;
    this.cells = new Array(this.height * this.width);

    for (let i = 0; i < this.cells.length; i = i + 1) {
      const y = Math.floor(i / this.width);
      const x = i % this.width;
      const weight = manhattanDistance({x: x + 1, y: y + 1}, {x: this.width, y: this.height});
      this.cells[i] = new Cell(x + 1, y + 1, serial, weight);
    }
  }

  getCell(x, y) {
    return this.cells[y * this.width + x];
  }

  getCellsByWeight() {
    return [...this.cells].sort((c1, c2) => c1.weight - c2.weight);
  }

  createRegion(cell, size) {
    cell.regions[size] = new Region(cell.x, cell.y, size, this);
    return cell.regions[size];
  }

  findHighestPowerRegion({minRegionSize = 3, maxRegionSize = 3} = {}) {
    let highestPowerRegion = {totalPower: -Infinity};

    const cells = this.getCellsByWeight();

    cells.forEach(cell => {
      for (let size = minRegionSize; size <= maxRegionSize; size = size + 1) {
        const region = this.createRegion(cell, size);

        if (region.maxX <= this.width && region.maxY <= this.height) {
          const subregion = cell.y < this.width && cell.x < this.width
            ? this.getCell(cell.x, cell.y).regions[size - 1]
            : null;
          region.calculateTotalPower(subregion);

          if (region.totalPower > highestPowerRegion.totalPower) {
            highestPowerRegion = region;
          }
        }
      }

      // the cell is no longer needed for backward reference,
      // let's free up some memory.
      if (cell.y < this.width && cell.x < this.width) {
        this.getCell(cell.x, cell.y).clearRegions();
      }
    });

    return highestPowerRegion;
  }
}
