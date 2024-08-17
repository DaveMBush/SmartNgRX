import { Dictionary } from '@ngrx/entity';

import { assert } from '../common/assert.function';
import { childDefinitionRegistry } from '../registrations/child-definition.registry';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ActionService } from './action.service';
import { ChildDefinition } from '../types/child-definition.interface';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { castTo } from '../common/cast-to.function';

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
export function removeIdFromFeatureParents(
  entities: Dictionary<SmartNgRXRowBase>,
  childDefinition: ChildDefinition,
  parentService: ActionService,
  id: string,
): string[] {
  const mapChildIdToChildren = new Map<string, string[] | VirtualArrayContents>();
  const childField = childDefinition.parentField as keyof SmartNgRXRowBase;
  const parentIds: string[] = Object.keys(entities).filter((key) => {
    const entity = entities[key];
    assert(!!entity, `Entity with key ${key} not found in parent service`);
    const childArray = entity[childField] as string[] | undefined;
    assert(!!childArray, `Child array not found in parent entity`);
    let hasChild = false;
    if (Array.isArray(childArray)) {
      hasChild = childArray.some((v) => id === v);
      if (hasChild) {
        mapChildIdToChildren.set(
          key,
          childArray.filter((v) => id !== v),
        );
      }
    } else {
      hasChild = castTo<VirtualArrayContents>(childArray).indexes.some((v) => id === v);
      if (hasChild) {
        mapChildIdToChildren.set(
          key,
          {
            indexes: castTo<VirtualArrayContents>(childArray).indexes.filter((v) => id !== v),
            length: castTo<VirtualArrayContents>(childArray).length,
          }
        );
      }
    }
    return hasChild;
  });
  if (parentIds.length === 0) {
    return [];
  }
  parentService.updateMany(
    // remove the child id from the parent's child field
    parentIds.map((v) => ({
      id: v,
      changes: { [childField]: mapChildIdToChildren.get(v) },
    })),
  );
  return parentIds;
}
