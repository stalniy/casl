import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import sourcemaps from 'rollup-plugin-sourcemaps';

function aggregate(configs, optionsOverrides) {
  let external = [];
  let globals = {};

  if (optionsOverrides.external) {
    external = optionsOverrides.external.split(',');
  }

  if (optionsOverrides.globals) {
    globals = optionsOverrides.globals.split(',').reduce((map, chunk) => {
      const [moduleId, globalName] = chunk.split(':');
      map[moduleId] = globalName;
      return map;
    }, {});
    external = external.concat(Object.keys(globals));
  }

  const buildVariations = process.env.BUILD_TYPES
    ? process.env.BUILD_TYPES.split(',')
    : configs.map(config => config.id);
  const buildTypes = buildVariations.reduce((types, chunk) => {
    const [type, format] = chunk.split(':');
    types[type] = { format };
    return types;
  }, {});

  return configs
    .filter(config => buildTypes[config.id])
    .map(config => ({
      external,
      input: optionsOverrides.input || config.input || 'src/index.ts',
      output: {
        sourcemap: true,
        ...config.output,
        globals,
        format: buildTypes[config.id].format || config.output.format,
        plugins: process.env.NODE_ENV === 'production' && process.env.LIB_MINIFY !== 'false'
          ? [terser({
            mangle: {
              properties: {
                reserved: [
                  '_collection',
                  '__esModule',
                  '__forbiddenByCasl__'
                ],
                regex: /^_[a-z]/i
              }
            }
          })]
          : []
      },
      plugins: [
        resolve({
          mainFields: ['module', 'main', 'browser'],
          extensions: ['.js', '.mjs', '.ts'],
        }),
        process.env.ES_TRANSFORM === 'false'
          ? sourcemaps()
          : babel({
              rootMode: 'upward',
              extensions: ['.js', '.mjs', '.ts'],
              babelHelpers: 'bundled',
              caller: {
                output: config.type,
              }
            }),
        ...(config.plugins || [])
      ]
    }));
}

export default overrideOptions => aggregate([
  {
    id: 'es6',
    type: 'es6',
    output: {
      dir: 'dist/es6',
      format: 'es'
    },
  },
  {
    id: 'es5m',
    type: 'es5',
    output: {
      dir: 'dist/es5m',
      format: 'es'
    }
  },
  {
    id: 'umd',
    type: 'es5',
    output: {
      dir: 'dist/umd',
      format: 'umd',
      name: overrideOptions.name,
    },
  },
], overrideOptions);
