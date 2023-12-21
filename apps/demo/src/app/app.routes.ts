import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { castTo } from '@smart/smart-ngrx/common/cast-to.function';
import { provideSmartFeatureEntities } from '@smart/smart-ngrx/index';

import { currentLocationReducer } from './routes/tree-with-standard-mark-and-delete/store/current-location/current-location.reducer';
import { DepartmentEffectsService } from './routes/tree-with-standard-mark-and-delete/store/department/department-effects.service';
import { departmentEffectsServiceToken } from './routes/tree-with-standard-mark-and-delete/store/department/department-effects.service-token';
import { departmentsDefinition } from './routes/tree-with-standard-mark-and-delete/store/department/departments-definition';
import { DepartmentChildEffectsService } from './routes/tree-with-standard-mark-and-delete/store/department-children/department-child-effects.service';
import { departmentChildEffectsServiceToken } from './routes/tree-with-standard-mark-and-delete/store/department-children/department-child-effects.service-token';
import { departmentChildrenDefinition } from './routes/tree-with-standard-mark-and-delete/store/department-children/department-children-definition';
import { DocsService } from './routes/tree-with-standard-mark-and-delete/store/docs/docs.service';
import { FoldersService } from './routes/tree-with-standard-mark-and-delete/store/folders/folders.service';
import { ListsService } from './routes/tree-with-standard-mark-and-delete/store/lists/lists.service';
import { LocationEffectsService } from './routes/tree-with-standard-mark-and-delete/store/locations/location-effects.service';
import { locationEffectsServiceToken } from './routes/tree-with-standard-mark-and-delete/store/locations/location-effects.service-token';
import { locationsDefinition } from './routes/tree-with-standard-mark-and-delete/store/locations/locations-definition';
import { SharedState } from './routes/tree-with-standard-mark-and-delete/store/shared-state.interface';
import { SprintFoldersService } from './routes/tree-with-standard-mark-and-delete/store/sprint-folders/sprint-folders.service';

// This ensure we have one key per SharedState property
const sharedReducers = castTo<ActionReducerMap<SharedState>>({
  currentLocation: currentLocationReducer,
});

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'tree',
    pathMatch: 'full',
  },
  {
    path: 'tree',
    loadComponent: async () =>
      (
        await import(
          './routes/tree-with-standard-mark-and-delete/tree.component'
        )
      ).TreeComponent,
    providers: [
      DocsService,
      FoldersService,
      SprintFoldersService,
      ListsService,
      {
        provide: departmentEffectsServiceToken,
        useClass: DepartmentEffectsService,
      },
      {
        provide: departmentChildEffectsServiceToken,
        useClass: DepartmentChildEffectsService,
      },
      {
        provide: locationEffectsServiceToken,
        useClass: LocationEffectsService,
      },
      importProvidersFrom([StoreModule.forFeature('shared2', sharedReducers)]),
      provideSmartFeatureEntities('shared', [
        locationsDefinition,
        departmentsDefinition,
        departmentChildrenDefinition,
      ]),
    ],
  },
  {
    path: 'memlab',
    loadComponent: async () =>
      (await import('./routes/memlab/memlab.component')).MemlabComponent,
  },
];
