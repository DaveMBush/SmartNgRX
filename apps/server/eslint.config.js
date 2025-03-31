const baseConfigPromise = import('../../eslint.config.js');

module.exports = (async () => {
  const baseConfig = await baseConfigPromise;
  return [
    ...(await baseConfig.default),
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
      rules: {
        '@smarttools/no-anonymous-functions': 'off',
      },
      languageOptions: {
        parserOptions: {
          project: ['./tsconfig.*.json'],
        },
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      // Override or add rules here
      rules: {},
    },
    {
      files: ['**/*.js', '**/*.jsx'],
      // Override or add rules here
      rules: {},
    },
  ];
})();
