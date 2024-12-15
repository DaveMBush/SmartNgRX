import { Dictionary } from '@ngrx/entity';

import { assert } from '../common/assert.function';
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
  parentService: ActionService<SmartNgRXRowBase>,
  ids: [string, string | null],
): string[] {
  const [id, newId] = ids;
  const mapChildIdToChildren = new Map<
    string,
    string[] | VirtualArrayContents
  >();
  const childField = childDefinition.parentField;

  const parentIds: string[] = Object.keys(entities).filter(
    function replaceIdInFeatureParentsFilter(key) {
      const entity = entities[key];
      assert(!!entity, `Entity with key ${key} not found in parent service`);

      const { hasChild, updatedChildField } = processEntity(
        entity,
        childField,
        id,
        newId,
      );
      if (hasChild) {
        mapChildIdToChildren.set(key, updatedChildField);
      }
      return hasChild;
    },
  );

  if (parentIds.length === 0) {
    return [];
  }

  parentService.updateMany(
    parentIds.map(function replaceIdInFeatureParentsMapItem(v) {
      return {
        id: v,
        changes: {
          [childField]: mapChildIdToChildren.get(v),
        },
      };
    }),
  );

  return parentIds;
}

interface ProcessResult {
  hasChild: boolean;
  updatedChildField: string[] | VirtualArrayContents;
}

function processEntity(
  entity: SmartNgRXRowBase,
  childField: keyof SmartNgRXRowBase,
  id: string,
  newId: string | null,
): ProcessResult {
  const childArray = entity[childField] as unknown as
    | string[]
    | VirtualArrayContents
    | undefined;
  assert(!!childArray, `Child array not found in parent entity`);

  if (Array.isArray(childArray)) {
    return processArrayChildField(childArray, id, newId);
  }
  return processVirtualArrayChildField(childArray, id, newId);
}

function processArrayChildField(
  childArray: string[],
  id: string,
  newId: string | null,
): ProcessResult {
  const index = childArray.findIndex(
    function processArrayChildFieldFindIndex(v) {
      return id === v;
    },
  );
  let updatedArray = childArray;
  if (index !== -1 && newId !== null) {
    updatedArray = [...childArray];
    updatedArray[index] = newId;
  }
  return {
    hasChild: index !== -1,
    updatedChildField: updatedArray.filter(
      function processArrayChildFieldFilter(v) {
        return id !== v;
      },
    ),
  };
}

function processVirtualArrayChildField(
  virtualArray: VirtualArrayContents,
  id: string,
  newId: string | null,
): ProcessResult {
  const index = virtualArray.indexes.findIndex(
    function processVirtualArrayChildFieldFindIndex(v) {
      return id === v;
    },
  );
  let updatedArray = virtualArray;
  if (index !== -1 && newId !== null) {
    updatedArray = {
      indexes: [
        ...virtualArray.indexes.slice(0, index),
        newId,
        ...virtualArray.indexes.slice(index + 1),
      ],
      length: virtualArray.length,
    };
  }
  return {
    hasChild: index !== -1,
    updatedChildField: {
      indexes: updatedArray.indexes.filter(
        function processVirtualArrayChildFieldFilter(v) {
          return id !== v;
        },
      ),
      length: virtualArray.length - (newId === null ? 1 : 0),
    },
  };
}
