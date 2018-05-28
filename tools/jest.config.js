module.exports = {
  collectCoverage: !!process.env.WITH_COVERAGE,
  "rootDir": process.cwd(),
  "coverageDirectory": "./coverage",
  "coverageReporters": [
    "lcov",
    "text"
  ],
  "collectCoverageFrom": [
    "<rootDir>/src/**/*.{js,jsx}"
  ],
  "testMatch": [
    "<rootDir>/spec/*.spec.js"
  ],
  "transform": {
    "^.+\\.jsx?$": "babel-jest"
  },
  "setupTestFrameworkScriptFile": `${__dirname}/spec_helper.js`
}
