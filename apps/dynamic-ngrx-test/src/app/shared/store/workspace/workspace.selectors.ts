import { createSelector } from '@ngrx/store';

import { castTo } from '@davembush/dynamic-ngrx/common/cast-to.function';
import { createSmartSelector } from '@davembush/dynamic-ngrx/selector/create-smart-selector.function';
import { ensureDataLoaded } from '@davembush/dynamic-ngrx/selector/ensure-data-loaded.function';
import { MarkAndDeleteSelector } from '@davembush/dynamic-ngrx/types/mark-and-delete-selector.type';

import { selectCurrentWorkspaceId } from '../../current-workspace/current-workspace.selector';
import { selectSharedState } from '../../shared.selectors';
import { spaceActions } from '../space/space.actions';
import { selectSpacesChildren } from '../space/space.selector';
import { workspaceActions } from './workspace.actions';
import { Workspace } from './workspace.interface';

export const selectWorkspace = createSelector(selectSharedState, (state) => {
  if (!state.workspaces.ids.length) {
    // because we are using load and not loadById
    // this will load all the workspaces
    const id = state.currentWorkspace ?? '1';
    ensureDataLoaded(state.workspaces, id, workspaceActions.load);
  }
  return state.workspaces;
});

export const selectWorkspacesSpaces = createSmartSelector<Workspace>(
  selectWorkspace,
  [
    {
      childAction: spaceActions.loadByIds,
      childName: 'children',
      childSelector: castTo<MarkAndDeleteSelector>(selectSpacesChildren),
      defaultChildRow: {
        id: '',
        name: 'spaces',
        children: [],
        lastUpdate: 0,
      },
    },
  ]
);

export const selectCurrentWorkspace = createSelector(
  selectWorkspacesSpaces,
  selectCurrentWorkspaceId,
  (workspaces, id) => {
    return (
      workspaces.entities[id] ?? {
        id: '',
        name: '',
        children: [],
        isDirty: false,
      }
    );
  }
);
