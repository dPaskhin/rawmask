module.exports = {
  rootDir: process.cwd(),
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testRegex: ['.test.ts$'],
  moduleNameMapper: {
    '^rawmask$': `${__dirname}/packages/rawmask/src/main`,
    '^@rawmask/react$': `${__dirname}/packages/react-rawmask/src/main`,
  },
  moduleFileExtensions: ['ts', 'js'],
};
