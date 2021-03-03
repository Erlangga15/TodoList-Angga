module.exports = {
  collectCoverageFrom: ['<rootDir>/service/todo.service.js'],
  testRegex: '(/__tests_/.*|\\.(spec))\\.(js)$',
  testPathIgnorePatterns: [
    '<rootDir>/web/src/e2e-test-unused/',
    '<rootDir>/web/src/unit-test-unused/',
    '<rootDir>/node_modules/',
  ],
  coverageReporters: ['html', 'text-summary'],
  coverageDirectory: '<rootDir>/service/test/coverage',
};
