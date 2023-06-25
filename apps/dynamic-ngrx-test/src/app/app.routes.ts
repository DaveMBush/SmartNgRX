import { Route } from '@angular/router';
import { TodoService } from './state/todo.service';
import { InjectionToken, inject } from '@angular/core';
import { provideSlice } from './state/functions/provide-slice.function';

const todoService = new InjectionToken<TodoService>('todoService');

export const appRoutes: Route[] = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'list',
},{
  path: 'list',
  loadComponent: () => import('./list/list.component').then(m => m.ListComponent),
  providers: [
    { provide: todoService, useClass: TodoService},
    provideSlice('list','todo', todoService ),
  ]
}];
