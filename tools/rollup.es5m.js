import babel from 'rollup-plugin-babel';
import config from './rollup.es';

export default Object.assign({}, config, {
  output: {
    file: 'index.js',
    format: 'es'
  },
  plugins: config.plugins.concat([
    babel({
      exclude: 'node_modules/**',
      presets: [
        ['es2015', { modules: false }]
      ],
      plugins: ['external-helpers']
    })
  ])
});
