import { createSelector } from '@ngrx/store';

import { selectTreeStandardSignalsState } from '../../selectors/select-tree-standard-signals-state.selectors';

export const selectLocationEntities = createSelector(
  selectTreeStandardSignalsState,
  function selectLocationEntitiesFunction(state) {
    return state.locations;
  },
);
