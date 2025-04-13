import { createFeatureSelector } from '@ngrx/store';

import { TreeNoRemoveState } from '../tree-no-remove-state.interface';

export const selectTreeNoRemoveState =
  createFeatureSelector<TreeNoRemoveState>('tree-no-remove');
