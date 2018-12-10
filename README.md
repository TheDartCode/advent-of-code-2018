# Advent of Code 2018

This repository tracks my take on [Advent of Code 2018](https://adventofcode.com/2018).

The aim is to (obviously) solve all puzzles, while maintaining production-grade quality and robustness.

## How to use

- Clone the repository
- `cd` to the directory of the app
- `npm install`
- `npm run build`
- `npm run solve <day> <a|b>` e.g. _npm run solve 1 a_ for day 1's puzzle A

Each time the `build` process is initiated, the tests are run.
And each time the tests are run, all source files are linted.

## Some pieces of information

The project could well be built to run straight from the source code and have
no build process (_Rollup_) at all.
But I wanted to simulate production-grade practices with code transformations,
dev-only assertions for data sanity and other stuff like that.
