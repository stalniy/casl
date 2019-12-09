module.exports = {
  collectCoverage: !!process.env.WITH_COVERAGE,
  rootDir: process.cwd(),
  coverageDirectory: './coverage',
  coverageReporters: [
    'lcov',
    'text'
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx}'
  ],
  testMatch: [
    '<rootDir>/spec/*.spec.js'
  ],
  transform: {
    '^.+\\.jsx?$': `${__dirname}/jest.babel.js`
  },
  setupFilesAfterEnv: [
    `${__dirname}/spec_helper.js`
  ],
  globals: {
    window: {}
  }
};
