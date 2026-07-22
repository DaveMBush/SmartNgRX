const angular = require('angular-eslint');
const playwright = require('eslint-plugin-playwright');
const baseConfigPromise = import('../../eslint.config.js');
module.exports = (async () => {
  const baseConfig = await baseConfigPromise;
  return [
    ...(await baseConfig.default),
    { files: ['**/*.ts'], processor: angular.processInlineTemplates },
    ...require('@nx/eslint-plugin').configs['flat/angular'].map((config) => ({
      ...config,
      files: ['**/*.ts'],
      rules: {
        ...(config.rules ?? {}),
      },
      languageOptions: {
        parserOptions: {
          project: ['./tsconfig.*.json'],
        },
      },
    })),
    ...require('@nx/eslint-plugin').configs['flat/angular-template'].map(
      (config) => ({
        ...config,
        files: ['**/*.html'],
        rules: {
          ...(config.rules ?? {}),
        },
      }),
    ),
    {
      files: ['**/*.ts'],
      rules: {
        '@angular-eslint/prefer-standalone': 'off',
      },
    },
    {
      files: ['**/src/app/error-handler/error-handler.service.ts'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['**/*.test.ts'],
      rules: {
        ...playwright.configs['flat/recommended'].rules,
      },
    },
  ];
})();
