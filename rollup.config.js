import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { dirname, basename, extname } from 'path';

const output = (config) => {
  let prop = 'dir';
  let path = `dist/${config.id}${config.subpath}`;

  if (config.ext) {
    prop = 'file';
    path += `/${basename(config.input, extname(config.input))}${config.ext}`;
  }

  return {
    [prop]: path,
    format: config.format,
    name: config.name,
    globals: config.globals,
  };
};

const build = config => ({
  input: config.input,
  external: config.external,
  output: {
    sourcemap: true,
    ...output(config),
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
    input: 'src/index.ts',
    subpath: '',
    useInputSourceMaps: !!process.env.USE_SRC_MAPS,
    minify: process.env.NODE_ENV === 'production' && process.env.LIB_MINIFY !== 'false'
  };

  if (overrideOptions.input) {
    options.input = overrideOptions.input[0];
    options.subpath = dirname(options.input).replace(/^src/, '');
  }

  if (typeof overrideOptions.external === 'string') {
    options.external = overrideOptions.external.split(',');
  } else if (overrideOptions.external) {
    options.external = options.external.concat(overrideOptions.external);
  }

  if (typeof overrideOptions.globals === 'string') {
    options.globals = overrideOptions.globals.split(',');
  }

  if (options.globals) {
    options.globals = options.globals.reduce((map, chunk) => {
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
    { id: 'es6m', type: 'es6', format: 'es', ext: '.mjs' },
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
