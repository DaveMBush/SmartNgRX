import { createFeatureSelector } from '@ngrx/store';

import { TreeNoDirtyState2 } from '../tree-no-dirty-state2.interface';

export const selectTreeNoDirtyState2 =
  createFeatureSelector<TreeNoDirtyState2>('tree-no-dirty2');
