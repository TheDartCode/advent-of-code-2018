import {
  arrayAvg,
  manhattanDistance,
  numericMin,
  numericMax,
  range,
} from '../shared/helpers';

const COHESION_THRESHOLD = 2;

const readPoint = line => {
  const regex = new RegExp(/position=<( *-?\d+), ( *-?\d+)> velocity=<( *-?\d+), ( *-?\d+)>/g);
  const match = regex.exec(line);

  return {
    position: {
      x: parseInt(match[1], 10),
      y: parseInt(match[2], 10),
    },
    velocity: {
      x: parseInt(match[3], 10),
      y: parseInt(match[4], 10),
    },
  };
};

const parseInput = input => {
  return input
    .split('\n')
    .filter(line => !!line)
    .map(readPoint);
};

const constructSnapshot = (points, time = 0) => {
  points = points.map(point => {
    const {velocity} = point;
    return {
      velocity,
      position: {
        x: point.position.x + velocity.x * time,
        y: point.position.y + velocity.y * time,
      },
    };
  });

  points.forEach(point => {
    point.neighbours = points.filter(p => manhattanDistance(point, p) < 2).length;
  });

  const cohesion = arrayAvg(points, p => p.neighbours);

  return {
    points,
    time,
    cohesion,
  };
};

const renderSnapshot = points => {
  const xMin = numericMin(points, point => point.position.x);
  const xMax = numericMax(points, point => point.position.x);
  const yMin = numericMin(points, point => point.position.y);
  const yMax = numericMax(points, point => point.position.y);

  const width = xMax + 1 - xMin;
  const height = yMax + 1 - yMin;
  const canvas = range(height);

  canvas.forEach(index => {
    canvas[index] = new Array(width).fill('.');
  });

  points.forEach(point => {
    const x = point.position.x;
    const y = point.position.y;
    canvas[y - yMin][x - xMin] = '#';
  });

  return canvas.map(line => line.join(''));
};

const findMostCohesiveSnapshot = (points, maxTime = DAY_10_MAX_SEARCH_TIME) => {
  return range(maxTime + 1)
    .map(time => {
      const message = constructSnapshot(points, time);
      return message.cohesion > COHESION_THRESHOLD
        ? message
        : null;
    })
    .filter(message => !!message)
    .sort((m1, m2) => m2.cohesion - m1.cohesion)[0];
};

const moduleA = input => {
  const points = parseInput(input);

  const mostCohesiveSnapshot = findMostCohesiveSnapshot(points);

  return renderSnapshot(mostCohesiveSnapshot.points);
};

const moduleB = input => {

};

export {
  readPoint,
  constructSnapshot,
  findMostCohesiveSnapshot,
  renderSnapshot,
  moduleA,
  moduleB,
};
