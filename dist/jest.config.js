const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');
module.exports = {
    rootDir: '.',
    moduleFileExtensions: ['js', 'json', 'ts'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
    }),
    testRegex: '.spec.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    coverageDirectory: './coverage',
    testEnvironment: 'node',
};
//# sourceMappingURL=jest.config.js.map