// jscpd:ignore-start
// this is similar to the signal version
// but it is unique enough that we can't
// combine without tightly coupling the two
// which will end up in separate libraries.
import {
  BaseChildDefinition,
  facadeRegistry,
  ParentInfo,
  replaceIdInFeatureParents,
} from '@smarttools/smart-core';
import { take } from 'rxjs';

import { ClassicNgrxFacade } from './classic-ngrx.facade';

/**
 * Helper method to remove the id of the row from the parent rows looking at it
 *
 * @param childDefinition the `ChildDefinition` that defines the parent/child relationship for the row being deleted
 * @param id the id of the row being deleted
 * @param parentInfo holds the parent feature, entity, and ids that are affected by the delete
 */
export function removeIdFromParentsClassic(
  childDefinition: BaseChildDefinition,
  id: string,
  parentInfo: ParentInfo[],
): void {
  const parentService = facadeRegistry.register(
    childDefinition.parentFeature,
    childDefinition.parentEntity,
  ) as ClassicNgrxFacade;
  parentService.entities
    .pipe(take(1))
    .subscribe(function removeIdFromParentsSubscribe(entities) {
      // optimistically remove the ids from the parent
      const parentIds = replaceIdInFeatureParents(
        entities,
        childDefinition,
        parentService,
        [id, null],
      );
      if (
        parentInfo.some(function removeIdFromParentsSome(p) {
          return (
            p.feature === childDefinition.parentFeature &&
            p.entity === childDefinition.parentEntity
          );
        })
      ) {
        return;
      }
      parentInfo.push({
        feature: childDefinition.parentFeature,
        entity: childDefinition.parentEntity,
        ids: parentIds,
      });
    });
}
// jscpd:ignore-end
