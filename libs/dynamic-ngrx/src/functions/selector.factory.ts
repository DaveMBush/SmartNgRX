import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';

// eslint-disable-next-line ngrx/prefix-selectors-with-select -- isn't a selector
export const selectorFactory = <T>(
  feature: string
): {
  selectAll: MemoizedSelector<object, T[], (s1: EntityState<T>) => T[]>;
} => {
  const selectFeatureState = createFeatureSelector<EntityState<T>>(feature);
  const adapter = createEntityAdapter<T>();
  const adapterSelectors = adapter.getSelectors();
  const selectAll = createSelector(
    selectFeatureState,
    adapterSelectors.selectAll
  );
  return {
    selectAll,
  };
};
