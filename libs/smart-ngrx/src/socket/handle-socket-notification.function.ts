import {
  DeleteEntity,
  facadeRegistry,
  forNext,
  markAndDeleteEntities,
  psi,
} from '@smarttools/core';

import { removeIdFromParentsClassic } from '../classic-ngrx.facade/remove-id-from-parents-classic.function';
import { updateEntity } from './update-entity.function';

/**
 * The main function responsible for handling socket notifications
 *
 * @param table the table that the notification is for
 * @param action the action that the notification is for (create, delete, update)
 * @param ids the ids of the entities that the notification is for
 */
export function handleSocketNotification(
  table: string,
  action: string,
  ids: string[],
): void {
  // get all the active features
  let featureEntityKeys = markAndDeleteEntities.entities();

  // filter by features that have the table/entity
  featureEntityKeys = featureEntityKeys
    .filter(filterByPsiTable(table))
    .map(extractFeatureFromPsiTable)
    .filter(featureIsRegistered(table));
  // for each feature
  forNext(featureEntityKeys, function innerHandleSocketNotification(feature) {
    switch (action) {
      case 'delete': {
        const d = new DeleteEntity(
          feature,
          table,
          ids,
          removeIdFromParentsClassic,
        );
        d.deleteEntity();
        break;
      }
      case 'update':
        updateEntity(feature, table, ids);
        break;
      default:
        throw new Error(`Error: invalid action ${action}`);
    }
  });
}

function featureIsRegistered(table: string) {
  return function innerFeatureIsRegistered(feature: string): boolean {
    return facadeRegistry.hasFacade(feature, table);
  };
}

function filterByPsiTable(table: string): (key: string) => boolean {
  return function innerFilterByPsiTable(key: string) {
    return key.endsWith(psi + table);
  };
}

function extractFeatureFromPsiTable(key: string): string {
  return key.split(psi)[0];
}
