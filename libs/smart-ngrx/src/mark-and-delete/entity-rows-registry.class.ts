import { entityDefinitionRegistry } from '../registrations/entity-definition-registry.function';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { markAndDeleteEntities } from './mark-and-delete-entities.class';

class EntityRowsRegistry {
  /**
   * registers the rows with the mark and delete functionality.
   *
   * @param feature the feature the rows belong to
   * @param entity the entity within the feature the rows belong to
   * @param rows the rows to register with the mark and delete functionality
   *
   * @returns the rows that were passed in with the `isDirty` flag set to false
   */
  register<T extends SmartNgRXRowBase>(
    feature: string,
    entity: string,
    rows: T[],
  ): T[] {
    const adapter = entityDefinitionRegistry(feature, entity).entityAdapter;
    const markAndDeleteMap = markAndDeleteEntities.map(feature, entity);
    return rows.map(function registerEntityRowsMapItem(row) {
      const markAndDeleteKey = `${adapter.selectId(row)}`;
      markAndDeleteMap.delete(markAndDeleteKey);
      markAndDeleteMap.set(markAndDeleteKey, Date.now());
      // this is getting called from a reducer so we can't mutate the existing row
      return { ...row, isDirty: false, isLoading: false };
    });
  }

  /**
   * unregisters the rows with the mark and delete functionality.
   *
   * @param feature the feature the ids belong to
   * @param entity the entity the ids belong to
   * @param ids the ids to unregister with the mark and delete functionality
   *
   * @returns the ids that were passed in
   */
  unregister(feature: string, entity: string, ids: string[]): string[] {
    const markAndDeleteMap = markAndDeleteEntities.map(feature, entity);
    return ids.map(function unregisterEntityRowsItem(id) {
      markAndDeleteMap.delete(id);
      return id;
    });
  }
}

export const entityRowsRegistry = new EntityRowsRegistry();
