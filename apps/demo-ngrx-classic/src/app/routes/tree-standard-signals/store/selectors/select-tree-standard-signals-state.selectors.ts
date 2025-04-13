import { createFeatureSelector } from '@ngrx/store';

import { featureName } from '../../feature.const';
import { TreeStandardSignalsState } from '../tree-standard-signals-state.interface';

export const selectTreeStandardSignalsState =
  createFeatureSelector<TreeStandardSignalsState>(featureName);
