module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native' +
      '|@react-native' +
      '|@react-native/js-polyfills' +
      '|expo' +
      '|expo-modules-core' +
      '|@react-navigation' +
      '|expo-router' +
      '|@expo' +
      '|expo-linear-gradient)',
  ],
};
