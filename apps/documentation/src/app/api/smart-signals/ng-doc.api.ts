import { NgDocApi } from '@ng-doc/core';
import APICategory from '../ng-doc.category';

const api: NgDocApi = {
  title: 'Smart Signals API',
  category: APICategory,
  route: 'smart-signals-api',
  order: 2,
  scopes: [
    {
      name: 'Smart Signals API',
      route: 'smart-signals-api',
      include: ['libs/smart-signals/src/index.ts'],
    },
  ],
};

export default api;
