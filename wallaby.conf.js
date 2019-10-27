module.exports = function (wallaby) {
  require('dotenv').config();
  return {
    files: [
      'tsconfig.json',
      'source/**/*.ts',
      'source/**/*.graphql',
      '!source/**/*.spec.ts'
    ],
    tests: [
      'source/**/*.spec.ts'
    ],
    env: {
      type: 'node',
    },
    testFramework: 'jest',
    debug: true,
    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript({
        module: 'commonjs'
      })
    },
  }
};
