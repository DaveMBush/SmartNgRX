import { createFeatureSelector } from '@ngrx/store';

import {
  TreeStandardVirtualState,
  TreeStandardVirtualState2,
} from './tree-standard-virtual-state.interface';

export const selectTreeStandardVirtualState =
  createFeatureSelector<TreeStandardVirtualState>('tree-standard-virtual');
export const selectTreeStandardVirtualState2 =
  createFeatureSelector<TreeStandardVirtualState2>('tree-standard-virtual2');
