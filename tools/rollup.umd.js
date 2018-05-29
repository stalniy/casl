import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import config from './rollup.es';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default Object.assign({}, config, {
  output: {
    file: 'dist/umd/index.js',
    format: 'umd',
  },
  plugins: config.plugins.concat([
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      presets: [
        ['es2015', { modules: false }]
      ],
      plugins: ['external-helpers']
    }),
    process.env.NODE_ENV === 'production' && uglify()
  ])
});
