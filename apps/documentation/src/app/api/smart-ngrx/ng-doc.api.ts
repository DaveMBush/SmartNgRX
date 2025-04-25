import { NgDocApi } from '@ng-doc/core';
import APICategory from '../ng-doc.category';

const api: NgDocApi = {
  title: 'Smart NgRX API',
  category: APICategory,
  route: 'smart-ngrx-api',
  order: 1,
  scopes: [
    {
      name: 'Smart NgRX API',
      route: 'smart-ngrx-api',
      include: ['libs/smart-ngrx/src/index.ts'],
    },
  ],
};

export default api;
