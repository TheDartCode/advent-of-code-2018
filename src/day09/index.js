import {arrayGameEngine, linkedListGameEngine} from './gameEngine';
import {numericMax} from '../shared/helpers';

const parseInput = input => {
  const regex = new RegExp(/(\d+) players; last marble is worth (\d+) points/g);
  const match = regex.exec(input);

  return {
    players: parseInt(match[1], 10),
    marbles: parseInt(match[2], 10),
  };
};

const playGame = (players, marbles) => {
  const gameSimulationEngine = marbles < 1e6
    ? arrayGameEngine
    : linkedListGameEngine;

  return gameSimulationEngine(players, marbles);
};

const moduleA = input => {
  const {players, marbles} = parseInput(input);
  const {score} = playGame(players, marbles);

  return numericMax(Object.values(score));
};

const moduleB = input => {
  const {players, marbles} = parseInput(input);
  const {score} = playGame(players, marbles * 100);

  return numericMax(Object.values(score));
};

export {
  parseInput,
  arrayGameEngine,
  linkedListGameEngine,
  moduleA,
  moduleB,
};
