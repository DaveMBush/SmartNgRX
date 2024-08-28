import { NgDocApi } from '@ng-doc/core';

const api: NgDocApi = {
  title: 'API',
  scopes: [
    {
      name: 'smart-ngrx',
      route: 'smart-ngrx',
      include: ['libs/smart-ngrx/src/**/*.ts'],
      exclude: [
        'libs/smart-ngrx/src/**/*.spec.ts',
        'libs/smart-ngrx/src/ngrx-internals/**/*',
      ],
    },
  ],
};

export default api;
