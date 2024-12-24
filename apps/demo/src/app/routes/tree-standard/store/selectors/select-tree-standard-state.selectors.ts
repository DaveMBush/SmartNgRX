import { createFeatureSelector } from '@ngrx/store';

import { featureName } from '../../feature.const';
import { TreeStandardState } from '../tree-standard-state.interface';

export const selectTreeStandardState =
  createFeatureSelector<TreeStandardState>(featureName);
