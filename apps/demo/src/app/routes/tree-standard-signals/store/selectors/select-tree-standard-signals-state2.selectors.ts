import { createFeatureSelector } from '@ngrx/store';

import { featureName } from '../../feature.const';
import { TreeStandardSignalsState2 } from '../tree-standard-signals-state2.interface';

export const selectTreeStandardSignalsState2 =
  createFeatureSelector<TreeStandardSignalsState2>(featureName + '2');
