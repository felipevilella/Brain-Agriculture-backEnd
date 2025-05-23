import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import sonarjs from 'eslint-plugin-sonarjs'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import importHelpers from 'eslint-plugin-import-helpers'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'sonarjs': sonarjs,
      'simple-import-sort': simpleImportSort,
      'import-helpers': importHelpers,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        jest: true,
      },
    },
    rules: {
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'error',
      'sonarjs/cognitive-complexity': 'error',
      'sonarjs/no-identical-expressions': 'error',
      'no-useless-constructor': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      'no-throw-literal': 'error',
      'lines-between-class-members': 'warn',
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            '/^node/',
            'module',
            '/^~\\//',
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: {
            order: 'asc',
            ignoreCase: true,
          },
        },
      ],
    },
  },
  prettier,
]
