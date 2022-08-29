const tsconfig = require('./tsconfig.json');

// eslint-disable-next-line import/order
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig);

module.exports = {
  rootDir: process.cwd(),
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testRegex: ['.test.ts$'],
  moduleNameMapper,
  moduleFileExtensions: ['ts', 'js'],
};
