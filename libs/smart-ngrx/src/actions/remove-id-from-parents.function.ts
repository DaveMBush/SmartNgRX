import { take } from 'rxjs';

import { actionServiceRegistry } from '../registrations/action.service.registry';
import { ChildDefinition } from '../types/child-definition.interface';
import { ParentInfo } from './parent-info.interface';
import { replaceIdInFeatureParents } from './replace-id-in-feature-parents.function';

/**
 * Helper method to remove the id of the row from the parent rows looking at it
 *
 * @param childDefinition the `ChildDefinition` that defines the parent/child relationship for the row being deleted
 * @param id the id of the row being deleted
 * @param parentInfo holds the parent feature, entity, and ids that are affected by the delete
 */
export function removeIdFromParents(
  childDefinition: ChildDefinition,
  id: string,
  parentInfo: ParentInfo[],
): void {
  const parentService = actionServiceRegistry(
    childDefinition.parentFeature,
    childDefinition.parentEntity,
  );
  parentService.entities.pipe(take(1)).subscribe((entities) => {
    // optimistically remove the ids from the parent
    const parentIds = replaceIdInFeatureParents(
      entities,
      childDefinition,
      parentService,
      [id, null],
    );
    parentInfo.push({
      feature: childDefinition.parentFeature,
      entity: childDefinition.parentEntity,
      ids: parentIds,
    });
  });
}
