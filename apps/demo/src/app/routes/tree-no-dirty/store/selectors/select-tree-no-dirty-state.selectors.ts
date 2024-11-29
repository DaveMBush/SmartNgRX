import { createFeatureSelector } from '@ngrx/store';

import { TreeNoDirtyState } from '../tree-no-dirty-state.interface';

export const selectTreeNoDirtyState =
  createFeatureSelector<TreeNoDirtyState>('tree-no-dirty');
