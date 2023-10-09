import { createFeatureSelector } from '@ngrx/store';

import { SharedState, SharedState2 } from './shared-state.interface';

export const selectSharedState = createFeatureSelector<SharedState>('shared');
export const selectSharedState2 =
  createFeatureSelector<SharedState2>('shared2');
