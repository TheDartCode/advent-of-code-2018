import fs from 'fs';
import path from 'path';
import solutions from '../lib';

/**
*
* We define a contract for the puzzle solution functions
* where they expose a `moduleA` and `moduleB` that solve
* puzzleA and puzzleB respectively.
*
*/

/* eslint-disable-next-line no-console */
const output = (...args) => console.log(...args);

const getSolutionModule = (day, puzzle) => {
  switch (puzzle) {
    case 'a':
      return solutions[day].moduleA;
    case 'b':
      return solutions[day].moduleB;
    default:
      throw new Error(`Unknown module for day ${day} and puzzle ${puzzle}`);
  }
};

const solvePuzzle = (day, puzzle) => {
  output(`Solving Day ${day} Puzzle ${puzzle.toUpperCase()}`);

  const solutionModule = getSolutionModule(day, puzzle);

  const inputFile = path.join(__dirname, `../data/day${day}.txt`);

  fs.readFile(inputFile, (err, data) => {
    if (err) {
      throw new Error(err);
    }

    const puzzleAnswer = solutionModule(String(data));
    output(puzzleAnswer);
  });
};

if (process.argv.length < 4) {
  output('Usage: npm run solve <day> <a|b>');
} else {
  const day = process.argv[2];
  const puzzle = process.argv[3];
  solvePuzzle(day, puzzle);
}
