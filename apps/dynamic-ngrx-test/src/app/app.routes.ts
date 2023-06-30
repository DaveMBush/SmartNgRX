import { InjectionToken } from '@angular/core';
import { Route } from '@angular/router';

import { provideSlice } from '@davembush/dynamic-ngrx';

import { TodoService } from './state/todo.service';

const todoService = new InjectionToken<TodoService>('todoService');

export const appRoutes: Route[] = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'list',
},{
  path: 'list',
  loadComponent: async () => import('./list/list.component').then(m => m.ListComponent),
  providers: [
    { provide: todoService, useClass: TodoService},
    provideSlice('list','todo', todoService ),
  ]
}];