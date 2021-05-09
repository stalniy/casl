const config = require('@casl/dx/config/jest.config');

module.exports = {
  ...config,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    '@abraham/reflection',
    'zone.js/dist/zone',
    'zone.js/dist/zone-testing'
  ],
};
