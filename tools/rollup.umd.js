import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/umd/index.js',
    format: 'umd'
  },
  plugins: [
    resolve({
      mainFields: ['jsnext', 'main', 'browser'],
    }),
    babel({ rootMode: 'upward' }),
  ].concat(
    process.env.NODE_ENV === 'production' && !process.env.SKIP_MINIFY ? uglify() : []
  )
};
