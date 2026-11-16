const config = require('@casl/dx/config/jest.config');

module.exports = {
  ...config,
  testMatch: ['<rootDir>/spec/**/*.spec.mjs'],
  transform: {},
};
