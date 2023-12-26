import { createFeatureSelector } from '@ngrx/store';

import {
  TreeStandardState,
  TreeStandardState2,
} from '../../tree-standard/store/tree-standard-state.interface';

export const selectTreeNoRefreshState =
  createFeatureSelector<TreeStandardState>('tree-no-refresh');
export const selectTreeNoRefreshState2 =
  createFeatureSelector<TreeStandardState2>('tree-no-refresh2');
