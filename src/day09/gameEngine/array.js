const getCircularArrayIndex = (currentIndex, difference, arrayLength) => {
  let nextIndex = currentIndex;
  const sign = difference < 0 ? -1 : 1;
  for (let i = 0; i < Math.abs(difference); i = i + 1) {
    nextIndex = nextIndex + sign;
    if (nextIndex > arrayLength - 1) {
      nextIndex = 0;
    }
    if (nextIndex < 0) {
      nextIndex = arrayLength - 1;
    }
  }

  return nextIndex;
};

const arrayGameEngine = (players, marbles) => {
  const circle = [0];
  const score = {};
  let currentMarbleIndex = 0;
  let currentPlayer = 0;

  new Array(players).fill(null).forEach((_, index) => {
    score[index + 1] = 0;
  });

  for (let marbleNum = 1; marbleNum <= marbles; marbleNum = marbleNum + 1) {
    if (marbleNum % 23 === 0) {
      const indexToRemove = getCircularArrayIndex(currentMarbleIndex, -7, circle.length);
      score[currentPlayer + 1] = score[currentPlayer + 1] + marbleNum + circle.splice(indexToRemove, 1)[0];
      currentMarbleIndex = indexToRemove < circle.length ? indexToRemove : 0;
    } else {
      const nextIndex = getCircularArrayIndex(currentMarbleIndex, 1, circle.length) + 1;
      circle.splice(nextIndex, 0, marbleNum);
      currentMarbleIndex = nextIndex;
    }
    currentPlayer = (currentPlayer + 1) % players;
  }

  return {
    circle,
    currentMarbleIndex,
    score,
  };
};

export {
  getCircularArrayIndex,
  arrayGameEngine,
};
