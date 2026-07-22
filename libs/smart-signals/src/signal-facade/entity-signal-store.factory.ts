import type { Signal } from '@angular/core';
import { computed } from '@angular/core';
import { EntityState, Update } from '@ngrx/entity';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  addEntity,
  removeEntities,
  updateEntity,
  upsertEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { forNext, SmartNgRXRowBase } from '@smarttools/smart-core';

import type { SignalsFacade } from './signals-facade';

/**
 * Creates core methods feature for entity signal store.
 *
 * @param signalFacade - The facade providing entity ID and other configs.
 * @returns SignalStore feature with updateMany, remove, and upsert methods.
 */
function createCoreMethodsFeature<T extends SmartNgRXRowBase>(
  signalFacade: SignalsFacade<T>,
) {
  return withMethods(function defineCoreMethods(store) {
    function applyUpdate(change: Update<T>): void {
      patchState(store, updateEntity(change));
    }

    function removeIds(ids: string[]): void {
      patchState(store, removeEntities(ids as (number | string)[]));
    }

    function upsertRow(row: T): void {
      const id = signalFacade.selectId(row);
      if (store['entityMap']()[id] !== undefined) {
        patchState(store, updateEntity({ id, changes: row }));
      } else {
        patchState(store, addEntity(row));
      }
    }

    function updateMany(changes: Update<T>[]): void {
      forNext(changes, applyUpdate);
    }

    return { updateMany, remove: removeIds, upsert: upsertRow };
  });
}

/**
 * Creates helper methods feature for entity signal store.
 *
 * @returns SignalStore feature with storeRows method.
 */
function createHelperMethodsFeature<T extends SmartNgRXRowBase>() {
  return withMethods(function defineHelperMethods(store) {
    function storeRows(rows: T[]): void {
      forNext(rows, function handleUpsertRow(row: T): void {
        patchState(store, upsertEntity(row));
      });
    }

    return { storeRows };
  });
}

/**
 * Creates computed state feature for entity signal store.
 *
 * @returns SignalStore feature with entityState computed property.
 */
function createComputedFeature<T extends SmartNgRXRowBase>() {
  return withComputed(function defineComputed(store) {
    return {
      entityState: computed<EntityState<T>>(
        function getEntityState(): EntityState<T> {
          return {
            ids: store['ids'](),
            entities: store['entityMap'](),
          };
        },
      ),
    };
  });
}

/**
 * Creates a signal store for an entity.
 *
 * @param signalFacade - The facade providing entity ID and other configs.
 * @returns A SignalStoreWithEntity instance with entity management methods.
 */
export function entitySignalStoreFactory<T extends SmartNgRXRowBase>(
  signalFacade: SignalsFacade<T>,
): SignalStoreWithEntity<T> {
  const stateFeature = withState<object>({});
  const entitiesFeature = withEntities<T>();

  return new (signalStore(
    stateFeature,
    entitiesFeature,
    createCoreMethodsFeature(signalFacade),
    createHelperMethodsFeature(),
    createComputedFeature<T>(),
  ))() as unknown as SignalStoreWithEntity<T>;
}

interface SignalStoreWithEntity<T extends SmartNgRXRowBase> {
  updateMany(changes: Update<T>[]): void;
  remove(ids: string[]): void;
  upsert(row: T): void;
  storeRows(rows: T[]): void;
  entityState: Signal<EntityState<T>>;
  entityMap(): Record<string, T | undefined>;
  ids(): (number | string)[];
}
