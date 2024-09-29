import { take } from 'rxjs';

import { actionServiceRegistry } from '../registrations/action.service.registry';
import { ChildDefinition } from '../types/child-definition.interface';
import { replaceIdInFeatureParents } from './replace-id-in-feature-parents.function';

/**
 * Helper method to remove the id of the row from the parent rows looking at it
 *
 * @param childDefinition the `ChildDefinition` that defines the parent/child relationship for the row being deleted
 * @param id the id of the row being deleted
 * @param newId the new id to replace the old id with
 */
export function replaceIdInParents(
  childDefinition: ChildDefinition,
  id: string,
  newId: string,
): void {
  const parentService = actionServiceRegistry(
    childDefinition.parentFeature,
    childDefinition.parentEntity,
  );
  if (parentService === null) {
    return;
  }
  parentService.entities.pipe(take(1)).subscribe((entities) => {
    // optimistically remove the ids from the parent
    replaceIdInFeatureParents(entities, childDefinition, parentService, [
      id,
      newId,
    ]);
  });
}
