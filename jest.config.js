import { createRequire } from 'node:module';

import { pathsToModuleNameMapper } from 'ts-jest';

const requireJson = createRequire(import.meta.url);
const tsconfig = requireJson('./tsconfig.json');

const { compilerOptions } = tsconfig;

export default {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
      prefix: '<rootDir>/',
    }),
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
