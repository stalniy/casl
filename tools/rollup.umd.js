import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/umd/index.js',
    format: 'umd'
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    babel({ rootMode: 'upward' }),
    commonjs(),
  ].concat(
    process.env.NODE_ENV === 'production' && !process.env.SKIP_MINIFY ? uglify() : []
  )
};
