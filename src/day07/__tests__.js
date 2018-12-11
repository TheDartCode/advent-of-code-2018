const {expect} = require('chai');
import {
  parseEdge,
  createGraph,
  walkGraph,
  workGraph,
  moduleA,
  moduleB,
} from './';

describe('Day 7', () => {
  const input = [
    'Step C must be finished before step A can begin.',
    'Step C must be finished before step F can begin.',
    'Step A must be finished before step B can begin.',
    'Step A must be finished before step D can begin.',
    'Step B must be finished before step E can begin.',
    'Step D must be finished before step E can begin.',
    'Step F must be finished before step E can begin.',
  ].join('\n');

  describe('helpers', () => {
    const A = {name: 'A', timeNeeded: 1};
    const B = {name: 'B', timeNeeded: 2};
    const C = {name: 'C', timeNeeded: 3};
    const D = {name: 'D', timeNeeded: 4};
    const E = {name: 'E', timeNeeded: 5};
    const F = {name: 'F', timeNeeded: 6};

    C.children = [A, F];
    C.parents = [];
    A.parents = [C];
    A.children = [B, D];
    F.parents = [C];
    F.children = [E];
    B.parents = [A];
    B.children = [E];
    D.parents = [A];
    D.children = [E];
    E.parents = [B, D, F];
    E.children = [];

    const nodes = [A, B, C, D, E, F];

    describe('#parseEdge', () => {
      it('parses an edge', () => {
        expect(parseEdge('Step C must be finished before step A can begin.'))
          .to.deep.eq({from: 'C', to: 'A'});
      });
    });
    describe('#createGraph', () => {
      it('creates a graph from its edges', () => {
        const edges = [
          {from: 'C', to: 'A'}, {from: 'C', to: 'F'},
          {from: 'A', to: 'B'}, {from: 'A', to: 'D'},
          {from: 'B', to: 'E'}, {from: 'D', to: 'E'},
          {from: 'F', to: 'E'},
        ];

        expect(createGraph(edges)).to.deep.eq(nodes);
      });
    });

    describe('#walkGraph', () => {
      it('walks a graph from root, visiting available children by alphabetical order', () => {
        expect(walkGraph(nodes)).to.eq('CABDFE');
      });
    });

    describe('#workGraph', () => {
      it('distributes the work of a graph to a given amount of workers', () => {
        expect(workGraph(nodes)).to.deep.eq({
          ticks: 15,
          path: 'CABFDE',
          steps: [
            '0, C, ., ',
            '1, C, ., ',
            '2, C, ., ',
            '3, A, F, C',
            '4, B, F, CA',
            '5, B, F, CA',
            '6, D, F, CAB',
            '7, D, F, CAB',
            '8, D, F, CAB',
            '9, D, ., CABF',
            '10, E, ., CABFD',
            '11, E, ., CABFD',
            '12, E, ., CABFD',
            '13, E, ., CABFD',
            '14, E, ., CABFD',
            '15, ., ., CABFDE',
          ],
        });
      });
    });
  });
  /*
   *
   * Step C must be finished before step A can begin.
   * Step C must be finished before step F can begin.
   * Step A must be finished before step B can begin.
   * Step A must be finished before step D can begin.
   * Step B must be finished before step E can begin.
   * Step D must be finished before step E can begin.
   * Step F must be finished before step E can begin.
   *
   */
  describe('Puzzle A', () => {
    it('satisfies examples', () => {
      expect(moduleA(input)).to.eq('CABDFE');
    });
  });

  /*
   *
   * Second   Worker 1   Worker 2   Done
   *   0        C          .
   *   1        C          .
   *   2        C          .
   *   3        A          F       C
   *   4        B          F       CA
   *   5        B          F       CA
   *   6        D          F       CAB
   *   7        D          F       CAB
   *   8        D          F       CAB
   *   9        D          .       CABF
   *  10        E          .       CABFD
   *  11        E          .       CABFD
   *  12        E          .       CABFD
   *  13        E          .       CABFD
   *  14        E          .       CABFD
   *  15        .          .       CABFDE
   *
   */
  describe('Puzzle B', () => {
    it('satisfies examples', () => {
      expect(moduleB(input)).to.eq(15);
    });
  });
});
