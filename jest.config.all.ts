import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  roots: ['<rootDir>/src', '<rootDir>'],
  collectCoverageFrom: ['<rootDir>/src/***/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  modulePathIgnorePatterns: ['./src/interfaces'],
  moduleDirectories: ['node_modules'],
  testMatch: ['**/*spec.ts', '**/*test.ts'],
  modulePaths: [
    '<rootDir>',
    '<rootDir>/__mocks__/src/repositories/user/'
  ]
}

export default config
