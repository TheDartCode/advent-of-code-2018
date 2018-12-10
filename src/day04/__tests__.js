const {expect} = require('chai');
import {
  parseEntry,
  sortEntries,
  readGuardData,
  getMostAsleepGuard,
  getMostCommonSleepMinute,
  getGuardWithMostCommonMinute,
  moduleA,
  moduleB,
} from './';

describe('Day 4', () => {
  /*
   *
   * [1518-11-01 00:00] Guard #10 begins shift
   * [1518-11-01 00:05] falls asleep
   * [1518-11-01 00:25] wakes up
   * [1518-11-01 00:30] falls asleep
   * [1518-11-01 00:55] wakes up
   * [1518-11-01 23:58] Guard #99 begins shift
   * [1518-11-02 00:40] falls asleep
   * [1518-11-02 00:50] wakes up
   * [1518-11-03 00:05] Guard #10 begins shift
   * [1518-11-03 00:24] falls asleep
   * [1518-11-03 00:29] wakes up
   * [1518-11-04 00:02] Guard #99 begins shift
   * [1518-11-04 00:36] falls asleep
   * [1518-11-04 00:46] wakes up
   * [1518-11-05 00:03] Guard #99 begins shift
   * [1518-11-05 00:45] falls asleep
   * [1518-11-05 00:55] wakes up
   *
   * Date   ID   Minute
   *             000000000011111111112222222222333333333344444444445555555555
   *             012345678901234567890123456789012345678901234567890123456789
   * 11-01  #10  .....####################.....#########################.....
   * 11-02  #99  ........................................##########..........
   * 11-03  #10  ........................#####...............................
   * 11-04  #99  ....................................##########..............
   * 11-05  #99  .............................................##########.....
   *
   */

  const input = [
    '[1518-11-01 00:00] Guard #10 begins shift',
    '[1518-11-01 00:05] falls asleep',
    '[1518-11-01 00:25] wakes up',
    '[1518-11-01 00:30] falls asleep',
    '[1518-11-01 00:55] wakes up',
    '[1518-11-01 23:58] Guard #99 begins shift',
    '[1518-11-02 00:40] falls asleep',
    '[1518-11-02 00:50] wakes up',
    '[1518-11-03 00:05] Guard #10 begins shift',
    '[1518-11-03 00:24] falls asleep',
    '[1518-11-03 00:29] wakes up',
    '[1518-11-04 00:02] Guard #99 begins shift',
    '[1518-11-04 00:36] falls asleep',
    '[1518-11-04 00:46] wakes up',
    '[1518-11-05 00:03] Guard #99 begins shift',
    '[1518-11-05 00:45] falls asleep',
    '[1518-11-05 00:55] wakes up',
  ].join('\n');

  const normalizedEntries = [
    {year: 1518, month: 11, day: 1, hour: 0, minute: 0, action: 'begins_shift', guard: 10},
    {year: 1518, month: 11, day: 1, hour: 0, minute: 5, action: 'falls_asleep', guard: 10},
    {year: 1518, month: 11, day: 1, hour: 0, minute: 25, action: 'wakes_up', guard: 10},
    {year: 1518, month: 11, day: 1, hour: 0, minute: 30, action: 'falls_asleep', guard: 10},
    {year: 1518, month: 11, day: 1, hour: 0, minute: 55, action: 'wakes_up', guard: 10},
    {year: 1518, month: 11, day: 1, hour: 23, minute: 58, action: 'begins_shift', guard: 99},
    {year: 1518, month: 11, day: 2, hour: 0, minute: 40, action: 'falls_asleep', guard: 99},
    {year: 1518, month: 11, day: 2, hour: 0, minute: 50, action: 'wakes_up', guard: 99},
    {year: 1518, month: 11, day: 3, hour: 0, minute: 5, action: 'begins_shift', guard: 10},
    {year: 1518, month: 11, day: 3, hour: 0, minute: 24, action: 'falls_asleep', guard: 10},
    {year: 1518, month: 11, day: 3, hour: 0, minute: 29, action: 'wakes_up', guard: 10},
    {year: 1518, month: 11, day: 4, hour: 0, minute: 2, action: 'begins_shift', guard: 99},
    {year: 1518, month: 11, day: 4, hour: 0, minute: 36, action: 'falls_asleep', guard: 99},
    {year: 1518, month: 11, day: 4, hour: 0, minute: 46, action: 'wakes_up', guard: 99},
    {year: 1518, month: 11, day: 5, hour: 0, minute: 3, action: 'begins_shift', guard: 99},
    {year: 1518, month: 11, day: 5, hour: 0, minute: 45, action: 'falls_asleep', guard: 99},
    {year: 1518, month: 11, day: 5, hour: 0, minute: 55, action: 'wakes_up', guard: 99},
  ];

  describe('helpers', () => {
    describe('#parseEntry', () => {
      it('parses the log correctly', () => {
        expect(parseEntry('[1518-11-01 00:00] Guard #10 begins shift')).to.deep.eq({
          year: 1518,
          month: 11,
          day: 1,
          hour: 0,
          minute: 0,
          guard: 10,
          action: 'begins_shift',
        });

        expect(parseEntry('[1518-11-03 00:24] falls asleep')).to.deep.eq({
          year: 1518,
          month: 11,
          day: 3,
          hour: 0,
          minute: 24,
          action: 'falls_asleep',
        });
      });
    });

    describe('#sortEntries', () => {
      it('sorts the list correctly', () => {
        const entry1 = {year: 1518, month: 11, day: 1, hour: 0, minute: 0, action: 'Action #1'};
        const entry2 = {year: 1518, month: 11, day: 1, hour: 0, minute: 12, action: 'Action #2'};
        const entry3 = {year: 1518, month: 11, day: 1, hour: 2, minute: 0, action: 'Action #3'};
        const entry4 = {year: 1518, month: 11, day: 1, hour: 2, minute: 10, action: 'Action #4'};
        const entry5 = {year: 1518, month: 11, day: 2, hour: 0, minute: 0, action: 'Action #5'};
        const entry6 = {year: 1518, month: 11, day: 2, hour: 0, minute: 30, action: 'Action #6'};
        const entry7 = {year: 1518, month: 11, day: 2, hour: 1, minute: 2, action: 'Action #7'};
        const entry8 = {year: 1518, month: 12, day: 0, hour: 0, minute: 1, action: 'Action #8'};

        expect(sortEntries([entry7, entry5, entry1, entry4, entry3, entry2, entry8, entry6])).to.deep.eq([
          entry1,
          entry2,
          entry3,
          entry4,
          entry5,
          entry6,
          entry7,
          entry8,
        ]);
      });
    });

    describe('#readGuardData', () => {
      it('reads a sorted and normalized list of entries and translates it to guard data', () => {
        expect(readGuardData(normalizedEntries)).to.deep.eq([
          {
            guard: 10,
            minutes: {
              '5': 1, '6': 1, '7': 1, '8': 1, '9': 1, '10': 1, '11': 1, '12': 1,
              '13': 1, '14': 1, '15': 1, '16': 1, '17': 1, '18': 1, '19': 1,
              '20': 1, '21': 1, '22': 1, '23': 1, '24': 2, '25': 1, '26': 1,
              '27': 1, '28': 1, '30': 1, '31': 1, '32': 1, '33': 1, '34': 1,
              '35': 1, '36': 1, '37': 1, '38': 1, '39': 1, '40': 1, '41': 1,
              '42': 1, '43': 1, '44': 1, '45': 1, '46': 1, '47': 1, '48': 1,
              '49': 1, '50': 1, '51': 1, '52': 1, '53': 1, '54': 1,
            },
            totalMinutes: 50,
            mostCommonMinute: 24,
          },
          {
            guard: 99,
            minutes: {
              '36': 1, '37': 1, '38': 1, '39': 1, '40': 2, '41': 2, '42': 2,
              '43': 2, '44': 2, '45': 3, '46': 2, '47': 2, '48': 2, '49': 2,
              '50': 1, '51': 1, '52': 1, '53': 1, '54': 1,
            },
            totalMinutes: 30,
            mostCommonMinute: 45,
          },
        ]);
      });
    });

    describe('#getMostAsleepGuard', () => {
      it('returns the guard entry of the most asleep guard', () => {
        const guardData = [
          {
            guard: 10,
            minutes: {
              '5': 1, '6': 1, '7': 1, '8': 1, '9': 1, '10': 1, '11': 1, '12': 1,
              '13': 1, '14': 1, '15': 1, '16': 1, '17': 1, '18': 1, '19': 1,
              '20': 1, '21': 1, '22': 1, '23': 1, '24': 2, '25': 1, '26': 1,
              '27': 1, '28': 1, '30': 1, '31': 1, '32': 1, '33': 1, '34': 1,
              '35': 1, '36': 1, '37': 1, '38': 1, '39': 1, '40': 1, '41': 1,
              '42': 1, '43': 1, '44': 1, '45': 1, '46': 1, '47': 1, '48': 1,
              '49': 1, '50': 1, '51': 1, '52': 1, '53': 1, '54': 1,
            },
            totalMinutes: 50,
            mostCommonMinute: 24,
          },
          {
            guard: 99,
            minutes: {
              '36': 1, '37': 1, '38': 1, '39': 1, '40': 2, '41': 2, '42': 2,
              '43': 2, '44': 2, '45': 3, '46': 2, '47': 2, '48': 2, '49': 2,
              '50': 1, '51': 1, '52': 1, '53': 1, '54': 1,
            },
            totalMinutes: 30,
            mostCommonMinute: 45,
          },
        ];
        expect(getMostAsleepGuard(guardData)).to.deep.eq({
          guard: 10,
          minutes: {
            '5': 1, '6': 1, '7': 1, '8': 1, '9': 1, '10': 1, '11': 1, '12': 1,
            '13': 1, '14': 1, '15': 1, '16': 1, '17': 1, '18': 1, '19': 1,
            '20': 1, '21': 1, '22': 1, '23': 1, '24': 2, '25': 1, '26': 1,
            '27': 1, '28': 1, '30': 1, '31': 1, '32': 1, '33': 1, '34': 1,
            '35': 1, '36': 1, '37': 1, '38': 1, '39': 1, '40': 1, '41': 1,
            '42': 1, '43': 1, '44': 1, '45': 1, '46': 1, '47': 1, '48': 1,
            '49': 1, '50': 1, '51': 1, '52': 1, '53': 1, '54': 1,
          },
          totalMinutes: 50,
          mostCommonMinute: 24,
        });
      });
    });

    describe('#getMostCommonSleepMinute', () => {
      it('returns the minute which has the highest sleep count', () => {
        expect(
          getMostCommonSleepMinute({
            '5': 1, '6': 1, '7': 1, '8': 1, '9': 1, '10': 1, '11': 1, '12': 1,
            '13': 1, '14': 1, '15': 1, '16': 1, '17': 1, '18': 1, '19': 1,
            '20': 1, '21': 1, '22': 1, '23': 1, '24': 2, '25': 1, '26': 1,
            '27': 1, '28': 1, '30': 1, '31': 1, '32': 1, '33': 1, '34': 1,
            '35': 1, '36': 1, '37': 1, '38': 1, '39': 1, '40': 1, '41': 1,
            '42': 1, '43': 1, '44': 1, '45': 1, '46': 1, '47': 1, '48': 1,
            '49': 1, '50': 1, '51': 1, '52': 1, '53': 1, '54': 1,
          })
        ).to.eq(24);
      });
    });

    describe('#getGuardWithMostCommonMinute', () => {
      it('returns the guard entry with the most common minute', () => {
        const guardData = [
          {
            guard: 10,
            minutes: {
              '5': 1, '6': 1, '7': 1, '8': 1, '9': 1, '10': 1, '11': 1, '12': 1,
              '13': 1, '14': 1, '15': 1, '16': 1, '17': 1, '18': 1, '19': 1,
              '20': 1, '21': 1, '22': 1, '23': 1, '24': 2, '25': 1, '26': 1,
              '27': 1, '28': 1, '30': 1, '31': 1, '32': 1, '33': 1, '34': 1,
              '35': 1, '36': 1, '37': 1, '38': 1, '39': 1, '40': 1, '41': 1,
              '42': 1, '43': 1, '44': 1, '45': 1, '46': 1, '47': 1, '48': 1,
              '49': 1, '50': 1, '51': 1, '52': 1, '53': 1, '54': 1,
            },
            totalMinutes: 50,
            mostCommonMinute: 24,
          },
          {
            guard: 99,
            minutes: {
              '36': 1, '37': 1, '38': 1, '39': 1, '40': 2, '41': 2, '42': 2,
              '43': 2, '44': 2, '45': 3, '46': 2, '47': 2, '48': 2, '49': 2,
              '50': 1, '51': 1, '52': 1, '53': 1, '54': 1,
            },
            totalMinutes: 30,
            mostCommonMinute: 45,
          },
        ];
        expect(getGuardWithMostCommonMinute(guardData)).to.deep.eq({
          guard: 99,
          minutes: {
            '36': 1, '37': 1, '38': 1, '39': 1, '40': 2, '41': 2, '42': 2,
            '43': 2, '44': 2, '45': 3, '46': 2, '47': 2, '48': 2, '49': 2,
            '50': 1, '51': 1, '52': 1, '53': 1, '54': 1,
          },
          totalMinutes: 30,
          mostCommonMinute: 45,
        });
      });
    });
  });
  /*
   *
   *
   *
   */
  describe('Puzzle A', () => {
    it('satisfies examples', () => {
      expect(moduleA(input)).to.eq(240);
    });
  });

  /*
   *
   *
   *
   */
  describe('Puzzle B', () => {
    it('satisfies examples', () => {
      expect(moduleB(input)).to.eq(4455);
    });
  });
});
