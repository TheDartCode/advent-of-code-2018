export class Cell {
  constructor(x, y, gridSerial, weight) {
    this.x = x;
    this.y = y;
    this.gridSerial = gridSerial;
    this.regions = {};
    this.weight = weight;
    this.powerLevel = this.getPowerLevel();
  }

  get label() {
    return `${this.x + 1},${this.y + 1}`;
  }

  getPowerLevel() {
    const rackID = this.x + 10;
    let powerLevel = rackID * this.y;
    powerLevel = powerLevel + this.gridSerial;
    powerLevel = powerLevel * rackID;
    powerLevel = Math.floor(powerLevel / 100) % 10;
    return powerLevel - 5;
  }

  clearRegions() {
    this.regions = {};
  }
}
