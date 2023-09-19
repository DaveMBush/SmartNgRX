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
import { currentWorkspaceReducer } from './current-workspace/current-workspace.reducer';
import { SharedState } from './shared-state.interface';
import { DocsService } from './store/docs/docs.service';
import { FoldersService } from './store/folders/folders.service';
import { ListsService } from './store/lists/lists.service';
import {
  spaceEffects,
  spaceEffectsServiceToken,
} from './store/space/space.effects';
import { spaceReducer } from './store/space/space.reducer';
import { SpaceEffectsService } from './store/space/space-effects.service';
import {
  spaceChildEffects,
  spaceChildEffectsServiceToken,
} from './store/space-children/space-child.effects';
import { spaceChildReducer } from './store/space-children/space-child.reducer';
import { SpaceChildEffectsService } from './store/space-children/space-child-effects.service';
import { SprintFoldersService } from './store/sprint-folders/sprint-folders.service';
import {
  workspaceEffects,
  workspaceEffectsServiceToken,
} from './store/workspace/workspace.effects';
import { workspaceReducer } from './store/workspace/workspace.reducer';
import { WorkspaceEffectsService } from './store/workspace/workspace-effects.service';

// This ensure we have one key per SharedState property
const sharedReducers: ActionReducerMap<SharedState> = {
  workspaces: workspaceReducer,
  spaces: spaceReducer,
  spaceChildren: spaceChildReducer,
  currentWorkspace: currentWorkspaceReducer,
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
      workspaceEffects,
      spaceEffects,
      spaceChildEffects,
    ]),
  ],
  providers: [
    DocsService,
    FoldersService,
    SprintFoldersService,
    ListsService,
    {
      provide: spaceEffectsServiceToken,
      useClass: SpaceEffectsService,
    },
    {
      provide: spaceChildEffectsServiceToken,
      useClass: SpaceChildEffectsService,
    },
    {
      provide: workspaceEffectsServiceToken,
      useClass: WorkspaceEffectsService,
    },
  ],
  exports: [SidebarComponent],
})
export class SharedModule {}
