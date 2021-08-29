// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of file extensions your modules use
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],

  // Serializers for snapshot testing
  snapshotSerializers: ['@emotion/jest/serializer'],

  // The pattern Jest uses to detect test files
  testRegex: '(/__tests__/.*|(.|/)(test|spec)).(ts|tsx|js)$',

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};
