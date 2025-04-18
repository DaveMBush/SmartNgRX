import {
  BaseChildDefinition,
  facadeRegistry,
  replaceIdInFeatureParents,
} from '@smarttools/core';

import { SignalsFacade } from './signals-facade';

/**
 * Helper method to remove the id of the row from the parent rows looking at it
 *
 * @param childDefinition the `ChildDefinition` that defines the parent/child relationship for the row being deleted
 * @param id the id of the row being deleted
 * @param newId the new id to replace the old id with
 */
export function replaceIdInParentsSignals(
  childDefinition: BaseChildDefinition,
  id: string,
  newId: string,
): void {
  const parentService = facadeRegistry.register(
    childDefinition.parentFeature,
    childDefinition.parentEntity,
  ) as SignalsFacade;
  const entityMap = parentService.entityState.entityMap();
  replaceIdInFeatureParents(entityMap, childDefinition, parentService, [
    id,
    newId,
  ]);
}
