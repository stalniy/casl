import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { dirname, basename, extname } from 'path';
import babelConfig from './babel.config.mjs';

function extensionify(options) {
  return {
    name: 'extensionify',
    renderChunk(code) {
      return code.replace(/((?:import|export)[^}]+\}\s*from\s*)(['"])(\.\/[^'"]+)/g, (_, importedPackage, quote, packageName) => {
        return `${importedPackage}${quote}${packageName}${options.ext}`;
      });
    }
  }
}

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
          keep_fnames: /Ability|ForbiddenError/,
          keep_classnames: /Ability|ForbiddenError/,
          mangle: {
            properties: {
              regex: /^_[a-z]/i
            },
          },
          compress: {
            inline: 0,
            defaults: false,
          }
        })
        : null,
      config.ext
        ? extensionify({ ext: config.ext })
        : null
    ]
  },
  plugins: [
    resolve({
      mainFields: ['es2015', 'module', 'main', 'browser'],
      extensions: ['.js', '.mjs', '.ts'],
    }),
    config.transformJS
      ? babel({
        ...babelConfig(config.type),
        babelrc: false,
        extensions: ['.js', '.mjs', '.ts'],
        inputSourceMap: config.useInputSourceMaps,
        babelHelpers: 'bundled',
      })
      : sourcemaps(),
    ...config.plugins
  ]
});

function parseOptions(overrideOptions) {
  const options = {
    external: [],
    input: 'src/index.ts',
    subpath: '',
    useInputSourceMaps: !!process.env.USE_SRC_MAPS,
    minify: process.env.NODE_ENV === 'production' && process.env.LIB_MINIFY !== 'false',
    transformJS: process.env.ES_TRANSFORM !== 'false',
    plugins: [],
  };

  if (overrideOptions.input) {
    options.input = overrideOptions.input[0];
    options.subpath = process.env.IGNORE_SUBPATH
      ? ''
      : dirname(options.input).replace(/^src/, '');
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
    { id: 'es6m', type: 'es6', format: 'es', ext: process.env.ES6M_EXT || '.mjs' },
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
