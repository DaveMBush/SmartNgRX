import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { castTo } from '@smart/smart-ngrx/common/cast-to.function';
import { provideSmartFeatureEntities } from '@smart/smart-ngrx/index';

import { currentLocationNoDirtyReducer } from './routes/tree-no-dirty/store/current-location/current-location-no-dirty.reducer';
import { noDirtyDepartmentsDefinition } from './routes/tree-no-dirty/store/department/no-dirty-departments-definition';
import { noDirtyDepartmentChildrenDefinition } from './routes/tree-no-dirty/store/department-children/no-dirty-department-children-definition';
import { noDirtyLocationsDefinition } from './routes/tree-no-dirty/store/locations/no-dirty-locations-definition';
import { currentLocationNoRefreshReducer } from './routes/tree-no-refresh/store/current-location/current-location-no-refresh.reducer';
import { noRefreshDepartmentsDefinition } from './routes/tree-no-refresh/store/department/no-refresh-departments-definition';
import { noRefreshDepartmentChildrenDefinition } from './routes/tree-no-refresh/store/department-children/no-refresh-department-children-definition';
import { noRefreshLocationsDefinition } from './routes/tree-no-refresh/store/locations/no-refresh-locations-definition';
import { currentLocationNoRemoveReducer } from './routes/tree-no-remove/store/current-location/current-location-no-remove.reducer';
import { noRemoveDepartmentsDefinition } from './routes/tree-no-remove/store/department/no-remove-departments-definition';
import { noRemoveDepartmentChildrenDefinition } from './routes/tree-no-remove/store/department-children/no-remove-department-children-definition';
import { noRemoveLocationsDefinition } from './routes/tree-no-remove/store/locations/no-remove-locations-definition';
import { currentLocationStandardReducer } from './routes/tree-standard/store/current-location/current-location-standard.reducer';
import { standardDepartmentsDefinition } from './routes/tree-standard/store/department/standard-departments-definition';
import { standardDepartmentChildrenDefinition } from './routes/tree-standard/store/department-children/standard-department-children-definition';
import { standardLocationsDefinition } from './routes/tree-standard/store/locations/standard-locations-definition';
import { TreeStandardState } from './routes/tree-standard/store/tree-standard-state.interface';

// This ensure we have one key per SharedState property
const sharedReducersStandard = castTo<ActionReducerMap<TreeStandardState>>({
  currentLocation: currentLocationStandardReducer,
});

const sharedReducersNoRefresh = castTo<ActionReducerMap<TreeStandardState>>({
  currentLocation: currentLocationNoRefreshReducer,
});
const sharedReducersNoDirty = castTo<ActionReducerMap<TreeStandardState>>({
  currentLocation: currentLocationNoDirtyReducer,
});
const sharedReducersNoRemove = castTo<ActionReducerMap<TreeStandardState>>({
  currentLocation: currentLocationNoRemoveReducer,
});

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: async () =>
      (await import('./routes/home/home.component')).HomeComponent,
  },
  {
    path: 'tree',
    loadComponent: async () =>
      (await import('./routes/tree-standard/tree.component')).TreeComponent,
    providers: [
      importProvidersFrom([
        StoreModule.forFeature('tree-standard2', sharedReducersStandard),
      ]),
      provideSmartFeatureEntities('tree-standard', [
        standardLocationsDefinition,
        standardDepartmentsDefinition,
        standardDepartmentChildrenDefinition,
      ]),
    ],
  },
  {
    path: 'treeNoRefresh',
    loadComponent: async () =>
      (await import('./routes/tree-no-refresh/tree-no-refresh.component'))
        .TreeNoRefreshComponent,
    providers: [
      importProvidersFrom([
        StoreModule.forFeature('tree-no-refresh2', sharedReducersNoRefresh),
      ]),
      provideSmartFeatureEntities('tree-no-refresh', [
        noRefreshLocationsDefinition,
        noRefreshDepartmentsDefinition,
        noRefreshDepartmentChildrenDefinition,
      ]),
    ],
  },
  {
    path: 'treeNoDirty',
    loadComponent: async () =>
      (await import('./routes/tree-no-dirty/tree-no-dirty.component'))
        .TreeNoDirtyComponent,
    providers: [
      importProvidersFrom([
        StoreModule.forFeature('tree-no-dirty2', sharedReducersNoDirty),
      ]),
      provideSmartFeatureEntities('tree-no-dirty', [
        noDirtyLocationsDefinition,
        noDirtyDepartmentsDefinition,
        noDirtyDepartmentChildrenDefinition,
      ]),
    ],
  },
  {
    path: 'treeNoRemove',
    loadComponent: async () =>
      (await import('./routes/tree-no-remove/tree-no-remove.component'))
        .TreeNoRemoveComponent,
    providers: [
      importProvidersFrom([
        StoreModule.forFeature('tree-no-remove2', sharedReducersNoRemove),
      ]),
      provideSmartFeatureEntities('tree-no-remove', [
        noRemoveLocationsDefinition,
        noRemoveDepartmentsDefinition,
        noRemoveDepartmentChildrenDefinition,
      ]),
    ],
  },
];
