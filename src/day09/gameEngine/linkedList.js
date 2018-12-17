const insertMarbleAfter = (value, currentMarble) => {
  const marble = {
    value,
    next: currentMarble.next,
    previous: currentMarble,
  };

  currentMarble.next = marble;
  marble.next.previous = marble;

  return marble;
};

const removeMarble = marble => {
  marble.previous.next = marble.next;
  marble.next.previous = marble.previous;
  return marble.next;
};

const getMarbleAt = (currentMarble, difference) => {
  let marble = currentMarble;
  const sign = difference < 0 ? -1 : 1;
  for (let i = 0; i < Math.abs(difference); i = i + 1) {
    marble = sign > 0
      ? marble.next
      : marble.previous;
  }
  return marble;
};

const linkedListGameEngine = (players, marbles) => {
  const root = {
    value: 0,
    next: null,
    previous: null,
  };
  root.next = root;
  root.previous = root;

  let currentMarble = root;

  const score = {};
  let currentPlayer = 0;

  new Array(players).fill(null).forEach((_, index) => {
    score[index + 1] = 0;
  });

  for (let marbleNum = 1; marbleNum <= marbles; marbleNum = marbleNum + 1) {
    if (marbleNum % 23 === 0) {
      const marbleToRemove = getMarbleAt(currentMarble, -7);
      score[currentPlayer + 1] = score[currentPlayer + 1] + marbleNum + marbleToRemove.value;
      currentMarble = removeMarble(marbleToRemove);
    } else {
      currentMarble = insertMarbleAfter(marbleNum, currentMarble.next);
    }
    currentPlayer = (currentPlayer + 1) % players;
  }

  const circle = [];
  let next = root;

  do {
    circle.push(next.value);
    next = next.next;
  } while (next !== root);

  return {
    circle,
    currentMarbleIndex: circle.indexOf(currentMarble.value),
    score,
  };
};

export {linkedListGameEngine};
