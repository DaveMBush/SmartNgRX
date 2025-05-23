import {
  BaseChildDefinition,
  facadeRegistry,
  replaceIdInFeatureParents,
} from '@smarttools/smart-core';
import { take } from 'rxjs';

import { ClassicNgrxFacade } from './classic-ngrx.facade';

/**
 * Helper method to remove the id of the row from the parent rows looking at it
 *
 * @param childDefinition the `ChildDefinition` that defines the parent/child relationship for the row being deleted
 * @param id the id of the row being deleted
 * @param newId the new id to replace the old id with
 */
export function replaceIdInParentsClassic(
  childDefinition: BaseChildDefinition,
  id: string,
  newId: string,
): void {
  const parentService = facadeRegistry.register(
    childDefinition.parentFeature,
    childDefinition.parentEntity,
  ) as ClassicNgrxFacade;
  parentService.entities
    .pipe(take(1))
    .subscribe(function replaceIdInParentsSubscribe(entities) {
      // optimistically remove the ids from the parent
      replaceIdInFeatureParents(entities, childDefinition, parentService, [
        id,
        newId,
      ]);
    });
}
