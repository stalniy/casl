import babel from 'rollup-plugin-babel';
import config from './rollup.es';

export default Object.assign({}, config, {
  output: {
    file: 'dist/es5m/index.js',
    format: 'es',
  },
  plugins: config.plugins.concat([
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
    })
  ])
});
