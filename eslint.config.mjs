// eslint.config.mjs
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import nextPlugin from '@next/eslint-plugin-next';
import { flatConfigs as eslintPluginImport } from 'eslint-plugin-import';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config({
      ignores: [
        '.next/**',
        'node_modules/**',
        'dist/**',
        'build/**',
        'coverage/**',
        '*.config.{js,mjs,cjs,ts}',
        'global.d.ts',
      ],
    },

    pluginJs.configs.recommended,

    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,

    pluginReact.configs.flat.recommended,

    eslintPluginPrettierRecommended,

    eslintPluginImport.recommended,

    {
      files: ['**/*.{ts,tsx}'],

      plugins: {
        '@next/next': nextPlugin,
        prettier: eslintPluginPrettierRecommended.plugins.prettier,
        'react-hooks': eslintPluginReactHooks,
      },

      rules: {
        ...nextPlugin.configs.recommended.rules,
        ...nextPlugin.configs['core-web-vitals'].rules,

        'prettier/prettier': 'error',

        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
        'react/prop-types': 'off',
        'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',

        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'warn',
        '@typescript-eslint/require-await': 'warn',

        '@typescript-eslint/explicit-member-accessibility': 'off',


        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-debugger': 'warn',
        'no-unused-vars': 'off',
        eqeqeq: ['error', 'always'],
        'no-else-return': ['error', { allowElseIf: false }],
        'consistent-return': 'error',

        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'object',
              'type',
            ],
            pathGroups: [
              {
                pattern: '@/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '*.{css,scss,less}',
                group: 'unknown',
                position: 'after',
              },
            ],
            pathGroupsExcludedImportTypes: ['builtin', 'type'],
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true },
          },
        ],
        'import/no-unresolved': 'error',
      },

      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.node,
        },
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      },

      settings: {
        react: {
          version: 'detect',
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: './tsconfig.json',
          },
        },
      },
    }
);
