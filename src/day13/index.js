import {
  CART_CHOICES,
  CART_DIRECTIONS,
  MAP_TILES,
  INTERSECTION_CHOICES,
  NEXT_DIRECTION,
} from './constants';

class Cart {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.lastChoice = null;
  }

  getNextChoice() {
    const newIndex = (CART_CHOICES.indexOf(this.lastChoice) + 1) % Object.keys(CART_CHOICES).length;
    this.lastChoice = CART_CHOICES[newIndex];
    return this.lastChoice;
  }

  getNextPosition() {
    const {x, y, direction} = this;
    switch (direction) {
      case CART_DIRECTIONS.UP:
        return {x, y: y - 1};
      case CART_DIRECTIONS.RIGHT:
        return {x: x + 1, y};
      case CART_DIRECTIONS.DOWN:
        return {x, y: y + 1};
      case CART_DIRECTIONS.LEFT:
        return {x: x - 1, y};
      default:
        throw new Error(`Unknown direction ${direction}`);
    }
  }

  getNextDirection(tile) {
    const {direction} = this;

    const nextDirection = tile === MAP_TILES.INTERSECTION
      ? NEXT_DIRECTION[direction][tile][this.getNextChoice()]
      : NEXT_DIRECTION[direction][tile];

    if (!nextDirection) {
      throw new Error(`Error getting next direction for current direction \`${direction}\` and tile \`${tile}\``);
    }

    return nextDirection;
  }
}

const parseInput = input => {
  const map = input
    .split('\n')
    .filter(line => !!line)
    .map(line => line.split(''));
  const carts = [];
  for (let y = 0; y < map.length; y = y + 1) {
    const line = map[y];
    for (let x = 0; x < line.length; x = x + 1) {
      if (Object.values(CART_DIRECTIONS).includes(line[x])) {
        carts.push(new Cart(x, y, line[x]));

        line[x] = (line[x] === CART_DIRECTIONS.UP || line[x] === CART_DIRECTIONS.DOWN)
          ? '|'
          : '-';
      }
    }
  }

  return {carts, map};
};

const sortCartsByPriority = (c1, c2) => {
  if (c1.y !== c2.y) {
    return c1.y - c2.y;
  }

  return c1.x - c2.x;
};

const tick = (carts, map, {removeCrashed = false} = {}) => {
  carts.sort(sortCartsByPriority);
  carts.forEach((cart, index) => {
    const {x, y} = cart.getNextPosition();
    cart.direction = cart.getNextDirection(map[y][x]);
    cart.x = x;
    cart.y = y;

    const crashingCart = carts.find((c, i) => c.x === x && c.y === y && i !== index);
    if (crashingCart) {
      cart.crash = crashingCart.crash = true;
    }
  });

  return removeCrashed
    ? carts.filter(cart => !cart.crash)
    : carts;
};

const moduleA = input => {
  const {carts, map} = parseInput(input);

  let crashingCart;
  do {
    crashingCart = tick(carts, map).find(c => !!c.crash);
  } while (!crashingCart);

  return `${crashingCart.x},${crashingCart.y}`;
};

const moduleB = input => {
  const {carts, map} = parseInput(input);

  let currentCarts = carts;

  do {
    currentCarts = tick(currentCarts, map, {removeCrashed: true});
  } while (currentCarts.length > 1);

  return `${currentCarts[0].x},${currentCarts[0].y}`;
};

export {
  CART_DIRECTIONS,
  MAP_TILES,
  INTERSECTION_CHOICES,
  Cart,
  parseInput,
  tick,
  moduleA,
  moduleB,
};
