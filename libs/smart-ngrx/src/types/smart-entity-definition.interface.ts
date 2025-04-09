import { SmartNgRXRowBase } from '@smarttools/core';

import { EffectServiceToken } from './effect-service.token';
import { MarkAndDeleteInit } from './mark-and-delete-init.interface';

/**
 * This is the interface that is used to define the entity for the
 * provideSmartFeatureEntities provider function
 */
export interface SmartEntityDefinition<Row extends SmartNgRXRowBase> {
  /**
   * The entity name that you'd usually use in the reducer object
   * you'd use in StoreModule.forFeature(featureName, reducer)
   * OR the name you'd use in provideState(featureName, reducer)
   *
   * We also use this name along with the feature as the Source field
   * in actions but this should not matter to you because you'll either
   * be using actions we've created or using your own actions for your
   * specific purposes.
   */
  entityName: string;

  /**
   * This is the service token related to the service the effect for this entity
   * should call to do CRUD operations against the backend.
   */
  effectServiceToken: EffectServiceToken<Row>;
  /**
   * The static function that returns a default row for the entity when it does not
   * yet exist in the store.
   *
   * @param id The unique identifier for the row. You should use this to set the
   * id of the id row in the default row. If the default row is being generated
   * because it needs to be filled in for a virtual row and only has an index, the
   * id that is passed in will be in the form of `index${psi}${index}`. You can use
   * this information to create whatever ID is appropriate for the row.
   */
  /* eslint-disable-next-line @typescript-eslint/no-invalid-void-type -- this: void is valid for functions that should not access this context */
  defaultRow(this: void, id: string): Row;

  /**
   * If this is true, the assumption is that this is the top level row that has
   * an ID and child fields that hold the IDs of the children. There can be
   * multiple top level rows and each should have at least one child field for
   * it to be useful.
   *
   * When this is true, the loadById action will be fired with one element of value '1'
   * the effectService will be called with this array where you can make a call
   * to the backend to get the IDs for the child fields.
   */
  isInitialRow?: boolean;

  /**
   * If this is true, the backing store is signalStore and not standard NgRx.
   */
  isSignal?: boolean;

  // /**
  //  * Supply your own entityAdapter if you are not using ID as the primary key.
  //  */
  // entityAdapter?: EntityAdapter<SmartNgRXRowBase>;

  /**
   * Function that returns the ID of the row. If this is not
   * supplied, the code will assume that `id` is the primary key.
   *
   * @param row
   * @returns string that is the identifier value (not the field name) of the row.
   */
  /* eslint-disable-next-line @typescript-eslint/no-invalid-void-type -- this: void is valid for functions that should not access this context */
  selectId?(this: void, row: SmartNgRXRowBase): string;

  /**
   * The `MarkAndDeleteInit` for this entity. This is optional and if not provided
   * it will use the global `MarkAndDeleteInit` that is registered with the
   * as part of `provideSmartNgRX()
   */
  markAndDelete?: Partial<MarkAndDeleteInit>;
}
