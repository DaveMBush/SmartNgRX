import { UpdateStr } from '@ngrx/entity/src/models';
import { signalStore } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';

import { PartialArrayDefinition } from '../types/partial-array-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { FacadeBase } from './facade.base';

function methodNotImplemented(): never {
  throw new Error('Method not implemented.');
}

/**
 * The SignalsFacade is the main interface for
 * the SmartNgRX Signals based store
 */
export class SignalsFacade<
  T extends SmartNgRXRowBase = SmartNgRXRowBase,
  > extends FacadeBase<T> {
  override brand = 'signal' as const;
  entitySymbol = signalStore(withEntities<T>());
  entityStore = new this.entitySymbol();

  /**
   * Initialization code for the facade
   *
   * @returns true if the facade is initialized successfully
   */
  // eslint-disable-next-line sonarjs/no-invariant-returns -- part of a set that may return false
  override init(): boolean {
    if (this.initCalled) {
      return true;
    }
    this.initCalled = true;

    // init code as needed here

    return true;
  }

  /**
   * Mark Dirty for Signals
   *
   * @param ids the ids to mark as dirty
   */
  // eslint-disable-next-line unused-imports/no-unused-vars -- waiting for the implementation
  override markDirty(ids: string[]): void {
    methodNotImplemented();
  }

  /**
   * Mark Not Dirty for Signals
   *
   * @param id the id to mark as not dirty
   */
  // eslint-disable-next-line unused-imports/no-unused-vars -- waiting for the implementation
  override markNotDirty(id: string): void {
    methodNotImplemented();
  }

  /**
   * Force Dirty for Signals
   *
   * @param ids the ids to force dirty
   */
  // eslint-disable-next-line unused-imports/no-unused-vars -- waiting for the implementation
  override forceDirty(ids: string[]): void {
    methodNotImplemented();
  }

  /**
   * Garbage Collect for Signals
   *
   * @param ids the ids to garbage collect
   */
  // eslint-disable-next-line unused-imports/no-unused-vars -- waiting for the implementation
  override garbageCollect(ids: string[]): void {
    methodNotImplemented();
  }

  /**
   * Remove for Signals
   *
   * @param ids the ids to remove
   */
  // eslint-disable-next-line unused-imports/no-unused-vars -- waiting for the implementation
  override remove(ids: string[]): void {
    methodNotImplemented();
  }

  /**
   * Update for Signals
   *
   * @param oldRow the old row
   * @param newRow the new row
   */
  // eslint-disable-next-line unused-imports/no-unused-vars -- waiting for the implementation
  override update(oldRow: SmartNgRXRowBase, newRow: SmartNgRXRowBase): void {
    methodNotImplemented();
  }

  /**
   * Update Many for Signals
   *
   * @param changes the changes to update
   */
  // eslint-disable-next-line unused-imports/no-unused-vars -- waiting for the implementation
  override updateMany(changes: UpdateStr<SmartNgRXRowBase>[]): void {
    methodNotImplemented();
  }

  /**
   * Add for Signals
   *
   * @param row the row to add
   * @param parentId the parent id
   * @param parentService the parent service
   */
  override add(
    // eslint-disable-next-line unused-imports/no-unused-vars -- waiting for the implementation
    row: SmartNgRXRowBase,
    // eslint-disable-next-line unused-imports/no-unused-vars -- waiting for the implementation
    parentId: string,
    // eslint-disable-next-line unused-imports/no-unused-vars -- waiting for the implementation
    parentService: FacadeBase,
  ): void {
    methodNotImplemented();
  }

  /**
   * Delete for Signals
   *
   * @param id the id to delete
   */
  // eslint-disable-next-line unused-imports/no-unused-vars -- waiting for the implementation
  override delete(id: string): void {
    methodNotImplemented();
  }

  /**
   * Load By Ids for Signals
   *
   * @param ids the ids to load
   */
  // eslint-disable-next-line unused-imports/no-unused-vars -- waiting for the implementation
  override loadByIds(ids: string): void {
    methodNotImplemented();
  }

  /**
   * Load By Ids Preload for Signals
   *
   * @param ids the ids to load
   */
  // eslint-disable-next-line unused-imports/no-unused-vars -- waiting for the implementation
  override loadByIdsPreload(ids: string[]): void {
    methodNotImplemented();
  }

  /**
   * Load By Ids Success for Signals
   *
   * @param rows the rows to load
   */
  // eslint-disable-next-line unused-imports/no-unused-vars -- waiting for the implementation
  override loadByIdsSuccess(rows: SmartNgRXRowBase[]): void {
    methodNotImplemented();
  }

  /**
   * Load By Indexes for Signals
   *
   * @param parentId the parent id
   * @param childField the child field
   * @param index the index
   */
  override loadByIndexes(
    // eslint-disable-next-line unused-imports/no-unused-vars -- waiting for the implementation
    parentId: string,
    // eslint-disable-next-line unused-imports/no-unused-vars -- waiting for the implementation
    childField: string,
    // eslint-disable-next-line unused-imports/no-unused-vars -- waiting for the implementation
    index: number,
  ): void {
    methodNotImplemented();
  }

  /**
   * Load By Indexes Success for Signals
   *
   * @param parentId the parent id
   * @param childField the child field
   * @param array the array
   */
  override loadByIndexesSuccess(
    // eslint-disable-next-line unused-imports/no-unused-vars -- waiting for the implementation
    parentId: string,
    // eslint-disable-next-line unused-imports/no-unused-vars -- waiting for the implementation
    childField: string,
    // eslint-disable-next-line unused-imports/no-unused-vars -- waiting for the implementation
    array: PartialArrayDefinition,
  ): void {
    methodNotImplemented();
  }
}
