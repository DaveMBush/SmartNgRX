const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const eslintPluginJsdoc = require('eslint-plugin-jsdoc');
const nxEslintPlugin = require('@nx/eslint-plugin');
const eslintPluginSonarjs = require('eslint-plugin-sonarjs');
const eslintPluginImport = require('eslint-plugin-import');
const angularEslintEslintPlugin = require('@angular-eslint/eslint-plugin');
const eslintPluginEslintComments = require('eslint-plugin-eslint-comments');
const unicorn = require('eslint-plugin-unicorn');
const smarttoolsEslintPluginRxjs = require('@smarttools/eslint-plugin-rxjs');
const smarttoolsEslintPlugin = require('@smarttools/eslint-plugin');
const typescriptEslintEslintPlugin = require('@typescript-eslint/eslint-plugin');
const eslintPluginUnusedImports = require('eslint-plugin-unused-imports');
const ngrxEslintPlugin = require('@ngrx/eslint-plugin');
const eslintPluginMaxParamsNoConstructor = require('eslint-plugin-max-params-no-constructor');
const eslintPluginJest = require('eslint-plugin-jest');
const stylisticEslintPlugin = require('@stylistic/eslint-plugin');
const typescriptEslintParser = require('@typescript-eslint/parser');

// can't support function until NX eslint supports ESM or
// functional supports CommonJS OR I figure out how to get
// configs working with dynamic imports (async await import()
//const functional = require('eslint-plugin-functional');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    plugins: {
      jsdoc: eslintPluginJsdoc,
      '@nx': nxEslintPlugin,
      sonarjs: eslintPluginSonarjs,
      import: eslintPluginImport,
      //functional,
      '@angular-eslint/eslint-plugin': angularEslintEslintPlugin,
      'eslint-comments': eslintPluginEslintComments,
      unicorn,
      '@smarttools/rxjs': smarttoolsEslintPluginRxjs,
      '@smarttools': smarttoolsEslintPlugin,
      '@typescript-eslint': typescriptEslintEslintPlugin,
      'unused-imports': eslintPluginUnusedImports,
      '@ngrx': ngrxEslintPlugin,
      'max-params-no-constructor': eslintPluginMaxParamsNoConstructor,
      jest: eslintPluginJest,
      '@stylistic': stylisticEslintPlugin,
      //deprecation,
    },
  },
  { languageOptions: { parser: typescriptEslintParser } },
  {
    files: ['jest.config.ts'],
    rules: {
      'eslint-comments/no-restricted-disable': 'off',
      'eslint-comments/require-description': 'off',
      'unicorn/no-abusive-eslint-disable': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.base.json'],
      },
    },
  },
  ...compat
    .config({
      extends: ['plugin:@nx/typescript'],
      plugins: ['simple-import-sort'],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        ...config.rules,
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^\\u0000'],
              ['^@?\\w'],
              ['^(@smart)(/.*|$)'],
              ['^'],
              ['^\\.'],
            ],
          },
        ],
        'simple-import-sort/exports': 'error',
      },
    })),
  ...compat
    .config({
      extends: [
        'plugin:@nx/angular',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:sonarjs/recommended-legacy',
      ],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.ts'],
      rules: {
        ...config.rules,
        complexity: [
          'error',
          {
            max: 10,
          },
        ],
        'constructor-super': 'error',
        curly: 'error',
        'default-case': 'error',
        'eslint-comments/require-description': 'error',
        'eslint-comments/no-restricted-disable': [
          'error',
          'eslint-comments/no-restricted-disable',
          '@nx/enforce-module-boundaries',
          'no-console',
          '@angular-eslint/template/eqeqeq',
          '@angular-eslint/template/no-any',
          '@angular-eslint/template/no-negated-async',
          '@typescript-eslint/explicit-function-return-type',
          '@typescript-eslint/explicit-module-boundary-types',
          '@typescript-eslint/no-unsafe-argument',
          '@typescript-eslint/no-unsafe-assignment',
          '@typescript-eslint/no-unsafe-call',
          '@typescript-eslint/no-unsafe-member-access',
          '@typescript-eslint/no-unsafe-return',
          '@smarttools/rxjs/no-implicit-any-catch',
          'complexity',
          'max-depth',
          'max-lines',
          'max-lines-per-function',
          'max-classes-per-file',
          'max-statements',
          'max-statements-per-line',
          'max-nested-callbacks',
        ],
        eqeqeq: ['error', 'always'],
        'guard-for-in': 'error',
        'id-blacklist': [
          'warn',
          'any',
          'Number',
          'number',
          'String',
          'string',
          'Boolean',
          'boolean',
          'Undefined',
          'undefined',
        ],
        'id-match': 'off',
        'max-classes-per-file': ['error', 1],
        'max-depth': [
          'error',
          {
            max: 2,
          },
        ],
        'max-lines': [
          'error',
          {
            max: 300,
            skipBlankLines: true,
            skipComments: true,
          },
        ],
        'max-lines-per-function': [
          'error',
          {
            max: 50,
            skipBlankLines: true,
            skipComments: true,
          },
        ],
        'max-nested-callbacks': [
          'error',
          {
            max: 2,
          },
        ],
        'max-statements': ['error', 50],
        'max-statements-per-line': [
          'error',
          {
            max: 1,
          },
        ],
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-case-declarations': 'error',
        'no-console': 'error',
        'no-constant-condition': 'error',
        'no-else-return': [
          'error',
          {
            allowElseIf: false,
          },
        ],
        'no-empty': 'error',
        'no-eval': 'error',
        'no-extra-boolean-cast': 'error',
        'no-irregular-whitespace': 'error',
        'no-prototype-builtins': 'error',
        'no-new-wrappers': 'error',
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'ngx-bootstrap',
                message: 'Please use deep imports from ngx-bootstrap instead.',
              },
              {
                name: 'ngx-bootstrap/public_api',
                message: 'Please use deep imports from ngx-bootstrap instead.',
              },
              {
                name: 'moment',
                message: 'Please use moment-timezone instead.',
              },
              {
                name: '@angular/compiler',
                message:
                  'You should never need to import anything from this package',
              },
              {
                name: 'jest-preset-angular',
                message: 'Please use jest-preset-angular/setup-jest instead.',
              },
              {
                name: 'lodash',
                message: "Please don't use any form of lodash",
              },
              {
                name: 'lodash-es',
                message: "Please don't use any form of lodash",
              },
            ],
          },
        ],
        'no-restricted-syntax': [
          'error',
          {
            selector:
              'NewExpression Identifier[name="Promise"], CallExpression Identifier[name="firstValueFrom"], CallExpression Identifier[name="lastValueFrom"]',
            message: 'Prefer Observables over of Promises',
          },
        ],
        'no-shadow': 'off',
        'no-throw-literal': 'error',
        'no-undef-init': 'error',
        'no-underscore-dangle': 'error',
        'no-unreachable': 'error',
        'no-unreachable-loop': 'error',
        'no-unused-vars': 'off',
        'no-useless-escape': 'error',
        'object-shorthand': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-arrow-callback': 'off',
        radix: 'error',
        '@angular-eslint/component-class-suffix': 'error',
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: ['dmb', 'dmb'],
            style: 'kebab-case',
          },
        ],
        '@angular-eslint/contextual-decorator': 'error',
        '@angular-eslint/contextual-lifecycle': 'error',
        '@angular-eslint/directive-class-suffix': 'error',
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: ['dmb'],
            style: 'camelCase',
          },
        ],
        '@angular-eslint/no-attribute-decorator': 'error',
        '@angular-eslint/no-empty-lifecycle-method': 'error',
        '@angular-eslint/no-host-metadata-property': 'off',
        '@angular-eslint/no-input-rename': 'error',
        '@angular-eslint/no-lifecycle-call': 'error',
        '@angular-eslint/no-output-on-prefix': 'error',
        '@angular-eslint/no-output-rename': 'error',
        '@angular-eslint/no-pipe-impure': 'error',
        '@angular-eslint/no-queries-metadata-property': 'error',
        '@angular-eslint/pipe-prefix': [
          'error',
          {
            prefixes: ['dmb'],
          },
        ],
        '@angular-eslint/prefer-on-push-component-change-detection': 'error',
        '@angular-eslint/prefer-output-readonly': 'error',
        '@angular-eslint/use-component-view-encapsulation': 'error',
        '@angular-eslint/use-component-selector': 'error',
        '@angular-eslint/use-lifecycle-interface': 'error',
        '@angular-eslint/use-pipe-transform-interface': 'error',
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/ban-tslint-comment': 'error',
        '@typescript-eslint/no-empty-object-type': 'error',
        '@typescript-eslint/no-unsafe-function-type': 'error',
        '@typescript-eslint/no-wrapper-object-types': 'error',
        '@typescript-eslint/brace-style': 'off',
        '@typescript-eslint/consistent-indexed-object-style': 'error',
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/consistent-type-definitions': 'error',
        '@typescript-eslint/default-param-last': 'error',
        '@typescript-eslint/dot-notation': [
          'error',
          {
            allowIndexSignaturePropertyAccess: true,
          },
        ],
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
          },
        ],
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {
            accessibility: 'no-public',
          },
        ],
        '@typescript-eslint/member-ordering': [
          'error',
          {
            default: {
              memberTypes: [
                'public-static-field',
                'public-static-method',
                'protected-static-field',
                'protected-static-method',
                'private-static-field',
                'private-static-method',
                'public-constructor',
                'protected-constructor',
                'private-constructor',
                'public-instance-method',
                'protected-instance-method',
                'private-instance-method',
              ],
              order: 'as-written',
            },
          },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@stylistic/lines-between-class-members': [
          'error',
          'always',
          {
            exceptAfterSingleLine: true,
          },
        ],
        '@typescript-eslint/method-signature-style': ['error', 'method'],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: ['classMethod'],
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
          },
          {
            selector: 'classProperty',
            format: ['camelCase'],
          },
          {
            selector: 'enumMember',
            format: ['PascalCase'],
          },
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              regex: '^I[A-Z]',
              match: false,
            },
          },
          {
            selector: 'objectLiteralProperty',
            format: null,
          },
          {
            selector: 'parameter',
            custom: {
              regex: '^_*$|^[a-z0-9]{1,}([A-Z][a-z0-9]{0,}){0,}\\$?$',
              match: true,
            },
            format: null,
          },
          {
            selector: 'parameter',
            modifiers: ['destructured'],
            format: null,
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          {
            selector: 'typeProperty',
            format: ['camelCase'],
          },
          {
            selector: 'variable',
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'variable',
            modifiers: ['const'],
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'variable',
            modifiers: ['destructured'],
            format: null,
          },
        ],
        '@typescript-eslint/no-base-to-string': 'error',
        '@typescript-eslint/no-confusing-non-null-assertion': 'error',
        '@typescript-eslint/no-confusing-void-expression': [
          'error',
          {
            ignoreArrowShorthand: true,
          },
        ],
        '@typescript-eslint/no-dupe-class-members': 'error',
        '@typescript-eslint/no-dynamic-delete': 'error',
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-extra-non-null-assertion': 'error',
        '@typescript-eslint/no-extraneous-class': [
          'error',
          {
            allowWithDecorator: true,
          },
        ],
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-implied-eval': 'error',
        '@typescript-eslint/no-inferrable-types': [
          'error',
          {
            ignoreParameters: true,
          },
        ],
        '@typescript-eslint/no-invalid-this': 'error',
        '@typescript-eslint/no-invalid-void-type': 'error',
        '@typescript-eslint/no-loop-func': 'error',
        '@typescript-eslint/no-loss-of-precision': 'error',
        '@typescript-eslint/no-meaningless-void-operator': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-redeclare': 'error',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/no-type-alias': [
          'error',
          {
            allowAliases: 'always',
            allowCallbacks: 'always',
            allowGenerics: 'always',
            allowConstructors: 'always',
            allowConditionalTypes: 'always',
            allowTupleTypes: 'always',
          },
        ],
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unnecessary-qualifier': 'error',
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-unnecessary-type-constraint': 'error',
        '@typescript-eslint/no-unsafe-argument': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'error',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/no-unsafe-return': 'error',
        '@typescript-eslint/no-unused-expressions': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/non-nullable-type-assertion-style': 'error',
        '@stylistic/padding-line-between-statements': 'error',
        '@typescript-eslint/prefer-enum-initializers': 'error',
        '@typescript-eslint/prefer-for-of': 'off',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/prefer-literal-enum-member': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-reduce-type-parameter': 'error',
        '@typescript-eslint/prefer-regexp-exec': 'error',
        '@typescript-eslint/prefer-return-this-type': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/prefer-ts-expect-error': 'error',
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/require-array-sort-compare': [
          'error',
          {
            ignoreStringArrays: true,
          },
        ],
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/return-await': 'error',
        '@typescript-eslint/restrict-template-expressions': 'error',
        '@typescript-eslint/sort-type-constituents': 'error',
        '@typescript-eslint/strict-boolean-expressions': 'error',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/triple-slash-reference': 'error',
        '@typescript-eslint/typedef': 'error',
        '@typescript-eslint/unbound-method': [
          'error',
          {
            ignoreStatic: true,
          },
        ],
        '@typescript-eslint/unified-signatures': [
          'error',
          {
            ignoreDifferentlyNamedParameters: true,
          },
        ],
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],
        '@ngrx/avoid-combining-selectors': 'error',
        '@ngrx/avoid-cyclic-effects': 'error',
        '@ngrx/avoid-dispatching-multiple-actions-sequentially': 'off',
        '@ngrx/avoid-duplicate-actions-in-reducer': 'error',
        '@ngrx/avoid-mapping-selectors': 'error',
        '@ngrx/good-action-hygiene': 'error',
        '@ngrx/no-dispatch-in-effects': 'error',
        '@ngrx/no-effects-in-providers': 'error',
        '@ngrx/no-multiple-global-stores': 'error',
        '@ngrx/no-reducer-in-key-names': 'error',
        '@ngrx/no-store-subscription': 'error',
        '@ngrx/no-typed-global-store': 'error',
        '@ngrx/on-function-explicit-return-type': 'error',
        '@ngrx/prefer-action-creator': 'error',
        '@ngrx/prefer-action-creator-in-dispatch': 'error',
        '@ngrx/prefer-action-creator-in-of-type': 'error',
        '@ngrx/prefer-concat-latest-from': 'error',
        '@ngrx/prefer-effect-callback-in-block-statement': 'off',
        '@ngrx/prefer-inline-action-props': 'error',
        '@ngrx/prefer-one-generic-in-create-for-feature-selector': 'error',
        '@ngrx/prefix-selectors-with-select': 'error',
        '@ngrx/select-style': ['error', 'method'],
        '@ngrx/updater-explicit-return-type': 'error',
        '@ngrx/use-consistent-global-store-name': 'error',
        '@ngrx/use-effects-lifecycle-interface': 'error',
        '@smarttools/no-anonymous-functions': 'error',
        '@smarttools/one-exported-item-per-file': 'error',
        '@smarttools/rxjs/no-finnish': 'error',
        '@smarttools/rxjs/no-async-subscribe': 'error',
        '@smarttools/rxjs/no-compat': 'error',
        '@smarttools/rxjs/no-create': 'error',
        '@smarttools/rxjs/no-exposed-subjects': 'error',
        '@smarttools/rxjs/no-ignored-notifier': 'error',
        '@smarttools/rxjs/no-ignored-replay-buffer': 'error',
        '@smarttools/rxjs/no-ignored-takewhile-value': 'error',
        '@smarttools/rxjs/no-implicit-any-catch': 'error',
        '@smarttools/rxjs/no-index': 'error',
        '@smarttools/rxjs/no-internal': 'error',
        '@smarttools/rxjs/no-nested-subscribe': 'error',
        '@smarttools/rxjs/no-redundant-notify': 'error',
        '@smarttools/rxjs/no-sharereplay': [
          'error',
          {
            allowConfig: true,
          },
        ],
        '@smarttools/rxjs/no-subject-unsubscribe': 'error',
        '@smarttools/rxjs/no-subject-value': 'error',
        '@smarttools/rxjs/no-topromise': 'error',
        '@smarttools/rxjs/no-unbound-methods': 'error',
        '@smarttools/rxjs/no-unsafe-catch': 'error',
        '@smarttools/rxjs/no-unsafe-first': 'error',
        '@smarttools/rxjs/no-unsafe-subject-next': 'error',
        '@smarttools/rxjs/no-unsafe-switchmap': 'error',
        '@smarttools/rxjs/no-unsafe-takeuntil': 'error',
        '@smarttools/rxjs/prefer-observer': 'error',
        'unicorn/filename-case': 'error',
        'unicorn/no-abusive-eslint-disable': 'error',
        'import/no-duplicates': ['error'],
        '@typescript-eslint/no-deprecated': 'error',
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
        'max-params-no-constructor/max-params-no-constructor': [
          'error',
          {
            max: 4,
          },
        ],
        'sonarjs/cognitive-complexity': 'error',
        'sonarjs/max-switch-cases': 'error',
        'sonarjs/no-all-duplicated-branches': 'error',
        'sonarjs/no-collapsible-if': 'error',
        'sonarjs/no-duplicated-branches': 'error',
        'sonarjs/no-duplicate-string': 'error',
        'sonarjs/no-element-overwrite': 'error',
        'sonarjs/no-identical-expressions': 'error',
        'sonarjs/no-identical-functions': 'error',
        'sonarjs/no-ignored-return': 'error',
        'sonarjs/no-gratuitous-expressions': 'error',
        'sonarjs/no-nested-switch': 'error',
        'sonarjs/no-nested-template-literals': 'error',
        'sonarjs/no-one-iteration-loop': 'error',
        'sonarjs/no-redundant-boolean': 'error',
        'sonarjs/no-redundant-jump': 'error',
        'sonarjs/no-small-switch': 'off',
        'sonarjs/no-use-of-empty-return-value': 'error',
        'sonarjs/prefer-single-boolean-return': 'error',
        'sonarjs/different-types-comparison': 'off',
        'sonarjs/no-dead-store': 'off',
        'sonarjs/prefer-for-of': 'off',
      },
    })),
  {
    files: ['**/*.reducer.ts'],
    rules: {
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      // 'functional/immutable-data': [
      //   'error',
      //   {
      //     ignoreImmediateMutation: true,
      //     ignoreAccessorPattern: 'this.*',
      //   },
      // ],
      // 'functional/no-let': [
      //   'error',
      //   {
      //     allowInFunctions: true,
      //   },
      // ],
      // 'functional/no-loop-statements': 'error',
    },
  },
  {
    files: ['reducer.factory.ts'],
    rules: {
      'max-lines-per-function': 'off',
    },
  },
  ...compat
    .config({
      extends: ['plugin:@nx/angular-template'],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.html'],
      rules: {
        ...config.rules,
        '@angular-eslint/template/alt-text': 'error',
        '@angular-eslint/template/elements-content': 'error',
        '@angular-eslint/template/label-has-associated-control': ['error', {}],
        '@angular-eslint/template/table-scope': 'error',
        '@angular-eslint/template/valid-aria': 'error',
        '@angular-eslint/template/banana-in-box': 'error',
        '@angular-eslint/template/click-events-have-key-events': 'error',
        '@angular-eslint/template/conditional-complexity': 'error',
        '@angular-eslint/template/cyclomatic-complexity': 'error',
        '@angular-eslint/template/eqeqeq': [
          'error',
          {
            allowNullOrUndefined: true,
          },
        ],
        '@angular-eslint/template/mouse-events-have-key-events': 'error',
        '@angular-eslint/template/no-any': 'error',
        '@angular-eslint/template/no-autofocus': 'error',
        '@angular-eslint/template/no-call-expression': 'warn',
        '@angular-eslint/template/no-distracting-elements': 'error',
        '@angular-eslint/template/no-negated-async': 'error',
        '@angular-eslint/template/no-positive-tabindex': 'error',
        '@angular-eslint/template/use-track-by-function': 'error',
        '@angular-eslint/template/no-duplicate-attributes': [
          'error',
          {
            allowTwoWayDataBinding: true,
          },
        ],
      },
    })),
  ...compat
    .config({
      extends: ['plugin:@nx/javascript'],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.js', '**/*.jsx'],
      rules: {
        ...config.rules,
      },
    })),
  ...compat
    .config({
      extends: ['plugin:jest/recommended'],
      plugins: ['jest'],
      env: {
        jest: true,
      },
    })
    .map((config) => ({
      ...config,
      files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.spec.js', '**/*.spec.jsx'],
      rules: {
        ...config.rules,
        '@smarttools/no-anonymous-functions': 'off',
        '@smarttools/one-exported-item-per-file': 'off',
        'no-restricted-syntax': 'off',
        'max-lines': 'off',
        'max-lines-per-function': 'off',
        'max-nested-callbacks': 'off',
        'sonarjs/no-nested-functions': 'off',
        'sonarjs/function-return-type': 'off',
        'max-classes-per-file': 'off',
        'jest/expect-expect': [
          'error',
          {
            assertFunctionNames: [
              'expect',
              'expectObservable',
              'expectSubscriptions',
            ],
          },
        ],
      },
    })),
];
