import { forNext } from "../common/for-next.function";
import { psi } from "../common/theta.const";
import { markAndDeleteEntities } from "../mark-and-delete/mark-and-delete-entity.map";
import { updateEntity } from "./update-entity.function";

/**
 * The main function responsible for handling socket notifications
 *
 * @param table the table that the notification is for
 * @param action the action that the notification is for (create, delete, update)
 * @param ids the ids of the entities that the notification is for
 */
export function handleSocketNotification(table: string, action: string, ids: string[]): void {
  // get all the active features
  let featureEntityKeys = markAndDeleteEntities();

  // filter by features that have the table/entity
  featureEntityKeys = featureEntityKeys.filter((key) => key.endsWith(psi + table));
  // for each feature
  forNext(featureEntityKeys, (key) => {
    const [feature] = key.split(psi) as [string, string];

    switch (action) {
      case 'create':
        // createEntity(feature, table, ids)
        break;
      case 'delete':
        // deleteEntity(feature, table, ids)
        break;
      case 'update':
        updateEntity(feature, table, ids)
        break;
      default:
        break;
    }

  });
}
