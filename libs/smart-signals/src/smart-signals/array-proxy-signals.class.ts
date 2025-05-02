import {
  BaseArrayProxy,
  facadeRegistry,
  newRowRegistry,
  SmartNgRXRowBase,
} from '@smarttools/smart-core';

import { SignalsFacade } from '../signal-facade/signals-facade';

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
export class ArrayProxySignals<
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
  removeFromStore(row: C, parent: P): void {
    // we have to grab the raw data, not the proxied data.
    const childId = this.selectId(row);
    const parentId = this.parentSelectId(parent);
    newRowRegistry.remove(this.childFeature, this.childEntity, row.id);
    this.childActionService.remove([childId]);
    const facade = facadeRegistry.register(
      this.parentFeature,
      this.parentEntity,
    ) as SignalsFacade<P>;

    this.removeChildIdFromChildArray(
      {
        ids: facade.entityState.ids() as string[],
        entities: facade.entityState.entityMap() as Record<string, P>,
      },
      parentId,
      this.parentField,
      childId,
    );
  }
}
