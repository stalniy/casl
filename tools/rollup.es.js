import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/es6/index.js',
    format: 'es'
  },
  plugins: [
    babel({
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-external-helpers'
      ]
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
  ]
};
