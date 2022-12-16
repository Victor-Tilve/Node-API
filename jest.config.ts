export default {
  roots: ['./src'],
  collectCoverageFrom: ['./src/**/*.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  modulePaths: [
    '<rootDir>',
    '<rootDir>/__mocks__/src/repositories/user/'
  ]
}
