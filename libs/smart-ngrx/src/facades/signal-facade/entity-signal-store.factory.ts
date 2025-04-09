import { computed } from '@angular/core';
import { Update } from '@ngrx/entity';
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
  withEntities,
} from '@ngrx/signals/entities';

import { forNext } from '../../common/for-next.function';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { SignalsFacade } from '../signals-facade';

/**
 * Creates a signal store for an entity
 *
 * @param signalFacade The signal facade that calls this function
 *
 * @returns The signal store.  Already new'd up and read to use.
 */
export function entitySignalStoreFactory<T extends SmartNgRXRowBase>(
  signalFacade: SignalsFacade<T>,
) {
  const signalDefinition = signalStore(
    // Base state
    withState({}),
    withEntities<T>(),

    // Core state modification methods
    withMethods(function defineCoreMethods(store) {
      return {
        updateMany: function updateManyMethod(changes: Update<T>[]) {
          forNext(changes, function applyUpdate(change) {
            patchState(store, updateEntity(change));
          });
        },
        remove: function removeMethod(ids: string[]) {
          patchState(store, removeEntities(ids));
        },
        upsert: function upsertMethod(row: T) {
          const id = signalFacade.selectId(row);
          const hasId = id in store.entityMap();
          if (hasId) {
            patchState(store, updateEntity({ id, changes: row }));
          } else {
            patchState(store, addEntity(row));
          }
        },
      };
    }),

    // Additional methods that depend on core methods
    withMethods(function defineHelperMethods(store) {
      return {
        storeRows: function storeRowsMethod(rows: T[]) {
          forNext(rows, function storeRow(row) {
            store.upsert(row);
          });
        },
      };
    }),
    // Computed signals
    withComputed(function computeEntityState(store) {
      return {
        entityState: computed(function computeState() {
          return {
            ids: store.ids() as string[],
            entities: store.entityMap(),
          };
        }),
      };
    }),
  );

  return new signalDefinition();
}
