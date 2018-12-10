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
    multiEntry(),
  ],
};
