const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  setupFilesAfterEnv: [
    `${__dirname}/../lib/spec_helper.js`
  ],
};
