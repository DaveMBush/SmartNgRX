import { createFeatureSelector } from '@ngrx/store';

import { TreeNoRefreshState2 } from '../tree-no-refresh-state2.interface';

export const selectTreeNoRefreshState2 =
  createFeatureSelector<TreeNoRefreshState2>('tree-no-refresh2');
