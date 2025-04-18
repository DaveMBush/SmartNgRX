import {
  BaseChildDefinition,
  childDefinitionRegistry,
  forNext,
  ParentInfo,
} from '@smarttools/core';

import { removeIdFromParentsSignals } from '../signal-facade/remove-id-from-parents-signals.function';
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
    childDefinition: BaseChildDefinition,
  ) {
    forNext(ids, function deleteEntityForChildAndId(id) {
      removeIdFromParentsSignals(childDefinition, id, parentInfo);
    });
  };
}
