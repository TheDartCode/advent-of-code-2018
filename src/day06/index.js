import {numericMaxBy} from '../shared/helpers';

const parseLine = line => line
  .split(', ')
  .map(coord => parseInt(coord, 10));

const parseInput = input => input.split('\n')
  .filter(line => !!line)
  .map(parseLine);

const manhattanDistance = (p1, p2) => {
  return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
};

const getReferencePointDistances = (point, referencePoints) => {
  return referencePoints
    .map(referencePoint => ({
      referencePoint,
      distance: manhattanDistance(point, referencePoint),
    }))
    .sort((d1, d2) => d1.distance - d2.distance);
};

const findClosestReferencePoint = (point, referencePoints) => {
  const referenceDistances = getReferencePointDistances(point, referencePoints);

  if (referenceDistances[0].distance === referenceDistances[1].distance) {
    return null;
  }

  return referenceDistances[0].referencePoint;
};

const createMappedPlane = referencePoints => {
  const width = numericMaxBy(referencePoints, p => p[0]) + 1;
  const height = numericMaxBy(referencePoints, p => p[1]) + 1;

  const map = new Array(width * height)
    .fill(null)
    .map((_, index) => {
      const x = index % width;
      const y = Math.floor(index / width);
      const point = [x, y];
      const distances = getReferencePointDistances(point, referencePoints);
      return {
        point,
        referencePoint: findClosestReferencePoint(point, referencePoints),
        distancesSum: distances.reduce((r, d) => r + d.distance, 0),
      };
    });

  return {
    map,
    width,
    height,
  };
};

const isPointBorderline = (plane, point) => {
  return point[0] === 0
    || point[0] === plane.width - 1
    || point[1] === 0
    || point[1] === plane.height - 1;
};

const getReferencePointAreaInfo = (plane, referencePoint) => {
  const pointsInArea = plane.map
    .filter(p => p.referencePoint === referencePoint)
    .map(p => p.point);

  let areaSize;

  if (pointsInArea.some(point => isPointBorderline(plane, point))) {
    areaSize = Infinity;
  } else {
    areaSize = pointsInArea.length;
  }

  return {
    referencePoint,
    areaSize,
  };
};

const moduleA = input => {
  const referencePoints = parseInput(input);
  const plane = createMappedPlane(referencePoints);
  const areaSizeInfo = referencePoints
    .map(referencePoint => getReferencePointAreaInfo(plane, referencePoint))
    .filter(si => si.areaSize !== Infinity);

  return numericMaxBy(areaSizeInfo, si => si.areaSize);
};

const moduleB = input => {
  const referencePoints = parseInput(input);
  const plane = createMappedPlane(referencePoints);
  return plane.map
    .filter(p => p.distancesSum < DAY_6_DISTANCE_THRESHOLD)
    .length;
};

export {
  manhattanDistance,
  findClosestReferencePoint,
  createMappedPlane,
  getReferencePointAreaInfo,
  moduleA,
  moduleB,
};
