import { createFeatureSelector } from '@ngrx/store';

import {
  TreeNoRemoveState,
  TreeNoRemoveState2,
} from './tree-no-remove-state.interface';

export const selectTreeNoRemoveState =
  createFeatureSelector<TreeNoRemoveState>('tree-no-remove');
export const selectTreeNoRemoveState2 =
  createFeatureSelector<TreeNoRemoveState2>('tree-no-remove2');
