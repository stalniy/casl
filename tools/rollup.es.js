import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

process.env.BUILD_TYPE = 'es';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/es6/index.js',
    format: 'es'
  },
  plugins: [
    resolve({
      mainFields: ['jsnext', 'main', 'browser'],
    }),
    babel({ rootMode: 'upward' }),
  ]
};
