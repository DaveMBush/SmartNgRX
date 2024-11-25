import { ParentInfo } from '../actions/parent-info.interface';
import { removeIdFromParents } from '../actions/remove-id-from-parents.function';
import { forNext } from '../common/for-next.function';
import { childDefinitionRegistry } from '../registrations/child-definition.registry';
import { ChildDefinition } from '../types/child-definition.interface';

/**
 * Delete the feature/entity/ids from the store
 *
 * @param feature The feature the entity is in.
 * @param entity The entity to delete.
 * @param ids The ids of the rows that need to be deleted.
 */
export function deleteEntity(feature: string, entity: string, ids: string[]) {
  const childDefinitions = childDefinitionRegistry.getChildDefinition(
    feature,
    entity,
  );
  const parentInfo: ParentInfo[] = [];
  forNext(childDefinitions, deleteEntityByChildDefinition(parentInfo, ids));
}

function deleteEntityByChildDefinition(
  parentInfo: ParentInfo[],
  ids: string[],
) {
  return function deletedEntityForChildDefinition(
    childDefinition: ChildDefinition,
  ) {
    forNext(ids, function deleteEntityForChildAndId(id) {
      removeIdFromParents(childDefinition, id, parentInfo);
    });
  };
}
