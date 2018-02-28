import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/es6/index.js',
    format: 'es'
  },
  plugins: [
    babel({
      plugins: ['transform-class-properties']
    })
  ]
};
