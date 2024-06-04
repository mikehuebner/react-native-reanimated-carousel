import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import';
import jestEslint from 'eslint-plugin-jest';
import eslintPluginReactNative from 'eslint-plugin-react-native';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

const __dirname = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
});

export default tseslint.config(
  ...tseslint.configs.recommended,
  ...compat.extends('plugin:react-hooks/recommended'),
  {
    plugins: {
      'jest': jestEslint,
      'import': eslintPluginImport,
      'react-refresh': reactRefresh,
      'react-native': eslintPluginReactNative,
    },
  },
  { ignores: ['**/lib', 'node_modules'] },
  {
    settings: {
      'react': { version: 'detect' },
      'import/external-module-folders': ['node_modules'],
      'import/ignore': ['node_modules/react-native/index\\.js$'],
      'import/parsers': {
        espree: ['.js', '.cjs', '.mjs', '.jsx'],
      },
      'import/resolver': { typescript: true, node: true },
    },
  },
  {
    rules: {
      // To ensure we don't miss a dependency when using reanimated hooks
      'react-hooks/exhaustive-deps': [
        'warn',
        {
          additionalHooks: '(useAnimatedStyle|useDerivedValue|useAnimatedProps)',
        },
      ],
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'error',
      'import/order': [
        'error',
        {
          'pathGroupsExcludedImportTypes': ['builtin', 'object'],
          'newlines-between': 'always',
          'alphabetize': {
            order: 'asc',
            caseInsensitive: true,
          },
          'groups': ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'object', 'type'],
          'pathGroups': [
            {
              pattern: '{react,react/*,react-dom,react-dom/*,react-native}',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '{next,next**/**}',
              group: 'builtin',
              position: 'after',
            },
            {
              pattern: '{react**,react-**/**}',
              group: 'builtin',
              position: 'after',
            },
          ],
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: true,
        },
      ],
    },
  },
);
