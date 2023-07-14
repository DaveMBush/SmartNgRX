const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/{main.ts,test-setup.ts}',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};
