import { EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  BaseArrayProxy,
  newRowRegistry,
  SmartNgRXRowBase,
} from '@smarttools/smart-core';
import { take } from 'rxjs';

import { store } from './store.function';

/**
 * This is an internal class used by `createSmartSelector` to wrap the field
 * that represents the child array with a class that manages all the
 * magic of loading the data from the server as it is accessed.
 *
 * Note: The constructor of this class returns a Proxy to intercept
 * property accesses. This is an intentional and necessary design
 * choice to achieve the desired behavior of dynamically loading data.
 *
 * @see `createSmartSelector`
 */
export class ArrayProxyClassic<
  P extends SmartNgRXRowBase = SmartNgRXRowBase,
  C extends SmartNgRXRowBase = SmartNgRXRowBase,
> extends BaseArrayProxy<P, C> {
  /**
   * This removes a row from the store that was previously added, but not
   * saved to the server yet.
   *
   * @param row the row to remove from the array
   * @param parent the parent entity that contains the array
   */
  override removeFromStore(row: C, parent: P): void {
    const context = this;
    // we have to grab the raw data, not the proxied data.
    const childId = this.selectId(row);
    const parentId = this.parentSelectId(parent);
    newRowRegistry.remove(this.childFeature, this.childEntity, row.id);
    const selectFeature = createFeatureSelector<Record<string, EntityState<P>>>(
      this.parentFeature,
    );
    const selectEntity = createSelector(
      selectFeature,
      function retrieveEntityFromState(state: Record<string, EntityState<P>>) {
        return state[context.parentEntity];
      },
    );
    this.childActionService.remove([childId]);
    const removeChildIdFromChildArray =
      this.removeChildIdFromChildArray.bind(this);
    store()
      .select(selectEntity)
      .pipe(take(1))
      .subscribe(function removeEntityFromChildArray(entity: EntityState<P>) {
        removeChildIdFromChildArray(
          entity,
          parentId,
          context.parentField,
          childId,
        );
      });
  }
}
