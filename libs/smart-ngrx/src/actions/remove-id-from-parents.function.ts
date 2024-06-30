import { take } from 'rxjs';

import { actionServiceRegistry } from '../registrations/action.service.registry';
import { ChildDefinition } from '../types/child-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ActionService } from './action.service';
import { ParentInfo } from './parent-info.interface';
import { removeIdFromFeatureParents } from './remove-id-from-feature-parents.function';

/**
 * Helper method to remove the id of the row from the parent rows looking at it
 *
 * @param childDefinition the `ChildDefinition` that defines the parent/child relationship for the row being deleted
 * @param service the `ActionService` for the row being deleted
 * @param id the id of the row being deleted
 * @param parentInfo holds the parent feature, entity, and ids that are affected by the delete
 */
export function removeIdFromParents(
  childDefinition: ChildDefinition,
  service: ActionService<SmartNgRXRowBase>,
  id: string,
  parentInfo: ParentInfo[],
) {
  const parentService = actionServiceRegistry(
    childDefinition.parentFeature,
    childDefinition.parentEntity,
  );
  parentService.entities.pipe(take(1)).subscribe((entities) => {
    // optimistically remove the ids from the parent
    const parentIds = removeIdFromFeatureParents(
      entities,
      service,
      parentService,
      id,
    );
    parentInfo.push({
      feature: childDefinition.parentFeature,
      entity: childDefinition.parentEntity,
      ids: parentIds,
    });
  });
}
