import { Route } from '@angular/router';
import { TodoService } from './state/todo.service';
import { InjectionToken } from '@angular/core';
import { provideSlice } from '@davembush/dynamic-ngrx';

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
