const {expect} = require('chai');
import {
  getNodeChecksum,
  getNodeValue,
  readNode,
  moduleA,
  moduleB,
} from './';

describe('Day 8', () => {
  const input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';

  describe('helpers', () => {
    const B = {
      startIndex: 2,
      children: [],
      metadata: [10, 11, 12],
      endIndex: 7,
    };
    const D = {
      startIndex: 9,
      children: [],
      metadata: [99],
      endIndex: 12,
    };
    const C = {
      startIndex: 7,
      children: [D],
      metadata: [2],
      endIndex: 13,
    };
    const A = {
      startIndex: 0,
      children: [B, C],
      metadata: [1, 1, 2],
      endIndex: 16,
    };

    describe('#readNode', () => {
      it('constructs a Node object (along with children) from the respective data-points', () => {
        expect(readNode([0, 3, 1, 1, 2], 0)).to.deep.eq({
          startIndex: 0,
          children: [],
          metadata: [1, 1, 2],
          endIndex: 5,
        });
        expect(readNode([1, 0, 0, 3, 1, 1, 2], 0)).to.deep.eq({
          startIndex: 0,
          children: [{
            startIndex: 2,
            children: [],
            metadata: [1, 1, 2],
            endIndex: 7,
          }],
          metadata: [],
          endIndex: 7,
        });
        expect(readNode([
          2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2,
        ], 0)).to.deep.eq(A);
      });
    });

    /*
     *
     * The first check done on the license file is to simply add up all of the
     * metadata entries. In this example, that sum is 1+1+2+10+11+12+2+99=138.
     *
     */
    describe('#getNodeChecksum', () => {
      it('calculates the checksum of a node', () => {
        expect(getNodeChecksum(A)).to.eq(138);
      });
    });

    /*
     *
     * The value of a node depends on whether it has child nodes.
     *
     * If a node has no child nodes, its value is the sum of its metadata entries.
     * So, the value of node B is 10+11+12=33, and the value of node D is 99.
     *
     * However, if a node does have child nodes, the metadata entries become
     * indexes which refer to those child nodes. A metadata entry of 1 refers to
     * the first child node, 2 to the second, 3 to the third, and so on.
     * The value of this node is the sum of the values of the child nodes
     * referenced by the metadata entries. If a referenced child node does not
     * exist, that reference is skipped. A child node can be referenced multiple
     * time and counts each time it is referenced. A metadata entry of 0 does
     * not refer to any child node.
     *
     * For example, again using the above nodes:
     *
     * Node C has one metadata entry, 2.
     * Because node C has only one child node, 2 references a child node which
     * does not exist, and so the value of node C is 0.
     * Node A has three metadata entries: 1, 1, and 2. The 1 references node A's
     * first child node, B, and the 2 references node A's second child node, C.
     * Because node B has a value of 33 and node C has a value of 0, the value
     * of node A is 33+33+0=66.
     * So, in this example, the value of the root node is 66.
     *
     */
    describe('#getNodeValue', () => {
      it('calculates the value of a node', () => {
        expect(getNodeValue(D)).to.eq(99);
        expect(getNodeValue(B)).to.eq(33);
        expect(getNodeValue(A)).to.eq(66);
      });
    });
  });

  describe('Puzzle A', () => {
    it('satisfies examples', () => {
      expect(moduleA(input)).to.eq(138);
    });
  });

  describe('Puzzle B', () => {
    it('satisfies examples', () => {
      expect(moduleB(input)).to.eq(66);
    });
  });

});
