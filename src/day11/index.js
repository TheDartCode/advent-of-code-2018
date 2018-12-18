import {range} from '../shared/helpers';

const parseInput = input => parseInt(input.trim(), 10);

const GRID_WIDTH = 300;
const GRID_HEIGHT = 300;

const getPowerLevel = ({x, y}, gridSerial) => {
  const rackID = x + 10;
  let powerLevel = rackID * y;
  powerLevel = powerLevel + gridSerial;
  powerLevel = powerLevel * rackID;
  powerLevel = Math.floor(powerLevel / 100) % 10;
  return powerLevel - 5;
};

const setupGrid = gridSerial => {
  return range(GRID_HEIGHT)
    .map(yIndex => range(GRID_WIDTH)
      .map(xIndex => {
        const cell = {
          x: xIndex + 1,
          y: yIndex + 1,
        };
        cell.powerLevel = getPowerLevel(cell, gridSerial);
        return cell;
      })
    );
};

const calculateGridRegions = grid => {
  const regions = [];

  grid.forEach(row => {
    row.forEach(cell => {
      if (cell.x + 2 > GRID_WIDTH || cell.y + 2 > GRID_WIDTH) {
        return;
      }
      let totalPower = 0;
      for (let j = cell.y - 1; j < cell.y - 1 + 3; j = j + 1) {
        for (let i = cell.x - 1; i < cell.x - 1 + 3; i = i + 1) {
          totalPower = totalPower + grid[j][i].powerLevel;
        }
      }
      regions.push({
        x: cell.x,
        y: cell.y,
        totalPower,
      });
    });
  });

  return regions;
};

const moduleA = input => {
  const gridSerial = parseInput(input);

  const grid = setupGrid(gridSerial);

  const regions = calculateGridRegions(grid);

  const highestPowerRegion = regions.sort((r1, r2) => r2.totalPower - r1.totalPower)[0];

  return `${highestPowerRegion.x},${highestPowerRegion.y}`;
};

const moduleB = input => {
  return parseInput(input);
};

export {
  getPowerLevel,
  setupGrid,
  calculateGridRegions,
  moduleA,
  moduleB,
};
