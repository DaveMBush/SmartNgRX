import { createFeatureSelector } from '@ngrx/store';

import { TreeNoRefreshState } from '../tree-no-refresh-state.interface';

export const selectTreeNoRefreshState =
  createFeatureSelector<TreeNoRefreshState>('tree-no-refresh');
