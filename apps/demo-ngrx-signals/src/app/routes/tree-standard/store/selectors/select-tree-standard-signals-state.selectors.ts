import { createFeatureSelector } from '@ngrx/store';

import { featureName } from '../../feature.const';
import { TreeStandardState } from '../tree-standard-state.interface';

export const selectTreeStandardSignalsState =
  createFeatureSelector<TreeStandardState>(featureName);
