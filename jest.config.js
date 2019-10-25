module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx', 'node', 'graphql'],
  roots: [
    '<rootDir>/source'
  ],
  preset: 'ts-jest',
  setupFiles: ['dotenv/config'],
  transform: {
    '\\.graphql$': 'jest-transform-graphql',
    '\\.spec.ts?$': 'ts-jest'
  },
};
