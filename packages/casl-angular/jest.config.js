const config = require('../../tools/jest.config');

module.exports = {
  ...config,
  setupFilesAfterEnv: config.setupFilesAfterEnv.concat(
    '@abraham/reflection'
  ),
};
