const angular = require('angular-eslint');
const jsdoc = require('eslint-plugin-jsdoc');
const nxEslintPlugin = require('@nx/eslint-plugin');
const playwright = require('eslint-plugin-playwright');
const baseConfigPromise = import('../../eslint.config.js');

module.exports = (async () => {
  const baseConfig = await baseConfigPromise;
  return [
    ...(await baseConfig.default),
    { files: ['**/*.ts'], processor: angular.processInlineTemplates },
    ...nxEslintPlugin.configs['flat/angular'].map((config) => ({
      ...config,
      files: ['**/*.ts'],
      rules: {
        ...config.rules,
        ...playwright.configs['flat/recommended'].rules,
        'jsdoc/require-description': 'error',
        'jsdoc/tag-lines': [
          'error',
          'any',
          {
            startLines: 1,
          },
        ],
        'jsdoc/require-param-type': 'off',
        'jsdoc/require-returns-type': 'off',
        'jsdoc/require-param': 'error',
        'jsdoc/require-returns': 'error',
        'jsdoc/require-hyphen-before-param-description': ['error', 'never'],
        'jsdoc/require-jsdoc': [
          'error',
          {
            publicOnly: true,
            require: {
              FunctionDeclaration: true,
              MethodDefinition: true,
              ClassDeclaration: true,
              ArrowFunctionExpression: true,
              FunctionExpression: true,
            },
          },
        ],
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
      languageOptions: {
        parserOptions: {
          project: ['./tsconfig.*.json'],
        },
      },
    })),
    jsdoc.configs['flat/recommended-typescript-error'],
    ...nxEslintPlugin.configs['flat/angular-template'].map((config) => ({
      ...config,
      files: ['**/*.html'],
      rules: {
        ...config.rules,
      },
    })),
    {
      files: ['**/*.ts'],
      rules: {
        '@angular-eslint/prefer-standalone': 'off',
      },
    },
  ];
})();
