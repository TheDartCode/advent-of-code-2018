import replace from 'rollup-plugin-replace';
import multiEntry from 'rollup-plugin-multi-entry';
import localResolve from 'rollup-plugin-local-resolve';

export default {
  input: 'src/**/__tests__.js',
  output: {
    file: 'test/index.js',
    format: 'cjs',
  },
  external: ['chai'],
  plugins: [
    localResolve(),
    replace({
      DAY_6_DISTANCE_THRESHOLD: 32,
      DAY_7_TIME_ADDITION: 0,
      DAY_7_WORKER_COUNT: 2,
      DAY_10_MAX_SEARCH_TIME: 10,
    }),
    multiEntry(),
  ],
};
