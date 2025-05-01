import { NgDocApi } from '@ng-doc/core';
import APICategory from '../ng-doc.category';

const api: NgDocApi = {
  title: 'Internal API',
  category: APICategory,
  route: 'internal-api',
  order: 3,
  scopes: [
    {
      name: 'Internal API',
      route: 'internal-api',
      include: [
        'libs/smart-ngrx/src/**/*.ts',
        'libs/smart-signals/src/**/*.ts',
        'libs/smart-core/src/**/*.ts',
      ],
      exclude: [
        'libs/smart-ngrx/src/index.ts',
        'libs/smart-ngrx/src/**/*.spec.ts',
        'libs/smart-signals/src/index.ts',
        'libs/smart-signals/src/**/*.spec.ts',
        'libs/smart-core/src/**/*.spec.ts',
      ],
    },
  ],
};

export default api;
