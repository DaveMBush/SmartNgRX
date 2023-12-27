import { createFeatureSelector } from '@ngrx/store';

import {
  TreeNoDirtyState,
  TreeNoDirtyState2,
} from './tree-no-dirty-state.interface';

export const selectTreeNoDirtyState =
  createFeatureSelector<TreeNoDirtyState>('tree-no-dirty');
export const selectTreeNoDirtyState2 =
  createFeatureSelector<TreeNoDirtyState2>('tree-no-dirty2');
