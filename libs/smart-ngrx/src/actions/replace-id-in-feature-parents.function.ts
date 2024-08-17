import { Dictionary } from '@ngrx/entity';

import { assert } from '../common/assert.function';
import { castTo } from '../common/cast-to.function';
import { ChildDefinition } from '../types/child-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { ActionService } from './action.service';

/**
 * Used by delete to remove the id from the parent's child field and return the list of parentIds that were affected.
 *
 * @param entities the entities to look in
 * @param childDefinition the `ChildDefinition`
 * @param parentService the parent service that we will call to report items from parent
 * @param ids the oldId and the newId to replace it with
 * @returns the parent ids that are affected by the delete
 */
export function replaceIdInFeatureParents(
  entities: Dictionary<SmartNgRXRowBase>,
  childDefinition: ChildDefinition,
  parentService: ActionService,
  ids: [string, string | null],
): string[] {
  const [id, newId] = ids;
  const mapChildIdToChildren = new Map<string, string[] | VirtualArrayContents>();
  const childField = childDefinition.parentField as keyof SmartNgRXRowBase;
  const parentIds: string[] = Object.keys(entities).filter((key) => {
    const entity = entities[key];
    assert(!!entity, `Entity with key ${key} not found in parent service`);
    const childArray = entity[childField] as string[] | undefined;
    assert(!!childArray, `Child array not found in parent entity`);
    let hasChild = false;
    if (Array.isArray(childArray)) {
      const index = childArray.findIndex((v) => id === v);
      if (index !== -1 && newId !== null) {
        childArray[index] = newId;
      }
      hasChild = index !== -1;
      if (hasChild) {
        mapChildIdToChildren.set(
          key,
          childArray.filter((v) => id !== v),
        );
      }
    } else {
      const index = castTo<VirtualArrayContents>(childArray).indexes.findIndex((v) => id === v);
      let virtualArray = castTo<VirtualArrayContents>(childArray);
      if (index !== -1 && newId !== null) {
        virtualArray = {
          indexes: [...virtualArray.indexes.slice(0, index), newId, ...virtualArray.indexes.slice(index + 1)],
          length: virtualArray.length,
        }
      }
      hasChild = index !== -1;
      if (hasChild) {
        const newIndexes = virtualArray.indexes.filter((v) => id !== v)
        mapChildIdToChildren.set(
          key,
          {
            indexes: newIndexes,
            length: castTo<VirtualArrayContents>(childArray).length - (newId === null ? 1 : 0),
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
