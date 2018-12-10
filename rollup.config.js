import strip from 'rollup-plugin-strip';
import localResolve from 'rollup-plugin-local-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
  },
  plugins: [
    localResolve(),
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
