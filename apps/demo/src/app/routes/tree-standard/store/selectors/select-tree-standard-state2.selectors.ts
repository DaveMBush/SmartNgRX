import { createFeatureSelector } from '@ngrx/store';

import { featureName } from '../../feature.const';
import { TreeStandardState2 } from '../tree-standard-state2.interface';

export const selectTreeStandardState2 =
  createFeatureSelector<TreeStandardState2>(featureName + '2');
