import { createFeatureSelector } from '@ngrx/store';

import { TreeNoRemoveState2 } from '../tree-no-remove-state2.interface';

export const selectTreeNoRemoveState2 =
  createFeatureSelector<TreeNoRemoveState2>('tree-no-remove2');
