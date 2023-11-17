const config = require('@casl/dx/config/jest.config');

module.exports = {
  ...config,
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
  },
  testEnvironment: "jsdom",
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: [
    'zone.js',
    'zone.js/testing'
  ],
};
