import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  verbose: true,
  testPathIgnorePatterns: ['dist'],
  collectCoverage: true,
  coverageDirectory: 'backend/test-coverage',
  collectCoverageFrom: ['backend/controllers/*.ts', 'backend/routes/*.ts'],
  testEnvironment: 'node',
};

export default config;
