import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const build = config => ({
  input: config.input || 'src/index.ts',
  output: {
    sourcemap: true,
    format: config.format,
    dir: `dist/${config.id}`,
    name: config.name,
    plugins: [
      config.minify
        ? terser({
          mangle: { properties: { regex: /^_[a-z]/i } }
        })
        : null
    ]
  },
  plugins: [
    resolve({
      mainFields: ['es2015', 'module', 'main', 'browser'],
      extensions: ['.js', '.mjs', '.ts'],
    }),
    babel({
      rootMode: 'upward',
      extensions: ['.js', '.mjs', '.ts'],
      inputSourceMap: config.useInputSourceMaps,
      babelHelpers: 'bundled',
      caller: {
        output: config.type,
      }
    }),
    ...(config.plugins || [])
  ]
});

function parseOptions(overrideOptions) {
  const options = {
    external: [],
    useInputSourceMaps: !!process.env.USE_SRC_MAPS,
    minify: process.env.NODE_ENV === 'production' && process.env.LIB_MINIFY !== 'false'
  };

  if (overrideOptions.external) {
    options.external = overrideOptions.external.split(',');
  }

  if (overrideOptions.globals) {
    options.globals = overrideOptions.globals.split(',').reduce((map, chunk) => {
      const [moduleId, globalName] = chunk.split(':');
      map[moduleId] = globalName;
      return map;
    }, {});
    options.external.push(...Object.keys(options.globals));
  }

  return options;
}

export default (overrideOptions) => {
  const builds = [
    { id: 'es6m', type: 'es6', format: 'es' },
    { id: 'es6c', type: 'es6', format: 'cjs' },
    { id: 'es5m', type: 'es5', format: 'es' },
    { id: 'umd', type: 'es5', format: 'umd', name: overrideOptions.name },
  ];
  const config = parseOptions(overrideOptions);
  const buildTypes = process.env.BUILD_TYPES
    ? process.env.BUILD_TYPES.split(',')
    : builds.map(buildConfig => buildConfig.id);

  return builds
    .filter(buildType => buildTypes.includes(buildType.id))
    .map(buildType => build({ ...buildType, ...config }));
};
