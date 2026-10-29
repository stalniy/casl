const tsJest = ['ts-jest', { compiler: require.resolve('typescript') }];

module.exports = {
  rootDir: process.cwd(),
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  coverageReporters: [
    'lcov',
    'text'
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,js}'
  ],
  testMatch: [
    '<rootDir>/spec/**/*.spec.{ts,tsx,js}'
  ],
  transform: {
    '^.+\\.[t|j]sx?$': tsJest,
    '^.+\\.m?js$': tsJest,
  },
};
