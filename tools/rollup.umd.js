import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import config from './rollup.es';

export default Object.assign({}, config, {
  dest: 'dist/umd/index.js',
  format: 'umd',
  moduleName: 'casl',
  plugins: config.plugins.concat([
    babel({
      exclude: 'node_modules/**'
    }),
    process.env.NODE_ENV === 'production' && uglify()
  ])
});
