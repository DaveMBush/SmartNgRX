import { NgDocApi } from '@ng-doc/core';

const Api: NgDocApi = {
  title: 'API',
  scopes: [
    {
      name: 'dynamic-ngrx',
      route: 'dynamic-ngrx',
      include: ['libs/dynamic-ngrx/src/**/*.ts'],
      exclude: [
        'libs/dynamic-ngrx/src/**/*.spec.ts',
        'libs/dynamic-ngrx/src/ngrx-internals/**/*',
      ],
    },
  ],
};

export default Api;
