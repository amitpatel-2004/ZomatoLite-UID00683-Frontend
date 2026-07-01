import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import js from '@eslint/js';

export default defineConfig([
  {
    ignores: ['dist', 'node_modules'],
  },
  js.configs.recommended,
  ...tseslint.configs.strict,
  reactHooks.configs.flat.recommended,
  { ...pluginJsxA11y.flatConfigs.recommended, files: ['**/*.tsx'] },

  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: '18.3',
      },
    },
  },

  {
    files: ['**/*.tsx'],
    plugins: {
      react: pluginReact,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs['jsx-runtime'].rules,
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
    },
  },

  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'simple-import-sort': pluginSimpleImportSort,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-duplicate-imports': ['error', { allowSeparateTypeImports: true }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-shadow': 'error',
      'arrow-body-style': ['error', 'always'],

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react$', '^react-dom'],
            ['^\\w'],
            ['^antd'],
            [
              '^@(?:|appTypes|assets|components|constants|containers|core|hooks|layout|pages|routes|styles|theme|utils)',
            ],
            ['^\\./', '^\\.\\./'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: ['typeLike', 'enumMember'],
          format: ['PascalCase'],
        },
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'import',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'objectLiteralProperty',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'objectLiteralProperty',
          modifiers: ['requiresQuotes'],
          format: null,
        },
      ],
    },
  },

  {
    files: ['webpack.config.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  eslintConfigPrettier,
]);
