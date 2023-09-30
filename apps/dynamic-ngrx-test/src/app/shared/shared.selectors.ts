import { createFeatureSelector } from '@ngrx/store';

import { SharedState } from './shared-state.interface';

export const selectSharedState = createFeatureSelector<SharedState>('shared');
