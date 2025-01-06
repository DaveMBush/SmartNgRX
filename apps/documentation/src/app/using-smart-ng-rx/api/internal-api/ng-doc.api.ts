import { NgDocApi } from '@ng-doc/core';
import APICategory from '../ng-doc.category';

const api: NgDocApi = {
  title: 'Internal API',
  category: APICategory,
  route: 'internal-api',
  order: 2,
  scopes: [
    {
      name: 'Internal API',
      route: 'internal-api',
      include: ['libs/smart-ngrx/src/**/*.ts'],
      exclude: [
        'libs/smart-ngrx/src/index.ts',
        'libs/smart-ngrx/src/**/*.spec.ts',
      ],
    },
  ],
};

export default api;
