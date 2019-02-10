import config from './rollup.es';

process.env.BUILD_TYPE = 'js';

export default Object.assign({}, config, {
  output: {
    file: 'dist/es5m/index.js',
    format: 'es',
  },
});
