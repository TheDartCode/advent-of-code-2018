const CART_DIRECTIONS = {
  UP: '^',
  DOWN: 'v',
  LEFT: '<',
  RIGHT: '>',
};

const INTERSECTION_CHOICES = {
  LEFT: 'left',
  STRAIGHT: 'strsight',
  RIGHT: 'right',
};

const CART_CHOICES = [
  INTERSECTION_CHOICES.LEFT,
  INTERSECTION_CHOICES.STRAIGHT,
  INTERSECTION_CHOICES.RIGHT,
];

const MAP_TILES = {
  VERTICAL: '|',
  HORIZONTAL: '-',
  DIAGONAL_SLASH: '/',
  DIAGONAL_BACKSLASH: '\\',
  INTERSECTION: '+',
};

const NEXT_DIRECTION = {
  [CART_DIRECTIONS.UP]: {
    [MAP_TILES.VERTICAL]: CART_DIRECTIONS.UP,
    [MAP_TILES.DIAGONAL_SLASH]: CART_DIRECTIONS.RIGHT,
    [MAP_TILES.DIAGONAL_BACKSLASH]: CART_DIRECTIONS.LEFT,
    [MAP_TILES.INTERSECTION]: {
      [INTERSECTION_CHOICES.LEFT]: CART_DIRECTIONS.LEFT,
      [INTERSECTION_CHOICES.STRAIGHT]: CART_DIRECTIONS.UP,
      [INTERSECTION_CHOICES.RIGHT]: CART_DIRECTIONS.RIGHT,
    },
  },
  [CART_DIRECTIONS.RIGHT]: {
    [MAP_TILES.HORIZONTAL]: CART_DIRECTIONS.RIGHT,
    [MAP_TILES.DIAGONAL_SLASH]: CART_DIRECTIONS.UP,
    [MAP_TILES.DIAGONAL_BACKSLASH]: CART_DIRECTIONS.DOWN,
    [MAP_TILES.INTERSECTION]: {
      [INTERSECTION_CHOICES.LEFT]: CART_DIRECTIONS.UP,
      [INTERSECTION_CHOICES.STRAIGHT]: CART_DIRECTIONS.RIGHT,
      [INTERSECTION_CHOICES.RIGHT]: CART_DIRECTIONS.DOWN,
    },
  },
  [CART_DIRECTIONS.DOWN]: {
    [MAP_TILES.VERTICAL]: CART_DIRECTIONS.DOWN,
    [MAP_TILES.DIAGONAL_SLASH]: CART_DIRECTIONS.LEFT,
    [MAP_TILES.DIAGONAL_BACKSLASH]: CART_DIRECTIONS.RIGHT,
    [MAP_TILES.INTERSECTION]: {
      [INTERSECTION_CHOICES.LEFT]: CART_DIRECTIONS.RIGHT,
      [INTERSECTION_CHOICES.STRAIGHT]: CART_DIRECTIONS.DOWN,
      [INTERSECTION_CHOICES.RIGHT]: CART_DIRECTIONS.LEFT,
    },
  },
  [CART_DIRECTIONS.LEFT]: {
    [MAP_TILES.HORIZONTAL]: CART_DIRECTIONS.LEFT,
    [MAP_TILES.DIAGONAL_SLASH]: CART_DIRECTIONS.DOWN,
    [MAP_TILES.DIAGONAL_BACKSLASH]: CART_DIRECTIONS.UP,
    [MAP_TILES.INTERSECTION]: {
      [INTERSECTION_CHOICES.LEFT]: CART_DIRECTIONS.DOWN,
      [INTERSECTION_CHOICES.STRAIGHT]: CART_DIRECTIONS.LEFT,
      [INTERSECTION_CHOICES.RIGHT]: CART_DIRECTIONS.UP,
    },
  },
};

export {
  CART_CHOICES,
  CART_DIRECTIONS,
  MAP_TILES,
  INTERSECTION_CHOICES,
  NEXT_DIRECTION,
};
