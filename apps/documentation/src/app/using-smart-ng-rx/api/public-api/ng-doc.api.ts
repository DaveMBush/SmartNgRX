import { NgDocApi } from '@ng-doc/core';
import APICategory from '../ng-doc.category';

const api: NgDocApi = {
  title: 'Public API',
  category: APICategory,
  route: 'public-api',
  order: 1,
  scopes: [
    {
      name: 'Public API',
      route: 'public-api',
      include: ['libs/smart-ngrx/src/index.ts'],
      exclude: [
        'libs/smart-ngrx/src/**/*.spec.ts',
        'libs/smart-ngrx/src/ngrx-internals/**/*',
      ],
    },
  ],
};

export default api;
