export class Region {
  constructor(x, y, size, grid) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.grid = grid;
  }

  calculateTotalPowerFromSubregion(subregion) {
    let totalPower = subregion.totalPower;
    for (let i = this.x; i <= this.maxX - 1; i = i + 1) {
      totalPower = totalPower + this.grid.getCell(i, this.y - 1).powerLevel;
    }
    for (let i = this.y; i <= this.maxY - 1; i = i + 1) {
      totalPower = totalPower + this.grid.getCell(this.x - 1, i).powerLevel;
    }
    totalPower = totalPower + this.grid.getCell(this.x - 1, this.y - 1).powerLevel;

    return totalPower;
  }

  calculateTotalPowerFromScratch() {
    let totalPower = 0;
    for (let y = this.y - 1; y <= this.maxY - 1; y = y + 1) {
      for (let x = this.x - 1; x <= this.maxX - 1; x = x + 1) {
        totalPower = totalPower + this.grid.getCell(x, y).powerLevel;
      }
    }
    return totalPower;
  }

  calculateTotalPower(subregion) {
    this.totalPower = subregion
      ? this.calculateTotalPowerFromSubregion(subregion)
      : this.calculateTotalPowerFromScratch();
  }

  get maxX() {
    return this.x + this.size - 1;
  }

  get maxY() {
    return this.y + this.size - 1;
  }

  get label() {
    return `${this.x},${this.y},${this.size}`;
  }
}
