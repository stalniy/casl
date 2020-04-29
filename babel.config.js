const CONFIG = {
  default: {
    plugins: [
      ['@babel/plugin-transform-typescript', {
        allowDeclareFields: true
      }],
      ['@babel/plugin-proposal-class-properties', {
        loose: true
      }],
    ],
  },
  es6: {
    plugins: [
      ['@babel/plugin-proposal-object-rest-spread', {
        loose: true,
        useBuiltIns: true
      }]
    ]
  },
  es5: {
    presets: [
      ['@babel/preset-env', {
        modules: false,
        loose: true,
        targets: {
          browsers: ['last 3 versions']
        }
      }],
    ],
  },
  test: {
    presets: [
      ['@babel/preset-env', {
        loose: true,
        targets: {
          node: '10'
        }
      }]
    ],
  }
};

function config(name) {
  if (name === 'default' || !CONFIG[name]) {
    return CONFIG.default;
  }

  const { presets = [], plugins = [] } = CONFIG[name];

  return {
    presets: presets.concat(CONFIG.default.presets || []),
    plugins: plugins.concat(CONFIG.default.plugins || []),
  };
}

module.exports = (api) => {
  let format;
  api.caller(caller => format = caller.output || process.env.NODE_ENV);
  api.cache.using(() => format);

  return config(format);
};
