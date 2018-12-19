import {Grid} from './grid';

const parseInput = input => parseInt(input.trim(), 10);

const moduleA = input => {
  const gridSerial = parseInput(input);

  const grid = new Grid(gridSerial);

  const highestPowerRegion = grid.findHighestPowerRegion();

  return `${highestPowerRegion.x},${highestPowerRegion.y}`;
};

const moduleB = input => {
  const gridSerial = parseInput(input);

  const grid = new Grid(gridSerial);

  const highestPowerRegion = grid.findHighestPowerRegion({
    minRegionSize: 1, maxRegionSize: DAY_11_GRID_SIZE,
  });

  return highestPowerRegion.label;
};

export {
  moduleA,
  moduleB,
};
