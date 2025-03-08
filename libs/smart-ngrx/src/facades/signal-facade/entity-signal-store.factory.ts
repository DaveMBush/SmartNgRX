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
    withState({}),
    withEntities<T>(),
    withMethods(function withMethodsFunction(store) {
      return {
        updateMany: function updateMany(changes: Update<T>[]) {
          forNext(changes, function updateManyForNext(change) {
            patchState(store, updateEntity(change));
          });
        },
        remove: function remove(ids: string[]) {
          patchState(store, removeEntities(ids));
        },
        upsert: function upsert(row: T) {
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
    withMethods(function withMethodsFunction2(store) {
      return {
        storeRows: function storeRows(rows: T[]) {
          forNext(rows, function storeRowsForNext(row) {
            store.upsert(row);
          });
        },
      };
    }),
    withComputed(function withComputedFunction(store) {
      return {
        entityState: computed(function entityState() {
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
