import { createFeatureSelector } from '@ngrx/store';

import { featureName } from '../feature.const';
import {
  TreeStandardState,
  TreeStandardState2,
} from './tree-standard-state.interface';

export const selectTreeStandardState =
  createFeatureSelector<TreeStandardState>(featureName);
export const selectTreeStandardState2 =
  createFeatureSelector<TreeStandardState2>(featureName + '2');
