import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

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
      input: optionsOverrides.input || config.input || 'src/index.js',
      output: {
        sourcemap: true,
        ...config.output,
        globals,
        format: buildTypes[config.id].format || config.output.format,
      },
      plugins: [
        resolve({
          mainFields: ['module', 'main', 'browser'],
        }),
        babel({
          rootMode: 'upward',
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
    plugins: [
      process.env.NODE_ENV === 'production' ? uglify() : null
    ]
  },
], overrideOptions);
