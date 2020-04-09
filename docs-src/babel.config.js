const CONFIG = {
  default: {
    plugins: [
      '@babel/plugin-proposal-class-properties',
      ['@babel/plugin-proposal-unicode-property-regex', { useUnicodeFlag: false }],
    ],
  },
  es5: {
    presets: [
      ['@babel/preset-env', {
        loose: true,
        useBuiltIns: false,
        targets: 'defaults',
      }]
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
