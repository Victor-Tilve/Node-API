import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/***/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  modulePathIgnorePatterns: ['./src/interfaces'],
  moduleDirectories: ['node_modules'],
  testMatch: ['**/*test.ts'],
  modulePaths: [
    '<rootDir>'
  ]
}

export default config
