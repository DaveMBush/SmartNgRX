import { forNext } from '../common/for-next.function';
import { psi } from '../common/psi.const';
import { markAndDeleteEntities } from '../mark-and-delete/mark-and-delete-entity.map';
import { featureRegistry } from '../registrations/feature-registry.class';
import { deleteEntity } from './delete-entity.function';
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
  let featureEntityKeys = markAndDeleteEntities();

  // filter by features that have the table/entity
  featureEntityKeys = featureEntityKeys
    .filter(filterByPsiTable(table))
    .map(extractFeatureFromPsiTable)
    .filter(featureIsRegistered);
  // for each feature
  forNext(featureEntityKeys, function innerHandleSocketNotification(feature) {
    switch (action) {
      case 'delete':
        deleteEntity(feature, table, ids);
        break;
      case 'update':
        updateEntity(feature, table, ids);
        break;
      default:
        throw new Error(`Error: invalid action ${action}`);
    }
  });
}

function featureIsRegistered(feature: string): boolean {
  return Boolean(featureRegistry.hasFeature(feature));
}

function filterByPsiTable(table: string): (key: string) => boolean {
  return function innerFilterByPsiTable(key: string) {
    return key.endsWith(psi + table);
  };
}

function extractFeatureFromPsiTable(key: string): string {
  return key.split(psi)[0];
}
