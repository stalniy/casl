import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';
import config from './rollup.es';

export default Object.assign({}, config, {
  output: {
    file: 'dist/umd/index.js',
    format: 'umd'
  },
  plugins: config.plugins.concat([
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', {
          modules: false,
          loose: true,
          targets: {
            browsers: ['last 3 versions', 'safari >= 7']
          }
        }]
      ],
      plugins: ['@babel/plugin-external-helpers']
    }),
    process.env.NODE_ENV === 'production' && uglify()
  ])
});
