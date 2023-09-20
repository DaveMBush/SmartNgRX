import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { StoreEffects } from '@davembush/dynamic-ngrx/selector/store.effects';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { currentLocationReducer } from './current-location/current-location.reducer';
import { SharedState } from './shared-state.interface';
import {
  departmentEffects,
  departmentEffectsServiceToken,
} from './store/department/department.effects';
import { departmentReducer } from './store/department/department.reducer';
import { DepartmentEffectsService } from './store/department/department-effects.service';
import {
  departmentChildEffects,
  departmentChildEffectsServiceToken,
} from './store/department-children/department-child.effects';
import { departmentChildReducer } from './store/department-children/department-child.reducer';
import { DepartmentChildEffectsService } from './store/department-children/department-child-effects.service';
import { DocsService } from './store/docs/docs.service';
import { FoldersService } from './store/folders/folders.service';
import { ListsService } from './store/lists/lists.service';
import {
  locationEffects,
  locationEffectsServiceToken,
} from './store/locations/location.effects';
import { locationReducer } from './store/locations/location.reducer';
import { LocationEffectsService } from './store/locations/location-effects.service';
import { SprintFoldersService } from './store/sprint-folders/sprint-folders.service';

// This ensure we have one key per SharedState property
const sharedReducers: ActionReducerMap<SharedState> = {
  locations: locationReducer,
  departments: departmentReducer,
  departmentChildren: departmentChildReducer,
  currentLocation: currentLocationReducer,
};

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    ScrollingModule,
    StoreModule.forFeature('shared', sharedReducers),
    EffectsModule.forFeature([
      // StoreEffects is temporary
      StoreEffects,
      locationEffects,
      departmentEffects,
      departmentChildEffects,
    ]),
  ],
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
  ],
  exports: [SidebarComponent],
})
export class SharedModule {}
