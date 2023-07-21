import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';

/**
 * Creates a group of selectors for a given feature and type of entity T
 *
 * ## Usage:
 * ``` typescript
 * const { selectAll } = selectorFactory<Todo>('list');
 * ```
 * @param T - the entity type
 * @param feature - the feature the entity is a part of
 * @returns selectAll selector for the given feature and entity
 */
// eslint-disable-next-line ngrx/prefix-selectors-with-select -- isn't a selector
export function selectorFactory<T>(feature: string): {
  selectAll: MemoizedSelector<object, T[], (s1: EntityState<T>) => T[]>;
} {
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
}
