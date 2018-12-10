import {arrayUnique} from '../shared/helpers';

const LOG_ACTIONS = {
  BEGINS_SHIFT: 'begins_shift',
  FALLS_ASLEEP: 'falls_asleep',
  WAKES_UP: 'wakes_up',
};

const parseAction = action => {
  const beginsShiftRegex = /Guard #(\d*?) begins shift/;
  const fallsAsleepRegex = /falls asleep/;
  const wakesUpRegex = /wakes up/;

  let match = action.match(beginsShiftRegex);
  if (match) {
    return {
      guard: parseInt(match[1], 10),
      action: LOG_ACTIONS.BEGINS_SHIFT,
    };
  }

  match = action.match(fallsAsleepRegex);
  if (match) {
    return {action: LOG_ACTIONS.FALLS_ASLEEP};
  }

  match = action.match(wakesUpRegex);
  if (match) {
    return {action: LOG_ACTIONS.WAKES_UP};
  }

  throw new Error(`Unknown log action ${action}`);
};

const parseEntry = entry => {
  const regex = /^\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] ([\s\S]*)$/;
  const match = entry.match(regex);

  return {
    year: parseInt(match[1], 10),
    month: parseInt(match[2], 10),
    day: parseInt(match[3], 10),
    hour: parseInt(match[4], 10),
    minute: parseInt(match[5], 10),
    ...parseAction(match[6]),
  };
};

const normalizeEntries = entries => {
  for (let i = 0; i < entries.length; i = i + 1) {
    const entry = entries[i];
    if (i > 0 && !entry.guard) {
      entry.guard = entries[i - 1].guard;
    }
  }
};

const dateTimeAsc = (entry1, entry2) => {
  if (entry1.year !== entry2.year) {
    return entry1.year - entry2.year;
  }

  if (entry1.month !== entry2.month) {
    return entry1.month - entry2.month;
  }

  if (entry1.day !== entry2.day) {
    return entry1.day - entry2.day;
  }

  if (entry1.hour !== entry2.hour) {
    return entry1.hour - entry2.hour;
  }

  if (entry1.minute !== entry2.minute) {
    return entry1.minute - entry2.minute;
  }

  return 0;
};

const sortEntries = entries => {
  entries.sort(dateTimeAsc);

  return entries;
};

const parseInput = input => {
  const result = input
    .split('\n')
    .filter(line => !!line)
    .map(parseEntry);

  sortEntries(result);
  normalizeEntries(result);

  return result;
};

const getMostCommonSleepMinute = guardMinutes => {
  if (Object.entries(guardMinutes).length === 0) {
    return null;
  }

  const mostCommonMinuteEntry = Object.entries(guardMinutes).sort((m1, m2) => m2[1] - m1[1])[0];

  return parseInt(mostCommonMinuteEntry[0], 10);
};

const getTotalSleepMinutes = minutes => Object.values(minutes).reduce((r, i) => (r + i), 0);

const range = (min, max) => new Array(max - min).fill(0).map((_, index) => min + index);

const inc = (arr, index) => {
  arr[index] = !arr[index] ? 1 : (arr[index] + 1);
};

const filterSleepRelatedGuardEntries = (guard, entries) => {
  return entries
    .filter(entry => entry.guard === guard)
    .filter(entry => entry.action === LOG_ACTIONS.FALLS_ASLEEP || entry.action === LOG_ACTIONS.WAKES_UP);
};

const aggregateGuardData = guardData => {
  const sleepMinutes = {};

  for (let i = 0; i < guardData.length; i = i + 2) {
    const sleepRange = range(guardData[i].minute, guardData[i + 1].minute);
    sleepRange.forEach(minute => inc(sleepMinutes, minute));
  }

  return {
    guard: guardData[0].guard,
    minutes: sleepMinutes,
    totalMinutes: getTotalSleepMinutes(sleepMinutes),
    mostCommonMinute: getMostCommonSleepMinute(sleepMinutes),
  };
};

const readGuardData = entries => {
  const guards = arrayUnique(entries.map(entry => entry.guard));

  return guards
    .map(guard => filterSleepRelatedGuardEntries(guard, entries))
    .map(aggregateGuardData);
};

const getMostAsleepGuard = guardData => {
  return guardData.sort((g1, g2) => g2.totalMinutes - g1.totalMinutes)[0];
};

const getGuardWithMostCommonMinute = guardData => {
  return guardData.sort((g1, g2) => {
    return g2.minutes[g2.mostCommonMinute] - g1.minutes[g1.mostCommonMinute];
  })[0];
};

const moduleA = input => {
  const entries = parseInput(input);

  const guardData = readGuardData(entries);

  const mostAsleepGuard = getMostAsleepGuard(guardData);

  const mostCommonMinute = getMostCommonSleepMinute(mostAsleepGuard.minutes);

  return mostAsleepGuard.guard * mostCommonMinute;
};

const moduleB = input => {
  const entries = parseInput(input);

  const guardData = readGuardData(entries);

  const guardWithMostCommonMinute = getGuardWithMostCommonMinute(guardData);

  return guardWithMostCommonMinute.guard * guardWithMostCommonMinute.mostCommonMinute;
};

export {
  parseInput,
  parseEntry,
  sortEntries,
  readGuardData,
  getMostAsleepGuard,
  getMostCommonSleepMinute,
  getGuardWithMostCommonMinute,
  moduleA,
  moduleB,
};
