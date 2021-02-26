module.exports = {
  collectCoverageFrom: ['<rootDir>/web/src/reducer.js'],
  testRegex: '(/__tests_/.*|\\.(spec))\\.(js)$',
  coverageReporters: ['html', 'text-summary'],
  coverageDirectory: '<rootDir>/web/test/coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
};
