module.exports = {
  roots: ['<rootDir>/packages'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js', 'jsx', 'json', 'node'],
  collectCoverage: false,
  verbose: true,
  snapshotSerializers: ['jest-serializer-path'],
  // projects: ['<rootDir>/packages/*/jest.config.js'],
  coverageDirectory: '<rootDir>/coverage/'
}
