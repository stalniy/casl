const config = require('../../tools/jest.config');

module.exports = {
  ...config,
  setupFilesAfterEnv: config.setupFilesAfterEnv.concat(
    '@abraham/reflection',
    'zone.js/dist/zone',
    'zone.js/dist/zone-testing'
  ),
};
