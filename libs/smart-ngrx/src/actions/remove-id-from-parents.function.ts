import { Dictionary } from '@ngrx/entity';

import { assert } from '../common/assert.function';
import { childDefinitionRegistry } from '../registrations/child-definition.registry';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ActionService } from './action.service';

/**
 * Used by delete to remove the id from the parent's child field and return the list of parentIds that were affected.
 *
 * @param entities the entities to look in
 * @param service the service for this row. We use this to grab the feature and entity
 *                names to lookup additional information that we need
 * @param parentService the parent service that we will call to report items from parent
 * @param id the id of the row to delete
 * @returns the parent ids that are affected by the delete
 */
export function removeIdFromParents(
  entities: Dictionary<SmartNgRXRowBase>,
  service: ActionService<SmartNgRXRowBase>,
  parentService: ActionService<SmartNgRXRowBase>,
  id: string,
): string[] {
  const mapChildIdToChildren = new Map<string, string[]>();
  const child = childDefinitionRegistry.getChildDefinition(
    service.feature,
    service.entity,
  ).parentField as keyof SmartNgRXRowBase;
  const parentIds: string[] = Object.keys(entities).filter((key) => {
    const entity = entities[key];
    assert(!!entity, `Entity with key ${key} not found in parent service`);
    const childArray = entity[child] as string[] | undefined;
    assert(!!childArray, `Child array not found in parent entity`);
    const hasChild = childArray.some((v) => id === v);
    if (hasChild) {
      mapChildIdToChildren.set(
        key,
        childArray.filter((v) => id !== v),
      );
    }
    return hasChild;
  });
  parentService.updateMany(
    // remove the child id from the parent's child field
    parentIds.map((v) => ({
      id: v,
      changes: { [child]: mapChildIdToChildren.get(v) },
    })),
  );
  return parentIds;
}
