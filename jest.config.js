module.exports = {
  collectCoverageFrom: ['<rootDir>/web/src/reducer.js'],
  testRegex: '(/__tests_/.*|\\.(spec))\\.(js)$',
  testPathIgnorePatterns: [
    '<rootDir>/web/src/e2e-test/',
    '<rootDir>/node_modules/',
  ],
  coverageReporters: ['html', 'text-summary'],
  coverageDirectory: '<rootDir>/web/src/unit-test/coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
};
