import { createFeatureSelector } from '@ngrx/store';

import {
  TreeNoRefreshState,
  TreeNoRefreshState2,
} from './tree-no-refresh-state.interface';

export const selectTreeNoRefreshState =
  createFeatureSelector<TreeNoRefreshState>('tree-no-refresh');
export const selectTreeNoRefreshState2 =
  createFeatureSelector<TreeNoRefreshState2>('tree-no-refresh2');
