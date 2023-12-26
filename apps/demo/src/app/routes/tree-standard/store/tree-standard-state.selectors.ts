import { createFeatureSelector } from '@ngrx/store';

import {
  TreeStandardState,
  TreeStandardState2,
} from './tree-standard-state.interface';

export const selectTreeStandardState =
  createFeatureSelector<TreeStandardState>('tree-standard');
export const selectTreeStandardState2 =
  createFeatureSelector<TreeStandardState2>('tree-standard2');
