import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export const selectorFactory = <T>(feature: string) => {
  const selectFeatureState = createFeatureSelector<EntityState<T>>(feature);
  const adapter = createEntityAdapter<T>();
  const adapterSelectors = adapter.getSelectors();
  const selectAll = createSelector(selectFeatureState, adapterSelectors.selectAll);
  return {
    selectAll
  }
};


