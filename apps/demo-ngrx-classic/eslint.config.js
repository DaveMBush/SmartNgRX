const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const baseConfigPromise = import('../../eslint.config.js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});
module.exports = (async () => {
  const baseConfig = await baseConfigPromise;
  return [
    ...(await baseConfig.default),
    ...compat
      .config({
        extends: [
          'plugin:@nx/angular',
          'plugin:@angular-eslint/template/process-inline-templates',
        ],
      })
      .map((config) => ({
        ...config,
        files: ['**/*.ts'],
        rules: {
          ...config.rules,
        },
        languageOptions: {
          parserOptions: {
            project: ['./tsconfig.*.json'],
          },
        },
      })),
    ...compat
      .config({
        extends: ['plugin:@nx/angular-template'],
      })
      .map((config) => ({
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
    {
      files: ['**/src/app/error-handler/error-handler.service.ts'],
      rules: {
        'no-console': 'off',
      },
    },
  ];
})();
