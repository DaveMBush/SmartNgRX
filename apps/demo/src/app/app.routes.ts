import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'tree',
    pathMatch: 'full',
  },
  {
    path: 'tree',
    loadComponent: async () =>
      (await import('./routes/tree/tree.component')).TreeComponent,
  },
  {
    path: 'memlab',
    loadComponent: async () =>
      (await import('./routes/memlab/memlab.component')).MemlabComponent,
  },
];
