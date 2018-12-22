const {expect} = require('chai');
import {
  Cart,
  parseInput,
  tick,
  moduleA,
  moduleB,
} from './';
import {
  CART_DIRECTIONS,
  MAP_TILES,
  INTERSECTION_CHOICES,
} from './constants';

describe('Day 13', () => {
  const inputA = [
    '/->-\\        ',
    '|   |  /----\\',
    '| /-+--+-\\  |',
    '| | |  | v  |',
    '\\-+-/  \\-+--/',
    '  \\------/   ',
  ].join('\n');

  const inputB = [
    '/>-<\\  ',
    '|   |  ',
    '| /<+-\\',
    '| | | v',
    '\\>+</ |',
    '  |   ^',
    '  \\<->/',
  ].join('\n');

  const carts = [
    {x: 2, y: 0, direction: CART_DIRECTIONS.RIGHT, lastChoice: null},
    {x: 9, y: 3, direction: CART_DIRECTIONS.DOWN, lastChoice: null},
  ];

  const map = [
    ['/', '-', '-', '-', '\\', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['|', ' ', ' ', ' ', '|', ' ', ' ', '/', '-', '-', '-', '-', '\\'],
    ['|', ' ', '/', '-', '+', '-', '-', '+', '-', '\\', ' ', ' ', '|'],
    ['|', ' ', '|', ' ', '|', ' ', ' ', '|', ' ', '|', ' ', ' ', '|'],
    ['\\', '-', '+', '-', '/', ' ', ' ', '\\', '-', '+', '-', '-', '/'],
    [' ', ' ', '\\', '-', '-', '-', '-', '-', '-', '/', ' ', ' ', ' '],
  ];

  describe('Cart', () => {
    describe('#getNextChoice', () => {
      it('returns the turn for the next intersection', () => {
        const cart = new Cart();
        cart.getNextChoice();
        expect(cart.lastChoice).to.eq(INTERSECTION_CHOICES.LEFT);
        cart.getNextChoice();
        expect(cart.lastChoice).to.eq(INTERSECTION_CHOICES.STRAIGHT);
        cart.getNextChoice();
        expect(cart.lastChoice).to.eq(INTERSECTION_CHOICES.RIGHT);
        cart.getNextChoice();
        expect(cart.lastChoice).to.eq(INTERSECTION_CHOICES.LEFT);
      });
    });

    describe('#getNextPosition', () => {
      it('returns the position after the next tick, depending on the direction', () => {
        const cart = new Cart(0, 0, CART_DIRECTIONS.UP);
        expect(cart.getNextPosition()).to.deep.eq({x: 0, y: -1});
        cart.direction = CART_DIRECTIONS.RIGHT;
        expect(cart.getNextPosition()).to.deep.eq({x: 1, y: 0});
        cart.direction = CART_DIRECTIONS.DOWN;
        expect(cart.getNextPosition()).to.deep.eq({x: 0, y: 1});
        cart.direction = CART_DIRECTIONS.LEFT;
        expect(cart.getNextPosition()).to.deep.eq({x: -1, y: 0});
        cart.direction = 'invalid';
        expect(cart.getNextPosition).to.throw();
      });
    });

    describe('#getNextDirection', () => {
      it('returns the direction after visiting the given tile', () => {
        let cart = new Cart(0, 0, CART_DIRECTIONS.UP);
        expect(cart.getNextDirection(MAP_TILES.VERTICAL)).to.eq(CART_DIRECTIONS.UP);
        expect(cart.getNextDirection(MAP_TILES.DIAGONAL_SLASH)).to.eq(CART_DIRECTIONS.RIGHT);
        expect(cart.getNextDirection(MAP_TILES.DIAGONAL_BACKSLASH)).to.eq(CART_DIRECTIONS.LEFT);
        expect(cart.getNextDirection(MAP_TILES.INTERSECTION)).to.eq(CART_DIRECTIONS.LEFT);
        expect(cart.getNextDirection(MAP_TILES.INTERSECTION)).to.eq(CART_DIRECTIONS.UP);
        expect(cart.getNextDirection(MAP_TILES.INTERSECTION)).to.eq(CART_DIRECTIONS.RIGHT);
        expect(() => cart.getNextDirection(MAP_TILES.HORIZONTAL)).to.throw();

        cart = new Cart(0, 0, CART_DIRECTIONS.DOWN);
        expect(cart.getNextDirection(MAP_TILES.VERTICAL)).to.eq(CART_DIRECTIONS.DOWN);
        expect(cart.getNextDirection(MAP_TILES.DIAGONAL_SLASH)).to.eq(CART_DIRECTIONS.LEFT);
        expect(cart.getNextDirection(MAP_TILES.DIAGONAL_BACKSLASH)).to.eq(CART_DIRECTIONS.RIGHT);
        expect(cart.getNextDirection(MAP_TILES.INTERSECTION)).to.eq(CART_DIRECTIONS.RIGHT);
        expect(cart.getNextDirection(MAP_TILES.INTERSECTION)).to.eq(CART_DIRECTIONS.DOWN);
        expect(cart.getNextDirection(MAP_TILES.INTERSECTION)).to.eq(CART_DIRECTIONS.LEFT);
        expect(() => cart.getNextDirection(MAP_TILES.HORIZONTAL)).to.throw();

        cart = new Cart(0, 0, CART_DIRECTIONS.LEFT);
        expect(cart.getNextDirection(MAP_TILES.HORIZONTAL)).to.eq(CART_DIRECTIONS.LEFT);
        expect(cart.getNextDirection(MAP_TILES.DIAGONAL_SLASH)).to.eq(CART_DIRECTIONS.DOWN);
        expect(cart.getNextDirection(MAP_TILES.DIAGONAL_BACKSLASH)).to.eq(CART_DIRECTIONS.UP);
        expect(cart.getNextDirection(MAP_TILES.INTERSECTION)).to.eq(CART_DIRECTIONS.DOWN);
        expect(cart.getNextDirection(MAP_TILES.INTERSECTION)).to.eq(CART_DIRECTIONS.LEFT);
        expect(cart.getNextDirection(MAP_TILES.INTERSECTION)).to.eq(CART_DIRECTIONS.UP);
        expect(() => cart.getNextDirection(MAP_TILES.VERTICAL)).to.throw();

        cart = new Cart(0, 0, CART_DIRECTIONS.RIGHT);
        expect(cart.getNextDirection(MAP_TILES.HORIZONTAL)).to.eq(CART_DIRECTIONS.RIGHT);
        expect(cart.getNextDirection(MAP_TILES.DIAGONAL_SLASH)).to.eq(CART_DIRECTIONS.UP);
        expect(cart.getNextDirection(MAP_TILES.DIAGONAL_BACKSLASH)).to.eq(CART_DIRECTIONS.DOWN);
        expect(cart.getNextDirection(MAP_TILES.INTERSECTION)).to.eq(CART_DIRECTIONS.UP);
        expect(cart.getNextDirection(MAP_TILES.INTERSECTION)).to.eq(CART_DIRECTIONS.RIGHT);
        expect(cart.getNextDirection(MAP_TILES.INTERSECTION)).to.eq(CART_DIRECTIONS.DOWN);
        expect(() => cart.getNextDirection(MAP_TILES.VERTICAL)).to.throw();
      });
    });
  });

  describe('helpers', () => {
    const cartToPOJO = cart => ({
      x: cart.x,
      y: cart.y,
      direction: cart.direction,
      crash: cart.crash || false,
    });

    describe('#parseInput', () => {
      it('parses carts and tracks from input map', () => {
        expect(parseInput(inputA)).to.deep.eq({
          carts,
          map,
        });
      });
    });

    describe('#tick', () => {
      it('advances all carts one step, respecting priority, and sets their :crash property', () => {
        expect(tick([
          new Cart(2, 0, CART_DIRECTIONS.RIGHT),
          new Cart(9, 3, CART_DIRECTIONS.DOWN),
        ], map).map(cartToPOJO)).to.deep.eq([
          {x: 3, y: 0, direction: CART_DIRECTIONS.RIGHT, crash: false},
          {x: 9, y: 4, direction: CART_DIRECTIONS.RIGHT, crash: false},
        ]);
        expect(tick([
          new Cart(3, 0, CART_DIRECTIONS.LEFT),
          new Cart(2, 0, CART_DIRECTIONS.LEFT),
        ], map).map(cartToPOJO)).to.deep.eq([
          {x: 1, y: 0, direction: CART_DIRECTIONS.LEFT, crash: false},
          {x: 2, y: 0, direction: CART_DIRECTIONS.LEFT, crash: false},
        ]);
        expect(tick([
          new Cart(2, 0, CART_DIRECTIONS.RIGHT),
          new Cart(4, 0, CART_DIRECTIONS.LEFT),
        ], map).map(cartToPOJO)).to.deep.eq([
          {x: 3, y: 0, direction: CART_DIRECTIONS.RIGHT, crash: true},
          {x: 3, y: 0, direction: CART_DIRECTIONS.LEFT, crash: true},
        ]);
      });

      context('when removeCrashed === true', () => {
        it('advances all carts one step, respecting priority, and removes those that crashed', () => {
          expect(tick([
            new Cart(2, 0, CART_DIRECTIONS.RIGHT),
            new Cart(9, 3, CART_DIRECTIONS.DOWN),
          ], map, {removeCrashed: true}).map(cartToPOJO)).to.deep.eq([
            {x: 3, y: 0, direction: CART_DIRECTIONS.RIGHT, crash: false},
            {x: 9, y: 4, direction: CART_DIRECTIONS.RIGHT, crash: false},
          ]);
          expect(tick([
            new Cart(3, 0, CART_DIRECTIONS.LEFT),
            new Cart(2, 0, CART_DIRECTIONS.LEFT),
          ], map, {removeCrashed: true}).map(cartToPOJO)).to.deep.eq([
            {x: 1, y: 0, direction: CART_DIRECTIONS.LEFT, crash: false},
            {x: 2, y: 0, direction: CART_DIRECTIONS.LEFT, crash: false},
          ]);
          expect(tick([
            new Cart(2, 0, CART_DIRECTIONS.RIGHT),
            new Cart(4, 0, CART_DIRECTIONS.LEFT),
          ], map, {removeCrashed: true}).map(cartToPOJO)).to.deep.eq([]);
        });
      });
    });
  });

  describe('Puzzle A', () => {
    it('satisfies examples', () => {
      expect(moduleA(inputA)).to.eq('7,3');
    });
  });

  describe('Puzzle B', () => {
    it('satisfies examples', () => {
      expect(moduleB(inputB)).to.eq('6,4');
    });
  });

});
