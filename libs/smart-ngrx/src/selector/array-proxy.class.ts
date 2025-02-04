import { EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { take } from 'rxjs';

import { ActionService } from '../actions/action.service';
import { assert } from '../common/assert.function';
import { castTo } from '../common/cast-to.function';
import { isProxy } from '../common/is-proxy.const';
import { entityDefinitionRegistry } from '../registrations/entity-definition-registry.function';
import { RowProxy } from '../row-proxy/row-proxy.class';
import { ChildDefinition } from '../types/child-definition.interface';
import { RowProxyDelete } from '../types/row-proxy-delete.interface';
import { SmartArray } from '../types/smart-array.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { arrayProxyClassGet } from './array-proxy-class.get.function';
import { getArrayItem } from './get-array-item.function';
import { getServices } from './get-services.function';
import { isArrayProxy } from './is-array-proxy.function';
import { newRowRegistry } from './new-row-registry.class';
import { store } from './store.function';
import { VirtualArray } from './virtual-array.class';

function isVirtualArray(item: unknown): item is VirtualArray<object> {
  return typeof item === 'object' && item !== null && 'rawArray' in item;
}

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
export class ArrayProxy<
    P extends SmartNgRXRowBase = SmartNgRXRowBase,
    C extends SmartNgRXRowBase = SmartNgRXRowBase,
  >
  implements SmartArray<P, C>, ArrayLike<C>, Iterable<C>
{
  // entityAdapter and childActionService are initialized in the init method
  // so they are safe to use later on.
  entityAdapter!: EntityAdapter<SmartNgRXRowBase>;
  parentEntityAdapter!: EntityAdapter<SmartNgRXRowBase>;
  childActionService!: ActionService<C>;
  [isProxy] = true;
  rawArray: string[] = [];

  /**
   * The constructor for the ArrayProxy class.
   *
   * @param childArray The ArrayProxy or string[] of ids to wrap
   * @param child The child `EntityState` we use to find the item in the store
   * @param childDefinition The `ChildDefinition` that allows us
   *     to get at features, entities and other things we need.
   */
  constructor(
    private childArray: ArrayProxy<P, C> | string[],
    private child: EntityState<C>,
    private childDefinition: ChildDefinition<P, C>,
  ) {
    // proxying this so that we can intercept going after
    // an index and return the item from the store instead
    return new Proxy(this, {
      get: function arrayProxyProxyGet(target, prop) {
        return arrayProxyClassGet(target, prop);
      },
    });
  }

  /**
   * This initialized the class once it has been created. We do this
   * so that we can test the class without having to worry about
   * executable code in the constructor.
   */
  init(): void {
    const { childFeature, childEntity } = this.childDefinition;
    const { service } = this.getServices();
    this.childActionService = service;
    // needed primarily for adding items to the array
    const { entityAdapter } = entityDefinitionRegistry(
      childFeature,
      childEntity,
    );
    this.entityAdapter = entityAdapter;
    const { parentFeature, parentEntity } = this.childDefinition;
    const { entityAdapter: parentEntityAdapter } = entityDefinitionRegistry(
      parentFeature,
      parentEntity,
    );
    this.parentEntityAdapter = parentEntityAdapter;
    if (isArrayProxy<P, C>(this.childArray)) {
      this.childArray = this.childArray.rawArray;
    }
    // at this point, we can be sure that childArray is a string[]
    if (Object.isFrozen(this.childArray)) {
      // unfreeze the original array so we can proxy it.
      this.childArray = [...this.childArray];
    }

    this.rawArray = this.childArray;
    this.childArray = [];
    this.length = this.rawArray.length;
  }

  /**
   * Implements iterator so we can use methods that depend on
   * iterable.
   *
   * @yields The next item in the iteration.
   * @returns The next item in the iteration.
   */
  *[Symbol.iterator](): Iterator<C & RowProxyDelete> {
    const len = this.rawArray.length;
    for (let i = 0; i < len; i++) {
      yield this.getAtIndex(i);
    }
    return undefined;
  }

  /**
   * This primarily exist for testing so you can stringify the array and then
   * parse it so that you get an array you can compare against instead of an
   * object of type ArrayProxy that you can't do much with.
   *
   * @returns what this would return if it were a real array.  Mostly for
   * unit testing.
   */
  toJSON(): (C & RowProxyDelete)[] {
    const array: (C & RowProxyDelete)[] = [];
    for (let i = 0; i < this.length; i++) {
      array.push(this.getAtIndex(i));
    }
    return array;
  }

  [n: number]: C & RowProxyDelete;
  length = 0;

  /**
   * Allows us to go after the data in the store based on the index of the
   * array.
   *
   * @param index the index into the rawArray that has the ID we will
   * lookup in the entity.
   * @returns the item from the store or the default row if it is not in the
   * store yet.
   */
  getAtIndex(index: number): C & RowProxyDelete {
    if (index >= 0 && index < this.rawArray.length) {
      const id = this.rawArray[index];
      return getArrayItem<C, P>(this.child, id, this.childDefinition);
    }
    throw new Error('Index out of bounds');
  }

  /**
   * returns the id at the given index, if the array
   * is a virtual array, the id is returned without
   * fetching from the server.
   *
   * @param index the index to get the id at
   * @returns the id at the given index
   */
  getIdAtIndex(index: number): string | undefined {
    if (!isVirtualArray(this.rawArray)) {
      if (index >= 0 && index < this.rawArray.length) {
        return this.rawArray[index];
      }
      return undefined;
    }
    const virtualArray = castTo<VirtualArray<P>>(this.rawArray);
    return virtualArray.getIdAtIndex(index);
  }

  /**
   * grabs common actions and store used by other methods
   *
   * @returns the `ActionService` for the child and the parent
   */
  getServices(): {
    service: ActionService<C>;
    parentService: ActionService<P>;
  } {
    return getServices<P, C>(this.childDefinition);
  }

  /**
   * This method allows us to add an item to the array. Make sure it contains
   * and ID field and any other defaults you might need
   *
   * @param newRow the item to add to the array
   * @param thisRow the parent entity (this row) that contains the array
   */
  addToStore(newRow: C, thisRow: P): void {
    const { parentFeature, parentEntity } = this.childDefinition;
    const childId = this.entityAdapter.selectId(newRow) as string;
    const parentId = this.parentEntityAdapter.selectId(thisRow) as string;
    const { service, parentService } = this.getServices();
    const newParent = this.createNewParentFromParent(thisRow, true);
    newRow.parentId = parentId;
    newRow.isEditing = true;
    newRow.id = childId;
    newRowRegistry.registerNewRow(parentFeature, parentEntity, childId);
    service.loadByIdsSuccess([newRow]);
    // cast is the only safe way to access the parentField that holds the
    // list of child IDs.

    if (Array.isArray(this.rawArray)) {
      castTo<Record<keyof P, string[]>>(newParent)[
        this.childDefinition.parentField
      ] = [...this.rawArray, childId];
    } else {
      const existingVirtualArray = castTo<VirtualArray<P>>(this.rawArray);
      const indexes = [...existingVirtualArray.rawArray];
      indexes[existingVirtualArray.length] = childId;
      castTo<Record<keyof P, VirtualArrayContents>>(newParent)[
        this.childDefinition.parentField
      ] = {
        indexes,
        length: existingVirtualArray.length + 1,
      };
    }
    parentService.loadByIdsSuccess([newParent]);
  }

  /**
   * This removes a row from the store that was previously added, but not
   * saved to the server yet.
   *
   * @param row the row to remove from the array
   * @param parent the parent entity that contains the array
   */
  removeFromStore(row: C, parent: P): void {
    // we have to grab the raw data, not the proxied data.
    const {
      childFeature,
      childEntity,
      parentFeature,
      parentEntity,
      parentField,
    } = this.childDefinition;
    const childId = this.entityAdapter.selectId(row) as string;
    const parentId = this.parentEntityAdapter.selectId(parent) as string;
    newRowRegistry.remove(childFeature, childEntity, row.id);
    const selectFeature =
      createFeatureSelector<Record<string, EntityState<P>>>(parentFeature);
    const selectEntity = createSelector(
      selectFeature,
      function retrieveEntityFromState(state: Record<string, EntityState<P>>) {
        return state[parentEntity];
      },
    );
    this.childActionService.remove([childId]);
    const removeChildIdFromChildArray =
      this.removeChildIdFromChildArray.bind(this);
    store()
      .select(selectEntity)
      .pipe(take(1))
      .subscribe(function removeEntityFromChildArray(entity: EntityState<P>) {
        removeChildIdFromChildArray(entity, parentId, parentField, childId);
      });
  }

  /**
   * Removes a child id from the child array of the parent.
   * This is called from removeFromStore.
   *
   * @param entity The parent entity.
   * @param parentId The id of the parent.
   * @param parentField The field of the parent that holds the child ids.
   * @param childId The id of the child to remove.
   */
  private removeChildIdFromChildArray(
    entity: EntityState<P>,
    parentId: string,
    parentField: keyof P,
    childId: string,
  ): void {
    const parentRow = entity.entities[parentId];
    assert(!!parentRow, 'parentRow is undefined');
    const parentArray = parentRow[parentField];
    const { parentService } = this.getServices();
    if (Array.isArray(parentArray)) {
      const hasChildId = parentArray.includes(childId);
      if (!hasChildId) {
        return;
      }
      const newParent = {
        ...parentRow,
        isEditing: false,
        [parentField]: parentArray.filter(filterByChildId(childId)),
      };
      parentService.loadByIdsSuccess([newParent]);
    } else {
      const virtualArrayContents = parentRow[
        parentField
      ] as VirtualArrayContents;
      const hasChildId = virtualArrayContents.indexes.includes(childId);
      if (!hasChildId) {
        return;
      }
      const newParent = {
        ...parentRow,
        isEditing: false,
        [parentField]: {
          ...virtualArrayContents,
          indexes: virtualArrayContents.indexes.map(mapIndexToDelete(childId)),
          length: virtualArrayContents.length - 1,
        },
      };
      parentService.loadByIdsSuccess([newParent]);
    }
  }

  /**
   * @ignore
   */
  private createNewParentFromParent(parent: P, isEditing: boolean): P {
    let newParent: P = { ...parent, isEditing };
    // we aren't using the 2nd generic parameter of RowProxy, so we just
    // use the base type of SmartNgRXRowBase here.
    const rowProxy = castTo<RowProxy<P>>(parent);
    if (rowProxy.getRealRow !== undefined) {
      newParent = {
        ...rowProxy.getRealRow(),
        ...rowProxy.changes,
        isEditing,
      };
    }
    return newParent;
  }
}

function filterByChildId(childId: string) {
  return function innerFilterByChildId(cid: string) {
    return cid !== childId;
  };
}

function mapIndexToDelete(childId: string) {
  return function innerMapIndexToDelete(cid: string) {
    // istanbul ignore next -- cid is difficult if not impossible to test but needed for defensive programming
    return cid !== childId ? cid : 'delete';
  };
}
