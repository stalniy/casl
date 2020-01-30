module.exports = {
  collectCoverage: !!process.env.WITH_COVERAGE,
  rootDir: process.cwd(),
  coverageDirectory: './coverage',
  coverageReporters: [
    'lcov',
    'text'
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,js,jsx}'
  ],
  testMatch: [
    '<rootDir>/spec/*.spec.js'
  ],
  transform: {
    '^.+\\.[t|j]sx?$': `${__dirname}/jest.babel.js`
  },
  setupFilesAfterEnv: [
    `${__dirname}/spec_helper.js`
  ],
};
