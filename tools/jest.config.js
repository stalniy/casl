module.exports = {
  collectCoverage: !!process.env.WITH_COVERAGE,
  rootDir: process.cwd(),
  coverageDirectory: './coverage',
  coverageReporters: [
    'lcov',
    'text'
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,js}'
  ],
  testMatch: [
    '<rootDir>/spec/**/*.spec.{ts,js}'
  ],
  transform: {
    '^.+\\.[t|j]sx?$': 'ts-jest'
  },
  setupFilesAfterEnv: [
    `${__dirname}/spec_helper.js`
  ],
};
