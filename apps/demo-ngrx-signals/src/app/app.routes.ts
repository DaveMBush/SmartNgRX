import { Type } from '@angular/core';
import { Routes } from '@angular/router';
import { provideSmartFeatureSignalEntities } from '@smarttools/smart-signals';

import { noDirtySignalsDepartmentsDefinition } from './routes/tree-no-dirty/store/department/no-dirty-signals-departments-definition';
import { noDirtySignalsDepartmentChildrenDefinition } from './routes/tree-no-dirty/store/department-children/no-dirty-signals-department-children-definition';
import { noDirtySignalsLocationsDefinition } from './routes/tree-no-dirty/store/locations/no-dirty-signals-locations-definition';
import { noDirtySignalsTopDefinition } from './routes/tree-no-dirty/store/top/no-dirty-signals-top-definition.const';
import { noRefreshSignalsDepartmentsDefinition } from './routes/tree-no-refresh/store/department/no-refresh-signals-departments-definition';
import { noRefreshSignalsDepartmentChildrenDefinition } from './routes/tree-no-refresh/store/department-children/no-refresh-signals-department-children-definition';
import { noRefreshSignalsLocationsDefinition } from './routes/tree-no-refresh/store/locations/no-refresh-signals-locations-definition';
import { noRefreshSignalsTopDefinition } from './routes/tree-no-refresh/store/top/no-refresh-signals-top-definition.const';
import { noRemoveSignalsDepartmentsDefinition } from './routes/tree-no-remove/store/department/no-remove-signals-departments-definition';
import { noRemoveSignalsDepartmentChildrenDefinition } from './routes/tree-no-remove/store/department-children/no-remove-signals-department-children-definition';
import { noRemoveSignalsLocationsDefinition } from './routes/tree-no-remove/store/locations/no-remove-signals-locations-definition';
import { noRemoveSignalsTopDefinition } from './routes/tree-no-remove/store/top/no-remove-signals-top-definition.const';
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
  {
    path: 'treeNoRefresh',
    loadComponent: async function treeNoRefreshRoute(): Promise<Type<unknown>> {
      return (await import('./routes/tree-no-refresh/tree.component'))
        .TreeComponent;
    },
    providers: [
      //currentLocationSignalStore,
      provideSmartFeatureSignalEntities('tree-no-refresh', [
        noRefreshSignalsTopDefinition,
        noRefreshSignalsLocationsDefinition,
        noRefreshSignalsDepartmentsDefinition,
        noRefreshSignalsDepartmentChildrenDefinition,
      ]),
    ],
  },
  {
    path: 'treeNoRemove',
    loadComponent: async function treeNoRemoveRoute(): Promise<Type<unknown>> {
      return (await import('./routes/tree-no-remove/tree.component'))
        .TreeComponent;
    },
    providers: [
      //currentLocationSignalStore,
      provideSmartFeatureSignalEntities('tree-no-remove', [
        noRemoveSignalsTopDefinition,
        noRemoveSignalsLocationsDefinition,
        noRemoveSignalsDepartmentsDefinition,
        noRemoveSignalsDepartmentChildrenDefinition,
      ]),
    ],
  },
  {
    path: 'treeNoDirty',
    loadComponent: async function treeNoDirtyRoute(): Promise<Type<unknown>> {
      return (await import('./routes/tree-no-dirty/tree.component'))
        .TreeComponent;
    },
    providers: [
      //currentLocationSignalStore,
      provideSmartFeatureSignalEntities('tree-no-dirty', [
        noDirtySignalsTopDefinition,
        noDirtySignalsLocationsDefinition,
        noDirtySignalsDepartmentsDefinition,
        noDirtySignalsDepartmentChildrenDefinition,
      ]),
    ],
  },
];
