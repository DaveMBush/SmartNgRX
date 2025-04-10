import { forNext } from '@smarttools/core';

import { removeIdFromParentsClassic } from '../facades/classic-ngrx.facade/remove-id-from-parents-classic.function';
import { childDefinitionRegistry } from '../../../smart-core/src/registrations/child-definition.registry';
import { ChildDefinition } from '../../../smart-core/src/types/child-definition.interface';
import { ParentInfo } from '../../../smart-core/src/types/parent-info.interface';

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
      removeIdFromParentsClassic(childDefinition, id, parentInfo);
    });
  };
}
