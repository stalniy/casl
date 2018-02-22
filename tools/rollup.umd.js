import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import config from './rollup.es';
const packageDetails = require(`${process.cwd()}/package.json`);

export default Object.assign({}, config, {
  output: {
    file: 'dist/umd/index.js',
    format: 'umd',
    name: packageDetails.name
      .slice(1)
      .replace(/[\/-](\w)/g, (match, letter) => letter.toUpperCase()),
  },
  plugins: config.plugins.concat([
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
