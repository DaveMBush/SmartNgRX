import { createSelector } from '@ngrx/store';

import { selectSharedState } from '../../shared.selectors';

export const selectSpaceChildren = createSelector(
  selectSharedState,
  (state) => {
    return state.spaceChildren;
  }
);
