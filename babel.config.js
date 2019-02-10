const ES_CONFIGS = {
  es: {
    plugins: [
      '@babel/plugin-proposal-class-properties',
    ]
  },
  js: {
    presets: [
      ['@babel/preset-env', {
        modules: false,
        loose: true,
        targets: {
          browsers: ['last 3 versions', 'safari >= 7']
        }
      }]
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]
  }
};

module.exports = (api) => {
  api.cache(true);

  const test = {
    presets: [
      ['@babel/preset-env', {
        loose: true,
        targets: {
          node: '6.9'
        }
      }]
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-async-to-generator',
      '@babel/plugin-proposal-object-rest-spread'
    ]
  };

  const defaultConfig = ES_CONFIGS[process.env.BUILD_TYPE] || ES_CONFIGS.js;

  return Object.assign({}, defaultConfig, {
    env: { test }
  });
};
