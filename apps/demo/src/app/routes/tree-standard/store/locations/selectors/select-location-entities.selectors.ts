import { createSelector } from '@ngrx/store';

import { selectTreeStandardState } from '../../selectors/select-tree-standard-state.selectors';

export const selectLocationEntities = createSelector(
  selectTreeStandardState,
  function selectLocationEntitiesFunction(state) {
    return state.locations;
  },
);
