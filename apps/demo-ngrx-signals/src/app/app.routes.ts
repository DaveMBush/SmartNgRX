import { Type } from '@angular/core';
import { Routes } from '@angular/router';
import { provideSmartFeatureSignalEntities } from '@smarttools/smart-signals';

import { standardSignalsDepartmentsDefinition } from './routes/tree-standard/store/department/standard-signals-departments-definition';
import { standardSignalsDepartmentChildrenDefinition } from './routes/tree-standard/store/department-children/standard-signals-department-children-definition';
import { standardSignalsLocationsDefinition } from './routes/tree-standard/store/locations/standard-signals-locations-definition';
import { standardSignalsTopDefinition } from './routes/tree-standard/store/top/standard-signals-top-definition.const';

// This ensure we have one key per SharedState property

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: async function homeRoute(): Promise<Type<unknown>> {
      return (await import('./routes/home/home.component')).HomeComponent;
    },
  },
  {
    path: 'tree',
    loadComponent: async function treeRoute(): Promise<Type<unknown>> {
      return (await import('./routes/tree-standard/tree.component'))
        .TreeComponent;
    },
    providers: [
      //currentLocationSignalStore,
      provideSmartFeatureSignalEntities('tree-standard', [
        standardSignalsTopDefinition,
        standardSignalsLocationsDefinition,
        standardSignalsDepartmentsDefinition,
        standardSignalsDepartmentChildrenDefinition,
      ]),
    ],
  },
];
