import strip from 'rollup-plugin-strip';
import replace from 'rollup-plugin-replace';
import localResolve from 'rollup-plugin-local-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
  },
  plugins: [
    localResolve(),
    replace({
      DAY_6_DISTANCE_THRESHOLD: 10000,
      DAY_7_TIME_ADDITION: 60,
      DAY_7_WORKER_COUNT: 5,
    }),
    strip({
      debugger: true,
      functions: [
        'console.log',
        'assert.*',
        'debug',
        'alert',
      ],
      sourceMap: false,
    }),
  ],
};
